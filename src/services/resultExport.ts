import type { ReviewQuestion } from '@/utils/examReport';
import type { SheetData } from 'write-excel-file/browser';
import { difficultyName, statusLabels, subjectName } from '@/utils/examReport';

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
  items: ReviewQuestion[], title: string, accessToken: string
): Promise<string> {
  if (!accessToken) throw new Error('請先登入 Google 並授權存取試算表。');
  if (!items.length) throw new Error('目前沒有可匯出的錯題。');
  // Create and populate atomically; stringValue never interprets question text as a formula.
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
