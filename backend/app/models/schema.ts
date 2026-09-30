export interface OptionModel {
  id: string; // 'A' | 'B' | 'C' | 'D'
  text: string;
  subtext?: string;
  isCorrect?: boolean;
}

export interface QuestionModel {
  id: number;
  code: string;
  prompt: string;
  type: 'single' | 'multiple' | 'boolean' | 'code' | 'essay';
  typeLabel: string;
  difficulty: 'basic' | 'medium' | 'hard' | 'extreme';
  difficultyScore: number;
  difficultyLabel: string;
  points: number;
  topic: string;
  category: string;
  tags: string[];
  options?: OptionModel[];
  correctAnswer: string | string[];
  userAnswer?: string | string[];
  isFlagged?: boolean;
  status?: 'correct' | 'wrong' | 'unanswered';
  lastModified?: string;
  author?: string;
  explanation?: string;
  keyTakeaway?: string;
  conceptBreakdown?: string;
  memoryAnchor?: string;
  userWrongReason?: string;
  standardReason?: string;
}

export interface CategoryModel {
  id: string;
  name: string;
  count: number;
  children?: CategoryModel[];
  isOpen?: boolean;
}

export interface ExamSubmissionModel {
  examTitle?: string;
  questions: QuestionModel[];
  studentId?: string;
  submittedAt?: string;
}

export interface ExamGradingResultModel {
  examTitle: string;
  score: number;
  totalPoints: number;
  accuracy: number;
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  totalQuestions: number;
  gradedQuestions: QuestionModel[];
  gradedAt: string;
}
