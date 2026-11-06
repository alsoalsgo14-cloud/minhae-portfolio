import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { projects } from './data/projects';
import { site } from './data/site';
import { ScrollTrigger, prefersReducedMotion } from './lib/motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Works from './components/Works';
import DetailPages from './components/DetailPages';
import ImageLab from './components/ImageLab';
import About from './components/About';
import Contact from './components/Contact';
import ProjectDetail from './components/ProjectDetail';

const readHash = () => decodeURIComponent(window.location.hash.slice(1));

/*
 * 라우팅: 주소의 #값으로 화면을 정합니다.
 *  · #hago, #hashtag-rush …  → 프로젝트 상세
 *  · #work, #image-lab …    → 메인 페이지의 해당 섹션
 *  · 그 외                   → 메인 페이지
 */
export default function App() {
  const [hash, setHash] = useState(readHash);
  const project = projects.find((p) => p.id === hash);
  const homeY = useRef(0);
  const wasDetail = useRef(Boolean(project));

  useEffect(() => {
    const on = () => {
      // 메인에 있을 때의 스크롤 위치 저장 (상세에서 '뒤로가기' 시 복원)
      if (!wasDetail.current) homeY.current = window.scrollY;
      setHash(readHash());
    };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);

  const firstLoad = useRef(true);

  useLayoutEffect(() => {
    const fromDetail = wasDetail.current;
    wasDetail.current = Boolean(project);
    // 처음 열 때(#detail-pages 처럼 주소로 바로 들어온 경우)는 즉시 이동
    const isFirst = firstLoad.current;
    firstLoad.current = false;

    const behavior = isFirst || fromDetail || project || prefersReducedMotion() ? 'instant' : 'smooth';
    const goTo = () => {
      if (project) {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        return;
      }
      const el = hash && hash !== 'top' ? document.getElementById(hash) : null;
      if (el) el.scrollIntoView({ behavior });
      else if (hash === 'top') window.scrollTo({ top: 0, behavior });
      else if (fromDetail) window.scrollTo({ top: homeY.current, behavior: 'instant' });
    };

    document.title = project ? `${project.title} — ${site.name}` : `${site.name} Portfolio`;
    goTo();
    // 레이아웃이 바뀐 뒤 스크롤 트리거 위치를 재계산하고, 위치를 한 번 더 맞춤
    // (refresh 가 이전 스크롤 값을 되돌리는 경우가 있어 순서 고정)
    const id = requestAnimationFrame(() => {
      ScrollTrigger.clearScrollMemory?.();
      ScrollTrigger.refresh();
      if (project || fromDetail || isFirst) goTo();
    });
    return () => cancelAnimationFrame(id);
  }, [hash, project]);

  return (
    <>
      <a className="skip" href={project ? '#main' : '#work'}>
        본문 바로가기
      </a>
      <Header route={hash} />
      {project ? (
        <ProjectDetail key={project.id} project={project} />
      ) : (
        <main id="main">
          <Hero />
          {/* 섹션 순서: 아래 줄 순서를 바꾸면 메인 순서가 바뀝니다 (메뉴 순서는 site.js 의 nav) */}
          <Works section="personal" id="personal" title="PERSONAL" desc="개인 작업 — 웹사이트 · 상세페이지 리디자인" />
          <ImageLab />
          <DetailPages />
          <Works section="work" id="work" title="SELECTED WORKS" />
          <About />
        </main>
      )}
      {!project && <Contact />}
      {project && (
        <footer className="ft ft--detail">
          <p>© {new Date().getFullYear()} {site.name}</p>
          <a href="#contact">CONTACT →</a>
        </footer>
      )}
    </>
  );
}
