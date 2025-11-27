import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Authentication_app_Frontend/', // <-- مهم جدًا للنشر على GitHub Pages
  server: {
    port: 3000
  }
})
