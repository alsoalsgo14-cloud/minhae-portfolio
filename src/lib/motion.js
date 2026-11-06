import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

// 공통 미디어 조건
export const MQ = {
  motion: '(prefers-reduced-motion: no-preference)',
  reduce: '(prefers-reduced-motion: reduce)',
  // 마우스 효과는 넓은 화면 + 정밀 포인터에서만
  pointer: '(min-width: 900px) and (hover: hover) and (pointer: fine)',
};

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia(MQ.reduce).matches;

/**
 * [data-reveal] 블록 안의 .rv 요소를 스크롤 시 짧게 등장시킵니다.
 * · 이미 화면 안에 있는 요소는 건드리지 않습니다 (첫 화면은 항상 보이는 상태).
 * · 모션 감소 설정이면 아무 것도 숨기지 않습니다.
 */
export function useReveal(scopeRef, deps = []) {
  useLayoutEffect(() => {
    if (!scopeRef.current) return undefined;
    const mm = gsap.matchMedia(scopeRef);
    mm.add(MQ.motion, () => {
      gsap.utils.toArray('[data-reveal]').forEach((block) => {
        const targets = block.querySelectorAll('.rv');
        if (!targets.length) return;
        if (block.getBoundingClientRect().top < window.innerHeight * 0.92) return;
        gsap.set(targets, { autoAlpha: 0, y: 28 });
        ScrollTrigger.create({
          trigger: block,
          start: 'top 88%',
          once: true,
          onEnter: () =>
            gsap.to(targets, {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.07,
              ease: 'power3.out',
              clearProps: 'transform',
            }),
        });
      });
    });
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
