import { NextRequest, NextResponse } from "next/server";
import { askKodex } from "@/lib/kodex-chat";
import {
  SESSION_COOKIE,
  SESSION_LIMIT,
  SESSION_MAX_AGE_SECONDS,
  DAILY_LIMIT,
  getSessionCount,
  isSessionOverLimit,
  isDailyOverLimit,
  recordDailyUsage,
} from "@/lib/kodex-chat-limit";

export const runtime = "nodejs";

const MAX_QUESTION_LENGTH = 300;
const GITHUB_URL = "https://github.com/DoyuIm";
const LIMIT_FALLBACK_MESSAGE = `데모 한도에 도달했어요. 깃허브에서 전체 코드를 확인해보세요 → ${GITHUB_URL}`;

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "서버에 GEMINI_API_KEY가 설정되어 있지 않아요." },
      { status: 500 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청이에요." }, { status: 400 });
  }

  const question =
    typeof body === "object" && body !== null && "question" in body
      ? String((body as { question?: unknown }).question ?? "").trim()
      : "";

  if (!question) {
    return NextResponse.json({ error: "질문을 입력해주세요." }, { status: 400 });
  }
  if (question.length > MAX_QUESTION_LENGTH) {
    return NextResponse.json(
      { error: `질문은 ${MAX_QUESTION_LENGTH}자 이내로 입력해주세요.` },
      { status: 400 },
    );
  }

  const sessionCount = getSessionCount(request);

  if (isSessionOverLimit(request)) {
    return NextResponse.json({
      limited: true,
      reason: "session",
      message: `이 데모는 방문당 질문 ${SESSION_LIMIT}개까지만 받고 있어요. ${LIMIT_FALLBACK_MESSAGE}`,
    });
  }

  if (isDailyOverLimit()) {
    return NextResponse.json({
      limited: true,
      reason: "daily",
      message: `오늘 데모 사용량 한도(${DAILY_LIMIT}회)에 도달했어요. ${LIMIT_FALLBACK_MESSAGE}`,
    });
  }

  try {
    const result = await askKodex(question, apiKey);
    recordDailyUsage();

    const response = NextResponse.json({
      limited: false,
      answer: result.answer,
      sources: result.sources,
      remaining: Math.max(SESSION_LIMIT - (sessionCount + 1), 0),
    });
    response.cookies.set(SESSION_COOKIE, String(sessionCount + 1), {
      maxAge: SESSION_MAX_AGE_SECONDS,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });
    return response;
  } catch (error) {
    console.error("[kodex-chat] failed:", error);
    return NextResponse.json(
      { error: "답변을 가져오는 중 문제가 발생했어요. 잠시 후 다시 시도해주세요." },
      { status: 502 },
    );
  }
}
