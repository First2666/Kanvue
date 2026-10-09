import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/cs67/vue/s17/Kang/',
  plugins: [
    vue(),
    tailwindcss(),
  ],
})
