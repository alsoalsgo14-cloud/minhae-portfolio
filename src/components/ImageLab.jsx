import { useCallback, useEffect, useRef, useState } from 'react';
import { imageLab, labFilters } from '../data/imageLab';
import { prefersReducedMotion, useReveal } from '../lib/motion';
import Placeholder from './Placeholder';
import Lightbox from './Lightbox';

export default function ImageLab() {
  const root = useRef(null);
  const track = useRef(null);
  const drag = useRef({ active: false, moved: false, x: 0, left: 0 });
  const [edges, setEdges] = useState({ start: true, end: false });
  const [open, setOpen] = useState(-1);
  const [filter, setFilter] = useState('all');
  const items = filter === 'all' ? imageLab : imageLab.filter((it) => it.group === filter);
  useReveal(root);

  // 필터를 바꾸면 처음 위치로
  useEffect(() => {
    if (track.current) track.current.scrollLeft = 0;
    updateEdges();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const updateEdges = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft < 4, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    updateEdges();
    const el = track.current;
    el.addEventListener('scroll', updateEdges, { passive: true });
    window.addEventListener('resize', updateEdges);
    return () => {
      el.removeEventListener('scroll', updateEdges);
      window.removeEventListener('resize', updateEdges);
    };
  }, [updateEdges]);

  const step = (dir) => {
    const el = track.current;
    const item = el.querySelector('.lab__item');
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: dir * (item.offsetWidth + gap), behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  };

  // 마우스 드래그 (터치는 브라우저 기본 스와이프 사용)
  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    drag.current = { active: true, moved: false, x: e.clientX, left: track.current.scrollLeft };
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d.active) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 6) {
      d.moved = true;
      track.current.classList.add('is-dragging');
      track.current.setPointerCapture?.(e.pointerId);
    }
    if (d.moved) track.current.scrollLeft = d.left - dx;
  };
  const endDrag = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    track.current.classList.remove('is-dragging');
    // 드래그 직후 클릭이 열리지 않도록 잠깐 유지
    setTimeout(() => (drag.current.moved = false), 0);
  };

  return (
    <section className="lab" id="image-lab" ref={root} aria-labelledby="lab-title">
      <header className="sec-head" data-reveal>
        <h2 id="lab-title" className="sec-head__title rv">
          IMAGE LAB
        </h2>
        <p className="lab__desc rv">AI 이미지와 보정 작업. 드래그하거나 넘겨서 보고, 누르면 크게 볼 수 있습니다.</p>
        <div className="lab__filters rv" role="group" aria-label="IMAGE LAB 분류">
          {labFilters.map((f) => {
            const count = f.id === 'all' ? imageLab.length : imageLab.filter((it) => it.group === f.id).length;
            return (
              <button key={f.id} type="button" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
                {f.label} <span>{count}</span>
              </button>
            );
          })}
        </div>
        <div className="lab__ctrl rv">
          <button type="button" onClick={() => step(-1)} disabled={edges.start} aria-label="이전 이미지들">
            ←
          </button>
          <button type="button" onClick={() => step(1)} disabled={edges.end} aria-label="다음 이미지들">
            →
          </button>
        </div>
      </header>

      <div
        className="lab__track"
        ref={track}
        tabIndex={0}
        aria-label="IMAGE LAB 갤러리, 좌우로 스크롤"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
        onDragStart={(e) => e.preventDefault()}
      >
        {items.map((item, i) => (
          <button
            key={item.id}
            type="button"
            className="lab__item"
            onClick={() => !drag.current.moved && setOpen(i)}
            aria-label={`${item.title} 크게 보기${item.compare ? ', 보정 전후 비교' : ''}`}
          >
            <span className="lab__thumb">
              <Placeholder
                ratio={item.ratio}
                src={item.compare ? item.after?.src : item.src}
                label={item.title}
                fit="cover"
                tone={i % 2 ? 'b' : 'a'}
              />
              {item.compare && <em className="lab__badge">BEFORE / AFTER</em>}
            </span>
            <span className="lab__cap">
              <b>{item.title}</b>
              <span>{item.note}</span>
            </span>
          </button>
        ))}
      </div>

      {open > -1 && <Lightbox items={items} index={open} onIndex={setOpen} onClose={() => setOpen(-1)} />}
    </section>
  );
}
