import type { ReviewQuestion } from '@/utils/examReport';
import type { SheetData } from 'write-excel-file/browser';
import { difficultyName, statusLabels, subjectName } from '@/utils/examReport';
import { extractSpreadsheetId } from '@/utils/sheetParser';
import { formatSheetTimestamp } from '@/utils/formatters';

export const REVIEW_NOTEBOOK_HEADERS = [
  'timestamp',
  'exam_title',
  'test_id',
  'question',
  'options',
  'user_answer',
  'correct_answer',
  'status',
  'difficulty',
  'subject',
  'explanation',
];

export function resultExportRows(items: ReviewQuestion[]): (string | number)[][] {
  return [
    ['題號', '題目 ID', '學科', '難度', '題目', '選項', '考生答案', '正確答案', '作答結果', '配分', '得分', '解析'],
    ...items.map((item) => [
      item.number, item.question.id, subjectName(item.question), difficultyName(item.question),
      item.question.prompt, item.question.options.map((option) => `${option.id}. ${option.text}`).join('\n'),
      item.actual.join(', ') || '未作答', item.expected.join(', ') || '未提供', statusLabels[item.status],
      item.question.points, item.earned, item.question.explanation || '尚未提供解析',
    ]),
  ];
}

export function resultExcelCells(items: ReviewQuestion[]): SheetData {
  return resultExportRows(items).map((row, index) => row.map((value) => ({
    value,
    type: typeof value === 'number' ? Number : String,
    wrap: true,
    ...(index === 0 ? { fontWeight: 'bold', color: '#ffffff', backgroundColor: '#2f5597' } : {}),
  })));
}

export async function createWrongQuestionsFile(items: ReviewQuestion[]): Promise<Blob> {
  const { default: writeXlsxFile } = await import('write-excel-file/browser');
  return writeXlsxFile(resultExcelCells(items), {
    sheet: '錯題檢討',
    stickyRowsCount: 1,
    columns: resultExportRows([])[0].map((_, index) => ({ width: [4, 5, 11].includes(index) ? 52 : 16 })),
  }).toBlob();
}

export async function downloadWrongQuestions(items: ReviewQuestion[], title: string): Promise<void> {
  const blob = await createWrongQuestionsFile(items);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `錯題_${title.replace(/[\\/:*?"<>|]/g, '_')}.xlsx`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function exportWrongQuestionsToGoogleSheet(
  items: ReviewQuestion[],
  title: string,
  accessToken: string,
  options?: {
    userSheetUrl?: string | null;
    submittedAt?: string;
  }
): Promise<string> {
  if (!accessToken) throw new Error('請先登入 Google 並授權存取試算表。');
  if (!items.length) throw new Error('目前沒有可匯出的錯題。');

  const spreadsheetId = options?.userSheetUrl ? extractSpreadsheetId(options.userSheetUrl) : null;

  // 若使用者已綁定個人 Google Sheet，將錯題匯入個人試算表的【Review notebook】分頁
  if (spreadsheetId) {
    // 1. 查詢是否已有 Review notebook 分頁
    const metaRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?includeGridData=false`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!metaRes.ok) {
      if (metaRes.status === 401) throw new Error('Google 授權已過期，請重新登入後再匯出。');
      if (metaRes.status === 403) throw new Error('Google 拒絕存取，請確認試算表權限或重新授權。');
      const err = await metaRes.json().catch(() => ({}));
      throw new Error(err.error?.message || '無法存取個人 Google 試算表。');
    }

    const meta = await metaRes.json();
    const hasReviewNotebook = (meta.sheets || []).some(
      (s: any) => s.properties?.title === 'Review notebook'
    );

    // 2. 若無 Review notebook 分頁，新增分頁並建立標題列
    if (!hasReviewNotebook) {
      const addSheetRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requests: [
            {
              addSheet: {
                properties: {
                  title: 'Review notebook',
                  gridProperties: { rowCount: 500, columnCount: 15, frozenRowCount: 1 },
                },
              },
            },
          ],
        }),
      });
      if (!addSheetRes.ok) {
        const err = await addSheetRes.json().catch(() => ({}));
        throw new Error(err.error?.message || '在個人試算表建立 Review notebook 分頁失敗。');
      }

      // 寫入標準標題列 (按照公用題庫格式)
      await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/'Review notebook'!A1:K1?valueInputOption=USER_ENTERED`,
        {
          method: 'PUT',
          headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ values: [REVIEW_NOTEBOOK_HEADERS] }),
        }
      );
    }

    // 3. 準備錯題資料，壓上交卷時間與試卷分類
    const submitTime = options?.submittedAt || formatSheetTimestamp(new Date());
    const rows = items.map((item) => [
      submitTime,
      title,
      item.question.id,
      item.question.prompt,
      item.question.options.map((option) => `${option.id}. ${option.text}`).join('\n'),
      item.actual.join(', ') || '未作答',
      item.expected.join(', ') || '未提供',
      statusLabels[item.status],
      difficultyName(item.question),
      subjectName(item.question),
      item.question.explanation || '尚未提供解析',
    ]);

    // 4. 接續往下寫入 (append)
    const appendRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/'Review notebook'!A1:append?valueInputOption=USER_ENTERED`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ values: rows }),
      }
    );
    if (!appendRes.ok) {
      const err = await appendRes.json().catch(() => ({}));
      throw new Error(err.error?.message || '接續寫入錯題至 Review notebook 失敗。');
    }

    return `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;
  }

  // Fallback: 若未綁定個人試算表，維持在 Google 雲端建立新試算表儲存
  const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      properties: { title: `${title} — 錯題檢討` },
      sheets: [{
        properties: { title: '錯題檢討', gridProperties: { frozenRowCount: 1 } },
        data: [{ rowData: resultExportRows(items).map((row) => ({
          values: row.map((value) => ({ userEnteredValue: typeof value === 'number'
            ? { numberValue: value } : { stringValue: value } })),
        })) }],
      }],
    }),
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
