import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  root: './', // Asegúrate de que la raíz esté configurada correctamente
  build: {
    outDir: 'dist',  // Directorio donde se generarán los archivos de producción
    rollupOptions: {
      input: 'index.html',  // Asegúrate de que se esté buscando correctamente el archivo index.html
    },
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})
