(()=>{"use strict";(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/exam/[examId]/_components/ExamClient.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ExamClient",
    ()=>ExamClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$scoreCalculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/scoreCalculator.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$ExamSessionContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/ExamSessionContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$exam$2f5b$examId$5d2f$_components$2f$ExamHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/exam/[examId]/_components/ExamHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$exam$2f5b$examId$5d2f$_components$2f$PauseOverlay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/exam/[examId]/_components/PauseOverlay.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$exam$2f5b$examId$5d2f$_components$2f$QuestionDisplay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/exam/[examId]/_components/QuestionDisplay.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$exam$2f5b$examId$5d2f$_components$2f$QuestionMap$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/exam/[examId]/_components/QuestionMap.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$exam$2f5b$examId$5d2f$_components$2f$SubmitDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/exam/[examId]/_components/SubmitDialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$exam$2f$result$2f5b$sessionId$5d2f$_components$2f$ScoreBanner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/exam/result/[sessionId]/_components/ScoreBanner.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
function ExamClient({ exam }) {
    _s();
    const { state, ready, storageWarning, ...actions } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$ExamSessionContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useExamSession"])(exam);
    const [mapOpen, setMapOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [submitOpen, setSubmitOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [panelOpen, setPanelOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const refs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const userScrolledRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const restoredRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const answered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$scoreCalculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["countAnswered"])(exam, state.answers);
    const navigate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ExamClient.useCallback[navigate]": (index)=>{
            actions.goTo(index);
            setMapOpen(false);
            const id = exam.questions[index]?.id;
            if (id) {
                document.getElementById(`question-${id}`)?.scrollIntoView?.({
                    behavior: "smooth",
                    block: "start"
                });
            }
        }
    }["ExamClient.useCallback[navigate]"], [
        actions,
        exam.questions
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ExamClient.useEffect": ()=>{
            const onScroll = {
                "ExamClient.useEffect.onScroll": ()=>{
                    userScrolledRef.current = true;
                }
            }["ExamClient.useEffect.onScroll"];
            window.addEventListener("scroll", onScroll, {
                passive: true
            });
            return ({
                "ExamClient.useEffect": ()=>window.removeEventListener("scroll", onScroll)
            })["ExamClient.useEffect"];
        }
    }["ExamClient.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ExamClient.useEffect": ()=>{
            if (!ready || restoredRef.current) return;
            restoredRef.current = true;
            const id = exam.questions[state.currentIndex]?.id;
            if (id) {
                document.getElementById(`question-${id}`)?.scrollIntoView?.({
                    block: "start"
                });
            }
        }
    }["ExamClient.useEffect"], [
        ready,
        state.currentIndex,
        exam.questions
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ExamClient.useEffect": ()=>{
            if (typeof IntersectionObserver === "undefined") return;
            const observer = new IntersectionObserver({
                "ExamClient.useEffect": (entries)=>{
                    if (!userScrolledRef.current) return;
                    const visible = entries.filter({
                        "ExamClient.useEffect": (entry)=>entry.isIntersecting
                    }["ExamClient.useEffect"]).sort({
                        "ExamClient.useEffect": (a, b)=>a.boundingClientRect.top - b.boundingClientRect.top
                    }["ExamClient.useEffect"])[0];
                    if (!visible) return;
                    const index = Number(visible.target.dataset.index);
                    if (!Number.isNaN(index)) actions.goTo(index);
                }
            }["ExamClient.useEffect"], {
                rootMargin: "-100px 0px -55% 0px",
                threshold: 0
            });
            refs.current.forEach({
                "ExamClient.useEffect": (element)=>{
                    if (element) observer.observe(element);
                }
            }["ExamClient.useEffect"]);
            return ({
                "ExamClient.useEffect": ()=>observer.disconnect()
            })["ExamClient.useEffect"];
        }
    }["ExamClient.useEffect"], [
        actions,
        exam.questions.length
    ]);
    function handleReset() {
        if (!window.confirm("確定要重新測試嗎？答案、標註與計時都會重置。")) return;
        actions.reset();
        setMapOpen(false);
        setSubmitOpen(false);
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    function handleConfirmSubmit() {
        setSubmitOpen(false);
        actions.submit();
        window.scrollTo({
            top: 0
        });
    }
    if (!ready) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid min-h-screen place-items-center text-sm text-[#5b6673]",
            children: "載入作答進度…"
        }, void 0, false, {
            fileName: "[project]/src/app/exam/[examId]/_components/ExamClient.tsx",
            lineNumber: 91,
            columnNumber: 12
        }, this);
    }
    if (state.status === "submitted") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$exam$2f$result$2f5b$sessionId$5d2f$_components$2f$ScoreBanner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScoreBanner"], {
            exam: exam,
            answered: answered,
            total: exam.questions.length,
            autoSubmitted: state.remainingSec === 0,
            answers: state.answers,
            onReset: handleReset
        }, void 0, false, {
            fileName: "[project]/src/app/exam/[examId]/_components/ExamClient.tsx",
            lineNumber: 96,
            columnNumber: 7
        }, this);
    }
    const total = exam.questions.length;
    const current = state.currentIndex;
    const overlayOpen = mapOpen || submitOpen || state.status === "paused";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen pb-20 lg:pb-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                inert: overlayOpen || undefined,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$exam$2f5b$examId$5d2f$_components$2f$ExamHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ExamHeader"], {
                        exam: exam,
                        remainingSec: state.remainingSec,
                        answered: answered,
                        total: total,
                        running: state.status === "running",
                        onPause: actions.pause,
                        onSubmit: ()=>setSubmitOpen(true)
                    }, void 0, false, {
                        fileName: "[project]/src/app/exam/[examId]/_components/ExamClient.tsx",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this),
                    storageWarning ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "exam-shell mt-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "border border-[#d8b55a] bg-[#fff4d1] px-3 py-2 text-xs text-[#7a5400]",
                            children: "瀏覽器無法使用本機儲存，重新整理後作答進度可能遺失。"
                        }, void 0, false, {
                            fileName: "[project]/src/app/exam/[examId]/_components/ExamClient.tsx",
                            lineNumber: 126,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/exam/[examId]/_components/ExamClient.tsx",
                        lineNumber: 125,
                        columnNumber: 11
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "exam-shell mt-4 grid gap-4 md:grid-cols-[minmax(0,1fr)_220px] lg:grid-cols-[minmax(0,1fr)_264px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                                className: "space-y-3",
                                children: [
                                    exam.questions.map((question, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            ref: (element)=>{
                                                refs.current[index] = element;
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$exam$2f5b$examId$5d2f$_components$2f$QuestionDisplay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QuestionDisplay"], {
                                                question: question,
                                                number: index + 1,
                                                answer: state.answers[question.id],
                                                flagged: state.flags.includes(question.id),
                                                onAnswer: (answer)=>actions.answer(question.id, answer),
                                                onToggleFlag: ()=>actions.toggleFlag(question.id)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/exam/[examId]/_components/ExamClient.tsx",
                                                lineNumber: 141,
                                                columnNumber: 17
                                            }, this)
                                        }, question.id, false, {
                                            fileName: "[project]/src/app/exam/[examId]/_components/ExamClient.tsx",
                                            lineNumber: 135,
                                            columnNumber: 15
                                        }, this)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2 pb-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>navigate(current - 1),
                                                disabled: current <= 0,
                                                className: "exam-btn flex-1 py-2",
                                                children: "上一題"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/exam/[examId]/_components/ExamClient.tsx",
                                                lineNumber: 153,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>navigate(current + 1),
                                                disabled: current >= total - 1,
                                                className: "exam-btn flex-1 py-2",
                                                children: "下一題"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/exam/[examId]/_components/ExamClient.tsx",
                                                lineNumber: 161,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/exam/[examId]/_components/ExamClient.tsx",
                                        lineNumber: 152,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/exam/[examId]/_components/ExamClient.tsx",
                                lineNumber: 133,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                                className: "hidden md:block",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "sticky top-24",
                                    children: panelOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mb-1 flex justify-end",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>setPanelOpen(false),
                                                    className: "text-[11px] text-[#5b6673] underline",
                                                    children: "收合題目地圖"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/exam/[examId]/_components/ExamClient.tsx",
                                                    lineNumber: 177,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/exam/[examId]/_components/ExamClient.tsx",
                                                lineNumber: 176,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$exam$2f5b$examId$5d2f$_components$2f$QuestionMap$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QuestionMap"], {
                                                questions: exam.questions,
                                                answers: state.answers,
                                                flags: state.flags,
                                                currentIndex: state.currentIndex,
                                                onNavigate: navigate
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/exam/[examId]/_components/ExamClient.tsx",
                                                lineNumber: 185,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/exam/[examId]/_components/ExamClient.tsx",
                                        lineNumber: 175,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setPanelOpen(true),
                                        className: "exam-btn w-full py-2",
                                        children: "題目地圖"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/exam/[examId]/_components/ExamClient.tsx",
                                        lineNumber: 194,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/exam/[examId]/_components/ExamClient.tsx",
                                    lineNumber: 173,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/exam/[examId]/_components/ExamClient.tsx",
                                lineNumber: 172,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/exam/[examId]/_components/ExamClient.tsx",
                        lineNumber: 132,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setMapOpen(true),
                        className: "exam-btn exam-btn-primary fixed bottom-4 right-4 z-30 px-4 py-3 md:hidden",
                        children: "題目地圖"
                    }, void 0, false, {
                        fileName: "[project]/src/app/exam/[examId]/_components/ExamClient.tsx",
                        lineNumber: 202,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/exam/[examId]/_components/ExamClient.tsx",
                lineNumber: 113,
                columnNumber: 7
            }, this),
            mapOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-40 md:hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        "aria-label": "關閉題目地圖",
                        onClick: ()=>setMapOpen(false),
                        className: "absolute inset-0 bg-black/40"
                    }, void 0, false, {
                        fileName: "[project]/src/app/exam/[examId]/_components/ExamClient.tsx",
                        lineNumber: 213,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute right-0 top-0 h-full w-72 overflow-y-auto bg-[#eef1f5] p-3 shadow-xl",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-2 flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-bold",
                                        children: "題目地圖"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/exam/[examId]/_components/ExamClient.tsx",
                                        lineNumber: 221,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setMapOpen(false),
                                        className: "exam-btn px-2 py-1 text-xs",
                                        children: "關閉"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/exam/[examId]/_components/ExamClient.tsx",
                                        lineNumber: 222,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/exam/[examId]/_components/ExamClient.tsx",
                                lineNumber: 220,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$exam$2f5b$examId$5d2f$_components$2f$QuestionMap$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QuestionMap"], {
                                questions: exam.questions,
                                answers: state.answers,
                                flags: state.flags,
                                currentIndex: state.currentIndex,
                                onNavigate: navigate
                            }, void 0, false, {
                                fileName: "[project]/src/app/exam/[examId]/_components/ExamClient.tsx",
                                lineNumber: 226,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/exam/[examId]/_components/ExamClient.tsx",
                        lineNumber: 219,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/exam/[examId]/_components/ExamClient.tsx",
                lineNumber: 212,
                columnNumber: 9
            }, this) : null,
            state.status === "paused" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$exam$2f5b$examId$5d2f$_components$2f$PauseOverlay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PauseOverlay"], {
                remainingSec: state.remainingSec,
                onResume: actions.resume,
                onReset: handleReset
            }, void 0, false, {
                fileName: "[project]/src/app/exam/[examId]/_components/ExamClient.tsx",
                lineNumber: 238,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$exam$2f5b$examId$5d2f$_components$2f$SubmitDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SubmitDialog"], {
                open: submitOpen,
                answered: answered,
                total: total,
                unansweredNumbers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$scoreCalculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUnansweredNumbers"])(exam, state.answers),
                flaggedCount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$scoreCalculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["countFlagged"])(exam, state.flags),
                onCancel: ()=>setSubmitOpen(false),
                onConfirm: handleConfirmSubmit
            }, void 0, false, {
                fileName: "[project]/src/app/exam/[examId]/_components/ExamClient.tsx",
                lineNumber: 241,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/exam/[examId]/_components/ExamClient.tsx",
        lineNumber: 112,
        columnNumber: 5
    }, this);
}
_s(ExamClient, "vTFZGTf5zuBdY/F3U0m3i0j3NC0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$ExamSessionContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useExamSession"]
    ];
});
_c = ExamClient;
var _c;
__turbopack_context__.k.register(_c, "ExamClient");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/exam/[examId]/_components/ExamHeader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ExamHeader",
    ()=>ExamHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/utils/formatters.ts [app-client] (ecmascript) <locals>");
"use client";
;
;
function ExamHeader({ exam, remainingSec, answered, total, running, onPause, onSubmit }) {
    const percent = total === 0 ? 0 : Math.round(answered / total * 100);
    const danger = remainingSec <= 60;
    function handleBack(event) {
        if (!window.confirm("返回首頁？作答進度會保留。")) {
            event.preventDefault();
            return;
        }
        if ("TURBOPACK compile-time truthy", 1) {
            event.preventDefault();
            window.history.pushState(null, "", "/");
            window.dispatchEvent(new PopStateEvent("popstate"));
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "exam-topbar sticky top-0 z-30",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "exam-shell",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap items-center gap-x-5 gap-y-2 py-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "min-w-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "truncate text-[17px] font-bold",
                                    children: exam.title
                                }, void 0, false, {
                                    fileName: "[project]/src/app/exam/[examId]/_components/ExamHeader.tsx",
                                    lineNumber: 38,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[11px] text-slate-300",
                                    children: exam.subtitle
                                }, void 0, false, {
                                    fileName: "[project]/src/app/exam/[examId]/_components/ExamHeader.tsx",
                                    lineNumber: 39,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/exam/[examId]/_components/ExamHeader.tsx",
                            lineNumber: 37,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hidden max-w-xs flex-1 md:block",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between text-[11px] text-slate-200",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "作答進度"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/exam/[examId]/_components/ExamHeader.tsx",
                                            lineNumber: 44,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                answered,
                                                " / ",
                                                total,
                                                " 題"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/exam/[examId]/_components/ExamHeader.tsx",
                                            lineNumber: 45,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/exam/[examId]/_components/ExamHeader.tsx",
                                    lineNumber: 43,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "exam-progress-track mt-1",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "exam-progress-fill",
                                        style: {
                                            width: `${percent}%`
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/exam/[examId]/_components/ExamHeader.tsx",
                                        lineNumber: 48,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/exam/[examId]/_components/ExamHeader.tsx",
                                    lineNumber: 47,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/exam/[examId]/_components/ExamHeader.tsx",
                            lineNumber: 42,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "ml-auto flex flex-wrap items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "/",
                                    onClick: handleBack,
                                    className: "exam-btn exam-btn-onnavy",
                                    children: "返回"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/exam/[examId]/_components/ExamHeader.tsx",
                                    lineNumber: 53,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `text-[22px] font-bold tabular-nums ${danger ? "timer-danger" : ""}`,
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatTime"])(remainingSec)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/exam/[examId]/_components/ExamHeader.tsx",
                                    lineNumber: 56,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: onPause,
                                    disabled: !running,
                                    className: "exam-btn exam-btn-onnavy",
                                    children: "暫停"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/exam/[examId]/_components/ExamHeader.tsx",
                                    lineNumber: 59,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: onSubmit,
                                    disabled: !running,
                                    className: "exam-btn exam-btn-primary",
                                    children: "交卷"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/exam/[examId]/_components/ExamHeader.tsx",
                                    lineNumber: 62,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/exam/[examId]/_components/ExamHeader.tsx",
                            lineNumber: 52,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/exam/[examId]/_components/ExamHeader.tsx",
                    lineNumber: 36,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pb-2 md:hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between text-[11px] text-slate-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "作答進度"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/exam/[examId]/_components/ExamHeader.tsx",
                                    lineNumber: 70,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        answered,
                                        " / ",
                                        total,
                                        " 題"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/exam/[examId]/_components/ExamHeader.tsx",
                                    lineNumber: 71,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/exam/[examId]/_components/ExamHeader.tsx",
                            lineNumber: 69,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "exam-progress-track mt-1",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "exam-progress-fill",
                                style: {
                                    width: `${percent}%`
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/app/exam/[examId]/_components/ExamHeader.tsx",
                                lineNumber: 74,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/exam/[examId]/_components/ExamHeader.tsx",
                            lineNumber: 73,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/exam/[examId]/_components/ExamHeader.tsx",
                    lineNumber: 68,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/exam/[examId]/_components/ExamHeader.tsx",
            lineNumber: 35,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/exam/[examId]/_components/ExamHeader.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
_c = ExamHeader;
var _c;
__turbopack_context__.k.register(_c, "ExamHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/exam/[examId]/_components/PauseOverlay.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PauseOverlay",
    ()=>PauseOverlay
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/utils/formatters.ts [app-client] (ecmascript) <locals>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function PauseOverlay({ remainingSec, onResume, onReset }) {
    _s();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PauseOverlay.useEffect": ()=>{
            containerRef.current?.focus();
        }
    }["PauseOverlay.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "exam-overlay",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "pause-overlay-title",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: containerRef,
            tabIndex: -1,
            className: "exam-card w-full max-w-md p-6 focus:outline-none",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    id: "pause-overlay-title",
                    className: "text-xl font-bold",
                    children: "考試已暫停"
                }, void 0, false, {
                    fileName: "[project]/src/app/exam/[examId]/_components/PauseOverlay.tsx",
                    lineNumber: 31,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-2 text-sm text-[#5b6673]",
                    children: "題目與倒數計時已停止。準備好後請繼續考試。"
                }, void 0, false, {
                    fileName: "[project]/src/app/exam/[examId]/_components/PauseOverlay.tsx",
                    lineNumber: 34,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-4 text-center text-3xl font-bold tabular-nums",
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatTime"])(remainingSec)
                }, void 0, false, {
                    fileName: "[project]/src/app/exam/[examId]/_components/PauseOverlay.tsx",
                    lineNumber: 37,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-6 flex flex-col gap-2 sm:flex-row",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: onResume,
                            className: "exam-btn exam-btn-primary flex-1 py-2",
                            children: "繼續考試"
                        }, void 0, false, {
                            fileName: "[project]/src/app/exam/[examId]/_components/PauseOverlay.tsx",
                            lineNumber: 39,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: onReset,
                            className: "exam-btn flex-1 py-2",
                            children: "重新測試"
                        }, void 0, false, {
                            fileName: "[project]/src/app/exam/[examId]/_components/PauseOverlay.tsx",
                            lineNumber: 42,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/exam/[examId]/_components/PauseOverlay.tsx",
                    lineNumber: 38,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/exam/[examId]/_components/PauseOverlay.tsx",
            lineNumber: 26,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/exam/[examId]/_components/PauseOverlay.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_s(PauseOverlay, "8puyVO4ts1RhCfXUmci3vLI3Njw=");
_c = PauseOverlay;
var _c;
__turbopack_context__.k.register(_c, "PauseOverlay");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/exam/[examId]/_components/QuestionDisplay.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QuestionCard",
    ()=>QuestionDisplay,
    "QuestionDisplay",
    ()=>QuestionDisplay
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
const TYPE_LABELS = {
    single: "單選題",
    multiple: "多選題",
    boolean: "是非題"
};
function QuestionDisplay({ question, number, answer, flagged, onAnswer, onToggleFlag }) {
    const selected = Array.isArray(answer) ? answer : answer ? [
        answer
    ] : [];
    const multiple = question.type === "multiple";
    function select(optionId) {
        if (!multiple) {
            onAnswer(optionId);
            return;
        }
        const next = selected.includes(optionId) ? selected.filter((id)=>id !== optionId) : [
            ...selected,
            optionId
        ];
        onAnswer(next);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: `question-${question.id}`,
        "data-index": number - 1,
        className: "exam-card exam-question p-4 sm:p-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3 flex flex-wrap items-center gap-2 border-b border-[#d5dce4] pb-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "grid h-8 w-8 place-items-center bg-[#2f5597] text-sm font-bold text-white",
                        children: number
                    }, void 0, false, {
                        fileName: "[project]/src/app/exam/[examId]/_components/QuestionDisplay.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "exam-chip",
                        children: TYPE_LABELS[question.type]
                    }, void 0, false, {
                        fileName: "[project]/src/app/exam/[examId]/_components/QuestionDisplay.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "exam-chip",
                        children: [
                            question.points,
                            " 分"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/exam/[examId]/_components/QuestionDisplay.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onToggleFlag,
                        "aria-pressed": flagged,
                        className: `exam-chip ml-auto ${flagged ? "exam-chip-flag" : ""}`,
                        children: flagged ? "★ 已標註" : "☆ 標註"
                    }, void 0, false, {
                        fileName: "[project]/src/app/exam/[examId]/_components/QuestionDisplay.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/exam/[examId]/_components/QuestionDisplay.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                id: `question-${question.id}-prompt`,
                className: "mb-3 text-[15px] leading-7",
                children: question.prompt
            }, void 0, false, {
                fileName: "[project]/src/app/exam/[examId]/_components/QuestionDisplay.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                role: "group",
                "aria-labelledby": `question-${question.id}-prompt`,
                className: question.type === "boolean" ? "grid gap-2 sm:grid-cols-2" : "space-y-2",
                children: question.options.map((option)=>{
                    const isSelected = selected.includes(option.id);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>select(option.id),
                        "aria-pressed": isSelected,
                        "data-selected": isSelected,
                        "data-multiple": multiple,
                        className: "exam-option",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                "aria-hidden": "true",
                                className: "exam-mark",
                                children: isSelected ? "✓" : ""
                            }, void 0, false, {
                                fileName: "[project]/src/app/exam/[examId]/_components/QuestionDisplay.tsx",
                                lineNumber: 78,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-bold text-[#5b6673]",
                                children: option.id
                            }, void 0, false, {
                                fileName: "[project]/src/app/exam/[examId]/_components/QuestionDisplay.tsx",
                                lineNumber: 81,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: option.text
                            }, void 0, false, {
                                fileName: "[project]/src/app/exam/[examId]/_components/QuestionDisplay.tsx",
                                lineNumber: 82,
                                columnNumber: 15
                            }, this)
                        ]
                    }, option.id, true, {
                        fileName: "[project]/src/app/exam/[examId]/_components/QuestionDisplay.tsx",
                        lineNumber: 69,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/app/exam/[examId]/_components/QuestionDisplay.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/exam/[examId]/_components/QuestionDisplay.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
_c = QuestionDisplay;
;
var _c;
__turbopack_context__.k.register(_c, "QuestionDisplay");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/exam/[examId]/_components/QuestionMap.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QuestionMap",
    ()=>QuestionMap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$scoreCalculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/scoreCalculator.ts [app-client] (ecmascript)");
"use client";
;
;
function QuestionMap({ questions, answers, flags, currentIndex, onNavigate }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "exam-card p-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "mb-2 text-[13px] font-bold",
                children: "題目地圖"
            }, void 0, false, {
                fileName: "[project]/src/app/exam/[examId]/_components/QuestionMap.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-5 gap-1.5",
                children: questions.map((question, index)=>{
                    const done = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$scoreCalculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAnswered"])(answers[question.id]);
                    const flagged = flags.includes(question.id);
                    const current = index === currentIndex;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>onNavigate(index),
                        className: "exam-num",
                        "data-done": done,
                        "data-flagged": flagged,
                        "data-current": current,
                        "aria-label": `第 ${index + 1} 題`,
                        "aria-current": current ? "step" : undefined,
                        children: [
                            index + 1,
                            done && flagged ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "absolute bottom-0.5 right-0.5 h-1.5 w-1.5 rounded-full bg-[#2f5597]"
                            }, void 0, false, {
                                fileName: "[project]/src/app/exam/[examId]/_components/QuestionMap.tsx",
                                lineNumber: 37,
                                columnNumber: 17
                            }, this) : null
                        ]
                    }, `${question.id}-${index}`, true, {
                        fileName: "[project]/src/app/exam/[examId]/_components/QuestionMap.tsx",
                        lineNumber: 24,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/app/exam/[examId]/_components/QuestionMap.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 flex flex-wrap gap-x-3 gap-y-1 border-t border-[#d5dce4] pt-2 text-[10px] text-[#5b6673]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "inline-flex items-center gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: "inline-block h-2.5 w-2.5 border border-[#24437a] bg-[#2f5597]"
                            }, void 0, false, {
                                fileName: "[project]/src/app/exam/[examId]/_components/QuestionMap.tsx",
                                lineNumber: 46,
                                columnNumber: 11
                            }, this),
                            "已作答"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/exam/[examId]/_components/QuestionMap.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "inline-flex items-center gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: "inline-block h-2.5 w-2.5 border border-[#b8942f] bg-[#e0b64a]"
                            }, void 0, false, {
                                fileName: "[project]/src/app/exam/[examId]/_components/QuestionMap.tsx",
                                lineNumber: 50,
                                columnNumber: 11
                            }, this),
                            "已標註"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/exam/[examId]/_components/QuestionMap.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "inline-flex items-center gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: "inline-block h-2.5 w-2.5 border border-[#aeb9c6] bg-[#fbfcfd]"
                            }, void 0, false, {
                                fileName: "[project]/src/app/exam/[examId]/_components/QuestionMap.tsx",
                                lineNumber: 54,
                                columnNumber: 11
                            }, this),
                            "未作答"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/exam/[examId]/_components/QuestionMap.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/exam/[examId]/_components/QuestionMap.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/exam/[examId]/_components/QuestionMap.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_c = QuestionMap;
var _c;
__turbopack_context__.k.register(_c, "QuestionMap");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/exam/[examId]/_components/SubmitDialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SubmitDialog",
    ()=>SubmitDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function SubmitDialog({ open, answered, total, unansweredNumbers, flaggedCount, onCancel, onConfirm }) {
    _s();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SubmitDialog.useEffect": ()=>{
            if (!open) return;
            containerRef.current?.focus();
            const onKeyDown = {
                "SubmitDialog.useEffect.onKeyDown": (event)=>{
                    if (event.key === "Escape") onCancel();
                }
            }["SubmitDialog.useEffect.onKeyDown"];
            document.addEventListener("keydown", onKeyDown);
            return ({
                "SubmitDialog.useEffect": ()=>document.removeEventListener("keydown", onKeyDown)
            })["SubmitDialog.useEffect"];
        }
    }["SubmitDialog.useEffect"], [
        open,
        onCancel
    ]);
    if (!open) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "exam-overlay",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "submit-dialog-title",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: containerRef,
            tabIndex: -1,
            className: "exam-card w-full max-w-lg p-6 focus:outline-none",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    id: "submit-dialog-title",
                    className: "text-xl font-bold",
                    children: "確認交卷？"
                }, void 0, false, {
                    fileName: "[project]/src/app/exam/[examId]/_components/SubmitDialog.tsx",
                    lineNumber: 50,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                    className: "mt-4 grid grid-cols-2 gap-3 border-y border-[#d5dce4] py-4 text-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                    className: "text-xs text-[#5b6673]",
                                    children: "已作答"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/exam/[examId]/_components/SubmitDialog.tsx",
                                    lineNumber: 55,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                    className: "text-lg font-bold",
                                    children: [
                                        answered,
                                        " / ",
                                        total,
                                        " 題"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/exam/[examId]/_components/SubmitDialog.tsx",
                                    lineNumber: 56,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/exam/[examId]/_components/SubmitDialog.tsx",
                            lineNumber: 54,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                    className: "text-xs text-[#5b6673]",
                                    children: "已標註"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/exam/[examId]/_components/SubmitDialog.tsx",
                                    lineNumber: 59,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                    className: "text-lg font-bold",
                                    children: [
                                        flaggedCount,
                                        " 題"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/exam/[examId]/_components/SubmitDialog.tsx",
                                    lineNumber: 60,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/exam/[examId]/_components/SubmitDialog.tsx",
                            lineNumber: 58,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "col-span-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                    className: "text-xs text-[#5b6673]",
                                    children: "未作答題號"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/exam/[examId]/_components/SubmitDialog.tsx",
                                    lineNumber: 63,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                    className: "mt-1",
                                    children: unansweredNumbers.length > 0 ? unansweredNumbers.join("、") : "無"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/exam/[examId]/_components/SubmitDialog.tsx",
                                    lineNumber: 64,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/exam/[examId]/_components/SubmitDialog.tsx",
                            lineNumber: 62,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/exam/[examId]/_components/SubmitDialog.tsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-3 text-xs text-[#5b6673]",
                    children: "交卷後將無法修改答案。"
                }, void 0, false, {
                    fileName: "[project]/src/app/exam/[examId]/_components/SubmitDialog.tsx",
                    lineNumber: 67,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: onCancel,
                            className: "exam-btn py-2 sm:px-6",
                            children: "繼續作答"
                        }, void 0, false, {
                            fileName: "[project]/src/app/exam/[examId]/_components/SubmitDialog.tsx",
                            lineNumber: 69,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: onConfirm,
                            className: "exam-btn exam-btn-primary py-2 sm:px-6",
                            children: "確認交卷"
                        }, void 0, false, {
                            fileName: "[project]/src/app/exam/[examId]/_components/SubmitDialog.tsx",
                            lineNumber: 72,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/exam/[examId]/_components/SubmitDialog.tsx",
                    lineNumber: 68,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/exam/[examId]/_components/SubmitDialog.tsx",
            lineNumber: 45,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/exam/[examId]/_components/SubmitDialog.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
_s(SubmitDialog, "8puyVO4ts1RhCfXUmci3vLI3Njw=");
_c = SubmitDialog;
var _c;
__turbopack_context__.k.register(_c, "SubmitDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/exam/result/[sessionId]/_components/ExportActions.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ExportActions",
    ()=>ExportActions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$resultExport$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/resultExport.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function getLoggedInUserSheetUrl() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const raw = sessionStorage.getItem('exam_logged_in_user');
        if (raw) {
            const user = JSON.parse(raw);
            if (user?.google_sheet_URL && typeof user.google_sheet_URL === 'string' && user.google_sheet_URL.trim() !== '') {
                return user.google_sheet_URL.trim();
            }
        }
    } catch  {}
    return null;
}
function ExportActions({ items, title }) {
    _s();
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [sheetUrl, setSheetUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    async function handleExport(target) {
        if (busy || !items.length) return;
        if (target === 'google') {
            const boundSheet = getLoggedInUserSheetUrl();
            if (!boundSheet) {
                window.alert('尚未綁定個人 Google Sheet，無法匯出儲存至雲端試算表。請先至設定頁面進行綁定！');
                return;
            }
        }
        setBusy(true);
        setMessage('');
        setSheetUrl('');
        try {
            if (target === 'excel') {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$resultExport$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["downloadWrongQuestions"])(items, title);
                setMessage(`已產生 ${items.length} 題錯題的 Excel 檔案。`);
            } else {
                const { getAccessToken, googleSignIn } = await __turbopack_context__.A("[project]/src/services/googleAuth.ts [app-client] (ecmascript, async loader)");
                const token = await getAccessToken() || (await googleSignIn())?.accessToken;
                if (!token) throw new Error('尚未取得 Google 授權，未匯出任何資料。');
                setSheetUrl(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$resultExport$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["exportWrongQuestionsToGoogleSheet"])(items, title, token));
                setMessage(`已成功寫入 ${items.length} 題錯題至新的 Google 試算表。`);
            }
        } catch (error) {
            setMessage(error instanceof Error ? error.message : '匯出失敗，請稍後再試。');
        } finally{
            setBusy(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "rounded-xl border border-slate-200 bg-white p-5",
        "aria-labelledby": "export-title",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                id: "export-title",
                className: "font-bold text-slate-800",
                children: "錯題下載"
            }, void 0, false, {
                fileName: "[project]/src/app/exam/result/[sessionId]/_components/ExportActions.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1 text-sm text-slate-600",
                children: [
                    "匯出目前學科與難度條件下的 ",
                    items.length,
                    " 題錯題（包含未作答）。"
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/exam/result/[sessionId]/_components/ExportActions.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 flex flex-wrap gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "exam-btn rounded-lg",
                        disabled: busy || !items.length,
                        onClick: ()=>handleExport('excel'),
                        children: "下載錯題 Excel (.xlsx)"
                    }, void 0, false, {
                        fileName: "[project]/src/app/exam/result/[sessionId]/_components/ExportActions.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "exam-btn rounded-lg",
                        disabled: busy || !items.length,
                        onClick: ()=>handleExport('google'),
                        children: "匯出錯題至 Google Sheets"
                    }, void 0, false, {
                        fileName: "[project]/src/app/exam/result/[sessionId]/_components/ExportActions.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/exam/result/[sessionId]/_components/ExportActions.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-3 text-xs text-slate-500",
                children: "Google 匯出需登入並授權，會在你的帳號建立新試算表，不修改共用題庫。"
            }, void 0, false, {
                fileName: "[project]/src/app/exam/result/[sessionId]/_components/ExportActions.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                role: "status",
                className: "mt-2 text-sm text-slate-700",
                children: busy ? '正在匯出，請稍候…' : message
            }, void 0, false, {
                fileName: "[project]/src/app/exam/result/[sessionId]/_components/ExportActions.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this),
            sheetUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: sheetUrl,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "mt-2 inline-block text-sm text-blue-800 underline",
                children: "開啟已匯出的 Google 試算表"
            }, void 0, false, {
                fileName: "[project]/src/app/exam/result/[sessionId]/_components/ExportActions.tsx",
                lineNumber: 68,
                columnNumber: 20
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/exam/result/[sessionId]/_components/ExportActions.tsx",
        lineNumber: 59,
        columnNumber: 5
    }, this);
}
_s(ExportActions, "GCI38Hgsc4B+rUoQPFiq1KWXJsg=");
_c = ExportActions;
var _c;
__turbopack_context__.k.register(_c, "ExportActions");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/exam/result/[sessionId]/_components/QuestionReviewList.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QuestionReviewList",
    ()=>QuestionReviewList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$examReport$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/examReport.ts [app-client] (ecmascript)");
'use client';
;
;
function QuestionReviewList({ items }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        "aria-labelledby": "review-title",
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                id: "review-title",
                className: "text-lg font-bold text-slate-800",
                children: [
                    "逐題詳解檢討（",
                    items.length,
                    " 題）"
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/exam/result/[sessionId]/_components/QuestionReviewList.tsx",
                lineNumber: 8,
                columnNumber: 7
            }, this),
            !items.length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600",
                children: "此條件下沒有題目，試試其他篩選條件。"
            }, void 0, false, {
                fileName: "[project]/src/app/exam/result/[sessionId]/_components/QuestionReviewList.tsx",
                lineNumber: 9,
                columnNumber: 25
            }, this),
            items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                    className: "rounded-xl border border-slate-200 bg-white p-5 sm:p-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap items-center justify-between gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-bold text-slate-800",
                                    children: [
                                        "第 ",
                                        item.number,
                                        " 題 ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-normal text-slate-500",
                                            children: [
                                                "／ ",
                                                item.question.points,
                                                " 分"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/exam/result/[sessionId]/_components/QuestionReviewList.tsx",
                                            lineNumber: 13,
                                            columnNumber: 72
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/exam/result/[sessionId]/_components/QuestionReviewList.tsx",
                                    lineNumber: 13,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `rounded-full px-3 py-1 text-sm font-semibold ${item.status === 'correct' ? 'bg-emerald-50 text-emerald-800' : item.status === 'wrong' ? 'bg-rose-50 text-rose-800' : 'bg-amber-50 text-amber-900'}`,
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$examReport$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["statusLabels"][item.status]
                                }, void 0, false, {
                                    fileName: "[project]/src/app/exam/result/[sessionId]/_components/QuestionReviewList.tsx",
                                    lineNumber: 14,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/exam/result/[sessionId]/_components/QuestionReviewList.tsx",
                            lineNumber: 12,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-2 text-xs text-slate-500",
                            children: [
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$examReport$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subjectName"])(item.question),
                                " · ",
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$examReport$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["difficultyName"])(item.question)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/exam/result/[sessionId]/_components/QuestionReviewList.tsx",
                            lineNumber: 16,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-4 whitespace-pre-wrap text-base leading-relaxed text-slate-900",
                            children: item.question.prompt
                        }, void 0, false, {
                            fileName: "[project]/src/app/exam/result/[sessionId]/_components/QuestionReviewList.tsx",
                            lineNumber: 17,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: "mt-4 grid gap-2 sm:grid-cols-2",
                            children: item.question.options.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    className: `rounded-lg border p-3 text-sm ${item.expected.includes(option.id.toUpperCase()) ? 'border-emerald-300 bg-emerald-50' : item.actual.includes(option.id.toUpperCase()) ? 'border-rose-200 bg-rose-50' : 'border-slate-200'}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-semibold",
                                            children: [
                                                option.id,
                                                "."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/exam/result/[sessionId]/_components/QuestionReviewList.tsx",
                                            lineNumber: 21,
                                            columnNumber: 17
                                        }, this),
                                        " ",
                                        option.text,
                                        item.expected.includes(option.id.toUpperCase()) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "ml-2 text-xs font-semibold text-emerald-800",
                                            children: "正確答案"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/exam/result/[sessionId]/_components/QuestionReviewList.tsx",
                                            lineNumber: 22,
                                            columnNumber: 69
                                        }, this),
                                        item.actual.includes(option.id.toUpperCase()) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "ml-2 text-xs font-semibold",
                                            children: "你的選擇"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/exam/result/[sessionId]/_components/QuestionReviewList.tsx",
                                            lineNumber: 23,
                                            columnNumber: 67
                                        }, this)
                                    ]
                                }, option.id, true, {
                                    fileName: "[project]/src/app/exam/result/[sessionId]/_components/QuestionReviewList.tsx",
                                    lineNumber: 20,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/exam/result/[sessionId]/_components/QuestionReviewList.tsx",
                            lineNumber: 18,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-700",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        "你的答案：",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: item.actual.join('、') || '未作答'
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/exam/result/[sessionId]/_components/QuestionReviewList.tsx",
                                            lineNumber: 28,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/exam/result/[sessionId]/_components/QuestionReviewList.tsx",
                                    lineNumber: 28,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        "正確答案：",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: item.expected.join('、') || '未提供，無法判分'
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/exam/result/[sessionId]/_components/QuestionReviewList.tsx",
                                            lineNumber: 29,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/exam/result/[sessionId]/_components/QuestionReviewList.tsx",
                                    lineNumber: 29,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        "得分：",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: [
                                                item.earned,
                                                " / ",
                                                item.question.points
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/exam/result/[sessionId]/_components/QuestionReviewList.tsx",
                                            lineNumber: 30,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/exam/result/[sessionId]/_components/QuestionReviewList.tsx",
                                    lineNumber: 30,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/exam/result/[sessionId]/_components/QuestionReviewList.tsx",
                            lineNumber: 27,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4 rounded-lg bg-slate-50 p-4 text-sm leading-relaxed text-slate-700",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "mb-1 font-bold",
                                    children: "詳解"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/exam/result/[sessionId]/_components/QuestionReviewList.tsx",
                                    lineNumber: 33,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "whitespace-pre-wrap",
                                    children: item.question.explanation || '本題尚未提供解析，請向題庫管理員確認。'
                                }, void 0, false, {
                                    fileName: "[project]/src/app/exam/result/[sessionId]/_components/QuestionReviewList.tsx",
                                    lineNumber: 34,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/exam/result/[sessionId]/_components/QuestionReviewList.tsx",
                            lineNumber: 32,
                            columnNumber: 11
                        }, this)
                    ]
                }, `${item.question.id}-${item.number}`, true, {
                    fileName: "[project]/src/app/exam/result/[sessionId]/_components/QuestionReviewList.tsx",
                    lineNumber: 11,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/exam/result/[sessionId]/_components/QuestionReviewList.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = QuestionReviewList;
var _c;
__turbopack_context__.k.register(_c, "QuestionReviewList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/exam/result/[sessionId]/_components/ResultReport.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ResultReport",
    ()=>ResultReport
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$examReport$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/examReport.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$exam$2f$result$2f5b$sessionId$5d2f$_components$2f$QuestionReviewList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/exam/result/[sessionId]/_components/QuestionReviewList.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$exam$2f$result$2f5b$sessionId$5d2f$_components$2f$SubjectAnalysisChart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/exam/result/[sessionId]/_components/SubjectAnalysisChart.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$exam$2f$result$2f5b$sessionId$5d2f$_components$2f$ExportActions$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/exam/result/[sessionId]/_components/ExportActions.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function ResultReport({ exam, answers, autoSubmitted, onReset, initiallyExpanded = true, savedUrl, warning }) {
    _s();
    const report = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ResultReport.useMemo[report]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$examReport$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildExamReport"])(exam, answers)
    }["ResultReport.useMemo[report]"], [
        exam,
        answers
    ]);
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initiallyExpanded);
    const [filter, setFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [subject, setSubject] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [difficulty, setDifficulty] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const scoped = report.items.filter((item)=>(subject === 'all' || (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$examReport$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subjectName"])(item.question) === subject) && (difficulty === 'all' || (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$examReport$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["difficultyName"])(item.question) === difficulty));
    const wrongItems = scoped.filter(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$examReport$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isWrongQuestion"]);
    const visible = scoped.filter((item)=>filter === 'all' || (filter === 'wrong' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$examReport$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isWrongQuestion"])(item) : item.status === 'unanswered'));
    const subjects = [
        ...new Set(report.items.map((item)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$examReport$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subjectName"])(item.question)))
    ];
    const difficulties = [
        ...new Set(report.items.map((item)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$examReport$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["difficultyName"])(item.question)))
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-[#eef1f5] pb-12 text-slate-800",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "border-b border-slate-200 bg-white",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "exam-shell flex flex-wrap items-center justify-between gap-3 py-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs font-semibold tracking-widest text-[#2f5597]",
                                    children: "考試結果詳情"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/exam/result/[sessionId]/_components/ResultReport.tsx",
                                    lineNumber: 36,
                                    columnNumber: 16
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "mt-1 text-xl font-bold",
                                    children: exam.title
                                }, void 0, false, {
                                    fileName: "[project]/src/app/exam/result/[sessionId]/_components/ResultReport.tsx",
                                    lineNumber: 36,
                                    columnNumber: 94
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/exam/result/[sessionId]/_components/ResultReport.tsx",
                            lineNumber: 36,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/lobby",
                            className: "exam-btn rounded-lg",
                            children: "返回測驗大廳"
                        }, void 0, false, {
                            fileName: "[project]/src/app/exam/result/[sessionId]/_components/ResultReport.tsx",
                            lineNumber: 37,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/exam/result/[sessionId]/_components/ResultReport.tsx",
                    lineNumber: 35,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/exam/result/[sessionId]/_components/ResultReport.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "exam-shell space-y-6 pt-7",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "rounded-2xl border border-slate-200 bg-white p-6 sm:p-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-start justify-between gap-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-2xl font-bold",
                                                children: "交卷成功"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/exam/result/[sessionId]/_components/ResultReport.tsx",
                                                lineNumber: 43,
                                                columnNumber: 18
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-2 text-sm text-slate-600",
                                                children: autoSubmitted ? '時間到，系統已自動交卷。' : '答案已送出，交卷後無法再修改。'
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/exam/result/[sessionId]/_components/ResultReport.tsx",
                                                lineNumber: 43,
                                                columnNumber: 62
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/exam/result/[sessionId]/_components/ResultReport.tsx",
                                        lineNumber: 43,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-right",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-slate-500",
                                                children: "總得分"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/exam/result/[sessionId]/_components/ResultReport.tsx",
                                                lineNumber: 44,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-4xl font-bold text-[#2f5597]",
                                                children: [
                                                    report.earned,
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-2 text-lg font-normal text-slate-400",
                                                        children: [
                                                            "/ ",
                                                            report.maximum
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/exam/result/[sessionId]/_components/ResultReport.tsx",
                                                        lineNumber: 44,
                                                        columnNumber: 150
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/exam/result/[sessionId]/_components/ResultReport.tsx",
                                                lineNumber: 44,
                                                columnNumber: 86
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/exam/result/[sessionId]/_components/ResultReport.tsx",
                                        lineNumber: 44,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/exam/result/[sessionId]/_components/ResultReport.tsx",
                                lineNumber: 42,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5",
                                children: [
                                    [
                                        '全部題目',
                                        report.total
                                    ],
                                    [
                                        '答對題數',
                                        report.correct
                                    ],
                                    [
                                        '答錯題數',
                                        report.wrong
                                    ],
                                    [
                                        '未作答',
                                        report.unanswered
                                    ],
                                    [
                                        '正確率',
                                        `${report.accuracy}%`
                                    ]
                                ].map(([label, value])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-xl bg-slate-50 p-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-slate-500",
                                                children: label
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/exam/result/[sessionId]/_components/ResultReport.tsx",
                                                lineNumber: 48,
                                                columnNumber: 71
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-2xl font-bold",
                                                children: value
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/exam/result/[sessionId]/_components/ResultReport.tsx",
                                                lineNumber: 48,
                                                columnNumber: 120
                                            }, this)
                                        ]
                                    }, label, true, {
                                        fileName: "[project]/src/app/exam/result/[sessionId]/_components/ResultReport.tsx",
                                        lineNumber: 48,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/exam/result/[sessionId]/_components/ResultReport.tsx",
                                lineNumber: 46,
                                columnNumber: 11
                            }, this),
                            report.ungraded > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                role: "alert",
                                className: "mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-900",
                                children: [
                                    "有 ",
                                    report.ungraded,
                                    " 題缺少標準答案，目前分數與正確率僅供參考，請題庫管理員補齊答案。"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/exam/result/[sessionId]/_components/ResultReport.tsx",
                                lineNumber: 51,
                                columnNumber: 35
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 text-xs text-slate-500",
                                children: "正確率以全部題目計算；未作答獨立統計，錯題檢討包含未作答題目。"
                            }, void 0, false, {
                                fileName: "[project]/src/app/exam/result/[sessionId]/_components/ResultReport.tsx",
                                lineNumber: 52,
                                columnNumber: 11
                            }, this),
                            warning && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                role: "alert",
                                className: "mt-3 text-sm text-amber-800",
                                children: warning
                            }, void 0, false, {
                                fileName: "[project]/src/app/exam/result/[sessionId]/_components/ResultReport.tsx",
                                lineNumber: 53,
                                columnNumber: 23
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-5 flex flex-wrap gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "exam-btn rounded-lg",
                                        "aria-expanded": expanded,
                                        "aria-controls": "result-details",
                                        onClick: ()=>setExpanded(!expanded),
                                        children: expanded ? '收合詳解與分析' : '查看逐題詳解與分析'
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/exam/result/[sessionId]/_components/ResultReport.tsx",
                                        lineNumber: 55,
                                        columnNumber: 13
                                    }, this),
                                    onReset && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "exam-btn rounded-lg",
                                        onClick: onReset,
                                        children: "重新測驗"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/exam/result/[sessionId]/_components/ResultReport.tsx",
                                        lineNumber: 56,
                                        columnNumber: 25
                                    }, this),
                                    savedUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: savedUrl,
                                        className: "exam-btn rounded-lg",
                                        children: "開啟獨立結果頁"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/exam/result/[sessionId]/_components/ResultReport.tsx",
                                        lineNumber: 57,
                                        columnNumber: 26
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/exam/result/[sessionId]/_components/ResultReport.tsx",
                                lineNumber: 54,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/exam/result/[sessionId]/_components/ResultReport.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this),
                    expanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        id: "result-details",
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid gap-4 md:grid-cols-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$exam$2f$result$2f5b$sessionId$5d2f$_components$2f$SubjectAnalysisChart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SubjectAnalysisChart"], {
                                        title: "錯題分析 · 學科",
                                        items: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$examReport$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["analyzeQuestions"])(report.items, 'subject')
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/exam/result/[sessionId]/_components/ResultReport.tsx",
                                        lineNumber: 62,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$exam$2f$result$2f5b$sessionId$5d2f$_components$2f$SubjectAnalysisChart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SubjectAnalysisChart"], {
                                        title: "錯題分析 · 難度",
                                        items: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$examReport$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["analyzeQuestions"])(report.items, 'difficulty')
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/exam/result/[sessionId]/_components/ResultReport.tsx",
                                        lineNumber: 63,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/exam/result/[sessionId]/_components/ResultReport.tsx",
                                lineNumber: 61,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "rounded-xl border border-slate-200 bg-white p-5",
                                "aria-label": "題目篩選",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-2",
                                        children: [
                                            [
                                                'all',
                                                '全部題目',
                                                scoped.length
                                            ],
                                            [
                                                'wrong',
                                                '只看錯題',
                                                wrongItems.length
                                            ],
                                            [
                                                'unanswered',
                                                '未作答',
                                                scoped.filter((item)=>item.status === 'unanswered').length
                                            ]
                                        ].map(([value, label, count])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                "aria-pressed": filter === value,
                                                onClick: ()=>setFilter(value),
                                                className: `exam-btn rounded-lg ${filter === value ? '!border-[#2f5597] !bg-[#2f5597] !text-white' : ''}`,
                                                children: [
                                                    label,
                                                    "（",
                                                    count,
                                                    "）"
                                                ]
                                            }, value, true, {
                                                fileName: "[project]/src/app/exam/result/[sessionId]/_components/ResultReport.tsx",
                                                lineNumber: 68,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/exam/result/[sessionId]/_components/ResultReport.tsx",
                                        lineNumber: 66,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4 flex flex-wrap gap-4 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                children: [
                                                    "學科",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        className: "ml-2 rounded-lg border border-slate-300 p-2",
                                                        value: subject,
                                                        onChange: (event)=>setSubject(event.target.value),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "all",
                                                                children: "全部學科"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/exam/result/[sessionId]/_components/ResultReport.tsx",
                                                                lineNumber: 72,
                                                                columnNumber: 157
                                                            }, this),
                                                            subjects.map((name)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    children: name
                                                                }, name, false, {
                                                                    fileName: "[project]/src/app/exam/result/[sessionId]/_components/ResultReport.tsx",
                                                                    lineNumber: 72,
                                                                    columnNumber: 214
                                                                }, this))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/exam/result/[sessionId]/_components/ResultReport.tsx",
                                                        lineNumber: 72,
                                                        columnNumber: 24
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/exam/result/[sessionId]/_components/ResultReport.tsx",
                                                lineNumber: 72,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                children: [
                                                    "難度",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        className: "ml-2 rounded-lg border border-slate-300 p-2",
                                                        value: difficulty,
                                                        onChange: (event)=>setDifficulty(event.target.value),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "all",
                                                                children: "全部難度"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/exam/result/[sessionId]/_components/ResultReport.tsx",
                                                                lineNumber: 73,
                                                                columnNumber: 163
                                                            }, this),
                                                            difficulties.map((name)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    children: name
                                                                }, name, false, {
                                                                    fileName: "[project]/src/app/exam/result/[sessionId]/_components/ResultReport.tsx",
                                                                    lineNumber: 73,
                                                                    columnNumber: 224
                                                                }, this))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/exam/result/[sessionId]/_components/ResultReport.tsx",
                                                        lineNumber: 73,
                                                        columnNumber: 24
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/exam/result/[sessionId]/_components/ResultReport.tsx",
                                                lineNumber: 73,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "text-[#2f5597] underline",
                                                onClick: ()=>{
                                                    setFilter('all');
                                                    setSubject('all');
                                                    setDifficulty('all');
                                                },
                                                children: "清除篩選"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/exam/result/[sessionId]/_components/ResultReport.tsx",
                                                lineNumber: 74,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/exam/result/[sessionId]/_components/ResultReport.tsx",
                                        lineNumber: 71,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        role: "status",
                                        className: "mt-3 text-xs text-slate-500",
                                        children: [
                                            "顯示 ",
                                            visible.length,
                                            " / ",
                                            report.total,
                                            " 題。上方分析固定顯示整份試卷，不受篩選影響。"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/exam/result/[sessionId]/_components/ResultReport.tsx",
                                        lineNumber: 76,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/exam/result/[sessionId]/_components/ResultReport.tsx",
                                lineNumber: 65,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$exam$2f$result$2f5b$sessionId$5d2f$_components$2f$ExportActions$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ExportActions"], {
                                items: wrongItems,
                                title: exam.title
                            }, void 0, false, {
                                fileName: "[project]/src/app/exam/result/[sessionId]/_components/ResultReport.tsx",
                                lineNumber: 78,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$exam$2f$result$2f5b$sessionId$5d2f$_components$2f$QuestionReviewList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QuestionReviewList"], {
                                items: visible
                            }, void 0, false, {
                                fileName: "[project]/src/app/exam/result/[sessionId]/_components/ResultReport.tsx",
                                lineNumber: 79,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/exam/result/[sessionId]/_components/ResultReport.tsx",
                        lineNumber: 60,
                        columnNumber: 22
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/exam/result/[sessionId]/_components/ResultReport.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/exam/result/[sessionId]/_components/ResultReport.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_s(ResultReport, "/Lajyll4Bo41ck0mnLxQnWiGiio=");
_c = ResultReport;
var _c;
__turbopack_context__.k.register(_c, "ResultReport");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/exam/result/[sessionId]/_components/ScoreBanner.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScoreBanner",
    ()=>ScoreBanner,
    "SuccessView",
    ()=>ScoreBanner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$examResults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/examResults.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$exam$2f$result$2f5b$sessionId$5d2f$_components$2f$ResultReport$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/exam/result/[sessionId]/_components/ResultReport.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function ScoreBanner({ exam, autoSubmitted, answers = {}, onReset }) {
    _s();
    const saved = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const [savedUrl, setSavedUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [warning, setWarning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ScoreBanner.useEffect": ()=>{
            if (saved.current) return;
            saved.current = true;
            const id = crypto.randomUUID();
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$examResults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveExamResult"])({
                version: 1,
                id,
                exam,
                answers,
                autoSubmitted,
                submittedAt: new Date().toISOString()
            })) {
                setSavedUrl(`/exam/result/${id}`);
            } else {
                setWarning('無法儲存結果至本機，請在離開前下載錯題。');
            }
        }
    }["ScoreBanner.useEffect"], [
        exam,
        answers,
        autoSubmitted
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$exam$2f$result$2f5b$sessionId$5d2f$_components$2f$ResultReport$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResultReport"], {
        exam: exam,
        answers: answers,
        autoSubmitted: autoSubmitted,
        onReset: onReset,
        initiallyExpanded: false,
        savedUrl: savedUrl,
        warning: warning
    }, void 0, false, {
        fileName: "[project]/src/app/exam/result/[sessionId]/_components/ScoreBanner.tsx",
        lineNumber: 32,
        columnNumber: 10
    }, this);
}
_s(ScoreBanner, "TLnr6FXCI/qA0ipCmHNsMfYZGYk=");
_c = ScoreBanner;
;
var _c;
__turbopack_context__.k.register(_c, "ScoreBanner");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/exam/result/[sessionId]/_components/SubjectAnalysisChart.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SubjectAnalysisChart",
    ()=>SubjectAnalysisChart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function SubjectAnalysisChart({ title, items }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "rounded-xl border border-slate-200 bg-white p-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "mb-4 font-bold text-slate-800",
                children: title
            }, void 0, false, {
                fileName: "[project]/src/app/exam/result/[sessionId]/_components/SubjectAnalysisChart.tsx",
                lineNumber: 6,
                columnNumber: 7
            }, this),
            !items.length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-slate-500",
                children: "尚無分析資料"
            }, void 0, false, {
                fileName: "[project]/src/app/exam/result/[sessionId]/_components/SubjectAnalysisChart.tsx",
                lineNumber: 7,
                columnNumber: 25
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "space-y-5",
                children: items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-2 flex justify-between gap-3 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold",
                                        children: item.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/exam/result/[sessionId]/_components/SubjectAnalysisChart.tsx",
                                        lineNumber: 11,
                                        columnNumber: 70
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "正確率 ",
                                            item.accuracy,
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/exam/result/[sessionId]/_components/SubjectAnalysisChart.tsx",
                                        lineNumber: 11,
                                        columnNumber: 120
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/exam/result/[sessionId]/_components/SubjectAnalysisChart.tsx",
                                lineNumber: 11,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                role: "meter",
                                "aria-label": `${item.name}正確率`,
                                "aria-valuemin": 0,
                                "aria-valuemax": 100,
                                "aria-valuenow": item.accuracy,
                                className: "h-2 overflow-hidden rounded-full bg-slate-100",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-full rounded-full bg-[#2f5597]",
                                    style: {
                                        width: `${item.accuracy}%`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/app/exam/result/[sessionId]/_components/SubjectAnalysisChart.tsx",
                                    lineNumber: 13,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/exam/result/[sessionId]/_components/SubjectAnalysisChart.tsx",
                                lineNumber: 12,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-xs leading-relaxed text-slate-500",
                                children: [
                                    "共 ",
                                    item.total,
                                    " 題 · 答對 ",
                                    item.correct,
                                    " · 答錯 ",
                                    item.wrong,
                                    " · 未作答 ",
                                    item.unanswered,
                                    item.ungraded > 0 ? ` · 無法判分 ${item.ungraded}` : ''
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/exam/result/[sessionId]/_components/SubjectAnalysisChart.tsx",
                                lineNumber: 15,
                                columnNumber: 13
                            }, this)
                        ]
                    }, item.name, true, {
                        fileName: "[project]/src/app/exam/result/[sessionId]/_components/SubjectAnalysisChart.tsx",
                        lineNumber: 10,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/exam/result/[sessionId]/_components/SubjectAnalysisChart.tsx",
                lineNumber: 8,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/exam/result/[sessionId]/_components/SubjectAnalysisChart.tsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
_c = SubjectAnalysisChart;
var _c;
__turbopack_context__.k.register(_c, "SubjectAnalysisChart");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);})()

//# sourceMappingURL=src_app_exam_0_00m3879evw-._.js.map