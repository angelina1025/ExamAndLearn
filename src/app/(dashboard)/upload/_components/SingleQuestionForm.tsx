'use client';

import React, { useState } from 'react';
import { Question } from '@/types';

interface SingleQuestionFormProps {
  onAdd: (question: Question) => void;
}

export const SingleQuestionForm: React.FC<SingleQuestionFormProps> = ({ onAdd }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onAdd({
      id: `Q-MAN-${Date.now()}`,
      subjectId: 'math',
      type: 'single',
      content: content.trim(),
      difficulty: 'medium',
      difficultyScore: 3,
      points: 5,
      time: 5,
      tags: [],
      updatedAt: new Date().toISOString(),
    });
    setContent('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl border border-[#c3c6d7]/40 p-5 flex flex-col gap-3"
    >
      <h3 className="text-sm font-bold text-[#191c1d]">單題快速新增</h3>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="請輸入題目題幹內容..."
        rows={3}
        className="w-full px-3 py-2 text-sm border border-[#c3c6d7] rounded-lg"
      />
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-1.5 rounded-lg text-xs font-bold bg-[#004ac6] text-white hover:bg-[#003ea8]"
        >
          加入預覽清單
        </button>
      </div>
    </form>
  );
};

