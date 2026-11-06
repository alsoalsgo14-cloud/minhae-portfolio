import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages 배포 시 base를 저장소 이름으로 바꿔주세요. 예: base: '/minhae-portfolio/'
export default defineConfig({
  plugins: [react()],
  base: './',
});
