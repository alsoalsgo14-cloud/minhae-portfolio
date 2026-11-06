import { resolveMedia, stackRatio } from '../lib/media';
import AutoVideo from './AutoVideo';

/**
 * 이미지 자리.
 * · src   : 이미지 1개 (긴 이미지는 조각을 이어 붙이고, GIF는 영상으로 재생)
 * · parts : 여러 장을 위에서부터 이어 붙여 한 페이지처럼 표시  예: [main.gif, section1.gif, section2.jpg]
 * · 둘 다 없으면 연회색 플레이스홀더 + 작업명
 * props
 *  long  : 플레이스홀더에 구간 줄무늬 표시 (스크롤 이동이 보이게)
 *  fit   : 'cover' → 부모 박스를 꽉 채움 (썸네일·프레임용, 부모에 position: relative 필요)
 *  focus : fit 일 때 보이는 위치 (예: 'top', 'center')
 */
export default function Placeholder({
  ratio = '4/5',
  label,
  sub,
  src,
  parts,
  alt,
  long = false,
  tone = 'a',
  fit,
  focus,
  full = false, // fit 일 때 썸네일 대신 원본 해상도 사용 (확대 뷰어용)
  className = '',
}) {
  // ── 여러 장 이어 붙이기 ──
  const realParts = parts?.filter((p) => resolveMedia(p));
  if (realParts?.length) {
    if (fit === 'cover') {
      return <Placeholder src={realParts[0]} label={label} alt={alt} fit="cover" focus={focus || 'top'} className={className} />;
    }
    return (
      <div className={`ph-stack ${className}`} style={{ aspectRatio: stackRatio(realParts) }} role="img" aria-label={alt || label || ''}>
        {realParts.map((p) => (
          <Placeholder key={p} src={p} label={label} />
        ))}
      </div>
    );
  }

  const media = resolveMedia(src);

  if (media) {
    const r = media.ratio || ratio;
    const altText = alt || label || '';

    // 박스 채우기 (썸네일·프레임)
    if (fit === 'cover') {
      const style = focus ? { objectPosition: `center ${focus}` } : undefined;
      if (media.video) {
        return <AutoVideo media={media} label={altText} className={`ph-img--cover ${className}`} style={style} />;
      }
      const first = media.slices ? media.slices[0].url : (!full && media.thumb) || media.url;
      return (
        <img
          className={`ph-img ph-img--cover ${media.slices ? 'ph-img--top' : ''} ${className}`}
          style={style}
          src={first}
          alt={altText}
          loading="lazy"
          decoding="async"
          draggable="false"
        />
      );
    }

    // 영상 (GIF 변환본)
    if (media.video) {
      return (
        <div className={`ph-media ${className}`} style={{ aspectRatio: r }}>
          <AutoVideo media={media} label={altText} />
        </div>
      );
    }

    // 긴 이미지: 조각을 위에서부터 이어 붙임 (보이는 조각부터 로드)
    if (media.slices) {
      return (
        <div className={`ph-slices ${className}`} style={{ aspectRatio: r }} role="img" aria-label={altText}>
          {media.slices.map((s, i) => (
            <img
              key={s.url}
              src={s.url}
              width={s.w}
              height={s.h}
              alt=""
              loading={i < 2 ? 'eager' : 'lazy'}
              decoding="async"
              draggable="false"
            />
          ))}
        </div>
      );
    }

    return (
      <img
        className={`ph-img ${className}`}
        src={media.url}
        width={media.w}
        height={media.h}
        alt={altText}
        style={{ aspectRatio: r }}
        loading="lazy"
        decoding="async"
        draggable="false"
      />
    );
  }

  // ── 플레이스홀더 ──
  const style = fit === 'cover' ? undefined : { aspectRatio: ratio };
  const [w, h] = String(ratio).split('/').map(Number);
  const bands = long ? Math.min(14, Math.max(4, Math.round(h / w / 0.55))) : 0;

  return (
    <div
      className={`ph ph--${tone} ${long ? 'ph--long' : ''} ${fit === 'cover' ? 'ph--cover' : ''} ${className}`}
      style={style}
      role="img"
      aria-label={`${label || '작업'} 이미지 자리`}
    >
      {long && (
        <div className="ph__bands" aria-hidden="true">
          {Array.from({ length: bands }).map((_, i) => (
            <span key={i}>SECTION {String(i + 1).padStart(2, '0')}</span>
          ))}
        </div>
      )}
      <div className="ph__label">
        <span>{label}</span>
        <small>{sub || (w && h ? `${w} : ${h}` : '')}</small>
      </div>
    </div>
  );
}
