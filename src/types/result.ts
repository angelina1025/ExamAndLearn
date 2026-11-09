import { SubjectId } from '@/types/question';

export interface SubjectAnalysis {
  subject: string;
  correctCount: number;
  totalCount: number;
  accuracy: number;
}

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
  sessionId?: string;
  resultId?: string;
  examId: string;
  examTitle?: string;
  score: number;
  totalScore?: number;
  isPassed?: boolean;
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  durationUsedSeconds?: number;
  submittedAt: string;
  analysis?: SubjectAnalysisItem[];
  subjectAnalysis?: SubjectAnalysis[];
  wrongQuestions?: WrongQuestionRecord[];
}
