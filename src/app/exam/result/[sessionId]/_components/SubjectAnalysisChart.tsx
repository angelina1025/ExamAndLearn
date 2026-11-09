'use client';

import React from 'react';
import { SubjectAnalysisItem } from '@/types';

interface SubjectAnalysisChartProps {
  items?: SubjectAnalysisItem[];
}

export const SubjectAnalysisChart: React.FC<SubjectAnalysisChartProps> = ({ items = [] }) => {
  return (
    <div className="bg-white p-5 rounded-xl border border-[#c3c6d7]/30">
      <h3 className="text-[15px] font-bold text-[#191c1e] mb-3">各科答對率分析</h3>
      {items.length === 0 ? (
        <p className="text-[13px] text-[#737686]">尚無分析資料</p>
      ) : (
        <ul className="space-y-2 text-[13px]">
          {items.map((item) => (
            <li key={item.subjectId} className="flex justify-between">
              <span>{item.subjectName}</span>
              <span className="font-semibold">{item.accuracyRate}%</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

