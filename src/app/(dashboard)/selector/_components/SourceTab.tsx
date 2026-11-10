'use client';

import React from 'react';

export type QuestionSourceScope = 'public' | 'private';

interface SourceTabProps {
  activeSource: QuestionSourceScope;
  onChange: (source: QuestionSourceScope) => void;
}

export const SourceTab: React.FC<SourceTabProps> = ({ activeSource, onChange }) => {
  return (
    <div className="inline-flex rounded-lg bg-[#f2f4f6] p-1 border border-[#c3c6d7]/30">
      <button
        type="button"
        onClick={() => onChange('public')}
        className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
          activeSource === 'public'
            ? 'bg-white text-[#004ac6] shadow-sm'
            : 'text-[#434655] hover:text-[#191c1d]'
        }`}
      >
        公用題庫
      </button>
      <button
        type="button"
        onClick={() => onChange('private')}
        className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
          activeSource === 'private'
            ? 'bg-white text-[#004ac6] shadow-sm'
            : 'text-[#434655] hover:text-[#191c1d]'
        }`}
      >
        私人題庫
      </button>
    </div>
  );
};

