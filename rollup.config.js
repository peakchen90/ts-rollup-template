const path = require('path');
const commonjs = require('@rollup/plugin-commonjs');
const nodeResolve = require('@rollup/plugin-node-resolve');
const typescript = require('@rollup/plugin-typescript');
const { default: babel } = require('@rollup/plugin-babel');
const replace = require('@rollup/plugin-replace');
const json = require('@rollup/plugin-json');
const { terser } = require('rollup-plugin-terser');
const babelConfig = require('./babel.config');

const rootPath = process.cwd();
// const __DEV__ = process.env.NODE_ENV !== 'production';

const extensions = ['.ts', '.tsx', '.js', '.jsx', '.json'];

module.exports = {
  input: 'src/index.ts',
  output: {
    file: `dist/html-parser.js`,
    format: 'umd',
    sourcemap: true,
    name: 'HTMLParser',
    exports: 'named'
  },
  watch: {
    include: 'src/**',
    exclude: 'node_modules/**'
  },
  plugins: [
    json(),
    commonjs(),
    babel({
      ...babelConfig,
      babelHelpers: 'runtime',
      extensions
    }),
    nodeResolve({
      extensions
    }),
    replace({
      __VERSION__: `"${require('./package.json').version}"`
    }),
    // __DEV__ && terser({
    //   output: {
    //     comments: false
    //   }
    // }),
  ].filter(Boolean)
};
