// ─────────────────────────────────────────────
// 사이트 공통 정보
// null 로 둔 값은 화면에 "추후 입력"으로 표시됩니다.
// ─────────────────────────────────────────────

export const site = {
  name: 'MINHAE',

  // 방문자 분석 — Google Analytics 4 측정 ID (예: 'G-AB12CD34EF'). null 이면 꺼짐
  analytics: { ga4: 'G-ZLZLVKYMW3' },

  // 로고: 기본은 src/assets/minhae-logo.svg (벡터, 배경에 따라 흑/백 자동)
  // 다른 파일로 바꾸려면 src 에 경로 입력. 예: src: './images/logo/new-logo.svg'
  logo: { src: null, alt: 'MINHAE' },

  role: null, // 첫 화면 작은 글씨 (예: 'Fashion Web Designer'). null 이면 표시 안 함
  // 메인 첫 화면 문구 — headline(h1, 굵게) / intro(h2, 보통 굵기)
  headline: 'DESIGNING BRAND VISUALS.',
  intro: '패션 브랜드의 무드를 발견하고, 감각적인 콘텐츠로 표현합니다.',

  nav: [
    { id: 'personal', label: 'PERSONAL' },
    { id: 'image-lab', label: 'IMAGE LAB' },
    { id: 'detail-pages', label: 'DETAIL' },
    { id: 'work', label: 'WORK' },
    { id: 'store', label: 'STORE' },
    { id: 'about', label: 'ABOUT' },
    { id: 'contact', label: 'CONTACT' },
  ],

  // 메인 첫 화면의 이미지 프레임 (3~4개 권장)
  // project: 클릭 시 이동할 프로젝트 id / ratio: 가로/세로 비율 / depth: 마우스 반응 강도
  heroFrames: [
    // slot: 위치
    //   위 줄  a 왼쪽 · e 가운데(작게) · f 가운데 · b 오른쪽
    //   아래 줄 c 왼쪽 · g 가운데 왼쪽 · h 소개글 아래 · d 오른쪽
    //   (e · f · g · h 는 모바일에서 숨김)
    // project: 누르면 이동할 곳 / ratio: 프레임 비율 / depth: 마우스 반응 강도
    // focus: 프레임 안에서 보이는 위치 ('top' | 'center' | 'bottom' 또는 '30%')
    { slot: 'a', project: 'image-lab', label: 'IMAGE LAB', ratio: '3/4', depth: 1.2, src: 'ai-outfit/personal/personal-02.jpg' },
    { slot: 'e', project: 'image-lab', label: 'IMAGE LAB', ratio: '3/4', depth: 1.5, src: 'hero/ai-street.png' },
    { slot: 'f', project: 'image-lab', label: 'IMAGE LAB', ratio: '1763/2500', depth: 0.8, src: 'ai-outfit/personal/personal-03.jpg' },
    { slot: 'b', project: 'hago', label: 'HAGO', ratio: '4/3', depth: 0.7, src: 'detail/hago/bag-wallet.jpg' },
    { slot: 'c', project: 'beentrill-ajobyajo', label: 'BEENTRILL × AJOBYAJO', ratio: '1/1', depth: 0.9, src: 'campaigns/beentrill-ajobyajo/pc.jpg', focus: 'top' },
    { slot: 'g', project: 'hollys', label: 'HOLLYS', ratio: '16/9', depth: 1.3, src: 'hero/hollys-mockup.jpg' },
    { slot: 'h', project: 'sk-view', label: 'SK VIEW', ratio: '3700/2290', depth: 1.1, src: 'hero/sk-view-mockup.jpg' },
    // CLEARANCE : STOCK-OUT 기획전 배너 목업 — 원본 비율 그대로
    { slot: 'd', project: 'promotion-banners', label: 'CLEARANCE : STOCK-OUT', ratio: '1080/1557', depth: 1.4, src: 'hero/clearance-mockup.jpg' },
  ],

  // ABOUT — 문단은 배열 순서대로 표시 (첫 문단은 크게)
  about: {
    // 프로필 사진 (images-src 기준). 없으면 null
    photo: { src: 'about/profile.jpg', alt: '박민해 프로필 사진' },
    intro: [
      '현재 패션 브랜드의 웹디자이너로 근무하며 자사몰 기획전과 배너, 상품 상세페이지, SNS 콘텐츠 등 온라인 디자인 전반을 담당하고 있습니다.',
      '브랜드마다 다른 분위기를 살리는 데 관심이 많아 SNS 피드 리뉴얼과 비주얼 가이드라인 제작에 참여했으며, AI를 활용한 이미지 제작과 상품 연출컷 보정, 룩북 촬영 스타일링 및 현장 지원 등까지 다양한 업무를 경험했습니다.',
      '주어진 작업을 완성하는 것에 그치지 않고, 어떻게 하면 상품이 더 매력적으로 보이고 브랜드의 분위기가 잘 전달될지 고민하며 작업합니다.',
    ],
    capabilities: [
      '기획전 · 프로모션 디자인',
      '자사몰 배너 · 이벤트 비주얼',
      '상품 상세페이지 · 콘텐츠 구성',
      'SNS 콘텐츠 · 피드 리뉴얼',
      'AI 이미지 생성 · 리터칭',
      '브랜드 비주얼 가이드라인',
      '룩북 · 스타일링 콘텐츠',
      '촬영 디렉션 · 현장 지원',
      'PC · MO 웹 콘텐츠 최적화',
      '온라인 마케팅 디자인',
      '그래픽 · 타이포그래피 디자인',
      '이미지 편집 · 누끼 · 합성',
    ],
    experience: [
      {
        company: '월드와이드브랜즈(WWB)',
        role: '웹디자이너',
        period: '2026.05 – 재직중',
        desc: '빈트릴(BEENTRILL), VOLCOM 등 패션 브랜드 자사몰 디자인 및 운영',
        items: [
          '시즌별 프로모션 및 대형 기획전 메인·서브 배너 제작',
          'PC·MO 상세페이지 및 이벤트 콘텐츠 디자인',
          'SNS 피드 리뉴얼 및 브랜드 비주얼 가이드라인 구축',
          'AI 이미지 생성 및 상품 연출컷 제작·보정',
          '룩북 촬영 착장 구성 및 촬영 현장 지원',
          '상품 이미지 편집, 리사이징 및 웹사이트 유지보수',
          '프로모션 기획안 및 협업용 Google Slides 제작',
        ],
      },
      {
        company: '뉴킥코퍼레이션',
        role: '디자인팀 콘텐츠 디자이너',
        period: '2025.11 – 2026.05',
        desc: null,
        items: [
          '광고·마케팅 관련 클라이언트 디자인 콘텐츠 제작',
          '상세페이지, 이벤트 배너, 블로그 스킨 및 푸터 디자인',
          '월평균 120건 이상의 디자인 업무 수행',
          '다양한 브랜드의 디자인 가이드에 맞춘 콘텐츠 제작 및 운영',
        ],
      },
    ],
    // [이름, 설명] — 설명이 없으면 이름만
    tools: [
      {
        group: 'DESIGN',
        items: [
          ['Adobe Photoshop', '이미지 보정, 합성, 누끼, 상세페이지 및 배너 제작'],
          ['Adobe Illustrator', '그래픽, 로고, 아이콘 및 타이포그래피 제작'],
          ['Figma', '웹 화면 구성, 시안 제작 및 협업'],
        ],
      },
      {
        group: 'AI CREATIVE',
        items: [
          ['ChatGPT', '디자인 기획 및 이미지 프롬프트 작성'],
          ['Higgsfield / Gemini / kive', 'AI 이미지 및 비주얼 콘텐츠 제작'],
        ],
      },
      {
        group: 'WEB',
        items: [['HTML / CSS / JavaScript / jQuery'], ['Cafe24', '자사몰 운영 및 콘텐츠 관리']],
      },
      {
        group: 'DOCUMENT',
        items: [
          ['Notion', '일정 관리 및 업무 진행 현황 관리'],
          ['Google Sheets', '업무 현황·자료 정리 및 데이터 관리'],
          ['Google Slides', '기획안 및 디자인 제안 자료 제작'],
        ],
      },
    ],
    education: [
      {
        school: '대학교',
        major: '도자·유리 전공',
        period: '2024.02 졸업',
        items: [
          '재료의 특성과 조형적 요소를 활용한 디자인 및 제작 경험',
          '형태, 색상, 질감에 대한 시각적 관찰과 표현 능력 습득',
          '기획부터 제작, 결과물 완성까지의 디자인 프로세스 경험',
        ],
      },
    ],
  },

  // href 가 있으면 링크로, 없으면 텍스트로 표시됩니다. 줄을 지우면 화면에서도 사라집니다.
  contact: [
    { label: 'EMAIL', value: 'alsoalsgo14@gmail.com', href: 'mailto:alsoalsgo14@gmail.com' },
    { label: 'INSTAGRAM', value: '@m.1nae_', href: 'https://www.instagram.com/m.1nae_/' },
    // public/files 폴더의 PDF — 파일을 바꿀 땐 같은 이름으로 덮어쓰면 됩니다
    { label: 'RESUME', value: 'PDF', href: './files/minhae-resume.pdf' },
  ],
};
