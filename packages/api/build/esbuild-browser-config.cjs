/* eslint-disable @typescript-eslint/no-var-requires */
const polyfillProviderPlugin = require('node-stdlib-browser/helpers/esbuild/plugin');
const stdLibBrowser = require('node-stdlib-browser');

const requiredPolyfills = new Set(['crypto', 'node:crypto', 'stream', 'node:stream', 'buffer', 'node:buffer']);

const polyfills = {};
for (let lib in stdLibBrowser) {
    if (requiredPolyfills.has(lib)) polyfills[lib] = stdLibBrowser[lib];
}

/** @type {import('esbuild').BuildOptions} */
module.exports = {
    entryPoints: ['./src/index.ts'],
    bundle: true,
    format: 'esm',
    sourcemap: false,
    minify: false,
    platform: 'browser',
    target: ['chrome101', 'firefox108', 'safari16'],
    inject: [require.resolve('node-stdlib-browser/helpers/esbuild/shim')],
    plugins: [polyfillProviderPlugin(polyfills),],
    define: { 'global': 'globalThis' },
};