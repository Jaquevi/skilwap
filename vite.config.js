import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const api = {
  target: 'http://127.0.0.1:3001',
  rewrite: (path) => path.replace(/^\/api/, ''),
}
export default defineConfig({
  server: { proxy: { '/api': api } },
  preview: { proxy: { '/api': api } },
  plugins: [
    react(),
    tailwindcss(),
  ],
})
