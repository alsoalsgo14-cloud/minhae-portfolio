import { useLayoutEffect, useRef } from 'react';
import { site } from '../data/site';
import { gsap, MQ } from '../lib/motion';
import Logo from './Logo';
import Placeholder from './Placeholder';

/*
 * 프레임 위치(slot) — site.js 의 heroFrames 에서 slot 으로 지정
 *  위 줄 : a(왼쪽) · e(가운데 작게) · f(가운데) · b(오른쪽)
 *  아래 줄: c(왼쪽) · g(가운데 왼쪽) · h(소개글 아래) · d(오른쪽)
 *  e · f · g · h 는 모바일에서 숨김
 */
const TOP = ['a', 'e', 'f', 'b'];

function Frame({ f, i }) {
  return (
    <a className={`hero__frame hero__frame--${f.slot}`} href={`#${f.project}`} data-depth={f.depth} aria-label={f.label}>
      <span className="hero__frame-inner" style={{ aspectRatio: f.ratio }}>
        <Placeholder ratio={f.ratio} label={f.label} src={f.src} focus={f.focus} tone={i % 2 ? 'b' : 'a'} fit="cover" />
      </span>
    </a>
  );
}

/*
 * 로고의 가로 컷(H·A·E를 가로지르는 선)을 기준으로 로고를 위/아래 두 조각으로 나눠
 * 등장 · 스크롤 · 마우스에 따라 서로 반대 방향으로 살짝 어긋나게 합니다.
 * 정지 상태(모션 감소 포함)에서는 두 조각이 정확히 맞물려 원래 로고로 보입니다.
 */
export default function Hero() {
  const root = useRef(null);
  const bySlot = Object.fromEntries(site.heroFrames.map((f, i) => [f.slot, { f, i }]));
  const at = (slot) => bySlot[slot] && <Frame key={slot} f={bySlot[slot].f} i={bySlot[slot].i} />;

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(root);

    mm.add(MQ.motion, () => {
      // 첫 등장: 위 조각은 왼쪽에서, 아래 조각은 오른쪽에서 들어와 맞물림
      gsap.from('.hero__slice--top .hero__slice-in', { xPercent: -7, autoAlpha: 0, duration: 0.9, ease: 'power3.out' });
      gsap.from('.hero__slice--bot .hero__slice-in', { xPercent: 7, autoAlpha: 0, duration: 0.9, ease: 'power3.out' });
      gsap.from('.hero__frame', {
        autoAlpha: 0,
        scale: 0.96,
        duration: 0.8,
        stagger: 0.06,
        delay: 0.2,
        ease: 'power2.out',
      });

      // 스크롤: 프레임은 위·아래로 벌어지고, 로고는 컷을 따라 어긋나며 흐려짐 → 다음 섹션으로
      const st = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 0.6 };
      gsap.to('.hero__frame--a', { yPercent: -28, ease: 'none', scrollTrigger: st });
      gsap.to('.hero__frame--b', { yPercent: -16, ease: 'none', scrollTrigger: st });
      gsap.to('.hero__frame--c', { yPercent: 10, ease: 'none', scrollTrigger: st });
      gsap.to('.hero__frame--d', { yPercent: 18, ease: 'none', scrollTrigger: st });
      gsap.to('.hero__frame--e', { yPercent: -22, ease: 'none', scrollTrigger: st });
      gsap.to('.hero__frame--f', { yPercent: -10, ease: 'none', scrollTrigger: st });
      gsap.to('.hero__frame--g', { yPercent: 14, ease: 'none', scrollTrigger: st });
      gsap.to('.hero__frame--h', { yPercent: 22, ease: 'none', scrollTrigger: st });
      gsap.to('.hero__slice--top', { xPercent: -5, ease: 'none', scrollTrigger: st });
      gsap.to('.hero__slice--bot', { xPercent: 5, ease: 'none', scrollTrigger: st });
      gsap.to('.hero__slices', { autoAlpha: 0.12, ease: 'none', scrollTrigger: st });
      gsap.fromTo('.hero__spark', { scaleX: 0.35 }, { scaleX: 1, ease: 'none', scrollTrigger: { ...st, end: 'bottom 40%' } });
    });

    // 마우스: 프레임은 깊이별로 이동, 로고 두 조각은 서로 반대로 아주 조금 이동 (데스크톱만)
    mm.add(`${MQ.pointer} and ${MQ.motion}`, () => {
      const items = gsap.utils.toArray('.hero__frame').map((el) => {
        const inner = el.querySelector('.hero__frame-inner');
        return {
          depth: Number(el.dataset.depth) || 1,
          x: gsap.quickTo(inner, 'x', { duration: 0.9, ease: 'power3.out' }),
          y: gsap.quickTo(inner, 'y', { duration: 0.9, ease: 'power3.out' }),
        };
      });
      const topX = gsap.quickTo('.hero__slice--top .hero__slice-in', 'x', { duration: 1, ease: 'power3.out' });
      const botX = gsap.quickTo('.hero__slice--bot .hero__slice-in', 'x', { duration: 1, ease: 'power3.out' });

      const MAX = 16; // px — 프레임끼리/글자와 겹치지 않는 범위
      const SLICE = 10; // px — 로고 조각 어긋남 최대치
      const onMove = (e) => {
        const nx = (e.clientX / window.innerWidth - 0.5) * 2;
        const ny = (e.clientY / window.innerHeight - 0.5) * 2;
        items.forEach((it) => {
          it.x(nx * MAX * it.depth);
          it.y(ny * MAX * 0.7 * it.depth);
        });
        topX(nx * SLICE);
        botX(-nx * SLICE);
      };
      const onLeave = () => {
        items.forEach((it) => (it.x(0), it.y(0)));
        topX(0);
        botX(0);
      };
      window.addEventListener('mousemove', onMove);
      document.documentElement.addEventListener('mouseleave', onLeave);
      return () => {
        window.removeEventListener('mousemove', onMove);
        document.documentElement.removeEventListener('mouseleave', onLeave);
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="hero" id="top" ref={root} aria-label="MINHAE 소개">
      <div className="hero__band hero__band--top">
        {TOP.map(at)}
        {site.role && <p className="hero__role">{site.role}</p>}
      </div>

      <div className="hero__logo" role="img" aria-label={site.name}>
        <span className="hero__slices" aria-hidden="true">
          <span className="hero__slice hero__slice--top">
            <span className="hero__slice-in">
              <Logo />
            </span>
          </span>
          <span className="hero__slice hero__slice--bot">
            <span className="hero__slice-in">
              <Logo />
            </span>
          </span>
        </span>
      </div>

      <div className="hero__band hero__band--bottom">
        {at('c')}
        {at('g')}
        <div className="hero__intro">
          <h1 className="hero__headline">{site.headline}</h1>
          <h2 className="hero__sub">{site.intro}</h2>
          <a className="hero__cta" href="#work">
            VIEW WORK <span aria-hidden="true">↓</span>
          </a>
        </div>
        {at('h')}
        {at('d')}
      </div>

      <span className="hero__spark spark" aria-hidden="true" />
    </section>
  );
}
