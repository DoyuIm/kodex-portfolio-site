// 사이트 챗 위젯 자체의 실시간 사용량을 읽기 전용으로 노출한다 (Day15).
// About 섹션의 SiteUsageStats 컴포넌트가 클라이언트에서 이 엔드포인트를 호출해서
// "오늘 N회 / 누적 M회"를 보여준다. CLI+봇 누적(kodex-usage.json, 매일 배치 동기화)과
// 달리 이건 Upstash Redis에서 매 요청마다 실시간으로 읽는다.

import { NextResponse } from "next/server";
import { getDailyCount, getAllTimeTotal, isPersistentStoreConnected } from "@/lib/kodex-chat-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic"; // 매 요청마다 새로 읽어야 함 — 정적 캐싱되면 숫자가 고정돼버림

export async function GET() {
  const [today, allTime] = await Promise.all([getDailyCount(), getAllTimeTotal()]);
  return NextResponse.json({
    today,
    allTime,
    persistent: isPersistentStoreConnected(),
  });
}
