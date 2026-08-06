#!/usr/bin/env python3
"""
devlog 목록 자동 동기화 (Day13 자동화)
--------------------------------
kodex-code-review-agent/posts.json(fetch_posts.py 결과)에서 아직 src/data/posts.ts에
없는 "kodex-day-N-..." 슬러그의 새 벨로그 글을 찾아, Gemini로 title/summary를 생성해서
posts.ts 배열 끝에 자동으로 추가한다.

- 슬러그가 이미 posts.ts에 있으면 건너뜀 (중복 방지, 재실행해도 안전)
- kodex-day-N- 형식이 아닌 글(다른 주제의 글 등)은 대상에서 제외
- highlights.ts는 여러 날짜를 묶어 사람이 직접 정리하는 영역이라 자동화 대상이 아님

사용법:
    python scripts/sync_devlog.py --posts ../kodex-code-review-agent/posts.json --ts src/data/posts.ts

준비:
    1) fetch_posts.py를 먼저 실행해서 posts.json을 만들어둘 것
    2) 환경변수 GEMINI_API_KEY가 설정되어 있을 것
"""

import argparse
import json
import os
import re
from urllib.parse import urlparse

from dotenv import load_dotenv
from google import genai
from google.genai import types

CHAT_MODEL = "gemini-flash-latest"
SLUG_RE = re.compile(r"^kodex-day-(\d+)-")

SYSTEM_INSTRUCTION = """당신은 개발자의 "빌드 인 퍼블릭" devlog 글을 포트폴리오 사이트 목록용으로
짧게 요약하는 도우미입니다. 반드시 다음 형식의 JSON으로만 답하세요:
{"title": "...", "summary": "..."}

- title: 10~20자 내외의 짧은 명사형 제목. 예: "AI 에이전트 프로젝트 시작", "GitHub와 연결하고 자동 배포까지"
- summary: 한 문장, "~한 날"로 끝나는 한 줄 요약. 예: "Kodex 프로젝트 기획과 로드맵을 세운 첫날"
- 본문에서 실제로 한 일 위주로, 과장 없이 담백하게 쓰세요. 마크다운이나 코드블록은 쓰지 마세요."""


def extract_slug(link: str) -> str:
    path = urlparse(link).path
    return path.rstrip("/").split("/")[-1]


def load_existing_slugs(ts_path: str):
    with open(ts_path, "r", encoding="utf-8") as f:
        text = f.read()
    return set(re.findall(r'slug:\s*"([^"]+)"', text)), text


def generate_title_summary(client: genai.Client, content: str) -> dict:
    prompt = f"devlog 본문:\n{content[:4000]}"
    response = client.models.generate_content(
        model=CHAT_MODEL,
        contents=prompt,
        config=types.GenerateContentConfig(
            system_instruction=SYSTEM_INSTRUCTION,
            temperature=0.3,
            response_mime_type="application/json",
        ),
    )
    return json.loads(response.text)


def main():
    parser = argparse.ArgumentParser(description="새 벨로그 글을 posts.ts에 자동 추가")
    parser.add_argument("--posts", default="../kodex-code-review-agent/posts.json")
    parser.add_argument("--ts", default="src/data/posts.ts")
    args = parser.parse_args()

    if not os.path.exists(args.posts):
        raise SystemExit(f"'{args.posts}' 파일이 없어요. 먼저 fetch_posts.py를 실행해주세요.")

    with open(args.posts, "r", encoding="utf-8") as f:
        posts = json.load(f)

    existing_slugs, ts_text = load_existing_slugs(args.ts)

    candidates = []
    for post in posts:
        slug = extract_slug(post.get("link", ""))
        m = SLUG_RE.match(slug)
        if not m or slug in existing_slugs:
            continue
        candidates.append((int(m.group(1)), slug, post))

    if not candidates:
        print("추가할 새 devlog가 없어요.")
        return

    candidates.sort(key=lambda t: t[0])

    load_dotenv()
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise SystemExit("GEMINI_API_KEY가 설정되어 있지 않아요.")
    client = genai.Client(api_key=api_key)

    new_entries = []
    for day, slug, post in candidates:
        try:
            meta = generate_title_summary(client, post["content"])
            title = (meta.get("title") or post["title"]).strip()
            summary = (meta.get("summary") or "").strip()
        except Exception as e:  # noqa: BLE001
            print(f"⚠️ Day {day}({slug}) 요약 생성 실패, 건너뜀: {e}")
            continue
        new_entries.append((day, title, summary, slug))
        print(f"+ Day {day}: {title} ({slug})")

    if not new_entries:
        print("추가된 항목이 없어요.")
        return

    entry_blocks = "".join(
        f'  {{\n    day: {day},\n    title: "{title}",\n    summary: "{summary}",\n    slug: "{slug}",\n  }},\n'
        for day, title, summary, slug in new_entries
    )
    updated, n = re.subn(r"\n\];", f"\n{entry_blocks}];", ts_text, count=1)
    if n == 0:
        raise SystemExit(f"'{args.ts}'에서 배열 닫는 위치를 못 찾았어요. 파일 형식이 바뀌었는지 확인해주세요.")

    with open(args.ts, "w", encoding="utf-8") as f:
        f.write(updated)

    print(f"\n총 {len(new_entries)}개 devlog 항목을 '{args.ts}'에 추가했어요.")


if __name__ == "__main__":
    main()
