import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    hmr: {
      host: 'app.dprserver.me',
      protocol: 'ws',
      clientPort: 80, // Use 443 if you're using HTTPS
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


