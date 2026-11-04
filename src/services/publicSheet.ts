import { Question, ExamPaper, SheetTableSchema, ReadSpreadsheetResult, SubjectId, CategoryItem, AuditLog } from '@/types';
import { formatSheetTimestamp } from '@/utils/formatters';
import { formatOptionsToJsonObject, parseSheetOptionJson, extractSpreadsheetId } from '@/utils/sheetParser';

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
      { key: 'difficulty', label: 'difficulty', desc: '難度 (easy / medium / hard)' },
      { key: 'score', label: 'score', desc: '配分' },
      { key: 'category_id', label: 'category_id', desc: '學科編號（外鍵關聯至categories.id）' },
      { key: 'taqs', label: 'taqs', desc: '標籤 / 知識點' },
      { key: 'updated_at', label: 'updated_at', desc: '更新時間' },
      { key: 'updated_by', label: 'updated_by', desc: '最後更新者 ID（外鍵關聯至 users.id）' },
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

export const INITIAL_ROLES_DATA = [
  { id: 1, code: 'ADMIN', name: '超級管理員', description: '具備系統所有試題、試卷與資料庫管理最高權限', created_at: '2024-01-01 00:00:00' },
  { id: 2, code: 'TEACHER', name: '學科教師', description: '負責命題、編輯試題、組卷及審核試卷', created_at: '2024-01-01 00:00:00' },
  { id: 3, code: 'EXAMINER', name: '閱卷人員', description: '負責應考名冊檢視、試卷評閱及試題作答分析', created_at: '2024-01-01 00:00:00' },
  { id: 4, code: 'STUDENT', name: '應考學生', description: '參加線上測驗、檢視成績與個人歷史作答紀錄', created_at: '2024-01-01 00:00:00' },
  { id: 5, code: 'GUEST', name: '訪客', description: '僅具備公開試題與範例試卷預覽之訪客權限', created_at: '2024-01-01 00:00:00' },
];

/**
 * Get public spreadsheet URL configured in .env.local / .env
 * Supports VITE_PUBLIC_GOOGLE_SHEET_URL and fallback VITE_GOOGLE_SHEET_URL
 */
export function getEnvConfiguredSpreadsheetUrl(): string {
  const env = (import.meta as any).env;
  return (env?.VITE_PUBLIC_GOOGLE_SHEET_URL || env?.VITE_GOOGLE_SHEET_URL || '').trim();
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
      const diffScore = q.difficultyScore ?? (q.difficulty === 'hard' ? 4.5 : q.difficulty === 'medium' ? 3.0 : 1.5);
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
      `Lv.${e.difficultyLv}`,
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
      `Lv.${e.difficultyLv}`,
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
    { range: 'test_bank!A1:L', values: testBankRows },
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
    for (let i = 1; i < testBankRows.length; i++) {
      const row = testBankRows[i];
      if (!row || row.length === 0 || !row[2]) continue;

      const testId = String(row[1] || row[0] || `Q-IMPORT-${i}`).trim();
      const content = String(row[2] || '').trim();
      const { options: parsedOptions, optionsMap: parsedOptionsMap } = parseSheetOptionJson(row[3]);

      const answer = String(row[4] || '').trim();
      const explanation = String(row[5] || '').trim();

      const diffNum = parseFloat(String(row[6]));
      let difficulty: 'easy' | 'medium' | 'hard' = 'medium';
      let difficultyScore: number | undefined = undefined;

      if (!isNaN(diffNum)) {
        difficultyScore = diffNum;
        if (diffNum >= 4.0) difficulty = 'hard';
        else if (diffNum >= 2.5) difficulty = 'medium';
        else difficulty = 'easy';
      } else {
        const diffLower = String(row[6] || 'medium').toLowerCase();
        if (diffLower === 'hard') {
          difficulty = 'hard';
          difficultyScore = 4.5;
        } else if (diffLower === 'easy') {
          difficulty = 'easy';
          difficultyScore = 1.5;
        } else {
          difficulty = 'medium';
          difficultyScore = 3.0;
        }
      }

      const points = Number(row[7]) || 10;
      const catId = Number(row[8]) || 3;
      const subjectId = CATEGORY_ID_TO_SUBJECT[catId] || 'math';
      const rawTags = String(row[9] || '');
      const tags = rawTags
        ? rawTags.split(/[,，、]/).map((t) => t.trim()).filter(Boolean)
        : [];
      const updatedAt = String(row[10] || new Date().toISOString().split('T')[0]).trim();
      const updatedBy = Number(row[11]) || 1;

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

      const quizId = String(row[1] || row[0] || `EXAM-PUB-${i}`).trim();
      const title = String(row[2] || '').trim();
      const subjectName = String(row[3] || '高二數學').trim();
      const diffStr = String(row[4] || 'Lv.3').trim();
      const difficultyLv = parseInt(diffStr.replace(/\D/g, ''), 10) || 3;
      const questionCount = Number(row[5]) || 0;
      const totalScore = Number(row[6]) || 100;
      const durationMinutes = Number(row[7]) || 60;
      const createdAt = String(row[8] || new Date().toISOString().split('T')[0]).trim();
      const subjectId = SUBJECT_NAME_MAP[subjectName] || 'math';

      publishedExams.push({
        id: quizId,
        title,
        description: `${subjectName} 試卷測驗`,
        subject: subjectName,
        subjectId,
        difficultyLv,
        questionCount,
        totalScore,
        durationMinutes,
        createdAt,
        status: 'published',
        examineeCount: 0,
      });
    }
  }

  const draftExams: ExamPaper[] = [];
  const unpubRows = tableValuesMap['quiz_bank_unpublish'] || [];
  if (unpubRows.length > 1) {
    for (let i = 1; i < unpubRows.length; i++) {
      const row = unpubRows[i];
      if (!row || row.length === 0 || !row[2]) continue;

      const quizId = String(row[1] || row[0] || `EXAM-DRAFT-${i}`).trim();
      const title = String(row[2] || '').trim();
      const subjectName = String(row[3] || '高二數學').trim();
      const diffStr = String(row[4] || 'Lv.3').trim();
      const difficultyLv = parseInt(diffStr.replace(/\D/g, ''), 10) || 3;
      const questionCount = Number(row[5]) || 0;
      const totalScore = Number(row[6]) || 100;
      const durationMinutes = Number(row[7]) || 60;
      const createdAt = String(row[8] || new Date().toISOString().split('T')[0]).trim();
      const subjectId = SUBJECT_NAME_MAP[subjectName] || 'math';

      draftExams.push({
        id: quizId,
        title,
        description: `${subjectName} 草稿試卷`,
        subject: subjectName,
        subjectId,
        difficultyLv,
        questionCount,
        totalScore,
        durationMinutes,
        createdAt,
        status: 'draft',
        examineeCount: 0,
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

  const allExams = [...publishedExams, ...draftExams];
  const stats: Record<string, number> = {
    test_bank: Math.max(0, testBankRows.length - 1),
    quiz_bank_publish: Math.max(0, pubRows.length - 1),
    quiz_bank_unpublish: Math.max(0, unpubRows.length - 1),
    categories: Math.max(0, catRows.length - 1),
    users: Math.max(0, (tableValuesMap['users'] || []).length - 1),
    roles: Math.max(0, (tableValuesMap['roles'] || []).length - 1),
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
    auditLogs,
    stats,
    message: `成功從「${spreadsheetTitle}」讀取 ${categories.length} 個科目分類、${questions.length} 題題庫試題、${publishedExams.length} 份公用試卷、${draftExams.length} 份草稿試卷！`,
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
        const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}`;
        const res = await fetch(url);
        if (!res.ok) return;
        const text = await res.text();
        const match = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]+)\);?\s*$/);
        if (!match || !match[1]) return;
        const json = JSON.parse(match[1]);
        if (json.status !== 'ok' || !json.table) return;

        const cols: string[] = (json.table.cols || []).map((c: any) => c?.label || c?.id || '');
        const rows: any[][] = (json.table.rows || []).map((r: any) =>
          (r.c || []).map((cell: any) => {
            if (!cell) return '';
            if (cell.f !== undefined && cell.f !== null) return cell.f;
            if (cell.v !== undefined && cell.v !== null) return cell.v;
            return '';
          })
        );

        tableValuesMap[sheetName] = [cols, ...rows];
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

export async function appendQuestionToSpreadsheet(
  accessToken: string,
  spreadsheetId: string,
  question: Question,
  rowIndex: number,
  userId: number = 1
): Promise<{ success: boolean; message: string }> {
  await ensureSpreadsheetTablesExist(accessToken, spreadsheetId);

  const categoryId = question.categoryId || SUBJECT_TO_CATEGORY_ID[question.subjectId] || 3;
  const optionsStr = formatOptionsToJsonObject(question.options || question.optionsMap);
  const diffScore = question.difficultyScore ?? (question.difficulty === 'hard' ? 4.5 : question.difficulty === 'medium' ? 3.0 : 1.5);
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
  ];

  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/test_bank!A:L:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
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
  accessToken: string,
  spreadsheetId: string,
  exam: ExamPaper,
  rowIndex: number
): Promise<{ success: boolean; message: string }> {
  await ensureSpreadsheetTablesExist(accessToken, spreadsheetId);

  const targetSheet = exam.status === 'published' ? 'quiz_bank_publish' : 'quiz_bank_unpublish';
  const nowTimestamp = formatSheetTimestamp();

  const rowValues = [
    rowIndex,
    exam.id,
    exam.title,
    exam.subject,
    `Lv.${exam.difficultyLv}`,
    exam.questionCount,
    exam.totalScore,
    exam.durationMinutes,
    nowTimestamp,
  ];

  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${targetSheet}!A:I:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
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
  accessToken: string,
  spreadsheetId: string,
  exams: ExamPaper[]
): Promise<void> {
  const publishedExams = exams.filter((e) => e.status === 'published');
  const pubHeaders = DATABASE_TABLE_SCHEMAS.quiz_bank_publish.columns.map((c) => c.label);
  const pubRows: any[][] = [
    pubHeaders,
    ...publishedExams.map((e, idx) => [
      idx + 1,
      e.id,
      e.title,
      e.subject,
      `Lv.${e.difficultyLv}`,
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
      `Lv.${e.difficultyLv}`,
      e.questionCount,
      e.totalScore,
      e.durationMinutes,
      e.createdAt,
    ]),
  ];

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
        { range: 'quiz_bank_publish!A1:I', values: pubRows },
        { range: 'quiz_bank_unpublish!A1:I', values: unpubRows },
      ],
    }),
  });
}

export async function appendLogToSpreadsheet(
  accessToken: string,
  spreadsheetId: string,
  logEntry: AuditLog,
  rowIndex: number
): Promise<{ success: boolean; message: string }> {
  await ensureSpreadsheetTablesExist(accessToken, spreadsheetId);

  const rowValues = [
    rowIndex,
    logEntry.id,
    logEntry.action,
    logEntry.target,
    logEntry.operator,
    logEntry.timestamp,
    logEntry.status,
  ];

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


