'use client';

import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import {
  googleSignIn,
  logoutGoogle,
  getAccessToken,
  initAuth,
} from '@/services/googleAuth';
import {
  DATABASE_TABLE_SCHEMAS,
  createFullDatabaseSpreadsheet,
  syncAllToSpreadsheet,
  readAllTablesFromSpreadsheet,
  extractSpreadsheetId,
  fetchSpreadsheetStats,
  getEnvConfiguredSpreadsheetUrl,
  SheetTableSchema,
} from '@/services/publicSheet';
import { Question, ExamPaper } from '@/types';

interface GoogleSheetsViewProps {
  questions: Question[];
  examPapers: ExamPaper[];
  connectedSpreadsheetUrl: string | null;
  connectedSpreadsheetId: string | null;
  onUpdateSpreadsheetConnection: (id: string | null, url: string | null) => void;
  onShowToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  onImportData?: (questions: Question[], examPapers: ExamPaper[]) => void;
}

export const GoogleSheetsView: React.FC<GoogleSheetsViewProps> = ({
  questions,
  examPapers,
  connectedSpreadsheetUrl,
  connectedSpreadsheetId,
  onUpdateSpreadsheetConnection,
  onShowToast,
  onImportData,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [activeTableKey, setActiveTableKey] = useState<string>('test_bank');
  const [isCreatingSheet, setIsCreatingSheet] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [isTestingApi, setIsTestingApi] = useState(false);
  const [apiStats, setApiStats] = useState<{ title: string; sheets: { name: string; rowCount: number; columnCount: number }[] } | null>(null);
  const [manualInput, setManualInput] = useState('');
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);

  const envConfigUrl = getEnvConfiguredSpreadsheetUrl();
  const envConfigId = extractSpreadsheetId(envConfigUrl);
  const isUsingEnv = Boolean(
    connectedSpreadsheetId && envConfigId && connectedSpreadsheetId === envConfigId
  );

  // Confirmation dialogs (MANDATORY per Workspace guidelines)
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    actionType: 'create' | 'sync' | 'disconnect' | 'read';
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    description: '',
    actionType: 'create',
    onConfirm: () => {},
  });

  // Listen for auth state
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setCurrentUser(user);
      },
      () => {
        setCurrentUser(null);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    setIsAuthenticating(true);
    try {
      const res = await googleSignIn();
      if (res?.user) {
        setCurrentUser(res.user);
        onShowToast(`已成功以 Google 帳號 ${res.user.email} 登入！`, 'success');
      }
    } catch (err: any) {
      console.error('Sign in failed:', err);
      onShowToast(`登入失敗: ${err.message || '請確認彈出視窗未被封鎖'}`, 'error');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logoutGoogle();
      setCurrentUser(null);
      onShowToast('已登出 Google 帳號', 'info');
    } catch (err: any) {
      onShowToast(`登出失敗: ${err.message}`, 'error');
    }
  };

  // Trigger create spreadsheet flow with confirmation modal
  const promptCreateSpreadsheet = () => {
    setConfirmModal({
      isOpen: true,
      title: '確認在您的 Google 雲端硬碟建立資料庫？',
      description:
        '系統將於您的 Google Drive 建立一份名為「線上測驗系統資料庫 (Quiz & Test Bank DB)」的試算表，並自動設定 6 張工作表 (users、roles、test_bank、categories、quiz_bank_publish、quiz_bank_unpublish) 與完整欄位，並匯入現有資料。此操作需要您的確認。',
      actionType: 'create',
      onConfirm: async () => {
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
        await executeCreateSpreadsheet();
      },
    });
  };

  const executeCreateSpreadsheet = async () => {
    let token = await getAccessToken();
    if (!token) {
      try {
        const signResult = await googleSignIn();
        token = signResult?.accessToken || null;
      } catch (e: any) {
        onShowToast('建立失敗: 需先完成 Google 授權', 'error');
        return;
      }
    }

    if (!token) {
      onShowToast('無法取得 Google 授權憑證，請重新登入', 'error');
      return;
    }

    setIsCreatingSheet(true);
    try {
      const result = await createFullDatabaseSpreadsheet(
        token,
        '線上測驗系統資料庫 (Quiz & Test Bank DB)',
        questions,
        examPapers
      );
      onUpdateSpreadsheetConnection(result.spreadsheetId, result.spreadsheetUrl);
      const now = new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setLastSyncTime(now);
      onShowToast('成功建立 Google 試算表資料庫與 6 張資料表！', 'success');
    } catch (err: any) {
      console.error('Create spreadsheet error:', err);
      onShowToast(`建立試算表失敗: ${err.message}`, 'error');
    } finally {
      setIsCreatingSheet(false);
    }
  };

  // Trigger sync flow with confirmation modal
  const promptSync = () => {
    if (!connectedSpreadsheetId || !connectedSpreadsheetUrl) {
      onShowToast('尚未連結 Google 試算表', 'error');
      return;
    }

    setConfirmModal({
      isOpen: true,
      title: '確認同步系統資料至 Google 試算表？',
      description: `即將更新 Google 試算表中的資料：包含 ${questions.length} 題題庫試題、${
        examPapers.filter((e) => e.status === 'published').length
      } 份公用試卷與 ${
        examPapers.filter((e) => e.status === 'draft').length
      } 份草稿試卷。試算表對應工作表內容將會被更新。`,
      actionType: 'sync',
      onConfirm: async () => {
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
        await executeSync();
      },
    });
  };

  const executeSync = async () => {
    if (!connectedSpreadsheetId || !connectedSpreadsheetUrl) return;

    let token = await getAccessToken();
    if (!token) {
      try {
        const signResult = await googleSignIn();
        token = signResult?.accessToken || null;
      } catch (e) {
        onShowToast('同步失敗: 需先完成 Google 授權', 'error');
        return;
      }
    }

    if (!token) return;

    setIsSyncing(true);
    try {
      const res = await syncAllToSpreadsheet(
        token,
        connectedSpreadsheetId,
        connectedSpreadsheetUrl,
        questions,
        examPapers
      );
      const now = new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setLastSyncTime(now);
      onShowToast(res.message, 'success');
    } catch (err: any) {
      console.error('Sync error:', err);
      onShowToast(`同步失敗: ${err.message}`, 'error');
    } finally {
      setIsSyncing(false);
    }
  };

  // Trigger read flow with confirmation modal
  const promptReadSpreadsheet = () => {
    if (!connectedSpreadsheetId) {
      onShowToast('尚未連結 Google 試算表', 'error');
      return;
    }

    setConfirmModal({
      isOpen: true,
      title: '確認從 Google 試算表讀取資料？',
      description:
        '系統即將呼叫 Google Sheets API 讀取 test_bank、quiz_bank_publish 與 quiz_bank_unpublish 最新資料，並將題庫與試卷清單同步更新至系統介面。此操作需要您的確認。',
      actionType: 'read',
      onConfirm: async () => {
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
        await executeReadSpreadsheet();
      },
    });
  };

  const executeReadSpreadsheet = async () => {
    if (!connectedSpreadsheetId) return;

    let token = await getAccessToken();
    if (!token) {
      try {
        const signResult = await googleSignIn();
        token = signResult?.accessToken || null;
      } catch (e) {
        onShowToast('讀取失敗: 需先完成 Google 授權', 'error');
        return;
      }
    }

    if (!token) return;

    setIsReading(true);
    try {
      const result = await readAllTablesFromSpreadsheet(token, connectedSpreadsheetId);
      if (onImportData) {
        onImportData(result.questions, result.allExams);
      }
      const now = new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setLastSyncTime(now);
      onShowToast(result.message, 'success');
    } catch (err: any) {
      console.error('Read spreadsheet error:', err);
      onShowToast(`讀取失敗: ${err.message}`, 'error');
    } finally {
      setIsReading(false);
    }
  };

  const handleApplyEnvUrl = () => {
    if (!envConfigId || !envConfigUrl) {
      onShowToast('環境變數 .env 中尚未填入有效之 VITE_GOOGLE_SHEET_URL', 'error');
      return;
    }
    onUpdateSpreadsheetConnection(envConfigId, envConfigUrl);
    onShowToast('已成功載入並套用 .env 環境變數設定的 Google 試算表！', 'success');
  };

  const handleTestApiConnection = async () => {
    if (!connectedSpreadsheetId) {
      onShowToast('尚未連結 Google 試算表', 'error');
      return;
    }

    let token = await getAccessToken();
    if (!token) {
      try {
        const signResult = await googleSignIn();
        token = signResult?.accessToken || null;
      } catch (e) {
        onShowToast('測試失敗: 需先完成 Google 授權', 'error');
        return;
      }
    }

    if (!token) return;

    setIsTestingApi(true);
    try {
      const stats = await fetchSpreadsheetStats(token, connectedSpreadsheetId);
      setApiStats(stats);
      onShowToast(`API 測試連線成功！試算表「${stats.title}」共 ${stats.sheets.length} 張工作表可正常讀寫`, 'success');
    } catch (err: any) {
      console.error('Test API error:', err);
      onShowToast(`API 測試失敗: ${err.message}`, 'error');
    } finally {
      setIsTestingApi(false);
    }
  };

  const handleManualLink = async () => {
    const id = extractSpreadsheetId(manualInput);
    if (!id) {
      onShowToast('無效的 Google 試算表網址或 ID，請檢查後重新輸入', 'error');
      return;
    }

    const url = `https://docs.google.com/spreadsheets/d/${id}/edit`;
    onUpdateSpreadsheetConnection(id, url);
    setManualInput('');
    onShowToast('已成功連結 Google 試算表！建議點擊「立即寫入同步」將資料表架構寫入。', 'success');
  };

  const handleDisconnect = () => {
    setConfirmModal({
      isOpen: true,
      title: '確認解除 Google 試算表連結？',
      description: '解除連結後，系統將暫停自動寫入該試算表，但您的 Google 雲端硬碟檔案不會被刪除。',
      actionType: 'disconnect',
      onConfirm: () => {
        onUpdateSpreadsheetConnection(null, null);
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
        onShowToast('已解除 Google 試算表連結', 'info');
      },
    });
  };

  const currentSchema = DATABASE_TABLE_SCHEMAS[activeTableKey] || DATABASE_TABLE_SCHEMAS.test_bank;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Page Title & Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#c3c6d7]/30">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0f9d58] flex items-center justify-center text-white shadow-sm">
              <span className="material-symbols-outlined text-[24px]">table_chart</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#191c1e] tracking-tight flex items-center gap-2">
                Google Sheets 資料庫串接
                <span className="text-[12px] px-2 py-0.5 rounded-full bg-[#e8f5e9] text-[#0f9d58] border border-[#a5d6a7] font-medium">
                  Workspace API
                </span>
              </h1>
              <p className="text-sm text-[#434655] mt-0.5">
                透過 Google 試算表將題目、考卷、使用者與分類資料結構化儲存，支援雙向資料讀寫與即時同步
              </p>
            </div>
          </div>
        </div>

        {/* Auth / Account pill */}
        <div className="flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-xl border border-[#c3c6d7]/50 shadow-xs">
              {currentUser.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.displayName || 'Google User'}
                  className="w-7 h-7 rounded-full"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-[#004ac6] text-white flex items-center justify-center text-xs font-bold">
                  {currentUser.displayName?.charAt(0) || 'G'}
                </div>
              )}
              <div className="text-left">
                <div className="text-xs font-semibold text-[#191c1e] leading-tight">
                  {currentUser.displayName || 'Google 使用者'}
                </div>
                <div className="text-[11px] text-[#434655] truncate max-w-[160px]">
                  {currentUser.email}
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="text-xs text-[#ba1a1a] hover:bg-[#ffdad6]/40 px-2 py-1 rounded transition-colors cursor-pointer"
                title="登出 Google 帳號"
              >
                登出
              </button>
            </div>
          ) : (
            <button
              onClick={handleSignIn}
              disabled={isAuthenticating}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-[#f8f9fa] border border-[#dadce0] rounded-lg text-sm font-medium text-[#3c4043] shadow-xs hover:shadow transition-all cursor-pointer disabled:opacity-50"
              type="button"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{isAuthenticating ? '連線授權中...' : '使用 Google 帳號登入'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Spreadsheet Connection Card */}
      <div className="bg-white rounded-2xl border border-[#c3c6d7]/40 shadow-xs p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-[#191c1e] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#004ac6] text-[22px]">link</span>
              試算表資料庫連線狀態
            </h2>
            <p className="text-xs text-[#434655] mt-0.5">
              可一鍵自動生成符合您指定架構的 6 張工作表，或指定現有 Google 試算表網址
            </p>
          </div>

          {connectedSpreadsheetId ? (
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={connectedSpreadsheetUrl || `https://docs.google.com/spreadsheets/d/${connectedSpreadsheetId}/edit`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#e8f5e9] hover:bg-[#c8e6c9] text-[#2e7d32] text-xs font-semibold rounded-lg transition-colors border border-[#a5d6a7]"
              >
                <span>在 Google 試算表開啟</span>
                <span className="material-symbols-outlined text-[15px]">open_in_new</span>
              </a>

              {/* Read / Pull Button */}
              <button
                onClick={promptReadSpreadsheet}
                disabled={isReading || isSyncing}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[#f1f3f4] text-[#004ac6] border border-[#004ac6]/50 text-xs font-semibold rounded-lg transition-colors shadow-2xs disabled:opacity-50 cursor-pointer"
                type="button"
                title="從試算表讀取題庫與試卷最新資料並匯入系統"
              >
                <span className={`material-symbols-outlined text-[16px] ${isReading ? 'animate-spin' : ''}`}>
                  {isReading ? 'refresh' : 'download'}
                </span>
                <span>{isReading ? '讀取中...' : '從試算表讀取匯入'}</span>
              </button>

              {/* Write / Sync Button */}
              <button
                onClick={promptSync}
                disabled={isSyncing || isReading}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#004ac6] hover:bg-[#003da6] text-white text-xs font-semibold rounded-lg transition-colors shadow-xs disabled:opacity-50 cursor-pointer"
                type="button"
                title="將當前題庫、已發布試卷與草稿試卷批次寫入試算表"
              >
                <span className={`material-symbols-outlined text-[16px] ${isSyncing ? 'animate-spin' : ''}`}>
                  {isSyncing ? 'refresh' : 'cloud_upload'}
                </span>
                <span>{isSyncing ? '寫入中...' : '寫入同步至試算表'}</span>
              </button>

              {/* Test API Connection Button */}
              <button
                onClick={handleTestApiConnection}
                disabled={isTestingApi}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-[#f2f4f6] hover:bg-[#e6e8ea] text-[#434655] text-xs font-medium rounded-lg transition-colors border border-[#c3c6d7]/40 cursor-pointer"
                type="button"
                title="測試 Google Sheets API 連線狀態與工作表列數"
              >
                <span className={`material-symbols-outlined text-[15px] ${isTestingApi ? 'animate-spin' : ''}`}>
                  network_check
                </span>
                <span>{isTestingApi ? '測試中' : 'API 測試'}</span>
              </button>

              <button
                onClick={handleDisconnect}
                className="p-1.5 text-[#434655] hover:text-[#ba1a1a] hover:bg-[#ffdad6]/30 rounded-lg transition-colors cursor-pointer"
                title="解除連結"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">link_off</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-2">
              {envConfigId && (
                <button
                  onClick={handleApplyEnvUrl}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#e8f5e9] hover:bg-[#c8e6c9] text-[#2e7d32] border border-[#a5d6a7] text-xs font-semibold rounded-xl transition-all shadow-xs cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[17px]">settings_ethernet</span>
                  <span>套用 .env 預設試算表</span>
                </button>
              )}
              <button
                onClick={promptCreateSpreadsheet}
                disabled={isCreatingSheet}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#004ac6] hover:bg-[#003da6] text-white text-xs font-semibold rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer disabled:opacity-50"
                type="button"
              >
                <span className={`material-symbols-outlined text-[18px] ${isCreatingSheet ? 'animate-spin' : ''}`}>
                  add_chart
                </span>
                <span>{isCreatingSheet ? '正在建立試算表及資料表中...' : '一鍵建立 Google Sheets 資料庫及 6 張資料表'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Environment Variable Banner / Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-[#f8f9fa] rounded-xl border border-[#e0e3e7] text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-[#191c1e] flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-[#004ac6]">tune</span>
              環境變數 (VITE_GOOGLE_SHEET_URL):
            </span>
            {envConfigUrl ? (
              <span className="px-2 py-0.5 rounded-md bg-[#e8f5e9] text-[#1b5e20] font-mono text-[11px] truncate max-w-[280px] border border-[#a5d6a7]">
                {envConfigUrl}
              </span>
            ) : (
              <span className="text-[#737686] italic">未在 .env 中設定</span>
            )}

            {isUsingEnv ? (
              <span className="px-2 py-0.5 rounded-full bg-[#e3f2fd] text-[#0277bd] text-[10px] font-bold border border-[#81d4fa]">
                已綁定此 .env 網址
              </span>
            ) : envConfigUrl ? (
              <button
                onClick={handleApplyEnvUrl}
                className="px-2 py-0.5 bg-white hover:bg-[#e8f0fe] text-[#004ac6] text-[11px] rounded border border-[#004ac6]/30 font-medium cursor-pointer transition-colors"
                type="button"
              >
                切換為 .env 網址
              </button>
            ) : null}
          </div>

          <div className="text-[11px] text-[#5f6368] flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">info</span>
            在根目錄 <code className="bg-white px-1 py-0.5 rounded border border-[#dadce0] font-mono">.env</code> 填入網址後重啟將作為預設資料庫
          </div>
        </div>

        {connectedSpreadsheetId ? (
          <div className="bg-[#f8f9fa] rounded-xl p-4 border border-[#e0e3e7] grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-[#434655] block mb-1">試算表識別碼 (Spreadsheet ID)</span>
              <span className="font-mono font-medium text-[#191c1e] break-all select-all">
                {connectedSpreadsheetId}
              </span>
            </div>
            <div>
              <span className="text-[#434655] block mb-1">資料庫工作表 (Tables)</span>
              <span className="font-semibold text-[#004ac6]">
                6 張資料表 (users, roles, test_bank, categories, quiz_bank_publish, quiz_bank_unpublish)
              </span>
            </div>
            <div>
              <span className="text-[#434655] block mb-1">上次操作時間</span>
              <span className="text-[#191c1e] font-medium">
                {lastSyncTime ? `${lastSyncTime} (已同步/讀取最新資料)` : '剛連線 / 尚未同步'}
              </span>
            </div>
          </div>
        ) : (
          <div className="pt-2 border-t border-[#c3c6d7]/30 flex flex-col md:flex-row md:items-center gap-3">
            <span className="text-xs text-[#434655] whitespace-nowrap">或者手動連結其他 Google 試算表：</span>
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
                placeholder="貼上 Google 試算表網址或 ID (例如: https://docs.google.com/spreadsheets/d/...)"
                className="flex-1 px-3 py-1.5 text-xs bg-[#f2f4f6] rounded-lg border border-[#c3c6d7]/50 focus:outline-none focus:ring-2 focus:ring-[#004ac6]/30 text-[#191c1e]"
              />
              <button
                onClick={handleManualLink}
                className="px-3 py-1.5 bg-[#f2f4f6] hover:bg-[#e6e8ea] text-[#191c1e] text-xs font-semibold rounded-lg transition-colors border border-[#c3c6d7]/50 cursor-pointer"
                type="button"
              >
                連結
              </button>
            </div>
          </div>
        )}

        {/* API Test Results Card if tested */}
        {apiStats && (
          <div className="p-3.5 bg-[#e8f0fe] rounded-xl border border-[#aecbfa] text-xs space-y-2">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-[#1a73e8] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                Google Sheets API 連線測試報告：{apiStats.title}
              </div>
              <button
                onClick={() => setApiStats(null)}
                className="text-[#5f6368] hover:text-[#202124] text-[11px] cursor-pointer"
              >
                關閉
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {apiStats.sheets.map((s, idx) => (
                <div key={idx} className="bg-white p-2 rounded-lg border border-[#d2e3fc]">
                  <div className="font-mono font-medium text-[#202124] truncate" title={s.name}>
                    {s.name}
                  </div>
                  <div className="text-[10px] text-[#5f6368] mt-0.5">
                    {s.rowCount} 列 × {s.columnCount} 欄
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 6 Tables Schema & Preview Tabs */}
      <div className="bg-white rounded-2xl border border-[#c3c6d7]/40 shadow-xs overflow-hidden">
        {/* Table Selector Tabs */}
        <div className="bg-[#f8f9fa] border-b border-[#c3c6d7]/30 px-6 pt-4 flex flex-wrap gap-2">
          {Object.entries(DATABASE_TABLE_SCHEMAS).map(([key, schema]) => {
            const isActive = activeTableKey === key;
            return (
              <button
                key={key}
                onClick={() => setActiveTableKey(key)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-t-lg transition-all cursor-pointer border-t border-x ${
                  isActive
                    ? 'bg-white text-[#004ac6] border-[#c3c6d7]/40 shadow-xs -mb-[1px]'
                    : 'bg-transparent text-[#434655] border-transparent hover:text-[#191c1e]'
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {key.startsWith('quiz') ? 'assignment' : key === 'test_bank' ? 'quiz' : key === 'users' ? 'group' : 'category'}
                </span>
                <span>{schema.name}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#f2f4f6] text-[#737686]">
                  {schema.columns.length} 欄
                </span>
              </button>
            );
          })}
        </div>

        {/* Table Overview & Column Definition */}
        <div className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#eceef0]">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-[#191c1e] font-mono">
                  table: {currentSchema.name}
                </span>
                <span className="text-xs text-[#004ac6] bg-[#dbe1ff]/60 px-2 py-0.5 rounded-md font-medium">
                  {currentSchema.description}
                </span>
              </div>
              <p className="text-xs text-[#434655] mt-1">
                共 {currentSchema.columns.length} 個欄位結構，對應 Google 試算表分頁「{currentSchema.name}」的第一列標題。
              </p>
            </div>

            <div className="text-xs text-[#434655]">
              目前筆數預估: <span className="font-semibold text-[#191c1e]">
                {activeTableKey === 'test_bank'
                  ? questions.length
                  : activeTableKey === 'quiz_bank_publish'
                  ? examPapers.filter((e) => e.status === 'published').length
                  : activeTableKey === 'quiz_bank_unpublish'
                  ? examPapers.filter((e) => e.status === 'draft').length
                  : activeTableKey === 'categories'
                  ? 12
                  : activeTableKey === 'roles'
                  ? 5
                  : 3} 筆
              </span>
            </div>
          </div>

          {/* Column definitions chips/grid */}
          <div>
            <h3 className="text-xs font-bold text-[#434655] uppercase tracking-wider mb-2.5">
              欄位詳細規格 (Columns)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {currentSchema.columns.map((col, idx) => (
                <div
                  key={col.key}
                  className="bg-[#f8f9fa] rounded-xl p-3 border border-[#e0e3e7] flex flex-col gap-1 hover:border-[#004ac6]/40 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-xs text-[#004ac6]">
                      "{col.key}"
                    </span>
                    <span className="text-[10px] text-[#737686] font-mono">Col #{idx + 1}</span>
                  </div>
                  <span className="text-xs text-[#191c1e]">{col.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sample Rows Preview */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold text-[#434655] uppercase tracking-wider">
                資料列即時預覽 (Live Rows Preview)
              </h3>
              <span className="text-[11px] text-[#737686]">
                顯示目前系統記憶體即將或已寫入試算表的資料
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-[#c3c6d7]/30 bg-white shadow-xs max-h-72">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#004ac6] text-white font-semibold">
                    {currentSchema.columns.map((col) => (
                      <th key={col.key} className="py-2 px-3 border-r border-[#003da6] whitespace-nowrap">
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eceef0] font-mono text-[11px]">
                  {/* Dynamic render preview depending on table */}
                  {activeTableKey === 'test_bank' &&
                    questions.slice(0, 5).map((q, idx) => (
                      <tr key={q.id} className="hover:bg-[#f8f9fa]">
                        <td className="py-2 px-3">{idx + 1}</td>
                        <td className="py-2 px-3 text-[#004ac6] font-semibold">{q.id}</td>
                        <td className="py-2 px-3 max-w-[200px] truncate">{q.content}</td>
                        <td className="py-2 px-3 max-w-[120px] truncate">{JSON.stringify(q.options || [])}</td>
                        <td className="py-2 px-3">{q.correctAnswer}</td>
                        <td className="py-2 px-3 max-w-[120px] truncate">{q.explanation}</td>
                        <td className="py-2 px-3">{q.difficulty}</td>
                        <td className="py-2 px-3">{q.points}</td>
                        <td className="py-2 px-3">{q.subjectId === 'math' ? 3 : 4}</td>
                        <td className="py-2 px-3">{q.tags.join(', ')}</td>
                        <td className="py-2 px-3">{q.updatedAt}</td>
                        <td className="py-2 px-3">1</td>
                      </tr>
                    ))}

                  {activeTableKey === 'quiz_bank_publish' &&
                    examPapers
                      .filter((e) => e.status === 'published')
                      .slice(0, 5)
                      .map((e, idx) => (
                        <tr key={e.id} className="hover:bg-[#f8f9fa]">
                          <td className="py-2 px-3">{idx + 1}</td>
                          <td className="py-2 px-3 text-[#004ac6] font-semibold">{e.id}</td>
                          <td className="py-2 px-3">{e.title}</td>
                          <td className="py-2 px-3">{e.subject}</td>
                          <td className="py-2 px-3">Lv.{e.difficultyLv}</td>
                          <td className="py-2 px-3">{e.questionCount}</td>
                          <td className="py-2 px-3">{e.totalScore}</td>
                          <td className="py-2 px-3">{e.durationMinutes} 分鐘</td>
                          <td className="py-2 px-3">{e.createdAt}</td>
                        </tr>
                      ))}

                  {activeTableKey === 'quiz_bank_unpublish' &&
                    examPapers
                      .filter((e) => e.status === 'draft')
                      .slice(0, 5)
                      .map((e, idx) => (
                        <tr key={e.id} className="hover:bg-[#f8f9fa]">
                          <td className="py-2 px-3">{idx + 1}</td>
                          <td className="py-2 px-3 text-[#ba1a1a] font-semibold">{e.id}</td>
                          <td className="py-2 px-3">{e.title}</td>
                          <td className="py-2 px-3">{e.subject}</td>
                          <td className="py-2 px-3">Lv.{e.difficultyLv}</td>
                          <td className="py-2 px-3">{e.questionCount}</td>
                          <td className="py-2 px-3">{e.totalScore}</td>
                          <td className="py-2 px-3">{e.durationMinutes} 分鐘</td>
                          <td className="py-2 px-3">{e.createdAt}</td>
                        </tr>
                      ))}

                  {activeTableKey === 'categories' && (
                    <>
                      <tr className="hover:bg-[#f8f9fa]"><td className="py-2 px-3">1</td><td className="py-2 px-3">自然領域</td><td className="py-2 px-3">0</td><td className="py-2 px-3">1</td><td className="py-2 px-3">1</td></tr>
                      <tr className="hover:bg-[#f8f9fa]"><td className="py-2 px-3">2</td><td className="py-2 px-3">社會領域</td><td className="py-2 px-3">0</td><td className="py-2 px-3">1</td><td className="py-2 px-3">2</td></tr>
                      <tr className="hover:bg-[#f8f9fa]"><td className="py-2 px-3">3</td><td className="py-2 px-3">數學科</td><td className="py-2 px-3">0</td><td className="py-2 px-3">2</td><td className="py-2 px-3">3</td></tr>
                    </>
                  )}

                  {activeTableKey === 'roles' && (
                    <>
                      <tr className="hover:bg-[#f8f9fa]"><td className="py-2 px-3">1</td><td className="py-2 px-3">ADMIN</td><td className="py-2 px-3">超級管理員</td><td className="py-2 px-3">具備系統所有試題、試卷最高權限</td><td className="py-2 px-3">2024-01-01</td></tr>
                      <tr className="hover:bg-[#f8f9fa]"><td className="py-2 px-3">2</td><td className="py-2 px-3">TEACHER</td><td className="py-2 px-3">學科教師</td><td className="py-2 px-3">負責命題、編輯試題與組卷</td><td className="py-2 px-3">2024-01-01</td></tr>
                    </>
                  )}

                  {activeTableKey === 'users' && (
                    <tr className="hover:bg-[#f8f9fa]">
                      <td className="py-2 px-3">1</td>
                      <td className="py-2 px-3">usr_9f8a1b2c</td>
                      <td className="py-2 px-3">1</td>
                      <td className="py-2 px-3">ADMIN</td>
                      <td className="py-2 px-3">王敏行 (Admin Wang)</td>
                      <td className="py-2 px-3">admin_wang</td>
                      <td className="py-2 px-3">$2b$12$...</td>
                      <td className="py-2 px-3 max-w-[120px] truncate">{connectedSpreadsheetUrl || 'https://...'}</td>
                      <td className="py-2 px-3">2026-11-03 11:45</td>
                      <td className="py-2 px-3">2024-01-01</td>
                      <td className="py-2 px-3">2026-11-03</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Mandatory User Confirmation Modal for Destructive/Mutating Operations */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl p-6 border border-[#c3c6d7]/30 space-y-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  confirmModal.actionType === 'disconnect'
                    ? 'bg-[#ffdad6] text-[#ba1a1a]'
                    : confirmModal.actionType === 'read'
                    ? 'bg-[#e8f0fe] text-[#1a73e8]'
                    : 'bg-[#dbe1ff] text-[#004ac6]'
                }`}
              >
                <span className="material-symbols-outlined text-[24px]">
                  {confirmModal.actionType === 'disconnect'
                    ? 'warning'
                    : confirmModal.actionType === 'read'
                    ? 'cloud_download'
                    : 'cloud_upload'}
                </span>
              </div>
              <div>
                <h3 className="font-bold text-base text-[#191c1e]">{confirmModal.title}</h3>
                <span className="text-[11px] text-[#737686]">Google Workspace 授權操作確認</span>
              </div>
            </div>

            <p className="text-xs text-[#434655] leading-relaxed">
              {confirmModal.description}
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
                className="px-4 py-2 text-xs font-semibold text-[#434655] hover:bg-[#eceef0] rounded-lg transition-colors cursor-pointer"
                type="button"
              >
                取消
              </button>
              <button
                onClick={confirmModal.onConfirm}
                className={`px-4 py-2 text-xs font-semibold text-white rounded-lg shadow-xs transition-colors cursor-pointer ${
                  confirmModal.actionType === 'disconnect'
                    ? 'bg-[#ba1a1a] hover:bg-[#93000a]'
                    : confirmModal.actionType === 'read'
                    ? 'bg-[#1a73e8] hover:bg-[#1557b0]'
                    : 'bg-[#004ac6] hover:bg-[#003da6]'
                }`}
                type="button"
              >
                {confirmModal.actionType === 'disconnect'
                  ? '確認解除'
                  : confirmModal.actionType === 'read'
                  ? '確認讀取並匯入'
                  : '確認執行寫入'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
