import { Question, WrongQuestionRecord } from '@/types';
import { formatOptionsToJsonObject } from '@/utils/sheetParser';

/**
 * 匯出錯題或題庫為 CSV 檔案下載
 */
export function exportQuestionsToCsv(
  questions: Question[],
  filename: string = 'wrong_questions_export.csv'
): void {
  const headers = ['test_id', 'question', 'option', 'answer', 'Explanation', 'difficulty', 'score'];
  const rows = questions.map((q) => [
    q.id,
    `"${(q.content || '').replace(/"/g, '""')}"`,
    `"${formatOptionsToJsonObject(q.options || q.optionsMap).replace(/"/g, '""')}"`,
    `"${(q.correctAnswer || '').replace(/"/g, '""')}"`,
    `"${(q.explanation || '').replace(/"/g, '""')}"`,
    q.difficulty,
    q.points,
  ]);

  const csvContent =
    '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function filterWrongQuestionsForExport(
  allQuestions: Question[],
  wrongRecords: WrongQuestionRecord[]
): Question[] {
  const wrongIds = new Set(wrongRecords.map((r) => r.questionId));
  return allQuestions.filter((q) => wrongIds.has(q.id));
}

