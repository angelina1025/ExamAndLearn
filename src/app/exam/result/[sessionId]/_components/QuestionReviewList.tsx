'use client';

import React from 'react';
import { Question } from '@/types';

interface QuestionReviewListProps {
  questions?: Question[];
}

export const QuestionReviewList: React.FC<QuestionReviewListProps> = ({ questions = [] }) => {
  return (
    <div className="bg-white p-5 rounded-xl border border-[#c3c6d7]/30">
      <h3 className="text-[15px] font-bold text-[#191c1e] mb-3">逐題詳解檢討 ({questions.length} 題)</h3>
      {questions.length === 0 && (
        <p className="text-[13px] text-[#737686]">尚無作答題目紀錄</p>
      )}
    </div>
  );
};

