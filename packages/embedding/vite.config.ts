import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      plugins: [
        [
          '@swc/plugin-styled-components',
          {
            displayName: true,
            ssr: true,
          },
        ],
      ],
    }),
    dts({ compilerOptions: { moduleResolution: 99 } }),
  ],
  build: {
    lib: {
      entry: './src/main.tsx',
      name: 'ThreeJsDevTools',
      fileName: 'index',
    },
  },
});
