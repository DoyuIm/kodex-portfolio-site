// 챗 위젯은 "전시용 데모"로만 쓰이게 두 겹으로 제한한다 (프로젝트 로드맵 Phase 4 참고).
// 1) 방문자(세션)당 메시지 수 제한 — 쿠키 기반, 브라우저별 (KV로 옮길 이유가 없음, 원래 로컬 개념)
// 2) 서버 전체 하루 호출 한도 — 무료 티어 전체를 한 방문자가 다 써버리는 걸 방지
//
// Day15: 하루 카운터를 인메모리에서 Upstash Redis(Vercel 마켓플레이스의 "Upstash for Redis" 연동,
// 예전 "Vercel KV"의 후신 — 환경변수 이름은 KV_REST_API_URL/KV_REST_API_TOKEN으로 호환 유지됨)로
// 옮겼다. 이제 서버리스 인스턴스가 재시작돼도 카운트가 유지되고, 사이트 전체 누적 호출 수까지
// 기록해서 About 섹션의 사용량 대시보드에 표시할 수 있다.
// Redis 환경변수가 아직 연결 안 돼있으면(로컬 개발 등) 인메모리로 자동 폴백한다.

import type { NextRequest } from "next/server";
import { Redis } from "@upstash/redis";

export const SESSION_COOKIE = "kodex_chat_count";
export const SESSION_LIMIT = Number(process.env.KODEX_CHAT_SESSION_LIMIT ?? 8);
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 6; // 6시간짜리 "세션"

export const DAILY_LIMIT = Number(process.env.KODEX_CHAT_DAILY_LIMIT ?? 300);

const DAILY_KEY_PREFIX = "kodex-chat:daily:";
const DAILY_TTL_SECONDS = 60 * 60 * 36; // 하루+여유(타임존 경계 대비 36시간) 후 자동 만료
const TOTAL_KEY = "kodex-chat:total";

const redis =
  process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
    ? new Redis({
        url: process.env.KV_REST_API_URL,
        token: process.env.KV_REST_API_TOKEN,
      })
    : null;

// Redis가 연결 안 돼있을 때(로컬 개발 등)를 위한 인메모리 폴백. 기존 동작과 동일하게,
// 서버리스 인스턴스가 재시작되면 리셋된다는 한계를 그대로 가진다.
let fallbackDaily = { date: "", count: 0 };
let fallbackTotal = 0;

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function dailyKey(): string {
  return `${DAILY_KEY_PREFIX}${today()}`;
}

function syncFallback(): void {
  const t = today();
  if (fallbackDaily.date !== t) {
    fallbackDaily = { date: t, count: 0 };
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

export async function getDailyCount(): Promise<number> {
  if (!redis) {
    syncFallback();
    return fallbackDaily.count;
  }
  const count = await redis.get<number>(dailyKey());
  return count ?? 0;
}

export async function isDailyOverLimit(): Promise<boolean> {
  const count = await getDailyCount();
  return count >= DAILY_LIMIT;
}

/** 실제로 Gemini를 호출한 요청에 대해서만 불러야 한다 — 하루 전체 카운트 +1, 누적 총합 +1 */
export async function recordDailyUsage(): Promise<void> {
  if (!redis) {
    syncFallback();
    fallbackDaily.count += 1;
    fallbackTotal += 1;
    return;
  }
  const key = dailyKey();
  const newCount = await redis.incr(key);
  if (newCount === 1) {
    await redis.expire(key, DAILY_TTL_SECONDS);
  }
  await redis.incr(TOTAL_KEY);
}

/** 사이트 챗 위젯의 전체 기간 누적 호출 수 (Day15: 사용량 대시보드용). */
export async function getAllTimeTotal(): Promise<number> {
  if (!redis) {
    return fallbackTotal;
  }
  const total = await redis.get<number>(TOTAL_KEY);
  return total ?? 0;
}

/** Redis(Upstash)가 연결돼있는지 여부 — 대시보드에 "아직 설정 안 됨"을 구분해서 보여줄 때 씀. */
export function isPersistentStoreConnected(): boolean {
  return redis !== null;
}
