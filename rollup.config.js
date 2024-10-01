import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'esm',
    entryFileNames: '[name].mjs'
  },
  external: [
    'elliptic',
    'buffer',
    'bn.js',
    'uuid',
    'jose',
    'base64url'
  ],
  plugins: [
    typescript()
  ],
};
