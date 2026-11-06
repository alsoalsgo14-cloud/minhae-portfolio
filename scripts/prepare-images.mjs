/**
 * 이미지 자동 처리 — npm run images
 *
 * images-src/ 에 넣은 원본을 웹용으로 바꿔 public/images/ 에 저장하고,
 * 크기 정보를 src/data/imageManifest.js 에 자동으로 기록합니다.
 *
 *  · 일반 이미지 : 가로 최대 2000px + 썸네일(가로 800px, 갤러리·카드용)
 *  · 긴 이미지   : 세로가 가로의 2배 이상(상세페이지·기획전) → 가로 1440px, 세로 2000px 단위 조각
 *  · 움직이는 GIF: MP4 영상(가로 최대 1440px) + 첫 장면 이미지(포스터)로 변환
 *                  → 용량이 크게 줄고 움직임은 그대로 유지
 *  · 폴더 구조가 그대로 유지됩니다. 데이터 파일에서는 원본 경로로 지정합니다.
 *      src: 'detail/hago/bag-wallet.jpg'
 *  · 이미 처리된 파일은 원본이 바뀌지 않았으면 건너뜁니다.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'images-src');
const OUT = path.join(ROOT, 'public', 'images');
const MANIFEST = path.join(ROOT, 'src', 'data', 'imageManifest.js');

const MAX_W = 2000; // 일반 이미지 최대 가로
const THUMB_W = 800; // 썸네일 가로
const LONG_W = 1440; // 긴 이미지 가로
const VIDEO_W = 1440; // 영상 최대 가로
const LONG_RATIO = 2; // 세로/가로 가 이 값 이상이면 긴 이미지
const SLICE_H = 2000; // 긴 이미지 조각 높이
const QUALITY = 82;
const EXT = /\.(jpe?g|png|webp|tiff?|gif)$/i;

sharp.cache(false);

function findFfmpeg() {
  if (process.env.FFMPEG_PATH) return process.env.FFMPEG_PATH;
  try {
    return require('@ffmpeg-installer/ffmpeg').path;
  } catch {
    return null;
  }
}
const FFMPEG = findFfmpeg();

const toPosix = (p) => p.split(path.sep).join('/');
const even = (n) => Math.max(2, Math.round(n / 2) * 2);

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const full = path.join(dir, d.name);
    if (d.isDirectory()) return walk(full);
    return EXT.test(d.name) ? [full] : [];
  });
}

function readManifest() {
  try {
    const txt = fs.readFileSync(MANIFEST, 'utf8');
    return JSON.parse(txt.slice(txt.indexOf('{'), txt.lastIndexOf('}') + 1));
  } catch {
    return {};
  }
}

const outputsOf = (e) => [
  ...(e.slices ? e.slices.map((s) => s.url) : []),
  e.url,
  e.thumb,
  e.video,
  e.poster,
].filter(Boolean);

const jpeg = (img) => img.flatten({ background: '#ffffff' }).jpeg({ quality: QUALITY, mozjpeg: true, progressive: true });

async function processFile(file, prev) {
  const key = toPosix(path.relative(SRC, file));
  const stat = fs.statSync(file);
  const stamp = `${stat.size}-${Math.round(stat.mtimeMs)}`;

  if (prev && prev.stamp === stamp && outputsOf(prev).every((u) => fs.existsSync(path.join(ROOT, 'public', u)))) {
    return [key, prev, 'skip'];
  }

  const input = () => sharp(file, { limitInputPixels: false }).rotate();
  const meta = await sharp(file, { limitInputPixels: false }).metadata();
  const swap = (meta.orientation || 1) >= 5;
  const w = swap ? meta.height : meta.width;
  const h = swap ? meta.width : meta.height;

  const rel = toPosix(path.dirname(key));
  const name = path.basename(key).replace(EXT, '');
  const outDir = path.join(OUT, rel);
  fs.mkdirSync(outDir, { recursive: true });
  const urlOf = (fileName) => toPosix(path.join('images', rel, fileName));
  const entry = { w, h, stamp };

  // ── 움직이는 GIF → MP4 + 포스터 ──
  const animated = /\.gif$/i.test(key) && (meta.pages || 1) > 1;
  if (animated && FFMPEG) {
    const ow = even(Math.min(w, VIDEO_W));
    const videoName = `${name}.mp4`;
    execFileSync(
      FFMPEG,
      ['-y', '-loglevel', 'error', '-i', file, '-vf', `scale=${ow}:-2:flags=lanczos`, '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '24', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', path.join(outDir, videoName)],
      { stdio: 'inherit' }
    );
    const posterName = `${name}-poster.jpg`;
    await jpeg(sharp(file, { pages: 1 }).resize({ width: ow })).toFile(path.join(outDir, posterName));
    Object.assign(entry, { ow, oh: Math.round((h * ow) / w), video: urlOf(videoName), poster: urlOf(posterName) });
    return [key, entry, 'done'];
  }
  if (animated) console.warn(`!  ffmpeg 를 찾지 못해 ${key} 를 정지 이미지로 저장합니다. (npm install 후 다시 실행)`);

  const isLong = h / w >= LONG_RATIO;
  const ow = Math.min(w, isLong ? LONG_W : MAX_W);
  entry.ow = ow;
  entry.oh = Math.round((h * ow) / w);

  // ── 긴 이미지 → 조각 ──
  if (isLong) {
    const { data, info } = await input().resize({ width: ow }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    const raw = { raw: { width: info.width, height: info.height, channels: info.channels } };
    entry.oh = info.height;
    entry.slices = [];
    const count = Math.ceil(info.height / SLICE_H);
    for (let i = 0; i < count; i += 1) {
      const top = i * SLICE_H;
      const sh = Math.min(SLICE_H, info.height - top);
      const fileName = `${name}-${String(i + 1).padStart(2, '0')}.jpg`;
      await jpeg(sharp(data, raw).extract({ left: 0, top, width: info.width, height: sh })).toFile(path.join(outDir, fileName));
      entry.slices.push({ url: urlOf(fileName), h: sh });
    }
    return [key, entry, 'done'];
  }

  // ── 일반 이미지 (+ 썸네일) ──
  // 투명 영역이 실제로 있을 때만 PNG 유지 (사진은 JPG가 훨씬 가벼움)
  const alpha = meta.hasAlpha && !(await sharp(file, { limitInputPixels: false }).stats()).isOpaque;
  const encode = (img) => (alpha ? img.png({ compressionLevel: 9, palette: false }) : jpeg(img));
  const ext = alpha ? 'png' : 'jpg';
  const fileName = `${name}.${ext}`;
  await encode(input().resize({ width: ow, withoutEnlargement: true })).toFile(path.join(outDir, fileName));
  entry.url = urlOf(fileName);
  if (w > THUMB_W * 1.25) {
    const thumbName = `${name}-thumb.jpg`;
    await jpeg(input().resize({ width: THUMB_W })).toFile(path.join(outDir, thumbName));
    entry.thumb = urlOf(thumbName);
  }
  return [key, entry, 'done'];
}

async function main() {
  const files = walk(SRC);
  if (!files.length) {
    console.log('images-src 폴더에 이미지가 없습니다.');
    return;
  }
  const prev = readManifest();
  const next = {};
  for (const file of files) {
    const key = toPosix(path.relative(SRC, file));
    try {
      const [k, entry, status] = await processFile(file, prev[key]);
      next[k] = entry;
      const kind = entry.video ? '영상' : entry.slices ? `${entry.slices.length}조각` : '1장';
      console.log(`${status === 'skip' ? '·  그대로' : '✓  처리'}  ${k}  (${entry.w}×${entry.h} → ${entry.ow}×${entry.oh}, ${kind})`);
    } catch (err) {
      console.error(`✗  실패  ${key}: ${err.message}`);
    }
  }
  fs.writeFileSync(
    MANIFEST,
    `// 자동 생성 파일 — 직접 수정하지 마세요. (npm run images 로 다시 만들어집니다)\nexport default ${JSON.stringify(next, null, 2)};\n`
  );
  console.log(`\n${Object.keys(next).length}개 이미지 정보를 src/data/imageManifest.js 에 저장했습니다.`);
}

main();
