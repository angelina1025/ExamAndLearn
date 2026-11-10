import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Exam } from '@/types/exam';
import { ResultReport } from './ResultReport';
import { SavedResultClient } from './SavedResultClient';
import { saveExamResult } from '@/services/examResults';
import { downloadWrongQuestions } from '@/services/resultExport';

vi.mock('@/services/resultExport', () => ({ downloadWrongQuestions: vi.fn().mockResolvedValue(undefined), exportWrongQuestionsToGoogleSheet: vi.fn() }));

const exam: Exam = { id: 'ui-test', title: '整合測驗', subtitle: '', durationSec: 60, questions: [
  { id: 'q1', prompt: '答對的題目', type: 'single', points: 2, answer: 'A', options: [{ id: 'A', text: '正確選項' }], explanation: '第一題解析', subjectId: 'math', difficulty: 'easy' },
  { id: 'q2', prompt: '答錯的題目', type: 'multiple', points: 3, answer: 'A,C', options: [], explanation: '第二題解析', subjectId: 'english', difficulty: 'hard' },
  { id: 'q3', prompt: '沒作答的題目', type: 'single', points: 5, answer: 'B', options: [], subjectId: 'math', difficulty: 'hard' },
] };
const answers = { q1: 'A', q2: ['A'] };

describe('result report UI', () => {
  beforeEach(() => { localStorage.clear(); vi.clearAllMocks(); });
  it('shows all question explanations, answers and analyses', () => {
    render(<ResultReport exam={exam} answers={answers} autoSubmitted={false} />);
    expect(screen.getByText('第一題解析')).toBeInTheDocument();
    expect(screen.getByText('第二題解析')).toBeInTheDocument();
    expect(screen.getByText('本題尚未提供解析，請向題庫管理員確認。')).toBeInTheDocument();
    expect(screen.getByRole('meter', { name: '數學正確率' })).toHaveAttribute('aria-valuenow', '50');
    expect(screen.getByRole('meter', { name: '困難正確率' })).toHaveAttribute('aria-valuenow', '0');
  });

  it('filters wrong and unanswered questions and clears filters', async () => {
    const user = userEvent.setup();
    render(<ResultReport exam={exam} answers={answers} autoSubmitted />);
    await user.click(screen.getByRole('button', { name: '只看錯題（2）' }));
    expect(screen.queryByText('答對的題目')).not.toBeInTheDocument();
    expect(screen.getByText('答錯的題目')).toBeInTheDocument();
    expect(screen.getByText('沒作答的題目')).toBeInTheDocument();
    await user.selectOptions(screen.getByLabelText('學科'), '英文');
    expect(screen.queryByText('沒作答的題目')).not.toBeInTheDocument();
    await user.selectOptions(screen.getByLabelText('難度'), '簡單');
    expect(screen.getByText('此條件下沒有題目，試試其他篩選條件。')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /下載錯題 Excel/ })).toBeDisabled();
    await user.click(screen.getByRole('button', { name: '清除篩選' }));
    expect(screen.getAllByRole('article')).toHaveLength(3);
  });

  it('exports only wrong questions matching the subject and difficulty', async () => {
    const user = userEvent.setup();
    render(<ResultReport exam={exam} answers={answers} autoSubmitted={false} />);
    await user.selectOptions(screen.getByLabelText('學科'), '英文');
    await user.click(screen.getByRole('button', { name: /下載錯題 Excel/ }));
    expect(downloadWrongQuestions).toHaveBeenCalledTimes(1);
    const exported = vi.mocked(downloadWrongQuestions).mock.calls[0][0];
    expect(exported.map((item) => item.question.id)).toEqual(['q2']);
    expect(screen.getByText('已產生 1 題錯題的 Excel 檔案。')).toBeInTheDocument();
  });

  it('disables exports when all questions are correct', () => {
    render(<ResultReport exam={exam} answers={{ q1: 'A', q2: ['C', 'A'], q3: 'B' }} autoSubmitted={false} />);
    expect(screen.getByRole('button', { name: /下載錯題 Excel/ })).toBeDisabled();
    expect(screen.getByRole('button', { name: /匯出錯題至 Google/ })).toBeDisabled();
  });

  it('restores the result route after refresh without reading a newer exam session', async () => {
    saveExamResult({ version: 1, id: 'saved', exam, answers, submittedAt: '2026-11-10', autoSubmitted: true });
    render(<SavedResultClient sessionId="saved" />);
    expect(await screen.findByText('時間到，系統已自動交卷。')).toBeInTheDocument();
    expect(screen.getByText('第一題解析')).toBeInTheDocument();
    expect(within(screen.getAllByRole('article')[0]).getAllByText('A')).toHaveLength(2);
  });

  it('shows an honest empty state for unknown result IDs', async () => {
    render(<SavedResultClient sessionId="unknown" />);
    expect(await screen.findByText('找不到考試結果')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '返回測驗大廳' })).toHaveAttribute('href', '/lobby');
  });
});
