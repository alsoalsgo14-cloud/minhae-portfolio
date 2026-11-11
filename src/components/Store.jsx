import { useLayoutEffect, useRef, useState } from 'react';
import { storeGroups, storeInfo } from '../data/store';
import { gsap, ScrollTrigger, MQ } from '../lib/motion';
import Placeholder from './Placeholder';
import Lightbox from './Lightbox';

/**
 * STORE GRAPHICS — 매장 POP 포스터 · 인스타그램 피드/스토리
 * · 데스크톱(1025px 이상): 왼쪽 소개는 고정, 오른쪽 2열 카드가 스크롤에 맞춰 위로 흘러감
 * · 태블릿/모바일 · 모션 줄이기: 고정 없이 위아래로 차례대로 표시
 * · 카드를 누르면 확대 뷰어 (← → 로 넘기기)
 */
export default function Store() {
  const root = useRef(null);
  const view = useRef(null);
  const grid = useRef(null);
  const [open, setOpen] = useState(-1);

  const items = storeGroups.flatMap((g) => g.items.map((it) => ({ ...it, tag: it.tag || g.tag, label: it.title })));

  useLayoutEffect(() => {
    if (!root.current) return undefined;
    const mm = gsap.matchMedia(root);
    mm.add(`(min-width: 1025px) and ${MQ.motion}`, () => {
      const distance = () => Math.max(0, grid.current.scrollHeight - view.current.offsetHeight);
      gsap.to(grid.current, {
        y: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          scrub: true,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    });
    // 이미지가 늦게 로드되며 높이가 바뀌는 경우 위치 재계산
    const imgs = root.current.querySelectorAll('img');
    const refresh = () => ScrollTrigger.refresh();
    imgs.forEach((img) => img.addEventListener('load', refresh, { once: true }));
    return () => {
      imgs.forEach((img) => img.removeEventListener('load', refresh));
      mm.revert();
    };
  }, []);

  if (!items.length) return null;

  return (
    <section className="st" id="store" ref={root} aria-labelledby="st-title">
      <div className="st__left">
        <div className="st__intro">
          <p className="st__overline">{storeInfo.overline}</p>
          <h2 id="st-title" className="st__title">
            {storeInfo.title.split('\n').map((line, i) => (
              <span key={line}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </h2>
          {storeInfo.desc && <p className="st__desc">{storeInfo.desc}</p>}
          <ul className="st__counts">
            {storeGroups.map((g) => (
              <li key={g.id}>
                <span>{g.title}</span>
                <b>{String(g.items.length).padStart(2, '0')}</b>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="st__right" ref={view}>
        <ul className="st__grid" ref={grid}>
          {items.map((it, i) => (
            <li key={it.id}>
              <button type="button" className="st__card" onClick={() => setOpen(i)} aria-label={`${it.title} 크게 보기`}>
                <span className={`st__img ${it.fit === 'contain' ? 'st__img--contain' : ''}`}>
                  <Placeholder src={it.src} label={it.title} fit="cover" focus="top" />
                </span>
                <span className="st__meta">
                  <span className="st__meta-l">
                    <b>{it.title}</b>
                    {it.note && <span>{it.note}</span>}
                  </span>
                  {it.tag && <span className="st__tag">{it.tag}</span>}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {open > -1 && <Lightbox items={items} index={open} onIndex={setOpen} onClose={() => setOpen(-1)} />}
    </section>
  );
}
