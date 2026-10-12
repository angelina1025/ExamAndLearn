export type QuestionType = 'single' | 'multiple' | 'boolean' | 'code' | 'essay';

export type DifficultyLevel = 'basic' | 'medium' | 'hard' | 'extreme';

export interface Option {
  id: string; // 'A' | 'B' | 'C' | 'D'
  text: string;
  subtext?: string;
  isCorrect?: boolean;
}

export interface ExamQuestion {
  id: number;
  code: string; // e.g. '#QS-0842'
  prompt: string;
  type: QuestionType;
  typeLabel: string;
  difficulty: DifficultyLevel;
  difficultyScore: number; // e.g. 0.58
  difficultyLabel: string;
  points: number;
  topic: string;
  category: string;
  tags: string[];
  options?: Option[];
  correctAnswer: string | string[]; // 'A', 'C', ['A', 'C']
  userAnswer?: string | string[];
  isFlagged?: boolean;
  status?: 'correct' | 'wrong' | 'unanswered';
  lastModified?: string;
  author?: string;
  
  // Explanations
  explanation?: string;
  keyTakeaway?: string;
  conceptBreakdown?: string;
  memoryAnchor?: string;
  userWrongReason?: string;
  standardReason?: string;
  
  // Diagram or code snippet
  hasDiagram?: boolean;
  diagramTitle?: string;
  diagramSubtitle?: string;
}

export interface CategoryNode {
  id: string;
  name: string;
  count: number;
  children?: CategoryNode[];
  isOpen?: boolean;
}
