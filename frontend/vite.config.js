import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,

    // Proxy untuk mengalihkan request /api ke backend Go
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },

    // Izinkan domain ngrok / cloudflare tunnel / lainnya
    allowedHosts: [
      'laterally-overfierce-arlyne.ngrok-free.dev'
    ],
  },
})
