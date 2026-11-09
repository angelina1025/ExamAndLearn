'use client';

import React, { useState } from 'react';
import { Question } from '@/types';
import { INITIAL_QUESTIONS } from '@/data/initialData';
import {
  SourceTab,
  QuestionSourceScope,
} from '@/app/(dashboard)/selector/_components/SourceTab';
import { QuestionPickerList } from '@/app/(dashboard)/selector/_components/QuestionPickerList';
import { AssemblySummaryBar } from '@/app/(dashboard)/selector/_components/AssemblySummaryBar';

export default function QuestionSelectorPage() {
  const [source, setSource] = useState<QuestionSourceScope>('public');
  const [questions] = useState<Question[]>(INITIAL_QUESTIONS);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleToggle = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedQuestions = questions.filter((q) => selectedIds.includes(q.id));

  return (
    <div className="p-6 max-w-6xl mx-auto flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-[#191c1d]">題目選擇與組卷</h1>
          <p className="text-xs text-[#434655] mt-1">
            從公用或私人題庫挑選題目，快速組合成新考卷
          </p>
        </div>
        <SourceTab activeSource={source} onChange={setSource} />
      </div>

      <AssemblySummaryBar
        selectedQuestions={selectedQuestions}
        onClear={() => setSelectedIds([])}
        onConfirmAssemble={() => {}}
      />

      <QuestionPickerList
        questions={questions}
        selectedIds={selectedIds}
        onToggleQuestion={handleToggle}
      />
    </div>
  );
}

