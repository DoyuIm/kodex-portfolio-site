"use client";

import { useEffect } from "react";

// 인스타그램/페이스북 등에서 링크를 공유·클릭할 때 자동으로 붙는 추적 파라미터.
// 사이트 기능엔 필요 없어서, 방문자 눈에 보이는 주소창만 조용히 정리한다.
// (링크 자체에 붙는 걸 막을 수는 없고, 도착한 뒤 주소창 표시만 정리하는 것)
const TRACKING_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "fbclid",
  "gclid",
  "gbraid",
  "wbraid",
  "igshid",
  "mc_cid",
  "mc_eid",
];

export default function UrlCleaner() {
  useEffect(() => {
    const url = new URL(window.location.href);
    let changed = false;

    for (const key of TRACKING_PARAMS) {
      if (url.searchParams.has(key)) {
        url.searchParams.delete(key);
        changed = true;
      }
    }

    if (changed) {
      window.history.replaceState(null, "", url.pathname + url.search + url.hash);
    }
  }, []);

  return null;
}
