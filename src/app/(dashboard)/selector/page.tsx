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

interface QuestionSelectorPageProps {
  questions?: Question[];
}

export default function QuestionSelectorPage({
  questions: propQuestions,
}: QuestionSelectorPageProps = {}) {
  const [source, setSource] = useState<QuestionSourceScope>('public');
  // 優先取線上題庫 (Google Sheet)；若離線或線上無資料，才去讀取 data 內題庫 INITIAL_QUESTIONS
  const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
  const questions =
    propQuestions && propQuestions.length > 0
      ? propQuestions
      : !isOnline || !propQuestions || propQuestions.length === 0
      ? INITIAL_QUESTIONS
      : [];
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleToggle = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedQuestions = questions.filter((q) => selectedIds.includes(q.id));

  const handleConfirmAssemble = () => {
    if (selectedQuestions.length === 0) return;
    const newId = `CUSTOM-${Date.now().toString().slice(-6)}`;
    const newPaper = {
      id: newId,
      title: `自選組卷測驗 (${selectedQuestions.length} 題)`,
      description: `考生自主挑選 ${selectedQuestions.length} 題之自選組卷`,
      subject: selectedQuestions[0]?.subjectId || '綜合',
      subjectId: selectedQuestions[0]?.subjectId || 'math',
      difficultyLv: 3,
      questionCount: selectedQuestions.length,
      totalScore: selectedQuestions.reduce((s, q) => s + q.points, 0),
      durationMinutes: Math.max(10, selectedQuestions.reduce((s, q) => s + (q.time ?? 1), 0)),
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      status: 'published' as const,
      questionIds: selectedIds,
    };

    if (typeof window !== 'undefined') {
      try {
        const existing = JSON.parse(localStorage.getItem('quiz_custom_exams') || '[]');
        existing.unshift(newPaper);
        localStorage.setItem('quiz_custom_exams', JSON.stringify(existing));
      } catch (err) {
        console.error('Failed to save custom exam:', err);
      }

      if (window.confirm(`🎉 試卷「${newPaper.title}」已生成成功！\n共 ${selectedQuestions.length} 題，總分 ${newPaper.totalScore} 分。\n\n是否立即前往開始測驗？`)) {
        window.location.href = `/exam/${newPaper.id}`;
      }
    }
  };

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
        onConfirmAssemble={handleConfirmAssemble}
      />

      <QuestionPickerList
        questions={questions}
        selectedIds={selectedIds}
        onToggleQuestion={handleToggle}
      />
    </div>
  );
}

