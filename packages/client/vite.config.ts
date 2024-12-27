import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: Number(process.env.SERVER_PORT) || 3000,
    __SERVER_API__: `'${process.env.SERVER_API}'`,
  },
  plugins: [
    react(),
    VitePWA({
      filename: 'sw.ts',
      srcDir: '',
      strategies: 'injectManifest',
      injectRegister: false,
      manifest: false,
      injectManifest: {
        injectionPoint: null,
      },
    }),
  ],
  optimizeDeps: {
    include: [
      "@editorjs/editorjs",
      "@editorjs/header",
      "@editorjs/image",
      "@editorjs/list",
      "@editorjs/table",
      "@editorjs/marker",
      "@editorjs/warning",
      "@editorjs/checklist",
      "@editorjs/inline-code",
      "@editorjs/raw",
      "@editorjs/embed",
    ],
  },
  build: {
    rollupOptions: {
      external: [
        '@editorjs/editorjs',
        '@editorjs/header',
        '@editorjs/image',
        '@editorjs/list',
      ],
    },
  },
});
