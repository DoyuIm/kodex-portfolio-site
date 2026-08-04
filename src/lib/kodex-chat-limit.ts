// 챗 위젯은 "전시용 데모"로만 쓰이게 두 겹으로 제한한다 (프로젝트 로드맵 Phase 4 참고).
// 1) 방문자(세션)당 메시지 수 제한 — 쿠키 기반, 브라우저별
// 2) 서버 전체 하루 호출 한도 — 무료 티어 전체를 한 방문자가 다 써버리는 걸 방지

import type { NextRequest } from "next/server";

export const SESSION_COOKIE = "kodex_chat_count";
export const SESSION_LIMIT = Number(process.env.KODEX_CHAT_SESSION_LIMIT ?? 8);
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 6; // 6시간짜리 "세션"

export const DAILY_LIMIT = Number(process.env.KODEX_CHAT_DAILY_LIMIT ?? 300);

// 인메모리 하루 전체 카운터.
// 주의: Vercel 서버리스 함수는 트래픽에 따라 인스턴스가 여러 개 뜨거나 콜드스타트로 재시작될 수 있어서
// 완벽한 전역 카운트는 아니다 (인스턴스별로 따로 셈). 개인 포트폴리오 트래픽 규모에선 충분한 방어선이고,
// 나중에 트래픽이 늘면 Vercel KV / Upstash Redis 같은 외부 저장소로 바꾸면 된다.
let dailyState = { date: "", count: 0 };

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function syncDaily(): void {
  const t = today();
  if (dailyState.date !== t) {
    dailyState = { date: t, count: 0 };
  }
}

export function getSessionCount(request: NextRequest): number {
  const raw = request.cookies.get(SESSION_COOKIE)?.value;
  const n = raw ? parseInt(raw, 10) : 0;
  return Number.isFinite(n) ? n : 0;
}

export function isSessionOverLimit(request: NextRequest): boolean {
  return getSessionCount(request) >= SESSION_LIMIT;
}

export function getDailyCount(): number {
  syncDaily();
  return dailyState.count;
}

export function isDailyOverLimit(): boolean {
  syncDaily();
  return dailyState.count >= DAILY_LIMIT;
}

/** 실제로 Gemini를 호출한 요청에 대해서만 불러야 한다 — 하루 전체 카운트 +1 */
export function recordDailyUsage(): void {
  syncDaily();
  dailyState.count += 1;
}
