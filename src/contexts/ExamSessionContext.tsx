'use client';

import React, { useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState } from 'react';
import type { Answer, Exam, ExamSessionState } from '@/types/exam';
import { createInitialState, examReducer } from '@/contexts/examReducer';
import { isStorageAvailable, loadSession, saveSession } from '@/contexts/examStorage';
import { remainingFromDeadline } from '@/hooks/useCountdown';

export const ExamSessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export function useExamSession(exam: Exam) {
  // 初始狀態刻意不含「現在時間」：Next.js 的 Cache Components 會在 prerender 期間
  // 阻擋 Client Component 讀取 Date.now()。真正的 deadline 於掛載後的 effect 計算。
  const [state, dispatch] = useReducer(examReducer, undefined, () =>
    createInitialState(exam.id, exam.durationSec, null)
  );
  const [ready, setReady] = useState(false);
  const [storageWarning, setStorageWarning] = useState(false);
  const stateRef = useRef(state);
  const readyRef = useRef(false);
  const previousRef = useRef<ExamSessionState | null>(null);
  const hydratedRef = useRef(false);
  const storageFailedRef = useRef(false);

  useLayoutEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    readyRef.current = ready;
  }, [ready]);

  useEffect(() => {
    if (hydratedRef.current) return;
    hydratedRef.current = true;
    const now = Date.now();
    const saved = loadSession(exam, now);
    if (saved) {
      dispatch({ type: 'HYDRATE', state: saved });
    } else {
      dispatch({
        type: 'RESET',
        durationSec: exam.durationSec,
        deadline: now + exam.durationSec * 1000,
      });
    }
    setStorageWarning(!isStorageAvailable());
    setReady(true);
  }, [exam]);

  useEffect(() => {
    if (!ready) return;
    const previous = previousRef.current;
    const onlyTimerChanged =
      previous !== null &&
      previous.remainingSec !== state.remainingSec &&
      previous.answers === state.answers &&
      previous.flags === state.flags &&
      previous.currentIndex === state.currentIndex &&
      previous.status === state.status &&
      previous.deadline === state.deadline;
    if (onlyTimerChanged && state.remainingSec % 5 !== 0 && state.remainingSec !== 0) return;
    if (!saveSession(state) && !storageFailedRef.current) {
      storageFailedRef.current = true;
      setStorageWarning(true);
    }
    previousRef.current = state;
  }, [ready, state]);

  useEffect(() => {
    if (!ready || state.status !== 'running' || state.deadline === null) return;
    const deadline = state.deadline;
    const tick = () => {
      dispatch({ type: 'TICK', remainingSec: remainingFromDeadline(deadline) });
    };
    tick();
    const timer = window.setInterval(tick, 250);
    return () => window.clearInterval(timer);
  }, [ready, state.deadline, state.status]);

  useEffect(() => {
    const handler = () => {
      if (!readyRef.current) return;
      saveSession(stateRef.current);
    };
    window.addEventListener('pagehide', handler);
    return () => window.removeEventListener('pagehide', handler);
  }, []);

  const actions = useMemo(
    () => ({
      answer(questionId: string, answer: Answer) {
        dispatch({ type: 'ANSWER', questionId, answer });
      },
      toggleFlag(questionId: string) {
        dispatch({ type: 'TOGGLE_FLAG', questionId });
      },
      goTo(index: number) {
        dispatch({ type: 'GOTO', index, total: exam.questions.length });
      },
      pause() {
        const current = stateRef.current;
        if (current.status !== 'running') return;
        const remainingSec = current.deadline
          ? remainingFromDeadline(current.deadline)
          : current.remainingSec;
        dispatch({ type: 'PAUSE', remainingSec });
      },
      resume() {
        dispatch({
          type: 'RESUME',
          deadline: Date.now() + stateRef.current.remainingSec * 1000,
        });
      },
      reset() {
        dispatch({
          type: 'RESET',
          durationSec: exam.durationSec,
          deadline: Date.now() + exam.durationSec * 1000,
        });
      },
      submit() {
        dispatch({ type: 'SUBMIT' });
      },
    }),
    [exam.durationSec, exam.questions.length]
  );

  return { state, ready, storageWarning, ...actions };
}
