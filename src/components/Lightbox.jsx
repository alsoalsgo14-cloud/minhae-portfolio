import { useEffect, useRef, useState } from 'react';
import Placeholder from './Placeholder';
import { ratioOf, resolveMedia } from '../lib/media';

/** BEFORE / AFTER 비교 슬라이더 */
function Compare({ item }) {
  const [pos, setPos] = useState(50);
  const ratio = resolveMedia(item.after?.src)?.ratio || item.ratio;
  const [w, h] = String(ratio).split('/').map(Number);
  return (
    <div className="cmp" style={{ aspectRatio: ratio, width: `min(100%, calc(76vh * ${w / h}))` }}>
      <div className="cmp__layer">
        <Placeholder ratio={ratio} src={item.after?.src} label={`${item.title} — AFTER`} tone="a" fit="cover" full />
      </div>
      <div className="cmp__layer cmp__layer--before" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Placeholder ratio={ratio} src={item.before?.src} label={`${item.title} — BEFORE`} tone="dark" fit="cover" full />
      </div>
      <span className="cmp__tag cmp__tag--l">BEFORE</span>
      <span className="cmp__tag cmp__tag--r">AFTER</span>
      <span className="cmp__handle" style={{ left: `${pos}%` }} aria-hidden="true" />
      <input
        id={`cmp-${item.id}`}
        className="cmp__range"
        type="range"
        min="0"
        max="100"
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="보정 전후 비교 위치"
      />
    </div>
  );
}

/**
 * 확대 뷰어
 * items: [{ title|label, ratio, src, long, compare, before, after }]
 */
export default function Lightbox({ items, index, onClose, onIndex }) {
  const closeRef = useRef(null);
  const lastFocus = useRef(null);
  const scrollRef = useRef(null);
  const item = items[index];
  const count = items.length;

  useEffect(() => {
    lastFocus.current = document.activeElement;
    document.documentElement.classList.add('is-locked');
    closeRef.current?.focus();
    return () => {
      document.documentElement.classList.remove('is-locked');
      lastFocus.current?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && count > 1 && !e.target.matches?.('input')) onIndex((index + 1) % count);
      if (e.key === 'ArrowLeft' && count > 1 && !e.target.matches?.('input')) onIndex((index - 1 + count) % count);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, count, onClose, onIndex]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [index]);

  if (!item) return null;
  const title = item.title || item.label;
  const ratio = ratioOf(item);
  const [w, h] = String(ratio).split('/').map(Number);
  const isLong = item.long || h / w > 1.8;

  return (
    <div className="lb" role="dialog" aria-modal="true" aria-label={`${title} 확대 보기`}>
      <div className="lb__bar">
        <p className="lb__title">
          {title}
          {count > 1 && (
            <span className="lb__count">
              {index + 1} / {count}
            </span>
          )}
        </p>
        <button ref={closeRef} type="button" className="lb__close" onClick={onClose}>
          CLOSE
        </button>
      </div>

      <div className={`lb__stage ${isLong ? 'lb__stage--long' : ''}`} ref={scrollRef} onClick={(e) => e.target === e.currentTarget && onClose()}>
        {item.compare ? (
          <Compare key={item.id} item={item} />
        ) : isLong ? (
          <div className={`lb__long ${item.device === 'mo' ? 'lb__long--mo' : ''}`}>
            <Placeholder key={index} ratio={ratio} src={item.src} parts={item.parts} label={title} long />
          </div>
        ) : (
          <div className="lb__fit" style={{ width: `min(100%, calc(76vh * ${w / h}))` }}>
            <Placeholder key={index} ratio={ratio} src={item.src} parts={item.parts} label={title} />
          </div>
        )}
      </div>

      {count > 1 && (
        <div className="lb__nav">
          <button type="button" onClick={() => onIndex((index - 1 + count) % count)} aria-label="이전 이미지">
            ←
          </button>
          <button type="button" onClick={() => onIndex((index + 1) % count)} aria-label="다음 이미지">
            →
          </button>
        </div>
      )}
    </div>
  );
}
