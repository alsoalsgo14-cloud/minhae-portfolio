// ─────────────────────────────────────────────
// Selected Works + 프로젝트 상세 데이터
// · 배열 순서 = 메인 카드 순서
// · src  : images-src 폴더 기준 원본 경로. 예: 'detail/hago/bag-wallet.jpg'
//          → npm run images 를 실행하면 웹용 변환 + 비율 계산이 자동으로 됩니다. (GIF는 영상으로 변환)
// · parts: 여러 장을 위에서부터 이어 붙여 한 페이지로 표시. 예: [메인.gif, 섹션1.gif, 섹션2.jpg]
// · ratio: 이미지가 아직 없을 때 플레이스홀더 비율 ('가로/세로'). 이미지가 들어가면 무시됩니다.
// · device: 'pc' | 'mo' → 상세 페이지에서 PC·MO 결과물을 나란히 배치
// · null 은 화면에 "추후 입력"으로 표시됩니다. 확인되지 않은 정보는 null 로 두세요.
// · section: 'work'(기본, SELECTED WORKS) | 'personal'(PERSONAL 섹션)
//   같은 섹션 안에서는 배열 순서대로 표시됩니다.
// ─────────────────────────────────────────────

// 기획전 배너 규격
export const BANNER = { pc: 1920, mo: 1080 };

const emptyMeta = {
  type: null, // 분류. 예: 기획전 / 상세페이지 리디자인
  kind: null, // 구분. 예: 실무 / 개인 작업
  period: null, // 기간. 예: 2025.03 – 2025.04
  contribution: null, // 기여도. 예: 디자인 100%
};

const emptySections = {
  overview: null, // 프로젝트 소개
  purpose: null, // 작업 목적
  role: null, // 담당 범위
  tools: [], // 사용 툴
  direction: null, // 디자인 방향
};

const HR = 'campaigns/hashtag-rush';
const HR_PC = [`${HR}/pc-main.gif`, `${HR}/pc-section1.gif`, `${HR}/pc-section2.jpg`];
const HR_MO = [`${HR}/mo-main.gif`, `${HR}/mo-section1.gif`, `${HR}/mo-section2.jpg`];

const BN = 'campaigns/banners';
const bannerSets = [
  { id: 'outlet-coupon-deal', title: 'OUTLET COUPON DEAL' },
  { id: 'clearance-stock-out', title: 'CLEARANCE : STOCK-OUT' },
  { id: 'outlet-winter', title: 'OUTLET WINTER' },
  { id: 'wwb-big-sale', title: 'WWB BIG SALE' },
];

// 웹사이트 리디자인: 폴더/pc · 폴더/mo 의 화면 목록을 결과물 형식으로 변환
// [파일, 이름] — 파일 자리에 배열을 넣으면 여러 장을 이어 붙여 한 화면으로 표시
function site(base, { pc = [], mo = [] }) {
  const one = (dev) => ([file, label]) => ({
    label,
    device: dev,
    long: true, // 확대 시 세로 스크롤로 전체 화면 보기
    ...(Array.isArray(file) ? { parts: file.map((f) => `${base}/${dev}/${f}`) } : { src: `${base}/${dev}/${file}` }),
  });
  return [...pc.map(one('pc')), ...mo.map(one('mo'))];
}

export const projects = [
  {
    id: 'hashtag-rush',
    title: 'HASHTAG RUSH',
    category: '기획전',
    specs: [`PC ${BANNER.pc}px`, `MO ${BANNER.mo}px`],
    summary: null,
    // 카드 미리보기: 'long' = 긴 이미지가 호버 시 세로로 이동 / 'screen' = 브라우저 화면 미리보기
    preview: 'long',
    cover: { parts: HR_PC },
    keyImage: { src: `${HR}/pc-main.gif` },
    meta: { ...emptyMeta, type: '기획전' },
    sections: { ...emptySections },
    results: [
      { label: 'HASHTAG RUSH — PC', device: 'pc', parts: HR_PC, long: true },
      { label: 'HASHTAG RUSH — MO', device: 'mo', parts: HR_MO, long: true },
    ],
  },
  {
    id: 'hago',
    section: 'personal', // PERSONAL 섹션에 표시
    title: 'HAGO',
    category: '상세페이지 리디자인',
    specs: ['개인 작업'],
    summary: null,
    preview: 'screen',
    cover: { src: 'detail/hago/bag-wallet.jpg' },
    keyImage: false, // 키 비주얼 영역 숨김 (이미지가 생기면 { src: '...' } 로 변경)
    resultsLayout: 'columns', // 결과물을 나란히 배치
    meta: {
      ...emptyMeta,
      type: '상세페이지 리디자인',
      kind: '개인 작업',
      // period, contribution 은 확인 후 입력
    },
    sections: { ...emptySections },
    results: [
      { label: '가방 · 지갑', src: 'detail/hago/bag-wallet.jpg', long: true },
      { label: '슈즈 · 부츠', src: 'detail/hago/shoes-boots.jpg', long: true },
      { label: '여성 스커트', src: 'detail/hago/woman-skirt.jpg', long: true },
    ],
  },
  {
    id: 'beentrill-ajobyajo',
    title: 'BEENTRILL × AJOBYAJO',
    category: '기획전',
    specs: [`PC ${BANNER.pc}px`, `MO ${BANNER.mo}px`],
    summary: null,
    preview: 'long',
    cover: { src: 'campaigns/beentrill-ajobyajo/pc.jpg' },
    keyImage: false,
    meta: { ...emptyMeta, type: '기획전' },
    sections: { ...emptySections },
    results: [
      { label: 'BEENTRILL × AJOBYAJO — PC', device: 'pc', src: 'campaigns/beentrill-ajobyajo/pc.jpg', long: true },
      { label: 'BEENTRILL × AJOBYAJO — MO', device: 'mo', src: 'campaigns/beentrill-ajobyajo/mo.jpg', long: true },
    ],
  },
  {
    id: 'promotion-banners',
    title: 'PROMOTION BANNERS',
    category: '기획전 배너',
    specs: [`PC ${BANNER.pc}px`, `MO ${BANNER.mo}px`],
    summary: null,
    preview: 'long',
    // 카드: PC 배너 4개를 이어 붙여 호버 시 차례로 보여줌
    cover: { parts: bannerSets.map((b) => `${BN}/${b.id}-pc.jpg`) },
    keyImage: false,
    meta: { ...emptyMeta, type: '기획전 배너' },
    sections: { ...emptySections },
    results: bannerSets.flatMap((b) => [
      { label: `${b.title} — PC`, device: 'pc', src: `${BN}/${b.id}-pc.jpg` },
      { label: `${b.title} — MO`, device: 'mo', src: `${BN}/${b.id}-mo.jpg` },
    ]),
  },
  // ── 개인 작업 — 웹사이트 리디자인 ──
  // resultsLayout: 'site' → 상세 페이지에서 PC 화면은 3열, MO 화면은 6열로 묶어서 표시
  {
    id: 'hollys',
    section: 'personal',
    title: 'HOLLYS',
    category: '웹사이트 리디자인',
    specs: ['개인 작업', 'PC · MO'],
    summary: '"작은 차이의 미학" — 할리스 커피 웹사이트 UX/UI 리디자인',
    preview: 'screen',
    cover: { src: 'personal/hollys/pc/01-index.jpg' },
    keyImage: { src: 'hero/hollys-mockup.jpg' },
    resultsLayout: 'site',
    meta: {
      ...emptyMeta,
      type: '웹사이트 리디자인',
      kind: '개인 작업',
      period: '2025.07',
      // contribution(기여도)은 확인 후 입력
    },
    sections: {
      overview:
        '할리스 커피 공식 웹사이트 리디자인 프로젝트입니다. "커피의 즐거움을 만드는 작은 차이의 미학"을 콘셉트로, 브랜드 철학이 느껴지는 정보 구성과 세련된 비주얼, 메뉴 소개와 매장 경험을 하나로 연결해 할리스만의 프리미엄 캐주얼 감성을 강화했습니다.',
      purpose:
        '기존 사이트를 진단한 결과 와이드 해상도 대응 미흡, 작은 글자와 불명확한 위계로 인한 정보 전달력 저하, 정돈되지 않은 컬러 시스템, 좌측 고정 LNB로 좁아진 서브페이지, 낮은 이미지 품질이 문제로 드러났습니다. 시즌 메뉴와 매장 정보를 빠르게 찾을 수 있고, 커피 한 잔의 경험이 사이트 안에서도 이어지도록 사용자 중심으로 재설계하는 것을 목표로 했습니다.',
      role: '사용성 진단 · 페르소나 설정 · AS IS / GAP / TO BE 개선안 도출 · 컬러와 서체 시스템 정의 · 메인과 서브페이지 PC / MO UI 디자인',
      tools: [], // 사용 툴 확인 후 입력. 예: ['Figma', 'Photoshop']
      direction:
        'Consistency(브랜드 감성과 사용자 경험의 일관된 전달), Clarity(명확하고 직관적인 정보 구조), Emotion(프리미엄 감성과 따뜻한 분위기)을 세 가지 축으로 잡았습니다. 할리스 레드를 포인트로 크림과 브라운 톤을 더해 따뜻한 분위기를 만들고, 영문은 Archopada, 국문은 Noto Sans KR을 16px 이상으로 사용해 가독성을 확보했습니다. 반응형 레이아웃과 우선순위 기반의 비대칭 배치로 콘텐츠 집중도를 높였습니다.',
    },
    results: site('personal/hollys', {
      pc: [
        ['01-index.jpg', 'INDEX'],
        ['02-hollys-is.jpg', 'HOLLYS IS'],
        ['03-menu.jpg', 'MENU'],
        ['04-menu-detail.jpg', 'MENU — 상세'],
        ['05-store.jpg', 'STORE'],
        ['06-news.jpg', 'NEWS'],
        ['07-membership.jpg', 'MEMBERSHIP'],
      ],
      mo: [
        ['01-index.png', 'INDEX'],
        ['02-hollys-is.jpg', 'HOLLYS IS'],
        ['03-menu.png', 'MENU'],
        ['04-menu-detail.jpg', 'MENU — 상세'],
        [['05-store-1.jpg', '05-store-2.jpg'], 'STORE'],
        ['06-news.jpg', 'NEWS'],
        ['07-membership.jpg', 'MEMBERSHIP'],
      ],
    }),
  },
  {
    id: 'sk-view',
    section: 'personal',
    title: 'SK VIEW',
    category: '웹사이트 리디자인',
    specs: ['개인 작업', 'PC · MO'],
    summary: '"복잡한 여정을 단순하게" — SK VIEW 웹사이트 UX/UI 개선 제안',
    preview: 'screen',
    cover: { src: 'personal/sk-view/pc/01-index.jpg' },
    keyImage: { src: 'hero/sk-view-mockup.jpg' },
    resultsLayout: 'site',
    meta: {
      ...emptyMeta,
      type: '웹사이트 리디자인',
      kind: '개인 작업',
      period: '2025.08',
      // contribution(기여도)은 확인 후 입력
    },
    sections: {
      overview:
        'SK VIEW 공식 웹사이트 UX/UI 개선 제안 프로젝트입니다. "신뢰와 프리미엄을 전달하는 경험"을 주제로, 모바일 우선 설계와 정보 구조(IA) 재정비를 통해 분양 정보 전달력과 상담 전환을 함께 높이는 데 초점을 맞췄습니다.',
      purpose:
        '기존 사이트는 비주얼 중심 구성으로 분양 일정 · 평면 · 가격 같은 핵심 정보가 스크롤 아래로 밀리고, 깊은 메뉴 구조와 흩어진 상담 버튼, 모바일과 데스크톱 도메인 분리로 원하는 정보에 도달하기 어려웠습니다. "복잡한 여정을 단순하게, 더 빠른 길로 연결하다"를 목표로 분양 · 입주 · 상담 같은 주요 행동을 최소한의 클릭으로 할 수 있도록 재구성했습니다. (기대 효과: 모바일 이탈률 -15%, 상담 전환율 +20%, 정보 도달 시간 -30%)',
      role: '현황 분석과 벤치마킹 · 페르소나 4종과 사용자 여정 맵 작성 · 정보 구조(IA) 재설계 · 컬러와 서체 시스템 정의 · 메인과 서브페이지 PC / MO UI 디자인',
      tools: [], // 사용 툴 확인 후 입력. 예: ['Figma', 'Photoshop']
      direction:
        '브랜드 메시지 "Better Life, Smarter Choice"를 중심으로, SK의 레드와 오렌지를 포인트로 두고 네이비 · 브라운 · 웜 그레이 계열로 신뢰감 있는 프리미엄 톤을 맞췄습니다. 영문은 Montserrat, 국문은 Pretendard를 사용했습니다. 분양 요약 카드와 핵심 정보를 상단에 배치하고 상담 버튼을 화면에 고정해, 정보 탐색에서 상담까지 끊김 없이 이어지도록 설계했습니다.',
    },
    results: site('personal/sk-view', {
      pc: [
        ['01-index.jpg', 'INDEX'],
        ['02-brand.jpg', 'BRAND STORY'],
        ['03-sale.jpg', '분양정보'],
        ['04-construction-1.jpg', '입주정보 · 공사현황'],
        ['05-construction-2.jpg', '입주정보 · 공사현황 2'],
        ['06-support.jpg', '고객센터'],
      ],
      mo: [
        ['01-index.jpg', 'INDEX'],
        ['02-brand.jpg', 'BRAND STORY'],
        ['03-sale.jpg', '분양정보'],
        ['04-construction-1.jpg', '공사현황'],
        ['05-construction-2.jpg', '공사현황 2'],
        ['06-support.jpg', '고객센터'],
      ],
    }),
  },
  {
    id: 'sns-renewal',
    title: 'SNS RENEWAL',
    category: 'SNS',
    specs: [],
    summary: null,
    preview: 'long',
    cover: { ratio: '1080/3240', src: null },
    meta: { ...emptyMeta },
    sections: { ...emptySections },
    results: [
      { label: 'SNS 피드 01', ratio: '1080/1350', src: null },
      { label: 'SNS 피드 02', ratio: '1080/1350', src: null },
      { label: 'SNS 피드 그리드', ratio: '1080/3240', src: null, long: true },
    ],
  },
];

// 상세 페이지 섹션 순서 (모든 프로젝트 공통)
export const detailSections = [
  { key: 'overview', en: 'OVERVIEW', ko: '프로젝트 소개' },
  { key: 'purpose', en: 'PURPOSE', ko: '작업 목적' },
  { key: 'role', en: 'ROLE & TOOLS', ko: '담당 범위 · 사용 툴' },
  { key: 'direction', en: 'DIRECTION', ko: '디자인 방향' },
];

export const metaLabels = [
  { key: 'type', label: '분류' },
  { key: 'kind', label: '구분' },
  { key: 'period', label: '기간' },
  { key: 'contribution', label: '기여도' },
];
