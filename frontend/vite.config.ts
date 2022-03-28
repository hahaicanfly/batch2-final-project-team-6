import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/style/_mixins.scss";`
      }
    }
  },
  plugins: [react()],
  optimizeDeps: {
    exclude: ['ipfs-http-client', 'electron-fetch']
  }
})
