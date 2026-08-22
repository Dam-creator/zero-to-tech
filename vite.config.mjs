import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        lab: resolve(import.meta.dirname, 'text-lab.html'),
      },
    },
  },
})
