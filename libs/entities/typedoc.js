module.exports = {
    out: './apps/documentation/src/assets/docs/entities',
    name: '@bsmp/entities',
    // readme: 'none',
    includes: './',
    exclude: [
        '**/vendor/**/*'
    ],
    mode: 'file',
    excludeExternals: true,
    excludeNotExported: true,
    excludePrivate: true,
    ignoreCompilerErrors: true,
    hideGenerator: true,
    target: 'ES6',
    json: './apps/documentation/src/assets/docs/entities.json'
};
