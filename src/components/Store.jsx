import { useRef, useState } from 'react';
import { storeGroups, storeInfo } from '../data/store';
import { useReveal } from '../lib/motion';
import { ratioOf } from '../lib/media';
import Placeholder from './Placeholder';
import Lightbox from './Lightbox';

/** STORE GRAPHICS — 매장 POP 포스터 · 인스타그램 피드/스토리 (원본 비율 그대로, 누르면 확대) */
export default function Store() {
  const root = useRef(null);
  const [open, setOpen] = useState(null); // { group, index }
  useReveal(root);

  const groups = storeGroups.filter((g) => g.items.length);
  if (!groups.length) return null;
  const total = groups.reduce((n, g) => n + g.items.length, 0);
  const current = open && groups.find((g) => g.id === open.group);

  return (
    <section className="st" id="store" ref={root} aria-labelledby="st-title">
      <header className="sec-head" data-reveal>
        <h2 id="st-title" className="sec-head__title rv">
          {storeInfo.title}
        </h2>
        <p className="sec-head__count rv">({String(total).padStart(2, '0')})</p>
        {storeInfo.desc && <p className="sec-head__desc rv">{storeInfo.desc}</p>}
      </header>

      {groups.map((g) => (
        <div className="st__group" key={g.id} data-reveal>
          <p className="st__group-title rv">
            {g.title} <span>{String(g.items.length).padStart(2, '0')}</span>
          </p>
          <ul className={`st__grid st__grid--${g.id}`}>
            {g.items.map((it, i) => (
              <li key={it.id} className="rv">
                <button
                  type="button"
                  className="st__card"
                  onClick={() => setOpen({ group: g.id, index: i })}
                  aria-label={`${it.title} 크게 보기`}
                >
                  <span className="st__img">
                    <Placeholder ratio={ratioOf(it)} src={it.src} label={it.title} tone={i % 2 ? 'b' : 'a'} />
                  </span>
                  <span className="st__cap">
                    <b>{it.title}</b>
                    {it.note && <span>{it.note}</span>}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {current && (
        <Lightbox
          items={current.items.map((it) => ({ ...it, label: it.title }))}
          index={open.index}
          onIndex={(index) => setOpen({ group: current.id, index })}
          onClose={() => setOpen(null)}
        />
      )}
    </section>
  );
}
