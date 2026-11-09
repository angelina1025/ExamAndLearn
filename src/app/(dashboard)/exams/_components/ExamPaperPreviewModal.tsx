'use client';

import React from 'react';
import { ExamPaper, Question } from '@/types';

interface ExamPaperPreviewModalProps {
  exam: ExamPaper | null;
  onClose: () => void;
  questions: Question[];
  onExport: (format: 'pdf' | 'word') => void;
}

export const ExamPaperPreviewModal: React.FC<ExamPaperPreviewModalProps> = ({
  exam,
  onClose,
  questions,
  onExport,
}) => {
  if (!exam) return null;

  // Filter linked questions if any, or provide relevant sample questions
  const linkedQuestions = exam.questionIds
    ? questions.filter((q) => exam.questionIds?.includes(q.id))
    : questions.filter((q) => q.subjectId === exam.subjectId).slice(0, exam.questionCount);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-xl max-w-3xl w-full shadow-2xl p-6 flex flex-col gap-4 z-10 animate-in fade-in zoom-in-95 duration-200 border border-[#c3c6d7]/30 max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#c3c6d7]/30">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#dbe1ff] text-[#004ac6] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">assignment</span>
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-[18px] text-[#191c1e] font-bold">{exam.title}</h2>
                <span className="font-mono text-[11px] bg-[#dae2fd] text-[#004ac6] px-2 py-0.5 rounded font-semibold">
                  {exam.id}
                </span>
              </div>
              <p className="text-[12px] text-[#434655]">{exam.description}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#434655] hover:text-[#191c1e] p-1 rounded cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Paper Metadata Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-3 bg-[#f2f4f6] rounded-lg text-center text-xs border border-[#c3c6d7]/30">
          <div>
            <span className="text-[#434655] block">學科類別</span>
            <span className="font-semibold text-[#191c1e]">{exam.subject}</span>
          </div>
          <div>
            <span className="text-[#434655] block">試卷難度</span>
            <span className="font-semibold text-[#004ac6]">Lv. {exam.difficultyLv}</span>
          </div>
          <div>
            <span className="text-[#434655] block">題目總數</span>
            <span className="font-semibold text-[#191c1e]">{exam.questionCount} 題</span>
          </div>
          <div>
            <span className="text-[#434655] block">測驗總分</span>
            <span className="font-semibold text-[#191c1e]">{exam.totalScore} 分</span>
          </div>
          <div>
            <span className="text-[#434655] block">應試限時</span>
            <span className="font-semibold text-[#191c1e]">{exam.durationMinutes} 分鐘</span>
          </div>
        </div>

        {/* Paper Content Preview (Simulated Sheet) */}
        <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-4 bg-white border border-[#c3c6d7]/40 rounded-lg p-5">
          <div className="text-center border-b border-[#c3c6d7]/40 pb-3">
            <h3 className="text-[18px] font-bold text-[#191c1e] tracking-wide">{exam.title}</h3>
            <p className="text-[12px] text-[#434655] mt-1">
              准考證號碼：_______________&nbsp;&nbsp;&nbsp;&nbsp;姓名：_______________&nbsp;&nbsp;&nbsp;&nbsp;座號：______
            </p>
          </div>

          <div className="text-[13px] text-[#434655] bg-[#eceef0]/50 p-2.5 rounded">
            <strong>【考生注意事項】</strong>
            <ul className="list-disc pl-5 mt-1 space-y-0.5 text-xs">
              <li>本測驗時間共 {exam.durationMinutes} 分鐘，滿分 {exam.totalScore} 分。</li>
              <li>請於作答前檢查試題本與答案卡是否完整，如有缺漏請立即舉手反映。</li>
              <li>非選題請以黑、藍色原子筆書寫，字跡務必工整清晰。</li>
            </ul>
          </div>

          {/* Questions list */}
          <div className="flex flex-col gap-4 mt-2">
            <h4 className="font-bold text-[14px] text-[#191c1e] border-b pb-1">
              一、 綜合測驗試題 (共 {linkedQuestions.length || exam.questionCount} 題)
            </h4>

            {(linkedQuestions.length > 0 ? linkedQuestions : questions.slice(0, 5)).map((q, idx) => (
              <div key={q.id || idx} className="flex flex-col gap-1.5 p-3 rounded-lg bg-[#f7f9fb] border border-[#eceef0]">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[13px] font-semibold text-[#191c1e]">
                    第 {idx + 1} 題 ({q.points} 分)：
                  </span>
                  <span className="font-mono text-[11px] text-[#434655]/70">{q.id}</span>
                </div>
                <p className="text-[13px] text-[#191c1e] leading-relaxed pl-2">
                  {q.content}
                </p>

                {q.options && q.options.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-4 mt-1 text-xs">
                    {q.options.map((opt, optIdx) => (
                      <div key={optIdx} className="text-[#434655]">
                        ({String.fromCharCode(65 + optIdx)}) {opt}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer actions */}
        <div className="pt-3 border-t border-[#c3c6d7]/30 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onExport('pdf')}
              className="px-3 py-1.5 bg-[#f2f4f6] text-[#191c1e] rounded hover:bg-[#eceef0] text-[13px] font-medium flex items-center gap-1.5 border border-[#c3c6d7]/50 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-[#ba1a1a]">picture_as_pdf</span>
              <span>匯出 PDF 試卷</span>
            </button>
            <button
              type="button"
              onClick={() => onExport('word')}
              className="px-3 py-1.5 bg-[#f2f4f6] text-[#191c1e] rounded hover:bg-[#eceef0] text-[13px] font-medium flex items-center gap-1.5 border border-[#c3c6d7]/50 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-[#004ac6]">description</span>
              <span>匯出 Word (DOCX)</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-[#004ac6] text-white rounded hover:bg-[#2563eb] text-[13px] font-semibold transition-colors cursor-pointer"
          >
            完成檢閱
          </button>
        </div>
      </div>
    </div>
  );
};
