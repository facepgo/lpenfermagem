import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Publicada em facep.com.br/enf — o build sai direto na pasta que a Vercel serve.
  base: '/enf/',
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2022',
    assetsInlineLimit: 2048,
    outDir: '../enf',
    emptyOutDir: true,
  },
});
