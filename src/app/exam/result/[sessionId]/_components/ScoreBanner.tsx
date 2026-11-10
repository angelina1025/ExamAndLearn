'use client';

import { useEffect, useRef, useState } from 'react';
import type { Answer, Exam } from '@/types/exam';
import { saveExamResult } from '@/services/examResults';
import { ResultReport } from './ResultReport';

interface Props {
  exam: Exam;
  answered: number;
  total: number;
  autoSubmitted: boolean;
  answers?: Record<string, Answer>;
  onReset?: () => void;
}

export function ScoreBanner({ exam, autoSubmitted, answers = {}, onReset }: Props) {
  const saved = useRef(false);
  const [savedUrl, setSavedUrl] = useState('');
  const [warning, setWarning] = useState('');
  useEffect(() => {
    if (saved.current) return;
    saved.current = true;
    const id = crypto.randomUUID();
    if (saveExamResult({ version: 1, id, exam, answers, autoSubmitted, submittedAt: new Date().toISOString() })) {
      setSavedUrl(`/exam/result/${id}`);
    } else {
      setWarning('無法儲存結果至本機，請在離開前下載錯題。');
    }
  }, [exam, answers, autoSubmitted]);

  return <ResultReport exam={exam} answers={answers} autoSubmitted={autoSubmitted} onReset={onReset}
    initiallyExpanded={false} savedUrl={savedUrl} warning={warning} />;
}

export { ScoreBanner as SuccessView };
