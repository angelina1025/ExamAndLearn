import { describe, expect, it } from 'vitest';
import type { Exam } from '@/types/exam';
import { analyzeQuestions, buildExamReport, isWrongQuestion } from './examReport';

export const reportExam: Exam = {
  id: 'report-test', title: '結果測驗', subtitle: '', durationSec: 60,
  questions: [
    { id: 'single', prompt: '單選題', type: 'single', points: 2, answer: 'A', options: [{ id: 'A', text: '答案 A' }, { id: 'B', text: '答案 B' }], subjectId: 'math', difficulty: 'easy', explanation: '單選題解析' },
    { id: 'multiple', prompt: '多選題', type: 'multiple', points: 3, answer: 'A, C', options: [], subjectId: 'math', difficulty: 'hard', explanation: '多選題解析' },
    { id: 'boolean', prompt: '是非題', type: 'boolean', points: 0, answer: 'TRUE', options: [], subjectId: 'english', difficulty: 'medium' },
    { id: 'missing', prompt: '缺答案題', type: 'single', points: 5, options: [] },
  ],
};

describe('exam report', () => {
  it('grades order-independent multiple answers without mutating the submission', () => {
    const answers = { single: ' a ', multiple: ['c', 'A'], boolean: 'false', missing: 'A' };
    const report = buildExamReport(reportExam, answers);
    expect(report).toMatchObject({ correct: 2, wrong: 1, unanswered: 0, ungraded: 1, earned: 5, maximum: 10, accuracy: 50 });
    expect(answers.multiple).toEqual(['c', 'A']);
    expect(report.items[3].status).toBe('ungraded');
  });

  it('does not grant partial credit and separates wrong answers from unanswered', () => {
    const report = buildExamReport(reportExam, { single: 'B', multiple: ['A'] });
    expect(report).toMatchObject({ correct: 0, wrong: 2, unanswered: 2, earned: 0 });
    expect(report.items.filter(isWrongQuestion)).toHaveLength(4);
  });

  it('handles zero-point correct answers and duplicate tokens', () => {
    const report = buildExamReport(reportExam, { boolean: 'true', multiple: ['C', 'A', 'A'] });
    expect(report.items[2]).toMatchObject({ status: 'correct', earned: 0 });
    expect(report.items[1].status).toBe('correct');
  });

  it('groups by subject and difficulty, including unknown metadata', () => {
    const { items } = buildExamReport(reportExam, { single: 'A', multiple: 'B', missing: 'A' });
    expect(analyzeQuestions(items, 'subject')).toEqual([
      { name: '數學', total: 2, correct: 1, wrong: 1, unanswered: 0, ungraded: 0, accuracy: 50 },
      { name: '英文', total: 1, correct: 0, wrong: 0, unanswered: 1, ungraded: 0, accuracy: 0 },
      { name: '未分類', total: 1, correct: 0, wrong: 0, unanswered: 0, ungraded: 1, accuracy: 0 },
    ]);
    expect(analyzeQuestions(items, 'difficulty').map((item) => item.name)).toEqual(['簡單', '困難', '中等', '未標示']);
  });

  it('handles empty exams without NaN', () => {
    expect(buildExamReport({ ...reportExam, questions: [] }, {})).toMatchObject({ total: 0, maximum: 0, accuracy: 0 });
  });
});
