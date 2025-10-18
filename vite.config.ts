import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // IMPORTANT: Set base for GitHub Pages (served from /Product-Theme-Studio/)
  // If you deploy elsewhere (Vercel/Netlify), you can remove this.
  base: '/Product-Theme-Studio/',
  plugins: [react()],
});
