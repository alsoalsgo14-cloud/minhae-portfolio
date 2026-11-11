// ─────────────────────────────────────────────
// 방문자 분석 (Google Analytics 4)
// · src/data/site.js 의 analytics.ga4 에 측정 ID(G-로 시작)를 넣으면 작동합니다.
// · ID 가 비어 있거나 내 컴퓨터(localhost)에서 볼 때는 아무것도 보내지 않습니다.
// · 이 사이트는 #주소로 화면이 바뀌므로, 화면이 바뀔 때마다 직접 페이지뷰를 보냅니다.
//     메인 → '/'   프로젝트 상세 → '/project/프로젝트id'
// ─────────────────────────────────────────────
import { site } from '../data/site';

const id = site.analytics?.ga4;
const isLocal = ['localhost', '127.0.0.1'].includes(window.location.hostname);
let ready = false;

export function initAnalytics() {
  if (!id || isLocal || ready) return;
  ready = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  // 페이지뷰는 화면 전환 때 trackPage 로 직접 보냄
  window.gtag('config', id, { send_page_view: false });

  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(s);
}

/** 화면(페이지) 조회 */
export function trackPage(path, title) {
  if (!ready) return;
  window.gtag('event', 'page_view', {
    page_title: title,
    page_location: window.location.origin + window.location.pathname.replace(/\/$/, '') + path,
    page_path: path,
  });
}

/** 클릭 등 이벤트 (예: 이력서·이메일·인스타 클릭) */
export function trackEvent(name, params = {}) {
  if (!ready) return;
  window.gtag('event', name, params);
}
