import { SubjectId } from './question';

export interface SubjectAnalysisItem {
  subjectId: SubjectId;
  subjectName: string;
  totalQuestions: number;
  correctCount: number;
  accuracyRate: number;
}

export interface WrongQuestionRecord {
  questionId: string;
  userAnswer: string[];
  correctAnswer: string[];
  subjectId: SubjectId;
  timestamp: string;
}

export interface ExamResultSummary {
  resultId: string;
  examId: string;
  examTitle: string;
  score: number;
  totalScore: number;
  isPassed: boolean;
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  durationUsedSeconds: number;
  submittedAt: string;
  analysis: SubjectAnalysisItem[];
  wrongQuestions: WrongQuestionRecord[];
}

