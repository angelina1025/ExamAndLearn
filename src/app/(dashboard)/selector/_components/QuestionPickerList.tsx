'use client';

import React from 'react';
import { Question } from '@/types';

interface QuestionPickerListProps {
  questions: Question[];
  selectedIds: string[];
  onToggleQuestion: (id: string) => void;
}

export const QuestionPickerList: React.FC<QuestionPickerListProps> = ({
  questions,
  selectedIds,
  onToggleQuestion,
}) => {
  return (
    <div className="bg-white rounded-xl border border-[#c3c6d7]/40 divide-y divide-[#c3c6d7]/30">
      {questions.length === 0 ? (
        <div className="p-8 text-center text-sm text-[#737686]">目前尚無可選題目</div>
      ) : (
        questions.map((q) => {
          const checked = selectedIds.includes(q.id);
          return (
            <label
              key={q.id}
              className="flex items-start gap-3 p-4 hover:bg-[#f8f9fa] cursor-pointer"
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggleQuestion(q.id)}
                className="mt-1 rounded border-[#c3c6d7] text-[#004ac6]"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 text-xs text-[#434655]">
                  <span className="font-mono font-bold text-[#004ac6]">{q.id}</span>
                  <span>配分: {q.points} 分</span>
                  <span>時長: {q.time ?? 5} 分鐘</span>
                </div>
                <p className="text-sm text-[#191c1d] mt-1">{q.content}</p>
              </div>
            </label>
          );
        })
      )}
    </div>
  );
};

