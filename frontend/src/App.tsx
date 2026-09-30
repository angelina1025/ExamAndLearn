import React, { useState, useEffect } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { Footer } from './components/Footer';
import { ExamView } from './components/ExamView';
import { AnalysisView } from './components/AnalysisView';
import { ImportView } from './components/ImportView';
import { BankView } from './components/BankView';
import { OfflineManagerModal } from './components/OfflineManagerModal';
import { mockQuestions } from './data/mockData';
import { ExamQuestion } from './types';
import {
  getOfflineQuestions,
  getWrongNotebookQuestions,
  saveOfflineExamResult,
  downloadQuestionsToOfflineStorage,
  getOfflineBankMeta,
} from './services/offlineStorage';
import { submitAndGradeExam } from './services/examEngine';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('analysis'); // Default to analysis as in Image 1
  const [questions, setQuestions] = useState<ExamQuestion[]>(mockQuestions);
  const [showOfflineModal, setShowOfflineModal] = useState<boolean>(false);
  const [examTitle, setExamTitle] = useState<string>('演算法期末測驗 A 卷');

  // Pre-seed offline cache in background on first launch
  useEffect(() => {
    const meta = getOfflineBankMeta();
    if (!meta.isAvailableOffline) {
      downloadQuestionsToOfflineStorage(mockQuestions);
    }
  }, []);

  // Retest the wrong questions
  const handleRetestWrong = (customWrongQuestions?: ExamQuestion[]) => {
    let wrongOnly = customWrongQuestions || questions.filter((q) => q.status === 'wrong');
    if (wrongOnly.length === 0) {
      wrongOnly = getWrongNotebookQuestions();
    }
    if (wrongOnly.length === 0) {
      wrongOnly = mockQuestions.filter((q) => q.status === 'wrong');
    }
    // Reset answers for retest
    const resetQuestions = wrongOnly.map((q) => ({
      ...q,
      userAnswer: undefined,
      status: 'unanswered' as const,
    }));
    setQuestions(resetQuestions);
    setExamTitle('錯題重考弱點突破卷');
    setCurrentTab('exam');
  };

  // Submit exam and view updated analysis
  const handleFinishExam = async (rawQuestions: ExamQuestion[]) => {
    const result = await submitAndGradeExam(rawQuestions, examTitle);
    setQuestions(result.gradedQuestions);

    // Save exam record locally for offline historical view
    saveOfflineExamResult(examTitle, result.gradedQuestions);

    setCurrentTab('analysis');
  };

  // Start exam from smart import cards
  const handleStartExamWithQuestions = (importedQuestions: ExamQuestion[]) => {
    setQuestions(importedQuestions);
    setExamTitle('智慧組題練習測驗卷');
    setCurrentTab('exam');
  };

  // Start exam from offline manager
  const handleStartOfflineExam = (customQs: ExamQuestion[], title: string = '離線自主模擬測驗') => {
    let targetQs = customQs;
    if (!targetQs || targetQs.length === 0) {
      targetQs = getOfflineQuestions();
    }
    const prepared = targetQs.map((q) => ({
      ...q,
      userAnswer: undefined,
      status: 'unanswered' as const,
    }));
    setQuestions(prepared);
    setExamTitle(title);
    setCurrentTab('exam');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f7fb] text-slate-800 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top Fixed / Sticky Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenOfflineManager={() => setShowOfflineModal(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 py-4">
        {currentTab === 'analysis' && (
          <AnalysisView
            questions={questions}
            onRetestWrong={() => handleRetestWrong()}
            onNavigateToExam={() => setCurrentTab('exam')}
          />
        )}

        {currentTab === 'exam' && (
          <ExamView
            questions={questions}
            onFinishExam={handleFinishExam}
          />
        )}

        {currentTab === 'import' && (
          <ImportView
            onStartExamWithQuestions={handleStartExamWithQuestions}
            onSaveToBank={() => setCurrentTab('bank')}
          />
        )}

        {currentTab === 'bank' && (
          <BankView
            onStartExam={() => handleStartOfflineExam([], '題庫抽題自測卷')}
            onNavigateToImport={() => setCurrentTab('import')}
            onOpenOfflineManager={() => setShowOfflineModal(true)}
          />
        )}
      </main>

      {/* Offline Question Bank & Retest Center Modal */}
      <OfflineManagerModal
        isOpen={showOfflineModal}
        onClose={() => setShowOfflineModal(false)}
        onStartOfflineExam={handleStartOfflineExam}
        onStartRetestWrong={(wrongQs) => handleRetestWrong(wrongQs)}
      />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
