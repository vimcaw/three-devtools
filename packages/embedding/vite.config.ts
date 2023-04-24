import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

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
  ],
  build: {
    lib: {
      entry: './src/index.tsx',
      name: 'ThreeJsDevTools',
      fileName: format => `index.${format}.js`,
      formats: ['es', 'umd'],
    },
  },
  define: {
    'process.env.NODE_ENV': '"production"',
  },
});
