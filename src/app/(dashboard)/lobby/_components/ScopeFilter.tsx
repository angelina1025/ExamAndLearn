'use client';

import React from 'react';

export type LobbyScope = 'all' | 'public' | 'private';

interface ScopeFilterProps {
  scope: LobbyScope;
  onChange: (scope: LobbyScope) => void;
}

export const ScopeFilter: React.FC<ScopeFilterProps> = ({ scope, onChange }) => {
  return (
    <div className="inline-flex rounded-lg bg-[#f2f4f6] p-1 border border-[#c3c6d7]/30">
      {(
        [
          { key: 'all', label: '全部考卷' },
          { key: 'public', label: '公用考卷' },
          { key: 'private', label: '個人考卷' },
        ] as { key: LobbyScope; label: string }[]
      ).map((item) => (
        <button
          key={item.key}
          type="button"
          onClick={() => onChange(item.key)}
          className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
            scope === item.key
              ? 'bg-white text-[#004ac6] shadow-sm'
              : 'text-[#434655] hover:text-[#191c1d]'
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

