import { Question, ExamPaper, Exam, SheetTableSchema, ReadSpreadsheetResult, SubjectId, CategoryItem, AuditLog, UserProfile, RoleItem, AuthLoginResult } from '@/types';
import { assignedExam } from '@/services/mockExamData';
import { INITIAL_QUESTIONS, INITIAL_EXAM_PAPERS } from '@/data/initialData';
import { formatSheetTimestamp } from '@/utils/formatters';
import { formatOptionsToJsonObject, parseSheetOptionJson, extractSpreadsheetId } from '@/utils/sheetParser';

export const ASSIGNED_EXAM_ID = 'assigned-demo';

export async function getAssignedExam(
  examId: string,
  extraExams: ExamPaper[] = [],
  extraQuestions: Question[] = []
): Promise<Exam | null> {
  if (examId === ASSIGNED_EXAM_ID) {
    return {
      ...assignedExam,
      questions: assignedExam.questions.map((question) => {
        const source = extraQuestions.find((q) => q.id === question.id)
          || INITIAL_QUESTIONS.find((q) => q.id === question.id);
        return {
          ...question,
          answer: source?.correctAnswer || source?.answer || question.answer,
          explanation: source?.explanation || question.explanation,
          subjectId: source?.subjectId,
          subjectName: '計算機概論',
          difficulty: source?.difficulty,
        };
      }),
    };
  }

  // 試卷查表：優先使用線上試卷 (extraExams: Google Sheet)；若離線或線上無試卷，才讀取 data 內試卷 INITIAL_EXAM_PAPERS
  const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
  const examMap = new Map<string, ExamPaper>();

  if (extraExams && extraExams.length > 0) {
    for (const e of extraExams) {
      if (e?.id && !examMap.has(e.id)) {
        examMap.set(e.id, e);
      }
    }
  }

  // 讀取考生自選組卷 (localStorage)
  if (typeof window !== 'undefined') {
    try {
      const customExams = JSON.parse(localStorage.getItem('quiz_custom_exams') || '[]');
      for (const e of customExams) {
        if (e?.id && !examMap.has(e.id)) {
          examMap.set(e.id, e);
        }
      }
    } catch {}
  }

  // 若線上試卷未包含該試卷，或處於離線狀態時，才讀取 data 內試卷 INITIAL_EXAM_PAPERS 備援
  if (!examMap.has(examId) || !isOnline) {
    for (const e of INITIAL_EXAM_PAPERS) {
      if (e?.id && !examMap.has(e.id)) {
        examMap.set(e.id, e);
      }
    }
  }

  const paper = examMap.get(examId);
  if (!paper) return null;

  // 題目資料庫查表：優先取線上題庫 (extraQuestions: 來自 Google Sheet)
  // 若線上題庫為空或處於離線狀態時，才去讀取 data 內題庫 INITIAL_QUESTIONS
  const questionMap = new Map<string, Question>();
  if (extraQuestions && extraQuestions.length > 0) {
    for (const q of extraQuestions) {
      if (q?.id && !questionMap.has(q.id)) {
        questionMap.set(q.id, q);
      }
    }
  }

  // 若線上題庫為空或處於離線狀態，才補入 data 內題庫 INITIAL_QUESTIONS 作為備援
  if (questionMap.size === 0 || !isOnline) {
    for (const q of INITIAL_QUESTIONS) {
      if (q?.id && !questionMap.has(q.id)) {
        questionMap.set(q.id, q);
      }
    }
  }

  // 若試卷指定的個別題目 ID 在線上未找到，亦可從 data 題庫備援補入
  const rawQuestionIds = paper.questionIds || [];
  const questionIds = Array.from(new Set(rawQuestionIds));
  for (const qId of questionIds) {
    if (!questionMap.has(qId)) {
      const fallbackQ = INITIAL_QUESTIONS.find((item) => item.id === qId);
      if (fallbackQ) {
        questionMap.set(fallbackQ.id, fallbackQ);
      }
    }
  }
  let matchedQuestions: Question[] = [];

  if (questionIds.length > 0) {
    matchedQuestions = questionIds
      .map((id) => questionMap.get(id))
      .filter((q): q is Question => Boolean(q));
  }

  if (matchedQuestions.length === 0) {
    const allQuestionsList = Array.from(questionMap.values());
    matchedQuestions = allQuestionsList
      .filter((q) => q.subjectId === paper.subjectId)
      .slice(0, paper.questionCount || 10);
  }

  if (matchedQuestions.length === 0) {
    matchedQuestions = Array.from(questionMap.values()).slice(0, paper.questionCount || 10);
  }

  const optionLetters = ['A', 'B', 'C', 'D', 'E'];
  const examQuestions = matchedQuestions.map((q, idx) => {
    const rawOptions =
      q.options && q.options.length > 0 ? q.options : ['選項 A', '選項 B', '選項 C', '選項 D'];
    return {
      id: q.id || `q-${idx + 1}`,
      test_id: q.id,
      type: (q.type === 'multiple' ? 'multiple' : 'single') as 'single' | 'multiple' | 'boolean',
      prompt: q.content || q.question || '',
      options: rawOptions.map((text, oIdx) => ({
        id: optionLetters[oIdx] || String(oIdx + 1),
        text,
      })),
      points: q.points ?? 2,
      answer: q.correctAnswer || q.answer,
      explanation: q.explanation,
      subjectId: q.subjectId,
      subjectName: q.subjectId === paper.subjectId ? paper.subject : undefined,
      difficulty: q.difficulty,
    };
  });

  return {
    id: paper.id,
    title: paper.title,
    subtitle: `${paper.subject} ・ ${examQuestions.length} 題 ・ ${paper.durationMinutes} 分鐘`,
    durationSec: (paper.durationMinutes || 60) * 60,
    passingScore: paper.passingScore || 60,
    questions: examQuestions,
  };
}

export { formatSheetTimestamp, formatOptionsToJsonObject, extractSpreadsheetId };
export type { SheetTableSchema, ReadSpreadsheetResult, CategoryItem };

export const DATABASE_TABLE_SCHEMAS: Record<string, SheetTableSchema> = {
  users: {
    name: 'users',
    description: '系統使用者與管理員帳號表',
    columns: [
      { key: 'id', label: 'id', desc: '流水編號' },
      { key: 'uuid', label: 'uuid', desc: '全域唯一識別碼，對外公開用(防刷ID)' },
      { key: 'status', label: 'status', desc: '帳號狀態: 0=停用, 1=啟用, 2=未驗證' },
      { key: 'role', label: 'role', desc: '角色（外鍵關聯至roles.code）' },
      { key: 'name', label: 'name', desc: '暱稱' },
      { key: 'identifier', label: 'identifier', desc: '帳號' },
      { key: 'credential', label: 'credential', desc: '密碼(hash)' },
      { key: 'google_sheet_URL', label: 'google_sheet_URL', desc: '使用者資料庫' },
      { key: 'last_login_at', label: 'last_login_at', desc: '最後登入時間' },
      { key: 'created_at', label: 'created_at', desc: '帳號建立時間' },
      { key: 'updated_at', label: 'updated_at', desc: '帳號資料更新時間' },
    ],
  },
  roles: {
    name: 'roles',
    description: '使用者權限角色定義表',
    columns: [
      { key: 'id', label: 'id', desc: 'BIGINT UNSIGNED AUTO_INCREMENT' },
      { key: 'code', label: 'code', desc: '角色代碼（如 ADMIN, USER, GUEST）' },
      { key: 'name', label: 'name', desc: '角色顯示名稱（如管理員、用戶、訪客）' },
      { key: 'description', label: 'description', desc: '角色描述' },
      { key: 'created_at', label: 'created_at', desc: '建立時間' },
    ],
  },
  test_bank: {
    name: 'test_bank',
    description: '題庫試題資料表',
    columns: [
      { key: 'id', label: 'id', desc: '流水編號' },
      { key: 'test_id', label: 'test_id', desc: '考題編號' },
      { key: 'question', label: 'question', desc: '題幹' },
      { key: 'option', label: 'option', desc: '選項 (JSON / 選項列)' },
      { key: 'answer', label: 'answer', desc: '答案' },
      { key: 'Explanation', label: 'Explanation', desc: '詳解' },
      { key: 'difficulty', label: 'difficulty', desc: '難度 (數字)' },
      { key: 'score', label: 'score', desc: '配分' },
      { key: 'category_id', label: 'category_id', desc: '學科編號（外鍵關聯至categories.id）' },
      { key: 'taqs', label: 'taqs', desc: '標籤 / 知識點' },
      { key: 'updated_at', label: 'updated_at', desc: '更新時間' },
      { key: 'updated_by', label: 'updated_by', desc: '最後更新者 ID（外鍵關聯至 users.id）' },
      { key: 'time', label: 'time', desc: '題目作答時長 (分鐘)' },
    ],
  },
  categories: {
    name: 'categories',
    description: '學科分類層級表',
    columns: [
      { key: 'id', label: 'id', desc: '流水編號' },
      { key: 'categories_name', label: 'categories_name', desc: '分類名稱' },
      { key: 'parent_id', label: 'parent_id', desc: '父節點 ID' },
      { key: 'level', label: 'level', desc: '層級深度 (1: 領域, 2: 科目, 3: 章節/單元)' },
      { key: 'sort_order', label: 'sort_order', desc: '排序權重' },
    ],
  },
  quiz_bank_publish: {
    name: 'quiz_bank_publish',
    description: '公用已發布試卷資料表',
    columns: [
      { key: 'id', label: 'id', desc: '流水編號' },
      { key: 'quiz_id', label: 'quiz_id', desc: '考卷編號' },
      { key: 'quiz_name', label: 'quiz_name', desc: '考卷名稱' },
      { key: 'categories', label: 'categories', desc: '學科類別' },
      { key: 'difficulty', label: 'difficulty', desc: '難度' },
      { key: 'number', label: 'number', desc: '題數' },
      { key: 'score', label: 'score', desc: '總分' },
      { key: 'time', label: 'time', desc: '時長 (分鐘)' },
      { key: 'update_time', label: 'update_time', desc: '更新時間' },
    ],
  },
  quiz_bank_unpublish: {
    name: 'quiz_bank_unpublish',
    description: '草稿未發布試卷資料表',
    columns: [
      { key: 'id', label: 'id', desc: '流水編號' },
      { key: 'quiz_id', label: 'quiz_id', desc: '考卷編號' },
      { key: 'quiz_name', label: 'quiz_name', desc: '考卷名稱' },
      { key: 'categories', label: 'categories', desc: '學科類別' },
      { key: 'difficulty', label: 'difficulty', desc: '難度' },
      { key: 'number', label: 'number', desc: '題數' },
      { key: 'score', label: 'score', desc: '總分' },
      { key: 'time', label: 'time', desc: '時長 (分鐘)' },
      { key: 'update_time', label: 'update_time', desc: '更新時間' },
    ],
  },
  log: {
    name: 'log',
    description: '系統操作安全審計日誌資料表',
    columns: [
      { key: 'id', label: 'id', desc: '流水編號' },
      { key: 'log_id', label: 'log_id', desc: '異動日誌編號' },
      { key: 'action', label: 'action', desc: '操作行為' },
      { key: 'target', label: 'target', desc: '目標對象' },
      { key: 'operator', label: 'operator', desc: '執行管理者' },
      { key: 'timestamp', label: 'timestamp', desc: '時間戳記' },
      { key: 'status', label: 'status', desc: '狀態 (success / warning / error)' },
    ],
  },
};

export const INITIAL_CATEGORIES_DATA = [
  { id: 1, categories_name: '自然領域', parent_id: 0, level: 1, sort_order: 1 },
  { id: 2, categories_name: '社會領域', parent_id: 0, level: 1, sort_order: 2 },
  { id: 3, categories_name: '數學科', parent_id: 0, level: 2, sort_order: 3 },
  { id: 4, categories_name: '國文科', parent_id: 0, level: 2, sort_order: 4 },
  { id: 5, categories_name: '英文科', parent_id: 0, level: 2, sort_order: 5 },
  { id: 6, categories_name: '物理', parent_id: 1, level: 2, sort_order: 6 },
  { id: 7, categories_name: '化學', parent_id: 1, level: 2, sort_order: 7 },
  { id: 8, categories_name: '生物', parent_id: 1, level: 2, sort_order: 8 },
  { id: 9, categories_name: '天文', parent_id: 1, level: 2, sort_order: 9 },
  { id: 10, categories_name: '公民', parent_id: 2, level: 2, sort_order: 10 },
  { id: 11, categories_name: '地理', parent_id: 2, level: 2, sort_order: 11 },
  { id: 12, categories_name: '歷史', parent_id: 2, level: 2, sort_order: 12 },
];

export const SUBJECT_TO_CATEGORY_ID: Record<string, number> = {
  math: 3,
  chinese: 4,
  english: 5,
  physics: 6,
  chemistry: 7,
  biology: 8,
  astronomy: 9,
  civics: 10,
  geography: 11,
  history: 12,
};

export const CATEGORY_ID_TO_SUBJECT: Record<number, SubjectId> = {
  3: 'math',
  4: 'chinese',
  5: 'english',
  6: 'physics',
  7: 'chemistry',
  8: 'biology',
  9: 'astronomy',
  10: 'civics',
  11: 'geography',
  12: 'history',
};

export const SUBJECT_NAME_MAP: Record<string, SubjectId> = {
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
  '歷史': 'history',
};

export const INITIAL_ROLES_DATA: RoleItem[] = [
  { id: 1, code: 'ADMIN', name: '管理員', description: '具備系統所有試題、試卷與資料庫管理最高權限', created_at: '2024-01-01 00:00:00' },
  { id: 2, code: 'USER', name: '用戶', description: '一般系統用戶，可瀏覽題庫、組卷及參加線上測驗', created_at: '2024-01-01 00:00:00' },
  { id: 3, code: 'TEACHER', name: '學科教師', description: '負責命題、編輯試題、組卷及審核試卷', created_at: '2024-01-01 00:00:00' },
  { id: 4, code: 'EXAMINER', name: '閱卷人員', description: '負責應考名冊檢視、試卷評閱及試題作答分析', created_at: '2024-01-01 00:00:00' },
  { id: 5, code: 'STUDENT', name: '應考學生', description: '參加線上測驗、檢視成績與個人歷史作答紀錄', created_at: '2024-01-01 00:00:00' },
  { id: 6, code: 'GUEST', name: '訪客', description: '僅具備公開試題與範例試卷預覽之訪客權限', created_at: '2024-01-01 00:00:00' },
];

/**
 * Get public spreadsheet URL configured in .env.local / .env
 * Supports VITE_PUBLIC_GOOGLE_SHEET_URL and fallback VITE_GOOGLE_SHEET_URL
 */
export function getEnvConfiguredSpreadsheetUrl(): string {
  const env = (import.meta as any).env;
  return (env?.VITE_PUBLIC_GOOGLE_SHEET_URL || env?.VITE_GOOGLE_SHEET_URL || '').trim();
}

export function getEnvConfiguredScriptUrl(): string {
  const env = (import.meta as any).env;
  return (env?.VITE_GOOGLE_SCRIPT_URL || '').trim();
}

export async function postToGasScript(payload: Record<string, any>): Promise<any> {
  const scriptUrl = getEnvConfiguredScriptUrl();
  if (!scriptUrl) {
    throw new Error('尚未設定 VITE_GOOGLE_SCRIPT_URL，請在 .env 中填入 Google Apps Script 部署網址');
  }

  const res = await fetch(scriptUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Google Apps Script 回應錯誤 (${res.status})`);
  }

  const data = await res.json().catch(() => ({ success: true }));
  if (data && data.success === false) {
    throw new Error(data.error || 'Google Apps Script 執行失敗');
  }
  return data;
}

/**
 * Creates a brand new Google Spreadsheet with the 6 tables and configured schema
 */
export async function createFullDatabaseSpreadsheet(
  accessToken: string,
  title: string = '線上測驗系統資料庫 (Quiz & Test Bank DB)',
  currentQuestions: Question[] = [],
  currentExams: ExamPaper[] = []
): Promise<{ spreadsheetId: string; spreadsheetUrl: string }> {
  const sheetsPayload = Object.keys(DATABASE_TABLE_SCHEMAS).map((tableName, index) => ({
    properties: {
      sheetId: index + 100,
      title: tableName,
      gridProperties: {
        frozenRowCount: 1,
        rowCount: 100,
        columnCount: DATABASE_TABLE_SCHEMAS[tableName].columns.length + 2,
      },
      tabColor: {
        red: index === 4 ? 0.0 : index === 5 ? 0.8 : 0.1,
        green: index === 4 ? 0.5 : index === 5 ? 0.4 : 0.3,
        blue: index === 4 ? 0.2 : index === 5 ? 0.0 : 0.8,
      },
    },
  }));

  const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title,
        locale: 'zh_TW',
        autoRecalc: 'ON_CHANGE',
      },
      sheets: sheetsPayload,
    }),
  });

  if (!createRes.ok) {
    const errorData = await createRes.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `建立 Google 試算表失敗 (${createRes.status})`);
  }

  const createdData = await createRes.json();
  const spreadsheetId = createdData.spreadsheetId;
  const spreadsheetUrl = createdData.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;

  const batchData = generateBatchValues(spreadsheetUrl, currentQuestions, currentExams);

  const writeRes = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchUpdate`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        valueInputOption: 'USER_ENTERED',
        data: batchData,
      }),
    }
  );

  if (!writeRes.ok) {
    console.warn('Initial data write returned warning, data may be partially filled.');
  }

  try {
    await applyHeaderFormatting(accessToken, spreadsheetId);
  } catch (err) {
    console.warn('Header styling optional step warning:', err);
  }

  return { spreadsheetId, spreadsheetUrl };
}

function generateBatchValues(
  spreadsheetUrl: string,
  questions: Question[],
  exams: ExamPaper[],
  auditLogs: AuditLog[] = []
) {
  const userHeaders = DATABASE_TABLE_SCHEMAS.users.columns.map((c) => c.label);
  const nowStr = formatSheetTimestamp();
  const userRows: any[][] = [
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
      nowStr,
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
      nowStr,
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
      nowStr,
    ],
  ];

  const roleHeaders = DATABASE_TABLE_SCHEMAS.roles.columns.map((c) => c.label);
  const roleRows: any[][] = [
    roleHeaders,
    ...INITIAL_ROLES_DATA.map((r) => [r.id, r.code, r.name, r.description, r.created_at]),
  ];

  const testBankHeaders = DATABASE_TABLE_SCHEMAS.test_bank.columns.map((c) => c.label);
  const testBankRows: any[][] = [
    testBankHeaders,
    ...questions.map((q, idx) => {
      const categoryId = q.categoryId || SUBJECT_TO_CATEGORY_ID[q.subjectId] || 3;
      const optionsStr = formatOptionsToJsonObject(q.options || q.optionsMap);
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
        q.time ?? 0,
      ];
    }),
  ];

  const categoryHeaders = DATABASE_TABLE_SCHEMAS.categories.columns.map((c) => c.label);
  const categoryRows: any[][] = [
    categoryHeaders,
    ...INITIAL_CATEGORIES_DATA.map((c) => [c.id, c.categories_name, c.parent_id, c.level, c.sort_order]),
  ];

  const publishedExams = exams.filter((e) => e.status === 'published');
  const pubHeaders = DATABASE_TABLE_SCHEMAS.quiz_bank_publish.columns.map((c) => c.label);
  const pubRows: any[][] = [
    pubHeaders,
    ...publishedExams.map((e, idx) => [
      idx + 1,
      e.id,
      e.title,
      e.subject,
      e.difficultyLv,
      e.questionCount,
      e.totalScore,
      e.durationMinutes,
      e.createdAt,
    ]),
  ];

  const draftExams = exams.filter((e) => e.status === 'draft');
  const unpubHeaders = DATABASE_TABLE_SCHEMAS.quiz_bank_unpublish.columns.map((c) => c.label);
  const unpubRows: any[][] = [
    unpubHeaders,
    ...draftExams.map((e, idx) => [
      idx + 1,
      e.id,
      e.title,
      e.subject,
      e.difficultyLv,
      e.questionCount,
      e.totalScore,
      e.durationMinutes,
      e.createdAt,
    ]),
  ];

  const logHeaders = DATABASE_TABLE_SCHEMAS.log.columns.map((c) => c.label);
  const logRows: any[][] = [
    logHeaders,
    ...auditLogs.map((l, idx) => [
      idx + 1,
      l.id,
      l.action,
      l.target,
      l.operator,
      l.timestamp,
      l.status,
    ]),
  ];

  return [
    { range: 'users!A1:K', values: userRows },
    { range: 'roles!A1:E', values: roleRows },
    { range: 'test_bank!A1:M', values: testBankRows },
    { range: 'categories!A1:E', values: categoryRows },
    { range: 'quiz_bank_publish!A1:I', values: pubRows },
    { range: 'quiz_bank_unpublish!A1:I', values: unpubRows },
    { range: 'log!A1:G', values: logRows },
  ];
}

async function applyHeaderFormatting(accessToken: string, spreadsheetId: string) {
  const requests = [
    ...[100, 101, 102, 103, 104, 105, 106].map((sheetId) => ({
      repeatCell: {
        range: {
          sheetId,
          startRowIndex: 0,
          endRowIndex: 1,
        },
        cell: {
          userEnteredFormat: {
            backgroundColor: { red: 0.0, green: 0.29, blue: 0.77 },
            textFormat: {
              foregroundColor: { red: 1.0, green: 1.0, blue: 1.0 },
              bold: true,
              fontSize: 10,
            },
            horizontalAlignment: 'CENTER',
          },
        },
        fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment)',
      },
    })),
  ];

  await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ requests }),
  });
}

export async function ensureSpreadsheetTablesExist(
  accessToken: string,
  spreadsheetId: string
): Promise<string[]> {
  const metaRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?includeGridData=false`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!metaRes.ok) {
    const err = await metaRes.json().catch(() => ({}));
    throw new Error(err.error?.message || `無法讀取試算表資訊 (${metaRes.status})`);
  }
  const metaData = await metaRes.json();
  const existingTitles = new Set((metaData.sheets || []).map((s: any) => s.properties?.title));

  const targetSheets = [
    'users',
    'roles',
    'test_bank',
    'categories',
    'quiz_bank_publish',
    'quiz_bank_unpublish',
    'log',
  ];

  const missingSheets = targetSheets.filter((title) => !existingTitles.has(title));
  if (missingSheets.length > 0) {
    const requests = missingSheets.map((title) => ({
      addSheet: {
        properties: {
          title,
          gridProperties: { rowCount: 200, columnCount: 15 },
        },
      },
    }));

    const addRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ requests }),
    });

    if (!addRes.ok) {
      const err = await addRes.json().catch(() => ({}));
      throw new Error(err.error?.message || `自動建立工作表失敗 (${addRes.status})`);
    }

    // Write headers for newly created sheets (such as 'log')
    const headerData = missingSheets
      .filter((title) => DATABASE_TABLE_SCHEMAS[title])
      .map((title) => ({
        range: `${title}!A1`,
        values: [DATABASE_TABLE_SCHEMAS[title].columns.map((c) => c.label)],
      }));

    if (headerData.length > 0) {
      try {
        await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchUpdate`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              valueInputOption: 'USER_ENTERED',
              data: headerData,
            }),
          }
        );
      } catch (e) {
        console.warn('Write initial headers for missing sheets warning:', e);
      }
    }
  }

  return targetSheets;
}

export async function syncAllToSpreadsheet(
  accessToken: string,
  spreadsheetId: string,
  spreadsheetUrl: string,
  questions: Question[],
  exams: ExamPaper[],
  auditLogs: AuditLog[] = []
): Promise<{ success: boolean; updatedSheets: string[]; message: string; rowsCount: Record<string, number> }> {
  await ensureSpreadsheetTablesExist(accessToken, spreadsheetId);

  try {
    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchClear`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ranges: [
          'test_bank!A1:Z',
          'quiz_bank_publish!A1:Z',
          'quiz_bank_unpublish!A1:Z',
          'categories!A1:Z',
          'users!A1:Z',
          'roles!A1:Z',
          'log!A1:Z',
        ],
      }),
    });
  } catch (err) {
    console.warn('Optional batchClear note:', err);
  }

  const batchData = generateBatchValues(spreadsheetUrl, questions, exams, auditLogs);

  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchUpdate`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        valueInputOption: 'USER_ENTERED',
        data: batchData,
      }),
    }
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `寫入同步資料至 Google 試算表失敗 (${res.status})`);
  }

  const rowsCount: Record<string, number> = {
    users: 3,
    roles: INITIAL_ROLES_DATA.length,
    test_bank: questions.length,
    categories: INITIAL_CATEGORIES_DATA.length,
    quiz_bank_publish: exams.filter((e) => e.status === 'published').length,
    quiz_bank_unpublish: exams.filter((e) => e.status === 'draft').length,
    log: auditLogs.length,
  };

  return {
    success: true,
    updatedSheets: ['users', 'roles', 'test_bank', 'categories', 'quiz_bank_publish', 'quiz_bank_unpublish', 'log'],
    message: `成功寫入同步：題庫 ${questions.length} 題、已發布試卷 ${rowsCount.quiz_bank_publish} 份、草稿試卷 ${rowsCount.quiz_bank_unpublish} 份、審計日誌 ${rowsCount.log} 筆至 Google 試算表！`,
    rowsCount,
  };
}

function parseTableValuesToResult(
  tableValuesMap: Record<string, any[][]>,
  spreadsheetTitle: string
): ReadSpreadsheetResult {
  const categories: CategoryItem[] = [];
  const catRows = tableValuesMap['categories'] || [];
  if (catRows.length > 1) {
    for (let i = 1; i < catRows.length; i++) {
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
        sort_order: Number(row[4]) || i,
      });
    }
    categories.sort((a, b) => a.sort_order - b.sort_order);
  }

  const questions: Question[] = [];
  const testBankRows = tableValuesMap['test_bank'] || [];
  if (testBankRows.length > 1) {
    const headerRow = (testBankRows[0] || []).map((h) => String(h || '').trim().toLowerCase());
    const findIdx = (names: string[], fallback: number) => {
      const idx = headerRow.findIndex((h) => names.includes(h));
      return idx >= 0 ? idx : fallback;
    };
    const idxTestId = findIdx(['test_id'], 1);
    const idxQuestion = findIdx(['question'], 2);
    const idxOption = findIdx(['option', 'options'], 3);
    const idxAnswer = findIdx(['answer'], 4);
    const idxExplanation = findIdx(['explanation'], 5);
    const idxDifficulty = findIdx(['difficulty'], 6);
    const idxScore = findIdx(['score'], 7);
    const idxCategory = findIdx(['category_id'], 8);
    const idxTags = findIdx(['taqs', 'tags'], 9);
    const idxUpdatedAt = findIdx(['updated_at', 'update_time'], 10);
    const idxUpdatedBy = findIdx(['updated_by', 'update_by'], 11);
    const idxTime = headerRow.findIndex((h) => h === 'time' || h === 'duration');

    for (let i = 1; i < testBankRows.length; i++) {
      const row = testBankRows[i];
      if (!row || row.length === 0 || !row[idxQuestion]) continue;
      const col0 = String(row[0] || '').trim().toLowerCase();
      const col1 = String(row[idxTestId] || '').trim().toLowerCase();
      const col2 = String(row[idxQuestion] || '').trim().toLowerCase();
      if (col0 === 'id' || col1 === 'test_id' || col2 === 'question') continue;

      const testId = String(row[idxTestId] || row[0] || `Q-IMPORT-${i}`).trim();
      const content = String(row[idxQuestion] || '').trim();
      const { options: parsedOptions, optionsMap: parsedOptionsMap } = parseSheetOptionJson(row[idxOption]);

      const answer = String(row[idxAnswer] || '').trim();
      const explanation = String(row[idxExplanation] || '').trim();

      const diffNum = parseFloat(String(row[idxDifficulty]));
      let difficulty: 'easy' | 'medium' | 'hard' = 'medium';
      let difficultyScore: number = 3;

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
      const tags = rawTags
        ? rawTags.split(/[,，、]/).map((t) => t.trim()).filter(Boolean)
        : [];
      const updatedAt = String(row[idxUpdatedAt] || new Date().toISOString().split('T')[0]).trim();
      const updatedBy = Number(row[idxUpdatedBy]) || 1;
      const timeVal =
        idxTime >= 0
          ? Number(row[idxTime]) || 0
          : row.length > 12
          ? Number(row[12]) || 0
          : 0;

      let type: 'single' | 'multiple' | 'true_false' = 'single';
      if (answer.includes(',') || answer.includes('、') || answer.length > 2) {
        type = 'multiple';
      } else if (parsedOptions.length === 2 && parsedOptions.some((o) => o.includes('正確') || o.includes('True'))) {
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
        updatedBy,
      });
    }
  }

  const publishedExams: ExamPaper[] = [];
  const pubRows = tableValuesMap['quiz_bank_publish'] || [];
  if (pubRows.length > 1) {
    for (let i = 1; i < pubRows.length; i++) {
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
      const questionIds = rawQuestionIds
        ? rawQuestionIds.split(/[,，、\s]+/).map((s) => s.trim()).filter(Boolean)
        : undefined;
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
        questionIds,
      });
    }
  }

  const draftExams: ExamPaper[] = [];
  const unpubRows = tableValuesMap['quiz_bank_unpublish'] || [];
  if (unpubRows.length > 1) {
    for (let i = 1; i < unpubRows.length; i++) {
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
      const questionIds = rawQuestionIds
        ? rawQuestionIds.split(/[,，、\s]+/).map((s) => s.trim()).filter(Boolean)
        : undefined;
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
        questionIds,
      });
    }
  }

  const auditLogs: AuditLog[] = [];
  const logRows = tableValuesMap['log'] || [];
  // Verify that the header of 'log' actually matches log schema (not gviz fallback to first sheet 'users')
  const isGenuineLogSheet =
    logRows.length > 0 &&
    (String(logRows[0]?.[1] || '').toLowerCase() === 'log_id' ||
      String(logRows[0]?.[2] || '').toLowerCase() === 'action');

  if (isGenuineLogSheet && logRows.length > 1) {
    for (let i = 1; i < logRows.length; i++) {
      const row = logRows[i];
      if (!row || row.length === 0 || (!row[1] && !row[2])) continue;
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
      const status: 'success' | 'warning' | 'error' =
        rawStatus === 'warning' ? 'warning' : rawStatus === 'error' ? 'error' : 'success';

      auditLogs.push({
        id: logId,
        action,
        target,
        operator,
        timestamp,
        status,
      });
    }
    // Sort newest first
    auditLogs.reverse();
  }

  const roles = parseRolesFromSheetRows(tableValuesMap['roles'] || []);
  const users = parseUsersFromSheetRows(tableValuesMap['users'] || [], roles);

  const allExams = [...publishedExams, ...draftExams];
  const stats: Record<string, number> = {
    test_bank: questions.length,
    quiz_bank_publish: publishedExams.length,
    quiz_bank_unpublish: draftExams.length,
    categories: categories.length,
    users: users.length,
    roles: roles.length,
    log: auditLogs.length,
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
    message: `成功從「${spreadsheetTitle}」讀取 ${categories.length} 個科目分類、${questions.length} 題題庫試題、${publishedExams.length} 份公用試卷、${draftExams.length} 份草稿試卷！`,
  };
}

/**
 * 解析 roles 資料表列資料
 * 欄位: id, code, name, description, created_at
 */
export function parseRolesFromSheetRows(roleRows: any[][]): RoleItem[] {
  if (!roleRows || roleRows.length === 0) {
    return [...INITIAL_ROLES_DATA];
  }

  const headerRow = (roleRows[0] || []).map((h) => String(h || '').trim().toLowerCase());
  const findIdx = (names: string[], fallback: number) => {
    const idx = headerRow.findIndex((h) => names.includes(h));
    return idx >= 0 ? idx : fallback;
  };

  const idxId = findIdx(['id'], 0);
  const idxCode = findIdx(['code', 'role_code'], 1);
  const idxName = findIdx(['name', 'role_name'], 2);
  const idxDesc = findIdx(['description', 'desc'], 3);
  const idxCreatedAt = findIdx(['created_at'], 4);

  const roles: RoleItem[] = [];
  for (let i = 0; i < roleRows.length; i++) {
    const row = roleRows[i];
    if (!row || row.length === 0) continue;
    const rawCode = String(row[idxCode] ?? '').trim();
    const rawName = String(row[idxName] ?? '').trim();
    if (!rawCode && !rawName) continue;
    if (
      rawCode.toLowerCase() === 'code' ||
      rawName.toLowerCase() === 'name' ||
      String(row[idxId] ?? '').trim().toLowerCase() === 'id'
    ) {
      continue;
    }

    roles.push({
      id: Number(row[idxId]) || roles.length + 1,
      code: rawCode,
      name: rawName || rawCode,
      description: String(row[idxDesc] ?? '').trim(),
      created_at: String(row[idxCreatedAt] ?? '').trim() || undefined,
    });
  }

  return roles.length > 0 ? roles : [...INITIAL_ROLES_DATA];
}

/**
 * 解析 users 資料表列資料並關聯 roles.code
 * 欄位: id, uuid, status, role, name, identifier, credential, google_sheet_URL, last_login_at, created_at, updated_at
 */
export function parseUsersFromSheetRows(
  userRows: any[][],
  roles: RoleItem[] = INITIAL_ROLES_DATA
): UserProfile[] {
  if (!userRows || userRows.length === 0) return [];

  const headerRow = (userRows[0] || []).map((h) => String(h || '').trim().toLowerCase());
  const findIdx = (names: string[], fallback: number) => {
    const idx = headerRow.findIndex((h) => names.includes(h));
    return idx >= 0 ? idx : fallback;
  };

  const idxId = findIdx(['id'], 0);
  const idxUuid = findIdx(['uuid'], 1);
  const idxStatus = findIdx(['status'], 2);
  const idxRole = findIdx(['role'], 3);
  const idxName = findIdx(['name', 'nickname'], 4);
  const idxIdentifier = findIdx(['identifier', 'account', 'username'], 5);
  const idxCredential = findIdx(['credential', 'password'], 6);
  const idxSheetUrl = findIdx(['google_sheet_url', 'sheet_url'], 7);
  const idxLastLogin = findIdx(['last_login_at'], 8);
  const idxCreatedAt = findIdx(['created_at'], 9);
  const idxUpdatedAt = findIdx(['updated_at'], 10);

  const users: UserProfile[] = [];
  for (let i = 0; i < userRows.length; i++) {
    const row = userRows[i];
    if (!row || row.length === 0) continue;

    const rawIdentifier = String(row[idxIdentifier] ?? '').trim();
    const rawName = String(row[idxName] ?? '').trim();
    const rawUuid = String(row[idxUuid] ?? '').trim();

    if (!rawIdentifier && !rawName && !rawUuid) continue;
    // Skip header row
    if (
      rawIdentifier.toLowerCase() === 'identifier' ||
      String(row[idxCredential] ?? '').trim().toLowerCase() === 'credential' ||
      rawUuid.toLowerCase() === 'uuid'
    ) {
      continue;
    }

    const rawStatusStr = String(row[idxStatus] ?? '').trim();
    const parsedStatus =
      rawStatusStr === '0'
        ? 0
        : rawStatusStr === '2'
        ? 2
        : rawStatusStr === '1'
        ? 1
        : Number.isFinite(Number(rawStatusStr)) && rawStatusStr !== ''
        ? Number(rawStatusStr)
        : 1;

    const rawRoleCode = String(row[idxRole] ?? 'USER').trim() || 'USER';
    const matchedRole =
      roles.find((r) => r.code.toUpperCase() === rawRoleCode.toUpperCase()) ||
      INITIAL_ROLES_DATA.find((r) => r.code.toUpperCase() === rawRoleCode.toUpperCase());

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
      updated_at: String(row[idxUpdatedAt] ?? '').trim() || undefined,
    });
  }

  return users;
}

/**
 * 解析標準 CSV 字串為二維陣列 (支援引號轉義，避免 gviz JSON 將混合型態密碼/帳號轉成 null)
 */
function parseCsvTo2DArray(csvText: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = '';
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
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

/**
 * 讀取 Google Sheet 中的 users 與 roles 資料表
 */
export async function fetchUsersAndRolesFromSheet(
  spreadsheetId?: string | null,
  accessToken?: string | null
): Promise<{ users: UserProfile[]; roles: RoleItem[] }> {
  const targetId =
    spreadsheetId ||
    extractSpreadsheetId(getEnvConfiguredSpreadsheetUrl()) ||
    (typeof window !== 'undefined' ? localStorage.getItem('google_spreadsheet_id') : null);

  if (!targetId) {
    throw new Error('尚未設定 Google Sheet 資料庫網址，請確認 .env 中的 VITE_GOOGLE_SHEET_URL 設定');
  }

  // 1. 若有 OAuth accessToken，優先透過 Google Sheets REST API 讀取
  if (accessToken) {
    try {
      const res = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${targetId}/values:batchGet?ranges=${encodeURIComponent(
          'users!A1:Z'
        )}&ranges=${encodeURIComponent('roles!A1:Z')}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (res.ok) {
        const data = await res.json();
        const valueRanges: any[] = data.valueRanges || [];
        const map: Record<string, any[][]> = {};
        valueRanges.forEach((vr) => {
          const name = (vr.range || '').split('!')[0].replace(/['"]/g, '');
          map[name] = vr.values || [];
        });
        const roles = parseRolesFromSheetRows(map['roles'] || []);
        const users = parseUsersFromSheetRows(map['users'] || [], roles);
        return { users, roles };
      }
    } catch (e) {
      console.warn('REST API fetch users/roles fallback to gviz:', e);
    }
  }

  // 2. 透過公開 gviz CSV 端點讀取 (避免混合數字/文字密碼被 gviz JSON 丟棄)
  const sheetRowsMap: Record<string, string[][]> = {};
  await Promise.all(
    (['users', 'roles'] as const).map(async (sheetName) => {
      try {
        const csvUrl = `https://docs.google.com/spreadsheets/d/${targetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(
          sheetName
        )}`;
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
        const jsonUrl = `https://docs.google.com/spreadsheets/d/${targetId}/gviz/tq?tqx=out:json&headers=1&sheet=${encodeURIComponent(
          sheetName
        )}`;
        const res = await fetch(jsonUrl);
        if (!res.ok) return;
        const text = await res.text();
        const match = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]+)\);?\s*$/);
        if (!match || !match[1]) return;
        const json = JSON.parse(match[1]);
        if (json.status !== 'ok' || !json.table) return;
        const cols: string[] = (json.table.cols || []).map((c: any) =>
          c?.label ? String(c.label).trim() : ''
        );
        const rows: string[][] = (json.table.rows || []).map((r: any) =>
          (r.c || []).map((cell: any) => {
            if (!cell) return '';
            if (cell.f !== undefined && cell.f !== null) return String(cell.f);
            if (cell.v !== undefined && cell.v !== null) return String(cell.v);
            return '';
          })
        );
        const hasColLabels = cols.some((c) => c !== '');
        sheetRowsMap[sheetName] = hasColLabels ? [cols, ...rows] : rows;
      } catch (e) {
        console.warn(`JSON gviz fetch for ${sheetName} failed:`, e);
      }
    })
  );

  if (!sheetRowsMap['users'] || sheetRowsMap['users'].length === 0) {
    throw new Error('無法讀取 Google Sheet 中的 users 資料表，請確認試算表權限或網路連線');
  }

  const roles = parseRolesFromSheetRows(sheetRowsMap['roles'] || []);
  const users = parseUsersFromSheetRows(sheetRowsMap['users'] || [], roles);

  return { users, roles };
}

/**
 * 拿帳號 (identifier) 與密碼 (credential) 至 Google Sheet 的 users 與 roles 資料表進行驗證與角色確認
 */
export async function authenticateUserFromSheet(
  identifier: string,
  credential: string,
  spreadsheetId?: string | null,
  accessToken?: string | null
): Promise<AuthLoginResult & { allRoles?: RoleItem[] }> {
  const cleanId = identifier.trim();
  const cleanCred = credential.trim();

  if (!cleanId || !cleanCred) {
    return {
      success: false,
      error: '請輸入帳號與密碼',
    };
  }

  const { users, roles } = await fetchUsersAndRolesFromSheet(spreadsheetId, accessToken);

  if (users.length === 0) {
    return {
      success: false,
      error: '資料庫 users 資料表中尚無任何帳號紀錄',
      allRoles: roles,
    };
  }

  const matchedUser = users.find(
    (u) => (u.identifier || '').trim() === cleanId
  );

  if (!matchedUser) {
    return {
      success: false,
      error: `查無此帳號「${cleanId}」，請確認帳號是否輸入正確`,
      allRoles: roles,
    };
  }

  if ((matchedUser.credential || '').trim() !== cleanCred) {
    return {
      success: false,
      error: '密碼輸入錯誤，請重新確認密碼',
      allRoles: roles,
    };
  }

  // 檢查帳號狀態: 0=停用, 1=啟用, 2=未驗證
  if (matchedUser.status === 0) {
    return {
      success: false,
      error: `帳號「${matchedUser.name || cleanId}」目前狀態為【停用 (status=0)】，無法登入系統，請聯繫管理員`,
      allRoles: roles,
    };
  }

  if (matchedUser.status === 2) {
    return {
      success: false,
      error: `帳號「${matchedUser.name || cleanId}」目前狀態為【未驗證 (status=2)】，請先完成驗證後再登入`,
      allRoles: roles,
    };
  }

  const roleInfo =
    roles.find((r) => r.code.toUpperCase() === String(matchedUser.role).toUpperCase()) ||
    INITIAL_ROLES_DATA.find((r) => r.code.toUpperCase() === String(matchedUser.role).toUpperCase()) || {
      id: 0,
      code: String(matchedUser.role),
      name: matchedUser.roleName || String(matchedUser.role),
      description: matchedUser.roleDescription || '',
    };

  const authenticatedUser: UserProfile = {
    ...matchedUser,
    roleName: roleInfo.name,
    roleDescription: roleInfo.description,
    last_login_at: formatSheetTimestamp(),
  };

  return {
    success: true,
    user: authenticatedUser,
    roleInfo,
    allRoles: roles,
  };
}

/**
 * 透過公開 Google Visualization API (gviz/tq) 讀取公開分享的 Google 試算表 (免 OAuth Token)
 */
export async function readPublicSpreadsheetViaGviz(
  spreadsheetId: string
): Promise<ReadSpreadsheetResult> {
  const targetTables = ['categories', 'test_bank', 'quiz_bank_publish', 'quiz_bank_unpublish', 'users', 'roles', 'log'];
  const tableValuesMap: Record<string, any[][]> = {};

  await Promise.all(
    targetTables.map(async (sheetName) => {
      try {
        const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json&headers=1&sheet=${encodeURIComponent(sheetName)}`;
        const res = await fetch(url);
        if (!res.ok) return;
        const text = await res.text();
        const match = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]+)\);?\s*$/);
        if (!match || !match[1]) return;
        const json = JSON.parse(match[1]);
        if (json.status !== 'ok' || !json.table) return;

        const hasColLabels = (json.table.cols || []).some(
          (c: any) => c?.label && String(c.label).trim() !== ''
        );
        const cols: string[] = (json.table.cols || []).map((c: any) =>
          c?.label ? String(c.label).trim() : ''
        );
        const rows: any[][] = (json.table.rows || []).map((r: any) =>
          (r.c || []).map((cell: any) => {
            if (!cell) return '';
            if (cell.f !== undefined && cell.f !== null) return cell.f;
            if (cell.v !== undefined && cell.v !== null) return cell.v;
            return '';
          })
        );

        tableValuesMap[sheetName] = hasColLabels ? [cols, ...rows] : rows;
      } catch (e) {
        console.warn(`Failed to fetch public sheet ${sheetName}:`, e);
      }
    })
  );

  const hasData = Object.values(tableValuesMap).some((rows) => rows && rows.length > 0);
  if (!hasData) {
    throw new Error('無法讀取試算表內容，請確認 VITE_GOOGLE_SHEET_URL 正確且已開啟「知道連結的任何人皆可檢視」權限，或先完成 Google 帳號授權。');
  }

  return parseTableValuesToResult(tableValuesMap, 'Google 試算表 (.env)');
}

export async function readAllTablesFromSpreadsheet(
  accessToken: string | null,
  spreadsheetId: string
): Promise<ReadSpreadsheetResult> {
  if (!accessToken) {
    return readPublicSpreadsheetViaGviz(spreadsheetId);
  }

  const metaRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?includeGridData=false`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!metaRes.ok) {
    // Fallback to public gviz if token expired or unauthorized
    try {
      return await readPublicSpreadsheetViaGviz(spreadsheetId);
    } catch {
      const err = await metaRes.json().catch(() => ({}));
      throw new Error(err.error?.message || `無法讀取試算表資訊 (${metaRes.status})`);
    }
  }
  const meta = await metaRes.json();
  const spreadsheetTitle = meta.properties?.title || 'Google 試算表';
  const existingSheetTitles = new Set((meta.sheets || []).map((s: any) => s.properties?.title));

  // If 'log' sheet doesn't exist yet and we have a valid accessToken, auto-create it and write header
  if (!existingSheetTitles.has('log')) {
    try {
      await ensureSpreadsheetTablesExist(accessToken, spreadsheetId);
      existingSheetTitles.add('log');
    } catch (e) {
      console.warn('Auto-create log sheet skipped:', e);
    }
  }

  const targetTables = ['test_bank', 'quiz_bank_publish', 'quiz_bank_unpublish', 'categories', 'users', 'roles', 'log'];
  const validRanges = targetTables
    .filter((table) => existingSheetTitles.has(table))
    .map((table) => `${table}!A1:Z`);

  if (validRanges.length === 0) {
    throw new Error(
      `試算表「${spreadsheetTitle}」中尚未包含題庫資料表 (test_bank、quiz_bank 等)。請先執行「立即同步至試算表」建立並寫入初始架構。`
    );
  }

  const queryParams = validRanges.map((r) => `ranges=${encodeURIComponent(r)}`).join('&');
  const batchGetRes = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet?${queryParams}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  if (!batchGetRes.ok) {
    const err = await batchGetRes.json().catch(() => ({}));
    throw new Error(err.error?.message || `讀取試算表列資料失敗 (${batchGetRes.status})`);
  }

  const batchGetData = await batchGetRes.json();
  const valueRanges: any[] = batchGetData.valueRanges || [];

  const tableValuesMap: Record<string, any[][]> = {};
  valueRanges.forEach((vr) => {
    const rangeName = (vr.range || '').split('!')[0].replace(/['"]/g, '');
    tableValuesMap[rangeName] = vr.values || [];
  });

  return parseTableValuesToResult(tableValuesMap, spreadsheetTitle);
}

export async function fetchSpreadsheetStats(
  accessToken: string,
  spreadsheetId: string
): Promise<{
  title: string;
  sheets: { name: string; rowCount: number; columnCount: number }[];
}> {
  const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?includeGridData=false`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `無法讀取試算表資訊 (${res.status})`);
  }

  const data = await res.json();
  const title = data.properties?.title || 'Google 試算表';
  const sheets = (data.sheets || []).map((s: any) => ({
    name: s.properties?.title || '',
    rowCount: s.properties?.gridProperties?.rowCount || 0,
    columnCount: s.properties?.gridProperties?.columnCount || 0,
  }));

  return { title, sheets };
}

export async function appendUserToSpreadsheet(
  accessToken: string | null,
  spreadsheetId: string,
  user: UserProfile,
  rowIndex: number
): Promise<{ success: boolean; message: string }> {
  const nowStr = formatSheetTimestamp();
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
    user.updated_at || nowStr,
  ];

  const scriptUrl = getEnvConfiguredScriptUrl();
  if (scriptUrl) {
    try {
      await postToGasScript({
        action: 'appendRow',
        sheetName: 'users',
        row: rowValues,
      });
      return { success: true, message: `成功透過 GAS 將帳號「${user.identifier}」寫入 users 資料表！` };
    } catch (gasErr: any) {
      console.warn('GAS appendUser error, fallback to REST API:', gasErr);
    }
  }

  if (!accessToken) {
    throw new Error('未授權 Google 帳號且未配置 GAS 寫入腳本，無法寫入 users 資料表');
  }

  const range = `users!A${rowIndex + 1}:K${rowIndex + 1}`;
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}?valueInputOption=USER_ENTERED`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ range, values: [rowValues] }),
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `寫入 users 失敗 (${res.status})`);
  }

  return { success: true, message: `成功將帳號「${user.identifier}」寫入 Google 試算表 users 資料表！` };
}

export async function appendQuestionToSpreadsheet(
  accessToken: string | null,
  spreadsheetId: string,
  question: Question,
  rowIndex: number,
  userId: number = 1
): Promise<{ success: boolean; message: string }> {
  const categoryId = question.categoryId || SUBJECT_TO_CATEGORY_ID[question.subjectId] || 3;
  const optionsStr = formatOptionsToJsonObject(question.options || question.optionsMap);
  const diffScore = question.difficultyScore ?? (question.difficulty === 'hard' ? 4 : question.difficulty === 'medium' ? 3 : 2);
  const tagsStr = question.tags.join(', ');
  const nowTimestamp = formatSheetTimestamp();

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
    question.time ?? 0,
  ];

  const scriptUrl = getEnvConfiguredScriptUrl();
  if (scriptUrl) {
    await postToGasScript({
      action: 'upsertRow',
      sheetName: 'test_bank',
      headers: DATABASE_TABLE_SCHEMAS.test_bank.columns.map((c) => c.label),
      keyColumnIndex: 1,
      keyValue: question.id,
      rowValues,
    });
    return {
      success: true,
      message: `題目 [${question.id}] 已透過 GAS 成功寫入 Google 試算表 test_bank 表！`,
    };
  }

  if (!accessToken) {
    throw new Error('請在 .env 設定 VITE_GOOGLE_SCRIPT_URL 以免登入直接寫入試算表');
  }

  await ensureSpreadsheetTablesExist(accessToken, spreadsheetId);

  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/test_bank!A:M:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [rowValues],
      }),
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `寫入題目至 Google 試算表失敗 (${res.status})`);
  }

  return {
    success: true,
    message: `題目 [${question.id}] 已成功寫入 Google 試算表 test_bank 表！`,
  };
}

export async function appendExamToSpreadsheet(
  accessToken: string | null,
  spreadsheetId: string,
  exam: ExamPaper,
  rowIndex: number
): Promise<{ success: boolean; message: string }> {
  const targetSheet = exam.status === 'published' ? 'quiz_bank_publish' : 'quiz_bank_unpublish';
  const nowTimestamp = formatSheetTimestamp();

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
    exam.questionIds ? exam.questionIds.join(', ') : '',
  ];

  const scriptUrl = getEnvConfiguredScriptUrl();
  if (scriptUrl) {
    await postToGasScript({
      action: 'appendRow',
      sheetName: targetSheet,
      headers: [...DATABASE_TABLE_SCHEMAS[targetSheet].columns.map((c) => c.label), 'test_id'],
      rowValues,
    });
    return {
      success: true,
      message: `考卷 [${exam.id}] 已透過 GAS 成功寫入 Google 試算表 ${targetSheet}！`,
    };
  }

  if (!accessToken) {
    throw new Error('請在 .env 設定 VITE_GOOGLE_SCRIPT_URL 以免登入直接寫入試算表');
  }

  await ensureSpreadsheetTablesExist(accessToken, spreadsheetId);

  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${targetSheet}!A:J:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [rowValues],
      }),
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `寫入考卷至 Google 試算表失敗 (${res.status})`);
  }

  return {
    success: true,
    message: `考卷 [${exam.id}] 已成功寫入 Google 試算表 ${targetSheet}！`,
  };
}

export async function syncExamsOnlyToSpreadsheet(
  accessToken: string | null,
  spreadsheetId: string,
  exams: ExamPaper[]
): Promise<void> {
  const publishedExams = exams.filter((e) => e.status === 'published');
  const pubHeaders = [...DATABASE_TABLE_SCHEMAS.quiz_bank_publish.columns.map((c) => c.label), 'test_id'];
  const pubRows: any[][] = [
    pubHeaders,
    ...publishedExams.map((e, idx) => [
      idx + 1,
      e.id,
      e.title,
      e.subject,
      e.difficultyLv,
      e.questionCount,
      e.totalScore,
      e.durationMinutes,
      e.createdAt,
      e.questionIds ? e.questionIds.join(', ') : '',
    ]),
  ];

  const draftExams = exams.filter((e) => e.status === 'draft');
  const unpubHeaders = [...DATABASE_TABLE_SCHEMAS.quiz_bank_unpublish.columns.map((c) => c.label), 'test_id'];
  const unpubRows: any[][] = [
    unpubHeaders,
    ...draftExams.map((e, idx) => [
      idx + 1,
      e.id,
      e.title,
      e.subject,
      e.difficultyLv,
      e.questionCount,
      e.totalScore,
      e.durationMinutes,
      e.createdAt,
      e.questionIds ? e.questionIds.join(', ') : '',
    ]),
  ];

  const scriptUrl = getEnvConfiguredScriptUrl();
  if (scriptUrl) {
    await postToGasScript({
      action: 'replaceSheets',
      sheets: [
        { sheetName: 'quiz_bank_publish', rows: pubRows },
        { sheetName: 'quiz_bank_unpublish', rows: unpubRows },
      ],
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
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ranges: ['quiz_bank_publish!A1:Z', 'quiz_bank_unpublish!A1:Z'],
      }),
    });
  } catch (e) {
    console.warn('Batch clear ignored:', e);
  }

  await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchUpdate`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      valueInputOption: 'USER_ENTERED',
      data: [
        { range: 'quiz_bank_publish!A1:J', values: pubRows },
        { range: 'quiz_bank_unpublish!A1:J', values: unpubRows },
      ],
    }),
  });
}

export async function deleteRowsFromSpreadsheetViaGas(
  sheetNames: string[],
  keyColumnIndex: number,
  idsToDelete: string[]
): Promise<void> {
  const scriptUrl = getEnvConfiguredScriptUrl();
  if (!scriptUrl) return;

  await postToGasScript({
    action: 'deleteRows',
    sheetNames,
    keyColumnIndex,
    idsToDelete,
  });
}

export async function appendLogToSpreadsheet(
  accessToken: string | null,
  spreadsheetId: string,
  logEntry: AuditLog,
  rowIndex: number
): Promise<{ success: boolean; message: string }> {
  const rowValues = [
    rowIndex,
    logEntry.id,
    logEntry.action,
    logEntry.target,
    logEntry.operator,
    logEntry.timestamp,
    logEntry.status,
  ];

  const scriptUrl = getEnvConfiguredScriptUrl();
  if (scriptUrl) {
    await postToGasScript({
      action: 'appendRow',
      sheetName: 'log',
      headers: DATABASE_TABLE_SCHEMAS.log.columns.map((c) => c.label),
      rowValues,
    });
    return {
      success: true,
      message: `日誌 [${logEntry.id}] 已透過 GAS 寫入 Google 試算表 log 分頁！`,
    };
  }

  if (!accessToken) {
    return {
      success: false,
      message: '未設定 GAS 或 OAuth Token，略過雲端日誌寫入',
    };
  }

  await ensureSpreadsheetTablesExist(accessToken, spreadsheetId);

  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/log!A:G:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [rowValues],
      }),
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `寫入操作日誌至 Google 試算表 log 分頁失敗 (${res.status})`);
  }

  return {
    success: true,
    message: `日誌 [${logEntry.id}] 已寫入 Google 試算表 log 分頁！`,
  };
}
