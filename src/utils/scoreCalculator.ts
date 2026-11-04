import { Question, SubjectAnalysisItem } from '@/types';
import { parseAnswerTokens } from './sheetParser';

/**
 * Calculate score, correct/wrong count, and subject breakdown for an exam submission
 */
export function calculateExamScore(
  questions: Question[],
  userAnswers: Record<string, string[]>
): {
  score: number;
  totalScore: number;
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  analysis: SubjectAnalysisItem[];
} {
  let score = 0;
  let totalScore = 0;
  let correctCount = 0;
  let wrongCount = 0;
  let unansweredCount = 0;

  const subjectMap = new Map<string, { total: number; correct: number }>();

  for (const q of questions) {
    totalScore += q.points;
    const expected = parseAnswerTokens(q.correctAnswer).sort().join(',');
    const actualArr = userAnswers[q.id] || [];
    const actual = [...actualArr].map((a) => a.trim().toUpperCase()).sort().join(',');

    const subjStats = subjectMap.get(q.subjectId) || { total: 0, correct: 0 };
    subjStats.total += 1;

    if (!actual) {
      unansweredCount += 1;
    } else if (actual === expected) {
      correctCount += 1;
      score += q.points;
      subjStats.correct += 1;
    } else {
      wrongCount += 1;
    }

    subjectMap.set(q.subjectId, subjStats);
  }

  const analysis: SubjectAnalysisItem[] = Array.from(subjectMap.entries()).map(
    ([subjectId, stats]) => ({
      subjectId: subjectId as Question['subjectId'],
      subjectName: subjectId,
      totalQuestions: stats.total,
      correctCount: stats.correct,
      accuracyRate: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0,
    })
  );

  return {
    score,
    totalScore,
    correctCount,
    wrongCount,
    unansweredCount,
    analysis,
  };
}

