'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { loadExamResult, type SavedExamResult } from '@/services/examResults';
import { ResultReport } from './ResultReport';

export function SavedResultClient({ sessionId }: { sessionId: string }) {
  const [result, setResult] = useState<SavedExamResult | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setResult(loadExamResult(sessionId));
    setReady(true);
  }, [sessionId]);
  if (!ready) return <main className="exam-shell py-12">載入考試結果…</main>;
  if (!result) return (
    <main className="exam-shell space-y-4 py-12">
      <h1 className="text-2xl font-bold">找不到考試結果</h1>
      <p>結果僅儲存在完成測驗的瀏覽器。此紀錄可能不存在、已被清除，或格式已損壞。</p>
      <Link href="/lobby" className="exam-btn inline-block">返回測驗大廳</Link>
    </main>
  );
  return <ResultReport key={sessionId} exam={result.exam} answers={result.answers} autoSubmitted={result.autoSubmitted} />;
}
