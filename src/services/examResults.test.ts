import { beforeEach, describe, expect, it, vi } from 'vitest';
import { loadExamResult, saveExamResult, type SavedExamResult } from './examResults';

const saved: SavedExamResult = { version: 1, id: 'result-1', autoSubmitted: false, submittedAt: '2026-11-10T10:00:00Z',
  exam: { id: 'exam-1', title: '試卷', subtitle: '', durationSec: 60, questions: [
    { id: 'q1', prompt: '題目', type: 'single', points: 2, answer: 'A', options: [] },
  ] }, answers: { q1: 'A' } };

describe('saved exam results', () => {
  beforeEach(() => { localStorage.clear(); vi.restoreAllMocks(); });
  it('restores an immutable snapshot after the original answers change', () => {
    const result = structuredClone(saved);
    expect(saveExamResult(result)).toBe(true);
    result.answers.q1 = 'B';
    expect(loadExamResult(saved.id)).toEqual(saved);
  });
  it('returns null for missing, corrupted, or mismatched records', () => {
    expect(loadExamResult('missing')).toBeNull();
    localStorage.setItem('exam-result:v1:broken', '{');
    expect(loadExamResult('broken')).toBeNull();
    localStorage.setItem('exam-result:v1:other', JSON.stringify(saved));
    expect(loadExamResult('other')).toBeNull();
  });
  it('rejects malformed questions and answers', () => {
    localStorage.setItem('exam-result:v1:result-1', JSON.stringify({ ...saved, answers: { q1: 42 } }));
    expect(loadExamResult(saved.id)).toBeNull();
    localStorage.setItem('exam-result:v1:result-1', JSON.stringify({ ...saved, exam: { ...saved.exam, questions: [{}] } }));
    expect(loadExamResult(saved.id)).toBeNull();
  });
  it('does not crash when storage is unavailable', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('quota'); });
    expect(saveExamResult(saved)).toBe(false);
  });
});
