import React, { useState, useEffect, useRef } from 'react';
import { Question, ExamPaper } from '@/types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
  examPapers: ExamPaper[];
  onSelectQuestion: (q: Question) => void;
  onSelectExam: (exam: ExamPaper) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  questions,
  examPapers,
  onSelectQuestion,
  onSelectExam,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setSearchTerm('');
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const term = searchTerm.trim().toLowerCase();

  const filteredQuestions = term
    ? questions.filter(
        (q) =>
          q.id.toLowerCase().includes(term) ||
          q.content.toLowerCase().includes(term) ||
          q.tags.some((t) => t.toLowerCase().includes(term))
      )
    : questions.slice(0, 4);

  const filteredExams = term
    ? examPapers.filter(
        (e) =>
          e.id.toLowerCase().includes(term) ||
          e.title.toLowerCase().includes(term) ||
          e.subject.toLowerCase().includes(term)
      )
    : examPapers.slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-xl max-w-xl w-full shadow-2xl overflow-hidden flex flex-col z-10 animate-in fade-in zoom-in-95 duration-150 border border-[#c3c6d7]/30">
        {/* Search header */}
        <div className="flex items-center px-4 py-3 border-b border-[#c3c6d7]/30 gap-3">
          <span className="material-symbols-outlined text-[#434655] text-[22px]">search</span>
          <input
            ref={inputRef}
            type="text"
            placeholder="搜尋題目內容、試卷名稱、ID 或知識點..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 text-[14px] text-[#191c1e] placeholder:text-[#434655]/60 outline-none"
          />
          <kbd className="font-mono text-[11px] bg-[#eceef0] px-1.5 py-0.5 rounded text-[#434655]">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3 flex flex-col gap-3">
          {/* Exam Papers */}
          <div>
            <div className="text-[11px] font-semibold text-[#434655] uppercase px-2 mb-1">
              試卷清單 (Exam Papers)
            </div>
            {filteredExams.length === 0 ? (
              <div className="text-xs text-[#434655]/60 px-2 py-1">無符合試卷</div>
            ) : (
              filteredExams.map((exam) => (
                <div
                  key={exam.id}
                  onClick={() => {
                    onSelectExam(exam);
                    onClose();
                  }}
                  className="p-2.5 rounded-lg hover:bg-[#f2f4f6] cursor-pointer flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="material-symbols-outlined text-[#004ac6] text-[18px]">
                      assignment
                    </span>
                    <div>
                      <div className="text-[13px] font-semibold text-[#191c1e]">{exam.title}</div>
                      <div className="text-[11px] font-mono text-[#004ac6]">{exam.id}</div>
                    </div>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 bg-[#eceef0] text-[#434655] rounded">
                    {exam.subject} · {exam.questionCount}題
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Questions */}
          <div>
            <div className="text-[11px] font-semibold text-[#434655] uppercase px-2 mb-1">
              題庫試題 (Question Bank)
            </div>
            {filteredQuestions.length === 0 ? (
              <div className="text-xs text-[#434655]/60 px-2 py-1">無符合題目</div>
            ) : (
              filteredQuestions.map((q) => (
                <div
                  key={q.id}
                  onClick={() => {
                    onSelectQuestion(q);
                    onClose();
                  }}
                  className="p-2.5 rounded-lg hover:bg-[#f2f4f6] cursor-pointer flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="material-symbols-outlined text-[#007d55] text-[18px]">
                      menu_book
                    </span>
                    <div className="truncate max-w-[340px]">
                      <div className="text-[13px] font-medium text-[#191c1e] truncate">
                        {q.content}
                      </div>
                      <div className="text-[11px] font-mono text-[#004ac6]">{q.id}</div>
                    </div>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 bg-[#dae2fd] text-[#5c647a] rounded font-medium">
                    {q.points}分
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-[#f2f4f6] text-[11px] text-[#434655] border-t border-[#c3c6d7]/30 flex items-center justify-between">
          <span>點選項目直接前往檢閱或編輯</span>
          <span>支援 ID、關鍵字與知識點標籤搜尋</span>
        </div>
      </div>
    </div>
  );
};
