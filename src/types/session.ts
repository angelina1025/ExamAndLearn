export interface ExamSessionState {
  examId: string | null;
  currentQuestionIndex: number;
  userAnswers: Record<string, string[]>; // questionId -> ['A'] or ['A', 'C']
  flags: Record<string, boolean>; // questionId -> isFlagged
  remainingSeconds: number;
  isPaused: boolean;
  startedAt: string | null;
  submittedAt: string | null;
}

