import { ExamList } from "@/components/exam/ExamList";
import { exams } from "@/data/exams";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <header className="exam-topbar">
        <div className="exam-shell py-6">
          <p className="text-[11px] tracking-[0.3em] text-slate-300">EXAM AND LEARN</p>
          <h1 className="mt-1 text-2xl font-bold">線上測驗系統</h1>
          <p className="mt-1 text-sm text-slate-300">請選擇要作答的試卷</p>
        </div>
      </header>
      <div className="exam-shell py-6">
        <ExamList exams={exams} />
      </div>
    </main>
  );
}
