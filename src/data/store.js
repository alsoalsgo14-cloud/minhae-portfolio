// ─────────────────────────────────────────────
// STORE GRAPHICS — 오프라인 매장 POP 포스터 · 매장 인스타그램 피드/스토리
// · groups 순서 = 화면 순서, items 순서 = 그룹 안 순서
// · src  : images-src 기준 경로 (npm run images)
// · title: 카드 아래 굵은 글씨 / note: 작은 설명 (없으면 null)
// · fit  : 'contain' 이면 칸 안에 잘림 없이 (가로형 이미지용). 기본은 칸을 꽉 채움
// · tag  : 카드 오른쪽 작은 표시 (그룹의 tag 를 기본으로 사용)
// ─────────────────────────────────────────────

// 왼쪽 고정 영역 문구
export const storeInfo = {
  overline: 'STORE GRAPHICS',
  title: 'POP Posters,\nFeed & Story.', // \n = 줄바꿈
  desc: '오프라인 매장 POP 포스터와 매장 인스타그램 피드·스토리 작업입니다.',
};

const P = 'store/pop';
const S = 'store/sns';

export const storeGroups = [
  {
    id: 'pop',
    title: 'POP POSTER',
    tag: 'POP',
    items: [
      { id: 'pop-sample-sale', title: 'SAMPLE SALE', note: 'VOLCOM 성수 · 매장 포스터', src: `${P}/sample-sale.jpg` },
      { id: 'pop-garage-sale', title: 'WWB GARAGE SALE', note: '패밀리 세일 포스터', src: `${P}/garage-sale.jpg` },
      { id: 'pop-summer-sale', title: 'SUMMER SALE', note: 'VOLCOM 성수 · 매장 POP', src: `${P}/summer-sale-v.jpg` },
      { id: 'pop-receipt-b', title: 'RECEIPT EVENT', note: '영수증 이벤트 POP', src: `${P}/receipt-event-b.jpg` },
      { id: 'pop-workwear', title: 'VOLCOM WORKWEAR', note: '컬렉션 포스터', src: `${P}/workwear.jpg` },
      { id: 'pop-26ss-sale', title: '26SS SALE', note: '할인 POP', src: `${P}/26ss-sale.png` },
      { id: 'pop-receipt-a', title: 'RECEIPT EVENT', note: '영수증 이벤트 POP · 시안', src: `${P}/receipt-event-a.png` },
    ],
  },
  {
    id: 'sns',
    title: 'INSTAGRAM FEED · STORY',
    tag: 'SNS',
    items: [
      { id: 'sns-daze-feed-01', title: 'DAZE DAYZ POP-UP', note: '매장 인스타그램 피드', src: `${S}/daze-dayz-feed-01.jpg` },
      { id: 'sns-daze-feed-02', title: 'DAZE DAYZ POP-UP', note: '매장 인스타그램 피드', src: `${S}/daze-dayz-feed-02.jpg` },
      { id: 'sns-daze-story', title: 'DAZE DAYZ POP-UP', note: '매장 인스타그램 스토리', src: `${S}/daze-dayz-story.jpg` },
      { id: 'sns-charlesrun', title: 'VOLCOM × CHARLESRUN', note: '회원 전용 쿠폰 · 스토리', src: `${S}/charlesrun-coupon.png` },
      { id: 'sns-wwb-crew', title: 'JOIN THE WWB CREW', note: '크루 3기 모집 · 피드', src: `${S}/wwb-crew.jpg` },
    ],
  },
];
