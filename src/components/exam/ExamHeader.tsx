"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import { formatTime } from "@/features/exam/timer";
import type { Exam } from "@/types/exam";

interface Props {
  exam: Exam;
  remainingSec: number;
  answered: number;
  total: number;
  running: boolean;
  onPause: () => void;
  onSubmit: () => void;
}

export function ExamHeader({ exam, remainingSec, answered, total, running, onPause, onSubmit }: Props) {
  const percent = total === 0 ? 0 : Math.round((answered / total) * 100);
  const danger = remainingSec <= 60;

  function handleBack(event: MouseEvent<HTMLAnchorElement>) {
    if (!window.confirm("返回首頁？作答進度會保留。")) {
      event.preventDefault();
    }
  }

  return (
    <header className="exam-topbar sticky top-0 z-30">
      <div className="exam-shell">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 py-3">
          <div className="min-w-0">
            <h1 className="truncate text-[17px] font-bold">{exam.title}</h1>
            <p className="text-[11px] text-slate-300">{exam.subtitle}</p>
          </div>

          <div className="hidden max-w-xs flex-1 md:block">
            <div className="flex justify-between text-[11px] text-slate-200">
              <span>作答進度</span>
              <span>{answered} / {total} 題</span>
            </div>
            <div className="exam-progress-track mt-1">
              <div className="exam-progress-fill" style={{ width: `${percent}%` }} />
            </div>
          </div>

          <div className="ml-auto flex flex-wrap items-center gap-2">
            <Link href="/" onClick={handleBack} className="exam-btn exam-btn-onnavy">
              返回
            </Link>
            <div className={`text-[22px] font-bold tabular-nums ${danger ? "timer-danger" : ""}`}>
              {formatTime(remainingSec)}
            </div>
            <button type="button" onClick={onPause} disabled={!running} className="exam-btn exam-btn-onnavy">
              暫停
            </button>
            <button type="button" onClick={onSubmit} disabled={!running} className="exam-btn exam-btn-primary">
              交卷
            </button>
          </div>
        </div>

        <div className="pb-2 md:hidden">
          <div className="flex justify-between text-[11px] text-slate-200">
            <span>作答進度</span>
            <span>{answered} / {total} 題</span>
          </div>
          <div className="exam-progress-track mt-1">
            <div className="exam-progress-fill" style={{ width: `${percent}%` }} />
          </div>
        </div>
      </div>
    </header>
  );
}
