import { useRef } from 'react';
import { site } from '../data/site';
import { useReveal } from '../lib/motion';

function Bullets({ items }) {
  if (!items?.length) return null;
  return (
    <ul className="about__bullets">
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}

/** 왼쪽 라벨 + 오른쪽 내용 한 줄 */
function Block({ label, children, id }) {
  return (
    <div className="about__grid about__grid--info" data-reveal>
      <h3 className="eyebrow rv" id={id}>
        {label}
      </h3>
      <div className="about__body rv">{children}</div>
    </div>
  );
}

export default function About() {
  const root = useRef(null);
  useReveal(root);
  const { intro = [], capabilities = [], experience = [], tools = [], education = [] } = site.about;
  const [lead, ...rest] = intro;

  return (
    <section className="about" id="about" ref={root} aria-labelledby="about-title">
      <div className="about__grid" data-reveal>
        <h2 id="about-title" className="eyebrow rv">
          ABOUT
        </h2>
        <div className="about__intro">
          {lead && <p className="about__statement rv">{lead}</p>}
          {rest.length > 0 && (
            <div className="about__paras rv">
              {rest.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
          )}
        </div>
      </div>

      <Block label="CAPABILITIES">
        <ul className="about__caps">
          {capabilities.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </Block>

      <Block label="EXPERIENCE">
        <div className="about__entries">
          {experience.map((e) => (
            <article className="about__entry" key={e.company + e.period}>
              <header className="about__entry-head">
                <h4>
                  {e.company}
                  {e.role && <span> | {e.role}</span>}
                </h4>
                {e.period && <p className="about__period">{e.period}</p>}
              </header>
              {e.desc && <p className="about__desc">{e.desc}</p>}
              <Bullets items={e.items} />
            </article>
          ))}
        </div>
      </Block>

      <Block label="TOOLS">
        <div className="about__tools">
          {tools.map((g) => (
            <div className="about__tool-group" key={g.group}>
              <p className="about__tool-title">{g.group}</p>
              <ul>
                {g.items.map(([name, desc]) => (
                  <li key={name}>
                    <strong>{name}</strong>
                    {desc && <span>{desc}</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Block>

      <Block label="EDUCATION">
        <div className="about__entries">
          {education.map((e) => (
            <article className="about__entry" key={e.school + e.major}>
              <header className="about__entry-head">
                <h4>
                  {e.school}
                  {e.major && <span> | {e.major}</span>}
                </h4>
                {e.period && <p className="about__period">{e.period}</p>}
              </header>
              <Bullets items={e.items} />
            </article>
          ))}
        </div>
      </Block>
    </section>
  );
}
