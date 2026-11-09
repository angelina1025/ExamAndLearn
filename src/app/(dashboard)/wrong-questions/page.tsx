'use client';

import React from 'react';
import { ImportUploader } from '@/app/(dashboard)/wrong-questions/_components/ImportUploader';
import { TrendStatsChart } from '@/app/(dashboard)/wrong-questions/_components/TrendStatsChart';
import { RetestActionCard } from '@/app/(dashboard)/wrong-questions/_components/RetestActionCard';

export default function WrongQuestionsPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto flex flex-col gap-5">
      <div>
        <h1 className="text-xl font-extrabold text-[#191c1d]">錯題本與弱點分析</h1>
        <p className="text-xs text-[#434655] mt-1">
          追蹤歷次測驗答錯題目，針對弱項進行二次重測
        </p>
      </div>
      <RetestActionCard wrongQuestionCount={0} />
      <TrendStatsChart items={[]} />
      <ImportUploader />
    </div>
  );
}

