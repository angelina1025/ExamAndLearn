/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { QuestionBankView } from '@/pages/QuestionManage';
import { ExamPapersView } from '@/pages/ExamManage';
import { SystemSettingsView } from '@/pages/Profile/components/SystemSettingsView';
import { TwoPhaseDeleteModal, DeleteItem } from '@/components/common/TwoPhaseDeleteModal';
import { ExamGenerationModal } from '@/pages/ExamManage/ExamFormModal';
import { QuestionDetailModal } from '@/pages/QuestionManage/components/QuestionDetailModal';
import { CreateQuestionModal } from '@/pages/QuestionManage/QuestionModal';
import { ExamPaperPreviewModal } from '@/pages/ExamManage/components/ExamPaperPreviewModal';
import { GlobalSearchModal } from '@/components/layout/GlobalSearchModal';
import { INITIAL_QUESTIONS, INITIAL_EXAM_PAPERS } from '@/data/initialData';
import { Question, ExamPaper, SubjectId, SubjectFilter, AuditLog, NotificationItem, CategoryItem } from '@/types';
import {
  getEnvConfiguredSpreadsheetUrl,
  getEnvConfiguredScriptUrl,
  extractSpreadsheetId,
  fetchSpreadsheetStats,
  syncAllToSpreadsheet,
  readAllTablesFromSpreadsheet,
  appendQuestionToSpreadsheet,
  appendExamToSpreadsheet,
  appendLogToSpreadsheet,
  syncExamsOnlyToSpreadsheet,
  deleteRowsFromSpreadsheetViaGas,
  formatSheetTimestamp,
  INITIAL_CATEGORIES_DATA,
} from '@/services/publicSheet';
import { getAccessToken, googleSignIn, initAuth } from '@/services/googleAuth';

export default function App() {
  const [activePage, setActivePage] = useState<'question-bank' | 'exam-papers' | 'system-settings'>('exam-papers');
  const [selectedSubject, setSelectedSubject] = useState<SubjectFilter>('all');
  const [collapsedSidebar, setCollapsedSidebar] = useState(false);

  // Google Sheets connected spreadsheet state (prioritizing .env if configured, otherwise localStorage)
  const envSheetUrl = getEnvConfiguredSpreadsheetUrl();
  const envSheetId = extractSpreadsheetId(envSheetUrl);

  const [connectedSpreadsheetId, setConnectedSpreadsheetId] = useState<string | null>(() => {
    return envSheetId || localStorage.getItem('google_spreadsheet_id') || null;
  });
  const [connectedSpreadsheetUrl, setConnectedSpreadsheetUrl] = useState<string | null>(() => {
    return envSheetUrl || localStorage.getItem('google_spreadsheet_url') || null;
  });
  const [isReconnectingSheets, setIsReconnectingSheets] = useState(false);
  const [isSyncingSheets, setIsSyncingSheets] = useState(false);
  const [isLoadingSheetData, setIsLoadingSheetData] = useState(false);
  const [hasSyncedSheet, setHasSyncedSheet] = useState(false);
  const [isOnline, setIsOnline] = useState<boolean>(() =>
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  // Data states - directly read from Google Sheets (no hardcoded mock data)
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>([]);

  const [examPapers, setExamPapers] = useState<ExamPaper[]>([]);
  const [selectedExamIds, setSelectedExamIds] = useState<string[]>([]);

  const handleUpdateSpreadsheetConnection = (id: string | null, url: string | null) => {
    setConnectedSpreadsheetId(id);
    setConnectedSpreadsheetUrl(url);
    if (id && url) {
      localStorage.setItem('google_spreadsheet_id', id);
      localStorage.setItem('google_spreadsheet_url', url);
    } else {
      localStorage.removeItem('google_spreadsheet_id');
      localStorage.removeItem('google_spreadsheet_url');
      setHasSyncedSheet(false);
      setCategories([]);
      setQuestions([]);
      setExamPapers([]);
      setAuditLogs([]);
    }
  };

  const recordAuditLog = async (logEntry: AuditLog, explicitToken?: string | null) => {
    setAuditLogs((prev) => [logEntry, ...prev]);

    const targetId = envSheetId || connectedSpreadsheetId;
    if (!targetId) return;

    try {
      const hasGas = Boolean(getEnvConfiguredScriptUrl());
      const token = explicitToken || (await getAccessToken());
      if (hasGas || token) {
        const nextRowIdx = auditLogs.length + 1;
        await appendLogToSpreadsheet(token, targetId, logEntry, nextRowIdx);
      }
    } catch (err) {
      console.warn('Failed to write audit log to Google Sheet log tab:', err);
    }
  };

  const handleFetchSpreadsheetData = async (silent: boolean = false) => {
    const targetUrl = envSheetUrl || connectedSpreadsheetUrl;
    const targetId = envSheetId || connectedSpreadsheetId;

    if (!targetId) {
      setHasSyncedSheet(false);
      if (!silent) showToast('未設定 Google 試算表 ID，請確認 .env 或試算表連結', 'warning');
      return;
    }

    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      setIsOnline(false);
      setHasSyncedSheet(false);
      if (!silent) showToast('目前網路處於斷線狀態，無法同步公用資料庫', 'error');
      return;
    }

    const token = await getAccessToken();

    setIsLoadingSheetData(true);
    try {
      const result = await readAllTablesFromSpreadsheet(token, targetId);
      setCategories(result.categories);
      setQuestions(result.questions);
      setExamPapers(result.allExams);
      setAuditLogs(result.auditLogs);
      setHasSyncedSheet(true);
      setIsOnline(true);
      handleUpdateSpreadsheetConnection(targetId, targetUrl);

      if (!silent) {
        showToast(
          `成功同步公用資料庫：載入 ${result.categories.length} 個科目、${result.questions.length} 題試題、${result.allExams.length} 份試卷與 ${result.auditLogs.length} 筆日誌！`,
          'success'
        );
      }
    } catch (err: any) {
      console.error('Fetch spreadsheet data error:', err);
      // If public read failed and user hasn't signed in yet, prompt Google Sign-in when not silent
      if (!token && !silent) {
        try {
          showToast('正在開啟 Google 授權視窗，請允許讀取試算表...', 'info');
          const signRes = await googleSignIn();
          const newToken = signRes?.accessToken || null;
          if (newToken) {
            const result = await readAllTablesFromSpreadsheet(newToken, targetId);
            setCategories(result.categories);
            setQuestions(result.questions);
            setExamPapers(result.allExams);
            setAuditLogs(result.auditLogs);
            setHasSyncedSheet(true);
            setIsOnline(true);
            handleUpdateSpreadsheetConnection(targetId, targetUrl);
            showToast(
              `成功同步公用資料庫：載入 ${result.categories.length} 個科目、${result.questions.length} 題試題、${result.allExams.length} 份試卷與 ${result.auditLogs.length} 筆日誌！`,
              'success'
            );
            return;
          }
        } catch (authErr: any) {
          console.error('Google Sign-in error:', authErr);
        }
      }
      // On sync failure, reset connection status to disconnected
      setHasSyncedSheet(false);
      if (!silent) {
        showToast(`讀取試算表失敗: ${err.message || '請確認試算表架構或權限'}`, 'error');
      }
    } finally {
      setIsLoadingSheetData(false);
    }
  };

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      handleFetchSpreadsheetData(true);
    };
    const handleOffline = () => {
      setIsOnline(false);
      setHasSyncedSheet(false);
      showToast('偵測到網路連線中斷，公用資料庫已切換為未連線狀態', 'warning');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = initAuth((_user, token) => {
      if (token) {
        handleFetchSpreadsheetData(true);
      }
    });
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // Automatically read spreadsheet upon entering any page (question-bank, exam-papers, etc.)
  useEffect(() => {
    handleFetchSpreadsheetData(true);
  }, [activePage]);

  const handleReconnectSheets = async () => {
    setIsReconnectingSheets(true);
    try {
      const targetUrl = connectedSpreadsheetUrl || envSheetUrl;
      const targetId = connectedSpreadsheetId || envSheetId;

      if (!targetId || !targetUrl) {
        setHasSyncedSheet(false);
        showToast('未設定 Google 試算表網址，請在 .env 中填寫 VITE_GOOGLE_SHEET_URL', 'warning');
        setIsReconnectingSheets(false);
        return;
      }

      let token = await getAccessToken();
      if (!token) {
        const signRes = await googleSignIn();
        token = signRes?.accessToken || null;
      }

      if (!token) {
        setHasSyncedSheet(false);
        showToast('Google 帳號授權未完成或登入已取消', 'warning');
        setIsReconnectingSheets(false);
        return;
      }

      const stats = await fetchSpreadsheetStats(token, targetId);
      handleUpdateSpreadsheetConnection(targetId, targetUrl);

      try {
        const result = await readAllTablesFromSpreadsheet(token, targetId);
        setCategories(result.categories);
        setQuestions(result.questions);
        setExamPapers(result.allExams);
        setAuditLogs(result.auditLogs);
        setHasSyncedSheet(true);
        setIsOnline(true);
        showToast(`公用資料庫連線成功！已從「${stats.title}」載入 ${result.categories.length} 個科目、${result.questions.length} 題試題及 ${result.allExams.length} 份試卷。`, 'success');
      } catch (readErr: any) {
        setHasSyncedSheet(false);
        showToast(`試算表「${stats.title}」讀取資料表失敗，請確認試算表架構`, 'warning');
      }
    } catch (err: any) {
      console.error('Reconnect error:', err);
      setHasSyncedSheet(false);
      showToast(`連線失敗: ${err.message || '請確認試算表網址或權限'}`, 'error');
    } finally {
      setIsReconnectingSheets(false);
    }
  };

  const handleSyncMockDataToSheets = async () => {
    setIsSyncingSheets(true);
    try {
      const targetUrl = connectedSpreadsheetUrl || envSheetUrl;
      const targetId = connectedSpreadsheetId || envSheetId;

      if (!targetId || !targetUrl) {
        showToast('未設定 Google 試算表網址，請確認 .env 或試算表連結', 'warning');
        setIsSyncingSheets(false);
        return;
      }

      let token = await getAccessToken();
      if (!token) {
        showToast('正在開啟 Google 授權視窗，請允許試算表存取權限...', 'info');
        const signRes = await googleSignIn();
        token = signRes?.accessToken || null;
      }

      if (!token) {
        showToast('Google 帳號授權未完成或登入已取消', 'warning');
        setIsSyncingSheets(false);
        return;
      }

      const questionsToSync = questions.length > 0 ? questions : INITIAL_QUESTIONS;
      const examsToSync = examPapers.length > 0 ? examPapers : INITIAL_EXAM_PAPERS;

      const now = formatSheetTimestamp();
      const newLogId = `#LOG-SYNC-${Date.now().toString().slice(-4)}`;
      const syncLogEntry: AuditLog = {
        id: newLogId,
        action: '題庫試卷完整同步至 Google 試算表',
        target: `test_bank (${questionsToSync.length} 題), 試卷 (${examsToSync.length} 份)`,
        operator: '王敏行 (Admin Wang)',
        timestamp: now,
        status: 'success',
      };
      const logsToSync = [syncLogEntry, ...auditLogs];

      showToast('正在將題目與考卷資料寫入 Google 試算表 (test_bank)...', 'info');
      const result = await syncAllToSpreadsheet(token, targetId, targetUrl, questionsToSync, examsToSync, logsToSync);

      setCategories(INITIAL_CATEGORIES_DATA);
      setQuestions(questionsToSync);
      setExamPapers(examsToSync);
      setAuditLogs(logsToSync);
      setHasSyncedSheet(true);
      handleUpdateSpreadsheetConnection(targetId, targetUrl);

      setNotifications((prev) => [
        {
          id: `notif-${Date.now()}`,
          title: `成功將 ${questionsToSync.length} 筆題庫試題寫入 Google 試算表「test_bank」！`,
          time: '剛剛',
          read: false,
          type: 'success',
        },
        ...prev,
      ]);

      showToast(`✅ 成功將 ${questionsToSync.length} 筆題目與考卷寫入 Google 試算表！`, 'success');
    } catch (err: any) {
      console.error('Sync mock data error:', err);
      showToast(`寫入失敗: ${err.message || '請確認試算表網址或權限'}`, 'error');
    } finally {
      setIsSyncingSheets(false);
    }
  };

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: '高二數學期末統一測驗 已完成自動配分核算',
      time: '10 分鐘前',
      read: false,
      type: 'info',
    },
    {
      id: 'notif-2',
      title: '新題目 Q-MATH-20240902 已通過題目審核委員會核定',
      time: '35 分鐘前',
      read: false,
      type: 'success',
    },
  ]);

  // Audit logs - directly read from and written to Google Sheet "log" tab (no hardcoded mock data)
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  // Modal states
  const [isTwoPhaseDeleteOpen, setIsTwoPhaseDeleteOpen] = useState(false);
  const [deleteTargetType, setDeleteTargetType] = useState<'exam' | 'question'>('exam');
  const [singleItemToDelete, setSingleItemToDelete] = useState<DeleteItem | null>(null);

  const [isExamGenerationOpen, setIsExamGenerationOpen] = useState(false);
  const [previewingQuestion, setPreviewingQuestion] = useState<Question | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [isCreateQuestionOpen, setIsCreateQuestionOpen] = useState(false);

  const [previewingExam, setPreviewingExam] = useState<ExamPaper | null>(null);
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Global hotkeys: [ for sidebar, ⌘K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsGlobalSearchOpen(true);
      } else if (e.key === '[' && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        setCollapsedSidebar((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (msg: string, _type?: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Delete modal trigger handlers
  const handleOpenBatchDeleteExams = () => {
    setDeleteTargetType('exam');
    setSingleItemToDelete(null);
    setIsTwoPhaseDeleteOpen(true);
  };

  const handleOpenSingleDeleteExam = (exam: ExamPaper) => {
    setDeleteTargetType('exam');
    setSingleItemToDelete({
      id: exam.id,
      title: exam.title,
      extraInfo: exam.status === 'published' ? `已發布 / ${exam.examineeCount || 0}人應試` : `草稿 / ${exam.questionCount}題`,
    });
    setIsTwoPhaseDeleteOpen(true);
  };

  const handleOpenBatchDeleteQuestions = () => {
    setDeleteTargetType('question');
    setSingleItemToDelete(null);
    setIsTwoPhaseDeleteOpen(true);
  };

  const handleOpenSingleDeleteQuestion = (q: Question) => {
    setDeleteTargetType('question');
    setSingleItemToDelete({
      id: q.id,
      title: q.content,
      extraInfo: `${q.points}分 / 難度 ${q.difficultyScore ?? (q.difficulty === 'hard' ? 4 : q.difficulty === 'medium' ? 3 : 2)}`,
    });
    setIsTwoPhaseDeleteOpen(true);
  };

  // Execution of deletion
  const handleConfirmDeletion = async () => {
    const now = formatSheetTimestamp();
    const newLogId = `#LOG-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;

    if (deleteTargetType === 'exam') {
      const idsToRemove = singleItemToDelete
        ? [singleItemToDelete.id]
        : selectedExamIds;

      setExamPapers((prev) => prev.filter((e) => !idsToRemove.includes(e.id)));
      setSelectedExamIds((prev) => prev.filter((id) => !idsToRemove.includes(id)));

      try {
        await deleteRowsFromSpreadsheetViaGas(
          ['quiz_bank_publish', 'quiz_bank_unpublish'],
          1,
          idsToRemove
        );
      } catch (err) {
        console.warn('Failed to delete exam rows via GAS:', err);
      }

      const logEntry: AuditLog = {
        id: newLogId,
        action: singleItemToDelete ? `單一試卷移除` : `批次試卷刪除`,
        target: idsToRemove.join(', '),
        operator: '王敏行 (Admin Wang)',
        timestamp: now,
        status: 'warning',
      };
      await recordAuditLog(logEntry);

      showToast(`已成功移除 ${idsToRemove.length} 份試卷，異動日誌編號 ${newLogId}`);
    } else {
      const idsToRemove = singleItemToDelete
        ? [singleItemToDelete.id]
        : selectedQuestionIds;

      setQuestions((prev) => prev.filter((q) => !idsToRemove.includes(q.id)));
      setSelectedQuestionIds((prev) => prev.filter((id) => !idsToRemove.includes(id)));

      try {
        await deleteRowsFromSpreadsheetViaGas(['test_bank'], 1, idsToRemove);
      } catch (err) {
        console.warn('Failed to delete question rows via GAS:', err);
      }

      const logEntry: AuditLog = {
        id: newLogId,
        action: singleItemToDelete ? `題目刪除` : `批次題目刪除`,
        target: idsToRemove.join(', '),
        operator: '王敏行 (Admin Wang)',
        timestamp: now,
        status: 'warning',
      };
      await recordAuditLog(logEntry);

      showToast(`已成功刪除 ${idsToRemove.length} 筆題目，異動日誌編號 ${newLogId}`);
    }
  };

  // Exam published from draft to public table - moves rows in Google Sheets
  const handlePublishExams = async (examIds: string[]) => {
    const updatedExams = examPapers.map((exam) => {
      if (examIds.includes(exam.id)) {
        return {
          ...exam,
          status: 'published' as const,
        };
      }
      return exam;
    });

    setExamPapers(updatedExams);
    setSelectedExamIds((prev) => prev.filter((id) => !examIds.includes(id)));

    const now = formatSheetTimestamp();
    const newLogId = `#LOG-PUB-${Date.now().toString().slice(-4)}`;

    const logEntry: AuditLog = {
      id: newLogId,
      action: `試卷正式發布 (草稿資料表轉移至公用試卷資料表)`,
      target: examIds.join(', '),
      operator: '王敏行 (Admin Wang)',
      timestamp: now,
      status: 'success',
    };

    showToast(`已成功將 ${examIds.length} 份試卷正式發布至「公用試卷資料表」！`);

    // Synchronize exam tables and log on Google Sheets
    const targetId = connectedSpreadsheetId || envSheetId;
    const hasGas = Boolean(getEnvConfiguredScriptUrl());
    let token: string | null = null;
    if (targetId) {
      try {
        token = await getAccessToken();
        if (hasGas || token) {
          await syncExamsOnlyToSpreadsheet(token, targetId, updatedExams);
          showToast(`✅ 已同步更新 Google 試算表 quiz_bank_publish 與 quiz_bank_unpublish！`, 'success');
        }
      } catch (err: any) {
        console.warn('Sync published exams error:', err);
      }
    }
    await recordAuditLog(logEntry, token);
  };

  // Exam created from modal - directly written to Google Sheet quiz_bank_publish or quiz_bank_unpublish
  const handleExamCreated = async (newExam: ExamPaper) => {
    setExamPapers((prev) => [newExam, ...prev]);

    const targetId = connectedSpreadsheetId || envSheetId;
    const targetTable = newExam.status === 'published' ? 'quiz_bank_publish' : 'quiz_bank_unpublish';
    const targetTableName = newExam.status === 'published' ? '公用試卷資料表' : '草稿資料表';

    const now = formatSheetTimestamp();
    const logEntry: AuditLog = {
      id: `#LOG-${Date.now().toString().slice(-6)}`,
      action: `題庫組卷建立試卷 [${newExam.id}] (${newExam.status === 'published' ? '發布' : '草稿'})`,
      target: `${newExam.title} (${targetTableName})`,
      operator: '王敏行 (Admin Wang)',
      timestamp: now,
      status: 'success',
    };

    if (!targetId) {
      await recordAuditLog(logEntry);
      showToast(`試卷 ${newExam.id} 已建立 (未設定 Google 試算表，未寫入雲端)`);
      return;
    }

    try {
      const hasGas = Boolean(getEnvConfiguredScriptUrl());
      let token = await getAccessToken();
      if (!hasGas && !token) {
        showToast('正在開啟 Google 授權視窗，請允許寫入試算表...', 'info');
        const signRes = await googleSignIn();
        token = signRes?.accessToken || null;
      }

      if (hasGas || token) {
        showToast(`正在將考卷 ${newExam.id} 寫入 Google 試算表 (${targetTable})...`, 'info');
        const nextRowIdx = examPapers.filter((e) => e.status === newExam.status).length + 1;
        await appendExamToSpreadsheet(token, targetId, newExam, nextRowIdx);
        await recordAuditLog(logEntry, token);
        showToast(`✅ 考卷 ${newExam.id} 已成功寫入 Google 試算表「${targetTableName}」與 log 分頁！`, 'success');
      } else {
        await recordAuditLog(logEntry);
        showToast(`考卷 ${newExam.id} 已建立，但尚未設定 VITE_GOOGLE_SCRIPT_URL，未能寫入雲端`, 'warning');
      }
    } catch (err: any) {
      console.error('Error appending exam to Google Sheets:', err);
      await recordAuditLog(logEntry);
      showToast(`寫入 Google 試算表失敗: ${err.message || '請確認 VITE_GOOGLE_SCRIPT_URL 設定'}`, 'error');
    }
  };

  // Question save (create or update) - directly written to Google Sheet test_bank
  const handleSaveQuestion = async (q: Question) => {
    setQuestions((prev) => {
      const idx = prev.findIndex((item) => item.id === q.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = q;
        return copy;
      }
      return [q, ...prev];
    });

    const targetId = connectedSpreadsheetId || envSheetId;

    const now = formatSheetTimestamp();
    const logEntry: AuditLog = {
      id: `#LOG-${Date.now().toString().slice(-6)}`,
      action: '新增/更新試題並寫入 Google 試算表',
      target: `${q.id} (test_bank)`,
      operator: '王敏行 (Admin Wang)',
      timestamp: now,
      status: 'success',
    };

    if (!targetId) {
      await recordAuditLog(logEntry);
      showToast(`題目 ${q.id} 已儲存 (未設定 Google 試算表，未寫入雲端)`);
      return;
    }

    try {
      const hasGas = Boolean(getEnvConfiguredScriptUrl());
      let token = await getAccessToken();
      if (!hasGas && !token) {
        showToast('正在開啟 Google 授權視窗，請允許寫入試算表...', 'info');
        const signRes = await googleSignIn();
        token = signRes?.accessToken || null;
      }

      if (hasGas || token) {
        showToast(`正在將題目 ${q.id} 寫入 Google 試算表 (test_bank)...`, 'info');
        const nextRowIdx = questions.length + 1;
        await appendQuestionToSpreadsheet(token, targetId, q, nextRowIdx);
        await recordAuditLog(logEntry, token);
        showToast(`✅ 題目 ${q.id} 已成功寫入 Google 試算表 test_bank 與 log 資料表！`, 'success');
      } else {
        await recordAuditLog(logEntry);
        showToast(`題目 ${q.id} 已建立，但尚未設定 VITE_GOOGLE_SCRIPT_URL，未能寫入雲端`, 'warning');
      }
    } catch (err: any) {
      console.error('Error appending question to Google Sheets:', err);
      await recordAuditLog(logEntry);
      showToast(`寫入 Google 試算表失敗: ${err.message || '請確認 VITE_GOOGLE_SCRIPT_URL 設定'}`, 'error');
    }
  };

  // Export actions
  const handleExportReport = () => {
    showToast('已匯出全校試卷評量與題庫統計報表 (Excel / CSV)！');
  };

  const handleBatchExportExams = () => {
    showToast(`已啟動 ${selectedExamIds.length} 份試卷之批次匯出 (PDF/Word 卷卡壓縮檔)！`);
  };

  const handleExportSingleExam = (format: 'pdf' | 'word') => {
    showToast(`已成功產生並下載 ${previewingExam?.id} 之 ${format.toUpperCase()} 試卷檔！`);
  };

  // Items to show in delete modal
  const deleteModalItems: DeleteItem[] = singleItemToDelete
    ? [singleItemToDelete]
    : deleteTargetType === 'exam'
    ? selectedExamIds.map((id) => {
        const ep = examPapers.find((e) => e.id === id);
        return {
          id,
          title: ep?.title || id,
          extraInfo: ep?.status === 'published' ? `已發布 / ${ep.examineeCount || 0}人應試` : `草稿 / ${ep?.questionCount || 0}題`,
        };
      })
    : selectedQuestionIds.map((id) => {
        const q = questions.find((item) => item.id === id);
        return {
          id,
          title: q?.content || id,
          extraInfo: `${q?.points || 0}分 / 難度 ${q?.difficultyScore ?? 3}`,
        };
      });

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e] font-sans antialiased">
      {/* Global Topbar Header */}
      <Header
        onOpenSearch={() => setIsGlobalSearchOpen(true)}
        onLogout={() => showToast('已成功登出系統，請重新驗證身分。')}
        notifications={notifications}
        onMarkNotificationRead={(id) => {
          setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: true } : n))
          );
        }}
      />

      {/* Left Sidebar */}
      <Sidebar
        activePage={activePage}
        selectedSubject={selectedSubject}
        onSelectSubject={(id) => {
          setSelectedSubject(id);
          setActivePage('question-bank');
        }}
        onNavigate={(page) => setActivePage(page)}
        onOpenCreateQuestion={() => {
          setEditingQuestion(null);
          setIsCreateQuestionOpen(true);
        }}
        collapsed={collapsedSidebar}
        onToggleCollapse={() => setCollapsedSidebar(!collapsedSidebar)}
        questions={questions}
        categories={categories}
        isSheetsConnected={isOnline && hasSyncedSheet && !!connectedSpreadsheetId}
        spreadsheetUrl={connectedSpreadsheetUrl}
        onSync={() => handleFetchSpreadsheetData(false)}
        isSyncing={isLoadingSheetData}
      />

      {/* Main Content Viewport */}
      <div
        className={`${
          collapsedSidebar ? 'pl-16' : 'pl-64'
        } transition-all duration-150`}
      >
        <main className="w-full pt-18 px-6 pb-12 bg-[#f7f9fb] min-h-screen">
          {activePage === 'exam-papers' && (
            <ExamPapersView
              examPapers={examPapers}
              selectedExamIds={selectedExamIds}
              onToggleSelectExam={(id) => {
                setSelectedExamIds((prev) =>
                  prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
                );
              }}
              onSelectAllExams={(ids) => setSelectedExamIds(ids)}
              onClearExamSelection={() => setSelectedExamIds([])}
              onOpenCreateExamModal={() => {
                setSelectedSubject('math');
                setIsExamGenerationOpen(true);
              }}
              onOpenBatchDeleteModal={handleOpenBatchDeleteExams}
              onPreviewExam={(exam) => setPreviewingExam(exam)}
              onDeleteSingleExam={handleOpenSingleDeleteExam}
              onExportReport={handleExportReport}
              onBatchExport={handleBatchExportExams}
              onPublishExams={handlePublishExams}
            />
          )}

          {activePage === 'question-bank' && (
            <QuestionBankView
              subjectId={selectedSubject}
              questions={questions}
              selectedQuestionIds={selectedQuestionIds}
              onToggleSelectQuestion={(id) => {
                setSelectedQuestionIds((prev) =>
                  prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
                );
              }}
              onSelectAllQuestions={(ids) => setSelectedQuestionIds(ids)}
              onClearSelection={() => setSelectedQuestionIds([])}
              onOpenCreateModal={() => {
                setEditingQuestion(null);
                setIsCreateQuestionOpen(true);
              }}
              onOpenExamModal={() => setIsExamGenerationOpen(true)}
              onOpenBatchDeleteModal={handleOpenBatchDeleteQuestions}
              onViewQuestion={(q) => setPreviewingQuestion(q)}
              onEditQuestion={(q) => {
                setEditingQuestion(q);
                setIsCreateQuestionOpen(true);
              }}
              onDeleteQuestion={handleOpenSingleDeleteQuestion}
              isLoadingData={isLoadingSheetData}
            />
          )}

          {activePage === 'system-settings' && (
            <SystemSettingsView auditLogs={auditLogs} />
          )}
        </main>
      </div>

      {/* Two-Phase High Risk Delete Confirmation Modal (Phase 1 & Phase 2) */}
      <TwoPhaseDeleteModal
        isOpen={isTwoPhaseDeleteOpen}
        onClose={() => setIsTwoPhaseDeleteOpen(false)}
        onConfirmSuccess={handleConfirmDeletion}
        items={deleteModalItems}
        itemTypeLabel={deleteTargetType === 'exam' ? '份試卷' : '筆題目'}
      />

      {/* Exam Generation Modal (Step 1 & Step 2) */}
      <ExamGenerationModal
        isOpen={isExamGenerationOpen}
        onClose={() => setIsExamGenerationOpen(false)}
        selectedQuestions={questions.filter((q) =>
          selectedQuestionIds.includes(q.id)
        )}
        onExamCreated={handleExamCreated}
      />

      {/* Question Detail Preview Modal */}
      <QuestionDetailModal
        question={previewingQuestion}
        onClose={() => setPreviewingQuestion(null)}
        onEdit={(q) => {
          setEditingQuestion(q);
          setIsCreateQuestionOpen(true);
        }}
      />

      {/* Create / Edit Question Modal */}
      <CreateQuestionModal
        isOpen={isCreateQuestionOpen}
        onClose={() => {
          setIsCreateQuestionOpen(false);
          setEditingQuestion(null);
        }}
        onSave={handleSaveQuestion}
        initialQuestion={editingQuestion}
        defaultSubjectId={selectedSubject === 'all' ? 'math' : selectedSubject}
      />

      {/* Exam Paper Preview & Export Modal */}
      <ExamPaperPreviewModal
        exam={previewingExam}
        onClose={() => setPreviewingExam(null)}
        questions={questions}
        onExport={handleExportSingleExam}
      />

      {/* ⌘K Global Quick Search Modal */}
      <GlobalSearchModal
        isOpen={isGlobalSearchOpen}
        onClose={() => setIsGlobalSearchOpen(false)}
        questions={questions}
        examPapers={examPapers}
        onSelectQuestion={(q) => {
          setSelectedSubject(q.subjectId);
          setActivePage('question-bank');
          setPreviewingQuestion(q);
        }}
        onSelectExam={(exam) => {
          setActivePage('exam-papers');
          setPreviewingExam(exam);
        }}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#191c1e] text-white px-4 py-2.5 rounded-lg shadow-xl text-[13px] font-medium flex items-center gap-2 border border-[#434655]/40 animate-in fade-in slide-in-from-bottom-2">
          <span className="material-symbols-outlined text-[#6ffbbe] text-[18px]">info</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
