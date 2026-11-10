// ─────────────────────────────────────────────
// Selected Works + 프로젝트 상세 데이터
// · 배열 순서 = 메인 카드 순서
// · src  : images-src 폴더 기준 원본 경로. 예: 'detail/hago/bag-wallet.jpg'
//          → npm run images 를 실행하면 웹용 변환 + 비율 계산이 자동으로 됩니다. (GIF는 영상으로 변환)
// · parts: 여러 장을 위에서부터 이어 붙여 한 페이지로 표시. 예: [메인.gif, 섹션1.gif, 섹션2.jpg]
// · ratio: 이미지가 아직 없을 때 플레이스홀더 비율 ('가로/세로'). 이미지가 들어가면 무시됩니다.
// · device: 'pc' | 'mo' → 상세 페이지에서 PC·MO 결과물을 나란히 배치
// · null 은 화면에 "추후 입력"으로 표시됩니다. 확인되지 않은 정보는 null 로 두세요.
// · false 로 두면 해당 항목(meta 한 줄 또는 sections 한 섹션)을 화면에서 아예 숨깁니다.
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
    summary: "WWB '2026 HASHTAG RUSH' 프로모션 기획전 — 블랙·옐로우의 강렬한 캠페인 비주얼",
    // 카드 미리보기: 'long' = 긴 이미지가 호버 시 세로로 이동 / 'screen' = 브라우저 화면 미리보기
    preview: 'long',
    cover: { parts: HR_PC },
    keyImage: { src: `${HR}/pc-main.gif` },
    meta: {
      type: '기획전',
      kind: '기획전 배너 및 랜딩페이지',
      period: '2026.10.28 – 11.02',
      contribution: '80%',
    },
    // 문자열 = 문단 / 배열 = 목록 / { text, items } = 문단 + 목록
    sections: {
      overview:
        "WWB의 온라인 프로모션 캠페인 '2026 HASHTAG RUSH' 기획전 디자인 프로젝트입니다. 브랜드의 아이덴티티를 반영한 강렬한 메인 비주얼을 중심으로 시즌 특가, 주말 특가, 균일가전, 쿠폰팩 및 구매 리워드 등 다양한 프로모션 정보를 하나의 페이지에 구성했습니다. 고객이 주요 혜택을 직관적으로 인지하고 이벤트에 참여할 수 있도록 PC·MO 환경에 최적화된 기획전 페이지를 제작했습니다.",
      purpose: [
        '대규모 프로모션에 적합한 강렬하고 주목도 높은 메인 비주얼 구축',
        '다양한 할인 혜택과 이벤트 정보를 직관적으로 전달',
        '쿠폰 다운로드 및 상품 특가 영역의 시각적 접근성 강화',
        '프로모션별 정보 위계와 콘텐츠 흐름을 고려한 구매 유도',
        'PC·MO 환경에 대응하는 일관된 캠페인 디자인 구현',
      ],
      role: {
        text: '메인 비주얼 배너 및 롤링 배너부터 기획전 페이지 디자인 전반 담당',
        items: [
          'PC·MO 메인 배너 디자인',
          '프로모션 롤링 배너 디자인',
          '특가 카테고리 및 상품 안내 영역 디자인',
          '쿠폰팩 및 쿠폰 다운로드 영역 디자인',
          '구매 리워드 및 이벤트 혜택 영역 디자인',
          'PC·MO 상세페이지 리사이징 및 콘텐츠 최적화',
        ],
      },
      tools: ['Adobe Photoshop', 'Figma'],
      direction: [
        '블랙과 옐로우 컬러를 중심으로 캠페인의 강렬한 비주얼 아이덴티티 구축',
        '대형 타이포그래피와 입체 그래픽을 활용한 메인 비주얼 연출',
        '할인율과 혜택 정보를 강조한 직관적인 프로모션 레이아웃 구성',
        '쿠폰 및 리워드 영역에 시각적 대비를 적용해 핵심 혜택 강조',
        '긴 스크롤 페이지에서도 자연스럽게 이어지는 콘텐츠 흐름 설계',
        'PC·MO 환경에 맞춘 정보 배치와 이미지 비율 최적화',
      ],
    },
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
    summary: 'HAGO 패션·잡화 상세페이지 리디자인 — 이미지 중심의 Product Story 구성',
    preview: 'screen',
    cover: { src: 'detail/hago/bag-wallet.jpg' },
    keyImage: false, // 키 비주얼 영역 숨김 (이미지가 생기면 { src: '...' } 로 변경)
    resultsLayout: 'columns', // 결과물을 나란히 배치
    meta: {
      ...emptyMeta,
      type: '상세페이지 리디자인',
      kind: '개인 작업',
      contribution: '기획 · 디자인 100%',
      period: false, // 기간 숨김
    },
    sections: {
      overview:
        'HAGO의 패션·잡화 상품 상세페이지를 리디자인한 프로젝트입니다. 상품의 디자인적 특징과 활용 가치를 직관적으로 전달할 수 있도록 이미지 중심의 콘텐츠를 재구성하고, 브랜드의 감성과 상품 고유의 매력이 자연스럽게 연결되는 상세페이지를 기획·제작했습니다.',
      purpose: [
        '상품의 핵심 디자인과 디테일을 효과적으로 전달할 수 있는 콘텐츠 구성',
        '이미지와 텍스트의 위계를 정리해 정보 전달력 및 가독성 개선',
        '상품의 특징과 스타일링을 함께 제안하여 구매자의 상품 이해도 향상',
        '일관된 비주얼 흐름을 통해 브랜드 이미지와 상품의 매력 강화',
      ],
      role: '100% 기획 및 디자인',
      tools: ['Figma', 'Adobe Photoshop'],
      direction: [
        '상품의 분위기와 특성을 살린 이미지 중심의 비주얼 구성',
        '여백과 타이포그래피를 활용한 미니멀한 레이아웃 설계',
        '착용 이미지와 제품 디테일 컷을 조합한 스토리텔링 구성',
        '상품의 특징이 자연스럽게 읽히도록 콘텐츠의 시각적 흐름 최적화',
      ],
    },
    // 결과물 이미지 위에 표시되는 설명 (없으면 생략)
    resultsNote: [
      'HAGO 상품 상세페이지 비주얼 리디자인',
      '상품별 특성을 반영한 Product Story 콘텐츠 제작',
      '모델 착용컷 및 제품 디테일 중심의 이미지 레이아웃 구성',
      '상품과 연계한 스타일링 제안 및 LOOK 콘텐츠 구성',
      '이미지와 텍스트의 정보 위계를 고려한 상세페이지 디자인 완성',
    ],
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
    summary: '빈트릴 × 아조바이아조 26 S/S 컬래버레이션 런칭 기획전',
    preview: 'long',
    cover: { src: 'campaigns/beentrill-ajobyajo/pc.jpg' },
    keyImage: false,
    meta: { ...emptyMeta, type: '기획전', kind: '기획전 배너', period: false, contribution: '90%' },
    sections: {
      ...emptySections,
      overview:
        '빈트릴(BEENTRILL)과 아조바이아조(AJOBYAJO)의 26 S/S 컬래버레이션 런칭 기획전 디자인 프로젝트입니다. 티셔츠·볼캡·에코백으로 구성된 협업 컬렉션을 DROPLIST 형식으로 소개하고, 런칭 쿠폰 다운로드 영역까지 하나의 흐름으로 이어지도록 PC·MO 기획전 페이지를 제작했습니다.',
      purpose: false, // 작업 목적 숨김
      tools: ['Adobe Photoshop', 'Figma'],
      direction: [
        '크라프트지·찢어진 종이·체크 원단·신문 콜라주를 겹쳐 스트리트 감성의 아카이브 무드 연출',
        '아이보리·그레이 톤 바탕에 레드 포인트를 더해 쿠폰과 발매 정보 강조',
        'DROPLIST 구성으로 티셔츠·볼캡·에코백을 카테고리별 그리드로 정리',
        '바코드·스탬프·DROP 마크 등 태그 그래픽으로 한정 발매 컬래버레이션 분위기 표현',
        '상품 소개에서 쿠폰 다운로드까지 이어지는 흐름으로 구매 동선 연결',
        'PC·MO 환경에 맞춘 레이아웃과 이미지 비율 재구성',
      ],
    },
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
    summary: '아울렛·클리어런스·빅세일 등 시즌 프로모션 기획전 메인 배너 4종',
    preview: 'long',
    // 카드: PC 배너 4개를 이어 붙여 호버 시 차례로 보여줌
    cover: { parts: bannerSets.map((b) => `${BN}/${b.id}-pc.jpg`) },
    keyImage: false,
    meta: { ...emptyMeta, type: '기획전 배너', kind: '기획전 배너', period: false, contribution: '90%' },
    sections: {
      ...emptySections,
      overview:
        'WWB 자사몰의 시즌 프로모션 기획전 메인 배너 디자인 프로젝트입니다. OUTLET COUPON DEAL, CLEARANCE : STOCK-OUT, OUTLET WINTER, WWB BIG SALE 등 행사마다 성격에 맞는 비주얼을 제작하고, 할인율과 행사 기간이 한눈에 들어오도록 PC 1920px · MO 1080px 규격으로 구성했습니다.',
      purpose: false, // 작업 목적 숨김
      tools: ['Adobe Photoshop', 'Figma'],
      direction: [
        '기획전마다 콘셉트에 맞는 컬러와 질감으로 각기 다른 무드 연출 — 메탈 텍스처와 민트(OUTLET COUPON DEAL), 얼음 질감의 3D 타이포와 블루(OUTLET WINTER), 흑백 배너 목업(CLEARANCE : STOCK-OUT), 아이보리 바탕의 레트로 포스터와 레드·옐로우(WWB BIG SALE)',
        '대형 타이포그래피로 행사명과 할인율을 첫눈에 인지하도록 구성',
        '기간·시간·쿠폰·리워드 등 세부 정보는 하단에 모아 정보 위계 구분',
        '참여 브랜드 로고를 한 줄로 정렬해 멀티 브랜드 행사임을 표현',
        'PC 1920px · MO 1080px 규격에 맞춰 레이아웃 재구성',
      ],
    },
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
      contribution: '100%',
    },
    sections: {
      overview:
        '할리스 커피 공식 웹사이트 리디자인 프로젝트입니다. "커피의 즐거움을 만드는 작은 차이의 미학"을 콘셉트로, 브랜드 철학이 느껴지는 정보 구성과 세련된 비주얼, 메뉴 소개와 매장 경험을 하나로 연결해 할리스만의 프리미엄 캐주얼 감성을 강화했습니다.',
      purpose:
        '기존 사이트를 진단한 결과 와이드 해상도 대응 미흡, 작은 글자와 불명확한 위계로 인한 정보 전달력 저하, 정돈되지 않은 컬러 시스템, 좌측 고정 LNB로 좁아진 서브페이지, 낮은 이미지 품질이 문제로 드러났습니다. 시즌 메뉴와 매장 정보를 빠르게 찾을 수 있고, 커피 한 잔의 경험이 사이트 안에서도 이어지도록 사용자 중심으로 재설계하는 것을 목표로 했습니다.',
      role: '사용성 진단 · 페르소나 설정 · AS IS / GAP / TO BE 개선안 도출 · 컬러와 서체 시스템 정의 · 메인과 서브페이지 PC / MO UI 디자인',
      tools: ['Figma', 'Adobe Photoshop'],
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
      contribution: '100%',
    },
    sections: {
      overview:
        'SK VIEW 공식 웹사이트 UX/UI 개선 제안 프로젝트입니다. "신뢰와 프리미엄을 전달하는 경험"을 주제로, 모바일 우선 설계와 정보 구조(IA) 재정비를 통해 분양 정보 전달력과 상담 전환을 함께 높이는 데 초점을 맞췄습니다.',
      purpose:
        '기존 사이트는 비주얼 중심 구성으로 분양 일정 · 평면 · 가격 같은 핵심 정보가 스크롤 아래로 밀리고, 깊은 메뉴 구조와 흩어진 상담 버튼, 모바일과 데스크톱 도메인 분리로 원하는 정보에 도달하기 어려웠습니다. "복잡한 여정을 단순하게, 더 빠른 길로 연결하다"를 목표로 분양 · 입주 · 상담 같은 주요 행동을 최소한의 클릭으로 할 수 있도록 재구성했습니다. (기대 효과: 모바일 이탈률 -15%, 상담 전환율 +20%, 정보 도달 시간 -30%)',
      role: '현황 분석과 벤치마킹 · 페르소나 4종과 사용자 여정 맵 작성 · 정보 구조(IA) 재설계 · 컬러와 서체 시스템 정의 · 메인과 서브페이지 PC / MO UI 디자인',
      tools: ['Figma', 'Adobe Photoshop'],
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
