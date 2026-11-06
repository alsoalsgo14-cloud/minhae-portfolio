import { useRef, useState } from 'react';
import { detailPages, detailPagesInfo } from '../data/detailPages';
import { useReveal } from '../lib/motion';
import { useHoverScroll } from '../lib/hoverScroll';
import { ratioOf } from '../lib/media';
import Placeholder from './Placeholder';
import Lightbox from './Lightbox';

/** 현재 회사 상세페이지 모음 — 세로로 긴 카드 그리드 + 확대 뷰어 */
export default function DetailPages() {
  const root = useRef(null);
  const [open, setOpen] = useState(-1);
  useReveal(root);
  useHoverScroll(root, '.dp__card');

  if (!detailPages.length) return null;

  // 뷰어용: 긴 이미지로 표시
  const items = detailPages.map((d) => ({ ...d, label: d.title, long: true }));

  return (
    <section className="dp" id="detail-pages" ref={root} aria-labelledby="dp-title">
      <header className="sec-head" data-reveal>
        <h2 id="dp-title" className="sec-head__title rv">
          {detailPagesInfo.title}
        </h2>
        <p className="sec-head__count rv">({String(detailPages.length).padStart(2, '0')})</p>
        {detailPagesInfo.desc && <p className="sec-head__desc rv">{detailPagesInfo.desc}</p>}
      </header>

      <ul className="dp__grid" data-reveal>
        {detailPages.map((d, i) => {
          const meta = [d.brand, d.category].filter(Boolean).join(' · ');
          return (
            <li key={d.id} className="rv">
              <button type="button" className="dp__card" onClick={() => setOpen(i)} aria-label={`${d.title} 전체 보기`}>
                <span className="dp__vp scroll-vp">
                  <span className="dp__in scroll-in">
                    <Placeholder ratio={ratioOf(d)} src={d.src} parts={d.parts} label={d.title} long tone={i % 2 ? 'b' : 'a'} />
                  </span>
                </span>
                <span className="dp__cap">
                  <b>{d.title}</b>
                  <span className={meta ? '' : 'tbd'}>{meta || '브랜드 · 품목 추후 입력'}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {open > -1 && <Lightbox items={items} index={open} onIndex={setOpen} onClose={() => setOpen(-1)} />}
    </section>
  );
}
