import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss' // corrected import

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // 👈 makes Vite accessible from outside (Docker, etc.)
    port: 5173,
    strictPort: true,
    hmr: {
      host: 'app.dprserver.me', // 👈 ensures hot reload works with this domain
    },
    proxy: {
      '/api': {
        target: 'https://dprserver.me',
        changeOrigin: true,
        secure: true,
      },
      '/nominatim': {
        target: 'https://nominatim.openstreetmap.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/nominatim/, ''),
      },
    },
  },
})


