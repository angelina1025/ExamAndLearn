import { Question, ExamPaper, ReadSpreadsheetResult } from '@/types';
import { extractSpreadsheetId } from '@/utils/sheetParser';
import {
  readAllTablesFromSpreadsheet,
  appendQuestionToSpreadsheet,
  appendExamToSpreadsheet,
} from '@/services/publicSheet';

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

