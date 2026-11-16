'use client';

import type { Question, ExamPaper, CategoryItem, RoleItem, AuditLog, UserProfile } from '@/types';
import type { SheetData, Row } from 'write-excel-file/browser';
import { formatSheetTimestamp } from '@/utils/formatters';

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
  'time',
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
  'test_id',
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
  'updated_at',
];

const ROLES_HEADERS = [
  'id',
  'code',
  'name',
  'description',
  'created_at',
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
  'updated_at',
];

const LOG_HEADERS = [
  'id',
  'log_id',
  'action',
  'target',
  'operator',
  'timestamp',
  'status',
];

function triggerBlobDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function makeHeaderRow(headers: string[]): Row {
  return headers.map((header) => ({
    value: header,
    type: String,
    fontWeight: 'bold',
    backgroundColor: '#004ac6',
    color: '#ffffff',
    wrap: true,
  }));
}

export function questionsToTestBankSheetData(questions: Question[]): SheetData {
  const nowStr = formatSheetTimestamp();
  const headerRow = makeHeaderRow(TEST_BANK_HEADERS);

  const dataRows: Row[] = questions.map((q, idx) => {
    let optionStr = '';
    if (q.option) {
      optionStr = q.option;
    } else if (q.options && q.options.length > 0) {
      optionStr = JSON.stringify(q.options);
    } else if (q.optionsMap) {
      optionStr = JSON.stringify(q.optionsMap);
    }

    const tagsStr = Array.isArray(q.tags) ? q.tags.join(', ') : (q.tags || '');

    return [
      { value: idx + 1, type: Number },
      { value: q.id || q.test_id || `Q-${idx + 1}`, type: String },
      { value: q.content || q.question || '', type: String, wrap: true },
      { value: optionStr, type: String, wrap: true },
      { value: q.correctAnswer || q.answer || '', type: String },
      { value: q.explanation || '', type: String, wrap: true },
      { value: Number(q.difficultyScore ?? (q.difficulty === 'hard' ? 4 : q.difficulty === 'medium' ? 3 : 2)), type: Number },
      { value: Number(q.points ?? 10), type: Number },
      { value: Number(q.categoryId ?? 3), type: Number },
      { value: tagsStr, type: String },
      { value: q.updatedAt || nowStr, type: String },
      { value: Number(q.updatedBy ?? 1), type: Number },
      { value: Number(q.time ?? 1), type: Number },
    ];
  });

  return [headerRow, ...dataRows];
}

export function examPapersToQuizBankSheetData(papers: ExamPaper[]): SheetData {
  const headerRow = makeHeaderRow(QUIZ_BANK_HEADERS);
  const dataRows: Row[] = papers.map((paper, idx) => [
    { value: idx + 1, type: Number },
    { value: paper.id, type: String },
    { value: paper.title, type: String, wrap: true },
    { value: paper.subject, type: String },
    { value: Number(paper.difficultyLv ?? 3), type: Number },
    { value: Number(paper.questionCount ?? 0), type: Number },
    { value: Number(paper.totalScore ?? 100), type: Number },
    { value: Number(paper.durationMinutes ?? 30), type: Number },
    { value: paper.createdAt || formatSheetTimestamp(), type: String },
    { value: paper.questionIds ? paper.questionIds.join(', ') : '', type: String },
  ]);

  return [headerRow, ...dataRows];
}

export function examPaperToQuizBankSheetData(paper: ExamPaper): SheetData {
  return examPapersToQuizBankSheetData([paper]);
}

export function categoriesToSheetData(categories: CategoryItem[]): SheetData {
  const headerRow = makeHeaderRow(CATEGORIES_HEADERS);
  const now = formatSheetTimestamp();
  const dataRows: Row[] = categories.map((cat, idx) => [
    { value: Number(cat.id || idx + 1), type: Number },
    { value: (cat as any).code || `CAT_${cat.id || idx + 1}`, type: String },
    { value: cat.categories_name || (cat as any).name || '', type: String },
    { value: (cat as any).description || '', type: String },
    { value: Number(cat.parent_id ?? 0), type: Number },
    { value: Number(cat.sort_order ?? idx + 1), type: Number },
    { value: 1, type: Number },
    { value: now, type: String },
    { value: now, type: String },
  ]);
  return [headerRow, ...dataRows];
}

export function rolesToSheetData(roles: RoleItem[]): SheetData {
  const headerRow = makeHeaderRow(ROLES_HEADERS);
  const now = formatSheetTimestamp();
  const dataRows: Row[] = roles.map((role, idx) => [
    { value: Number(role.id || idx + 1), type: Number },
    { value: role.code, type: String },
    { value: role.name, type: String },
    { value: role.description || '', type: String },
    { value: role.created_at || now, type: String },
  ]);
  return [headerRow, ...dataRows];
}

/**
 * 依使用者需求：users 分頁精簡過濾，僅輸出當前登入者那一列
 */
export function currentUserToUsersSheetData(currentUser?: UserProfile | null): SheetData {
  const headerRow = makeHeaderRow(USERS_HEADERS);
  const now = formatSheetTimestamp();

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
    updated_at: now,
  };

  const dataRow: Row = [
    { value: Number(user.id || 1), type: Number },
    { value: user.uuid || 'user-uuid', type: String },
    { value: Number(user.status ?? 1), type: Number },
    { value: String(user.role || 'USER').toUpperCase(), type: String },
    { value: user.name || user.nickname || '使用者', type: String },
    { value: user.identifier || '', type: String },
    { value: '', type: String }, // 安全考量：密碼不匯出
    { value: user.google_sheet_URL || '', type: String },
    { value: user.last_login_at || now, type: String },
    { value: user.created_at || now, type: String },
    { value: user.updated_at || now, type: String },
  ];

  return [headerRow, dataRow];
}

export function auditLogsToSheetData(logs: AuditLog[]): SheetData {
  const headerRow = makeHeaderRow(LOG_HEADERS);
  const dataRows: Row[] = logs.map((log, idx) => [
    { value: idx + 1, type: Number },
    { value: log.id, type: String },
    { value: log.action, type: String },
    { value: log.target, type: String },
    { value: log.operator, type: String },
    { value: log.timestamp, type: String },
    { value: log.status, type: String },
  ]);
  return [headerRow, ...dataRows];
}

/**
 * 打包「公用題庫 (唯讀)」Excel
 */
export async function generatePublicDatabaseBlob(params: {
  categories: CategoryItem[];
  questions: Question[];
  publishedExams: ExamPaper[];
  draftExams?: ExamPaper[];
  roles?: RoleItem[];
  currentUser?: UserProfile | null;
  auditLogs?: AuditLog[];
}): Promise<Blob> {
  const { default: writeXlsxFile } = await import('write-excel-file/browser');

  const sheets = [
    {
      sheet: 'categories',
      data: categoriesToSheetData(params.categories),
    },
    {
      sheet: 'test_bank',
      data: questionsToTestBankSheetData(params.questions),
    },
    {
      sheet: 'quiz_bank_publish',
      data: examPapersToQuizBankSheetData(params.publishedExams),
    },
    {
      sheet: 'quiz_bank_unpublish',
      data: examPapersToQuizBankSheetData(params.draftExams || []),
    },
    {
      sheet: 'users',
      data: currentUserToUsersSheetData(params.currentUser),
    },
    {
      sheet: 'roles',
      data: rolesToSheetData(
        params.roles || [
          { id: 1, code: 'ADMIN', name: '管理員', description: '系統完整管理權限' },
          { id: 2, code: 'USER', name: '一般用戶', description: '題庫瀏覽、自選考卷與考試' },
        ]
      ),
    },
    {
      sheet: 'log',
      data: auditLogsToSheetData(params.auditLogs || []),
    },
  ];

  return (await (writeXlsxFile as any)(sheets)) as Blob;
}

/**
 * 打包「個人題庫 (可編)」Excel
 */
export async function generatePersonalDatabaseBlob(params: {
  questions: Question[];
  exams: ExamPaper[];
}): Promise<Blob> {
  const { default: writeXlsxFile } = await import('write-excel-file/browser');

  const sheets = [
    {
      sheet: 'quiz_bank_publish',
      data: examPapersToQuizBankSheetData(params.exams),
    },
    {
      sheet: 'test_bank',
      data: questionsToTestBankSheetData(params.questions),
    },
  ];

  return (await (writeXlsxFile as any)(sheets)) as Blob;
}

/**
 * 一鍵下載完整的離線版本組合包：
 * 1. 公用題庫_離線唯讀.xlsx
 * 2. 個人題庫_離線可編.xlsx
 * 同時於 localStorage 建立離線快取基準
 */
export async function downloadFullOfflinePack(params: {
  publicData: {
    categories: CategoryItem[];
    questions: Question[];
    publishedExams: ExamPaper[];
    draftExams?: ExamPaper[];
    roles?: RoleItem[];
    auditLogs?: AuditLog[];
  };
  personalData: {
    questions: Question[];
    exams: ExamPaper[];
  };
  currentUser?: UserProfile | null;
}): Promise<{ publicBlob: Blob; personalBlob: Blob }> {
  const now = new Date().toISOString();

  // 1. 產生公用與個人 Blobs
  const publicBlob = await generatePublicDatabaseBlob({
    categories: params.publicData.categories,
    questions: params.publicData.questions,
    publishedExams: params.publicData.publishedExams,
    draftExams: params.publicData.draftExams,
    roles: params.publicData.roles,
    currentUser: params.currentUser,
    auditLogs: params.publicData.auditLogs,
  });

  const personalBlob = await generatePersonalDatabaseBlob({
    questions: params.personalData.questions,
    exams: params.personalData.exams,
  });

  // 2. 本地快取快照儲存 (做為離線時資料庫與再次連線時比對用)
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(
        'offline_public_db_cache',
        JSON.stringify({
          categories: params.publicData.categories,
          questions: params.publicData.questions,
          publishedExams: params.publicData.publishedExams,
          draftExams: params.publicData.draftExams || [],
          downloadedAt: now,
        })
      );

      localStorage.setItem(
        'offline_personal_db_cache',
        JSON.stringify({
          questions: params.personalData.questions,
          exams: params.personalData.exams,
          downloadedAt: now,
        })
      );

      localStorage.setItem('offline_pack_downloaded_at', now);
    } catch (e) {
      console.warn('Failed to save offline pack snapshot to localStorage:', e);
    }
  }

  // 3. 依序觸發瀏覽器下載
  const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  triggerBlobDownload(publicBlob, `公用題庫_離線唯讀_${timestamp}.xlsx`);

  // 稍作延遲確保瀏覽器皆能接連接收兩次下載
  await new Promise((resolve) => setTimeout(resolve, 600));
  triggerBlobDownload(personalBlob, `個人題庫_離線可編_${timestamp}.xlsx`);

  return { publicBlob, personalBlob };
}

/**
 * 匯出自選考卷（包含 quiz_bank_publish 與 test_bank 兩大工作表），格式與個人 Google Sheet 完全對齊
 */
export async function downloadCustomExamAsGoogleSheetExcel(
  paper: ExamPaper,
  questions: Question[],
  customFilename?: string
): Promise<void> {
  const { default: writeXlsxFile } = await import('write-excel-file/browser');

  const quizSheetData = examPaperToQuizBankSheetData(paper);
  const testBankSheetData = questionsToTestBankSheetData(questions);

  const sheets = [
    {
      sheet: 'quiz_bank_publish',
      data: quizSheetData,
    },
    {
      sheet: 'test_bank',
      data: testBankSheetData,
    },
  ];

  const blob = (await (writeXlsxFile as any)(sheets)) as Blob;
  const cleanTitle = paper.title.replace(/[\\/:*?"<>|]/g, '_');
  const filename = customFilename || `自選考卷_${cleanTitle}.xlsx`;
  triggerBlobDownload(blob, filename);
}

/**
 * 匯出自行上傳題目（包含 test_bank 工作表），格式與個人 Google Sheet 完全對齊
 */
export async function downloadQuestionsAsGoogleSheetExcel(
  questions: Question[],
  customFilename?: string
): Promise<void> {
  const { default: writeXlsxFile } = await import('write-excel-file/browser');

  const testBankSheetData = questionsToTestBankSheetData(questions);

  const blob = (await (writeXlsxFile as any)(testBankSheetData, {
    sheet: 'test_bank',
  })) as Blob;

  const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const filename = customFilename || `自訂題目庫_test_bank_${timestamp}.xlsx`;
  triggerBlobDownload(blob, filename);
}
