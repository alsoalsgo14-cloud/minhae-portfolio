import manifest from '../data/imageManifest';

const BASE = import.meta.env.BASE_URL;
const href = (u) => (u ? encodeURI(BASE + u) : null);

/**
 * 데이터 파일의 src 를 실제 표시 정보로 바꿉니다.
 *  · 'detail/hago/bag-wallet.jpg' 처럼 images-src 기준 경로 → npm run images 결과 사용
 *  · 목록에 없는 경로/URL → 그대로 사용 (이 경우 ratio 는 데이터에 직접 입력)
 *  · 없으면 null → 플레이스홀더
 */
export function resolveMedia(src) {
  if (!src) return null;
  const key = String(src).replace(/^\.?\//, '').replace(/^(public\/)?images\//, '');
  const m = manifest[key];
  if (!m) return { url: src, external: true };
  return {
    w: m.w,
    h: m.h,
    ratio: `${m.w}/${m.h}`,
    url: href(m.url),
    thumb: href(m.thumb),
    video: href(m.video),
    poster: href(m.poster),
    slices: m.slices ? m.slices.map((s) => ({ url: href(s.url), w: m.ow, h: s.h })) : null,
  };
}

/** 여러 장을 세로로 이어 붙였을 때의 전체 비율 (가장 넓은 이미지 기준) */
export function stackRatio(parts = []) {
  const ms = parts.map(resolveMedia).filter((m) => m && m.w);
  if (!ms.length) return null;
  const W = Math.max(...ms.map((m) => m.w));
  const H = ms.reduce((sum, m) => sum + (m.h * W) / m.w, 0);
  return `${W}/${Math.round(H)}`;
}

/** 데이터의 ratio 보다 실제 이미지 크기를 우선 */
export function ratioOf(item) {
  if (!item) return '4/5';
  if (item.parts) return stackRatio(item.parts) || item.ratio || '4/5';
  const m = resolveMedia(item.src);
  return (m && m.ratio) || item.ratio || '4/5';
}

/** 실제 가로 픽셀 (여러 장이면 가장 넓은 값) */
export function widthOf(item) {
  const r = ratioOf(item);
  return Number(String(r).split('/')[0]) || null;
}
