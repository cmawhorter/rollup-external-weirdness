const path        = require('path');

const rollup      = require('rollup');
const babel       = require('rollup-plugin-babel');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs    = require('rollup-plugin-commonjs');

const external = [ 'aws-sdk' ];

rollup.rollup({
  entry:              path.join(process.cwd(), 'src/main.js'),
  plugins: [
    nodeResolve({
      jsnext:         true,
      main:           true,
    }),
    commonjs({
      include:        'node_modules/**',
    }),
    babel({
      exclude:        'node_modules/**',
      babelrc:        false,
      presets:        [ [ 'es2015', { modules: false } ] ],
      plugins:        [ 'external-helpers' ],
    }),
  ],
  external:           (id) => { var isExternal = external.indexOf(id) > -1; console.log('external?', id, isExternal); return isExternal; },
}).then(bundle => {
  bundle.write({
    format:       'cjs',
    sourceMap:    true,
    dest:         'dist/index.js',
  });
  console.log('Build completed.');
}, console.error);