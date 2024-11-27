import { defineConfig } from 'vite'
import basiSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
  plugins: [
    basiSsl()
  ],
  server: {
    host: true
  }
})
