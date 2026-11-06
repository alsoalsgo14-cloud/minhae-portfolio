import { useRef } from 'react';
import { projects } from '../data/projects';
import { useReveal } from '../lib/motion';
import { useHoverScroll } from '../lib/hoverScroll';
import { ratioOf } from '../lib/media';
import Placeholder from './Placeholder';

function WorkCard({ p, i }) {
  const isScreen = p.preview === 'screen';
  return (
    <article className={`work ${i % 2 ? 'work--flip' : ''}`} data-reveal>
      <a className="work__link" href={`#${p.id}`} aria-label={`${p.title} 상세 보기`}>
        <div className={`work__media rv ${isScreen ? 'work__media--screen' : ''}`}>
          {isScreen && (
            <div className="work__chrome" aria-hidden="true">
              <i />
              <i />
              <i />
              <span>{p.title.toLowerCase()}</span>
            </div>
          )}
          <div className="work__viewport scroll-vp">
            <div className="work__scroll scroll-in">
              <Placeholder
                ratio={ratioOf(p.cover)}
                src={p.cover.src}
                parts={p.cover.parts}
                label={p.title}
                sub={isScreen ? 'SCREEN PREVIEW' : 'LONG PAGE PREVIEW'}
                long
                tone={i % 2 ? 'b' : 'a'}
              />
            </div>
          </div>
          <span className="work__hint" aria-hidden="true">
            HOVER TO SCROLL
          </span>
        </div>

        <div className="work__info">
          <p className="work__cat rv">
            <span>{p.category}</span>
            {p.specs?.map((s) => (
              <span key={s} className="work__spec">
                {s}
              </span>
            ))}
          </p>
          <h3 className="work__title rv">{p.title}</h3>
          <p className={`work__summary rv ${p.summary ? '' : 'tbd'}`}>{p.summary || '프로젝트 설명 추후 입력'}</p>
          <span className="work__cta rv">
            VIEW PROJECT <span aria-hidden="true">→</span>
          </span>
        </div>
      </a>
    </article>
  );
}

/**
 * 프로젝트 카드 섹션 — projects.js 의 section 값으로 나눠 씁니다.
 *  <Works section="work" id="work" title="SELECTED WORKS" />
 *  <Works section="personal" id="personal" title="PERSONAL" />
 */
export default function Works({ section = 'work', id = 'work', title = 'SELECTED WORKS', desc }) {
  const root = useRef(null);
  const list = projects.filter((p) => (p.section || 'work') === section);
  useReveal(root);
  useHoverScroll(root, '.work__link');

  if (!list.length) return null;

  return (
    <section className={`works works--${section}`} id={id} ref={root} aria-labelledby={`${id}-title`}>
      <header className="sec-head" data-reveal>
        <h2 id={`${id}-title`} className="sec-head__title rv">
          {title}
        </h2>
        <p className="sec-head__count rv">({String(list.length).padStart(2, '0')})</p>
        {desc && <p className="sec-head__desc rv">{desc}</p>}
      </header>
      <div className="works__list">
        {list.map((p, i) => (
          <WorkCard key={p.id} p={p} i={i} />
        ))}
      </div>
    </section>
  );
}
