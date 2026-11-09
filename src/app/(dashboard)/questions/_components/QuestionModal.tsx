'use client';

import React, { useState, useEffect } from 'react';
import { Question, SubjectId, DifficultyLevel } from '@/types';
import { formatSheetTimestamp } from '@/utils/formatters';

interface CreateQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (q: Question) => void;
  initialQuestion?: Question | null;
  defaultSubjectId?: SubjectId;
}

export const CreateQuestionModal: React.FC<CreateQuestionModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialQuestion,
  defaultSubjectId = 'math',
}) => {
  const [subjectId, setSubjectId] = useState<SubjectId>(defaultSubjectId);
  const [type, setType] = useState<'single' | 'multiple' | 'true_false'>('single');
  const [content, setContent] = useState('');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('medium');
  const [difficultyScore, setDifficultyScore] = useState<number>(3);
  const [points, setPoints] = useState(6);
  const [time, setTime] = useState<number>(5);
  const [tagsInput, setTagsInput] = useState('');
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [explanation, setExplanation] = useState('');

  useEffect(() => {
    if (initialQuestion) {
      setSubjectId(initialQuestion.subjectId);
      setType(initialQuestion.type);
      setContent(initialQuestion.content);
      setDifficulty(initialQuestion.difficulty);
      setDifficultyScore(initialQuestion.difficultyScore ?? (initialQuestion.difficulty === 'hard' ? 4 : initialQuestion.difficulty === 'medium' ? 3 : 2));
      setPoints(initialQuestion.points);
      setTime(initialQuestion.time ?? 5);
      setTagsInput(initialQuestion.tags.join(', '));
      setOptA(initialQuestion.options?.[0] || '');
      setOptB(initialQuestion.options?.[1] || '');
      setOptC(initialQuestion.options?.[2] || '');
      setOptD(initialQuestion.options?.[3] || '');
      setCorrectAnswer(initialQuestion.correctAnswer || '');
      setExplanation(initialQuestion.explanation || '');
    } else {
      setSubjectId(defaultSubjectId);
      setType('single');
      setContent('');
      setDifficulty('medium');
      setDifficultyScore(3);
      setPoints(6);
      setTime(5);
      setTagsInput('');
      setOptA('');
      setOptB('');
      setOptC('');
      setOptD('');
      setCorrectAnswer('');
      setExplanation('');
    }
  }, [initialQuestion, defaultSubjectId, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tags = tagsInput
      .split(/[,，\s]+/)
      .map((t) => t.trim())
      .filter(Boolean);

    const options =
      type === 'true_false'
        ? ['正確 (True)', '錯誤 (False)']
        : [optA, optB, optC, optD].filter(Boolean);

    const diffLevel: DifficultyLevel =
      difficultyScore >= 4.0 ? 'hard' : difficultyScore >= 2.5 ? 'medium' : 'easy';

    const questionToSave: Question = {
      id: initialQuestion ? initialQuestion.id : `Q-${subjectId.toUpperCase().slice(0, 4)}-${new Date().getFullYear()}${String(Math.floor(1000 + Math.random() * 9000))}`,
      subjectId,
      type,
      content: content.trim(),
      difficulty: diffLevel,
      difficultyScore: Number(difficultyScore) || 3,
      points: Number(points) || 6,
      time: Number(time) || 0,
      tags: tags.length > 0 ? tags : ['未分類'],
      updatedAt: formatSheetTimestamp(),
      options,
      correctAnswer: correctAnswer.trim(),
      explanation: explanation.trim(),
    };

    onSave(questionToSave);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-xl max-w-2xl w-full shadow-2xl p-6 flex flex-col gap-4 z-10 animate-in fade-in zoom-in-95 duration-200 border border-[#c3c6d7]/30">
        <div className="flex items-center justify-between pb-3 border-b border-[#c3c6d7]/30">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#dbe1ff] text-[#004ac6] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">edit_note</span>
            </span>
            <h2 className="text-[18px] text-[#191c1e] font-bold">
              {initialQuestion ? '編輯現有題目' : '新增題庫題目'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#434655] hover:text-[#191c1e] p-1 rounded cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Public Question Table Notice */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#e8edff] text-[#004ac6] border border-[#b4c5ff]/60 text-[12px]">
          <span className="material-symbols-outlined text-[16px]">cloud_done</span>
          <span>試題不設審核或草稿狀態，建立或上傳後即<strong>直接寫入「公用試題資料表」</strong>。</span>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto pr-1">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Subject */}
            <div className="flex flex-col gap-1">
              <label className="text-[12px] text-[#191c1e] font-semibold">所屬學科</label>
              <select
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value as SubjectId)}
                className="bg-[#f2f4f6] text-[#191c1e] text-[13px] px-3 py-2 rounded-lg border border-[#c3c6d7] focus:ring-2 focus:ring-[#004ac6]/40 focus:outline-none"
              >
                <option value="math">數學 (Math)</option>
                <option value="chinese">國文 (Chinese)</option>
                <option value="english">英文 (English)</option>
                <option value="physics">物理 (Physics)</option>
                <option value="chemistry">化學 (Chemistry)</option>
                <option value="biology">生物 (Biology)</option>
                <option value="astronomy">天文 (Astronomy)</option>
                <option value="civics">公民 (Civics)</option>
                <option value="geography">地理 (Geography)</option>
                <option value="history">歷史 (History)</option>
              </select>
            </div>

            {/* Type */}
            <div className="flex flex-col gap-1">
              <label className="text-[12px] text-[#191c1e] font-semibold">試題類型</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as 'single' | 'multiple' | 'true_false')}
                className="bg-[#f2f4f6] text-[#191c1e] text-[13px] px-3 py-2 rounded-lg border border-[#c3c6d7] focus:ring-2 focus:ring-[#004ac6]/40 focus:outline-none"
              >
                <option value="single">單選題 (Single Choice)</option>
                <option value="multiple">多選題 (Multiple Choice)</option>
                <option value="true_false">是非題 (True/False)</option>
              </select>
            </div>

            {/* Difficulty Score (1~5) */}
            <div className="flex flex-col gap-1">
              <label className="text-[12px] text-[#191c1e] font-semibold">
                難度 (1~5)
              </label>
              <input
                type="number"
                min="1"
                max="5"
                step="any"
                value={difficultyScore}
                onChange={(e) => {
                  const val = parseFloat(e.target.value) || 3;
                  setDifficultyScore(val);
                  setDifficulty(val >= 4.0 ? 'hard' : val >= 2.5 ? 'medium' : 'easy');
                }}
                className="bg-[#f2f4f6] text-[#191c1e] font-mono text-[13px] px-3 py-2 rounded-lg border border-[#c3c6d7] focus:ring-2 focus:ring-[#004ac6]/40 focus:outline-none"
              />
            </div>
          </div>

          {/* Points, Time & Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[12px] text-[#191c1e] font-semibold">配分 (score)</label>
              <input
                required
                type="number"
                min="1"
                max="50"
                value={points}
                onChange={(e) => setPoints(Number(e.target.value))}
                className="bg-[#f2f4f6] text-[#191c1e] text-[13px] px-3 py-2 rounded-lg border border-[#c3c6d7] focus:ring-2 focus:ring-[#004ac6]/40 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[12px] text-[#191c1e] font-semibold">題目時長 (time, 分鐘)</label>
              <input
                required
                type="number"
                min="0"
                step="any"
                value={time}
                onChange={(e) => setTime(Number(e.target.value))}
                className="bg-[#f2f4f6] text-[#191c1e] text-[13px] px-3 py-2 rounded-lg border border-[#c3c6d7] focus:ring-2 focus:ring-[#004ac6]/40 focus:outline-none"
              />
            </div>
            <div className="sm:col-span-2 flex flex-col gap-1">
              <label className="text-[12px] text-[#191c1e] font-semibold">知識點標籤 (以逗號隔開)</label>
              <input
                type="text"
                placeholder="例如：二次函數, 頂點坐標, 空間幾何"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="bg-[#f2f4f6] text-[#191c1e] text-[13px] px-3 py-2 rounded-lg border border-[#c3c6d7] focus:ring-2 focus:ring-[#004ac6]/40 focus:outline-none"
              />
            </div>
          </div>

          {/* Stem */}
          <div className="flex flex-col gap-1">
            <label className="text-[12px] text-[#191c1e] font-semibold flex items-center gap-1">
              <span>題目內文</span>
              <span className="text-[#ba1a1a]">*</span>
            </label>
            <textarea
              required
              rows={3}
              placeholder="請輸入完整題目陳述..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="bg-[#f2f4f6] text-[#191c1e] text-[13px] px-3 py-2 rounded-lg border border-[#c3c6d7] focus:ring-2 focus:ring-[#004ac6]/40 focus:outline-none"
            />
          </div>

          {/* Options (if single or multiple) */}
          {type !== 'true_false' && (
            <div className="flex flex-col gap-2">
              <label className="text-[12px] text-[#191c1e] font-semibold">題目選項</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="選項 A"
                  value={optA}
                  onChange={(e) => setOptA(e.target.value)}
                  className="bg-[#f2f4f6] text-[#191c1e] text-[13px] px-3 py-1.5 rounded-lg border border-[#c3c6d7]"
                />
                <input
                  type="text"
                  placeholder="選項 B"
                  value={optB}
                  onChange={(e) => setOptB(e.target.value)}
                  className="bg-[#f2f4f6] text-[#191c1e] text-[13px] px-3 py-1.5 rounded-lg border border-[#c3c6d7]"
                />
                <input
                  type="text"
                  placeholder="選項 C"
                  value={optC}
                  onChange={(e) => setOptC(e.target.value)}
                  className="bg-[#f2f4f6] text-[#191c1e] text-[13px] px-3 py-1.5 rounded-lg border border-[#c3c6d7]"
                />
                <input
                  type="text"
                  placeholder="選項 D"
                  value={optD}
                  onChange={(e) => setOptD(e.target.value)}
                  className="bg-[#f2f4f6] text-[#191c1e] text-[13px] px-3 py-1.5 rounded-lg border border-[#c3c6d7]"
                />
              </div>
            </div>
          )}

          {/* Correct answer & explanation */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[12px] text-[#191c1e] font-semibold">正確解答</label>
              <input
                type="text"
                placeholder={type === 'true_false' ? '正確 (True)' : '例如：A 或 -3'}
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
                className="bg-[#f2f4f6] text-[#191c1e] text-[13px] px-3 py-2 rounded-lg border border-[#c3c6d7]"
              />
            </div>
            <div className="sm:col-span-2 flex flex-col gap-1">
              <label className="text-[12px] text-[#191c1e] font-semibold">題目詳解 / 評分標準</label>
              <input
                type="text"
                placeholder="輸入推導過程或評分備註..."
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                className="bg-[#f2f4f6] text-[#191c1e] text-[13px] px-3 py-2 rounded-lg border border-[#c3c6d7]"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-[#c3c6d7]/30 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#eceef0] text-[#191c1e] rounded hover:bg-[#e0e3e5] text-[13px] font-medium transition-colors cursor-pointer"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#004ac6] text-white rounded hover:bg-[#2563eb] text-[13px] font-semibold shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">check</span>
              <span>{initialQuestion ? '更新題目' : '確定新增'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
