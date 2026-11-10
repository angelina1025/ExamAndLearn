import { Suspense } from 'react';
import { SavedResultClient } from './_components/SavedResultClient';

async function ExamResultContent({
  params,
}: {
  params?: Promise<{ sessionId: string }>;
}) {
  const resolved = params ? await params : { sessionId: 'demo' };
  const sessionId = resolved.sessionId;
  return <SavedResultClient sessionId={sessionId} />;
}

export default function ExamResultPage({
  params,
}: {
  params?: Promise<{ sessionId: string }>;
}) {
  return (
    <Suspense fallback={<main className="exam-shell py-8">載入考試結果…</main>}>
      <ExamResultContent params={params} />
    </Suspense>
  );
}
