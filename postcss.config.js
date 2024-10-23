import { defineConfig } from 'vite'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

export default defineConfig({
    plugins: [
        autoprefixer(),
        cssnano({
            preset: 'default',
        }),
    ],
  })