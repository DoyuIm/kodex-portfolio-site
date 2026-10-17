// 이력서의 STAR 스토리를 바탕으로 한 경력·팀 프로젝트. Kodex는 Projects 섹션에 있어서 여기서는 뺐다.
type Text = { ko: string; en: string };

export type Experience = {
  kind: Text;
  title: Text;
  summary: Text;
  result: Text;
  tags: string[];
};

export const experiences: Experience[] = [
  {
    kind: { ko: "인턴십 · IBM", en: "Internship · IBM" },
    title: {
      ko: "watsonx 기반 뉴스 요약 챗봇 기획과 LLM 비교 검증",
      en: "Multi-LLM news summarization chatbot on watsonx",
    },
    summary: {
      ko: "기업 리서치에서 키워드를 하나씩 검색하고 교차 확인하던 비효율을 줄이려고, watsonx.ai·Watson Discovery·Watson Assistant를 연결했어요. Llama 3, Llama 3.1, Mistral을 같은 프롬프트로 비교하고, 모델 선택·생성 시간 측정·최근 응답 요약 흐름을 만들었어요.",
      en: "To cut down on slow, manual keyword searches in corporate research, I connected watsonx.ai, Watson Discovery and Watson Assistant. I compared Llama 3, Llama 3.1 and Mistral with identical prompts and built flows for model selection, generation-time measurement and recent-response summaries.",
    },
    result: {
      ko: "챗봇 액션 흐름을 완성하고, 데모 영상·기술 가이드와 18쪽 발표 자료로 최종 발표를 마쳤어요.",
      en: "Completed the full action flow, shared demo videos and technical guides internally, and delivered the final presentation with an 18-page deck.",
    },
    tags: ["IBM watsonx", "LLM comparison", "Prompt design", "Chatbot"],
  },
  {
    kind: { ko: "캡스톤 디자인", en: "Capstone project" },
    title: {
      ko: "지역별 맞춤 분리수거 안내 앱 ‘에코아이(Eco by AI)’",
      en: "Eco by AI: region-based recycling guidance app",
    },
    summary: {
      ko: "설문 응답자의 82.7%가 자기 지역의 분리수거 기준을 모른다는 점에서 출발했어요. 환경부와 229개 지자체의 정책 데이터를 모으고, 사용자가 지역을 고르면 YOLOR 이미지 분류 결과와 해당 지역 배출 기준이 연결되는 화면을 맡았어요.",
      en: "We started from the finding that 82.7% of surveyed people did not know their local recycling rules. I collected policy data from the Ministry of Environment and 229 local districts and built the region selection screens that link YOLOR image classification results to each district's disposal rules.",
    },
    result: {
      ko: "캡스톤 디자인 부문 총장상(동상)을 받고, 팀으로 소프트웨어 저작권과 특허를 등록했어요.",
      en: "Won the University President's Bronze Award for capstone design; the team registered a software copyright and a patent.",
    },
    tags: ["YOLOR", "Public data", "App planning", "Award · Patent"],
  },
  {
    kind: { ko: "UX 프로젝트", en: "UX project" },
    title: {
      ko: "사용자 테스트 기반 멜론 플레이리스트 UX 개편",
      en: "Redesigning Melon's playlist experience",
    },
    summary: {
      ko: "깊은 메뉴 때문에 플레이리스트 만들기와 공유가 어렵다는 문제를 YouTube Music·Spotify 경쟁사 분석, VOC 분석, 3명 대상 think-aloud 사용성 테스트로 확인했어요. 팀 의견이 갈릴 때는 테스트 관찰 결과로 논의를 정리했어요.",
      en: "Through competitor research on YouTube Music and Spotify, VOC analysis and think-aloud usability tests with three participants, we confirmed that deep menus made creating and sharing playlists hard. When the team disagreed, I used the test observations to settle the discussion.",
    },
    result: {
      ko: "플레이리스트 추가 버튼을 옮기고 재생→편집→공유 동선을 줄인 As-Is/To-Be 흐름 4단계를 완성하고, 과업 완료율로 개선을 검증했어요.",
      en: "Delivered As-Is and To-Be flows for four core stages, moving the add-to-playlist button and shortening the path from playback to editing and sharing, validated with task completion rates.",
    },
    tags: ["Usability testing", "Competitor analysis", "Figma", "Team facilitation"],
  },
  {
    kind: { ko: "UX 프로젝트", en: "UX project" },
    title: {
      ko: "클룩 투어·티켓 검색 단계 간소화",
      en: "Simplifying search on Klook tours and tickets",
    },
    summary: {
      ko: "33명 설문, VOC 분석, 심층 인터뷰로 응답자의 52.4%가 상품 찾기를 어려워한다는 점을 확인했어요. 멘토 피드백을 반영해 Figma 와이어프레임을 세 번 다시 만들며 불필요한 기본 필터를 없애고 제외 필터를 추가했어요.",
      en: "Surveys with 33 respondents, VOC analysis and in-depth interviews showed that 52.4% found product discovery difficult. Based on mentor feedback I rebuilt the Figma wireframes three times, removing unnecessary default filters and adding an exclusion filter.",
    },
    result: {
      ko: "검색 단계를 줄이는 핵심 UI 개선안 3가지를 팀으로 확정했어요.",
      en: "The team finalized three core UI solutions that shortened the search funnel.",
    },
    tags: ["User survey", "Interviews", "Design iteration", "Figma"],
  },
  {
    kind: { ko: "MVP 기획", en: "MVP planning" },
    title: {
      ko: "학습 피드백 앱 FLEED 0 to 1 MVP 기획",
      en: "0-to-1 MVP planning for FLEED, a study feedback app",
    },
    summary: {
      ko: "20대 취업 준비생 27명 설문으로 늦은 피드백, 불분명한 성장 경로, 학습 동기 부족이라는 문제를 정의했어요. 팀 역할을 나누고 정보 구조·플로차트·와이어프레임을 설계했고, 초기 와이어프레임 사용자 테스트로 사용성 문제를 고쳤어요.",
      en: "A survey of 27 job seekers in their twenties defined the core problems: slow feedback, unclear growth paths and low motivation. I organized team roles, designed the information architecture, flowcharts and wireframes, and fixed usability blockers found in user tests on the early wireframes.",
    },
    result: {
      ko: "1:1·그룹 피드백, 성장 타임라인, 게이미피케이션을 담은 MVP 프로토타입과 브랜딩, 데모 영상, 비즈니스 모델 제안을 완성했어요.",
      en: "Completed a validated MVP prototype with one-on-one and group feedback, a growth timeline and gamification, plus branding, a demo video and a business model proposal.",
    },
    tags: ["0 to 1", "Information architecture", "Wireframes", "Usability validation"],
  },
];
