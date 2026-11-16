(()=>{"use strict";module.exports = [
"[project]/src/services/examResults.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "loadExamResult",
    ()=>loadExamResult,
    "saveExamResult",
    ()=>saveExamResult
]);
const prefix = 'exam-result:v1:';
function saveExamResult(result) {
    try {
        localStorage.setItem(prefix + result.id, JSON.stringify(result));
        return true;
    } catch  {
        return false;
    }
}
function loadExamResult(id) {
    try {
        const value = JSON.parse(localStorage.getItem(prefix + id) || 'null');
        if (!value || value.version !== 1 || value.id !== id || !value.exam || typeof value.exam.title !== 'string' || !Array.isArray(value.exam.questions) || !value.answers || typeof value.answers !== 'object' || Array.isArray(value.answers)) return null;
        if (!value.exam.questions.every((q)=>typeof q.id === 'string' && typeof q.prompt === 'string' && Number.isFinite(q.points) && Array.isArray(q.options) && q.options.every((option)=>typeof option.id === 'string' && typeof option.text === 'string') && (q.answer === undefined || typeof q.answer === 'string'))) return null;
        if (!Object.values(value.answers).every((answer)=>typeof answer === 'string' || Array.isArray(answer) && answer.every((token)=>typeof token === 'string'))) return null;
        return value;
    } catch  {
        return null;
    }
}
}),
"[project]/src/services/excelDatabaseExport.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "auditLogsToSheetData",
    ()=>auditLogsToSheetData,
    "categoriesToSheetData",
    ()=>categoriesToSheetData,
    "currentUserToUsersSheetData",
    ()=>currentUserToUsersSheetData,
    "downloadCustomExamAsGoogleSheetExcel",
    ()=>downloadCustomExamAsGoogleSheetExcel,
    "downloadFullOfflinePack",
    ()=>downloadFullOfflinePack,
    "downloadQuestionsAsGoogleSheetExcel",
    ()=>downloadQuestionsAsGoogleSheetExcel,
    "examPaperToQuizBankSheetData",
    ()=>examPaperToQuizBankSheetData,
    "examPapersToQuizBankSheetData",
    ()=>examPapersToQuizBankSheetData,
    "generatePersonalDatabaseBlob",
    ()=>generatePersonalDatabaseBlob,
    "generatePublicDatabaseBlob",
    ()=>generatePublicDatabaseBlob,
    "questionsToTestBankSheetData",
    ()=>questionsToTestBankSheetData,
    "rolesToSheetData",
    ()=>rolesToSheetData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$track$2d$dynamic$2d$import$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/track-dynamic-import.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/utils/formatters.ts [app-ssr] (ecmascript) <locals>");
'use client';
;
;
const TEST_BANK_HEADERS = [
    'id',
    'test_id',
    'question',
    'option',
    'answer',
    'Explanation',
    'difficulty',
    'score',
    'category_id',
    'taqs',
    'updated_at',
    'updated_by',
    'time'
];
const QUIZ_BANK_HEADERS = [
    'id',
    'quiz_id',
    'quiz_name',
    'categories',
    'difficulty',
    'number',
    'score',
    'time',
    'update_time',
    'test_id'
];
const CATEGORIES_HEADERS = [
    'id',
    'code',
    'name',
    'description',
    'parent_id',
    'sort_order',
    'is_active',
    'created_at',
    'updated_at'
];
const ROLES_HEADERS = [
    'id',
    'code',
    'name',
    'description',
    'created_at'
];
const USERS_HEADERS = [
    'id',
    'uuid',
    'status',
    'role',
    'name',
    'identifier',
    'credential',
    'google_sheet_URL',
    'last_login_at',
    'created_at',
    'updated_at'
];
const LOG_HEADERS = [
    'id',
    'log_id',
    'action',
    'target',
    'operator',
    'timestamp',
    'status'
];
function triggerBlobDownload(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(()=>URL.revokeObjectURL(url), 1000);
}
function makeHeaderRow(headers) {
    return headers.map((header)=>({
            value: header,
            type: String,
            fontWeight: 'bold',
            backgroundColor: '#004ac6',
            color: '#ffffff',
            wrap: true
        }));
}
function questionsToTestBankSheetData(questions) {
    const nowStr = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatSheetTimestamp"])();
    const headerRow = makeHeaderRow(TEST_BANK_HEADERS);
    const dataRows = questions.map((q, idx)=>{
        let optionStr = '';
        if (q.option) {
            optionStr = q.option;
        } else if (q.options && q.options.length > 0) {
            optionStr = JSON.stringify(q.options);
        } else if (q.optionsMap) {
            optionStr = JSON.stringify(q.optionsMap);
        }
        const tagsStr = Array.isArray(q.tags) ? q.tags.join(', ') : q.tags || '';
        return [
            {
                value: idx + 1,
                type: Number
            },
            {
                value: q.id || q.test_id || `Q-${idx + 1}`,
                type: String
            },
            {
                value: q.content || q.question || '',
                type: String,
                wrap: true
            },
            {
                value: optionStr,
                type: String,
                wrap: true
            },
            {
                value: q.correctAnswer || q.answer || '',
                type: String
            },
            {
                value: q.explanation || '',
                type: String,
                wrap: true
            },
            {
                value: Number(q.difficultyScore ?? (q.difficulty === 'hard' ? 4 : q.difficulty === 'medium' ? 3 : 2)),
                type: Number
            },
            {
                value: Number(q.points ?? 10),
                type: Number
            },
            {
                value: Number(q.categoryId ?? 3),
                type: Number
            },
            {
                value: tagsStr,
                type: String
            },
            {
                value: q.updatedAt || nowStr,
                type: String
            },
            {
                value: Number(q.updatedBy ?? 1),
                type: Number
            },
            {
                value: Number(q.time ?? 1),
                type: Number
            }
        ];
    });
    return [
        headerRow,
        ...dataRows
    ];
}
function examPapersToQuizBankSheetData(papers) {
    const headerRow = makeHeaderRow(QUIZ_BANK_HEADERS);
    const dataRows = papers.map((paper, idx)=>[
            {
                value: idx + 1,
                type: Number
            },
            {
                value: paper.id,
                type: String
            },
            {
                value: paper.title,
                type: String,
                wrap: true
            },
            {
                value: paper.subject,
                type: String
            },
            {
                value: Number(paper.difficultyLv ?? 3),
                type: Number
            },
            {
                value: Number(paper.questionCount ?? 0),
                type: Number
            },
            {
                value: Number(paper.totalScore ?? 100),
                type: Number
            },
            {
                value: Number(paper.durationMinutes ?? 30),
                type: Number
            },
            {
                value: paper.createdAt || (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatSheetTimestamp"])(),
                type: String
            },
            {
                value: paper.questionIds ? paper.questionIds.join(', ') : '',
                type: String
            }
        ]);
    return [
        headerRow,
        ...dataRows
    ];
}
function examPaperToQuizBankSheetData(paper) {
    return examPapersToQuizBankSheetData([
        paper
    ]);
}
function categoriesToSheetData(categories) {
    const headerRow = makeHeaderRow(CATEGORIES_HEADERS);
    const now = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatSheetTimestamp"])();
    const dataRows = categories.map((cat, idx)=>[
            {
                value: Number(cat.id || idx + 1),
                type: Number
            },
            {
                value: cat.code || `CAT_${cat.id || idx + 1}`,
                type: String
            },
            {
                value: cat.categories_name || cat.name || '',
                type: String
            },
            {
                value: cat.description || '',
                type: String
            },
            {
                value: Number(cat.parent_id ?? 0),
                type: Number
            },
            {
                value: Number(cat.sort_order ?? idx + 1),
                type: Number
            },
            {
                value: 1,
                type: Number
            },
            {
                value: now,
                type: String
            },
            {
                value: now,
                type: String
            }
        ]);
    return [
        headerRow,
        ...dataRows
    ];
}
function rolesToSheetData(roles) {
    const headerRow = makeHeaderRow(ROLES_HEADERS);
    const now = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatSheetTimestamp"])();
    const dataRows = roles.map((role, idx)=>[
            {
                value: Number(role.id || idx + 1),
                type: Number
            },
            {
                value: role.code,
                type: String
            },
            {
                value: role.name,
                type: String
            },
            {
                value: role.description || '',
                type: String
            },
            {
                value: role.created_at || now,
                type: String
            }
        ]);
    return [
        headerRow,
        ...dataRows
    ];
}
function currentUserToUsersSheetData(currentUser) {
    const headerRow = makeHeaderRow(USERS_HEADERS);
    const now = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatSheetTimestamp"])();
    const user = currentUser || {
        id: 1,
        uuid: 'guest-offline-uuid',
        status: 1,
        role: 'USER',
        name: '離線使用者',
        nickname: '離線使用者',
        identifier: 'user',
        credential: '',
        google_sheet_URL: '',
        last_login_at: now,
        created_at: now,
        updated_at: now
    };
    const dataRow = [
        {
            value: Number(user.id || 1),
            type: Number
        },
        {
            value: user.uuid || 'user-uuid',
            type: String
        },
        {
            value: Number(user.status ?? 1),
            type: Number
        },
        {
            value: String(user.role || 'USER').toUpperCase(),
            type: String
        },
        {
            value: user.name || user.nickname || '使用者',
            type: String
        },
        {
            value: user.identifier || '',
            type: String
        },
        {
            value: '',
            type: String
        },
        {
            value: user.google_sheet_URL || '',
            type: String
        },
        {
            value: user.last_login_at || now,
            type: String
        },
        {
            value: user.created_at || now,
            type: String
        },
        {
            value: user.updated_at || now,
            type: String
        }
    ];
    return [
        headerRow,
        dataRow
    ];
}
function auditLogsToSheetData(logs) {
    const headerRow = makeHeaderRow(LOG_HEADERS);
    const dataRows = logs.map((log, idx)=>[
            {
                value: idx + 1,
                type: Number
            },
            {
                value: log.id,
                type: String
            },
            {
                value: log.action,
                type: String
            },
            {
                value: log.target,
                type: String
            },
            {
                value: log.operator,
                type: String
            },
            {
                value: log.timestamp,
                type: String
            },
            {
                value: log.status,
                type: String
            }
        ]);
    return [
        headerRow,
        ...dataRows
    ];
}
async function generatePublicDatabaseBlob(params) {
    const { default: writeXlsxFile } = await /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$track$2d$dynamic$2d$import$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["trackDynamicImport"])(__turbopack_context__.A("[project]/node_modules/write-excel-file/browser/index.js [app-ssr] (ecmascript, async loader)"));
    const sheets = [
        {
            sheet: 'categories',
            data: categoriesToSheetData(params.categories)
        },
        {
            sheet: 'test_bank',
            data: questionsToTestBankSheetData(params.questions)
        },
        {
            sheet: 'quiz_bank_publish',
            data: examPapersToQuizBankSheetData(params.publishedExams)
        },
        {
            sheet: 'quiz_bank_unpublish',
            data: examPapersToQuizBankSheetData(params.draftExams || [])
        },
        {
            sheet: 'users',
            data: currentUserToUsersSheetData(params.currentUser)
        },
        {
            sheet: 'roles',
            data: rolesToSheetData(params.roles || [
                {
                    id: 1,
                    code: 'ADMIN',
                    name: '管理員',
                    description: '系統完整管理權限'
                },
                {
                    id: 2,
                    code: 'USER',
                    name: '一般用戶',
                    description: '題庫瀏覽、自選考卷與考試'
                }
            ])
        },
        {
            sheet: 'log',
            data: auditLogsToSheetData(params.auditLogs || [])
        }
    ];
    return await writeXlsxFile(sheets);
}
async function generatePersonalDatabaseBlob(params) {
    const { default: writeXlsxFile } = await /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$track$2d$dynamic$2d$import$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["trackDynamicImport"])(__turbopack_context__.A("[project]/node_modules/write-excel-file/browser/index.js [app-ssr] (ecmascript, async loader)"));
    const sheets = [
        {
            sheet: 'quiz_bank_publish',
            data: examPapersToQuizBankSheetData(params.exams)
        },
        {
            sheet: 'test_bank',
            data: questionsToTestBankSheetData(params.questions)
        }
    ];
    return await writeXlsxFile(sheets);
}
async function downloadFullOfflinePack(params) {
    const now = new Date().toISOString();
    // 1. 產生公用與個人 Blobs
    const publicBlob = await generatePublicDatabaseBlob({
        categories: params.publicData.categories,
        questions: params.publicData.questions,
        publishedExams: params.publicData.publishedExams,
        draftExams: params.publicData.draftExams,
        roles: params.publicData.roles,
        currentUser: params.currentUser,
        auditLogs: params.publicData.auditLogs
    });
    const personalBlob = await generatePersonalDatabaseBlob({
        questions: params.personalData.questions,
        exams: params.personalData.exams
    });
    // 2. 本地快取快照儲存 (做為離線時資料庫與再次連線時比對用)
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    // 3. 依序觸發瀏覽器下載
    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    triggerBlobDownload(publicBlob, `公用題庫_離線唯讀_${timestamp}.xlsx`);
    // 稍作延遲確保瀏覽器皆能接連接收兩次下載
    await new Promise((resolve)=>setTimeout(resolve, 600));
    triggerBlobDownload(personalBlob, `個人題庫_離線可編_${timestamp}.xlsx`);
    return {
        publicBlob,
        personalBlob
    };
}
async function downloadCustomExamAsGoogleSheetExcel(paper, questions, customFilename) {
    const { default: writeXlsxFile } = await /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$track$2d$dynamic$2d$import$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["trackDynamicImport"])(__turbopack_context__.A("[project]/node_modules/write-excel-file/browser/index.js [app-ssr] (ecmascript, async loader)"));
    const quizSheetData = examPaperToQuizBankSheetData(paper);
    const testBankSheetData = questionsToTestBankSheetData(questions);
    const sheets = [
        {
            sheet: 'quiz_bank_publish',
            data: quizSheetData
        },
        {
            sheet: 'test_bank',
            data: testBankSheetData
        }
    ];
    const blob = await writeXlsxFile(sheets);
    const cleanTitle = paper.title.replace(/[\\/:*?"<>|]/g, '_');
    const filename = customFilename || `自選考卷_${cleanTitle}.xlsx`;
    triggerBlobDownload(blob, filename);
}
async function downloadQuestionsAsGoogleSheetExcel(questions, customFilename) {
    const { default: writeXlsxFile } = await /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$track$2d$dynamic$2d$import$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["trackDynamicImport"])(__turbopack_context__.A("[project]/node_modules/write-excel-file/browser/index.js [app-ssr] (ecmascript, async loader)"));
    const testBankSheetData = questionsToTestBankSheetData(questions);
    const blob = await writeXlsxFile(testBankSheetData, {
        sheet: 'test_bank'
    });
    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const filename = customFilename || `自訂題目庫_test_bank_${timestamp}.xlsx`;
    triggerBlobDownload(blob, filename);
}
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
    // 讀取離線公用題庫與考生自選組卷 (localStorage)
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const paper = examMap.get(examId);
    if (!paper) return null;
    // 題目資料庫查表：優先取線上題庫 (extraQuestions: 來自 Google Sheet) 或離線公用快照
    const questionMap = new Map();
    if (extraQuestions && extraQuestions.length > 0) {
        for (const q of extraQuestions){
            if (q?.id && !questionMap.has(q.id)) {
                questionMap.set(q.id, q);
            }
        }
    }
    // 若題庫為空，嘗試自離線公用快照與自建題庫載入
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const questionIds = Array.from(new Set(paper.questionIds || []));
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
    const seenIds = new Set();
    const uniqueMatchedQuestions = matchedQuestions.filter((q)=>{
        if (!q || !q.id) return false;
        if (seenIds.has(q.id)) return false;
        seenIds.add(q.id);
        return true;
    });
    const examQuestions = uniqueMatchedQuestions.map((q, idx)=>{
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
const INITIAL_CATEGORIES_DATA = [];
const SUBJECT_TO_CATEGORY_ID = {};
const CATEGORY_ID_TO_SUBJECT = {};
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
    const metaEnv = ("TURBOPACK compile-time truthy", 1) ? __TURBOPACK__import$2e$meta__.env : "TURBOPACK unreachable";
    const procEnv = typeof process !== 'undefined' ? process.env : undefined;
    return (procEnv?.NEXT_PUBLIC_GOOGLE_SHEET_URL || procEnv?.VITE_GOOGLE_SHEET_URL || procEnv?.GOOGLE_SHEET_URL || metaEnv?.NEXT_PUBLIC_GOOGLE_SHEET_URL || metaEnv?.VITE_PUBLIC_GOOGLE_SHEET_URL || metaEnv?.VITE_GOOGLE_SHEET_URL || '').trim();
}
function getEnvConfiguredScriptUrl() {
    const metaEnv = ("TURBOPACK compile-time truthy", 1) ? __TURBOPACK__import$2e$meta__.env : "TURBOPACK unreachable";
    const procEnv = typeof process !== 'undefined' ? process.env : undefined;
    return (procEnv?.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || procEnv?.VITE_GOOGLE_SCRIPT_URL || procEnv?.GOOGLE_SCRIPT_URL || metaEnv?.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || metaEnv?.VITE_GOOGLE_SCRIPT_URL || metaEnv?.GOOGLE_SCRIPT_URL || '').trim();
}
async function postToGasScript(payload) {
    const scriptUrl = getEnvConfiguredScriptUrl();
    if (!scriptUrl) {
        throw new Error('尚未設定 NEXT_PUBLIC_GOOGLE_SCRIPT_URL，請在 .env 中填入 Google Apps Script 部署網址');
    }
    // 1. 在瀏覽器端優先透過 Next.js BFF API (/api/sheet) 轉發，解決跨網域 CORS 與 302 重新導向問題
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    // 2. 伺服器端或直接 fetch GAS 端點
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
            '管理員 (Admin)',
            'admin',
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
            const categoryId = q.categoryId || 0;
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
        categoryHeaders
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
            const operator = String(row[4] || '').trim();
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
        throw new Error('尚未設定 Google Sheet 資料庫網址，請確認 .env 中的 NEXT_PUBLIC_GOOGLE_SHEET_URL 設定');
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
    if (sheetRowsMap['users'] && sheetRowsMap['users'].length > 0) {
        const roles = parseRolesFromSheetRows(sheetRowsMap['roles'] || []);
        const users = parseUsersFromSheetRows(sheetRowsMap['users'] || [], roles);
        return {
            users,
            roles
        };
    }
    // 3. 只有當線上 Google Sheet 完全斷線/離線時，才降級至本地離線快照
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    throw new Error('無法讀取 Google Sheet 中的 users 資料表，請確認試算表權限或網路連線');
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
        throw new Error('無法讀取試算表內容，請確認 NEXT_PUBLIC_GOOGLE_SHEET_URL 正確且已開啟「知道連結的任何人皆可檢視」權限，或先完成 Google 帳號授權。');
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
                headers: DATABASE_TABLE_SCHEMAS.users.columns.map((c)=>c.label),
                row: rowValues,
                rowValues
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
    const categoryId = question.categoryId || 0;
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
        throw new Error('請在 .env 設定 NEXT_PUBLIC_GOOGLE_SCRIPT_URL 以免登入直接寫入試算表');
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
        throw new Error('請在 .env 設定 NEXT_PUBLIC_GOOGLE_SCRIPT_URL 以免登入直接寫入試算表');
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
        throw new Error('請在 .env 設定 NEXT_PUBLIC_GOOGLE_SCRIPT_URL 以免登入直接更新試算表');
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
"[project]/src/services/resultExport.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createWrongQuestionsFile",
    ()=>createWrongQuestionsFile,
    "downloadWrongQuestions",
    ()=>downloadWrongQuestions,
    "exportWrongQuestionsToGoogleSheet",
    ()=>exportWrongQuestionsToGoogleSheet,
    "resultExcelCells",
    ()=>resultExcelCells,
    "resultExportRows",
    ()=>resultExportRows
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$track$2d$dynamic$2d$import$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/track-dynamic-import.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$examReport$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/examReport.ts [app-ssr] (ecmascript)");
;
;
function resultExportRows(items) {
    return [
        [
            '題號',
            '題目 ID',
            '學科',
            '難度',
            '題目',
            '選項',
            '考生答案',
            '正確答案',
            '作答結果',
            '配分',
            '得分',
            '解析'
        ],
        ...items.map((item)=>[
                item.number,
                item.question.id,
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$examReport$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subjectName"])(item.question),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$examReport$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["difficultyName"])(item.question),
                item.question.prompt,
                item.question.options.map((option)=>`${option.id}. ${option.text}`).join('\n'),
                item.actual.join(', ') || '未作答',
                item.expected.join(', ') || '未提供',
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$examReport$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["statusLabels"][item.status],
                item.question.points,
                item.earned,
                item.question.explanation || '尚未提供解析'
            ])
    ];
}
function resultExcelCells(items) {
    return resultExportRows(items).map((row, index)=>row.map((value)=>({
                value,
                type: typeof value === 'number' ? Number : String,
                wrap: true,
                ...index === 0 ? {
                    fontWeight: 'bold',
                    color: '#ffffff',
                    backgroundColor: '#2f5597'
                } : {}
            })));
}
async function createWrongQuestionsFile(items) {
    const { default: writeXlsxFile } = await /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$track$2d$dynamic$2d$import$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["trackDynamicImport"])(__turbopack_context__.A("[project]/node_modules/write-excel-file/browser/index.js [app-ssr] (ecmascript, async loader)"));
    return writeXlsxFile(resultExcelCells(items), {
        sheet: '錯題檢討',
        stickyRowsCount: 1,
        columns: resultExportRows([])[0].map((_, index)=>({
                width: [
                    4,
                    5,
                    11
                ].includes(index) ? 52 : 16
            }))
    }).toBlob();
}
async function downloadWrongQuestions(items, title) {
    const blob = await createWrongQuestionsFile(items);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `錯題_${title.replace(/[\\/:*?"<>|]/g, '_')}.xlsx`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(()=>URL.revokeObjectURL(url), 1000);
}
async function exportWrongQuestionsToGoogleSheet(items, title, accessToken) {
    if (!accessToken) throw new Error('請先登入 Google 並授權存取試算表。');
    if (!items.length) throw new Error('目前沒有可匯出的錯題。');
    // Create and populate atomically; stringValue never interprets question text as a formula.
    const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            properties: {
                title: `${title} — 錯題檢討`
            },
            sheets: [
                {
                    properties: {
                        title: '錯題檢討',
                        gridProperties: {
                            frozenRowCount: 1
                        }
                    },
                    data: [
                        {
                            rowData: resultExportRows(items).map((row)=>({
                                    values: row.map((value)=>({
                                            userEnteredValue: typeof value === 'number' ? {
                                                numberValue: value
                                            } : {
                                                stringValue: value
                                            }
                                        }))
                                }))
                        }
                    ]
                }
            ]
        })
    });
    const data = await response.json();
    if (!response.ok) {
        if (response.status === 401) throw new Error('Google 授權已過期，請重新登入後再匯出。');
        if (response.status === 403) throw new Error('Google 拒絕寫入，請確認已授權 Google Sheets，且專案已啟用 Sheets API。');
        throw new Error(data.error?.message || 'Google 試算表匯出失敗，請稍後重試。');
    }
    if (typeof data.spreadsheetId !== 'string' || !/^[\w-]+$/.test(data.spreadsheetId)) {
        throw new Error('Google 未回傳有效的試算表 ID。');
    }
    return `https://docs.google.com/spreadsheets/d/${data.spreadsheetId}/edit`;
}
}),
"[project]/src/services/userSheet.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "appendExamToUserSheet",
    ()=>appendExamToUserSheet,
    "appendQuestionToUserSheet",
    ()=>appendQuestionToUserSheet,
    "readUserPrivateSheet",
    ()=>readUserPrivateSheet,
    "syncPersonalDataToUserSheet",
    ()=>syncPersonalDataToUserSheet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$sheetParser$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/sheetParser.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$publicSheet$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/services/publicSheet.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/utils/formatters.ts [app-ssr] (ecmascript) <locals>");
;
;
;
async function readUserPrivateSheet(accessToken, userSheetUrl) {
    const spreadsheetId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$sheetParser$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["extractSpreadsheetId"])(userSheetUrl);
    if (!spreadsheetId) {
        throw new Error('無效的個人 Google 試算表網址 (google_sheet_URL)');
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$publicSheet$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["readAllTablesFromSpreadsheet"])(accessToken, spreadsheetId);
}
async function appendQuestionToUserSheet(accessToken, userSheetUrl, question, rowIndex) {
    const spreadsheetId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$sheetParser$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["extractSpreadsheetId"])(userSheetUrl);
    if (!spreadsheetId) {
        throw new Error('無效的個人 Google 試算表網址 (google_sheet_URL)');
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$publicSheet$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["appendQuestionToSpreadsheet"])(accessToken, spreadsheetId, question, rowIndex);
}
async function appendExamToUserSheet(accessToken, userSheetUrl, exam, rowIndex) {
    const spreadsheetId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$sheetParser$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["extractSpreadsheetId"])(userSheetUrl);
    if (!spreadsheetId) {
        throw new Error('無效的個人 Google 試算表網址 (google_sheet_URL)');
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$publicSheet$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["appendExamToSpreadsheet"])(accessToken, spreadsheetId, exam, rowIndex);
}
async function syncPersonalDataToUserSheet(accessToken, userSheetUrl, questions, exams) {
    const spreadsheetId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$sheetParser$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["extractSpreadsheetId"])(userSheetUrl);
    if (!spreadsheetId) {
        throw new Error('無效的個人 Google 試算表網址 (google_sheet_URL)');
    }
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$publicSheet$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ensureSpreadsheetTablesExist"])(accessToken, spreadsheetId);
    // 清空使用者的 test_bank 與 quiz_bank_publish 既有內容
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
                    'quiz_bank_publish!A1:Z'
                ]
            })
        });
    } catch (err) {
        console.warn('Clear user sheet warning:', err);
    }
    // 1. 產生 test_bank 資料
    const testBankHeaders = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$publicSheet$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["DATABASE_TABLE_SCHEMAS"].test_bank.columns.map((c)=>c.label);
    const now = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatSheetTimestamp"])();
    const testBankRows = [
        testBankHeaders,
        ...questions.map((q, idx)=>{
            let optionStr = '';
            if (q.option) {
                optionStr = q.option;
            } else if (q.options && q.options.length > 0) {
                optionStr = JSON.stringify(q.options);
            } else if (q.optionsMap) {
                optionStr = JSON.stringify(q.optionsMap);
            }
            return [
                idx + 1,
                q.id || q.test_id || `Q-${idx + 1}`,
                q.content || q.question || '',
                optionStr,
                q.correctAnswer || q.answer || '',
                q.explanation || '',
                Number(q.difficultyScore ?? 3),
                Number(q.points ?? 10),
                Number(q.categoryId ?? 3),
                Array.isArray(q.tags) ? q.tags.join(', ') : q.tags || '',
                q.updatedAt || now,
                Number(q.updatedBy ?? 1),
                Number(q.time ?? 1)
            ];
        })
    ];
    // 2. 產生 quiz_bank_publish 資料
    const pubHeaders = [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$publicSheet$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["DATABASE_TABLE_SCHEMAS"].quiz_bank_publish.columns.map((c)=>c.label),
        'test_id'
    ];
    const pubRows = [
        pubHeaders,
        ...exams.map((e, idx)=>[
                idx + 1,
                e.id,
                e.title,
                e.subject,
                e.difficultyLv ?? 3,
                e.questionCount ?? 0,
                e.totalScore ?? 100,
                e.durationMinutes ?? 30,
                e.createdAt || now,
                e.questionIds ? e.questionIds.join(', ') : ''
            ])
    ];
    const batchData = [
        {
            range: 'test_bank!A1',
            values: testBankRows
        },
        {
            range: 'quiz_bank_publish!A1',
            values: pubRows
        }
    ];
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
        throw new Error(errorData.error?.message || `寫入個人試算表失敗 (${res.status})`);
    }
    return {
        success: true,
        message: `已成功將本地 ${questions.length} 題個人試題與 ${exams.length} 份個人試卷同步寫入至個人 Google Sheet！`
    };
}
}),
];})()

//# sourceMappingURL=src_services_0o8isvmug387c._.js.map