import { QuestionReviewList } from '@/app/exam/result/[sessionId]/_components/QuestionReviewList';
import { SubjectAnalysisChart } from '@/app/exam/result/[sessionId]/_components/SubjectAnalysisChart';

export default async function ExamResultPage({
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

