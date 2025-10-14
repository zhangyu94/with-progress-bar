import copy from 'rollup-plugin-copy'
import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: [
    'src/index.ts',
  ],
  dts: true,
  external: ['nprogress'],
  plugins: [
    copy({
      targets: [
        {
          src: 'node_modules/nprogress/nprogress.css',
          dest: 'dist',
          rename: 'index.css',
        },
      ],
    }),
  ],
})
