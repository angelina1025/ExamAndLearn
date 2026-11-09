'use client';

import React from 'react';

interface TrendStatItem {
  subject: string;
  wrongCount: number;
}

interface TrendStatsChartProps {
  items: TrendStatItem[];
}

export const TrendStatsChart: React.FC<TrendStatsChartProps> = ({ items }) => {
  return (
    <div className="bg-white rounded-xl border border-[#c3c6d7]/40 p-5">
      <h3 className="text-sm font-bold text-[#191c1d] mb-3">各科錯題趨勢分佈</h3>
      {items.length === 0 ? (
        <p className="text-xs text-[#737686]">尚無錯題統計資料</p>
      ) : (
        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <div key={item.subject} className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#434655]">{item.subject}</span>
              <span className="font-mono text-[#ba1a1a] font-bold">
                {item.wrongCount} 題
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

