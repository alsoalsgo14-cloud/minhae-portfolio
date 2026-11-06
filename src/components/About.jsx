import { useRef } from 'react';
import { site } from '../data/site';
import { useReveal } from '../lib/motion';

export default function About() {
  const root = useRef(null);
  useReveal(root);
  const { statement, capabilities, details } = site.about;

  return (
    <section className="about" id="about" ref={root} aria-labelledby="about-title">
      <div className="about__grid" data-reveal>
        <h2 id="about-title" className="eyebrow rv">
          ABOUT
        </h2>
        <p className="about__statement rv">{statement}</p>
      </div>

      <div className="about__grid about__grid--info" data-reveal>
        <p className="eyebrow rv">CAPABILITIES</p>
        <ul className="about__caps rv">
          {capabilities.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <dl className="about__dl rv">
          {details.map((d) => (
            <div key={d.label}>
              <dt>{d.label}</dt>
              <dd className={d.value ? '' : 'tbd'}>{d.value || '추후 입력'}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
