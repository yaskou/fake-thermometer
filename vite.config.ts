import { defineConfig } from 'vite'
import basiSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
  build: {
    target: 'esnext'
  },
  plugins: [
    basiSsl()
  ],
  server: {
    host: true
  }
})
