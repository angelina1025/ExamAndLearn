import { notFound } from "next/navigation";
import { ExamList } from "@/components/exam/ExamList";
import { ASSIGNED_EXAM_ID, getAssignedExam } from "@/data/assignedExam";

export default async function HomePage() {
  const exam = await getAssignedExam(ASSIGNED_EXAM_ID);
  if (!exam) notFound();

  return (
    <main className="min-h-screen">
      <header className="exam-topbar">
        <div className="exam-shell py-6">
          <p className="text-[11px] tracking-[0.3em] text-slate-300">EXAM AND LEARN</p>
          <h1 className="mt-1 text-2xl font-bold">線上測驗系統</h1>
          <p className="mt-1 text-sm text-slate-300">系統已接收你的自組卷，確認後即可開始作答</p>
        </div>
      </header>
      <div className="exam-shell py-6">
        <ExamList exams={[exam]} />
      </div>
    </main>
  );
}
