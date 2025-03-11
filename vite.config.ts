/// <reference types="vitest/config" />
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
  test: {
    globals: true,
    environment: 'jsdom',
    //setupFiles: './src/tests/setupTests.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      all: true,
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: [
        'node_modules',
        'src/**/*.d.{js,jsx,ts,tsx}',
        'src/**/*.gen.{js,jsx,ts,tsx}',
        'src/**/*.test.{js,jsx,ts,tsx}',
        'src/assets/',
        'src/client/',
        'src/tests/',
      ],
    },
  },
});
