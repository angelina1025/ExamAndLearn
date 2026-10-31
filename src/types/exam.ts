export type QuestionType = "single" | "multiple" | "boolean";

export interface ExamOption {
  id: string;
  text: string;
}

export interface ExamQuestion {
  id: string;
  type: QuestionType;
  prompt: string;
  options: ExamOption[];
  points: number;
}

export interface Exam {
  id: string;
  title: string;
  subtitle: string;
  durationSec: number;
  questions: ExamQuestion[];
}

export type Answer = string | string[];

export type ExamStatus = "running" | "paused" | "submitted";

export interface ExamSessionState {
  examId: string;
  answers: Record<string, Answer>;
  flags: string[];
  currentIndex: number;
  remainingSec: number;
  status: ExamStatus;
  deadline: number | null;
}
