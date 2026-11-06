import { useRef, useState } from 'react';
import { detailSections, metaLabels, projects } from '../data/projects';
import { useReveal } from '../lib/motion';
import Placeholder from './Placeholder';
import Lightbox from './Lightbox';
import { ratioOf, resolveMedia, stackRatio } from '../lib/media';

const TBD = <span className="tbd">추후 입력</span>;

function SectionBody({ p, k }) {
  const s = p.sections;
  if (k === 'role') {
    return (
      <dl className="dt__pairs">
        <div>
          <dt>담당 범위</dt>
          <dd>{s.role || TBD}</dd>
        </div>
        <div>
          <dt>사용 툴</dt>
          <dd>
            {s.tools?.length ? (
              <ul className="dt__tags">
                {s.tools.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            ) : (
              TBD
            )}
          </dd>
        </div>
      </dl>
    );
  }
  return <p className="dt__text">{s[k] || TBD}</p>;
}

/** 프로젝트 상세 공통 틀 — 모든 프로젝트가 같은 구성을 사용합니다. */
export default function ProjectDetail({ project: p }) {
  const root = useRef(null);
  const [open, setOpen] = useState(-1);
  useReveal(root, [p.id]);

  const idx = projects.findIndex((x) => x.id === p.id);
  const next = projects[(idx + 1) % projects.length];
  const isScreen = p.preview === 'screen';

  // 결과물 한 장 (원본 비율 + 확대 보기)
  const renderFig = (r, i, compact = false) => {
    const media = resolveMedia(r.src);
    const ratio = ratioOf(r);
    const [w, h] = ratio.split('/');
    const real = media?.w || (r.parts && stackRatio(r.parts));
    const size = real ? `${w} × ${h}px` : `원본 비율 ${w} : ${h}`;
    return (
      <figure
        className={`dt__fig ${r.long ? 'dt__fig--long' : ''} ${r.device ? `dt__fig--${r.device}` : ''}`}
        key={r.label + i}
      >
        <button type="button" className="dt__zoom" onClick={() => setOpen(i)} aria-label={`${r.label} 확대 보기`}>
          <Placeholder ratio={ratio} src={r.src} parts={r.parts} label={r.label} long={r.long} tone={i % 2 ? 'b' : 'a'} />
          <span className="dt__zoom-tag" aria-hidden="true">
            ZOOM +
          </span>
        </button>
        <figcaption>
          {r.label} {!compact && <span>{r.device ? `${r.device.toUpperCase()} · ${w}px` : size}</span>}
        </figcaption>
      </figure>
    );
  };

  return (
    <main className="dt" id="main" ref={root}>
      <div className="dt__top">
        <a className="dt__back" href="#work">
          <span aria-hidden="true">←</span> WORK
        </a>
        <span className="dt__cat">{p.category}</span>
      </div>

      <h1 className="dt__title">{p.title}</h1>
      <span className="dt__spark spark" aria-hidden="true" />

      <dl className="dt__meta">
        {metaLabels.map((m) => (
          <div key={m.key}>
            <dt>{m.label}</dt>
            <dd>{p.meta[m.key] || TBD}</dd>
          </div>
        ))}
      </dl>

      {/* keyImage: false 로 두면 키 비주얼 영역을 표시하지 않습니다 */}
      {p.keyImage !== false && (
        <div className={`dt__key ${isScreen ? 'dt__key--screen' : ''}`}>
          <Placeholder ratio="16/9" src={p.keyImage?.src} label={`${p.title} — KEY VISUAL`} tone="b" />
        </div>
      )}

      {detailSections.map((sec) => (
        <section className="dt__sec" key={sec.key} data-reveal>
          <header className="dt__sec-head rv">
            <p className="eyebrow">{sec.en}</p>
            <h2>{sec.ko}</h2>
          </header>
          <div className="dt__sec-body rv">
            <SectionBody p={p} k={sec.key} />
          </div>
        </section>
      ))}

      <section className="dt__results" aria-labelledby="results-title">
        <header className="dt__sec-head dt__sec-head--wide" data-reveal>
          <p className="eyebrow rv">RESULTS</p>
          <h2 id="results-title" className="rv">
            전체 결과물
          </h2>
        </header>
        {p.resultsLayout === 'site' ? (
          // 웹사이트: PC 화면 묶음 → MOBILE 화면 묶음
          [
            { dev: 'pc', name: 'PC' },
            { dev: 'mo', name: 'MOBILE' },
          ].map(({ dev, name }) => {
            const list = p.results.map((r, i) => [r, i]).filter(([r]) => r.device === dev);
            if (!list.length) return null;
            return (
              <div className="dt__group" key={dev}>
                <p className="dt__group-title">
                  {name} <span>{String(list.length).padStart(2, '0')}</span>
                </p>
                <div className={`dt__figs dt__figs--site-${dev}`}>{list.map(([r, i]) => renderFig(r, i, true))}</div>
              </div>
            );
          })
        ) : (
          <div
            className={`dt__figs ${p.results.some((r) => r.device) ? 'dt__figs--devices' : ''} ${
              p.resultsLayout === 'columns' ? 'dt__figs--columns' : ''
            }`}
          >
            {p.results.map((r, i) => renderFig(r, i))}
          </div>
        )}
      </section>

      <a className="dt__next" href={`#${next.id}`}>
        <span className="eyebrow">NEXT PROJECT</span>
        <span className="dt__next-title">{next.title}</span>
      </a>

      {open > -1 && <Lightbox items={p.results} index={open} onIndex={setOpen} onClose={() => setOpen(-1)} />}
    </main>
  );
}
