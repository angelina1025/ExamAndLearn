import type { Answer, Exam } from '@/types/exam';

export interface SavedExamResult {
  version: 1;
  id: string;
  exam: Exam;
  answers: Record<string, Answer>;
  autoSubmitted: boolean;
  submittedAt: string;
}

const prefix = 'exam-result:v1:';

export function saveExamResult(result: SavedExamResult): boolean {
  try {
    localStorage.setItem(prefix + result.id, JSON.stringify(result));
    return true;
  } catch {
    return false;
  }
}

export function loadExamResult(id: string): SavedExamResult | null {
  try {
    const value = JSON.parse(localStorage.getItem(prefix + id) || 'null') as SavedExamResult;
    if (!value || value.version !== 1 || value.id !== id || !value.exam ||
      typeof value.exam.title !== 'string' || !Array.isArray(value.exam.questions) ||
      !value.answers || typeof value.answers !== 'object' || Array.isArray(value.answers)) return null;
    if (!value.exam.questions.every((q) => typeof q.id === 'string' && typeof q.prompt === 'string' &&
      Number.isFinite(q.points) && Array.isArray(q.options) &&
      q.options.every((option) => typeof option.id === 'string' && typeof option.text === 'string') &&
      (q.answer === undefined || typeof q.answer === 'string'))) return null;
    if (!Object.values(value.answers).every((answer) => typeof answer === 'string' ||
      (Array.isArray(answer) && answer.every((token) => typeof token === 'string')))) return null;
    return value;
  } catch {
    return null;
  }
}
