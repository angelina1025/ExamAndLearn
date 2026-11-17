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
  accessToken: string | null,
  userSheetUrl: string
): Promise<ReadSpreadsheetResult> {
  const spreadsheetId = extractSpreadsheetId(userSheetUrl);
  if (!spreadsheetId) {
    throw new Error('無效的個人 Google 試算表網址 (google_sheet_URL)');
  }
  return readAllTablesFromSpreadsheet(accessToken, spreadsheetId);
}

/**
 * 在使用者的 Google Drive 自動建立專屬題庫試算表
 * 僅建立 4 張核心工作表：test_bank, quiz_bank_publish, quiz_bank_unpublish, log
 * 並自動寫入公用格式標準標題列
 */
export async function createPersonalDatabaseSpreadsheet(
  accessToken: string,
  title: string = '個人專屬題庫 (Personal Test Bank)'
): Promise<{ spreadsheetId: string; spreadsheetUrl: string }> {
  const targetTables = ['test_bank', 'quiz_bank_publish', 'quiz_bank_unpublish', 'log'];
  const sheetsPayload = targetTables.map((tableName, index) => ({
    properties: {
      sheetId: index + 100,
      title: tableName,
      gridProperties: {
        frozenRowCount: 1,
        rowCount: 100,
        columnCount: (DATABASE_TABLE_SCHEMAS[tableName]?.columns.length || 10) + 2,
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
      },
      sheets: sheetsPayload,
    }),
  });

  if (!createRes.ok) {
    const errorData = await createRes.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `建立個人 Google 試算表失敗 (${createRes.status})`);
  }

  const createdData = await createRes.json();
  const spreadsheetId = createdData.spreadsheetId;
  const spreadsheetUrl = createdData.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;

  // 寫入公用格式標題
  const batchData = targetTables.map((tableName) => {
    const standardColumns = DATABASE_TABLE_SCHEMAS[tableName]?.columns || [];
    const labels = standardColumns.map((c) => c.label);
    if (tableName === 'quiz_bank_publish' || tableName === 'quiz_bank_unpublish') {
      if (!labels.includes('test_id')) labels.push('test_id');
    }
    return {
      range: `${tableName}!A1`,
      values: [labels],
    };
  });

  await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchUpdate`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      valueInputOption: 'USER_ENTERED',
      data: batchData,
    }),
  });

  return { spreadsheetId, spreadsheetUrl };
}

/**
 * 檢查並自動初始化個人 Google 試算表的分頁與標準欄位格式
 * 1. 檢查是否存在核心分頁：test_bank, quiz_bank_publish, quiz_bank_unpublish, log
 * 2. 若缺少分頁，自動呼叫 addSheet 建立新分頁
 * 3. 檢查分頁第一行欄位標題是否符合，不符合或為空則填入標準標題列
 * 4. 容錯：使用者後續刪除未使用的分頁也不會影響系統讀取
 */
export async function ensurePersonalSpreadsheetTablesExist(
  accessToken: string,
  userSheetUrl: string
): Promise<{ createdSheets: string[]; updatedHeaders: string[] }> {
  const spreadsheetId = extractSpreadsheetId(userSheetUrl);
  if (!spreadsheetId) {
    throw new Error('無效的個人 Google 試算表網址 (google_sheet_URL)');
  }

  const metaRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?includeGridData=false`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!metaRes.ok) {
    const err = await metaRes.json().catch(() => ({}));
    throw new Error(err.error?.message || `無法讀取個人試算表資訊 (${metaRes.status})`);
  }
  const metaData = await metaRes.json();
  const existingTitles = new Set<string>((metaData.sheets || []).map((s: any) => s.properties?.title));

  const targetSheets = ['test_bank', 'quiz_bank_publish', 'quiz_bank_unpublish', 'log'];
  const missingSheets = targetSheets.filter((title) => !existingTitles.has(title));
  const createdSheets: string[] = [];

  if (missingSheets.length > 0) {
    const requests = missingSheets.map((title) => ({
      addSheet: {
        properties: {
          title,
          gridProperties: { rowCount: 100, columnCount: 15 },
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
      throw new Error(err.error?.message || `自動建立個人試算表分頁失敗 (${addRes.status})`);
    }

    createdSheets.push(...missingSheets);
    missingSheets.forEach((t) => existingTitles.add(t));
  }

  // 檢查所有目標分頁第一列標題格式
  const updatedHeaders: string[] = [];
  const sheetsToCheck = targetSheets.filter((t) => existingTitles.has(t));
  if (sheetsToCheck.length > 0) {
    const ranges = sheetsToCheck.map((t) => `${t}!A1:Z1`);
    const headerRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet?${ranges.map((r) => `ranges=${encodeURIComponent(r)}`).join('&')}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    const headerDataMap: Record<string, string[]> = {};
    if (headerRes.ok) {
      const hJson = await headerRes.json();
      (hJson.valueRanges || []).forEach((vr: any) => {
        const title = (vr.range || '').split('!')[0].replace(/['"]/g, '');
        headerDataMap[title] = (vr.values?.[0] || []).map((v: any) => String(v || '').trim().toLowerCase());
      });
    }

    const updates: { range: string; values: string[][] }[] = [];
    for (const title of sheetsToCheck) {
      const standardColumns = DATABASE_TABLE_SCHEMAS[title]?.columns || [];
      const standardLabels = standardColumns.map((c) => c.label);
      if (title === 'quiz_bank_publish' || title === 'quiz_bank_unpublish') {
        if (!standardLabels.includes('test_id')) standardLabels.push('test_id');
      }

      const existingHeader = headerDataMap[title] || [];
      const isHeaderMissingOrEmpty =
        existingHeader.length === 0 ||
        !existingHeader.includes('id') ||
        (title === 'test_bank' && !existingHeader.includes('question')) ||
        (title === 'quiz_bank_publish' && !existingHeader.includes('title'));

      if (isHeaderMissingOrEmpty) {
        updates.push({
          range: `${title}!A1`,
          values: [standardLabels],
        });
        updatedHeaders.push(title);
      }
    }

    if (updates.length > 0) {
      await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchUpdate`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          valueInputOption: 'USER_ENTERED',
          data: updates,
        }),
      });
    }
  }

  return { createdSheets, updatedHeaders };
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
