module.exports = [
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/src/app/api/sheet/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$sheetParser$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/sheetParser.ts [app-route] (ecmascript)");
;
;
async function GET(request) {
    try {
        const envSheetUrl = process.env.GOOGLE_SHEET_URL ?? ("TURBOPACK compile-time value", "https://docs.google.com/spreadsheets/d/175LZPtMn7Af4sMsk8ywzLgjRVBX0NncOLOOfa58j3uA/edit?usp=sharing") ?? process.env.VITE_GOOGLE_SHEET_URL ?? '';
        if (!request) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                ok: true,
                configured: Boolean(envSheetUrl)
            });
        }
        const { searchParams } = new URL(request.url);
        const hasQueryParams = searchParams.has('spreadsheetId') || searchParams.has('sheet');
        if (!hasQueryParams) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                ok: true,
                configured: Boolean(envSheetUrl)
            });
        }
        const rawSheetUrlOrId = searchParams.get('spreadsheetId') || envSheetUrl;
        const sheetName = searchParams.get('sheet') || 'test_bank';
        const spreadsheetId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$sheetParser$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extractSpreadsheetId"])(rawSheetUrlOrId) || rawSheetUrlOrId.trim();
        if (!spreadsheetId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                ok: false,
                success: false,
                error: '未提供有效的試算表 ID 或伺服器尚未設定 GOOGLE_SHEET_URL'
            }, {
                status: 400
            });
        }
        const gvizUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json&headers=1&sheet=${encodeURIComponent(sheetName)}`;
        const upstreamRes = await fetch(gvizUrl, {
            cache: 'no-store'
        });
        if (!upstreamRes.ok) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                ok: false,
                success: false,
                error: `上游 Google Sheet 回應錯誤 (${upstreamRes.status})`
            }, {
                status: upstreamRes.status
            });
        }
        const rawText = await upstreamRes.text();
        return new Response(rawText, {
            status: 200,
            headers: {
                'Content-Type': 'text/plain; charset=utf-8'
            }
        });
    } catch (err) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: false,
            success: false,
            error: err?.message || '伺服器端讀取 Google Sheet 失敗'
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const body = await request.json();
        const scriptUrl = (body?.scriptUrl || process.env.GOOGLE_SCRIPT_URL || ("TURBOPACK compile-time value", "https://script.google.com/macros/s/AKfycbySKASrw-Ft0Ao7pwz2RAH4dQymQaLzdE1BtrmqproI9LTZQ3P_5hb6rj3CwmozL8pNfA/exec") || process.env.VITE_GOOGLE_SCRIPT_URL || '').trim();
        if (!scriptUrl) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                ok: false,
                success: false,
                error: 'GAS endpoint not configured (尚未設定 GOOGLE_SCRIPT_URL / NEXT_PUBLIC_GOOGLE_SCRIPT_URL)'
            }, {
                status: 500
            });
        }
        const payload = body?.payload ?? body;
        const gasRes = await fetch(scriptUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8'
            },
            body: JSON.stringify(payload)
        });
        const data = await gasRes.json().catch(()=>({
                success: gasRes.ok
            }));
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: gasRes.ok,
            success: data?.success ?? gasRes.ok,
            data,
            error: data?.error
        }, {
            status: gasRes.status
        });
    } catch (err) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: false,
            success: false,
            error: err?.message || 'BFF 代理轉發至 GAS 失敗'
        }, {
            status: 500
        });
    }
}
}),
"[project]/src/utils/sheetParser.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "extractSpreadsheetId",
    ()=>extractSpreadsheetId,
    "formatOptionsToJsonObject",
    ()=>formatOptionsToJsonObject,
    "parseAnswerString",
    ()=>parseAnswerString,
    "parseAnswerTokens",
    ()=>parseAnswerTokens,
    "parseOptionJson",
    ()=>parseOptionJson,
    "parseSheetOptionJson",
    ()=>parseSheetOptionJson
]);
function parseOptionJson(optionRaw) {
    try {
        const parsed = JSON.parse(optionRaw);
        if (Array.isArray(parsed)) {
            return parsed;
        }
        if (parsed && typeof parsed === 'object') {
            return Object.entries(parsed).map(([id, text])=>({
                    id,
                    text: String(text)
                }));
        }
        return [];
    } catch  {
        return [];
    }
}
function parseAnswerString(answerRaw) {
    return answerRaw.split(',').map((item)=>item.trim()).filter(Boolean);
}
function formatOptionsToJsonObject(options) {
    if (!options) return '{}';
    if (!Array.isArray(options)) {
        return typeof options === 'object' ? JSON.stringify(options) : String(options);
    }
    const obj = {};
    const letters = [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H'
    ];
    options.forEach((opt, idx)=>{
        const cleanOpt = opt.replace(/^[A-H][.:\s]\s*/, '').trim();
        const key = letters[idx] || `OPT_${idx + 1}`;
        obj[key] = cleanOpt || opt;
    });
    return JSON.stringify(obj);
}
function parseSheetOptionJson(rawOptions) {
    let parsedOptions = [];
    let parsedOptionsMap = undefined;
    if (rawOptions) {
        try {
            const parsed = JSON.parse(String(rawOptions));
            if (Array.isArray(parsed)) {
                parsedOptions = parsed.map(String);
            } else if (typeof parsed === 'object' && parsed !== null) {
                parsedOptionsMap = parsed;
                parsedOptions = Object.entries(parsed).map(([k, v])=>`${k}. ${v}`);
            }
        } catch  {
            if (typeof rawOptions === 'string') {
                parsedOptions = rawOptions.split(/\n|;;/).map((s)=>s.trim()).filter(Boolean);
            }
        }
    }
    return {
        options: parsedOptions,
        optionsMap: parsedOptionsMap
    };
}
function parseAnswerTokens(rawAnswer) {
    if (!rawAnswer) return [];
    return rawAnswer.split(/[,，、\s]+/).map((s)=>s.trim().toUpperCase()).filter(Boolean);
}
function extractSpreadsheetId(input) {
    if (!input) return null;
    const trimmed = input.trim();
    if (/^[a-zA-Z0-9-_]{20,70}$/.test(trimmed)) {
        return trimmed;
    }
    const match = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    if (match && match[1]) {
        return match[1];
    }
    return null;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1oof3i1t4y9jb._.js.map