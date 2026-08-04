// Phase 4 마무리: 포트폴리오 사이트 챗 위젯의 핵심 로직.
// kodex-code-review-agent/ask.py의 RAG(검색 후 답변) 로직을 TypeScript로 그대로 옮긴 것.
// - 임베딩 검색: kodex-code-review-agent/build_index.py가 만든 embeddings.json을 그대로 재사용
//   (src/data/kodex-embeddings.json으로 복사해서 번들에 포함)
// - 답변 생성: 같은 시스템 프롬프트, 같은 모델(gemini-flash-latest)을 사용

import { GoogleGenAI } from "@google/genai";
import rawRecords from "@/data/kodex-embeddings.json";

export interface EmbeddingRecord {
  title: string;
  link: string;
  text: string;
  embedding: number[];
}

const records = rawRecords as EmbeddingRecord[];

const CHAT_MODEL = "gemini-flash-latest";
const EMBED_MODEL = "gemini-embedding-001";
const TOP_K = 4;
const MIN_SCORE_DEFAULT = 0.5;

export const NOT_FOUND_MESSAGE =
  "블로그에 아직 그 내용은 없어요. 다른 질문을 해보시겠어요?";

const SYSTEM_INSTRUCTION = `당신은 이 블로그(벨로그) 작성자를 대신해 방문자 질문에 답하는 도우미입니다.
아래 제공된 '참고 자료'에 있는 내용만 근거로 답하세요.
참고 자료에 없는 내용이면 "블로그에 아직 그 내용은 없어요"라고 솔직하게 답하세요.
답변은 한국어로, 친근하지만 간결하게 작성하세요.`;

function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

export interface KodexChatSource {
  title: string;
  link: string;
  score: number;
}

export interface KodexChatResult {
  answer: string;
  sources: KodexChatSource[];
}

/** 질문 임베딩 → 벨로그 글 조각 검색 → 근거 기반 답변 생성 (RAG). */
export async function askKodex(
  question: string,
  apiKey: string,
): Promise<KodexChatResult> {
  const ai = new GoogleGenAI({ apiKey });

  const embedRes = await ai.models.embedContent({
    model: EMBED_MODEL,
    contents: question,
    config: { taskType: "RETRIEVAL_QUERY" },
  });
  const qVector = embedRes.embeddings?.[0]?.values;
  if (!qVector) {
    throw new Error("임베딩 응답이 비어있어요.");
  }

  const scored = records
    .map((record) => ({ record, score: cosineSimilarity(qVector, record.embedding) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, TOP_K);

  const bestScore = scored[0]?.score ?? 0;
  if (scored.length === 0 || bestScore < MIN_SCORE_DEFAULT) {
    return { answer: NOT_FOUND_MESSAGE, sources: [] };
  }

  const context = scored
    .map((s, i) => `[${i + 1}] 출처: ${s.record.title}\n${s.record.text}`)
    .join("\n\n");
  const prompt = `참고 자료:\n${context}\n\n질문: ${question}`;

  const genRes = await ai.models.generateContent({
    model: CHAT_MODEL,
    contents: prompt,
    config: { systemInstruction: SYSTEM_INSTRUCTION, temperature: 0.3 },
  });

  const seen = new Set<string>();
  const sources: KodexChatSource[] = [];
  for (const { record, score } of scored) {
    if (seen.has(record.title)) continue;
    seen.add(record.title);
    sources.push({ title: record.title, link: record.link, score });
  }

  return { answer: genRes.text ?? "", sources };
}
