import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const backendOrigin = process.env.VITE_BACKEND_URL || 'http://localhost:5099';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: backendOrigin,
        changeOrigin: true,
      },
    },
  },
});
