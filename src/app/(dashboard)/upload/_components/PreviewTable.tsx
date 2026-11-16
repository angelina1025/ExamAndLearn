'use client';

import React from 'react';
import { Question } from '@/types';

interface PreviewTableProps {
  questions: Question[];
  onConfirmImport?: () => void;
  onDownloadExcel?: () => void;
}

export const PreviewTable: React.FC<PreviewTableProps> = ({
  questions,
  onConfirmImport,
  onDownloadExcel,
}) => {
  return (
    <div className="bg-white rounded-xl border border-[#c3c6d7]/40 p-5 flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h3 className="text-sm font-bold text-[#191c1d]">
          匯入預覽 ({questions.length} 題)
        </h3>
        {questions.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {onDownloadExcel && (
              <button
                type="button"
                onClick={onDownloadExcel}
                className="px-3 py-1.5 rounded-lg text-xs font-bold border border-[#004ac6] text-[#004ac6] bg-white hover:bg-blue-50 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                <span>下載為個人 Google Sheet 格式 Excel</span>
              </button>
            )}
            {onConfirmImport && (
              <button
                type="button"
                onClick={onConfirmImport}
                className="px-4 py-1.5 rounded-lg text-xs font-bold bg-[#004ac6] text-white hover:bg-[#003ea8] transition-colors shadow-xs cursor-pointer"
              >
                確認批次寫入題庫
              </button>
            )}
          </div>
        )}
      </div>
      {questions.length === 0 ? (
        <p className="text-xs text-[#737686] py-6 text-center">尚無待匯入題目</p>
      ) : (
        <ul className="divide-y divide-[#c3c6d7]/30 text-xs">
          {questions.map((q) => (
            <li key={q.id} className="py-2.5 flex items-center justify-between gap-3">
              <span className="font-mono text-[#004ac6] font-bold shrink-0">{q.id}</span>
              <span className="flex-1 truncate text-[#191c1d]">{q.content}</span>
              <span className="text-[#434655] shrink-0">{q.points} 分</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
