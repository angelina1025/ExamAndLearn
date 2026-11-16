import { Question, ExamPaper } from '@/types';

/**
 * 系統初始資料集（已依使用者指示移除靜態題庫與假試卷硬編碼，預設為空）
 * 所有題庫、考卷與分類均動態自 Google Sheet 或已下載之離線 Excel 讀取，沒有就空著。
 */
export const INITIAL_QUESTIONS: Question[] = [];
export const INITIAL_EXAM_PAPERS: ExamPaper[] = [];
