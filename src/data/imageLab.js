// ─────────────────────────────────────────────
// IMAGE LAB — AI 이미지 · 보정본 갤러리
// · src     : images-src 기준 경로 (npm run images 로 처리). 썸네일은 4:5로 잘려 보이고, 확대하면 원본 비율.
// · group   : 필터 구분 — 'ai' | 'lookbook' | 'feed' | 'personal' | 'retouch'
// · compare : true 이면 확대 뷰어에서 BEFORE / AFTER 비교 슬라이더
//             (before.src / after.src — 두 이미지는 같은 구도·비율이어야 정확히 겹칩니다)
// ─────────────────────────────────────────────

export const labFilters = [
  { id: 'all', label: 'ALL' },
  { id: 'ai', label: 'AI OUTFIT' },
  { id: 'lookbook', label: 'LOOKBOOK' },
  { id: 'feed', label: 'SNS FEED' },
  { id: 'personal', label: 'PERSONAL' },
  { id: 'retouch', label: 'RETOUCH' },
];

const pad = (n) => String(n).padStart(2, '0');

// AI 착장 이미지 (원본 파일명은 README 참고)
// 목록에서 빼면 갤러리에서 사라지고, 화면 번호(AI OUTFIT 01, 02 …)는 순서대로 다시 매겨집니다.
// 제외됨: ai-outfit-02.jpg(4.jpg), ai-outfit-03.jpg(9.jpg), ai-outfit-10.jpg(VA262TS106BK.jpg)
const aiFiles = [
  'ai-outfit-01.jpg', 'ai-outfit-04.png', 'ai-outfit-05.jpg', 'ai-outfit-06.jpg', 'ai-outfit-07.png',
  'ai-outfit-08.jpg', 'ai-outfit-09.jpg', 'ai-outfit-11.jpg', 'ai-outfit-12.jpg', 'ai-outfit-13.jpg',
  'ai-outfit-14.png',
];
const ai = aiFiles.map((f, i) => ({
  id: `ai-${pad(i + 1)}`,
  group: 'ai',
  title: `AI OUTFIT ${pad(i + 1)}`,
  note: 'AI 착장 이미지',
  src: `ai-outfit/${f}`,
}));

// AI 룩북 (image lab/ai outfit/룩북 1~11, 7번 없음 → lookbook-01 ~ 10)
const lookbook = Array.from({ length: 10 }, (_, i) => ({
  id: `lookbook-${pad(i + 1)}`,
  group: 'lookbook',
  title: `LOOKBOOK ${pad(i + 1)}`,
  note: 'AI 룩북 이미지',
  src: `ai-outfit/lookbook/lookbook-${pad(i + 1)}.jpg`,
}));

// AI 인스타 피드용 (image lab/ai outfit/인스타 피드용 12 ~ 34 → feed-01 ~ 11)
// 배열 순서 = 화면 순서 (SNS FEED 01, 02 … 번호는 순서대로 매겨짐)
const feedFiles = [
  'feed-03.png', 'feed-02.png', 'feed-01.jpg', 'feed-04.png', 'feed-05.png', 'feed-06.jpg',
  'feed-07.png', 'feed-08.png', 'feed-09.png', 'feed-10.jpg', 'feed-11.jpg',
];
const feed = feedFiles.map((f, i) => ({
  id: `feed-${pad(i + 1)}`,
  group: 'feed',
  title: `SNS FEED ${pad(i + 1)}`,
  note: 'AI 이미지 · 인스타그램 피드',
  src: `ai-outfit/feed/${f}`,
}));

const personalFiles = [
  'personal-01.png', 'personal-02.jpg', 'personal-03.jpg', 'personal-04.png', 'personal-05.png',
  // image lab/ai outfit/추가 (6장)
  'personal-06.jpg', 'personal-07.jpg', 'personal-08.jpg', 'personal-09.png', 'personal-10.png', 'personal-11.jpg',
];
const personal = personalFiles.map((f, i) => ({
  id: `personal-${pad(i + 1)}`,
  group: 'personal',
  title: `PERSONAL ${pad(i + 1)}`,
  note: 'AI 이미지 · 개인 작업',
  src: `ai-outfit/personal/${f}`,
}));

// 보정 전후 — before 는 보정본과 같은 구도로 맞춘 원본
const retouchFiles = [
  '0903_12479', '0903_12522', '0903_12696', '0903_12716', '1013_0788', '1013_0797', '1013_0987', '1013_1007',
  '1013_0254', '1013_0274', '1013_0483', 'DSC_6086', 'DSC_6120', 'DSC_6681', 'DSC_6718', 'DSC_6911', 'DSC_6984',
];
const retouch = retouchFiles.map((f, i) => ({
  id: `retouch-${pad(i + 1)}`,
  group: 'retouch',
  title: `RETOUCH ${pad(i + 1)}`,
  note: '보정 전후',
  compare: true,
  before: { src: `retouch/before/${f}.jpg` },
  after: { src: `retouch/after/${f}.jpg` },
}));

// ALL 에서는 종류가 섞여 보이도록 배치
function interleave(...lists) {
  const out = [];
  const max = Math.max(...lists.map((l) => l.length));
  for (let i = 0; i < max; i += 1) lists.forEach((l) => l[i] && out.push(l[i]));
  return out;
}

// ALL 에서 두 항목의 자리를 맞바꾸기 [id, id]
const swaps = [['lookbook-01', 'personal-01']];

function applySwaps(list) {
  const out = [...list];
  swaps.forEach(([a, b]) => {
    const i = out.findIndex((x) => x.id === a);
    const j = out.findIndex((x) => x.id === b);
    if (i > -1 && j > -1) [out[i], out[j]] = [out[j], out[i]];
  });
  return out;
}

export const imageLab = applySwaps(interleave(ai, lookbook, retouch, feed, personal));
