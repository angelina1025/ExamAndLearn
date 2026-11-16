import type { Answer, Exam, ExamQuestion } from '@/types/exam';
import { parseAnswerTokens } from '@/utils/sheetParser';

export type ReviewStatus = 'correct' | 'wrong' | 'unanswered' | 'ungraded';
export interface ReviewQuestion {
  number: number;
  question: ExamQuestion;
  actual: string[];
  expected: string[];
  status: ReviewStatus;
  earned: number;
}
export interface AnalysisGroup {
  name: string;
  total: number;
  correct: number;
  wrong: number;
  unanswered: number;
  ungraded: number;
  accuracy: number;
}
export const statusLabels: Record<ReviewStatus, string> = {
  correct: '答對', wrong: '答錯', unanswered: '未作答', ungraded: '無標準答案',
};
export const subjectLabels: Record<string, string> = {
  chinese: '國文', english: '英文', math: '數學', biology: '生物', physics: '物理',
  chemistry: '化學', astronomy: '地球科學', civics: '公民', geography: '地理', history: '歷史',
};
export const difficultyLabels: Record<string, string> = { easy: '簡單', medium: '中等', hard: '困難' };
export const subjectName = (q: ExamQuestion) => q.subjectName || subjectLabels[q.subjectId] || '未分類';
export const difficultyName = (q: ExamQuestion) => difficultyLabels[q.difficulty] || '未標示';

function normalize(answer: Answer | undefined): string[] {
  return [...new Set((Array.isArray(answer) ? answer : [answer || '']).flatMap(parseAnswerTokens))].sort();
}

export function buildExamReport(exam: Exam, answers: Record<string, Answer>) {
  const items: ReviewQuestion[] = exam.questions.map((question, index) => {
    const actual = normalize(answers[question.id]);
    const expected = normalize(question.answer);
    const status: ReviewStatus = !actual.length ? 'unanswered' : !expected.length ? 'ungraded'
      : actual.join(',') === expected.join(',') ? 'correct' : 'wrong';
    return { number: index + 1, question, actual, expected, status, earned: status === 'correct' ? question.points : 0 };
  });
  const count = (status: ReviewStatus) => items.filter((item) => item.status === status).length;
  return {
    items,
    total: items.length,
    correct: count('correct'), wrong: count('wrong'), unanswered: count('unanswered'),
    ungraded: items.filter((item) => !item.expected.length).length,
    earned: items.reduce((sum, item) => sum + item.earned, 0),
    maximum: items.reduce((sum, item) => sum + item.question.points, 0),
    accuracy: items.length ? Math.round(count('correct') / items.length * 100) : 0,
  };
}

export function analyzeQuestions(items: ReviewQuestion[], dimension: 'subject' | 'difficulty'): AnalysisGroup[] {
  const groups = new Map<string, AnalysisGroup>();
  for (const item of items) {
    const name = dimension === 'subject' ? subjectName(item.question) : difficultyName(item.question);
    const group = groups.get(name) || { name, total: 0, correct: 0, wrong: 0, unanswered: 0, ungraded: 0, accuracy: 0 };
    group.total++;
    group[item.status]++;
    group.accuracy = Math.round(group.correct / group.total * 100);
    groups.set(name, group);
  }
  return [...groups.values()];
}

export function isWrongQuestion(item: ReviewQuestion): boolean {
  return item.status === 'wrong' || item.status === 'unanswered';
}
