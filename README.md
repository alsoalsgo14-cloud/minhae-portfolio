# MINHAE Portfolio (v0.1 — 플레이스홀더 버전)

패션 웹디자이너 MINHAE 포트폴리오. React + Vite + GSAP(ScrollTrigger).

## 실행

```bash
npm install
npm run dev      # 로컬 개발 서버
npm run build    # dist/ 폴더에 배포용 파일 생성
```

GitHub Pages에 올릴 때는 `vite.config.js`의 `base`를 저장소 이름으로 바꿔주세요.

## 이미지 넣는 순서

1. 원본 이미지를 **`images-src/`** 폴더에 넣습니다. (하위 폴더 자유롭게. 예: `images-src/detail/hago/bag-wallet.jpg`)
   - `public/images/` 에는 직접 넣지 마세요. 자동으로 만들어지는 폴더입니다.
2. 터미널에서 `npm run images` 실행
   - 웹용으로 줄이고 압축해서 `public/images/` 에 저장합니다.
   - 긴 이미지(상세페이지·기획전)는 가로 1440px 로 줄여 2000px 단위 조각으로 나눕니다.
   - 움직이는 GIF 는 MP4 영상 + 첫 장면 이미지로 바꿉니다 (화면에 보일 때만 반복 재생).
   - 갤러리·카드용 썸네일(가로 800px)도 함께 만듭니다.
   - 크기·비율 정보는 `src/data/imageManifest.js` 에 자동 기록됩니다.
3. `src/data/` 의 데이터 파일에서 `src` 에 **images-src 기준 경로**를 입력합니다.
   ```js
   { label: '가방 · 지갑', src: 'detail/hago/bag-wallet.jpg', long: true }
   ```
   비율(`ratio`)은 직접 쓰지 않아도 됩니다.
4. `npm run dev` 로 확인합니다.

처음 한 번은 `npm install` 을 다시 실행해야 합니다 (이미지 처리 도구 sharp, ffmpeg 설치).

여러 장을 이어 붙여 한 페이지로 보여줄 때는 `parts` 를 씁니다.
```js
{ label: 'HASHTAG RUSH — PC', device: 'pc', parts: ['campaigns/hashtag-rush/pc-main.gif', 'campaigns/hashtag-rush/pc-section1.gif', 'campaigns/hashtag-rush/pc-section2.jpg'] }
```

### images-src 폴더 구성

| 폴더 | 내용 | 원본 (img 폴더) |
| --- | --- | --- |
| `detail/hago/` | HAGO 상세페이지 3장 | — |
| `campaigns/hashtag-rush/` | pc-/mo- main·section1·section2 | `hashtag rush/` (파일명 `_` → `-`) |
| `campaigns/beentrill-ajobyajo/` | pc.jpg, mo.jpg | `ajo x bentrill/Group 4.jpg`, `Group 5.jpg` |
| `campaigns/banners/` | 배너 4세트 × PC/MO | `기획전 배너/` — Group 3·6 = OUTLET COUPON DEAL, pc 3·mo 2 = CLEARANCE, pc 4·mo 3 = OUTLET WINTER, pc 5·mo 4 = WWB BIG SALE |
| `ai-outfit/` | ai-outfit-01 ~ 14 | `image lab/ai outfit/` 순서: 10-1(WT001), 4, 9, BA262TS005CH, BA262TS007_SB, BA262TS010_LN, JP001_BK, JP001_LG 2, VA262TS013VL, VA262TS106BK, VU264RM001, VUHM00(2), VUTL002,PT003 (2), 여5 |
| `ai-outfit/personal/` | personal-01 ~ 04 | `image lab/ai outfit/개인작업/` 1~4 |
| `retouch/after/` | 보정본 8장 | `image lab/보정본/` |
| `retouch/before/` | 보정 전 8장 | `image lab/원본/` — 보정본과 비율이 다른 5장(0903_12479, 12522, 12696, 12716, 1013_0797)은 보정본과 같은 구도로 잘라 BEFORE/AFTER 슬라이더가 정확히 겹치게 함 |

파일명은 웹 주소에서 문제가 없도록 영문·숫자·`-` 로 정리했습니다.

## 이미지·문구 교체 — `src/data/` 만 수정하면 됩니다

| 파일 | 내용 |
| --- | --- |
| `src/data/site.js` | 로고, 소개 문구, 메뉴, 메인 첫 화면 프레임 4개, ABOUT, CONTACT |
| `src/data/projects.js` | Selected Works 카드 순서와 각 프로젝트 상세 내용 |
| `src/data/imageLab.js` | IMAGE LAB 갤러리, BEFORE/AFTER 비교 항목 |

- `src`가 `null`이면 연회색 플레이스홀더가 표시됩니다.
- `ratio`는 이미지가 없을 때 플레이스홀더 비율입니다 (`'가로/세로'`). 이미지가 들어가면 실제 크기를 씁니다.
- 상세 페이지 옵션: `keyImage: false` 키 비주얼 숨김 / `resultsLayout: 'columns'` 결과물 나란히 배치.
- `null`로 둔 텍스트는 화면에 **추후 입력**으로 표시됩니다. 확인되지 않은 정보는 비워두세요.
- 로고: `src/assets/minhae-logo.svg` (전달받은 로고를 벡터 패스로 변환한 파일). 글자색을 따라가서 흰 배경에선 검정, 검정 배경에선 흰색으로 표시됩니다. 같은 파일이 `public/images/logo/`에도 있습니다.
- 기획전 결과물 규격: PC 1920px / MO 1080px (`projects.js`의 `BANNER`). 결과물에 `device: 'pc'` / `'mo'`를 넣으면 상세 페이지에서 나란히 배치됩니다. 세로 값은 임시이므로 실제 이미지 높이로 바꿔주세요.

## 주소 구조

- `#hago`, `#hashtag-rush` … → 프로젝트 상세 (projects.js의 `id`)
- `#work`, `#image-lab`, `#about`, `#contact` → 메인의 각 섹션

## 인터랙션 정리

- 메인: 로고를 가로 컷 기준으로 위/아래 두 조각으로 나눠, 등장할 때 양쪽에서 들어와 맞물리고 스크롤·마우스에 따라 반대 방향으로 살짝 어긋남. 프레임은 마우스 위치에 따라 최대 약 20px 이동(데스크톱만), 스크롤 시 위·아래로 벌어짐. 고정(pin) 없음.
- WORK 카드: 스크롤 시 짧게 등장, 데스크톱 호버 시 긴 이미지가 세로로 이동, 클릭/탭하면 상세로 이동.
- IMAGE LAB: 데스크톱 약 3장 / 모바일 1장 + 다음 이미지 일부. 마우스 드래그, 터치 스와이프, 좌우 버튼. 클릭 시 확대 뷰어, `compare: true` 항목은 BEFORE/AFTER 슬라이더.
- 상세: 결과물 이미지는 원본 비율로 표시, 클릭 시 확대(긴 이미지는 세로 스크롤).
- 모바일·터치 기기에서는 마우스 효과 꺼짐. `prefers-reduced-motion`이면 애니메이션 없이 모든 콘텐츠가 바로 표시됨.
