import { ExamQuestion } from '../types';
import { isDeviceOnline } from './offlineStorage';

/**
 * Grade exam questions via Backend API (/api/exam/grade) if online,
 * or fallback to high-speed client-side local grading engine if offline.
 */
export async function submitAndGradeExam(
  questions: ExamQuestion[],
  examTitle: string = '演算法測驗卷'
): Promise<{
  score: number;
  totalPoints: number;
  accuracy: number;
  gradedQuestions: ExamQuestion[];
  isGradedOffline: boolean;
}> {
  // If device is online, try backend API first
  if (isDeviceOnline()) {
    try {
      const response = await fetch('/api/exam/grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questions, examTitle }),
      });

      if (response.ok) {
        const data = await response.json();
        return {
          score: data.score,
          totalPoints: data.totalPoints,
          accuracy: data.accuracy,
          gradedQuestions: data.gradedQuestions,
          isGradedOffline: false,
        };
      }
    } catch (err) {
      console.warn('Backend grading request failed, seamlessly falling back to local grading engine:', err);
    }
  }

  // Local Offline Grading Engine
  let earnedPoints = 0;
  let totalPoints = 0;
  let correctCount = 0;

  const gradedQuestions: ExamQuestion[] = questions.map((q) => {
    const qPoints = q.points || 2.0;
    totalPoints += qPoints;

    let isCorrect = false;
    let status: 'correct' | 'wrong' | 'unanswered' = 'unanswered';

    if (!q.userAnswer) {
      status = 'unanswered';
    } else if (Array.isArray(q.correctAnswer)) {
      const userArr = Array.isArray(q.userAnswer) ? q.userAnswer : [q.userAnswer];
      isCorrect =
        userArr.length === q.correctAnswer.length &&
        userArr.every((ans) => (q.correctAnswer as string[]).includes(ans));
      status = isCorrect ? 'correct' : 'wrong';
    } else {
      isCorrect = q.userAnswer === q.correctAnswer;
      status = isCorrect ? 'correct' : 'wrong';
    }

    if (isCorrect) {
      earnedPoints += qPoints;
      correctCount++;
    }

    return {
      ...q,
      status,
    };
  });

  const accuracy = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;

  return {
    score: Math.round(earnedPoints * 10) / 10,
    totalPoints: Math.round(totalPoints * 10) / 10,
    accuracy,
    gradedQuestions,
    isGradedOffline: true,
  };
}
