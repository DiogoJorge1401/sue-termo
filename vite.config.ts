/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    reporters: ['verbose'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      provider: 'istanbul',
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80
    }
  }
});
