import React from 'react';
import { Question } from '@/types';

interface QuestionDetailModalProps {
  question: Question | null;
  onClose: () => void;
  onEdit: (q: Question) => void;
}

export const QuestionDetailModal: React.FC<QuestionDetailModalProps> = ({
  question,
  onClose,
  onEdit,
}) => {
  if (!question) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-xl max-w-2xl w-full shadow-2xl p-6 flex flex-col gap-4 z-10 animate-in fade-in zoom-in-95 duration-200 border border-[#c3c6d7]/30">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#c3c6d7]/30">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#dbe1ff] text-[#004ac6] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">help_outline</span>
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-[18px] text-[#191c1e] font-bold">題目詳情與解析檢視</h2>
                <span className="font-mono text-[12px] bg-[#f2f4f6] text-[#004ac6] px-2 py-0.5 rounded font-semibold border border-[#c3c6d7]/40">
                  {question.id}
                </span>
              </div>
              <p className="text-[12px] text-[#434655]">更新時間：{question.updatedAt}</p>
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

        {/* Content Body */}
        <div className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto pr-1">
          {/* Badges / Metrics bar */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-medium px-2.5 py-1 rounded bg-[#eceef0] text-[#191c1e]">
              題型：{question.type === 'single' ? '單選題' : question.type === 'multiple' ? '多選題' : '是非題'}
            </span>
            <span className="font-medium px-2.5 py-1 rounded bg-[#dae2fd] text-[#5c647a]">
              配分：{question.points} 分
            </span>
            <span className={`font-semibold px-2.5 py-1 rounded ${
              question.difficulty === 'hard'
                ? 'bg-[#ffdad6] text-[#ba1a1a]'
                : question.difficulty === 'medium'
                ? 'bg-[#dae2fd] text-[#5c647a]'
                : 'bg-[#6ffbbe]/40 text-[#006242]'
            }`}>
              難度：{question.difficultyScore !== undefined ? `★ ${question.difficultyScore} / 5.0 (${question.difficulty === 'hard' ? '困難' : question.difficulty === 'medium' ? '中等' : '簡單'})` : question.difficulty === 'hard' ? '困難 Hard' : question.difficulty === 'medium' ? '中等 Medium' : '簡單 Easy'}
            </span>
          </div>

          {/* Stem */}
          <div className="p-4 bg-[#f2f4f6] rounded-lg border border-[#c3c6d7]/30">
            <div className="text-[11px] font-semibold text-[#434655] uppercase tracking-wider mb-1">
              題目內文 (Stem)
            </div>
            <p className="text-[15px] leading-relaxed text-[#191c1e] font-medium whitespace-pre-wrap">
              {question.content}
            </p>
          </div>

          {/* Options (if any) */}
          {question.options && question.options.length > 0 && (
            <div className="flex flex-col gap-2">
              <div className="text-[12px] font-semibold text-[#434655]">選項清單</div>
              <div className="grid grid-cols-1 gap-2">
                {question.options.map((opt, idx) => {
                  const letter = String.fromCharCode(65 + idx);
                  const cleanOpt = opt.replace(/^[A-H][.:\s]\s*/, '').trim();
                  const isAnswer = question.correctAnswer?.includes(letter) || (cleanOpt && question.correctAnswer?.includes(cleanOpt)) || question.correctAnswer === opt;
                  return (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg border flex items-center justify-between ${
                        isAnswer
                          ? 'bg-[#bdffdb]/20 border-[#007d55] text-[#006242]'
                          : 'bg-white border-[#c3c6d7]/40 text-[#191c1e]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs w-5">{letter}.</span>
                        <span className="text-[13px]">{cleanOpt}</span>
                      </div>
                      {isAnswer && (
                        <span className="text-[11px] font-semibold bg-[#6ffbbe] text-[#002113] px-2 py-0.5 rounded">
                          正確答案
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Correct answer & explanation */}
          <div className="p-4 bg-[#eceef0]/60 rounded-lg border border-[#c3c6d7]/40 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006242] text-[18px]">verified</span>
              <span className="text-[13px] font-semibold text-[#191c1e]">參考解答與解題思路：</span>
              <span className="font-bold text-[#006242]">{question.correctAnswer || '請參考詳解'}</span>
            </div>
            {question.explanation && (
              <p className="text-[13px] text-[#434655] leading-relaxed pl-6">
                {question.explanation}
              </p>
            )}
          </div>

          {/* Tags */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[12px] text-[#434655] font-medium">知識點標籤：</span>
            {question.tags.map((t, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded bg-[#eceef0] text-[#191c1e] text-[12px]">
                #{t}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#c3c6d7]/30 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-[#eceef0] text-[#191c1e] rounded hover:bg-[#e0e3e5] text-[13px] font-medium transition-colors cursor-pointer"
          >
            關閉
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onEdit(question);
            }}
            className="px-4 py-2 bg-[#004ac6] text-white rounded hover:bg-[#2563eb] text-[13px] font-medium flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">edit</span>
            <span>編輯此題目</span>
          </button>
        </div>
      </div>
    </div>
  );
};
