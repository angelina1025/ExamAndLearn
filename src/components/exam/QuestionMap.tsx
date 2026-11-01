"use client";

import { isAnswered } from "@/features/exam/summary";
import type { Answer, ExamQuestion } from "@/types/exam";

interface Props {
  questions: ExamQuestion[];
  answers: Record<string, Answer>;
  flags: string[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export function QuestionMap({ questions, answers, flags, currentIndex, onNavigate }: Props) {
  return (
    <div className="exam-card p-3">
      <h2 className="mb-2 text-[13px] font-bold">題目地圖</h2>
      <div className="grid grid-cols-5 gap-1.5">
        {questions.map((question, index) => {
          const done = isAnswered(answers[question.id]);
          const flagged = flags.includes(question.id);
          const current = index === currentIndex;
          return (
            <button
              key={question.id}
              type="button"
              onClick={() => onNavigate(index)}
              className="exam-num"
              data-done={done}
              data-flagged={flagged}
              data-current={current}
              aria-label={`第 ${index + 1} 題`}
              aria-current={current ? "step" : undefined}
            >
              {index + 1}
              {done && flagged ? (
                <span className="absolute bottom-0.5 right-0.5 h-1.5 w-1.5 rounded-full bg-[#2f5597]" />
              ) : null}
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 border-t border-[#d5dce4] pt-2 text-[10px] text-[#5b6673]">
        <span className="inline-flex items-center gap-1">
          <i className="inline-block h-2.5 w-2.5 border border-[#24437a] bg-[#2f5597]" />
          已作答
        </span>
        <span className="inline-flex items-center gap-1">
          <i className="inline-block h-2.5 w-2.5 border border-[#b8942f] bg-[#e0b64a]" />
          已標註
        </span>
        <span className="inline-flex items-center gap-1">
          <i className="inline-block h-2.5 w-2.5 border border-[#aeb9c6] bg-[#fbfcfd]" />
          未作答
        </span>
      </div>
    </div>
  );
}
