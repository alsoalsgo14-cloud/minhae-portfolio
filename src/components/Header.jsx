import { useEffect, useRef, useState } from 'react';
import { site } from '../data/site';
import Logo from './Logo';

export default function Header({ route }) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);

  // 메뉴 열림 시 스크롤 잠금 + Esc 닫기
  useEffect(() => {
    if (!open) return undefined;
    document.documentElement.classList.add('is-locked');
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.classList.remove('is-locked');
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // 페이지 이동 시 메뉴 닫기
  useEffect(() => setOpen(false), [route]);

  return (
    <>
      <header className="hd">
        <a className="hd__logo" href="#top" aria-label={`${site.name} 처음으로`}>
          <Logo />
        </a>
        <nav className="hd__nav" aria-label="주요 메뉴">
          {site.nav.map((n) => (
            <a key={n.id} href={`#${n.id}`}>
              {n.label}
            </a>
          ))}
        </nav>
        <button
          ref={btnRef}
          type="button"
          className="hd__menu"
          aria-expanded={open}
          aria-controls="menu-overlay"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'CLOSE' : 'MENU'}
        </button>
      </header>

      <div id="menu-overlay" className={`menu ${open ? 'is-open' : ''}`} hidden={!open}>
        <nav aria-label="전체 메뉴">
          {site.nav.map((n) => (
            <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)}>
              {n.label}
            </a>
          ))}
        </nav>
        <p className="menu__foot">{site.role}</p>
      </div>
    </>
  );
}
