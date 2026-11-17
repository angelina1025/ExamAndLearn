'use client';

import React, { useState, useMemo } from 'react';
import { Question, UserProfile } from '@/types';
import { INITIAL_QUESTIONS } from '@/data/initialData';
import {
  SourceTab,
  QuestionSourceScope,
} from '@/app/(dashboard)/selector/_components/SourceTab';
import { QuestionPickerList } from '@/app/(dashboard)/selector/_components/QuestionPickerList';
import { AssemblySummaryBar } from '@/app/(dashboard)/selector/_components/AssemblySummaryBar';
import { SheetBindGuardModal } from '@/components/common/SheetBindGuardModal';
import { ensurePersonalSpreadsheetTablesExist } from '@/services/userSheet';
import { getAccessToken, googleSignIn } from '@/services/googleAuth';

interface QuestionSelectorPageProps {
  questions?: Question[];
  personalQuestions?: Question[];
  currentUser?: UserProfile | null;
  onNavigate?: (page: string) => void;
}

export default function QuestionSelectorPage({
  questions: propQuestions,
  personalQuestions: propPersonalQuestions,
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
  const [isInitializingSheet, setIsInitializingSheet] = useState(false);
  const [initSheetMessage, setInitSheetMessage] = useState('');

  const handleInitPersonalSheet = async () => {
    if (!user?.google_sheet_URL) return;
    setIsInitializingSheet(true);
    setInitSheetMessage('');
    try {
      let token = await getAccessToken();
      if (!token) {
        const signRes = await googleSignIn();
        token = signRes?.accessToken || null;
      }
      if (!token) {
        throw new Error('需先完成 Google 登入授權，才能在您的試算表建立分頁。');
      }
      const res = await ensurePersonalSpreadsheetTablesExist(token, user.google_sheet_URL);
      const msg = res.createdSheets.length > 0
        ? `🎉 成功為試算表建立標準分頁：${res.createdSheets.join(', ')}，並填入公用格式標題！`
        : `✅ 試算表格式已符合規範（test_bank, quiz_bank_publish, quiz_bank_unpublish, log）！`;
      setInitSheetMessage(msg);
    } catch (err: any) {
      setInitSheetMessage(`建立失敗: ${err.message || '未知錯誤'}`);
    } finally {
      setIsInitializingSheet(false);
    }
  };

  const [source, setSource] = useState<QuestionSourceScope>('public');
  // 優先取線上題庫 (Google Sheet)；若離線或線上無資料，才去讀取 data 內題庫 INITIAL_QUESTIONS
  const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
  const publicQuestions =
    propQuestions && propQuestions.length > 0
      ? propQuestions
      : !isOnline || !propQuestions || propQuestions.length === 0
        ? INITIAL_QUESTIONS
        : [];

  const personalQuestions = useMemo(() => {
    if (propPersonalQuestions !== undefined) {
      return propPersonalQuestions;
    }
    if (!hasBoundSheet && typeof window !== 'undefined') {
      try {
        return JSON.parse(localStorage.getItem('quiz_custom_questions') || '[]');
      } catch {
        return [];
      }
    }
    return [];
  }, [propPersonalQuestions, hasBoundSheet]);

  const currentQuestions = source === 'public' ? publicQuestions : personalQuestions;
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

  const selectedQuestions = currentQuestions.filter((q) => selectedIds.includes(q.id));

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

      {source === 'private' && currentQuestions.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-[#c3c6d7] p-10 text-center flex flex-col items-center justify-center gap-3">
          <span className="material-symbols-outlined text-[48px] text-[#737686]">folder_open</span>
          <h3 className="text-base font-bold text-[#191c1d]">私人題庫目前尚無題目 (0 題)</h3>
          <p className="text-xs text-[#737686] max-w-md">
            您的個人試算表（test_bank）目前為空或尚未建立分頁。若您的試算表為全新空白表，可點擊下方按鈕進行授權並一鍵建立標準分頁。
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
            <button
              type="button"
              onClick={handleInitPersonalSheet}
              disabled={isInitializingSheet}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#004ac6] text-white hover:bg-[#003da6] transition-colors cursor-pointer shadow-xs disabled:opacity-50"
            >
              {isInitializingSheet ? '正在建立標準分頁與標題…' : '🛠️ 一鍵在我的 Google Sheet 建立標準分頁'}
            </button>
            <button
              type="button"
              onClick={() => setSource('public')}
              className="px-4 py-2 rounded-xl text-xs font-bold border border-[#004ac6] text-[#004ac6] hover:bg-[#eef3ff] transition-colors cursor-pointer"
            >
              切換至公用題庫選題
            </button>
            <button
              type="button"
              onClick={() => onNavigate ? onNavigate('upload') : (typeof window !== 'undefined' ? window.location.href = '/upload' : undefined)}
              className="px-4 py-2 rounded-xl text-xs font-bold border border-[#c3c6d7] text-[#191c1d] hover:bg-[#f2f4f7] transition-colors cursor-pointer"
            >
              前往上傳題目
            </button>
          </div>
          {initSheetMessage && (
            <p className={`text-xs mt-2 font-medium ${initSheetMessage.includes('成功') || initSheetMessage.includes('✅') ? 'text-green-600' : 'text-red-500'}`}>
              {initSheetMessage}
            </p>
          )}
        </div>
      ) : (
        <QuestionPickerList
          questions={currentQuestions}
          selectedIds={selectedIds}
          onToggleQuestion={handleToggle}
        />
      )}
    </div>
  );
}
