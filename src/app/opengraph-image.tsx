import { ImageResponse } from "next/og";

// 카카오톡/인스타 DM/트위터 등에 링크를 공유했을 때 뜨는 미리보기 카드.
// Day9 파비콘처럼 브랜드 컬러(navy/mint)를 재사용하고, satori(next/og) 기본 폰트가
// 한글 글리프를 지원하지 않아 별도 폰트 번들 없이 안전한 영문으로만 구성했다.

export const alt = "Doyu — building an AI agent ecosystem in public";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0B1220",
          padding: "80px 90px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: 4,
            color: "#34D399",
          }}
        >
          KODEX · BUILD IN PUBLIC
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 96,
              fontWeight: 700,
              color: "#F8FAFC",
              lineHeight: 1.1,
            }}
          >
            Doyu
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 32,
              color: "#94A3B8",
              maxWidth: 900,
            }}
          >
            Building an AI agent ecosystem, one day at a time.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 26,
            color: "#94A3B8",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 10,
              height: 10,
              borderRadius: 999,
              backgroundColor: "#34D399",
              marginRight: 16,
            }}
          />
          kodex-portfolio-site.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
