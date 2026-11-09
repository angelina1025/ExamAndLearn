'use client';

import React from 'react';

interface RetestActionCardProps {
  wrongQuestionCount: number;
  onStartRetest?: () => void;
}

export const RetestActionCard: React.FC<RetestActionCardProps> = ({
  wrongQuestionCount,
  onStartRetest,
}) => {
  return (
    <div className="bg-[#dbe1ff]/40 rounded-xl border border-[#004ac6]/20 p-5 flex items-center justify-between">
      <div>
        <h3 className="text-sm font-bold text-[#004ac6]">錯題重測訓練</h3>
        <p className="text-xs text-[#434655] mt-0.5">
          目前累積 {wrongQuestionCount} 道待複習錯題，立即組成專屬複習卷
        </p>
      </div>
      <button
        type="button"
        disabled={wrongQuestionCount === 0}
        onClick={onStartRetest}
        className="px-4 py-2 rounded-lg text-xs font-bold bg-[#004ac6] text-white hover:bg-[#003ea8] disabled:opacity-50"
      >
        開始錯題重測
      </button>
    </div>
  );
};

