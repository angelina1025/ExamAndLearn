import { afterEach, describe, expect, it, vi } from 'vitest';
import { buildExamReport } from '@/utils/examReport';
import type { Exam } from '@/types/exam';
import { createWrongQuestionsFile, exportWrongQuestionsToGoogleSheet, resultExcelCells, resultExportRows } from './resultExport';

const exam: Exam = { id: 'export', title: '試卷', subtitle: '', durationSec: 60, questions: [
  { id: 'q1', prompt: '=HYPERLINK("https://example.com")\n多行,題目', type: 'single', points: 2, answer: 'A', explanation: '詳解', options: [{ id: 'A', text: '選項' }] },
] };
const items = buildExamReport(exam, { q1: 'B' }).items;

describe('result exports', () => {
  afterEach(() => vi.unstubAllGlobals());
  it('preserves question text, options, answers and explanations', () => {
    const rows = resultExportRows(items);
    expect(rows).toHaveLength(2);
    expect(rows[1]).toEqual([1, 'q1', '未分類', '未標示', exam.questions[0].prompt, 'A. 選項', 'B', 'A', '答錯', 2, 0, '詳解']);
  });
  it('creates a valid Excel workbook with literal strings, not formulas', async () => {
    expect(resultExcelCells(items)[1][4]).toMatchObject({ type: String, value: exam.questions[0].prompt });
    const blob = await createWrongQuestionsFile(items);
    const bytes = await new Promise<ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as ArrayBuffer);
      reader.onerror = reject;
      reader.readAsArrayBuffer(blob);
    });
    expect(new Uint8Array(bytes).slice(0, 2)).toEqual(new Uint8Array([80, 75]));
  });
  it('creates a Google Sheet and sends literal stringValue cells', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ spreadsheetId: 'sheet-123' }) });
    vi.stubGlobal('fetch', fetchMock);
    expect(await exportWrongQuestionsToGoogleSheet(items, '測驗', 'token')).toBe('https://docs.google.com/spreadsheets/d/sheet-123/edit');
    const [url, request] = fetchMock.mock.calls[0];
    expect(url).toBe('https://sheets.googleapis.com/v4/spreadsheets');
    expect(request.headers.Authorization).toBe('Bearer token');
    const cells = JSON.parse(request.body).sheets[0].data[0].rowData[1].values;
    expect(cells[4].userEnteredValue).toEqual({ stringValue: exam.questions[0].prompt });
  });
  it('rejects missing authorization and empty exports without sending a request', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    await expect(exportWrongQuestionsToGoogleSheet(items, '測驗', '')).rejects.toThrow('登入');
    await expect(exportWrongQuestionsToGoogleSheet([], '測驗', 'token')).rejects.toThrow('沒有');
    expect(fetchMock).not.toHaveBeenCalled();
  });
  it.each([401, 403, 500])('surfaces Google HTTP %i instead of claiming success', async (status) => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status, json: async () => ({ error: { message: 'failed' } }) }));
    await expect(exportWrongQuestionsToGoogleSheet(items, '測驗', 'token')).rejects.toThrow();
  });
});
