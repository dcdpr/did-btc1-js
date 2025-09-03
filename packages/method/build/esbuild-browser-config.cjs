/* eslint-disable @typescript-eslint/no-var-requires */
const polyfillProviderPlugin = require('node-stdlib-browser/helpers/esbuild/plugin');
const stdLibBrowser = require('node-stdlib-browser');
const path = require('path');

const requiredPolyfills = new Set(['crypto', 'node:crypto', 'stream']);

// populate object containing lib -> polyfill path
const polyfills = {};
for (let lib in stdLibBrowser) {
    if (requiredPolyfills.has(lib)) {
        const polyfill = stdLibBrowser[lib];
        polyfills[lib] = polyfill;
    }
}

function aliasCommonLoggerToBrowser() {
    // Handles:
    //  - ../common/dist/esm/logger.js
    //  - ../../common/dist/esm/logger.js
    //  - @scope/common/dist/esm/logger.js (if you ever use the package name)
    const filter = /(^|\/)(?:@[^/]+\/)?common\/dist\/esm\/logger\.js$/;
    const replacement = path.resolve(__dirname, '../common/dist/esm/logger.browser.js');

    return {
        name: 'alias-common-logger-to-browser',
        setup(build) {
            build.onResolve({ filter }, () => ({ path: replacement }));
        },
    };
}

/** @type {import('esbuild').BuildOptions} */
module.exports = {
    entryPoints: ['./src/index.ts'],
    bundle: true,
    format: 'esm',
    sourcemap: true,
    minify: true,
    platform: 'browser',
    target: ['chrome101', 'firefox108', 'safari16'],
    inject: [require.resolve('node-stdlib-browser/helpers/esbuild/shim')],
    plugins: [
        polyfillProviderPlugin(polyfills),
        aliasCommonLoggerToBrowser()
    ],
    loader: { '.wasm': 'binary' },
    mainFields: ['browser', 'module', 'main'],
    define: { 'global': 'globalThis' },
    external: [
        'bunyan',
        'bitcoin-core',
        '@uphold/request-logger',
        'request',
        'dtrace-provider',
    ],
};