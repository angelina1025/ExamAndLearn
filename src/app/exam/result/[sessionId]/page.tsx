import { Suspense } from 'react';
import { QuestionReviewList } from '@/app/exam/result/[sessionId]/_components/QuestionReviewList';
import { SubjectAnalysisChart } from '@/app/exam/result/[sessionId]/_components/SubjectAnalysisChart';

async function ExamResultContent({
  params,
}: {
  params?: Promise<{ sessionId: string }>;
}) {
  const resolved = params ? await params : { sessionId: 'demo' };
  const sessionId = resolved.sessionId;
  return (
    <main className="exam-shell py-8 space-y-4">
      <h1 className="text-2xl font-bold">考試結果分析 ({sessionId})</h1>
      <SubjectAnalysisChart items={[]} />
      <QuestionReviewList questions={[]} />
    </main>
  );
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
