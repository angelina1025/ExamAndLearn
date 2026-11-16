'use client';

import React, { useState } from 'react';
import { Question, UserProfile } from '@/types';
import { INITIAL_QUESTIONS } from '@/data/initialData';
import {
  SourceTab,
  QuestionSourceScope,
} from '@/app/(dashboard)/selector/_components/SourceTab';
import { QuestionPickerList } from '@/app/(dashboard)/selector/_components/QuestionPickerList';
import { AssemblySummaryBar } from '@/app/(dashboard)/selector/_components/AssemblySummaryBar';
import { SheetBindGuardModal } from '@/components/common/SheetBindGuardModal';

interface QuestionSelectorPageProps {
  questions?: Question[];
  currentUser?: UserProfile | null;
  onNavigate?: (page: string) => void;
}

export default function QuestionSelectorPage({
  questions: propQuestions,
  currentUser,
  onNavigate,
}: QuestionSelectorPageProps = {}) {
  const user = currentUser ?? (() => {
    if (typeof window === 'undefined') return null;
    try {
      const raw = sessionStorage.getItem('exam_logged_in_user');
      return raw ? (JSON.parse(raw) as UserProfile) : null;
    } catch {
      return null;
    }
  })();

  const hasBoundSheet = Boolean(user?.google_sheet_URL && user.google_sheet_URL.trim() !== '');
  const [isGuardModalOpen, setIsGuardModalOpen] = useState(!hasBoundSheet);

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

  const handleGoToPublicExams = () => {
    setIsGuardModalOpen(false);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('exam_paper_tab', 'public');
    }
    if (onNavigate) {
      onNavigate('user-exam-select');
    } else if (typeof window !== 'undefined') {
      window.location.href = '/exams/select';
    }
  };

  const handleGoToSettings = () => {
    setIsGuardModalOpen(false);
    if (onNavigate) {
      onNavigate('user-settings');
    } else if (typeof window !== 'undefined') {
      window.location.href = '/profile';
    }
  };

  const handleSourceChange = (newSource: QuestionSourceScope) => {
    if (newSource === 'private') {
      if (!hasBoundSheet) {
        setIsGuardModalOpen(true);
        return;
      }
    }
    setSource(newSource);
  };

  const handleToggle = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedQuestions = questions.filter((q) => selectedIds.includes(q.id));

  const handleConfirmAssemble = () => {
    if (!hasBoundSheet) {
      setIsGuardModalOpen(true);
      return;
    }

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
      sourceScope: 'private' as const,
    };

    if (typeof window !== 'undefined') {
      try {
        const existing = JSON.parse(localStorage.getItem('quiz_custom_exams') || '[]');
        existing.unshift(newPaper);
        localStorage.setItem('quiz_custom_exams', JSON.stringify(existing));
      } catch (err) {
        console.error('Failed to save custom exam:', err);
      }

      if (window.confirm(`🎉 試卷「${newPaper.title}」已組卷成功！\n共 ${selectedQuestions.length} 題，總分 ${newPaper.totalScore} 分。\n個人題庫可離線使用與自由編輯。\n\n是否立即前往開始測驗？`)) {
        window.location.href = `/exam/${newPaper.id}`;
      }
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto flex flex-col gap-5">
      {/* 防護彈窗：自組考卷需存放於個人 Google Sheet */}
      <SheetBindGuardModal
        isOpen={isGuardModalOpen}
        onClose={() => setIsGuardModalOpen(false)}
        onGoToPublicExams={handleGoToPublicExams}
        onGoToSettings={handleGoToSettings}
      />

      {!hasBoundSheet && (
        <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-amber-600 text-[24px]">warning</span>
            <div>
              <p className="text-sm font-bold text-amber-900">未綁定個人 Google Sheet</p>
              <p className="text-xs text-amber-700 mt-0.5">
                自組考卷需存放於個人 Google Sheet。若未綁定，自選考卷將無處存放。
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleGoToPublicExams}
              className="px-3 py-1.5 rounded-lg text-xs font-bold border border-amber-300 text-amber-900 hover:bg-amber-100 transition-colors cursor-pointer"
            >
              直接選公用考卷
            </button>
            <button
              type="button"
              onClick={handleGoToSettings}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#004ac6] text-white hover:bg-[#003da6] transition-colors cursor-pointer shadow-xs"
            >
              前往綁定
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-[#191c1d]">題目選擇與組卷</h1>
          <p className="text-xs text-[#434655] mt-1">
            從公用或私人題庫挑選題目，快速組合成新考卷
          </p>
        </div>
        <SourceTab activeSource={source} onChange={handleSourceChange} />
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
