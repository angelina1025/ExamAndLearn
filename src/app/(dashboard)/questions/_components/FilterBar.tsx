'use client';

import React from 'react';
import { QuestionType, DifficultyLevel } from '@/types';

interface FilterBarProps {
  activeTab: QuestionType;
  onTabChange: (tab: QuestionType) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  difficultyFilter: 'all' | DifficultyLevel;
  onDifficultyChange: (diff: 'all' | DifficultyLevel) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  difficultyFilter,
  onDifficultyChange,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-[#c3c6d7]/30">
      <div className="flex items-center gap-1">
        {(
          [
            { key: 'all', label: '全部題型' },
            { key: 'single', label: '單選題' },
            { key: 'multiple', label: '多選題' },
            { key: 'true_false', label: '是非題' },
          ] as { key: QuestionType; label: string }[]
        ).map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => onTabChange(tab.key)}
            className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors cursor-pointer ${
              activeTab === tab.key
                ? 'bg-[#004ac6] text-white'
                : 'text-[#434655] hover:bg-[#f2f4f6]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="搜尋題號、題幹或知識點標籤..."
          className="px-3 py-1.5 text-[13px] border border-[#c3c6d7] rounded-lg focus:outline-none focus:border-[#004ac6]"
        />
        <select
          value={difficultyFilter}
          onChange={(e) => onDifficultyChange(e.target.value as 'all' | DifficultyLevel)}
          className="px-2.5 py-1.5 text-[13px] border border-[#c3c6d7] rounded-lg bg-white"
        >
          <option value="all">所有難度</option>
          <option value="easy">簡單 (Easy)</option>
          <option value="medium">中等 (Medium)</option>
          <option value="hard">困難 (Hard)</option>
        </select>
      </div>
    </div>
  );
};

