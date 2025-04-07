import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@features': path.resolve(__dirname, './src/features'),
      '@theme': path.resolve(__dirname, './src/theme'),
      '@config': path.resolve(__dirname, './src/config'),
      '@api': path.resolve(__dirname, './src/api'),
      '@layouts': path.resolve(__dirname, './src/layouts'), // 👈 ¡Agregalo!
      '@router': path.resolve(__dirname, './src/router'), // (Opcional, mejor aún)
      '@pages': path.resolve(__dirname, './src/pages'),
       // (Opcional, mejor para el Home)
    },
  },
  server: {
    open: true,
  },
})
