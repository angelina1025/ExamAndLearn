import { Request, Response } from 'express';
import { mockQuestions, initialCategories, mockBankQuestions } from '../../../frontend/src/data/mockData';
import { QuestionModel, ExamSubmissionModel, ExamGradingResultModel } from '../models/schema';

/**
 * GET /api/categories - Question Bank Categorization Taxonomy
 */
export function getCategoriesHandler(_req: Request, res: Response) {
  res.json(initialCategories);
}

/**
 * GET /api/questions - Download / Sync Question Bank for Client Offline Cache
 */
export function getQuestionsHandler(req: Request, res: Response) {
  const category = req.query.category as string | undefined;
  const limit = parseInt(req.query.limit as string, 10) || 100;

  let dataset = [...mockQuestions];

  if (category) {
    dataset = dataset.filter((q) => q.category === category || q.topic.includes(category));
  }

  res.json(dataset.slice(0, limit));
}

/**
 * GET /api/bank - Question Bank Management List
 */
export function getBankHandler(_req: Request, res: Response) {
  res.json(mockBankQuestions);
}

/**
 * POST /api/exam/grade - Online Grading Engine (with offline fallback parity)
 */
export function gradeExamHandler(req: Request, res: Response) {
  const submission = req.body as ExamSubmissionModel;
  const questions = submission.questions;
  const examTitle = submission.examTitle || '演算法期末測驗 A 卷';

  if (!Array.isArray(questions)) {
    return res.status(400).json({ error: 'questions must be an array' });
  }

  let earnedPoints = 0;
  let totalPoints = 0;
  let correctCount = 0;
  let wrongCount = 0;
  let unansweredCount = 0;

  const gradedQuestions: QuestionModel[] = questions.map((q) => {
    const pts = q.points || 2.0;
    totalPoints += pts;

    let isCorrect = false;
    let status: 'correct' | 'wrong' | 'unanswered' = 'unanswered';

    if (!q.userAnswer) {
      unansweredCount++;
      status = 'unanswered';
    } else if (Array.isArray(q.correctAnswer)) {
      const userArr: string[] = Array.isArray(q.userAnswer) ? q.userAnswer : [q.userAnswer];
      const correctArr: string[] = Array.isArray(q.correctAnswer) ? q.correctAnswer : [q.correctAnswer];
      isCorrect =
        userArr.length === correctArr.length &&
        userArr.every((ans: string) => correctArr.includes(ans));
      status = isCorrect ? 'correct' : 'wrong';
    } else {
      isCorrect = q.userAnswer === q.correctAnswer;
      status = isCorrect ? 'correct' : 'wrong';
    }

    if (isCorrect) {
      earnedPoints += pts;
      correctCount++;
    } else if (status === 'wrong') {
      wrongCount++;
    }

    return {
      ...q,
      status,
    };
  });

  const accuracy = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;

  const result: ExamGradingResultModel = {
    examTitle,
    score: Math.round(earnedPoints * 10) / 10,
    totalPoints: Math.round(totalPoints * 10) / 10,
    accuracy,
    correctCount,
    wrongCount,
    unansweredCount,
    totalQuestions: questions.length,
    gradedQuestions,
    gradedAt: new Date().toISOString(),
  };

  res.json(result);
}
