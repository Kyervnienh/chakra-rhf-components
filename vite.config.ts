/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react-swc';
import { defineConfig, resolveConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { externalizeDeps } from 'vite-plugin-externalize-deps';
import tsconfigPaths from 'vite-tsconfig-paths';

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
    tsconfigPaths(),
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
      include: ['lib/**/*.{js,jsx,ts,tsx}'],
      exclude: [
        'node_modules',
        'lib/**/*.d.{js,jsx,ts,tsx}',
        'lib/**/*.gen.{js,jsx,ts,tsx}',
        'lib/**/*.test.{js,jsx,ts,tsx}',
        'lib/assets/',
        'lib/client/',
        'lib/tests/',
      ],
    },
  },
});
