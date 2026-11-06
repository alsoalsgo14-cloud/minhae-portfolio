import { useLayoutEffect } from 'react';
import { gsap, MQ } from './motion';

/**
 * 데스크톱에서 마우스를 올리면 긴 이미지가 세로로 천천히 내려가는 미리보기.
 * scope 안의 linkSelector 요소마다 .scroll-vp(보이는 창) 와 .scroll-in(움직이는 내용) 을 찾습니다.
 * 모바일 · 모션 감소 설정에서는 동작하지 않습니다.
 */
export function useHoverScroll(scopeRef, linkSelector, deps = []) {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia(scopeRef);
    mm.add(`${MQ.pointer} and ${MQ.motion}`, () => {
      const cleanups = gsap.utils.toArray(linkSelector).map((link) => {
        const viewport = link.querySelector('.scroll-vp');
        const inner = link.querySelector('.scroll-in');
        if (!viewport || !inner) return () => {};
        let tween;
        const enter = () => {
          const dist = Math.max(0, inner.offsetHeight - viewport.clientHeight);
          tween?.kill();
          tween = gsap.to(inner, { y: -dist, duration: Math.min(9, Math.max(2, dist / 520)), ease: 'power1.inOut' });
        };
        const leave = () => {
          tween?.kill();
          tween = gsap.to(inner, { y: 0, duration: 0.9, ease: 'power3.out' });
        };
        link.addEventListener('mouseenter', enter);
        link.addEventListener('mouseleave', leave);
        link.addEventListener('focus', enter);
        link.addEventListener('blur', leave);
        return () => {
          link.removeEventListener('mouseenter', enter);
          link.removeEventListener('mouseleave', leave);
          link.removeEventListener('focus', enter);
          link.removeEventListener('blur', leave);
        };
      });
      return () => cleanups.forEach((fn) => fn());
    });
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
