// ─────────────────────────────────────────────
// 사이트 공통 정보
// null 로 둔 값은 화면에 "추후 입력"으로 표시됩니다.
// ─────────────────────────────────────────────

export const site = {
  name: 'MINHAE',

  // 로고: 기본은 src/assets/minhae-logo.svg (벡터, 배경에 따라 흑/백 자동)
  // 다른 파일로 바꾸려면 src 에 경로 입력. 예: src: './images/logo/new-logo.svg'
  logo: { src: null, alt: 'MINHAE' },

  role: 'Fashion Web Designer',
  intro: '패션 브랜드의 기획전, 자사몰 배너, 상세페이지, SNS 콘텐츠를 만드는 웹디자이너입니다.',

  nav: [
    { id: 'personal', label: 'PERSONAL' },
    { id: 'image-lab', label: 'IMAGE LAB' },
    { id: 'detail-pages', label: 'DETAIL' },
    { id: 'work', label: 'WORK' },
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
    // MO 메인(가로 1080px) 원본 비율 그대로 — 잘리지 않음
    { slot: 'd', project: 'hashtag-rush', label: 'HASHTAG RUSH', ratio: '1080/1246', depth: 1.4, src: 'campaigns/hashtag-rush/mo-main.gif' },
  ],

  about: {
    statement:
      '패션 브랜드의 기획전, 자사몰 배너, 상세페이지, SNS 콘텐츠를 디자인합니다. AI 이미지와 보정 작업으로 캠페인 비주얼까지 함께 만듭니다.',
    capabilities: ['기획전', '자사몰 배너', '상세페이지', 'SNS 콘텐츠', 'AI 이미지 · 보정'],
    details: [
      { label: 'EXPERIENCE', value: null },
      { label: 'TOOLS', value: null },
      { label: 'EDUCATION', value: null },
    ],
  },

  // href 가 있으면 링크로, 없으면 텍스트로 표시됩니다.
  contact: [
    { label: 'EMAIL', value: null, href: null },
    { label: 'INSTAGRAM', value: null, href: null },
    { label: 'RESUME', value: null, href: null },
  ],
};
