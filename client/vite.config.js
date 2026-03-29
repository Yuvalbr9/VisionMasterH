THIS IS A SYNTAX ERROR TO TEST IF CONFIG IS LOADED;
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const backendOrigin = process.env.VITE_BACKEND_URL || 'http://localhost:5099';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '^/api': {
        target: 'http://127.0.0.1:5099',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
