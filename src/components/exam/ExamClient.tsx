"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { countAnswered, countFlagged, getUnansweredNumbers } from "@/features/exam/summary";
import { useExamSession } from "@/features/exam/useExamSession";
import type { Exam } from "@/types/exam";
import { ExamHeader } from "./ExamHeader";
import { PauseOverlay } from "./PauseOverlay";
import { QuestionCard } from "./QuestionCard";
import { QuestionMap } from "./QuestionMap";
import { SubmitDialog } from "./SubmitDialog";
import { SuccessView } from "./SuccessView";

export function ExamClient({ exam }: { exam: Exam }) {
  const { state, ready, storageWarning, ...actions } = useExamSession(exam);
  const [mapOpen, setMapOpen] = useState(false);
  const [submitOpen, setSubmitOpen] = useState(false);
  const refs = useRef<Array<HTMLElement | null>>([]);
  const userScrolledRef = useRef(false);
  const restoredRef = useRef(false);

  const answered = countAnswered(exam, state.answers);

  const navigate = useCallback(
    (index: number) => {
      actions.goTo(index);
      setMapOpen(false);
      const id = exam.questions[index]?.id;
      if (id) {
        document.getElementById(`question-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [actions, exam.questions]
  );

  useEffect(() => {
    const onScroll = () => {
      userScrolledRef.current = true;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!ready || restoredRef.current) return;
    restoredRef.current = true;
    const id = exam.questions[state.currentIndex]?.id;
    if (id) {
      document.getElementById(`question-${id}`)?.scrollIntoView({ block: "start" });
    }
  }, [ready, state.currentIndex, exam.questions]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!userScrolledRef.current) return;
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (!visible) return;
        const index = Number((visible.target as HTMLElement).dataset.index);
        if (!Number.isNaN(index)) actions.goTo(index);
      },
      { rootMargin: "-100px 0px -55% 0px", threshold: 0 }
    );

    refs.current.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [actions, exam.questions.length]);

  function handleReset() {
    if (!window.confirm("確定要重新測試嗎？答案、標註與計時都會重置。")) return;
    actions.reset();
    setMapOpen(false);
    setSubmitOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleConfirmSubmit() {
    setSubmitOpen(false);
    actions.submit();
    window.scrollTo({ top: 0 });
  }

  if (!ready) {
    return <div className="grid min-h-screen place-items-center text-sm text-[#5b6673]">載入作答進度…</div>;
  }

  if (state.status === "submitted") {
    return (
      <SuccessView
        exam={exam}
        answered={answered}
        total={exam.questions.length}
        autoSubmitted={state.remainingSec === 0}
      />
    );
  }

  const total = exam.questions.length;
  const current = state.currentIndex;

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      <ExamHeader
        exam={exam}
        remainingSec={state.remainingSec}
        answered={answered}
        total={total}
        running={state.status === "running"}
        onPause={actions.pause}
        onSubmit={() => setSubmitOpen(true)}
      />

      {storageWarning ? (
        <div className="exam-shell mt-3">
          <p className="border border-[#d8b55a] bg-[#fff4d1] px-3 py-2 text-xs text-[#7a5400]">
            瀏覽器無法使用本機儲存，重新整理後作答進度可能遺失。
          </p>
        </div>
      ) : null}

      <div className="exam-shell mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_264px]">
        <main className="space-y-3">
          {exam.questions.map((question, index) => (
            <div
              key={question.id}
              ref={(element) => {
                refs.current[index] = element;
              }}
            >
              <QuestionCard
                question={question}
                number={index + 1}
                answer={state.answers[question.id]}
                flagged={state.flags.includes(question.id)}
                onAnswer={(answer) => actions.answer(question.id, answer)}
                onToggleFlag={() => actions.toggleFlag(question.id)}
              />
            </div>
          ))}

          <div className="flex gap-2 pb-6">
            <button
              type="button"
              onClick={() => navigate(current - 1)}
              disabled={current <= 0}
              className="exam-btn flex-1 py-2"
            >
              上一題
            </button>
            <button
              type="button"
              onClick={() => navigate(current + 1)}
              disabled={current >= total - 1}
              className="exam-btn flex-1 py-2"
            >
              下一題
            </button>
          </div>
        </main>

        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <QuestionMap
              questions={exam.questions}
              answers={state.answers}
              flags={state.flags}
              currentIndex={state.currentIndex}
              onNavigate={navigate}
            />
          </div>
        </aside>
      </div>

      <button
        type="button"
        onClick={() => setMapOpen(true)}
        className="exam-btn exam-btn-primary fixed bottom-4 right-4 z-30 px-4 py-3 lg:hidden"
      >
        題目地圖
      </button>

      {mapOpen ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            aria-label="關閉題目地圖"
            onClick={() => setMapOpen(false)}
            className="absolute inset-0 bg-black/40"
          />
          <div className="absolute right-0 top-0 h-full w-72 overflow-y-auto bg-[#eef1f5] p-3 shadow-xl">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-bold">題目地圖</span>
              <button type="button" onClick={() => setMapOpen(false)} className="exam-btn px-2 py-1 text-xs">
                關閉
              </button>
            </div>
            <QuestionMap
              questions={exam.questions}
              answers={state.answers}
              flags={state.flags}
              currentIndex={state.currentIndex}
              onNavigate={navigate}
            />
          </div>
        </div>
      ) : null}

      {state.status === "paused" ? (
        <PauseOverlay remainingSec={state.remainingSec} onResume={actions.resume} onReset={handleReset} />
      ) : null}

      <SubmitDialog
        open={submitOpen}
        answered={answered}
        total={total}
        unansweredNumbers={getUnansweredNumbers(exam, state.answers)}
        flaggedCount={countFlagged(exam, state.flags)}
        onCancel={() => setSubmitOpen(false)}
        onConfirm={handleConfirmSubmit}
      />
    </div>
  );
}
