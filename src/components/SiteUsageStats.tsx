"use client";

// Day15: 사이트 챗 위젯 자체 호출 수를 About 섹션에 실시간으로 보여준다.
// CLI+봇 누적(kodex-usage.json)은 매일 배치로 동기화되는 값이라 정적으로 임포트해서 쓰지만,
// 이건 Upstash Redis에서 매 요청마다 읽는 값이라 클라이언트에서 fetch해서 표시한다.

import { useEffect, useState } from "react";

interface UsageResponse {
  today: number;
  allTime: number;
  persistent: boolean;
}

export default function SiteUsageStats() {
  const [data, setData] = useState<UsageResponse | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/kodex-usage")
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (!cancelled && json) setData(json);
      })
      .catch(() => {
        // 조용히 무시 — 이 위젯은 부가 정보라 실패해도 페이지에 영향 없게 둔다
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!data || data.allTime === 0) return null;

  return (
    <div className="mt-3 text-xs text-muted">
      사이트 챗 위젯은 오늘 <span className="text-offwhite">{data.today}회</span>, 누적{" "}
      <span className="text-offwhite">{data.allTime}회</span> 호출됐어요.
      {!data.persistent && " (아직 영구 저장소 연결 전 — 재배포 시 리셋될 수 있어요)"}
    </div>
  );
}
