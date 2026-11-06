import { site } from '../data/site';
import Logo from './Logo';

export default function Contact() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <p className="eyebrow eyebrow--inv">CONTACT</p>
      <h2 id="contact-title" className="sr-only">
        연락처
      </h2>
      <ul className="contact__list">
        {site.contact.map((c) => {
          const inner = (
            <>
              <span className="contact__label">{c.label}</span>
              <span className={`contact__value ${c.value ? '' : 'tbd'}`}>{c.value || '추후 입력'}</span>
              <span className="contact__arrow" aria-hidden="true">
                ↗
              </span>
            </>
          );
          return (
            <li key={c.label}>
              {c.href ? (
                <a className="contact__row" href={c.href} target="_blank" rel="noreferrer">
                  {inner}
                </a>
              ) : (
                <div className="contact__row">{inner}</div>
              )}
            </li>
          );
        })}
      </ul>
      <div className="contact__mark">
        <Logo />
      </div>
      <footer className="ft">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>
    </section>
  );
}
