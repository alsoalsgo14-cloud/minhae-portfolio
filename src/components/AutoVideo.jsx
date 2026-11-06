import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../lib/motion';

/**
 * GIF 대신 쓰는 짧은 반복 영상.
 * · 화면에 보일 때만 재생, 벗어나면 정지 (배터리·성능)
 * · 모션 감소 설정이면 자동재생하지 않고 첫 장면 + 재생 버튼
 */
export default function AutoVideo({ media, className = '', label = '', style }) {
  const ref = useRef(null);
  const [reduced] = useState(prefersReducedMotion);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <video
      ref={ref}
      className={`ph-video ${className}`}
      style={style}
      src={media.video}
      poster={media.poster}
      width={media.w}
      height={media.h}
      muted
      loop
      playsInline
      preload={reduced ? 'none' : 'metadata'}
      controls={reduced}
      aria-label={label}
      disablePictureInPicture
    />
  );
}
