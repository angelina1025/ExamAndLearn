import React, { useState, useEffect, useRef } from 'react';
import { Question, ExamPaper } from '@/types';
import { formatSheetTimestamp } from '@/utils/formatters';

interface ExamGenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedQuestions: Question[];
  onExamCreated: (newExam: ExamPaper) => void;
}

export const ExamGenerationModal: React.FC<ExamGenerationModalProps> = ({
  isOpen,
  onClose,
  selectedQuestions,
  onExamCreated,
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [examTitle, setExamTitle] = useState('2024年高二數學科平時測驗 (單元：函數與空間幾何)');
  const [description, setDescription] = useState('限時 45 分鐘，滿分 100 分');
  const [duration, setDuration] = useState(45);
  const [difficultyLv, setDifficultyLv] = useState(4);
  const [status, setStatus] = useState<'published' | 'draft'>('published');
  const [createdExamId, setCreatedExamId] = useState('');
  const confirmBtnRef = useRef<HTMLButtonElement>(null);

  const totalPoints = selectedQuestions.reduce((acc, q) => acc + q.points, 0);

  useEffect(() => {
    if (isOpen) {
      setStep('form');
      setExamTitle('2024年高二數學科平時測驗 (單元：函數與空間幾何)');
      setDescription('限時 45 分鐘，滿分 100 分');
      setStatus('published');
      setCreatedExamId(`EXAM-2024-MATH-${String(Math.floor(82 + Math.random() * 50)).padStart(3, '0')}`);
    }
  }, [isOpen]);

  useEffect(() => {
    if (step === 'success') {
      setTimeout(() => {
        confirmBtnRef.current?.focus();
      }, 50);
    }
  }, [step]);

  // Handle ESC and Enter
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'Enter' && step === 'success') {
        handleFinish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, step]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newExam: ExamPaper = {
      id: createdExamId,
      title: examTitle.trim() || '高二數學平時評量測驗',
      description: description.trim() || '依選定題庫組合試卷',
      subject: '數學',
      subjectId: 'math',
      difficultyLv: difficultyLv,
      questionCount: selectedQuestions.length,
      totalScore: 100,
      durationMinutes: duration,
      createdAt: formatSheetTimestamp(),
      status: status,
      examineeCount: 0,
      questionIds: selectedQuestions.map((q) => q.id),
    };
    onExamCreated(newExam);
    setStep('success');
  };

  const handleFinish = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={step === 'form' ? onClose : undefined}
      ></div>

      {step === 'form' ? (
        /* Step 1: Exam Form */
        <div className="relative bg-white rounded-xl max-w-lg w-full shadow-2xl p-6 flex flex-col gap-4 z-10 animate-in fade-in zoom-in-95 duration-200 border border-[#c3c6d7]/30">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-[#c3c6d7]/30">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#dbe1ff] text-[#004ac6] flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">assignment_add</span>
              </span>
              <div>
                <h2 className="text-[18px] text-[#191c1e] font-bold">快速生成考卷</h2>
                <p className="text-[11px] text-[#004ac6] font-semibold">
                  已選 {selectedQuestions.length} 題 / 題庫原始配分總計 {totalPoints} 分 (可自動等比折算100分)
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-[#434655] hover:text-[#191c1e] p-1 rounded cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Selected items mini-list preview */}
          <div className="flex flex-col gap-1">
            <span className="text-[12px] text-[#434655] font-semibold">
              已選題目清單 ({selectedQuestions.length})
            </span>
            <div className="max-h-36 overflow-y-auto bg-[#f2f4f6] p-2 rounded-lg flex flex-col gap-1.5 border border-[#c3c6d7]/30">
              {selectedQuestions.map((q) => (
                <div
                  key={q.id}
                  className="p-2 bg-white rounded shadow-2xs flex items-center justify-between border border-[#eceef0]"
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="font-mono text-[12px] font-semibold text-[#004ac6] shrink-0">
                      {q.id}
                    </span>
                    <span className="text-[12px] text-[#191c1e] truncate max-w-[240px]">
                      {q.content}
                    </span>
                  </div>
                  <span className="text-[11px] bg-[#dae2fd] text-[#5c647a] px-1.5 py-0.5 rounded font-medium shrink-0">
                    {q.points}分
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Form Inputs */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[12px] text-[#191c1e] font-semibold flex items-center gap-1">
                <span>試卷名稱</span>
                <span className="text-[#ba1a1a]">*</span>
              </label>
              <input
                required
                type="text"
                value={examTitle}
                onChange={(e) => setExamTitle(e.target.value)}
                className="w-full bg-[#f2f4f6] text-[#191c1e] text-[13px] px-3 py-2 rounded-lg border border-[#c3c6d7] focus:ring-2 focus:ring-[#004ac6]/40 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[12px] text-[#191c1e] font-semibold">
                測驗說明 / 備註標籤
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-[#f2f4f6] text-[#191c1e] text-[13px] px-3 py-2 rounded-lg border border-[#c3c6d7] focus:ring-2 focus:ring-[#004ac6]/40 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[12px] text-[#191c1e] font-semibold">
                  考試時長 (分鐘)
                </label>
                <input
                  type="number"
                  min="10"
                  max="300"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full bg-[#f2f4f6] text-[#191c1e] text-[13px] px-3 py-2 rounded-lg border border-[#c3c6d7] focus:ring-2 focus:ring-[#004ac6]/40 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[12px] text-[#191c1e] font-semibold">
                  難度等級 (Lv. 1 - 5)
                </label>
                <select
                  value={difficultyLv}
                  onChange={(e) => setDifficultyLv(Number(e.target.value))}
                  className="w-full bg-[#f2f4f6] text-[#191c1e] text-[13px] px-3 py-2 rounded-lg border border-[#c3c6d7] focus:ring-2 focus:ring-[#004ac6]/40 focus:outline-none"
                >
                  <option value={1}>Lv. 1 (基礎入門)</option>
                  <option value={2}>Lv. 2 (標準基礎)</option>
                  <option value={3}>Lv. 3 (中等進階)</option>
                  <option value={4}>Lv. 4 (高階挑戰)</option>
                  <option value={5}>Lv. 5 (資優拔尖)</option>
                </select>
              </div>
            </div>

            {/* 試卷狀態與資料表歸屬 */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] text-[#191c1e] font-semibold">
                試卷狀態與資料表歸屬
              </label>
              <div className="grid grid-cols-2 gap-2">
                <label
                  className={`p-2.5 rounded-lg border cursor-pointer flex flex-col gap-1 transition-all ${
                    status === 'draft'
                      ? 'border-[#004ac6] bg-[#dbe1ff]/30 text-[#004ac6]'
                      : 'border-[#c3c6d7]/60 bg-white text-[#434655] hover:bg-[#f2f4f6]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-bold">草稿</span>
                    <input
                      type="radio"
                      name="examStatus"
                      checked={status === 'draft'}
                      onChange={() => setStatus('draft')}
                      className="accent-[#004ac6]"
                    />
                  </div>
                  <span className="text-[11px] text-[#565e74] font-medium">寫在草稿資料表</span>
                </label>

                <label
                  className={`p-2.5 rounded-lg border cursor-pointer flex flex-col gap-1 transition-all ${
                    status === 'published'
                      ? 'border-[#137333] bg-[#e6f4ea] text-[#137333]'
                      : 'border-[#c3c6d7]/60 bg-white text-[#434655] hover:bg-[#f2f4f6]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-bold">正式發布</span>
                    <input
                      type="radio"
                      name="examStatus"
                      checked={status === 'published'}
                      onChange={() => setStatus('published')}
                      className="accent-[#137333]"
                    />
                  </div>
                  <span className="text-[11px] text-[#565e74] font-medium">寫在公用試卷資料表</span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg hover:bg-[#eceef0] text-[#191c1e] text-[13px] font-medium transition-colors cursor-pointer"
              >
                取消
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[#004ac6] hover:bg-[#2563eb] text-white text-[13px] font-semibold shadow-sm transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>確認建立考卷</span>
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Step 2: Creation Success Modal */
        <div className="relative bg-white rounded-xl max-w-sm w-full shadow-2xl p-6 flex flex-col items-center text-center gap-4 z-10 animate-in fade-in zoom-in-95 duration-200 border border-[#c3c6d7]/30">
          {/* Big Emerald Green Success Icon */}
          <div className="w-16 h-16 rounded-full bg-[#6ffbbe] text-[#006242] flex items-center justify-center shadow-inner">
            <span
              className="material-symbols-outlined text-[36px]"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              check_circle
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="text-[20px] text-[#191c1e] font-bold">已成功生成試卷！</h2>
            <p className="text-[13px] text-[#434655]">
              {status === 'published'
                ? '測驗組卷完成，已正式發布並寫入「公用試卷資料表」。'
                : '測驗組卷完成，已存為草稿並寫入「草稿資料表」。'}
            </p>
          </div>

          {/* Information Card */}
          <div className="w-full bg-[#f2f4f6] p-3 rounded-lg text-left flex flex-col gap-1.5 border border-[#c3c6d7]/30">
            <div className="flex justify-between items-center text-[#434655] text-[12px]">
              <span>試卷 ID:</span>
              <span className="font-mono font-bold text-[#004ac6]">{createdExamId}</span>
            </div>
            <div className="flex justify-between items-center text-[#434655] text-[12px]">
              <span>試卷名稱:</span>
              <span className="text-[13px] font-medium text-[#191c1e] truncate max-w-[180px]">
                {examTitle}
              </span>
            </div>
            <div className="flex justify-between items-center text-[#434655] text-[12px]">
              <span>狀態與儲存:</span>
              <span className={`text-[12px] font-semibold ${status === 'published' ? 'text-[#137333]' : 'text-[#b06000]'}`}>
                {status === 'published' ? '發布 (公用試卷資料表)' : '草稿 (草稿資料表)'}
              </span>
            </div>
          </div>

          {/* Action Button */}
          <div className="w-full flex flex-col gap-1 mt-1">
            <button
              ref={confirmBtnRef}
              type="button"
              onClick={handleFinish}
              className="w-full py-2 px-4 rounded-lg bg-[#004ac6] text-white text-[14px] font-semibold hover:bg-[#2563eb] shadow-md ring-4 ring-[#004ac6]/30 transition-all focus:outline-none cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>確認返回 (Enter)</span>
              <kbd className="font-mono text-[11px] bg-white/20 px-1.5 py-0.5 rounded text-white">
                ↵
              </kbd>
            </button>
            <span className="text-[11px] text-[#434655]/70">
              按鍵盤 Enter 鍵即可快速確認關閉
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
