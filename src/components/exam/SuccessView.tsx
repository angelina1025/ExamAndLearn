import Link from "next/link";
import type { Exam } from "@/types/exam";

interface Props {
  exam: Exam;
  answered: number;
  total: number;
  autoSubmitted: boolean;
}

export function SuccessView({ exam, answered, total, autoSubmitted }: Props) {
  return (
    <main className="min-h-screen">
      <header className="exam-topbar">
        <div className="exam-shell py-4">
          <h1 className="text-lg font-bold">{exam.title}</h1>
        </div>
      </header>
      <div className="exam-shell py-10 sm:py-16">
        <div className="exam-card mx-auto max-w-xl p-6 text-center sm:p-10">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#2f5597] text-3xl text-white">
            ✓
          </div>
          <h2 className="mt-5 text-2xl font-bold">交卷成功</h2>
          <p className="mt-2 text-sm text-[#5b6673]">
            {autoSubmitted ? "時間到，系統已自動交卷。" : "答案已送出，交卷後無法再修改。"}
          </p>
          <p className="mt-4 text-sm">
            作答題數：{answered} / {total} 題
          </p>
          <Link href="/" className="exam-btn exam-btn-primary mt-8 inline-block px-6 py-2">
            返回首頁
          </Link>
        </div>
      </div>
    </main>
  );
}
