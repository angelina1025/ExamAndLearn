import type { Answer, Exam } from '@/types/exam';
import type { Question, SubjectAnalysisItem } from '@/types';
import { parseAnswerTokens } from '@/utils/sheetParser';

export function isAnswered(answer: Answer | undefined): boolean {
  if (answer === undefined) return false;
  return Array.isArray(answer) ? answer.length > 0 : answer !== '';
}

export function countAnswered(exam: Exam, answers: Record<string, Answer>): number {
  return exam.questions.filter((question) => isAnswered(answers[question.id])).length;
}

export function getUnansweredNumbers(exam: Exam, answers: Record<string, Answer>): number[] {
  return exam.questions
    .map((question, index) => ({ question, number: index + 1 }))
    .filter(({ question }) => !isAnswered(answers[question.id]))
    .map(({ number }) => number);
}

export function countFlagged(exam: Exam, flags: string[]): number {
  const ids = new Set(exam.questions.map((question) => question.id));
  return flags.filter((id) => ids.has(id)).length;
}

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
