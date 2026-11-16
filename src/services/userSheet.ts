import { Question, ExamPaper, ReadSpreadsheetResult } from '@/types';
import { extractSpreadsheetId } from '@/utils/sheetParser';
import {
  readAllTablesFromSpreadsheet,
  appendQuestionToSpreadsheet,
  appendExamToSpreadsheet,
  ensureSpreadsheetTablesExist,
  DATABASE_TABLE_SCHEMAS,
} from '@/services/publicSheet';
import { formatSheetTimestamp } from '@/utils/formatters';

/**
 * 私人 Sheet 存取服務 (動態依登入使用者的 google_sheet_URL 讀寫個人題庫、考卷與作答紀錄)
 */
export async function readUserPrivateSheet(
  accessToken: string,
  userSheetUrl: string
): Promise<ReadSpreadsheetResult> {
  const spreadsheetId = extractSpreadsheetId(userSheetUrl);
  if (!spreadsheetId) {
    throw new Error('無效的個人 Google 試算表網址 (google_sheet_URL)');
  }
  return readAllTablesFromSpreadsheet(accessToken, spreadsheetId);
}

export async function appendQuestionToUserSheet(
  accessToken: string,
  userSheetUrl: string,
  question: Question,
  rowIndex: number
) {
  const spreadsheetId = extractSpreadsheetId(userSheetUrl);
  if (!spreadsheetId) {
    throw new Error('無效的個人 Google 試算表網址 (google_sheet_URL)');
  }
  return appendQuestionToSpreadsheet(accessToken, spreadsheetId, question, rowIndex);
}

export async function appendExamToUserSheet(
  accessToken: string,
  userSheetUrl: string,
  exam: ExamPaper,
  rowIndex: number
) {
  const spreadsheetId = extractSpreadsheetId(userSheetUrl);
  if (!spreadsheetId) {
    throw new Error('無效的個人 Google 試算表網址 (google_sheet_URL)');
  }
  return appendExamToSpreadsheet(accessToken, spreadsheetId, exam, rowIndex);
}

/**
 * 當衝突解決選擇「以本地為主，更新線上」時：
 * 將本地個人題庫與個人試卷完整覆蓋寫入使用者的個人 Google Sheet (test_bank, quiz_bank_publish)
 */
export async function syncPersonalDataToUserSheet(
  accessToken: string,
  userSheetUrl: string,
  questions: Question[],
  exams: ExamPaper[]
): Promise<{ success: boolean; message: string }> {
  const spreadsheetId = extractSpreadsheetId(userSheetUrl);
  if (!spreadsheetId) {
    throw new Error('無效的個人 Google 試算表網址 (google_sheet_URL)');
  }

  await ensureSpreadsheetTablesExist(accessToken, spreadsheetId);

  // 清空使用者的 test_bank 與 quiz_bank_publish 既有內容
  try {
    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchClear`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ranges: ['test_bank!A1:Z', 'quiz_bank_publish!A1:Z'],
      }),
    });
  } catch (err) {
    console.warn('Clear user sheet warning:', err);
  }

  // 1. 產生 test_bank 資料
  const testBankHeaders = DATABASE_TABLE_SCHEMAS.test_bank.columns.map((c) => c.label);
  const now = formatSheetTimestamp();
  const testBankRows: any[][] = [
    testBankHeaders,
    ...questions.map((q, idx) => {
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
        Array.isArray(q.tags) ? q.tags.join(', ') : (q.tags || ''),
        q.updatedAt || now,
        Number(q.updatedBy ?? 1),
        Number(q.time ?? 1),
      ];
    }),
  ];

  // 2. 產生 quiz_bank_publish 資料
  const pubHeaders = [...DATABASE_TABLE_SCHEMAS.quiz_bank_publish.columns.map((c) => c.label), 'test_id'];
  const pubRows: any[][] = [
    pubHeaders,
    ...exams.map((e, idx) => [
      idx + 1,
      e.id,
      e.title,
      e.subject,
      e.difficultyLv ?? 3,
      e.questionCount ?? 0,
      e.totalScore ?? 100,
      e.durationMinutes ?? 30,
      e.createdAt || now,
      e.questionIds ? e.questionIds.join(', ') : '',
    ]),
  ];

  const batchData = [
    { range: 'test_bank!A1', values: testBankRows },
    { range: 'quiz_bank_publish!A1', values: pubRows },
  ];

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
    throw new Error(errorData.error?.message || `寫入個人試算表失敗 (${res.status})`);
  }

  return {
    success: true,
    message: `已成功將本地 ${questions.length} 題個人試題與 ${exams.length} 份個人試卷同步寫入至個人 Google Sheet！`,
  };
}
