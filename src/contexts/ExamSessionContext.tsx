import React, { createContext, useContext, useState } from 'react';
import { ExamSessionState } from '@/types';

interface ExamSessionContextValue {
  session: ExamSessionState;
  setAnswer: (questionId: string, answers: string[]) => void;
  toggleFlag: (questionId: string) => void;
  setPaused: (paused: boolean) => void;
  resetSession: () => void;
}

const initialSession: ExamSessionState = {
  examId: null,
  currentQuestionIndex: 0,
  userAnswers: {},
  flags: {},
  remainingSeconds: 0,
  isPaused: false,
  startedAt: null,
  submittedAt: null,
};

const ExamSessionContext = createContext<ExamSessionContextValue | undefined>(undefined);

export const ExamSessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<ExamSessionState>(initialSession);

  const setAnswer = (questionId: string, answers: string[]) => {
    setSession((prev) => ({
      ...prev,
      userAnswers: { ...prev.userAnswers, [questionId]: answers },
    }));
  };

  const toggleFlag = (questionId: string) => {
    setSession((prev) => ({
      ...prev,
      flags: { ...prev.flags, [questionId]: !prev.flags[questionId] },
    }));
  };

  const setPaused = (paused: boolean) => {
    setSession((prev) => ({ ...prev, isPaused: paused }));
  };

  const resetSession = () => {
    setSession(initialSession);
  };

  return (
    <ExamSessionContext.Provider
      value={{ session, setAnswer, toggleFlag, setPaused, resetSession }}
    >
      {children}
    </ExamSessionContext.Provider>
  );
};

export const useExamSession = () => {
  const ctx = useContext(ExamSessionContext);
  if (!ctx) {
    throw new Error('useExamSession must be used within an ExamSessionProvider');
  }
  return ctx;
};

