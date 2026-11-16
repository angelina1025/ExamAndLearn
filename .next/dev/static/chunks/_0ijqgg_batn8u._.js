(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
(()=>{"use strict";return[
"[project]/src/app/providers.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Providers",
    ()=>Providers,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$ExamSessionContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/ExamSessionContext.tsx [app-client] (ecmascript)");
'use client';
;
;
;
function Providers({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$ExamSessionContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ExamSessionProvider"], {
            children: children
        }, void 0, false, {
            fileName: "[project]/src/app/providers.tsx",
            lineNumber: 10,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/providers.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_c = Providers;
const __TURBOPACK__default__export__ = Providers;
var _c;
__turbopack_context__.k.register(_c, "Providers");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/contexts/AuthContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$googleAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/googleAuth.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const AuthProvider = ({ children })=>{
    _s();
    const [firebaseUser, setFirebaseUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [accessToken, setAccessToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [userProfile, setUserProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "AuthProvider.useState": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            try {
                const saved = sessionStorage.getItem('exam_logged_in_user');
                if (saved) return JSON.parse(saved);
            } catch  {}
            return null;
        }
    }["AuthProvider.useState"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            const unsubscribe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$googleAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initAuth"])({
                "AuthProvider.useEffect.unsubscribe": (user, token)=>{
                    setFirebaseUser(user);
                    setAccessToken(token);
                }
            }["AuthProvider.useEffect.unsubscribe"], {
                "AuthProvider.useEffect.unsubscribe": ()=>{
                    setFirebaseUser(null);
                    setAccessToken(null);
                }
            }["AuthProvider.useEffect.unsubscribe"]);
            return ({
                "AuthProvider.useEffect": ()=>{
                    if (unsubscribe) unsubscribe();
                }
            })["AuthProvider.useEffect"];
        }
    }["AuthProvider.useEffect"], []);
    const signIn = async ()=>{
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$googleAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["googleSignIn"])();
        if (res) {
            setFirebaseUser(res.user);
            setAccessToken(res.accessToken);
        }
    };
    const signOut = async ()=>{
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$googleAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logoutGoogle"])();
        setFirebaseUser(null);
        setAccessToken(null);
    };
    const updatePersonalSheetUrl = (url)=>{
        setUserProfile((prev)=>prev ? {
                ...prev,
                google_sheet_URL: url
            } : null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            firebaseUser,
            accessToken,
            userProfile,
            user: userProfile,
            setUser: setUserProfile,
            signIn,
            signOut,
            updatePersonalSheetUrl
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/AuthContext.tsx",
        lineNumber: 69,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(AuthProvider, "VdskKtBWn4PZxIxHIn0rDUoqBZU=");
_c = AuthProvider;
const useAuth = ()=>{
    _s1();
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (!ctx) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return ctx;
};
_s1(useAuth, "/dMy7t63NXD4eYACoT93CePwGrg=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/contexts/ExamSessionContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ExamSessionProvider",
    ()=>ExamSessionProvider,
    "useExamSession",
    ()=>useExamSession
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$examReducer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/examReducer.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$examStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/examStorage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useCountdown$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useCountdown.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const ExamSessionProvider = ({ children })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/ExamSessionContext.tsx",
        lineNumber: 10,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
_c = ExamSessionProvider;
function useExamSession(exam) {
    _s();
    // 初始狀態刻意不含「現在時間」：Next.js 的 Cache Components 會在 prerender 期間
    // 阻擋 Client Component 讀取 Date.now()。真正的 deadline 於掛載後的 effect 計算。
    const [state, dispatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducer"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$examReducer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["examReducer"], undefined, {
        "useExamSession.useReducer": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$examReducer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createInitialState"])(exam.id, exam.durationSec, null)
    }["useExamSession.useReducer"]);
    const [ready, setReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [storageWarning, setStorageWarning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const stateRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(state);
    const readyRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const previousRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const hydratedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const storageFailedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "useExamSession.useLayoutEffect": ()=>{
            stateRef.current = state;
        }
    }["useExamSession.useLayoutEffect"], [
        state
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useExamSession.useEffect": ()=>{
            readyRef.current = ready;
        }
    }["useExamSession.useEffect"], [
        ready
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useExamSession.useEffect": ()=>{
            if (hydratedRef.current) return;
            hydratedRef.current = true;
            const now = Date.now();
            const saved = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$examStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadSession"])(exam, now);
            if (saved) {
                dispatch({
                    type: 'HYDRATE',
                    state: saved
                });
            } else {
                dispatch({
                    type: 'RESET',
                    durationSec: exam.durationSec,
                    deadline: now + exam.durationSec * 1000
                });
            }
            setStorageWarning(!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$examStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isStorageAvailable"])());
            setReady(true);
        }
    }["useExamSession.useEffect"], [
        exam
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useExamSession.useEffect": ()=>{
            if (!ready) return;
            const previous = previousRef.current;
            const onlyTimerChanged = previous !== null && previous.remainingSec !== state.remainingSec && previous.answers === state.answers && previous.flags === state.flags && previous.currentIndex === state.currentIndex && previous.status === state.status && previous.deadline === state.deadline;
            if (onlyTimerChanged && state.remainingSec % 5 !== 0 && state.remainingSec !== 0) return;
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$examStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveSession"])(state) && !storageFailedRef.current) {
                storageFailedRef.current = true;
                setStorageWarning(true);
            }
            previousRef.current = state;
        }
    }["useExamSession.useEffect"], [
        ready,
        state
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useExamSession.useEffect": ()=>{
            if (!ready || state.status !== 'running' || state.deadline === null) return;
            const deadline = state.deadline;
            const tick = {
                "useExamSession.useEffect.tick": ()=>{
                    dispatch({
                        type: 'TICK',
                        remainingSec: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useCountdown$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["remainingFromDeadline"])(deadline)
                    });
                }
            }["useExamSession.useEffect.tick"];
            tick();
            const timer = window.setInterval(tick, 250);
            return ({
                "useExamSession.useEffect": ()=>window.clearInterval(timer)
            })["useExamSession.useEffect"];
        }
    }["useExamSession.useEffect"], [
        ready,
        state.deadline,
        state.status
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useExamSession.useEffect": ()=>{
            const handler = {
                "useExamSession.useEffect.handler": ()=>{
                    if (!readyRef.current) return;
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$examStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveSession"])(stateRef.current);
                }
            }["useExamSession.useEffect.handler"];
            window.addEventListener('pagehide', handler);
            return ({
                "useExamSession.useEffect": ()=>window.removeEventListener('pagehide', handler)
            })["useExamSession.useEffect"];
        }
    }["useExamSession.useEffect"], []);
    const actions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useExamSession.useMemo[actions]": ()=>({
                answer (questionId, answer) {
                    dispatch({
                        type: 'ANSWER',
                        questionId,
                        answer
                    });
                },
                toggleFlag (questionId) {
                    dispatch({
                        type: 'TOGGLE_FLAG',
                        questionId
                    });
                },
                goTo (index) {
                    dispatch({
                        type: 'GOTO',
                        index,
                        total: exam.questions.length
                    });
                },
                pause () {
                    const current = stateRef.current;
                    if (current.status !== 'running') return;
                    const remainingSec = current.deadline ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useCountdown$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["remainingFromDeadline"])(current.deadline) : current.remainingSec;
                    dispatch({
                        type: 'PAUSE',
                        remainingSec
                    });
                },
                resume () {
                    dispatch({
                        type: 'RESUME',
                        deadline: Date.now() + stateRef.current.remainingSec * 1000
                    });
                },
                reset () {
                    dispatch({
                        type: 'RESET',
                        durationSec: exam.durationSec,
                        deadline: Date.now() + exam.durationSec * 1000
                    });
                },
                submit () {
                    dispatch({
                        type: 'SUBMIT'
                    });
                }
            })
    }["useExamSession.useMemo[actions]"], [
        exam.durationSec,
        exam.questions.length
    ]);
    return {
        state,
        ready,
        storageWarning,
        ...actions
    };
}
_s(useExamSession, "ZIRebr4n5QyIbxzIED0MzGs2PYI=");
var _c;
__turbopack_context__.k.register(_c, "ExamSessionProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/contexts/examReducer.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createInitialState",
    ()=>createInitialState,
    "examReducer",
    ()=>examReducer
]);
function createInitialState(examId, durationSec, deadline) {
    return {
        examId,
        answers: {},
        flags: [],
        currentIndex: 0,
        remainingSec: durationSec,
        status: "running",
        deadline
    };
}
function examReducer(state, action) {
    switch(action.type){
        case "ANSWER":
            if (state.status !== "running") return state;
            return {
                ...state,
                answers: {
                    ...state.answers,
                    [action.questionId]: action.answer
                }
            };
        case "TOGGLE_FLAG":
            {
                if (state.status !== "running") return state;
                const flagged = state.flags.includes(action.questionId);
                return {
                    ...state,
                    flags: flagged ? state.flags.filter((id)=>id !== action.questionId) : [
                        ...state.flags,
                        action.questionId
                    ]
                };
            }
        case "GOTO":
            {
                if (state.status === "submitted") return state;
                const max = Math.max(action.total - 1, 0);
                const index = Math.min(Math.max(action.index, 0), max);
                if (index === state.currentIndex) return state;
                return {
                    ...state,
                    currentIndex: index
                };
            }
        case "TICK":
            {
                if (state.status !== "running") return state;
                const remainingSec = Math.max(0, action.remainingSec);
                if (remainingSec === 0) {
                    return {
                        ...state,
                        remainingSec: 0,
                        status: "submitted",
                        deadline: null
                    };
                }
                if (remainingSec === state.remainingSec) return state;
                return {
                    ...state,
                    remainingSec
                };
            }
        case "PAUSE":
            {
                if (state.status !== "running") return state;
                const remainingSec = Math.max(0, action.remainingSec);
                if (remainingSec === 0) {
                    return {
                        ...state,
                        remainingSec: 0,
                        status: "submitted",
                        deadline: null
                    };
                }
                return {
                    ...state,
                    status: "paused",
                    remainingSec,
                    deadline: null
                };
            }
        case "RESUME":
            if (state.status !== "paused") return state;
            return {
                ...state,
                status: "running",
                deadline: action.deadline
            };
        case "RESET":
            return createInitialState(state.examId, action.durationSec, action.deadline);
        case "SUBMIT":
            if (state.status === "submitted") return state;
            return {
                ...state,
                status: "submitted",
                deadline: null
            };
        case "HYDRATE":
            return action.state;
        default:
            return state;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/contexts/examStorage.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearSession",
    ()=>clearSession,
    "isStorageAvailable",
    ()=>isStorageAvailable,
    "loadSession",
    ()=>loadSession,
    "saveSession",
    ()=>saveSession,
    "storageKey",
    ()=>storageKey
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useCountdown$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useCountdown.ts [app-client] (ecmascript)");
;
const PREFIX = "exam-session:v1:";
function storageKey(examId) {
    return `${PREFIX}${examId}`;
}
function isStorageAvailable() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const key = "__exam_storage_test__";
        window.localStorage.setItem(key, "1");
        window.localStorage.removeItem(key);
        return true;
    } catch  {
        return false;
    }
}
function isValidSession(value, exam) {
    if (!value || typeof value !== "object") return false;
    const session = value;
    if (session.examId !== exam.id) return false;
    if (![
        "running",
        "paused",
        "submitted"
    ].includes(session.status)) return false;
    if (typeof session.remainingSec !== "number" || session.remainingSec < 0) return false;
    if (typeof session.currentIndex !== "number" || session.currentIndex < 0 || session.currentIndex >= exam.questions.length) {
        return false;
    }
    if (!Array.isArray(session.flags) || !session.flags.every((f)=>typeof f === "string")) {
        return false;
    }
    if (!session.answers || typeof session.answers !== "object" || Array.isArray(session.answers)) {
        return false;
    }
    if (session.status === "running" && typeof session.deadline !== "number") return false;
    return true;
}
function loadSession(exam, now = Date.now()) {
    if (!isStorageAvailable()) return null;
    try {
        const raw = window.localStorage.getItem(storageKey(exam.id));
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!isValidSession(parsed, exam)) {
            window.localStorage.removeItem(storageKey(exam.id));
            return null;
        }
        if (parsed.status === "running" && parsed.deadline !== null) {
            const remainingSec = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useCountdown$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["remainingFromDeadline"])(parsed.deadline, now);
            if (remainingSec === 0) {
                return {
                    ...parsed,
                    remainingSec: 0,
                    status: "submitted",
                    deadline: null
                };
            }
            return {
                ...parsed,
                remainingSec
            };
        }
        return parsed;
    } catch  {
        try {
            window.localStorage.removeItem(storageKey(exam.id));
        } catch  {
        // localStorage 不可用時忽略
        }
        return null;
    }
}
function saveSession(state) {
    if (!isStorageAvailable()) return false;
    try {
        window.localStorage.setItem(storageKey(state.examId), JSON.stringify(state));
        return true;
    } catch  {
        return false;
    }
}
function clearSession(examId) {
    if (!isStorageAvailable()) return;
    try {
        window.localStorage.removeItem(storageKey(examId));
    } catch  {
    // 忽略
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useCountdown.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "remainingFromDeadline",
    ()=>remainingFromDeadline,
    "useCountdown",
    ()=>useCountdown
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
function remainingFromDeadline(deadline, now = Date.now()) {
    return Math.max(0, Math.ceil((deadline - now) / 1000));
}
function useCountdown(enabled, deadline, onTick) {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useCountdown.useEffect": ()=>{
            if (!enabled || deadline === null) return;
            const tick = {
                "useCountdown.useEffect.tick": ()=>{
                    onTick(remainingFromDeadline(deadline));
                }
            }["useCountdown.useEffect.tick"];
            tick();
            const timer = window.setInterval(tick, 250);
            return ({
                "useCountdown.useEffect": ()=>window.clearInterval(timer)
            })["useCountdown.useEffect"];
        }
    }["useCountdown.useEffect"], [
        enabled,
        deadline,
        onTick
    ]);
}
_s(useCountdown, "OD7bBpZva5O2jO+Puf00hKivP7c=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/googleAuth.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "auth",
    ()=>auth,
    "getAccessToken",
    ()=>getAccessToken,
    "getCurrentUser",
    ()=>getCurrentUser,
    "googleProvider",
    ()=>googleProvider,
    "googleSignIn",
    ()=>googleSignIn,
    "initAuth",
    ()=>initAuth,
    "logoutGoogle",
    ()=>logoutGoogle,
    "setCachedAccessToken",
    ()=>setCachedAccessToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/app/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/app/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/auth/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2d$Bz2J43nW$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__getAuth$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/auth/dist/esm/index-Bz2J43nW.js [app-client] (ecmascript) <export D as getAuth>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2d$Bz2J43nW$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__ai__as__signInWithPopup$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/auth/dist/esm/index-Bz2J43nW.js [app-client] (ecmascript) <export ai as signInWithPopup>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2d$Bz2J43nW$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__f__as__GoogleAuthProvider$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/auth/dist/esm/index-Bz2J43nW.js [app-client] (ecmascript) <export f as GoogleAuthProvider>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2d$Bz2J43nW$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$__as__onAuthStateChanged$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/auth/dist/esm/index-Bz2J43nW.js [app-client] (ecmascript) <export _ as onAuthStateChanged>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2d$Bz2J43nW$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__ak__as__signOut$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/auth/dist/esm/index-Bz2J43nW.js [app-client] (ecmascript) <export ak as signOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$firebase$2d$applet$2d$config$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/firebase-applet-config.json.[json].cjs [app-client] (ecmascript)");
;
;
;
// Initialize Firebase App instance
const app = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getApps"])().length === 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["initializeApp"])(__TURBOPACK__imported__module__$5b$project$5d2f$firebase$2d$applet$2d$config$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getApps"])()[0];
const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2d$Bz2J43nW$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__getAuth$3e$__["getAuth"])(app);
const googleProvider = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2d$Bz2J43nW$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__f__as__GoogleAuthProvider$3e$__["GoogleAuthProvider"]();
googleProvider.addScope('https://www.googleapis.com/auth/spreadsheets');
googleProvider.addScope('https://www.googleapis.com/auth/drive.file');
// In-memory token storage (DO NOT store in localStorage or sessionStorage per security guidelines)
let cachedAccessToken = null;
let isSigningIn = false;
const initAuth = (onAuthSuccess, onAuthFailure)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2d$Bz2J43nW$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$__as__onAuthStateChanged$3e$__["onAuthStateChanged"])(auth, async (user)=>{
        if (user) {
            if (onAuthSuccess) {
                onAuthSuccess(user, cachedAccessToken);
            }
        } else {
            cachedAccessToken = null;
            if (onAuthFailure) {
                onAuthFailure();
            }
        }
    });
};
const googleSignIn = async ()=>{
    try {
        isSigningIn = true;
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2d$Bz2J43nW$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__ai__as__signInWithPopup$3e$__["signInWithPopup"])(auth, googleProvider);
        const credential = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2d$Bz2J43nW$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__f__as__GoogleAuthProvider$3e$__["GoogleAuthProvider"].credentialFromResult(result);
        if (!credential?.accessToken) {
            throw new Error('無法從 Firebase Auth 取得 Google Access Token');
        }
        cachedAccessToken = credential.accessToken;
        return {
            user: result.user,
            accessToken: cachedAccessToken
        };
    } catch (error) {
        console.error('Google Sign-in failed:', error);
        throw error;
    } finally{
        isSigningIn = false;
    }
};
const getAccessToken = async ()=>{
    return cachedAccessToken;
};
const setCachedAccessToken = (token)=>{
    cachedAccessToken = token;
};
const getCurrentUser = ()=>{
    return auth.currentUser;
};
const logoutGoogle = async ()=>{
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2d$Bz2J43nW$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__ak__as__signOut$3e$__["signOut"])(auth);
    cachedAccessToken = null;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]})(),
"[project]/firebase-applet-config.json.[json].cjs [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = {
    "projectId": "gen-lang-client-0083784992",
    "appId": "1:845444843978:web:f9faa3da612c2954fca733",
    "apiKey": "AIzaSyC9mShR3gG4B-qHutqlZUyl-u78l2D7kNk",
    "authDomain": "gen-lang-client-0083784992.firebaseapp.com",
    "storageBucket": "gen-lang-client-0083784992.firebasestorage.app",
    "messagingSenderId": "845444843978",
    "measurementId": "",
    "oAuthClientId": "845444843978-5ofl7kvr13m4o62crbgv45d04qbk895v.apps.googleusercontent.com",
    "recaptchaSiteKey": ""
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_0ijqgg_batn8u._.js.map