import logoSvg from '../assets/minhae-logo.svg?raw';
import { site } from '../data/site';

// 로고 원본 비율 (가로 / 세로)
export const LOGO_RATIO = 4004 / 626;

/**
 * MINHAE 로고.
 * · 기본: src/assets/minhae-logo.svg 를 인라인으로 넣어 글자색(currentColor)을 따라갑니다.
 *   → 흰 배경에서는 검정, 검정 배경에서는 흰색으로 자동 표시
 * · site.logo.src 에 다른 파일 경로를 넣으면 그 이미지로 바뀝니다. (이 경우 색은 고정)
 */
export default function Logo({ className = '' }) {
  if (site.logo.src) {
    return <img className={`logo ${className}`} src={site.logo.src} alt="" aria-hidden="true" draggable="false" />;
  }
  return <span className={`logo ${className}`} aria-hidden="true" dangerouslySetInnerHTML={{ __html: logoSvg }} />;
}
