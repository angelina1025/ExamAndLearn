export type Answer = string | string[];

export type ExamStatus = 'running' | 'paused' | 'submitted';

export interface ExamSessionState {
  examId: string;
  answers: Record<string, Answer>;
  flags: string[];
  currentIndex: number;
  remainingSec: number;
  status: ExamStatus;
  deadline: number | null;
}
