import { fileURLToPath, URL } from 'node:url'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import SVGLoader from 'vite-svg-loader'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), Pages(), Layouts(), SVGLoader()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
