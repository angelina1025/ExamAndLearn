'use client';

import React from 'react';
import { Question } from '@/types';

interface PreviewTableProps {
  questions: Question[];
  onConfirmImport?: () => void;
}

export const PreviewTable: React.FC<PreviewTableProps> = ({
  questions,
  onConfirmImport,
}) => {
  return (
    <div className="bg-white rounded-xl border border-[#c3c6d7]/40 p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#191c1d]">
          匯入預覽 ({questions.length} 題)
        </h3>
        {questions.length > 0 && (
          <button
            type="button"
            onClick={onConfirmImport}
            className="px-4 py-1.5 rounded-lg text-xs font-bold bg-[#004ac6] text-white hover:bg-[#003ea8]"
          >
            確認批次寫入題庫
          </button>
        )}
      </div>
      {questions.length === 0 ? (
        <p className="text-xs text-[#737686] py-6 text-center">尚無待匯入題目</p>
      ) : (
        <ul className="divide-y divide-[#c3c6d7]/30 text-xs">
          {questions.map((q) => (
            <li key={q.id} className="py-2 flex items-center justify-between">
              <span className="font-mono text-[#004ac6] font-bold">{q.id}</span>
              <span className="flex-1 mx-3 truncate text-[#191c1d]">{q.content}</span>
              <span className="text-[#434655]">{q.points} 分</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

