module.exports = [
"[project]/node_modules/write-excel-file/browser/index.js [app-ssr] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/node_modules_0mvc7xkvmopwn._.js",
  "server/chunks/ssr/[externals]_module_1ddxq771bq236._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/node_modules/write-excel-file/browser/index.js [app-ssr] (ecmascript)");
    });
});
}),
"[project]/src/services/googleAuth.ts [app-ssr] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.resolve().then(() => {
        return parentImport("[project]/src/services/googleAuth.ts [app-ssr] (ecmascript)");
    });
});
}),
];