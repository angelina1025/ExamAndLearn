import { notFound } from 'next/navigation';
import { ExamCard } from '@/app/(dashboard)/lobby/_components/ExamCard';
import { ASSIGNED_EXAM_ID, getAssignedExam } from '@/services/publicSheet';

export default async function LobbyPage() {
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
        <ExamCard exams={[exam]} />
      </div>
    </main>
  );
}

