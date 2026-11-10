// ─────────────────────────────────────────────
// DETAIL PAGES — 현재 회사에서 작업한 상품 상세페이지
// · 메인에 세로로 긴 카드로 나란히 표시, 데스크톱 호버 시 세로 스크롤 미리보기
// · 누르면 확대 뷰어로 전체 페이지를 보고 ← → 로 넘겨볼 수 있습니다.
// · src  : images-src 기준 경로 (npm run images). 예: 'detail/company/cap.jpg'
// · parts: 여러 장으로 나뉜 상세페이지는 위에서부터 이어 붙입니다.
// · brand / category: 카드 아래 작은 글씨. 확인되지 않은 정보는 null.
// ─────────────────────────────────────────────

export const detailPagesInfo = {
  title: 'DETAIL PAGES',
  desc: null, // 섹션 제목 아래 설명 (없으면 표시 안 함)
};

const D = 'detail/company';

export const detailPages = [
  { id: 'detail-cap', title: 'CAP', brand: 'VOLCOM', category: '워크웨어 ADJ 햇', src: `${D}/cap.jpg` },
  { id: 'detail-hm', title: 'HOODIE', brand: 'VOLCOM', category: '코듀로이 플리스 후드 집업', src: `${D}/hm.jpg` },
  { id: 'detail-jp', title: 'PADDING JACKET', brand: 'VOLCOM', category: '미스트 트래킹 패딩 자켓', src: `${D}/jp.jpg` },
  { id: 'detail-tp', title: 'PANTS', brand: 'VOLCOM', category: '코듀로이 플리스 팬츠', src: `${D}/tp.jpg` },
];
