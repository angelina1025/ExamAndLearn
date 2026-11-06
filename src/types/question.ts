export type SubjectId =
  | 'chinese'
  | 'english'
  | 'math'
  | 'biology'
  | 'physics'
  | 'chemistry'
  | 'astronomy'
  | 'civics'
  | 'geography'
  | 'history';

export type SubjectFilter = SubjectId | 'all';

export type QuestionType = 'all' | 'single' | 'multiple' | 'true_false';

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface Question {
  id: string; // e.g. "Q-MATH-20240901" (對應 Sheet 的 test_id)
  test_id?: string;
  subjectId: SubjectId;
  type: 'single' | 'multiple' | 'true_false';
  content: string; // 對應 Sheet 的 question
  question?: string;
  difficulty: DifficultyLevel;
  difficultyScore?: number; // 難度 (數字), e.g. 2, 3, 4.5
  points: number; // 對應 Sheet 的 score
  time?: number; // 對應 Sheet 的 time (題目作答時長，分鐘)
  tags: string[]; // 對應 Sheet 的 taqs
  updatedAt: string;
  options?: string[];
  optionsMap?: Record<string, string>; // {"A": "...", "B": "..."}
  option?: string; // 原始 JSON 字串
  correctAnswer?: string; // 對應 Sheet 的 answer (可能為 "A, C")
  answer?: string;
  explanation?: string; // 對應 Sheet 的 Explanation
  categoryId?: number;
  updatedBy?: number;
}

export interface ColumnVisibilityState {
  id: boolean;
  content: boolean;
  difficulty: boolean;
  points: boolean;
  time: boolean;
  tags: boolean;
  updatedAt: boolean;
  actions: boolean;
}

