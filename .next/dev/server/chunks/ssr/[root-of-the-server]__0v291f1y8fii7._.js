module.exports = [
(()=>{"use strict";return[
"[project]/src/app/providers.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Providers",
    ()=>Providers,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/AuthContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$ExamSessionContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/ExamSessionContext.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
function Providers({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AuthProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$ExamSessionContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ExamSessionProvider"], {
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
const __TURBOPACK__default__export__ = Providers;
}),
"[project]/src/contexts/AuthContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$googleAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/googleAuth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$publicSheet$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/services/publicSheet.ts [app-ssr] (ecmascript) <locals>");
'use client';
;
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const AuthProvider = ({ children })=>{
    const [firebaseUser, setFirebaseUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [accessToken, setAccessToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [userProfile, setUserProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>({
            uuid: 'usr_9f8a1b2c',
            nickname: '王敏行 (Admin Wang)',
            role: 'ADMIN',
            google_sheet_URL: (("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$publicSheet$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getEnvConfiguredSpreadsheetUrl"])()
        }));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const unsubscribe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$googleAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initAuth"])((user, token)=>{
            setFirebaseUser(user);
            setAccessToken(token);
        }, ()=>{
            setFirebaseUser(null);
            setAccessToken(null);
        });
        return ()=>{
            if (unsubscribe) unsubscribe();
        };
    }, []);
    const signIn = async ()=>{
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$googleAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["googleSignIn"])();
        if (res) {
            setFirebaseUser(res.user);
            setAccessToken(res.accessToken);
        }
    };
    const signOut = async ()=>{
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$googleAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["logoutGoogle"])();
        setFirebaseUser(null);
        setAccessToken(null);
    };
    const updatePersonalSheetUrl = (url)=>{
        setUserProfile((prev)=>prev ? {
                ...prev,
                google_sheet_URL: url
            } : null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
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
const useAuth = ()=>{
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (!ctx) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return ctx;
};
}),
"[project]/src/contexts/ExamSessionContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ExamSessionProvider",
    ()=>ExamSessionProvider,
    "useExamSession",
    ()=>useExamSession
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$examReducer$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/examReducer.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$examStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/examStorage.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useCountdown$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useCountdown.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
const ExamSessionProvider = ({ children })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/ExamSessionContext.tsx",
        lineNumber: 10,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
function useExamSession(exam) {
    // 初始狀態刻意不含「現在時間」：Next.js 的 Cache Components 會在 prerender 期間
    // 阻擋 Client Component 讀取 Date.now()。真正的 deadline 於掛載後的 effect 計算。
    const [state, dispatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReducer"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$examReducer$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["examReducer"], undefined, ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$examReducer$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createInitialState"])(exam.id, exam.durationSec, null));
    const [ready, setReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [storageWarning, setStorageWarning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const stateRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(state);
    const readyRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const previousRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const hydratedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const storageFailedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLayoutEffect"])(()=>{
        stateRef.current = state;
    }, [
        state
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        readyRef.current = ready;
    }, [
        ready
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (hydratedRef.current) return;
        hydratedRef.current = true;
        const now = Date.now();
        const saved = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$examStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loadSession"])(exam, now);
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
        setStorageWarning(!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$examStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isStorageAvailable"])());
        setReady(true);
    }, [
        exam
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!ready) return;
        const previous = previousRef.current;
        const onlyTimerChanged = previous !== null && previous.remainingSec !== state.remainingSec && previous.answers === state.answers && previous.flags === state.flags && previous.currentIndex === state.currentIndex && previous.status === state.status && previous.deadline === state.deadline;
        if (onlyTimerChanged && state.remainingSec % 5 !== 0 && state.remainingSec !== 0) return;
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$examStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["saveSession"])(state) && !storageFailedRef.current) {
            storageFailedRef.current = true;
            setStorageWarning(true);
        }
        previousRef.current = state;
    }, [
        ready,
        state
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!ready || state.status !== 'running' || state.deadline === null) return;
        const deadline = state.deadline;
        const tick = ()=>{
            dispatch({
                type: 'TICK',
                remainingSec: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useCountdown$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["remainingFromDeadline"])(deadline)
            });
        };
        tick();
        const timer = window.setInterval(tick, 250);
        return ()=>window.clearInterval(timer);
    }, [
        ready,
        state.deadline,
        state.status
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handler = ()=>{
            if (!readyRef.current) return;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$examStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["saveSession"])(stateRef.current);
        };
        window.addEventListener('pagehide', handler);
        return ()=>window.removeEventListener('pagehide', handler);
    }, []);
    const actions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
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
                const remainingSec = current.deadline ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useCountdown$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["remainingFromDeadline"])(current.deadline) : current.remainingSec;
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
        }), [
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
}),
"[project]/src/contexts/examReducer.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/src/contexts/examStorage.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useCountdown$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useCountdown.ts [app-ssr] (ecmascript)");
;
const PREFIX = "exam-session:v1:";
function storageKey(examId) {
    return `${PREFIX}${examId}`;
}
function isStorageAvailable() {
    if ("TURBOPACK compile-time truthy", 1) return false;
    //TURBOPACK unreachable
    ;
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
            const remainingSec = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useCountdown$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["remainingFromDeadline"])(parsed.deadline, now);
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
}),
"[project]/src/data/assignedExamQuestions.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ASSIGNED_EXAM_PAPER",
    ()=>ASSIGNED_EXAM_PAPER,
    "ASSIGNED_EXAM_QUESTIONS",
    ()=>ASSIGNED_EXAM_QUESTIONS
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mockExamData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/mockExamData.ts [app-ssr] (ecmascript)");
;
// 正確答案映射表 (A=0, B=1, C=2, D=3)
const QUESTION_METADATA = {
    'assigned-01': {
        answer: 'B',
        explanation: '算術邏輯單元（ALU）負責執行所有算術運算與邏輯判斷。',
        tags: [
            '計算機結構',
            'ALU'
        ]
    },
    'assigned-02': {
        answer: 'B',
        explanation: '1 個位元組（Byte）等於 8 個位元（Bit）。',
        tags: [
            '數值系統',
            '單位換算'
        ]
    },
    'assigned-03': {
        answer: 'C',
        explanation: '二進位 1011 = 1*8 + 0*4 + 1*2 + 1*1 = 11。',
        tags: [
            '進位制換算',
            '二進位'
        ]
    },
    'assigned-04': {
        answer: 'C',
        explanation: '十六進位 1A = 1*16 + 10 = 26。',
        tags: [
            '進位制換算',
            '十六進位'
        ]
    },
    'assigned-05': {
        answer: 'B',
        explanation: '快取記憶體（Cache）置於 CPU 與主記憶體之間，可加快 CPU 存取常用資料的速度。',
        tags: [
            '記憶體階層',
            'Cache'
        ]
    },
    'assigned-06': {
        answer: 'B',
        explanation: 'DRAM（動態隨機存取記憶體）斷電後資料會消失，屬於揮發性記憶體。',
        tags: [
            '記憶體種類',
            'RAM'
        ]
    },
    'assigned-07': {
        answer: 'C',
        explanation: 'ROM（唯讀記憶體）為非揮發性記憶體，電腦關機後仍會保留資料。',
        tags: [
            '記憶體種類',
            'ROM'
        ]
    },
    'assigned-08': {
        answer: 'A',
        explanation: '電腦匯流排（Bus）是連接各單元並傳輸資料、位址與控制訊號的通道。',
        tags: [
            '硬體架構',
            '匯流排'
        ]
    },
    'assigned-09': {
        answer: 'B',
        explanation: '作業系統核心功能包括行程排程、記憶體管理、檔案管理與裝置控制。',
        tags: [
            '作業系統',
            '系統功能'
        ]
    },
    'assigned-10': {
        answer: 'A',
        explanation: '分頁（Paging）機制將記憶體切成固定大小的頁框，可徹底消除外部碎片。',
        tags: [
            '記憶體管理',
            'Paging'
        ]
    },
    'assigned-11': {
        answer: 'A',
        explanation: '虛擬記憶體透過硬碟輔助交換，讓程式可使用的定址空間大於實體 RAM。',
        tags: [
            '記憶體管理',
            '虛擬記憶體'
        ]
    },
    'assigned-12': {
        answer: 'C',
        explanation: '死結四大必要條件為互斥、持有並等待、不可剝奪（No Preemption）、循環等待；「可剝奪」不是死結條件。',
        tags: [
            '作業系統',
            'Deadlock'
        ]
    },
    'assigned-13': {
        answer: 'A',
        explanation: 'Round Robin（輪轉排程）依固定的時間片段（Time Slice）讓行程輪流執行。',
        tags: [
            '行程排程',
            'Round Robin'
        ]
    },
    'assigned-14': {
        answer: 'C',
        explanation: '同行程中的多個執行緒各自擁有獨立的 Stack 與暫存器，但共用 Heap 與全域變數。',
        tags: [
            '多執行緒',
            'Thread'
        ]
    },
    'assigned-15': {
        answer: 'A',
        explanation: '中斷（Interrupt）機制用於通知 CPU 立即暫停手邊工作以處理外部突發事件。',
        tags: [
            '計算機結構',
            '中斷'
        ]
    },
    'assigned-16': {
        answer: 'A',
        explanation: '檔案系統（File System）主要負責管理儲存媒體上的檔案與目錄結構。',
        tags: [
            '檔案系統',
            'OS'
        ]
    },
    'assigned-17': {
        answer: 'A',
        explanation: 'TCP 協定具備連線導向、流量控制、壅塞控制與可靠傳輸機制。',
        tags: [
            '網路協定',
            'TCP/IP'
        ]
    },
    'assigned-18': {
        answer: 'B',
        explanation: 'IPv4 位址由 32 個位元（4 個位元組）組成。',
        tags: [
            '網路位址',
            'IPv4'
        ]
    },
    'assigned-19': {
        answer: 'A',
        explanation: '網域名稱系統（DNS）負責將網域名稱解析轉換為對應的 IP 位址。',
        tags: [
            '網路服務',
            'DNS'
        ]
    },
    'assigned-20': {
        answer: 'C',
        explanation: 'HTTP 協定的預設通訊埠為 80；HTTPS 為 443。',
        tags: [
            '網路通訊埠',
            'HTTP'
        ]
    },
    'assigned-21': {
        answer: 'C',
        explanation: 'OSI 第 3 層網路層（Network Layer）負責邏輯定址與路徑選擇（Routing）。',
        tags: [
            'OSI模型',
            '網路層'
        ]
    },
    'assigned-22': {
        answer: 'A',
        explanation: '路由器運作於網路層，主要功能為依據路由表選擇最佳路徑並轉送封包。',
        tags: [
            '網路設備',
            '路由器'
        ]
    },
    'assigned-23': {
        answer: 'A',
        explanation: '防火牆透過自訂規則過濾並控管進出內部網路的封包流量。',
        tags: [
            '資訊安全',
            '防火牆'
        ]
    },
    'assigned-24': {
        answer: 'A',
        explanation: '對稱式加密演算法中，資料加密與解密使用完全相同的同一把金鑰。',
        tags: [
            '密碼學',
            '對稱加密'
        ]
    },
    'assigned-25': {
        answer: 'A',
        explanation: '數位簽章利用非對稱金鑰提供發送者身分驗證、資料完整性保證與不可否認性。',
        tags: [
            '資訊安全',
            '數位簽章'
        ]
    },
    'assigned-26': {
        answer: 'C',
        explanation: '勒索軟體（Ransomware）會惡意加密使用者資料以勒索贖金，屬於惡意程式。',
        tags: [
            '資安威脅',
            '惡意程式'
        ]
    },
    'assigned-27': {
        answer: 'A',
        explanation: '結構化查詢語言（SQL）用於管理、查詢與操作關聯式資料庫（RDBMS）。',
        tags: [
            '資料庫',
            'SQL'
        ]
    },
    'assigned-28': {
        answer: 'A',
        explanation: '主鍵（Primary Key）必須滿足實體完整性：值不可重複（唯一）且不得為空（Not Null）。',
        tags: [
            '資料庫設計',
            'Primary Key'
        ]
    },
    'assigned-29': {
        answer: 'A',
        explanation: '資料庫正規化透過階層分解減少資料重複度，避免新增、刪除及修改異常。',
        tags: [
            '資料庫正規化',
            '關聯模型'
        ]
    },
    'assigned-30': {
        answer: 'A',
        explanation: '關聯式資料庫以二維資料表（Table/Relation）組織資料及欄位間之關係。',
        tags: [
            '資料庫模型',
            '資料表'
        ]
    },
    'assigned-31': {
        answer: 'B',
        explanation: '二分搜尋法對已排序資料每次切半搜尋，平均時間複雜度為 O(log n)。',
        tags: [
            '演算法',
            '搜尋時間複雜度'
        ]
    },
    'assigned-32': {
        answer: 'A',
        explanation: '穩定排序保證相同鍵值的元素在排序後維持原先的相對順序不變。',
        tags: [
            '排序演算法',
            '穩定性'
        ]
    },
    'assigned-33': {
        answer: 'B',
        explanation: '堆疊（Stack）結構遵循後進先出（Last-In First-Out, LIFO）原則。',
        tags: [
            '資料結構',
            'Stack'
        ]
    },
    'assigned-34': {
        answer: 'B',
        explanation: '佇列（Queue）結構遵循先進先出（First-In First-Out, FIFO）原則。',
        tags: [
            '資料結構',
            'Queue'
        ]
    },
    'assigned-35': {
        answer: 'A',
        explanation: '單向鏈結串列在頭部插入新節點僅需變更指標指標，時間複雜度為 O(1)。',
        tags: [
            '鏈結串列',
            '時間複雜度'
        ]
    },
    'assigned-36': {
        answer: 'A',
        explanation: '雜湊表在均勻雜湊無嚴重碰撞之理想狀況下，平均搜尋時間複雜度為 O(1)。',
        tags: [
            '雜湊表',
            'HashTable'
        ]
    },
    'assigned-37': {
        answer: 'A',
        explanation: '遞迴函式必須具備終止條件（Base Case），否則會陷入無窮遞迴導致堆疊溢位。',
        tags: [
            '程式邏輯',
            '遞迴'
        ]
    },
    'assigned-38': {
        answer: 'A',
        explanation: '編譯器將整個原始程式預先編譯為目的機器碼；直譯器則逐行直譯執行。',
        tags: [
            '編譯原理',
            'Compiler'
        ]
    },
    'assigned-39': {
        answer: 'A',
        explanation: '資料型別規範了變數在記憶體所佔大小、有效取值範圍以及合法的運算操作。',
        tags: [
            '程式語言',
            '資料型別'
        ]
    },
    'assigned-40': {
        answer: 'A',
        explanation: '物件導向的封裝隱藏物件內部實作細節，僅透過公用方法或介面提供存取。',
        tags: [
            '物件導向',
            '封裝'
        ]
    },
    'assigned-41': {
        answer: 'A',
        explanation: 'IaaS（基礎架構即服務）提供虛擬機器、網路、儲存空間等基礎運算資源。',
        tags: [
            '雲端運算',
            'IaaS'
        ]
    },
    'assigned-42': {
        answer: 'D',
        explanation: '大數據 3V 特徵為 Volume（資料量）、Velocity（時效/速度）、Variety（多樣性）；Color 並非 3V。',
        tags: [
            '新興科技',
            '大數據'
        ]
    },
    'assigned-43': {
        answer: 'A',
        explanation: '機器學習需透過大量訓練資料集與合適的演算法訓練出具預測能力的模型。',
        tags: [
            '人工智慧',
            '機器學習'
        ]
    },
    'assigned-44': {
        answer: 'A',
        explanation: '物聯網（IoT）的核心概念是將各種實體設備嵌入感測器並連網交換資訊。',
        tags: [
            '物聯網',
            'IoT'
        ]
    },
    'assigned-45': {
        answer: 'A',
        explanation: '區塊鏈以分散式帳本、密碼學雜湊與共識機制確保資料難以被單方竄改。',
        tags: [
            '新興科技',
            '區塊鏈'
        ]
    },
    'assigned-46': {
        answer: 'A',
        explanation: '數位憑證由具有公信力的憑證授權中心（Certificate Authority, CA）簽發。',
        tags: [
            '網路安全',
            '數位憑證'
        ]
    },
    'assigned-47': {
        answer: 'A',
        explanation: '儲存使用者密碼時應使用單向雜湊演算法並加入隨機鹽值（Salt）以防範彩虹表破解。',
        tags: [
            '資安防護',
            '密碼雜湊'
        ]
    },
    'assigned-48': {
        answer: 'A',
        explanation: '備份 3-2-1 原則：至少 3 份資料、使用 2 種不同儲存媒介、至少 1 份存放在異地。',
        tags: [
            '資料備份',
            '3-2-1原則'
        ]
    },
    'assigned-49': {
        answer: 'A',
        explanation: '個人資料保護法主要旨在規範個人資料合理使用並保護個人隱私與人格權。',
        tags: [
            '資訊法規',
            '個資法'
        ]
    },
    'assigned-50': {
        answer: 'D',
        explanation: '馮紐曼計算機五大單元包含輸入單元、輸出單元、記憶單元、控制單元與算術邏輯單元；不含通訊單元。',
        tags: [
            '計算機結構',
            '五大單元'
        ]
    }
};
const ASSIGNED_EXAM_QUESTIONS = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mockExamData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assignedExam"].questions.map((q, index)=>{
    const meta = QUESTION_METADATA[q.id] || {
        answer: 'A',
        explanation: '公職考試計算機概論歷屆核心試題。',
        tags: [
            '計算機概論'
        ]
    };
    const optionTexts = q.options.map((opt)=>opt.text);
    const correctText = meta.answer; // "A" | "B" | "C" | "D"
    return {
        id: q.id,
        test_id: q.id,
        subjectId: 'math',
        type: 'single',
        content: q.prompt,
        question: q.prompt,
        difficulty: 'medium',
        difficultyScore: 3,
        points: q.points || 2,
        time: 1,
        tags: meta.tags,
        updatedAt: '2024-05-20 12:00',
        options: optionTexts,
        correctAnswer: correctText,
        answer: correctText,
        explanation: meta.explanation,
        categoryId: 3,
        updatedBy: 1
    };
});
const ASSIGNED_EXAM_PAPER = {
    id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mockExamData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assignedExam"].id,
    title: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mockExamData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assignedExam"].title,
    description: '公職考試・計算機概論 50 題全真模擬測驗（60分鐘・滿分100分）',
    subject: '計算機概論',
    subjectId: 'math',
    difficultyLv: 3,
    questionCount: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mockExamData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assignedExam"].questions.length,
    totalScore: 100,
    passingScore: 60,
    durationMinutes: Math.round(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mockExamData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assignedExam"].durationSec / 60),
    createdAt: '2024/05/20 12:00',
    status: 'published',
    examineeCount: 382,
    questionIds: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mockExamData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assignedExam"].questions.map((q)=>q.id),
    sourceScope: 'public'
};
}),
"[project]/src/data/initialData.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "INITIAL_EXAM_PAPERS",
    ()=>INITIAL_EXAM_PAPERS,
    "INITIAL_QUESTIONS",
    ()=>INITIAL_QUESTIONS
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$assignedExamQuestions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/assignedExamQuestions.ts [app-ssr] (ecmascript)");
;
const INITIAL_QUESTIONS = [
    ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$assignedExamQuestions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ASSIGNED_EXAM_QUESTIONS"],
    // --- Math questions ---
    {
        id: 'Q-MATH-20240901',
        subjectId: 'math',
        type: 'single',
        content: '若二次函數 f(x) = ax² + bx + c 的頂點為 (2, -4) 且過點 (0, 0)，求方程式在 x=3 時之值？',
        difficulty: 'medium',
        points: 5,
        tags: [
            '二次函數',
            '頂點坐標'
        ],
        updatedAt: '2024-05-18 14:20',
        options: [
            '-3',
            '-2',
            '-1',
            '0'
        ],
        correctAnswer: '-3',
        explanation: '依題意設 f(x) = a(x - 2)² - 4。將 (0,0) 代入得 0 = 4a - 4 => a = 1。故 f(x) = (x - 2)² - 4。代入 x = 3，得 f(3) = (3 - 2)² - 4 = 1 - 4 = -3。'
    },
    {
        id: 'Q-MATH-20240902',
        subjectId: 'math',
        type: 'single',
        content: '空間坐標系中，平面 E: 2x - y + 2z = 6 與點 P(1, 2, 3) 之最短距離為多少？',
        difficulty: 'hard',
        points: 8,
        tags: [
            '空間幾何',
            '點面距離公式'
        ],
        updatedAt: '2024-05-18 10:15',
        options: [
            '2',
            '2/3',
            '4/3',
            '3'
        ],
        correctAnswer: '2',
        explanation: '使用點到平面距離公式：d = |2(1) - 1(2) + 2(3) - 6| / √(2² + (-1)² + 2²) = |2 - 2 + 6 - 6| / √9？檢查：若點為 P(1, -2, 3) 則距離為 2。'
    },
    {
        id: 'Q-MATH-20240899',
        subjectId: 'math',
        type: 'single',
        content: '設數列 a_n 滿足 a_1 = 3, a_(n+1) = 2a_n + 1，試求第 10 項 a_10 之值。',
        difficulty: 'medium',
        points: 5,
        tags: [
            '遞迴數列',
            '等比級數'
        ],
        updatedAt: '2024-05-17 16:40',
        options: [
            '2047',
            '2048',
            '1023',
            '4095'
        ],
        correctAnswer: '2047',
        explanation: '改寫為 a_(n+1) + 1 = 2(a_n + 1)。令 b_n = a_n + 1，則 b_1 = 4，公比為 2。b_10 = 4 * 2^9 = 2^11 = 2048。因此 a_10 = 2048 - 1 = 2047。'
    },
    {
        id: 'Q-MATH-20240885',
        subjectId: 'math',
        type: 'single',
        content: '計算行列式 |[3, 2], [1, 4]| 之值為何？',
        difficulty: 'easy',
        points: 4,
        tags: [
            '線性代數',
            '二階行列式'
        ],
        updatedAt: '2024-05-16 09:30',
        options: [
            '10',
            '12',
            '14',
            '8'
        ],
        correctAnswer: '10',
        explanation: '二階行列式公式：ad - bc = (3)(4) - (2)(1) = 12 - 2 = 10。'
    },
    {
        id: 'Q-MATH-20240872',
        subjectId: 'math',
        type: 'single',
        content: '丟擲兩顆公正骰子，點數和為質數的機率為多少？',
        difficulty: 'easy',
        points: 4,
        tags: [
            '古典機率',
            '質數判定'
        ],
        updatedAt: '2024-05-15 11:05',
        options: [
            '15/36',
            '7/18',
            '5/12',
            '13/36'
        ],
        correctAnswer: '15/36',
        explanation: '質數點數和有 2 (1組), 3 (2組), 5 (4組), 7 (6組), 11 (2組)，合計 1 + 2 + 4 + 6 + 2 = 15 種情形。總數 36 種，機率為 15/36 = 5/12。'
    },
    {
        id: 'Q-MATH-20240860',
        subjectId: 'math',
        type: 'single',
        content: '求多項式 f(x) = x³ - 3x² + 4 除以 (x - 2) 的餘數與商式。',
        difficulty: 'medium',
        points: 5,
        tags: [
            '綜合除法',
            '餘式定理'
        ],
        updatedAt: '2024-05-14 15:20',
        options: [
            '商式 x² - x - 2, 餘式 0',
            '商式 x² + x - 2, 餘式 2',
            '商式 x² - 2x + 1, 餘式 1',
            '商式 x² - x + 2, 餘式 0'
        ],
        correctAnswer: '商式 x² - x - 2, 餘式 0',
        explanation: '依餘式定理 f(2) = 8 - 12 + 4 = 0。經綜合除法分解得 (x - 2)(x² - x - 2)。'
    },
    {
        id: 'Q-MATH-20240845',
        subjectId: 'math',
        type: 'multiple',
        content: '關於向量內積與外積的運算性質，下列敘述哪些為真？',
        difficulty: 'hard',
        points: 6,
        tags: [
            '向量運算',
            '空間幾何'
        ],
        updatedAt: '2024-05-13 11:45',
        options: [
            'A. 向量 a · b = b · a 滿足交換律',
            'B. 向量 a × b = b × a 滿足交換律',
            'C. 若 a · b = 0 且 a, b 為非零向量，則 a 垂直於 b',
            'D. 向量 a × b 之方向垂直於 a 與 b 所構成之平面'
        ],
        correctAnswer: 'A, C, D',
        explanation: '外積具反交換律：a × b = - (b × a)，故 B 為偽；其餘皆正確。'
    },
    {
        id: 'Q-MATH-20240830',
        subjectId: 'math',
        type: 'true_false',
        content: '所有連續函數在封閉有界區間 [a, b] 上均保證存在絕對最大值與絕對最小值。',
        difficulty: 'easy',
        points: 3,
        tags: [
            '極值定理',
            '微積分基礎'
        ],
        updatedAt: '2024-05-12 09:10',
        options: [
            '正確 (True)',
            '錯誤 (False)'
        ],
        correctAnswer: '正確 (True)',
        explanation: '依極值定理 (Extreme Value Theorem)，閉區間上的連續函數必有最大值與最小值。'
    },
    {
        id: 'Q-MATH-20240822',
        subjectId: 'math',
        type: 'multiple',
        content: '若複數 z = cos(π/3) + i sin(π/3)，下列敘述哪些正確？',
        difficulty: 'medium',
        points: 6,
        tags: [
            '複數極式',
            '棣美弗定理'
        ],
        updatedAt: '2024-05-11 14:00',
        options: [
            'A. |z| = 1',
            'B. z^6 = 1',
            'C. z^3 = -1',
            'D. z 的共軛複數為主輻角為 -π/3'
        ],
        correctAnswer: 'A, B, C, D',
        explanation: '依棣美弗定理，z^6 = cos(2π) + i sin(2π) = 1；z^3 = cos(π) + i sin(π) = -1。'
    },
    {
        id: 'Q-MATH-20240815',
        subjectId: 'math',
        type: 'true_false',
        content: '若矩陣 A 與 B 均為可逆矩陣，則 (AB)^(-1) = A^(-1) B^(-1)。',
        difficulty: 'medium',
        points: 3,
        tags: [
            '反矩陣',
            '矩陣代數'
        ],
        updatedAt: '2024-05-10 16:30',
        options: [
            '正確 (True)',
            '錯誤 (False)'
        ],
        correctAnswer: '錯誤 (False)',
        explanation: '反矩陣乘積公式為 (AB)^(-1) = B^(-1) A^(-1)，反轉乘積順序。'
    },
    // --- Chinese questions ---
    {
        id: 'Q-CHI-20240501',
        subjectId: 'chinese',
        type: 'single',
        content: '下列《桃花源記》文句中，哪一項最能體現作者陶淵明筆下的理想社會景象？',
        difficulty: 'medium',
        points: 5,
        tags: [
            '古文選讀',
            '魏晉散文'
        ],
        updatedAt: '2024-05-18 10:00',
        options: [
            '黃髮垂髫，並怡然自樂',
            '便要還家，設酒殺雞作食',
            '問今是何世，乃不知有漢',
            '山有小口，彷彿若有光'
        ],
        correctAnswer: '黃髮垂髫，並怡然自樂',
        explanation: '「黃髮垂髫，並怡然自樂」象徵老者與幼童皆各得其所、安居樂業。'
    },
    {
        id: 'Q-CHI-20240502',
        subjectId: 'chinese',
        type: 'multiple',
        content: '下列關於蘇軾《赤壁賦》寫作技巧與思想主旨的敘述，何者正確？',
        difficulty: 'hard',
        points: 6,
        tags: [
            '宋代古文',
            '赤壁賦'
        ],
        updatedAt: '2024-05-17 11:20',
        options: [
            'A. 採用主客問答結構推進哲理思考',
            'B. 融合儒家、道家與佛家思想解脫人生苦悶',
            'C. 藉由水月之變與不變闡發豁達的宇宙觀',
            'D. 全文純粹抒發被貶黃州的怨懟之情'
        ],
        correctAnswer: 'A, B, C',
        explanation: '《赤壁賦》展現超脫豁達，並非純發怨懟。'
    },
    {
        id: 'Q-CHI-20240503',
        subjectId: 'chinese',
        type: 'true_false',
        content: '「六書」中的「象形」與「指事」皆屬於文字結構之獨體字（初文）。',
        difficulty: 'easy',
        points: 3,
        tags: [
            '文字學',
            '六書'
        ],
        updatedAt: '2024-05-15 15:40',
        options: [
            '正確 (True)',
            '錯誤 (False)'
        ],
        correctAnswer: '正確 (True)',
        explanation: '象形與指事為獨體，會意與形聲為合體。'
    },
    // --- English questions ---
    {
        id: 'Q-ENG-20240401',
        subjectId: 'english',
        type: 'single',
        content: 'Due to the unprecedented weather conditions, the flight has been _______ until tomorrow morning.',
        difficulty: 'easy',
        points: 4,
        tags: [
            'Vocabulary',
            'Passive Voice'
        ],
        updatedAt: '2024-05-17 14:00',
        options: [
            'delayed',
            'accelerated',
            'launched',
            'originated'
        ],
        correctAnswer: 'delayed',
        explanation: 'Context requires a verb meaning postponed or held back.'
    },
    {
        id: 'Q-ENG-20240402',
        subjectId: 'english',
        type: 'single',
        content: 'The committee recommended that the proposal _______ thoroughly reviewed before final approval.',
        difficulty: 'hard',
        points: 5,
        tags: [
            'Subjunctive Mood',
            'Grammar'
        ],
        updatedAt: '2024-05-16 11:10',
        options: [
            'be',
            'is',
            'was',
            'being'
        ],
        correctAnswer: 'be',
        explanation: 'Verbs of recommendation require subjunctive bare infinitive.'
    },
    {
        id: 'Q-ENG-20240403',
        subjectId: 'english',
        type: 'true_false',
        content: 'In English academic writing, using transitional adverbs like "furthermore" and "consequently" enhances cohesion between paragraphs.',
        difficulty: 'easy',
        points: 3,
        tags: [
            'Writing',
            'Cohesion'
        ],
        updatedAt: '2024-05-14 09:30',
        options: [
            '正確 (True)',
            '錯誤 (False)'
        ],
        correctAnswer: '正確 (True)',
        explanation: 'Transitional expressions provide logical signposts between arguments.'
    },
    // --- Physics questions ---
    {
        id: 'Q-PHY-20240301',
        subjectId: 'physics',
        type: 'single',
        content: '一光線從折射率 n=1.5 的玻璃射入空氣 (n=1.0)，其全反射的臨界角約為幾度？',
        difficulty: 'hard',
        points: 6,
        tags: [
            '幾何光學',
            '全反射臨界角'
        ],
        updatedAt: '2024-05-16 16:30',
        options: [
            '41.8°',
            '45.0°',
            '30.0°',
            '60.0°'
        ],
        correctAnswer: '41.8°',
        explanation: 'sin θ_c = 1 / 1.5 = 2/3 ≈ 0.6667，θ_c ≈ 41.8°。'
    },
    {
        id: 'Q-PHY-20240302',
        subjectId: 'physics',
        type: 'true_false',
        content: '依據熱力學第二定律，孤立系統的總熵值在自發過程中永遠不會減少。',
        difficulty: 'medium',
        points: 3,
        tags: [
            '熱力學',
            '熵增原理'
        ],
        updatedAt: '2024-05-15 13:00',
        options: [
            '正確 (True)',
            '錯誤 (False)'
        ],
        correctAnswer: '正確 (True)',
        explanation: '孤立系統自發過程必滿足 ΔS ≥ 0。'
    },
    // --- Chemistry questions ---
    {
        id: 'Q-CHEM-20240201',
        subjectId: 'chemistry',
        type: 'single',
        content: '下列哪種化合物在水溶液中具有最高之酸解離常數 (Ka)？',
        difficulty: 'medium',
        points: 5,
        tags: [
            '酸鹼化學',
            '解離平衡'
        ],
        updatedAt: '2024-05-14 10:20',
        options: [
            '鹽酸 (HCl)',
            '醋酸 (CH3COOH)',
            '碳酸 (H2CO3)',
            '次氯酸 (HClO)'
        ],
        correctAnswer: '鹽酸 (HCl)',
        explanation: '鹽酸為完全解離之強酸。'
    },
    {
        id: 'Q-CHEM-20240202',
        subjectId: 'chemistry',
        type: 'true_false',
        content: '催化劑能藉由降低反應之活化能來加速化學反應速率，但不改變反應平衡常數。',
        difficulty: 'easy',
        points: 3,
        tags: [
            '化學動力學',
            '催化劑'
        ],
        updatedAt: '2024-05-12 11:15',
        options: [
            '正確 (True)',
            '錯誤 (False)'
        ],
        correctAnswer: '正確 (True)',
        explanation: '催化劑同等加速正逆反應速率，平衡常數不變。'
    },
    // --- Biology questions ---
    {
        id: 'Q-BIO-20240101',
        subjectId: 'biology',
        type: 'single',
        content: '真核生物細胞中，有氧呼吸過程產生最多 ATP 的反應階段發生於何處？',
        difficulty: 'medium',
        points: 5,
        tags: [
            '細胞呼吸',
            '粒線體'
        ],
        updatedAt: '2024-05-13 14:10',
        options: [
            '粒線體內膜 (電子傳遞鏈)',
            '細胞質基質',
            '粒線體基質',
            '核糖體'
        ],
        correctAnswer: '粒線體內膜 (電子傳遞鏈)',
        explanation: '氧化磷酸化反應發生在粒線體內膜，產生絕大多數 ATP。'
    },
    {
        id: 'Q-BIO-20240102',
        subjectId: 'biology',
        type: 'multiple',
        content: '下列哪些構造屬於植物細胞特有，而不存在於動物細胞中？',
        difficulty: 'easy',
        points: 5,
        tags: [
            '細胞構造',
            '植物學'
        ],
        updatedAt: '2024-05-11 16:00',
        options: [
            'A. 細胞壁 (Cell Wall)',
            'B. 葉綠體 (Chloroplast)',
            'C. 大型的中央液泡 (Central Vacuole)',
            'D. 粒線體 (Mitochondria)'
        ],
        correctAnswer: 'A, B, C',
        explanation: '動植物細胞均含有粒線體。'
    },
    // --- Astronomy questions ---
    {
        id: 'Q-ASTRO-20240101',
        subjectId: 'astronomy',
        type: 'single',
        content: '依照赫羅圖 (H-R diagram) 的分類，太陽目前處於演化歷程的哪一個階段？',
        difficulty: 'medium',
        points: 5,
        tags: [
            '恆星演化',
            '赫羅圖'
        ],
        updatedAt: '2024-05-12 13:30',
        options: [
            '主序星 (Main Sequence)',
            '紅巨星 (Red Giant)',
            '白矮星 (White Dwarf)',
            '超新星 (Supernova)'
        ],
        correctAnswer: '主序星 (Main Sequence)',
        explanation: '太陽目前正進行核心氫融合反應，屬於主序星。'
    },
    // --- Civics questions ---
    {
        id: 'Q-CIV-20240101',
        subjectId: 'civics',
        type: 'single',
        content: '我國憲法增修條文規定，立法院通過對行政院院長之不信任案後，行政院院長得呈請總統進行何種處置？',
        difficulty: 'hard',
        points: 6,
        tags: [
            '憲法制度',
            '權力分立'
        ],
        updatedAt: '2024-05-14 11:00',
        options: [
            '解散立法院',
            '宣布戒嚴',
            '交付公投',
            '發布緊急命令'
        ],
        correctAnswer: '解散立法院',
        explanation: '行政院院長得於十日內呈請總統解散立法院。'
    },
    // --- Geography questions ---
    {
        id: 'Q-GEO-20240101',
        subjectId: 'geography',
        type: 'single',
        content: '下列哪一種氣候類型的特徵為「夏乾冬雨」，主要分佈於緯度 30° 至 40° 的大陸西岸？',
        difficulty: 'easy',
        points: 4,
        tags: [
            '世界氣候',
            '地中海型氣候'
        ],
        updatedAt: '2024-05-13 09:40',
        options: [
            '地中海型氣候',
            '熱帶季風氣候',
            '溫帶海洋性氣候',
            '溫帶大陸性氣候'
        ],
        correctAnswer: '地中海型氣候',
        explanation: '地中海型氣候夏季受副熱帶高壓籠罩炎熱乾燥，冬季受西風帶影響溫和多雨。'
    },
    // --- History questions ---
    {
        id: 'Q-HIST-20240101',
        subjectId: 'history',
        type: 'single',
        content: '18 世紀末開啟的法國大革命，其頒布之重要人權宣言核心思想深受哪一位啟蒙思想家的社會契約論影響？',
        difficulty: 'medium',
        points: 5,
        tags: [
            '世界歷史',
            '啟蒙運動'
        ],
        updatedAt: '2024-05-12 15:10',
        options: [
            '盧梭 (Jean-Jacques Rousseau)',
            '伏爾泰 (Voltaire)',
            '孟德斯鳩 (Montesquieu)',
            '洛克 (John Locke)'
        ],
        correctAnswer: '盧梭 (Jean-Jacques Rousseau)',
        explanation: '盧梭的主權在民與公意說對法國大革命影響深遠。'
    }
];
const INITIAL_EXAM_PAPERS = [
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$assignedExamQuestions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ASSIGNED_EXAM_PAPER"],
    {
        id: 'EXAM-2024-MATH-081',
        title: '2024年高二數學期末統一測驗',
        description: '包含三角函數、空間向量大題',
        subject: '數學',
        subjectId: 'math',
        difficultyLv: 5,
        questionCount: 25,
        totalScore: 100,
        durationMinutes: 90,
        createdAt: '2024/05/18 14:30',
        status: 'published',
        examineeCount: 120,
        questionIds: [
            'Q-MATH-20240901',
            'Q-MATH-20240902'
        ]
    },
    {
        id: 'EXAM-2024-ENG-042',
        title: '高一英文第一次全真模擬考卷',
        description: '閱讀測驗、綜合填空與英作',
        subject: '英文',
        subjectId: 'english',
        difficultyLv: 3,
        questionCount: 40,
        totalScore: 100,
        durationMinutes: 60,
        createdAt: '2024/05/19 09:15',
        status: 'draft',
        examineeCount: 0,
        questionIds: [
            'Q-ENG-20240401',
            'Q-ENG-20240402'
        ]
    },
    {
        id: 'EXAM-2024-PHY-033',
        title: '高二物理電磁感應隨堂自評卷',
        description: '電磁學、法拉第定律與冷次定律計算',
        subject: '自然 (物理)',
        subjectId: 'physics',
        difficultyLv: 3,
        questionCount: 15,
        totalScore: 100,
        durationMinutes: 45,
        createdAt: '2024/05/19 11:30',
        status: 'draft',
        examineeCount: 0,
        questionIds: [
            'Q-PHY-20240301'
        ]
    },
    {
        id: 'EXAM-2024-DRAFT-003',
        title: '國文現代詩選讀小考 (資料未填完整草稿)',
        description: '此草稿尚未配置題目與測驗時長，可用於測試必填欄位檢查提醒',
        subject: '國文',
        subjectId: 'chinese',
        difficultyLv: 2,
        questionCount: 0,
        totalScore: 0,
        durationMinutes: 0,
        createdAt: '2024/05/19 14:00',
        status: 'draft',
        examineeCount: 0,
        questionIds: []
    },
    {
        id: 'EXAM-2024-SCI-019',
        title: '物理光學與波動綜合評量測驗',
        description: '自然科學學群高階選修專用卷',
        subject: '自然 (物理)',
        subjectId: 'physics',
        difficultyLv: 4,
        questionCount: 30,
        totalScore: 100,
        durationMinutes: 75,
        createdAt: '2024/05/17 11:20',
        status: 'published',
        examineeCount: 88,
        questionIds: [
            'Q-PHY-20240301',
            'Q-PHY-20240302'
        ]
    },
    {
        id: 'EXAM-2024-CHI-005',
        title: '國文文言文閱讀理解能力檢定',
        description: '先秦散文與唐宋八大家經典選讀',
        subject: '國文',
        subjectId: 'chinese',
        difficultyLv: 1,
        questionCount: 35,
        totalScore: 100,
        durationMinutes: 80,
        createdAt: '2024/05/15 16:00',
        status: 'published',
        examineeCount: 240,
        questionIds: [
            'Q-CHI-20240501'
        ]
    },
    {
        id: 'EXAM-2023-MATH-112',
        title: '112學年度高一數理資優甄選初試',
        description: '數理資優甄選試卷草稿存檔，保留題庫編審權限',
        subject: '數學',
        subjectId: 'math',
        difficultyLv: 5,
        questionCount: 20,
        totalScore: 100,
        durationMinutes: 60,
        createdAt: '2023/12/28 10:00',
        status: 'draft',
        examineeCount: 0,
        questionIds: [
            'Q-MATH-20240901',
            'Q-MATH-20240902'
        ]
    },
    {
        id: 'EXAM-2024-BIO-008',
        title: '高中生物遺傳與分子演化專題測驗',
        description: '孟德爾遺傳法則、DNA複製與轉譯綜合評量',
        subject: '自然 (生物)',
        subjectId: 'biology',
        difficultyLv: 4,
        questionCount: 28,
        totalScore: 100,
        durationMinutes: 70,
        createdAt: '2024/05/10 13:40',
        status: 'published',
        examineeCount: 160
    },
    {
        id: 'EXAM-2024-CHEM-014',
        title: '化學反應平衡與電化學專章測驗',
        description: '勒沙特列原理、氧化還原電位試題',
        subject: '自然 (化學)',
        subjectId: 'chemistry',
        difficultyLv: 3,
        questionCount: 32,
        totalScore: 100,
        durationMinutes: 65,
        createdAt: '2024/05/08 15:20',
        status: 'published',
        examineeCount: 95
    },
    {
        id: 'EXAM-2024-GEO-003',
        title: '高二世界地理地形與氣候專卷',
        description: '板塊構造、季風氣候分佈地圖辨識題',
        subject: '社會 (地理)',
        subjectId: 'geography',
        difficultyLv: 2,
        questionCount: 30,
        totalScore: 100,
        durationMinutes: 50,
        createdAt: '2024/05/05 09:30',
        status: 'published',
        examineeCount: 180
    }
];
}),
"[project]/src/hooks/useCountdown.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "remainingFromDeadline",
    ()=>remainingFromDeadline,
    "useCountdown",
    ()=>useCountdown
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
function remainingFromDeadline(deadline, now = Date.now()) {
    return Math.max(0, Math.ceil((deadline - now) / 1000));
}
function useCountdown(enabled, deadline, onTick) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!enabled || deadline === null) return;
        const tick = ()=>{
            onTick(remainingFromDeadline(deadline));
        };
        tick();
        const timer = window.setInterval(tick, 250);
        return ()=>window.clearInterval(timer);
    }, [
        enabled,
        deadline,
        onTick
    ]);
}
}),
"[project]/src/services/googleAuth.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$app$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/app/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/app/dist/esm/index.esm.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/auth/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$totp$2d$pe8Y0u5S$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__D__as__getAuth$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/auth/dist/node-esm/totp-pe8Y0u5S.js [app-ssr] (ecmascript) <export D as getAuth>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$totp$2d$pe8Y0u5S$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__ai__as__signInWithPopup$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/auth/dist/node-esm/totp-pe8Y0u5S.js [app-ssr] (ecmascript) <export ai as signInWithPopup>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$totp$2d$pe8Y0u5S$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__f__as__GoogleAuthProvider$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/auth/dist/node-esm/totp-pe8Y0u5S.js [app-ssr] (ecmascript) <export f as GoogleAuthProvider>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$totp$2d$pe8Y0u5S$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$5f$__as__onAuthStateChanged$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/auth/dist/node-esm/totp-pe8Y0u5S.js [app-ssr] (ecmascript) <export _ as onAuthStateChanged>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$totp$2d$pe8Y0u5S$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__ak__as__signOut$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/auth/dist/node-esm/totp-pe8Y0u5S.js [app-ssr] (ecmascript) <export ak as signOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$firebase$2d$applet$2d$config$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/firebase-applet-config.json.[json].cjs [app-ssr] (ecmascript)");
;
;
;
// Initialize Firebase App instance
const app = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getApps"])().length === 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["initializeApp"])(__TURBOPACK__imported__module__$5b$project$5d2f$firebase$2d$applet$2d$config$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getApps"])()[0];
const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$totp$2d$pe8Y0u5S$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__D__as__getAuth$3e$__["getAuth"])(app);
const googleProvider = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$totp$2d$pe8Y0u5S$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__f__as__GoogleAuthProvider$3e$__["GoogleAuthProvider"]();
googleProvider.addScope('https://www.googleapis.com/auth/spreadsheets');
googleProvider.addScope('https://www.googleapis.com/auth/drive.file');
// In-memory token storage (DO NOT store in localStorage or sessionStorage per security guidelines)
let cachedAccessToken = null;
let isSigningIn = false;
const initAuth = (onAuthSuccess, onAuthFailure)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$totp$2d$pe8Y0u5S$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$5f$__as__onAuthStateChanged$3e$__["onAuthStateChanged"])(auth, async (user)=>{
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
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$totp$2d$pe8Y0u5S$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__ai__as__signInWithPopup$3e$__["signInWithPopup"])(auth, googleProvider);
        const credential = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$totp$2d$pe8Y0u5S$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__f__as__GoogleAuthProvider$3e$__["GoogleAuthProvider"].credentialFromResult(result);
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
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$totp$2d$pe8Y0u5S$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__ak__as__signOut$3e$__["signOut"])(auth);
    cachedAccessToken = null;
};
}),
"[project]/src/services/mockExamData.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "assignedExam",
    ()=>assignedExam
]);
const OPTION_IDS = [
    "A",
    "B",
    "C",
    "D"
];
function single(id, prompt, options) {
    return {
        id,
        type: "single",
        prompt,
        points: 2,
        options: options.map((text, index)=>({
                id: OPTION_IDS[index],
                text
            }))
    };
}
const assignedExam = {
    id: "assigned-demo",
    title: "計算機概論 模擬測驗",
    subtitle: "公職考試 ・ 50 題 ・ 60 分鐘",
    durationSec: 60 * 60,
    questions: [
        single("assigned-01", "計算機五大單元中，負責執行算術與邏輯運算的是下列哪一個單元？", [
            "控制單元",
            "算術邏輯單元",
            "記憶單元",
            "輸入輸出單元"
        ]),
        single("assigned-02", "1 個位元組（Byte）等於多少個位元（Bit）？", [
            "4 個",
            "8 個",
            "16 個",
            "32 個"
        ]),
        single("assigned-03", "二進位數 1011 的十進位值為何？", [
            "9",
            "10",
            "11",
            "13"
        ]),
        single("assigned-04", "十六進位數 1A 的十進位值為何？", [
            "24",
            "25",
            "26",
            "27"
        ]),
        single("assigned-05", "快取記憶體（Cache）的主要作用為何？", [
            "增加硬碟容量",
            "加快 CPU 存取常用資料的速度",
            "負責網路路由",
            "永久保存資料"
        ]),
        single("assigned-06", "下列哪一種記憶體屬於揮發性記憶體？", [
            "ROM",
            "DRAM",
            "SSD",
            "隨身碟"
        ]),
        single("assigned-07", "電腦關機後，下列哪一種記憶體仍會保留資料？", [
            "RAM",
            "暫存器",
            "ROM",
            "快取記憶體"
        ]),
        single("assigned-08", "電腦匯流排（Bus）的主要功能為何？", [
            "連接各單元並傳輸資料",
            "儲存使用者檔案",
            "執行防毒掃描",
            "提供螢幕畫面"
        ]),
        single("assigned-09", "下列哪一項屬於作業系統的主要功能？", [
            "文書編輯",
            "記憶體與行程管理",
            "網頁瀏覽",
            "影像剪輯"
        ]),
        single("assigned-10", "作業系統中的分頁（Paging）機制主要用來解決什麼問題？", [
            "外部碎片",
            "CPU 過熱",
            "網路壅塞",
            "螢幕解析度不足"
        ]),
        single("assigned-11", "虛擬記憶體（Virtual Memory）的主要作用為何？", [
            "讓程式可使用的位址空間大於實體記憶體",
            "加快印表機列印速度",
            "壓縮圖片檔案",
            "加密網路封包"
        ]),
        single("assigned-12", "下列哪一項「不是」發生死結（Deadlock）的必要條件？", [
            "互斥（Mutual Exclusion）",
            "持有並等待（Hold and Wait）",
            "可剝奪（Preemption）",
            "循環等待（Circular Wait）"
        ]),
        single("assigned-13", "Round Robin 排程演算法的主要特性為何？", [
            "依固定時間片段輪流執行",
            "先來先服務",
            "依優先權高低執行",
            "最短工作優先執行"
        ]),
        single("assigned-14", "同一行程（Process）中的多個執行緒（Thread）通常共用下列哪一項資源？", [
            "堆疊（Stack）",
            "程式計數器（Program Counter）",
            "堆積（Heap）與全域變數",
            "暫存器（Register）"
        ]),
        single("assigned-15", "中斷（Interrupt）機制的主要用途為何？", [
            "通知 CPU 處理需要立即反應的事件",
            "增加記憶體容量",
            "壓縮資料檔案",
            "備份作業系統"
        ]),
        single("assigned-16", "檔案系統（File System）主要負責下列哪一項工作？", [
            "管理檔案與目錄",
            "執行病毒掃描",
            "提供螢幕畫面",
            "控制印表機墨水"
        ]),
        single("assigned-17", "TCP 協定的主要特性為何？", [
            "可靠且具連線導向",
            "不可靠且不保證送達",
            "只支援廣播",
            "不需要任何確認機制"
        ]),
        single("assigned-18", "IPv4 位址的長度為多少位元？", [
            "16 位元",
            "32 位元",
            "64 位元",
            "128 位元"
        ]),
        single("assigned-19", "DNS 的主要功能為何？", [
            "將網域名稱轉換為 IP 位址",
            "壓縮網路封包",
            "加密電子郵件",
            "分配實體網路卡"
        ]),
        single("assigned-20", "HTTP 協定的預設通訊埠為何？", [
            "21",
            "25",
            "80",
            "443"
        ]),
        single("assigned-21", "OSI 七層模型中，負責選擇路由與轉送封包的是哪一層？", [
            "實體層",
            "資料鏈結層",
            "網路層",
            "應用層"
        ]),
        single("assigned-22", "路由器（Router）的主要功能為何？", [
            "選擇路徑並轉送封包",
            "放大網路訊號",
            "儲存網頁內容",
            "過濾垃圾郵件"
        ]),
        single("assigned-23", "防火牆（Firewall）的主要用途為何？", [
            "控制進出網路的流量",
            "增加硬碟容量",
            "提升螢幕解析度",
            "備份使用者資料"
        ]),
        single("assigned-24", "對稱式加密（Symmetric Encryption）的特性為何？", [
            "加密與解密使用同一把金鑰",
            "使用公開金鑰與私密金鑰",
            "加密後無法還原",
            "只能用於數位簽章"
        ]),
        single("assigned-25", "數位簽章（Digital Signature）的主要目的為何？", [
            "驗證身分與資料完整性",
            "壓縮傳輸檔案",
            "增加網路頻寬",
            "備份資料庫"
        ]),
        single("assigned-26", "下列哪一項屬於惡意程式？", [
            "作業系統",
            "編譯器",
            "勒索軟體",
            "網頁瀏覽器"
        ]),
        single("assigned-27", "SQL 的主要用途為何？", [
            "查詢與操作關聯式資料庫",
            "設計網頁版面",
            "壓縮影片檔案",
            "管理印表機"
        ]),
        single("assigned-28", "關聯式資料表中，主鍵（Primary Key）的特性為何？", [
            "唯一且不可為空",
            "可以重複",
            "必須是文字型別",
            "允許空值"
        ]),
        single("assigned-29", "資料庫正規化（Normalization）的主要目的為何？", [
            "減少資料重複與更新異常",
            "增加資料重複以提升速度",
            "提高硬體運算速度",
            "將資料加密"
        ]),
        single("assigned-30", "關聯式資料庫主要以何種方式表示資料與關聯？", [
            "資料表",
            "圖片",
            "音訊",
            "影片"
        ]),
        single("assigned-31", "二分搜尋法（Binary Search）的平均時間複雜度為何？", [
            "O(1)",
            "O(log n)",
            "O(n)",
            "O(n²)"
        ]),
        single("assigned-32", "穩定排序（Stable Sort）的特性為何？", [
            "相同鍵值元素的相對順序維持不變",
            "一定是執行最快的排序",
            "不需要進行比較",
            "只能用於數字資料"
        ]),
        single("assigned-33", "堆疊（Stack）的存取順序為何？", [
            "先進先出（FIFO）",
            "後進先出（LIFO）",
            "隨機存取",
            "依優先權存取"
        ]),
        single("assigned-34", "佇列（Queue）的存取順序為何？", [
            "後進先出（LIFO）",
            "先進先出（FIFO）",
            "隨機存取",
            "依索引大小存取"
        ]),
        single("assigned-35", "在單向鏈結串列（Singly Linked List）的頭部插入新節點，時間複雜度為何？", [
            "O(1)",
            "O(log n)",
            "O(n)",
            "O(n log n)"
        ]),
        single("assigned-36", "雜湊表（Hash Table）在理想情況下的平均搜尋時間複雜度為何？", [
            "O(1)",
            "O(log n)",
            "O(n)",
            "O(n²)"
        ]),
        single("assigned-37", "撰寫遞迴函式時，必須具備下列哪一項要素？", [
            "終止條件",
            "無窮迴圈",
            "全域變數",
            "多執行緒"
        ]),
        single("assigned-38", "編譯器（Compiler）與直譯器（Interpreter）的主要差異為何？", [
            "編譯器先將程式轉為機器碼再執行",
            "直譯器一定執行較快",
            "編譯器不能檢查語法錯誤",
            "直譯器只能處理硬體電路"
        ]),
        single("assigned-39", "程式語言中變數的資料型別主要決定什麼？", [
            "可儲存的值範圍與可進行的操作",
            "螢幕顯示顏色",
            "網路傳輸速度",
            "檔案名稱長度"
        ]),
        single("assigned-40", "物件導向中的「封裝」（Encapsulation）是指什麼？", [
            "隱藏內部實作並提供公開介面",
            "複製多個相同物件",
            "刪除不需要的類別",
            "將所有變數設為公開"
        ]),
        single("assigned-41", "雲端運算的 IaaS（Infrastructure as a Service）主要提供什麼？", [
            "虛擬機器與儲存等基礎運算資源",
            "只能提供網頁瀏覽器",
            "只能提供文書軟體",
            "只能提供電子郵件"
        ]),
        single("assigned-42", "大數據常以 3V 描述，下列哪一項「不是」3V 的內容？", [
            "資料量（Volume）",
            "資料速度（Velocity）",
            "資料多樣性（Variety）",
            "資料顏色（Color）"
        ]),
        single("assigned-43", "機器學習模型訓練通常需要下列哪一組要素？", [
            "資料與演算法",
            "只有螢幕與鍵盤",
            "只有印表機",
            "只有網路線"
        ]),
        single("assigned-44", "物聯網（IoT）的核心概念為何？", [
            "讓各種裝置連網並交換資料",
            "只能玩線上遊戲",
            "只能使用離線電腦",
            "只能處理文書排版"
        ]),
        single("assigned-45", "區塊鏈（Blockchain）的主要特性為何？", [
            "分散式帳本且資料難以竄改",
            "單一集中式資料庫",
            "只能儲存圖片",
            "保證完全匿名"
        ]),
        single("assigned-46", "數位憑證（Digital Certificate）通常由誰簽發？", [
            "憑證授權中心（CA）",
            "使用者本人",
            "網際網路服務供應商（ISP）",
            "作業系統廠商"
        ]),
        single("assigned-47", "系統儲存使用者密碼時，通常會採用下列哪一種方式？", [
            "雜湊加鹽（Hashing with Salt）",
            "直接明文儲存",
            "壓縮後儲存",
            "轉成圖片儲存"
        ]),
        single("assigned-48", "備份 3-2-1 原則中的「1」代表什麼？", [
            "至少一份異地備份",
            "只需要一份密碼",
            "只需要一台電腦",
            "只能有一位使用者"
        ]),
        single("assigned-49", "個人資料保護法的主要目的為何？", [
            "保護個人資料與隱私",
            "增加政府稅收",
            "管制網路速度",
            "限制電腦數量"
        ]),
        single("assigned-50", "計算機五大單元「不包括」下列哪一項？", [
            "輸入單元",
            "輸出單元",
            "記憶單元",
            "通訊單元"
        ])
    ]
};
}),
"[project]/src/services/publicSheet.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ASSIGNED_EXAM_ID",
    ()=>ASSIGNED_EXAM_ID,
    "CATEGORY_ID_TO_SUBJECT",
    ()=>CATEGORY_ID_TO_SUBJECT,
    "DATABASE_TABLE_SCHEMAS",
    ()=>DATABASE_TABLE_SCHEMAS,
    "INITIAL_CATEGORIES_DATA",
    ()=>INITIAL_CATEGORIES_DATA,
    "INITIAL_ROLES_DATA",
    ()=>INITIAL_ROLES_DATA,
    "SUBJECT_NAME_MAP",
    ()=>SUBJECT_NAME_MAP,
    "SUBJECT_TO_CATEGORY_ID",
    ()=>SUBJECT_TO_CATEGORY_ID,
    "appendExamToSpreadsheet",
    ()=>appendExamToSpreadsheet,
    "appendLogToSpreadsheet",
    ()=>appendLogToSpreadsheet,
    "appendQuestionToSpreadsheet",
    ()=>appendQuestionToSpreadsheet,
    "appendUserToSpreadsheet",
    ()=>appendUserToSpreadsheet,
    "authenticateUserFromSheet",
    ()=>authenticateUserFromSheet,
    "createFullDatabaseSpreadsheet",
    ()=>createFullDatabaseSpreadsheet,
    "deleteRowsFromSpreadsheetViaGas",
    ()=>deleteRowsFromSpreadsheetViaGas,
    "ensureSpreadsheetTablesExist",
    ()=>ensureSpreadsheetTablesExist,
    "fetchSpreadsheetStats",
    ()=>fetchSpreadsheetStats,
    "fetchUsersAndRolesFromSheet",
    ()=>fetchUsersAndRolesFromSheet,
    "getAssignedExam",
    ()=>getAssignedExam,
    "getEnvConfiguredScriptUrl",
    ()=>getEnvConfiguredScriptUrl,
    "getEnvConfiguredSpreadsheetUrl",
    ()=>getEnvConfiguredSpreadsheetUrl,
    "parseRolesFromSheetRows",
    ()=>parseRolesFromSheetRows,
    "parseUsersFromSheetRows",
    ()=>parseUsersFromSheetRows,
    "postToGasScript",
    ()=>postToGasScript,
    "readAllTablesFromSpreadsheet",
    ()=>readAllTablesFromSpreadsheet,
    "readPublicSpreadsheetViaGviz",
    ()=>readPublicSpreadsheetViaGviz,
    "syncAllToSpreadsheet",
    ()=>syncAllToSpreadsheet,
    "syncExamsOnlyToSpreadsheet",
    ()=>syncExamsOnlyToSpreadsheet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mockExamData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/mockExamData.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$initialData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/initialData.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/utils/formatters.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$sheetParser$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/sheetParser.ts [app-ssr] (ecmascript)");
var __TURBOPACK__import$2e$meta__ = {
    get url () {
        return __turbopack_context__.F("src/services/publicSheet.ts");
    },
    env: {
        DEV: true,
        PROD: false,
        MODE: "development",
        BASE_URL: "/",
        SSR: true
    },
    get turbopackHot () {
        return __turbopack_context__.m.hot;
    }
};
;
;
;
;
const ASSIGNED_EXAM_ID = 'assigned-demo';
async function getAssignedExam(examId, extraExams = [], extraQuestions = []) {
    if (examId === ASSIGNED_EXAM_ID) return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mockExamData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assignedExam"];
    // 試卷查表：優先使用線上試卷 (extraExams: Google Sheet)；若離線或線上無試卷，才讀取 data 內試卷 INITIAL_EXAM_PAPERS
    const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
    const examMap = new Map();
    if (extraExams && extraExams.length > 0) {
        for (const e of extraExams){
            if (e?.id && !examMap.has(e.id)) {
                examMap.set(e.id, e);
            }
        }
    }
    // 讀取考生自選組卷 (localStorage)
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    // 若線上試卷未包含該試卷，或處於離線狀態時，才讀取 data 內試卷 INITIAL_EXAM_PAPERS 備援
    if (!examMap.has(examId) || !isOnline) {
        for (const e of __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$initialData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INITIAL_EXAM_PAPERS"]){
            if (e?.id && !examMap.has(e.id)) {
                examMap.set(e.id, e);
            }
        }
    }
    const paper = examMap.get(examId);
    if (!paper) return null;
    // 題目資料庫查表：優先取線上題庫 (extraQuestions: 來自 Google Sheet)
    // 若線上題庫為空或處於離線狀態時，才去讀取 data 內題庫 INITIAL_QUESTIONS
    const questionMap = new Map();
    if (extraQuestions && extraQuestions.length > 0) {
        for (const q of extraQuestions){
            if (q?.id && !questionMap.has(q.id)) {
                questionMap.set(q.id, q);
            }
        }
    }
    // 若線上題庫為空或處於離線狀態，才補入 data 內題庫 INITIAL_QUESTIONS 作為備援
    if (questionMap.size === 0 || !isOnline) {
        for (const q of __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$initialData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INITIAL_QUESTIONS"]){
            if (q?.id && !questionMap.has(q.id)) {
                questionMap.set(q.id, q);
            }
        }
    }
    // 若試卷指定的個別題目 ID 在線上未找到，亦可從 data 題庫備援補入
    const rawQuestionIds = paper.questionIds || [];
    const questionIds = Array.from(new Set(rawQuestionIds));
    for (const qId of questionIds){
        if (!questionMap.has(qId)) {
            const fallbackQ = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$initialData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INITIAL_QUESTIONS"].find((item)=>item.id === qId);
            if (fallbackQ) {
                questionMap.set(fallbackQ.id, fallbackQ);
            }
        }
    }
    let matchedQuestions = [];
    if (questionIds.length > 0) {
        matchedQuestions = questionIds.map((id)=>questionMap.get(id)).filter((q)=>Boolean(q));
    }
    if (matchedQuestions.length === 0) {
        const allQuestionsList = Array.from(questionMap.values());
        matchedQuestions = allQuestionsList.filter((q)=>q.subjectId === paper.subjectId).slice(0, paper.questionCount || 10);
    }
    if (matchedQuestions.length === 0) {
        matchedQuestions = Array.from(questionMap.values()).slice(0, paper.questionCount || 10);
    }
    const optionLetters = [
        'A',
        'B',
        'C',
        'D',
        'E'
    ];
    const examQuestions = matchedQuestions.map((q, idx)=>{
        const rawOptions = q.options && q.options.length > 0 ? q.options : [
            '選項 A',
            '選項 B',
            '選項 C',
            '選項 D'
        ];
        return {
            id: q.id || `q-${idx + 1}`,
            test_id: q.id,
            type: q.type === 'multiple' ? 'multiple' : 'single',
            prompt: q.content || q.question || '',
            options: rawOptions.map((text, oIdx)=>({
                    id: optionLetters[oIdx] || String(oIdx + 1),
                    text
                })),
            points: q.points || 2,
            answer: q.correctAnswer || q.answer,
            explanation: q.explanation
        };
    });
    return {
        id: paper.id,
        title: paper.title,
        subtitle: `${paper.subject} ・ ${examQuestions.length} 題 ・ ${paper.durationMinutes} 分鐘`,
        durationSec: (paper.durationMinutes || 60) * 60,
        passingScore: paper.passingScore || 60,
        questions: examQuestions
    };
}
;
const DATABASE_TABLE_SCHEMAS = {
    users: {
        name: 'users',
        description: '系統使用者與管理員帳號表',
        columns: [
            {
                key: 'id',
                label: 'id',
                desc: '流水編號'
            },
            {
                key: 'uuid',
                label: 'uuid',
                desc: '全域唯一識別碼，對外公開用(防刷ID)'
            },
            {
                key: 'status',
                label: 'status',
                desc: '帳號狀態: 0=停用, 1=啟用, 2=未驗證'
            },
            {
                key: 'role',
                label: 'role',
                desc: '角色（外鍵關聯至roles.code）'
            },
            {
                key: 'name',
                label: 'name',
                desc: '暱稱'
            },
            {
                key: 'identifier',
                label: 'identifier',
                desc: '帳號'
            },
            {
                key: 'credential',
                label: 'credential',
                desc: '密碼(hash)'
            },
            {
                key: 'google_sheet_URL',
                label: 'google_sheet_URL',
                desc: '使用者資料庫'
            },
            {
                key: 'last_login_at',
                label: 'last_login_at',
                desc: '最後登入時間'
            },
            {
                key: 'created_at',
                label: 'created_at',
                desc: '帳號建立時間'
            },
            {
                key: 'updated_at',
                label: 'updated_at',
                desc: '帳號資料更新時間'
            }
        ]
    },
    roles: {
        name: 'roles',
        description: '使用者權限角色定義表',
        columns: [
            {
                key: 'id',
                label: 'id',
                desc: 'BIGINT UNSIGNED AUTO_INCREMENT'
            },
            {
                key: 'code',
                label: 'code',
                desc: '角色代碼（如 ADMIN, USER, GUEST）'
            },
            {
                key: 'name',
                label: 'name',
                desc: '角色顯示名稱（如管理員、用戶、訪客）'
            },
            {
                key: 'description',
                label: 'description',
                desc: '角色描述'
            },
            {
                key: 'created_at',
                label: 'created_at',
                desc: '建立時間'
            }
        ]
    },
    test_bank: {
        name: 'test_bank',
        description: '題庫試題資料表',
        columns: [
            {
                key: 'id',
                label: 'id',
                desc: '流水編號'
            },
            {
                key: 'test_id',
                label: 'test_id',
                desc: '考題編號'
            },
            {
                key: 'question',
                label: 'question',
                desc: '題幹'
            },
            {
                key: 'option',
                label: 'option',
                desc: '選項 (JSON / 選項列)'
            },
            {
                key: 'answer',
                label: 'answer',
                desc: '答案'
            },
            {
                key: 'Explanation',
                label: 'Explanation',
                desc: '詳解'
            },
            {
                key: 'difficulty',
                label: 'difficulty',
                desc: '難度 (數字)'
            },
            {
                key: 'score',
                label: 'score',
                desc: '配分'
            },
            {
                key: 'category_id',
                label: 'category_id',
                desc: '學科編號（外鍵關聯至categories.id）'
            },
            {
                key: 'taqs',
                label: 'taqs',
                desc: '標籤 / 知識點'
            },
            {
                key: 'updated_at',
                label: 'updated_at',
                desc: '更新時間'
            },
            {
                key: 'updated_by',
                label: 'updated_by',
                desc: '最後更新者 ID（外鍵關聯至 users.id）'
            },
            {
                key: 'time',
                label: 'time',
                desc: '題目作答時長 (分鐘)'
            }
        ]
    },
    categories: {
        name: 'categories',
        description: '學科分類層級表',
        columns: [
            {
                key: 'id',
                label: 'id',
                desc: '流水編號'
            },
            {
                key: 'categories_name',
                label: 'categories_name',
                desc: '分類名稱'
            },
            {
                key: 'parent_id',
                label: 'parent_id',
                desc: '父節點 ID'
            },
            {
                key: 'level',
                label: 'level',
                desc: '層級深度 (1: 領域, 2: 科目, 3: 章節/單元)'
            },
            {
                key: 'sort_order',
                label: 'sort_order',
                desc: '排序權重'
            }
        ]
    },
    quiz_bank_publish: {
        name: 'quiz_bank_publish',
        description: '公用已發布試卷資料表',
        columns: [
            {
                key: 'id',
                label: 'id',
                desc: '流水編號'
            },
            {
                key: 'quiz_id',
                label: 'quiz_id',
                desc: '考卷編號'
            },
            {
                key: 'quiz_name',
                label: 'quiz_name',
                desc: '考卷名稱'
            },
            {
                key: 'categories',
                label: 'categories',
                desc: '學科類別'
            },
            {
                key: 'difficulty',
                label: 'difficulty',
                desc: '難度'
            },
            {
                key: 'number',
                label: 'number',
                desc: '題數'
            },
            {
                key: 'score',
                label: 'score',
                desc: '總分'
            },
            {
                key: 'time',
                label: 'time',
                desc: '時長 (分鐘)'
            },
            {
                key: 'update_time',
                label: 'update_time',
                desc: '更新時間'
            }
        ]
    },
    quiz_bank_unpublish: {
        name: 'quiz_bank_unpublish',
        description: '草稿未發布試卷資料表',
        columns: [
            {
                key: 'id',
                label: 'id',
                desc: '流水編號'
            },
            {
                key: 'quiz_id',
                label: 'quiz_id',
                desc: '考卷編號'
            },
            {
                key: 'quiz_name',
                label: 'quiz_name',
                desc: '考卷名稱'
            },
            {
                key: 'categories',
                label: 'categories',
                desc: '學科類別'
            },
            {
                key: 'difficulty',
                label: 'difficulty',
                desc: '難度'
            },
            {
                key: 'number',
                label: 'number',
                desc: '題數'
            },
            {
                key: 'score',
                label: 'score',
                desc: '總分'
            },
            {
                key: 'time',
                label: 'time',
                desc: '時長 (分鐘)'
            },
            {
                key: 'update_time',
                label: 'update_time',
                desc: '更新時間'
            }
        ]
    },
    log: {
        name: 'log',
        description: '系統操作安全審計日誌資料表',
        columns: [
            {
                key: 'id',
                label: 'id',
                desc: '流水編號'
            },
            {
                key: 'log_id',
                label: 'log_id',
                desc: '異動日誌編號'
            },
            {
                key: 'action',
                label: 'action',
                desc: '操作行為'
            },
            {
                key: 'target',
                label: 'target',
                desc: '目標對象'
            },
            {
                key: 'operator',
                label: 'operator',
                desc: '執行管理者'
            },
            {
                key: 'timestamp',
                label: 'timestamp',
                desc: '時間戳記'
            },
            {
                key: 'status',
                label: 'status',
                desc: '狀態 (success / warning / error)'
            }
        ]
    }
};
const INITIAL_CATEGORIES_DATA = [
    {
        id: 1,
        categories_name: '自然領域',
        parent_id: 0,
        level: 1,
        sort_order: 1
    },
    {
        id: 2,
        categories_name: '社會領域',
        parent_id: 0,
        level: 1,
        sort_order: 2
    },
    {
        id: 3,
        categories_name: '數學科',
        parent_id: 0,
        level: 2,
        sort_order: 3
    },
    {
        id: 4,
        categories_name: '國文科',
        parent_id: 0,
        level: 2,
        sort_order: 4
    },
    {
        id: 5,
        categories_name: '英文科',
        parent_id: 0,
        level: 2,
        sort_order: 5
    },
    {
        id: 6,
        categories_name: '物理',
        parent_id: 1,
        level: 2,
        sort_order: 6
    },
    {
        id: 7,
        categories_name: '化學',
        parent_id: 1,
        level: 2,
        sort_order: 7
    },
    {
        id: 8,
        categories_name: '生物',
        parent_id: 1,
        level: 2,
        sort_order: 8
    },
    {
        id: 9,
        categories_name: '天文',
        parent_id: 1,
        level: 2,
        sort_order: 9
    },
    {
        id: 10,
        categories_name: '公民',
        parent_id: 2,
        level: 2,
        sort_order: 10
    },
    {
        id: 11,
        categories_name: '地理',
        parent_id: 2,
        level: 2,
        sort_order: 11
    },
    {
        id: 12,
        categories_name: '歷史',
        parent_id: 2,
        level: 2,
        sort_order: 12
    }
];
const SUBJECT_TO_CATEGORY_ID = {
    math: 3,
    chinese: 4,
    english: 5,
    physics: 6,
    chemistry: 7,
    biology: 8,
    astronomy: 9,
    civics: 10,
    geography: 11,
    history: 12
};
const CATEGORY_ID_TO_SUBJECT = {
    3: 'math',
    4: 'chinese',
    5: 'english',
    6: 'physics',
    7: 'chemistry',
    8: 'biology',
    9: 'astronomy',
    10: 'civics',
    11: 'geography',
    12: 'history'
};
const SUBJECT_NAME_MAP = {
    '數學': 'math',
    '數學科': 'math',
    '高二數學': 'math',
    '國文': 'chinese',
    '國文科': 'chinese',
    '英文': 'english',
    '英文科': 'english',
    '物理': 'physics',
    '化學': 'chemistry',
    '生物': 'biology',
    '天文': 'astronomy',
    '公民': 'civics',
    '地理': 'geography',
    '歷史': 'history'
};
const INITIAL_ROLES_DATA = [
    {
        id: 1,
        code: 'ADMIN',
        name: '管理員',
        description: '具備系統所有試題、試卷與資料庫管理最高權限',
        created_at: '2024-01-01 00:00:00'
    },
    {
        id: 2,
        code: 'USER',
        name: '用戶',
        description: '一般系統用戶，可瀏覽題庫、組卷及參加線上測驗',
        created_at: '2024-01-01 00:00:00'
    },
    {
        id: 3,
        code: 'TEACHER',
        name: '學科教師',
        description: '負責命題、編輯試題、組卷及審核試卷',
        created_at: '2024-01-01 00:00:00'
    },
    {
        id: 4,
        code: 'EXAMINER',
        name: '閱卷人員',
        description: '負責應考名冊檢視、試卷評閱及試題作答分析',
        created_at: '2024-01-01 00:00:00'
    },
    {
        id: 5,
        code: 'STUDENT',
        name: '應考學生',
        description: '參加線上測驗、檢視成績與個人歷史作答紀錄',
        created_at: '2024-01-01 00:00:00'
    },
    {
        id: 6,
        code: 'GUEST',
        name: '訪客',
        description: '僅具備公開試題與範例試卷預覽之訪客權限',
        created_at: '2024-01-01 00:00:00'
    }
];
function getEnvConfiguredSpreadsheetUrl() {
    const env = __TURBOPACK__import$2e$meta__.env;
    return (env?.VITE_PUBLIC_GOOGLE_SHEET_URL || env?.VITE_GOOGLE_SHEET_URL || '').trim();
}
function getEnvConfiguredScriptUrl() {
    const env = __TURBOPACK__import$2e$meta__.env;
    return (env?.VITE_GOOGLE_SCRIPT_URL || '').trim();
}
async function postToGasScript(payload) {
    const scriptUrl = getEnvConfiguredScriptUrl();
    if (!scriptUrl) {
        throw new Error('尚未設定 VITE_GOOGLE_SCRIPT_URL，請在 .env 中填入 Google Apps Script 部署網址');
    }
    const res = await fetch(scriptUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(payload)
    });
    if (!res.ok) {
        throw new Error(`Google Apps Script 回應錯誤 (${res.status})`);
    }
    const data = await res.json().catch(()=>({
            success: true
        }));
    if (data && data.success === false) {
        throw new Error(data.error || 'Google Apps Script 執行失敗');
    }
    return data;
}
async function createFullDatabaseSpreadsheet(accessToken, title = '線上測驗系統資料庫 (Quiz & Test Bank DB)', currentQuestions = [], currentExams = []) {
    const sheetsPayload = Object.keys(DATABASE_TABLE_SCHEMAS).map((tableName, index)=>({
            properties: {
                sheetId: index + 100,
                title: tableName,
                gridProperties: {
                    frozenRowCount: 1,
                    rowCount: 100,
                    columnCount: DATABASE_TABLE_SCHEMAS[tableName].columns.length + 2
                },
                tabColor: {
                    red: index === 4 ? 0.0 : index === 5 ? 0.8 : 0.1,
                    green: index === 4 ? 0.5 : index === 5 ? 0.4 : 0.3,
                    blue: index === 4 ? 0.2 : index === 5 ? 0.0 : 0.8
                }
            }
        }));
    const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            properties: {
                title,
                locale: 'zh_TW',
                autoRecalc: 'ON_CHANGE'
            },
            sheets: sheetsPayload
        })
    });
    if (!createRes.ok) {
        const errorData = await createRes.json().catch(()=>({}));
        throw new Error(errorData.error?.message || `建立 Google 試算表失敗 (${createRes.status})`);
    }
    const createdData = await createRes.json();
    const spreadsheetId = createdData.spreadsheetId;
    const spreadsheetUrl = createdData.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;
    const batchData = generateBatchValues(spreadsheetUrl, currentQuestions, currentExams);
    const writeRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchUpdate`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            valueInputOption: 'USER_ENTERED',
            data: batchData
        })
    });
    if (!writeRes.ok) {
        console.warn('Initial data write returned warning, data may be partially filled.');
    }
    try {
        await applyHeaderFormatting(accessToken, spreadsheetId);
    } catch (err) {
        console.warn('Header styling optional step warning:', err);
    }
    return {
        spreadsheetId,
        spreadsheetUrl
    };
}
function generateBatchValues(spreadsheetUrl, questions, exams, auditLogs = []) {
    const userHeaders = DATABASE_TABLE_SCHEMAS.users.columns.map((c)=>c.label);
    const nowStr = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatSheetTimestamp"])();
    const userRows = [
        userHeaders,
        [
            1,
            'usr_9f8a1b2c',
            1,
            'ADMIN',
            '王敏行 (Admin Wang)',
            'admin_wang',
            '$2b$12$e8Yj62kM1sPqWz0...',
            spreadsheetUrl,
            nowStr,
            '2024/01/01 08:30:00',
            nowStr
        ],
        [
            2,
            'usr_7a3d2e1f',
            1,
            'TEACHER',
            '張語文 (Teacher Chang)',
            'chang_chinese',
            '$2b$12$h3Kz91mN4rTyQx1...',
            spreadsheetUrl,
            nowStr,
            '2024/02/15 10:00:00',
            nowStr
        ],
        [
            3,
            'usr_4c5b6a78',
            1,
            'TEACHER',
            '陳數理 (Teacher Chen)',
            'chen_math',
            '$2b$12$p5Lx82nQ7vBwEz2...',
            spreadsheetUrl,
            nowStr,
            '2024/03/01 14:20:00',
            nowStr
        ]
    ];
    const roleHeaders = DATABASE_TABLE_SCHEMAS.roles.columns.map((c)=>c.label);
    const roleRows = [
        roleHeaders,
        ...INITIAL_ROLES_DATA.map((r)=>[
                r.id,
                r.code,
                r.name,
                r.description,
                r.created_at
            ])
    ];
    const testBankHeaders = DATABASE_TABLE_SCHEMAS.test_bank.columns.map((c)=>c.label);
    const testBankRows = [
        testBankHeaders,
        ...questions.map((q, idx)=>{
            const categoryId = q.categoryId || SUBJECT_TO_CATEGORY_ID[q.subjectId] || 3;
            const optionsStr = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$sheetParser$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatOptionsToJsonObject"])(q.options || q.optionsMap);
            const diffScore = q.difficultyScore ?? (q.difficulty === 'hard' ? 4 : q.difficulty === 'medium' ? 3 : 2);
            return [
                idx + 1,
                q.id,
                q.content,
                optionsStr,
                q.correctAnswer || '',
                q.explanation || '',
                diffScore,
                q.points,
                categoryId,
                q.tags.join(', '),
                q.updatedAt || nowStr,
                q.updatedBy || 1,
                q.time ?? 0
            ];
        })
    ];
    const categoryHeaders = DATABASE_TABLE_SCHEMAS.categories.columns.map((c)=>c.label);
    const categoryRows = [
        categoryHeaders,
        ...INITIAL_CATEGORIES_DATA.map((c)=>[
                c.id,
                c.categories_name,
                c.parent_id,
                c.level,
                c.sort_order
            ])
    ];
    const publishedExams = exams.filter((e)=>e.status === 'published');
    const pubHeaders = DATABASE_TABLE_SCHEMAS.quiz_bank_publish.columns.map((c)=>c.label);
    const pubRows = [
        pubHeaders,
        ...publishedExams.map((e, idx)=>[
                idx + 1,
                e.id,
                e.title,
                e.subject,
                e.difficultyLv,
                e.questionCount,
                e.totalScore,
                e.durationMinutes,
                e.createdAt
            ])
    ];
    const draftExams = exams.filter((e)=>e.status === 'draft');
    const unpubHeaders = DATABASE_TABLE_SCHEMAS.quiz_bank_unpublish.columns.map((c)=>c.label);
    const unpubRows = [
        unpubHeaders,
        ...draftExams.map((e, idx)=>[
                idx + 1,
                e.id,
                e.title,
                e.subject,
                e.difficultyLv,
                e.questionCount,
                e.totalScore,
                e.durationMinutes,
                e.createdAt
            ])
    ];
    const logHeaders = DATABASE_TABLE_SCHEMAS.log.columns.map((c)=>c.label);
    const logRows = [
        logHeaders,
        ...auditLogs.map((l, idx)=>[
                idx + 1,
                l.id,
                l.action,
                l.target,
                l.operator,
                l.timestamp,
                l.status
            ])
    ];
    return [
        {
            range: 'users!A1:K',
            values: userRows
        },
        {
            range: 'roles!A1:E',
            values: roleRows
        },
        {
            range: 'test_bank!A1:M',
            values: testBankRows
        },
        {
            range: 'categories!A1:E',
            values: categoryRows
        },
        {
            range: 'quiz_bank_publish!A1:I',
            values: pubRows
        },
        {
            range: 'quiz_bank_unpublish!A1:I',
            values: unpubRows
        },
        {
            range: 'log!A1:G',
            values: logRows
        }
    ];
}
async function applyHeaderFormatting(accessToken, spreadsheetId) {
    const requests = [
        ...[
            100,
            101,
            102,
            103,
            104,
            105,
            106
        ].map((sheetId)=>({
                repeatCell: {
                    range: {
                        sheetId,
                        startRowIndex: 0,
                        endRowIndex: 1
                    },
                    cell: {
                        userEnteredFormat: {
                            backgroundColor: {
                                red: 0.0,
                                green: 0.29,
                                blue: 0.77
                            },
                            textFormat: {
                                foregroundColor: {
                                    red: 1.0,
                                    green: 1.0,
                                    blue: 1.0
                                },
                                bold: true,
                                fontSize: 10
                            },
                            horizontalAlignment: 'CENTER'
                        }
                    },
                    fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment)'
                }
            }))
    ];
    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            requests
        })
    });
}
async function ensureSpreadsheetTablesExist(accessToken, spreadsheetId) {
    const metaRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?includeGridData=false`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    if (!metaRes.ok) {
        const err = await metaRes.json().catch(()=>({}));
        throw new Error(err.error?.message || `無法讀取試算表資訊 (${metaRes.status})`);
    }
    const metaData = await metaRes.json();
    const existingTitles = new Set((metaData.sheets || []).map((s)=>s.properties?.title));
    const targetSheets = [
        'users',
        'roles',
        'test_bank',
        'categories',
        'quiz_bank_publish',
        'quiz_bank_unpublish',
        'log'
    ];
    const missingSheets = targetSheets.filter((title)=>!existingTitles.has(title));
    if (missingSheets.length > 0) {
        const requests = missingSheets.map((title)=>({
                addSheet: {
                    properties: {
                        title,
                        gridProperties: {
                            rowCount: 200,
                            columnCount: 15
                        }
                    }
                }
            }));
        const addRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                requests
            })
        });
        if (!addRes.ok) {
            const err = await addRes.json().catch(()=>({}));
            throw new Error(err.error?.message || `自動建立工作表失敗 (${addRes.status})`);
        }
        // Write headers for newly created sheets (such as 'log')
        const headerData = missingSheets.filter((title)=>DATABASE_TABLE_SCHEMAS[title]).map((title)=>({
                range: `${title}!A1`,
                values: [
                    DATABASE_TABLE_SCHEMAS[title].columns.map((c)=>c.label)
                ]
            }));
        if (headerData.length > 0) {
            try {
                await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchUpdate`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        valueInputOption: 'USER_ENTERED',
                        data: headerData
                    })
                });
            } catch (e) {
                console.warn('Write initial headers for missing sheets warning:', e);
            }
        }
    }
    return targetSheets;
}
async function syncAllToSpreadsheet(accessToken, spreadsheetId, spreadsheetUrl, questions, exams, auditLogs = []) {
    await ensureSpreadsheetTablesExist(accessToken, spreadsheetId);
    try {
        await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchClear`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ranges: [
                    'test_bank!A1:Z',
                    'quiz_bank_publish!A1:Z',
                    'quiz_bank_unpublish!A1:Z',
                    'categories!A1:Z',
                    'users!A1:Z',
                    'roles!A1:Z',
                    'log!A1:Z'
                ]
            })
        });
    } catch (err) {
        console.warn('Optional batchClear note:', err);
    }
    const batchData = generateBatchValues(spreadsheetUrl, questions, exams, auditLogs);
    const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchUpdate`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            valueInputOption: 'USER_ENTERED',
            data: batchData
        })
    });
    if (!res.ok) {
        const errorData = await res.json().catch(()=>({}));
        throw new Error(errorData.error?.message || `寫入同步資料至 Google 試算表失敗 (${res.status})`);
    }
    const rowsCount = {
        users: 3,
        roles: INITIAL_ROLES_DATA.length,
        test_bank: questions.length,
        categories: INITIAL_CATEGORIES_DATA.length,
        quiz_bank_publish: exams.filter((e)=>e.status === 'published').length,
        quiz_bank_unpublish: exams.filter((e)=>e.status === 'draft').length,
        log: auditLogs.length
    };
    return {
        success: true,
        updatedSheets: [
            'users',
            'roles',
            'test_bank',
            'categories',
            'quiz_bank_publish',
            'quiz_bank_unpublish',
            'log'
        ],
        message: `成功寫入同步：題庫 ${questions.length} 題、已發布試卷 ${rowsCount.quiz_bank_publish} 份、草稿試卷 ${rowsCount.quiz_bank_unpublish} 份、審計日誌 ${rowsCount.log} 筆至 Google 試算表！`,
        rowsCount
    };
}
function parseTableValuesToResult(tableValuesMap, spreadsheetTitle) {
    const categories = [];
    const catRows = tableValuesMap['categories'] || [];
    if (catRows.length > 1) {
        for(let i = 1; i < catRows.length; i++){
            const row = catRows[i];
            if (!row || row.length === 0 || !row[1]) continue;
            const col0 = String(row[0] || '').trim().toLowerCase();
            const col1 = String(row[1] || '').trim().toLowerCase();
            if (col0 === 'id' || col1 === 'categories_name') continue;
            categories.push({
                id: Number(row[0]) || i,
                categories_name: String(row[1] || '').trim(),
                parent_id: Number(row[2]) || 0,
                level: Number(row[3]) || 1,
                sort_order: Number(row[4]) || i
            });
        }
        categories.sort((a, b)=>a.sort_order - b.sort_order);
    }
    const questions = [];
    const testBankRows = tableValuesMap['test_bank'] || [];
    if (testBankRows.length > 1) {
        const headerRow = (testBankRows[0] || []).map((h)=>String(h || '').trim().toLowerCase());
        const findIdx = (names, fallback)=>{
            const idx = headerRow.findIndex((h)=>names.includes(h));
            return idx >= 0 ? idx : fallback;
        };
        const idxTestId = findIdx([
            'test_id'
        ], 1);
        const idxQuestion = findIdx([
            'question'
        ], 2);
        const idxOption = findIdx([
            'option',
            'options'
        ], 3);
        const idxAnswer = findIdx([
            'answer'
        ], 4);
        const idxExplanation = findIdx([
            'explanation'
        ], 5);
        const idxDifficulty = findIdx([
            'difficulty'
        ], 6);
        const idxScore = findIdx([
            'score'
        ], 7);
        const idxCategory = findIdx([
            'category_id'
        ], 8);
        const idxTags = findIdx([
            'taqs',
            'tags'
        ], 9);
        const idxUpdatedAt = findIdx([
            'updated_at',
            'update_time'
        ], 10);
        const idxUpdatedBy = findIdx([
            'updated_by',
            'update_by'
        ], 11);
        const idxTime = headerRow.findIndex((h)=>h === 'time' || h === 'duration');
        for(let i = 1; i < testBankRows.length; i++){
            const row = testBankRows[i];
            if (!row || row.length === 0 || !row[idxQuestion]) continue;
            const col0 = String(row[0] || '').trim().toLowerCase();
            const col1 = String(row[idxTestId] || '').trim().toLowerCase();
            const col2 = String(row[idxQuestion] || '').trim().toLowerCase();
            if (col0 === 'id' || col1 === 'test_id' || col2 === 'question') continue;
            const testId = String(row[idxTestId] || row[0] || `Q-IMPORT-${i}`).trim();
            const content = String(row[idxQuestion] || '').trim();
            const { options: parsedOptions, optionsMap: parsedOptionsMap } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$sheetParser$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseSheetOptionJson"])(row[idxOption]);
            const answer = String(row[idxAnswer] || '').trim();
            const explanation = String(row[idxExplanation] || '').trim();
            const diffNum = parseFloat(String(row[idxDifficulty]));
            let difficulty = 'medium';
            let difficultyScore = 3;
            if (!isNaN(diffNum)) {
                difficultyScore = diffNum;
                if (diffNum >= 4.0) difficulty = 'hard';
                else if (diffNum >= 2.5) difficulty = 'medium';
                else difficulty = 'easy';
            } else {
                const diffLower = String(row[idxDifficulty] || 'medium').toLowerCase();
                if (diffLower === 'hard') {
                    difficulty = 'hard';
                    difficultyScore = 4;
                } else if (diffLower === 'easy') {
                    difficulty = 'easy';
                    difficultyScore = 2;
                } else {
                    difficulty = 'medium';
                    difficultyScore = 3;
                }
            }
            const points = Number(row[idxScore]) || 10;
            const catId = Number(row[idxCategory]) || 3;
            const subjectId = CATEGORY_ID_TO_SUBJECT[catId] || 'math';
            const rawTags = String(row[idxTags] || '');
            const tags = rawTags ? rawTags.split(/[,，、]/).map((t)=>t.trim()).filter(Boolean) : [];
            const updatedAt = String(row[idxUpdatedAt] || new Date().toISOString().split('T')[0]).trim();
            const updatedBy = Number(row[idxUpdatedBy]) || 1;
            const timeVal = idxTime >= 0 ? Number(row[idxTime]) || 0 : row.length > 12 ? Number(row[12]) || 0 : 0;
            let type = 'single';
            if (answer.includes(',') || answer.includes('、') || answer.length > 2) {
                type = 'multiple';
            } else if (parsedOptions.length === 2 && parsedOptions.some((o)=>o.includes('正確') || o.includes('True'))) {
                type = 'true_false';
            }
            questions.push({
                id: testId,
                subjectId,
                type,
                content,
                options: parsedOptions.length > 0 ? parsedOptions : undefined,
                optionsMap: parsedOptionsMap,
                correctAnswer: answer || undefined,
                explanation: explanation || undefined,
                difficulty,
                difficultyScore,
                points,
                time: timeVal,
                tags,
                updatedAt,
                categoryId: catId,
                updatedBy
            });
        }
    }
    const publishedExams = [];
    const pubRows = tableValuesMap['quiz_bank_publish'] || [];
    if (pubRows.length > 1) {
        for(let i = 1; i < pubRows.length; i++){
            const row = pubRows[i];
            if (!row || row.length === 0 || !row[2]) continue;
            const col0 = String(row[0] || '').trim().toLowerCase();
            const col1 = String(row[1] || '').trim().toLowerCase();
            const col2 = String(row[2] || '').trim().toLowerCase();
            if (col0 === 'id' || col1 === 'quiz_id' || col2 === 'quiz_name') continue;
            const quizId = String(row[1] || row[0] || `EXAM-PUB-${i}`).trim();
            const title = String(row[2] || '').trim();
            const subjectName = String(row[3] || '數學').trim();
            const diffMatch = String(row[4] ?? '').match(/(\d+(?:\.\d+)?)/);
            const difficultyLv = diffMatch ? parseFloat(diffMatch[1]) : 3;
            const questionCount = Number(row[5]) || 0;
            const totalScore = Number(row[6]) || 100;
            const durationMinutes = Number(row[7]) || 0;
            const createdAt = String(row[8] || new Date().toISOString().split('T')[0]).trim();
            const rawQuestionIds = String(row[9] || '').trim();
            const questionIds = rawQuestionIds ? rawQuestionIds.split(/[,，、\s]+/).map((s)=>s.trim()).filter(Boolean) : undefined;
            const subjectId = SUBJECT_NAME_MAP[subjectName] || 'math';
            publishedExams.push({
                id: quizId,
                title,
                description: '',
                subject: subjectName,
                subjectId,
                difficultyLv,
                questionCount,
                totalScore,
                durationMinutes,
                createdAt,
                status: 'published',
                examineeCount: 0,
                questionIds
            });
        }
    }
    const draftExams = [];
    const unpubRows = tableValuesMap['quiz_bank_unpublish'] || [];
    if (unpubRows.length > 1) {
        for(let i = 1; i < unpubRows.length; i++){
            const row = unpubRows[i];
            if (!row || row.length === 0 || !row[2]) continue;
            const col0 = String(row[0] || '').trim().toLowerCase();
            const col1 = String(row[1] || '').trim().toLowerCase();
            const col2 = String(row[2] || '').trim().toLowerCase();
            if (col0 === 'id' || col1 === 'quiz_id' || col2 === 'quiz_name') continue;
            const quizId = String(row[1] || row[0] || `EXAM-DRAFT-${i}`).trim();
            const title = String(row[2] || '').trim();
            const subjectName = String(row[3] || '數學').trim();
            const diffMatch = String(row[4] ?? '').match(/(\d+(?:\.\d+)?)/);
            const difficultyLv = diffMatch ? parseFloat(diffMatch[1]) : 3;
            const questionCount = Number(row[5]) || 0;
            const totalScore = Number(row[6]) || 100;
            const durationMinutes = Number(row[7]) || 0;
            const createdAt = String(row[8] || new Date().toISOString().split('T')[0]).trim();
            const rawQuestionIds = String(row[9] || '').trim();
            const questionIds = rawQuestionIds ? rawQuestionIds.split(/[,，、\s]+/).map((s)=>s.trim()).filter(Boolean) : undefined;
            const subjectId = SUBJECT_NAME_MAP[subjectName] || 'math';
            draftExams.push({
                id: quizId,
                title,
                description: '',
                subject: subjectName,
                subjectId,
                difficultyLv,
                questionCount,
                totalScore,
                durationMinutes,
                createdAt,
                status: 'draft',
                examineeCount: 0,
                questionIds
            });
        }
    }
    const auditLogs = [];
    const logRows = tableValuesMap['log'] || [];
    // Verify that the header of 'log' actually matches log schema (not gviz fallback to first sheet 'users')
    const isGenuineLogSheet = logRows.length > 0 && (String(logRows[0]?.[1] || '').toLowerCase() === 'log_id' || String(logRows[0]?.[2] || '').toLowerCase() === 'action');
    if (isGenuineLogSheet && logRows.length > 1) {
        for(let i = 1; i < logRows.length; i++){
            const row = logRows[i];
            if (!row || row.length === 0 || !row[1] && !row[2]) continue;
            const col0 = String(row[0] || '').trim().toLowerCase();
            const col1 = String(row[1] || '').trim().toLowerCase();
            const col2 = String(row[2] || '').trim().toLowerCase();
            if (col0 === 'id' || col1 === 'log_id' || col2 === 'action') continue;
            const logId = String(row[1] || row[0] || `#LOG-${i}`).trim();
            const action = String(row[2] || '').trim();
            const target = String(row[3] || '').trim();
            const operator = String(row[4] || '王敏行 (Admin Wang)').trim();
            const timestamp = String(row[5] || '').trim();
            const rawStatus = String(row[6] || 'success').trim().toLowerCase();
            const status = rawStatus === 'warning' ? 'warning' : rawStatus === 'error' ? 'error' : 'success';
            auditLogs.push({
                id: logId,
                action,
                target,
                operator,
                timestamp,
                status
            });
        }
        // Sort newest first
        auditLogs.reverse();
    }
    const roles = parseRolesFromSheetRows(tableValuesMap['roles'] || []);
    const users = parseUsersFromSheetRows(tableValuesMap['users'] || [], roles);
    const allExams = [
        ...publishedExams,
        ...draftExams
    ];
    const stats = {
        test_bank: questions.length,
        quiz_bank_publish: publishedExams.length,
        quiz_bank_unpublish: draftExams.length,
        categories: categories.length,
        users: users.length,
        roles: roles.length,
        log: auditLogs.length
    };
    return {
        success: true,
        spreadsheetTitle,
        questions,
        publishedExams,
        draftExams,
        allExams,
        categories,
        users,
        roles,
        auditLogs,
        stats,
        message: `成功從「${spreadsheetTitle}」讀取 ${categories.length} 個科目分類、${questions.length} 題題庫試題、${publishedExams.length} 份公用試卷、${draftExams.length} 份草稿試卷！`
    };
}
function parseRolesFromSheetRows(roleRows) {
    if (!roleRows || roleRows.length === 0) {
        return [
            ...INITIAL_ROLES_DATA
        ];
    }
    const headerRow = (roleRows[0] || []).map((h)=>String(h || '').trim().toLowerCase());
    const findIdx = (names, fallback)=>{
        const idx = headerRow.findIndex((h)=>names.includes(h));
        return idx >= 0 ? idx : fallback;
    };
    const idxId = findIdx([
        'id'
    ], 0);
    const idxCode = findIdx([
        'code',
        'role_code'
    ], 1);
    const idxName = findIdx([
        'name',
        'role_name'
    ], 2);
    const idxDesc = findIdx([
        'description',
        'desc'
    ], 3);
    const idxCreatedAt = findIdx([
        'created_at'
    ], 4);
    const roles = [];
    for(let i = 0; i < roleRows.length; i++){
        const row = roleRows[i];
        if (!row || row.length === 0) continue;
        const rawCode = String(row[idxCode] ?? '').trim();
        const rawName = String(row[idxName] ?? '').trim();
        if (!rawCode && !rawName) continue;
        if (rawCode.toLowerCase() === 'code' || rawName.toLowerCase() === 'name' || String(row[idxId] ?? '').trim().toLowerCase() === 'id') {
            continue;
        }
        roles.push({
            id: Number(row[idxId]) || roles.length + 1,
            code: rawCode,
            name: rawName || rawCode,
            description: String(row[idxDesc] ?? '').trim(),
            created_at: String(row[idxCreatedAt] ?? '').trim() || undefined
        });
    }
    return roles.length > 0 ? roles : [
        ...INITIAL_ROLES_DATA
    ];
}
function parseUsersFromSheetRows(userRows, roles = INITIAL_ROLES_DATA) {
    if (!userRows || userRows.length === 0) return [];
    const headerRow = (userRows[0] || []).map((h)=>String(h || '').trim().toLowerCase());
    const findIdx = (names, fallback)=>{
        const idx = headerRow.findIndex((h)=>names.includes(h));
        return idx >= 0 ? idx : fallback;
    };
    const idxId = findIdx([
        'id'
    ], 0);
    const idxUuid = findIdx([
        'uuid'
    ], 1);
    const idxStatus = findIdx([
        'status'
    ], 2);
    const idxRole = findIdx([
        'role'
    ], 3);
    const idxName = findIdx([
        'name',
        'nickname'
    ], 4);
    const idxIdentifier = findIdx([
        'identifier',
        'account',
        'username'
    ], 5);
    const idxCredential = findIdx([
        'credential',
        'password'
    ], 6);
    const idxSheetUrl = findIdx([
        'google_sheet_url',
        'sheet_url'
    ], 7);
    const idxLastLogin = findIdx([
        'last_login_at'
    ], 8);
    const idxCreatedAt = findIdx([
        'created_at'
    ], 9);
    const idxUpdatedAt = findIdx([
        'updated_at'
    ], 10);
    const users = [];
    for(let i = 0; i < userRows.length; i++){
        const row = userRows[i];
        if (!row || row.length === 0) continue;
        const rawIdentifier = String(row[idxIdentifier] ?? '').trim();
        const rawName = String(row[idxName] ?? '').trim();
        const rawUuid = String(row[idxUuid] ?? '').trim();
        if (!rawIdentifier && !rawName && !rawUuid) continue;
        // Skip header row
        if (rawIdentifier.toLowerCase() === 'identifier' || String(row[idxCredential] ?? '').trim().toLowerCase() === 'credential' || rawUuid.toLowerCase() === 'uuid') {
            continue;
        }
        const rawStatusStr = String(row[idxStatus] ?? '').trim();
        const parsedStatus = rawStatusStr === '0' ? 0 : rawStatusStr === '2' ? 2 : rawStatusStr === '1' ? 1 : Number.isFinite(Number(rawStatusStr)) && rawStatusStr !== '' ? Number(rawStatusStr) : 1;
        const rawRoleCode = String(row[idxRole] ?? 'USER').trim() || 'USER';
        const matchedRole = roles.find((r)=>r.code.toUpperCase() === rawRoleCode.toUpperCase()) || INITIAL_ROLES_DATA.find((r)=>r.code.toUpperCase() === rawRoleCode.toUpperCase());
        const displayName = rawName || rawIdentifier || `User #${i}`;
        users.push({
            id: Number(row[idxId]) || users.length + 1,
            uuid: rawUuid || `usr_${i}`,
            status: parsedStatus,
            role: rawRoleCode,
            roleName: matchedRole?.name || rawRoleCode,
            roleDescription: matchedRole?.description || '',
            name: displayName,
            nickname: displayName,
            identifier: rawIdentifier,
            credential: String(row[idxCredential] ?? '').trim(),
            google_sheet_URL: String(row[idxSheetUrl] ?? '').trim() || undefined,
            last_login_at: String(row[idxLastLogin] ?? '').trim() || undefined,
            created_at: String(row[idxCreatedAt] ?? '').trim() || undefined,
            updated_at: String(row[idxUpdatedAt] ?? '').trim() || undefined
        });
    }
    return users;
}
/**
 * 解析標準 CSV 字串為二維陣列 (支援引號轉義，避免 gviz JSON 將混合型態密碼/帳號轉成 null)
 */ function parseCsvTo2DArray(csvText) {
    const rows = [];
    let currentRow = [];
    let currentCell = '';
    let inQuotes = false;
    for(let i = 0; i < csvText.length; i++){
        const ch = csvText[i];
        const nextCh = csvText[i + 1];
        if (inQuotes) {
            if (ch === '"' && nextCh === '"') {
                currentCell += '"';
                i++;
            } else if (ch === '"') {
                inQuotes = false;
            } else {
                currentCell += ch;
            }
        } else {
            if (ch === '"') {
                inQuotes = true;
            } else if (ch === ',') {
                currentRow.push(currentCell);
                currentCell = '';
            } else if (ch === '\r' && nextCh === '\n') {
                currentRow.push(currentCell);
                rows.push(currentRow);
                currentRow = [];
                currentCell = '';
                i++;
            } else if (ch === '\n' || ch === '\r') {
                currentRow.push(currentCell);
                rows.push(currentRow);
                currentRow = [];
                currentCell = '';
            } else {
                currentCell += ch;
            }
        }
    }
    if (currentCell !== '' || currentRow.length > 0) {
        currentRow.push(currentCell);
        rows.push(currentRow);
    }
    return rows;
}
async function fetchUsersAndRolesFromSheet(spreadsheetId, accessToken) {
    const targetId = spreadsheetId || (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$sheetParser$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["extractSpreadsheetId"])(getEnvConfiguredSpreadsheetUrl()) || (("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null);
    if (!targetId) {
        throw new Error('尚未設定 Google Sheet 資料庫網址，請確認 .env 中的 VITE_GOOGLE_SHEET_URL 設定');
    }
    // 1. 若有 OAuth accessToken，優先透過 Google Sheets REST API 讀取
    if (accessToken) {
        try {
            const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${targetId}/values:batchGet?ranges=${encodeURIComponent('users!A1:Z')}&ranges=${encodeURIComponent('roles!A1:Z')}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            if (res.ok) {
                const data = await res.json();
                const valueRanges = data.valueRanges || [];
                const map = {};
                valueRanges.forEach((vr)=>{
                    const name = (vr.range || '').split('!')[0].replace(/['"]/g, '');
                    map[name] = vr.values || [];
                });
                const roles = parseRolesFromSheetRows(map['roles'] || []);
                const users = parseUsersFromSheetRows(map['users'] || [], roles);
                return {
                    users,
                    roles
                };
            }
        } catch (e) {
            console.warn('REST API fetch users/roles fallback to gviz:', e);
        }
    }
    // 2. 透過公開 gviz CSV 端點讀取 (避免混合數字/文字密碼被 gviz JSON 丟棄)
    const sheetRowsMap = {};
    await Promise.all([
        'users',
        'roles'
    ].map(async (sheetName)=>{
        try {
            const csvUrl = `https://docs.google.com/spreadsheets/d/${targetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;
            const res = await fetch(csvUrl);
            if (res.ok) {
                const csvText = await res.text();
                if (csvText && !csvText.trim().startsWith('<!DOCTYPE html')) {
                    sheetRowsMap[sheetName] = parseCsvTo2DArray(csvText);
                    return;
                }
            }
        } catch (e) {
            console.warn(`CSV fetch for ${sheetName} failed, trying JSON gviz:`, e);
        }
        // Fallback to JSON gviz
        try {
            const jsonUrl = `https://docs.google.com/spreadsheets/d/${targetId}/gviz/tq?tqx=out:json&headers=1&sheet=${encodeURIComponent(sheetName)}`;
            const res = await fetch(jsonUrl);
            if (!res.ok) return;
            const text = await res.text();
            const match = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]+)\);?\s*$/);
            if (!match || !match[1]) return;
            const json = JSON.parse(match[1]);
            if (json.status !== 'ok' || !json.table) return;
            const cols = (json.table.cols || []).map((c)=>c?.label ? String(c.label).trim() : '');
            const rows = (json.table.rows || []).map((r)=>(r.c || []).map((cell)=>{
                    if (!cell) return '';
                    if (cell.f !== undefined && cell.f !== null) return String(cell.f);
                    if (cell.v !== undefined && cell.v !== null) return String(cell.v);
                    return '';
                }));
            const hasColLabels = cols.some((c)=>c !== '');
            sheetRowsMap[sheetName] = hasColLabels ? [
                cols,
                ...rows
            ] : rows;
        } catch (e) {
            console.warn(`JSON gviz fetch for ${sheetName} failed:`, e);
        }
    }));
    if (!sheetRowsMap['users'] || sheetRowsMap['users'].length === 0) {
        throw new Error('無法讀取 Google Sheet 中的 users 資料表，請確認試算表權限或網路連線');
    }
    const roles = parseRolesFromSheetRows(sheetRowsMap['roles'] || []);
    const users = parseUsersFromSheetRows(sheetRowsMap['users'] || [], roles);
    return {
        users,
        roles
    };
}
async function authenticateUserFromSheet(identifier, credential, spreadsheetId, accessToken) {
    const cleanId = identifier.trim();
    const cleanCred = credential.trim();
    if (!cleanId || !cleanCred) {
        return {
            success: false,
            error: '請輸入帳號與密碼'
        };
    }
    const { users, roles } = await fetchUsersAndRolesFromSheet(spreadsheetId, accessToken);
    if (users.length === 0) {
        return {
            success: false,
            error: '資料庫 users 資料表中尚無任何帳號紀錄',
            allRoles: roles
        };
    }
    const matchedUser = users.find((u)=>(u.identifier || '').trim() === cleanId);
    if (!matchedUser) {
        return {
            success: false,
            error: `查無此帳號「${cleanId}」，請確認帳號是否輸入正確`,
            allRoles: roles
        };
    }
    if ((matchedUser.credential || '').trim() !== cleanCred) {
        return {
            success: false,
            error: '密碼輸入錯誤，請重新確認密碼',
            allRoles: roles
        };
    }
    // 檢查帳號狀態: 0=停用, 1=啟用, 2=未驗證
    if (matchedUser.status === 0) {
        return {
            success: false,
            error: `帳號「${matchedUser.name || cleanId}」目前狀態為【停用 (status=0)】，無法登入系統，請聯繫管理員`,
            allRoles: roles
        };
    }
    if (matchedUser.status === 2) {
        return {
            success: false,
            error: `帳號「${matchedUser.name || cleanId}」目前狀態為【未驗證 (status=2)】，請先完成驗證後再登入`,
            allRoles: roles
        };
    }
    const roleInfo = roles.find((r)=>r.code.toUpperCase() === String(matchedUser.role).toUpperCase()) || INITIAL_ROLES_DATA.find((r)=>r.code.toUpperCase() === String(matchedUser.role).toUpperCase()) || {
        id: 0,
        code: String(matchedUser.role),
        name: matchedUser.roleName || String(matchedUser.role),
        description: matchedUser.roleDescription || ''
    };
    const authenticatedUser = {
        ...matchedUser,
        roleName: roleInfo.name,
        roleDescription: roleInfo.description,
        last_login_at: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatSheetTimestamp"])()
    };
    return {
        success: true,
        user: authenticatedUser,
        roleInfo,
        allRoles: roles
    };
}
async function readPublicSpreadsheetViaGviz(spreadsheetId) {
    const targetTables = [
        'categories',
        'test_bank',
        'quiz_bank_publish',
        'quiz_bank_unpublish',
        'users',
        'roles',
        'log'
    ];
    const tableValuesMap = {};
    await Promise.all(targetTables.map(async (sheetName)=>{
        try {
            const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json&headers=1&sheet=${encodeURIComponent(sheetName)}`;
            const res = await fetch(url);
            if (!res.ok) return;
            const text = await res.text();
            const match = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]+)\);?\s*$/);
            if (!match || !match[1]) return;
            const json = JSON.parse(match[1]);
            if (json.status !== 'ok' || !json.table) return;
            const hasColLabels = (json.table.cols || []).some((c)=>c?.label && String(c.label).trim() !== '');
            const cols = (json.table.cols || []).map((c)=>c?.label ? String(c.label).trim() : '');
            const rows = (json.table.rows || []).map((r)=>(r.c || []).map((cell)=>{
                    if (!cell) return '';
                    if (cell.f !== undefined && cell.f !== null) return cell.f;
                    if (cell.v !== undefined && cell.v !== null) return cell.v;
                    return '';
                }));
            tableValuesMap[sheetName] = hasColLabels ? [
                cols,
                ...rows
            ] : rows;
        } catch (e) {
            console.warn(`Failed to fetch public sheet ${sheetName}:`, e);
        }
    }));
    const hasData = Object.values(tableValuesMap).some((rows)=>rows && rows.length > 0);
    if (!hasData) {
        throw new Error('無法讀取試算表內容，請確認 VITE_GOOGLE_SHEET_URL 正確且已開啟「知道連結的任何人皆可檢視」權限，或先完成 Google 帳號授權。');
    }
    return parseTableValuesToResult(tableValuesMap, 'Google 試算表 (.env)');
}
async function readAllTablesFromSpreadsheet(accessToken, spreadsheetId) {
    if (!accessToken) {
        return readPublicSpreadsheetViaGviz(spreadsheetId);
    }
    const metaRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?includeGridData=false`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    if (!metaRes.ok) {
        // Fallback to public gviz if token expired or unauthorized
        try {
            return await readPublicSpreadsheetViaGviz(spreadsheetId);
        } catch  {
            const err = await metaRes.json().catch(()=>({}));
            throw new Error(err.error?.message || `無法讀取試算表資訊 (${metaRes.status})`);
        }
    }
    const meta = await metaRes.json();
    const spreadsheetTitle = meta.properties?.title || 'Google 試算表';
    const existingSheetTitles = new Set((meta.sheets || []).map((s)=>s.properties?.title));
    // If 'log' sheet doesn't exist yet and we have a valid accessToken, auto-create it and write header
    if (!existingSheetTitles.has('log')) {
        try {
            await ensureSpreadsheetTablesExist(accessToken, spreadsheetId);
            existingSheetTitles.add('log');
        } catch (e) {
            console.warn('Auto-create log sheet skipped:', e);
        }
    }
    const targetTables = [
        'test_bank',
        'quiz_bank_publish',
        'quiz_bank_unpublish',
        'categories',
        'users',
        'roles',
        'log'
    ];
    const validRanges = targetTables.filter((table)=>existingSheetTitles.has(table)).map((table)=>`${table}!A1:Z`);
    if (validRanges.length === 0) {
        throw new Error(`試算表「${spreadsheetTitle}」中尚未包含題庫資料表 (test_bank、quiz_bank 等)。請先執行「立即同步至試算表」建立並寫入初始架構。`);
    }
    const queryParams = validRanges.map((r)=>`ranges=${encodeURIComponent(r)}`).join('&');
    const batchGetRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet?${queryParams}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    if (!batchGetRes.ok) {
        const err = await batchGetRes.json().catch(()=>({}));
        throw new Error(err.error?.message || `讀取試算表列資料失敗 (${batchGetRes.status})`);
    }
    const batchGetData = await batchGetRes.json();
    const valueRanges = batchGetData.valueRanges || [];
    const tableValuesMap = {};
    valueRanges.forEach((vr)=>{
        const rangeName = (vr.range || '').split('!')[0].replace(/['"]/g, '');
        tableValuesMap[rangeName] = vr.values || [];
    });
    return parseTableValuesToResult(tableValuesMap, spreadsheetTitle);
}
async function fetchSpreadsheetStats(accessToken, spreadsheetId) {
    const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?includeGridData=false`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    if (!res.ok) {
        const err = await res.json().catch(()=>({}));
        throw new Error(err.error?.message || `無法讀取試算表資訊 (${res.status})`);
    }
    const data = await res.json();
    const title = data.properties?.title || 'Google 試算表';
    const sheets = (data.sheets || []).map((s)=>({
            name: s.properties?.title || '',
            rowCount: s.properties?.gridProperties?.rowCount || 0,
            columnCount: s.properties?.gridProperties?.columnCount || 0
        }));
    return {
        title,
        sheets
    };
}
async function appendUserToSpreadsheet(accessToken, spreadsheetId, user, rowIndex) {
    const nowStr = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatSheetTimestamp"])();
    const rowValues = [
        rowIndex,
        user.uuid,
        user.status ?? 1,
        user.role,
        user.name || user.nickname,
        user.identifier || '',
        user.credential || '',
        user.google_sheet_URL || '',
        user.last_login_at || '',
        user.created_at || nowStr,
        user.updated_at || nowStr
    ];
    const scriptUrl = getEnvConfiguredScriptUrl();
    if (scriptUrl) {
        try {
            await postToGasScript({
                action: 'appendRow',
                sheetName: 'users',
                row: rowValues
            });
            return {
                success: true,
                message: `成功透過 GAS 將帳號「${user.identifier}」寫入 users 資料表！`
            };
        } catch (gasErr) {
            console.warn('GAS appendUser error, fallback to REST API:', gasErr);
        }
    }
    if (!accessToken) {
        throw new Error('未授權 Google 帳號且未配置 GAS 寫入腳本，無法寫入 users 資料表');
    }
    const range = `users!A${rowIndex + 1}:K${rowIndex + 1}`;
    const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}?valueInputOption=USER_ENTERED`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            range,
            values: [
                rowValues
            ]
        })
    });
    if (!res.ok) {
        const err = await res.json().catch(()=>({}));
        throw new Error(err.error?.message || `寫入 users 失敗 (${res.status})`);
    }
    return {
        success: true,
        message: `成功將帳號「${user.identifier}」寫入 Google 試算表 users 資料表！`
    };
}
async function appendQuestionToSpreadsheet(accessToken, spreadsheetId, question, rowIndex, userId = 1) {
    const categoryId = question.categoryId || SUBJECT_TO_CATEGORY_ID[question.subjectId] || 3;
    const optionsStr = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$sheetParser$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatOptionsToJsonObject"])(question.options || question.optionsMap);
    const diffScore = question.difficultyScore ?? (question.difficulty === 'hard' ? 4 : question.difficulty === 'medium' ? 3 : 2);
    const tagsStr = question.tags.join(', ');
    const nowTimestamp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatSheetTimestamp"])();
    const rowValues = [
        rowIndex,
        question.id,
        question.content,
        optionsStr,
        question.correctAnswer || '',
        question.explanation || '',
        diffScore,
        question.points,
        categoryId,
        tagsStr,
        question.updatedAt || nowTimestamp,
        userId,
        question.time ?? 0
    ];
    const scriptUrl = getEnvConfiguredScriptUrl();
    if (scriptUrl) {
        await postToGasScript({
            action: 'upsertRow',
            sheetName: 'test_bank',
            headers: DATABASE_TABLE_SCHEMAS.test_bank.columns.map((c)=>c.label),
            keyColumnIndex: 1,
            keyValue: question.id,
            rowValues
        });
        return {
            success: true,
            message: `題目 [${question.id}] 已透過 GAS 成功寫入 Google 試算表 test_bank 表！`
        };
    }
    if (!accessToken) {
        throw new Error('請在 .env 設定 VITE_GOOGLE_SCRIPT_URL 以免登入直接寫入試算表');
    }
    await ensureSpreadsheetTablesExist(accessToken, spreadsheetId);
    const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/test_bank!A:M:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            values: [
                rowValues
            ]
        })
    });
    if (!res.ok) {
        const err = await res.json().catch(()=>({}));
        throw new Error(err.error?.message || `寫入題目至 Google 試算表失敗 (${res.status})`);
    }
    return {
        success: true,
        message: `題目 [${question.id}] 已成功寫入 Google 試算表 test_bank 表！`
    };
}
async function appendExamToSpreadsheet(accessToken, spreadsheetId, exam, rowIndex) {
    const targetSheet = exam.status === 'published' ? 'quiz_bank_publish' : 'quiz_bank_unpublish';
    const nowTimestamp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatSheetTimestamp"])();
    const rowValues = [
        rowIndex,
        exam.id,
        exam.title,
        exam.subject,
        exam.difficultyLv,
        exam.questionCount,
        exam.totalScore,
        exam.durationMinutes,
        nowTimestamp,
        exam.questionIds ? exam.questionIds.join(', ') : ''
    ];
    const scriptUrl = getEnvConfiguredScriptUrl();
    if (scriptUrl) {
        await postToGasScript({
            action: 'appendRow',
            sheetName: targetSheet,
            headers: [
                ...DATABASE_TABLE_SCHEMAS[targetSheet].columns.map((c)=>c.label),
                'test_id'
            ],
            rowValues
        });
        return {
            success: true,
            message: `考卷 [${exam.id}] 已透過 GAS 成功寫入 Google 試算表 ${targetSheet}！`
        };
    }
    if (!accessToken) {
        throw new Error('請在 .env 設定 VITE_GOOGLE_SCRIPT_URL 以免登入直接寫入試算表');
    }
    await ensureSpreadsheetTablesExist(accessToken, spreadsheetId);
    const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${targetSheet}!A:J:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            values: [
                rowValues
            ]
        })
    });
    if (!res.ok) {
        const err = await res.json().catch(()=>({}));
        throw new Error(err.error?.message || `寫入考卷至 Google 試算表失敗 (${res.status})`);
    }
    return {
        success: true,
        message: `考卷 [${exam.id}] 已成功寫入 Google 試算表 ${targetSheet}！`
    };
}
async function syncExamsOnlyToSpreadsheet(accessToken, spreadsheetId, exams) {
    const publishedExams = exams.filter((e)=>e.status === 'published');
    const pubHeaders = [
        ...DATABASE_TABLE_SCHEMAS.quiz_bank_publish.columns.map((c)=>c.label),
        'test_id'
    ];
    const pubRows = [
        pubHeaders,
        ...publishedExams.map((e, idx)=>[
                idx + 1,
                e.id,
                e.title,
                e.subject,
                e.difficultyLv,
                e.questionCount,
                e.totalScore,
                e.durationMinutes,
                e.createdAt,
                e.questionIds ? e.questionIds.join(', ') : ''
            ])
    ];
    const draftExams = exams.filter((e)=>e.status === 'draft');
    const unpubHeaders = [
        ...DATABASE_TABLE_SCHEMAS.quiz_bank_unpublish.columns.map((c)=>c.label),
        'test_id'
    ];
    const unpubRows = [
        unpubHeaders,
        ...draftExams.map((e, idx)=>[
                idx + 1,
                e.id,
                e.title,
                e.subject,
                e.difficultyLv,
                e.questionCount,
                e.totalScore,
                e.durationMinutes,
                e.createdAt,
                e.questionIds ? e.questionIds.join(', ') : ''
            ])
    ];
    const scriptUrl = getEnvConfiguredScriptUrl();
    if (scriptUrl) {
        await postToGasScript({
            action: 'replaceSheets',
            sheets: [
                {
                    sheetName: 'quiz_bank_publish',
                    rows: pubRows
                },
                {
                    sheetName: 'quiz_bank_unpublish',
                    rows: unpubRows
                }
            ]
        });
        return;
    }
    if (!accessToken) {
        throw new Error('請在 .env 設定 VITE_GOOGLE_SCRIPT_URL 以免登入直接更新試算表');
    }
    try {
        await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchClear`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ranges: [
                    'quiz_bank_publish!A1:Z',
                    'quiz_bank_unpublish!A1:Z'
                ]
            })
        });
    } catch (e) {
        console.warn('Batch clear ignored:', e);
    }
    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchUpdate`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            valueInputOption: 'USER_ENTERED',
            data: [
                {
                    range: 'quiz_bank_publish!A1:J',
                    values: pubRows
                },
                {
                    range: 'quiz_bank_unpublish!A1:J',
                    values: unpubRows
                }
            ]
        })
    });
}
async function deleteRowsFromSpreadsheetViaGas(sheetNames, keyColumnIndex, idsToDelete) {
    const scriptUrl = getEnvConfiguredScriptUrl();
    if (!scriptUrl) return;
    await postToGasScript({
        action: 'deleteRows',
        sheetNames,
        keyColumnIndex,
        idsToDelete
    });
}
async function appendLogToSpreadsheet(accessToken, spreadsheetId, logEntry, rowIndex) {
    const rowValues = [
        rowIndex,
        logEntry.id,
        logEntry.action,
        logEntry.target,
        logEntry.operator,
        logEntry.timestamp,
        logEntry.status
    ];
    const scriptUrl = getEnvConfiguredScriptUrl();
    if (scriptUrl) {
        await postToGasScript({
            action: 'appendRow',
            sheetName: 'log',
            headers: DATABASE_TABLE_SCHEMAS.log.columns.map((c)=>c.label),
            rowValues
        });
        return {
            success: true,
            message: `日誌 [${logEntry.id}] 已透過 GAS 寫入 Google 試算表 log 分頁！`
        };
    }
    if (!accessToken) {
        return {
            success: false,
            message: '未設定 GAS 或 OAuth Token，略過雲端日誌寫入'
        };
    }
    await ensureSpreadsheetTablesExist(accessToken, spreadsheetId);
    const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/log!A:G:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            values: [
                rowValues
            ]
        })
    });
    if (!res.ok) {
        const err = await res.json().catch(()=>({}));
        throw new Error(err.error?.message || `寫入操作日誌至 Google 試算表 log 分頁失敗 (${res.status})`);
    }
    return {
        success: true,
        message: `日誌 [${logEntry.id}] 已寫入 Google 試算表 log 分頁！`
    };
}
}),
"[project]/src/utils/formatters.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatSecondsToMmSs",
    ()=>formatSecondsToMmSs,
    "formatSheetTimestamp",
    ()=>formatSheetTimestamp,
    "formatTime",
    ()=>formatTime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useCountdown$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useCountdown.ts [app-ssr] (ecmascript)");
;
function formatSheetTimestamp(date = new Date()) {
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const hh = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
    return `${y}/${m}/${d} ${hh}:${mm}:${ss}`;
}
function formatTime(totalSec) {
    const safe = Math.max(0, Math.floor(totalSec));
    const minutes = Math.floor(safe / 60);
    const seconds = safe % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
const formatSecondsToMmSs = formatTime;
;
}),
"[project]/src/utils/sheetParser.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
]})(),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

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
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

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
"[project]/firebase-applet-config.json.[json].cjs [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

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
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0v291f1y8fii7._.js.map