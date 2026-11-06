// ─────────────────────────────────────────────
// IMAGE LAB — AI 이미지 · 보정본 갤러리
// · src     : images-src 기준 경로 (npm run images 로 처리). 썸네일은 4:5로 잘려 보이고, 확대하면 원본 비율.
// · group   : 필터 구분 — 'ai' | 'personal' | 'retouch'
// · compare : true 이면 확대 뷰어에서 BEFORE / AFTER 비교 슬라이더
//             (before.src / after.src — 두 이미지는 같은 구도·비율이어야 정확히 겹칩니다)
// ─────────────────────────────────────────────

export const labFilters = [
  { id: 'all', label: 'ALL' },
  { id: 'ai', label: 'AI OUTFIT' },
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

const personalFiles = ['personal-01.png', 'personal-02.jpg', 'personal-03.jpg', 'personal-04.png'];
const personal = personalFiles.map((f, i) => ({
  id: `personal-${pad(i + 1)}`,
  group: 'personal',
  title: `PERSONAL ${pad(i + 1)}`,
  note: 'AI 이미지 · 개인 작업',
  src: `ai-outfit/personal/${f}`,
}));

// 보정 전후 — before 는 보정본과 같은 구도로 맞춘 원본
const retouchFiles = ['0903_12479', '0903_12522', '0903_12696', '0903_12716', '1013_0788', '1013_0797', '1013_0987', '1013_1007'];
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

export const imageLab = interleave(ai.slice(0, 7), retouch.slice(0, 4), ai.slice(7), personal, retouch.slice(4));
