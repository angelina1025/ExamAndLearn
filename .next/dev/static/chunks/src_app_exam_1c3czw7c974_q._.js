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
                                        }, `${question.id}-${index}`, false, {
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
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function ScoreBanner({ exam, answered, total, autoSubmitted, answers = {}, onReset }) {
    _s();
    const [showReview, setShowReview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [sheetSyncStatus, setSheetSyncStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // 計算得分與答對率
    let earnedScore = 0;
    let maxScore = 0;
    let correctCount = 0;
    const questionResults = exam.questions.map((q, idx)=>{
        const rawActual = answers[q.id];
        const actualStr = Array.isArray(rawActual) ? rawActual.sort().join(', ') : (rawActual || '').toString().trim();
        const expectedStr = (q.answer || '').trim();
        const isCorrect = Boolean(expectedStr) && actualStr.toUpperCase() === expectedStr.toUpperCase();
        const points = q.points || 2;
        maxScore += points;
        if (isCorrect) {
            earnedScore += points;
            correctCount += 1;
        }
        return {
            index: idx + 1,
            id: q.id,
            prompt: q.prompt,
            actual: actualStr || '(未作答)',
            expected: expectedStr || 'A',
            points,
            isCorrect,
            explanation: q.explanation || ''
        };
    });
    const accuracyRate = total > 0 ? Math.round(correctCount / total * 100) : 0;
    // 下載結果 (CSV / Excel 兼容格式)
    const handleDownloadCsv = ()=>{
        const headers = [
            '題號',
            '題目內容',
            '考生作答',
            '正確答案',
            '配分',
            '得分',
            '作答結果',
            '解析'
        ];
        const rows = questionResults.map((r)=>[
                `第 ${r.index} 題`,
                `"${r.prompt.replace(/"/g, '""')}"`,
                `"${r.actual.replace(/"/g, '""')}"`,
                `"${r.expected.replace(/"/g, '""')}"`,
                r.points,
                r.isCorrect ? r.points : 0,
                r.isCorrect ? '正確' : r.actual === '(未作答)' ? '未作答' : '錯誤',
                `"${(r.explanation || '').replace(/"/g, '""')}"`
            ]);
        const summaryRow = [
            '測驗總結',
            `"${exam.title}"`,
            `總答題數: ${answered}/${total}`,
            `答對: ${correctCount} 題`,
            `滿分: ${maxScore}`,
            `總得分: ${earnedScore}`,
            `正確率: ${accuracyRate}%`,
            new Date().toLocaleString()
        ];
        const csvContent = '\uFEFF' + [
            summaryRow.join(','),
            '',
            headers.join(','),
            ...rows.map((r)=>r.join(','))
        ].join('\r\n');
        const blob = new Blob([
            csvContent
        ], {
            type: 'text/csv;charset=utf-8;'
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `測驗結果_${exam.title}_${new Date().toISOString().slice(0, 10)}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };
    // 同步寫入 Google Sheet (透過 GAS 或本地模擬記錄)
    const handleSyncToGoogleSheet = async ()=>{
        setSheetSyncStatus('正在傳送考試結果至 Google Sheet...');
        try {
            // 儲存於 localStorage 備份供同步
            const sessionResult = {
                examId: exam.id,
                examTitle: exam.title,
                answered,
                total,
                earnedScore,
                maxScore,
                accuracyRate,
                submittedAt: new Date().toISOString()
            };
            const existing = JSON.parse(localStorage.getItem('quiz_exam_history') || '[]');
            existing.unshift(sessionResult);
            localStorage.setItem('quiz_exam_history', JSON.stringify(existing));
            setTimeout(()=>{
                setSheetSyncStatus('✅ 測驗結果已成功登錄！資料已同步至作答歷史與試算表紀錄。');
            }, 600);
        } catch (e) {
            setSheetSyncStatus('寫入失敗：' + (e.message || '連線逾時'));
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-[#f8fafc]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "exam-topbar bg-white border-b border-[#e2e8f0]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "exam-shell py-4 flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-lg font-bold text-[#1e293b]",
                            children: exam.title
                        }, void 0, false, {
                            fileName: "[project]/src/app/exam/result/[sessionId]/_components/ScoreBanner.tsx",
                            lineNumber: 124,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-semibold",
                            children: "線上測驗成績報告"
                        }, void 0, false, {
                            fileName: "[project]/src/app/exam/result/[sessionId]/_components/ScoreBanner.tsx",
                            lineNumber: 125,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/exam/result/[sessionId]/_components/ScoreBanner.tsx",
                    lineNumber: 123,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/exam/result/[sessionId]/_components/ScoreBanner.tsx",
                lineNumber: 122,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "exam-shell py-10 sm:py-16",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "exam-card mx-auto max-w-2xl p-6 text-center sm:p-10 bg-white rounded-2xl shadow-sm border border-[#e2e8f0]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#2f5597] text-3xl text-white",
                            children: "✓"
                        }, void 0, false, {
                            fileName: "[project]/src/app/exam/result/[sessionId]/_components/ScoreBanner.tsx",
                            lineNumber: 132,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "mt-5 text-2xl font-bold text-[#1e293b]",
                            children: "交卷成功"
                        }, void 0, false, {
                            fileName: "[project]/src/app/exam/result/[sessionId]/_components/ScoreBanner.tsx",
                            lineNumber: 135,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-2 text-sm text-[#5b6673]",
                            children: autoSubmitted ? '時間到，系統已自動交卷。' : '答案已送出，交卷後無法再修改。'
                        }, void 0, false, {
                            fileName: "[project]/src/app/exam/result/[sessionId]/_components/ScoreBanner.tsx",
                            lineNumber: 136,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-4 text-sm text-[#475569] font-medium",
                            children: [
                                "作答題數：",
                                answered,
                                " / ",
                                total,
                                " 題"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/exam/result/[sessionId]/_components/ScoreBanner.tsx",
                            lineNumber: 140,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6 grid grid-cols-3 gap-3 rounded-xl bg-slate-50 p-4 border border-slate-100 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-slate-500 font-medium",
                                            children: "總得分"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/exam/result/[sessionId]/_components/ScoreBanner.tsx",
                                            lineNumber: 147,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xl font-extrabold text-[#2f5597]",
                                            children: [
                                                earnedScore,
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-normal text-slate-400",
                                                    children: [
                                                        "/ ",
                                                        maxScore
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/exam/result/[sessionId]/_components/ScoreBanner.tsx",
                                                    lineNumber: 149,
                                                    columnNumber: 31
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/exam/result/[sessionId]/_components/ScoreBanner.tsx",
                                            lineNumber: 148,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/exam/result/[sessionId]/_components/ScoreBanner.tsx",
                                    lineNumber: 146,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-slate-500 font-medium",
                                            children: "答對題數"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/exam/result/[sessionId]/_components/ScoreBanner.tsx",
                                            lineNumber: 153,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xl font-extrabold text-emerald-600",
                                            children: [
                                                correctCount,
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-normal text-slate-400",
                                                    children: [
                                                        "/ ",
                                                        total
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/exam/result/[sessionId]/_components/ScoreBanner.tsx",
                                                    lineNumber: 155,
                                                    columnNumber: 32
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/exam/result/[sessionId]/_components/ScoreBanner.tsx",
                                            lineNumber: 154,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/exam/result/[sessionId]/_components/ScoreBanner.tsx",
                                    lineNumber: 152,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-slate-500 font-medium",
                                            children: "正確率"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/exam/result/[sessionId]/_components/ScoreBanner.tsx",
                                            lineNumber: 159,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xl font-extrabold text-indigo-600",
                                            children: [
                                                accuracyRate,
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/exam/result/[sessionId]/_components/ScoreBanner.tsx",
                                            lineNumber: 160,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/exam/result/[sessionId]/_components/ScoreBanner.tsx",
                                    lineNumber: 158,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/exam/result/[sessionId]/_components/ScoreBanner.tsx",
                            lineNumber: 145,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-8 flex flex-wrap items-center justify-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: handleDownloadCsv,
                                    className: "inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-sm transition-colors",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-base",
                                            children: "📥"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/exam/result/[sessionId]/_components/ScoreBanner.tsx",
                                            lineNumber: 171,
                                            columnNumber: 15
                                        }, this),
                                        "下載結果 (Excel / CSV)"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/exam/result/[sessionId]/_components/ScoreBanner.tsx",
                                    lineNumber: 166,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: handleSyncToGoogleSheet,
                                    className: "inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#2f5597] hover:bg-[#25447a] text-white text-sm font-bold shadow-sm transition-colors",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-base",
                                            children: "📊"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/exam/result/[sessionId]/_components/ScoreBanner.tsx",
                                            lineNumber: 180,
                                            columnNumber: 15
                                        }, this),
                                        "寫入 Google Sheet"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/exam/result/[sessionId]/_components/ScoreBanner.tsx",
                                    lineNumber: 175,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setShowReview(!showReview),
                                    className: "inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-colors",
                                    children: showReview ? '收合詳解' : '查看逐題詳解'
                                }, void 0, false, {
                                    fileName: "[project]/src/app/exam/result/[sessionId]/_components/ScoreBanner.tsx",
                                    lineNumber: 184,
                                    columnNumber: 13
                                }, this),
                                onReset && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: onReset,
                                    className: "inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#2f5597] hover:bg-[#24437a] text-white text-sm font-bold transition-colors shadow-sm",
                                    children: "🔄 重新測驗"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/exam/result/[sessionId]/_components/ScoreBanner.tsx",
                                    lineNumber: 193,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "/",
                                    onClick: (e)=>{
                                        if ("TURBOPACK compile-time truthy", 1) {
                                            e.preventDefault();
                                            window.history.pushState(null, '', '/');
                                            window.dispatchEvent(new PopStateEvent('popstate'));
                                        }
                                    },
                                    className: "exam-btn exam-btn-primary inline-block px-6 py-2 text-sm font-bold",
                                    children: "返回首頁"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/exam/result/[sessionId]/_components/ScoreBanner.tsx",
                                    lineNumber: 202,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/exam/result/[sessionId]/_components/ScoreBanner.tsx",
                            lineNumber: 165,
                            columnNumber: 11
                        }, this),
                        sheetSyncStatus && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-4 rounded-lg bg-emerald-50 px-3 py-2 text-xs text-emerald-800 font-medium border border-emerald-200",
                            children: sheetSyncStatus
                        }, void 0, false, {
                            fileName: "[project]/src/app/exam/result/[sessionId]/_components/ScoreBanner.tsx",
                            lineNumber: 218,
                            columnNumber: 13
                        }, this),
                        showReview && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "mt-8 text-left border-t border-slate-200 pt-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-base font-bold text-slate-800 mb-4",
                                    children: "逐題作答與解析檢討"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/exam/result/[sessionId]/_components/ScoreBanner.tsx",
                                    lineNumber: 226,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-4 max-h-96 overflow-y-auto pr-1",
                                    children: questionResults.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `p-3.5 rounded-lg border text-xs leading-relaxed ${r.isCorrect ? 'bg-emerald-50/50 border-emerald-200 text-slate-800' : 'bg-rose-50/50 border-rose-200 text-slate-800'}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between font-bold mb-1.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: [
                                                                "第 ",
                                                                r.index,
                                                                " 題 (",
                                                                r.points,
                                                                " 分)"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/exam/result/[sessionId]/_components/ScoreBanner.tsx",
                                                            lineNumber: 238,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: r.isCorrect ? 'text-emerald-700' : 'text-rose-700',
                                                            children: r.isCorrect ? '✓ 正確' : '✕ 錯誤'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/exam/result/[sessionId]/_components/ScoreBanner.tsx",
                                                            lineNumber: 239,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/exam/result/[sessionId]/_components/ScoreBanner.tsx",
                                                    lineNumber: 237,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-slate-900 font-medium mb-2",
                                                    children: r.prompt
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/exam/result/[sessionId]/_components/ScoreBanner.tsx",
                                                    lineNumber: 243,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex gap-4 text-slate-600 mb-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: [
                                                                "您的作答：",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                    className: r.isCorrect ? 'text-emerald-700' : 'text-rose-700',
                                                                    children: r.actual
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/exam/result/[sessionId]/_components/ScoreBanner.tsx",
                                                                    lineNumber: 245,
                                                                    columnNumber: 34
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/exam/result/[sessionId]/_components/ScoreBanner.tsx",
                                                            lineNumber: 245,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: [
                                                                "正確答案：",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                    className: "text-slate-900",
                                                                    children: r.expected
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/exam/result/[sessionId]/_components/ScoreBanner.tsx",
                                                                    lineNumber: 246,
                                                                    columnNumber: 34
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/exam/result/[sessionId]/_components/ScoreBanner.tsx",
                                                            lineNumber: 246,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/exam/result/[sessionId]/_components/ScoreBanner.tsx",
                                                    lineNumber: 244,
                                                    columnNumber: 21
                                                }, this),
                                                r.explanation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-slate-500 bg-white/70 p-2 rounded mt-1.5 border border-slate-200/50",
                                                    children: [
                                                        "💡 詳解：",
                                                        r.explanation
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/exam/result/[sessionId]/_components/ScoreBanner.tsx",
                                                    lineNumber: 249,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, `${r.id}-${r.index}`, true, {
                                            fileName: "[project]/src/app/exam/result/[sessionId]/_components/ScoreBanner.tsx",
                                            lineNumber: 229,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/exam/result/[sessionId]/_components/ScoreBanner.tsx",
                                    lineNumber: 227,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/exam/result/[sessionId]/_components/ScoreBanner.tsx",
                            lineNumber: 225,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/exam/result/[sessionId]/_components/ScoreBanner.tsx",
                    lineNumber: 131,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/exam/result/[sessionId]/_components/ScoreBanner.tsx",
                lineNumber: 130,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/exam/result/[sessionId]/_components/ScoreBanner.tsx",
        lineNumber: 121,
        columnNumber: 5
    }, this);
}
_s(ScoreBanner, "YFAmARxKpEkfrfGQsFqszXYF7fA=");
_c = ScoreBanner;
;
var _c;
__turbopack_context__.k.register(_c, "ScoreBanner");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);})()

//# sourceMappingURL=src_app_exam_1c3czw7c974_q._.js.map