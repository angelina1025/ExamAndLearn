import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ExamClient } from "@/components/exam/ExamClient";
import { getAssignedExam } from "@/data/assignedExam";

async function ExamContent({
  params,
}: {
  params: Promise<{ examId: string }>;
}) {
  const { examId } = await params;
  const exam = await getAssignedExam(examId);
  if (!exam) notFound();
  return <ExamClient exam={exam} />;
}

export default function ExamPage({
  params,
}: {
  params: Promise<{ examId: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="grid min-h-screen place-items-center text-sm text-[#5b6673]">
          載入作答進度…
        </div>
      }
    >
      <ExamContent params={params} />
    </Suspense>
  );
}
