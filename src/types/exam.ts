import { SubjectId } from './question';

export interface ExamPaper {
  id: string; // e.g. "EXAM-2024-MATH-081" (對應 quiz_id)
  title: string; // 對應 quiz_name
  description: string;
  subject: string; // 對應 categories
  subjectId: SubjectId;
  difficultyLv: number; // 1-5
  questionCount: number; // 對應 number
  totalScore: number; // 對應 score
  passingScore?: number; // 合格分數
  durationMinutes: number; // 對應 time (考試時限)
  createdAt: string; // 對應 update_time
  status: 'published' | 'draft' | 'archived';
  examineeCount?: number;
  questionIds?: string[]; // 題號清單
  sourceScope?: 'public' | 'private';
}

export interface ExamColumnVisibilityState {
  id: boolean;
  title: boolean;
  subject: boolean;
  difficulty: boolean;
  questionCount: boolean;
  totalScore: boolean;
  duration: boolean;
  status: boolean;
  createdAt: boolean;
  actions: boolean;
}

