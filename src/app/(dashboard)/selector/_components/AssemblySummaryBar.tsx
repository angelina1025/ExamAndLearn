'use client';

import React from 'react';
import { Question } from '@/types';

interface AssemblySummaryBarProps {
  selectedQuestions: Question[];
  onClear: () => void;
  onConfirmAssemble: () => void;
}

export const AssemblySummaryBar: React.FC<AssemblySummaryBarProps> = ({
  selectedQuestions,
  onClear,
  onConfirmAssemble,
}) => {
  const totalPoints = selectedQuestions.reduce((sum, q) => sum + q.points, 0);
  const totalMinutes = selectedQuestions.reduce((sum, q) => sum + (q.time ?? 5), 0);

  return (
    <div className="flex items-center justify-between bg-white rounded-xl border border-[#c3c6d7]/40 px-5 py-3 shadow-sm">
      <div className="flex items-center gap-4 text-xs text-[#434655]">
        <span>
          已選題數：<strong className="text-[#004ac6]">{selectedQuestions.length}</strong> 題
        </span>
        <span>
          總配分：<strong className="text-[#191c1d]">{totalPoints}</strong> 分
        </span>
        <span>
          預估時長：<strong className="text-[#191c1d]">{totalMinutes}</strong> 分鐘
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onClear}
          className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#434655] hover:bg-[#f2f4f6]"
        >
          清空已選
        </button>
        <button
          type="button"
          disabled={selectedQuestions.length === 0}
          onClick={onConfirmAssemble}
          className="px-4 py-1.5 rounded-lg text-xs font-bold bg-[#004ac6] text-white hover:bg-[#003ea8] disabled:opacity-50"
        >
          生成試卷
        </button>
      </div>
    </div>
  );
};

