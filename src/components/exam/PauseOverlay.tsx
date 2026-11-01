"use client";

import { useEffect, useRef } from "react";
import { formatTime } from "@/features/exam/timer";

interface Props {
  remainingSec: number;
  onResume: () => void;
  onReset: () => void;
}

export function PauseOverlay({ remainingSec, onResume, onReset }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  return (
    <div
      className="exam-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pause-overlay-title"
    >
      <div
        ref={containerRef}
        tabIndex={-1}
        className="exam-card w-full max-w-md p-6 focus:outline-none"
      >
        <h2 id="pause-overlay-title" className="text-xl font-bold">
          考試已暫停
        </h2>
        <p className="mt-2 text-sm text-[#5b6673]">
          題目與倒數計時已停止。準備好後請繼續考試。
        </p>
        <p className="mt-4 text-center text-3xl font-bold tabular-nums">{formatTime(remainingSec)}</p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <button type="button" onClick={onResume} className="exam-btn exam-btn-primary flex-1 py-2">
            繼續考試
          </button>
          <button type="button" onClick={onReset} className="exam-btn flex-1 py-2">
            重新測試
          </button>
        </div>
      </div>
    </div>
  );
}
