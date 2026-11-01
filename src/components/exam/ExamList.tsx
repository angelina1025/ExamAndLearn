"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { clearSession, loadSession } from "@/features/exam/storage";
import { formatTime } from "@/features/exam/timer";
import type { Exam } from "@/types/exam";

export function ExamList({ exams }: { exams: Exam[] }) {
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    // localStorage 只能在 client 讀取；掛載後再同步「已完成」狀態，避免 hydration mismatch。
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCompleted(
      exams
        .filter((exam) => loadSession(exam)?.status === "submitted")
        .map((exam) => exam.id)
    );
  }, [exams]);

  function handleStart(event: MouseEvent<HTMLAnchorElement>, exam: Exam) {
    if (!completed.includes(exam.id)) return;
    if (!window.confirm("這份考卷已完成，要重新測試嗎？")) {
      event.preventDefault();
      return;
    }
    clearSession(exam.id);
  }

  return (
    <div className="exam-card">
      <div className="hidden border-b border-[#9aa8b8] bg-[#f4f6f9] px-4 py-2 text-xs font-bold text-[#35465c] md:grid md:grid-cols-[1fr_80px_100px_120px]">
        <span>試卷名稱</span>
        <span>題數</span>
        <span>時間</span>
        <span>狀態</span>
      </div>
      <ul>
        {exams.map((exam) => {
          const isCompleted = completed.includes(exam.id);
          return (
            <li
              key={exam.id}
              className="grid gap-2 border-b border-[#d5dce4] px-4 py-4 last:border-b-0 md:grid-cols-[1fr_80px_100px_120px] md:items-center"
            >
              <div>
                <p className="text-[15px] font-bold">{exam.title}</p>
                <p className="mt-1 text-xs text-[#5b6673]">{exam.subtitle}</p>
              </div>
              <span className="text-sm">{exam.questions.length} 題</span>
              <span className="text-sm">{formatTime(exam.durationSec)}</span>
              <div className="flex items-center gap-2">
                <span className={`exam-chip ${isCompleted ? "exam-chip-done" : ""}`}>
                  {isCompleted ? "已完成" : "未作答"}
                </span>
                <Link
                  href={`/exam/${exam.id}`}
                  onClick={(event) => handleStart(event, exam)}
                  className="exam-btn exam-btn-primary text-center md:ml-auto"
                >
                  {isCompleted ? "重新測試" : "開始考試"}
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
