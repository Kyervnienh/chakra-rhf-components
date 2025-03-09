import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { externalizeDeps } from 'vite-plugin-externalize-deps';

// https://vite.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'lib/index.ts',
      name: 'chakra-rhf-components',
      fileName: 'index',
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [
    react(),
    dts({ copyDtsFiles: true, insertTypesEntry: true }),
    externalizeDeps(),
  ],
});
