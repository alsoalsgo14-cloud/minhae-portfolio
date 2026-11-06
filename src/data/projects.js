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
    summary: null,
    preview: 'screen',
    cover: { src: 'personal/hollys/pc/01-index.jpg' },
    keyImage: { src: 'hero/hollys-mockup.jpg' },
    resultsLayout: 'site',
    meta: { ...emptyMeta, type: '웹사이트 리디자인', kind: '개인 작업' },
    sections: { ...emptySections },
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
    summary: null,
    preview: 'screen',
    cover: { src: 'personal/sk-view/pc/01-index.jpg' },
    keyImage: { src: 'hero/sk-view-mockup.jpg' },
    resultsLayout: 'site',
    meta: { ...emptyMeta, type: '웹사이트 리디자인', kind: '개인 작업' },
    sections: { ...emptySections },
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
