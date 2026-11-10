'use client';

import React, { useState, useEffect } from 'react';
import { UserProfile, RoleItem } from '@/types';
import {
  authenticateUserFromSheet,
  fetchUsersAndRolesFromSheet,
  INITIAL_ROLES_DATA,
} from '@/services/publicSheet';
import { SystemGuidePanel } from '@/app/(auth)/login/_components/SystemGuidePanel';

const REMEMBER_ACCOUNT_KEY = 'exam_remember_account';
const REMEMBERED_IDENTIFIER_KEY = 'exam_remembered_identifier';

interface LoginPageProps {
  onLoginSuccess: (user: UserProfile, roleInfo?: RoleItem) => void;
  spreadsheetId?: string | null;
  accessToken?: string | null;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  spreadsheetId,
  accessToken,
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'guide'>('login');
  const [identifier, setIdentifier] = useState('');
  const [credential, setCredential] = useState('');
  const [rememberAccount, setRememberAccount] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [verifiedData, setVerifiedData] = useState<{
    user: UserProfile;
    roleInfo?: RoleItem;
  } | null>(null);

  const [roles, setRoles] = useState<RoleItem[]>(INITIAL_ROLES_DATA);
  const [isLoadingRoles, setIsLoadingRoles] = useState(false);

  // 初始化讀取「記住帳號」設定
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const savedRemember = localStorage.getItem(REMEMBER_ACCOUNT_KEY) === 'true';
    const savedIdentifier = localStorage.getItem(REMEMBERED_IDENTIFIER_KEY) || '';
    if (savedRemember && savedIdentifier) {
      setRememberAccount(true);
      setIdentifier(savedIdentifier);
    }
  }, []);

  // 預先從 Google Sheet 載入 roles 角色定義表供說明頁與驗證顯示
  useEffect(() => {
    let mounted = true;
    const loadSheetRoles = async () => {
      setIsLoadingRoles(true);
      try {
        const res = await fetchUsersAndRolesFromSheet(spreadsheetId, accessToken);
        if (mounted && res.roles.length > 0) {
          setRoles(res.roles);
        }
      } catch {
        // Ignore preload error; will retry on login submit
      } finally {
        if (mounted) setIsLoadingRoles(false);
      }
    };
    loadSheetRoles();
    return () => {
      mounted = false;
    };
  }, [spreadsheetId, accessToken]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setVerifiedData(null);

    if (!identifier.trim()) {
      setErrorMessage('請輸入登入帳號 (identifier)');
      return;
    }
    if (!credential.trim()) {
      setErrorMessage('請輸入登入密碼 (credential)');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await authenticateUserFromSheet(
        identifier,
        credential,
        spreadsheetId,
        accessToken
      );

      if (result.allRoles && result.allRoles.length > 0) {
        setRoles(result.allRoles);
      }

      if (!result.success || !result.user) {
        setErrorMessage(result.error || '帳號或密碼驗證失敗');
        return;
      }

      // 處理「記住帳號」
      if (typeof window !== 'undefined') {
        if (rememberAccount) {
          localStorage.setItem(REMEMBER_ACCOUNT_KEY, 'true');
          localStorage.setItem(REMEMBERED_IDENTIFIER_KEY, identifier.trim());
        } else {
          localStorage.removeItem(REMEMBER_ACCOUNT_KEY);
          localStorage.removeItem(REMEMBERED_IDENTIFIER_KEY);
        }
      }

      setVerifiedData({
        user: result.user,
        roleInfo: result.roleInfo,
      });
    } catch (err: any) {
      setErrorMessage(
        err?.message || '連線至 Google Sheet 資料庫驗證失敗，請檢查網路或試算表設定'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef2ff] via-[#f8f9fa] to-[#e0e7ff] flex flex-col justify-center items-center p-4 sm:p-6 font-sans antialiased">
      {/* Main Card Container */}
      <div
        className={`w-full ${
          activeTab === 'guide' ? 'max-w-3xl' : 'max-w-md'
        } bg-white rounded-2xl shadow-xl border border-[#c3c6d7]/40 overflow-hidden transition-all duration-200`}
      >
        {/* Top Brand Header */}
        <div className="bg-[#004ac6] px-6 py-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-xs flex items-center justify-center font-extrabold text-base tracking-wider shadow-inner">
                PP
              </div>
              <div>
                <h1 className="text-[18px] font-bold tracking-tight leading-snug">
                  線上測驗與題庫管理系統
                </h1>
                <p className="text-[12px] text-white/80 mt-0.5">
                  ExamAndLearn Cloud Portal · Google Sheets DB
                </p>
              </div>
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/15 text-white font-medium">
              v2.4 Pro
            </span>
          </div>

          {/* Navigation Tabs: 1. 登入介面 / 3. 說明頁面 */}
          <div className="mt-5 grid grid-cols-2 gap-1.5 bg-[#00399e] p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveTab('login')}
              className={`py-2 px-3 rounded-lg text-[13px] font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'login'
                  ? 'bg-white text-[#004ac6] shadow-xs'
                  : 'text-white/85 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">login</span>
              <span>帳號登入</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('guide')}
              className={`py-2 px-3 rounded-lg text-[13px] font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'guide'
                  ? 'bg-white text-[#004ac6] shadow-xs'
                  : 'text-white/85 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">menu_book</span>
              <span>系統說明</span>
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6">
          {activeTab === 'guide' ? (
            <SystemGuidePanel
              roles={roles}
              isLoadingRoles={isLoadingRoles}
              onBackToLogin={() => setActiveTab('login')}
            />
          ) : verifiedData ? (
            /* 4. 拿帳密去 DB 比對成功後：確認使用者與角色資訊畫面 */
            <div className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="p-4 rounded-xl bg-[#d1fae5]/60 border border-[#059669]/30 flex items-start gap-3">
                <span className="material-symbols-outlined text-[#059669] text-[24px] mt-0.5">
                  check_circle
                </span>
                <div>
                  <h3 className="text-[15px] font-bold text-[#065f46]">
                    資料庫身分驗證成功！
                  </h3>
                  <p className="text-[12px] text-[#047857] mt-0.5">
                    已於 Google Sheet <code className="font-mono">users</code> 與{' '}
                    <code className="font-mono">roles</code> 資料表確認您的帳號與角色權限。
                  </p>
                </div>
              </div>

              <div className="bg-[#f8f9fa] rounded-xl border border-[#c3c6d7]/50 p-4 space-y-2.5 text-[13px]">
                <div className="flex items-center justify-between py-1 border-b border-[#c3c6d7]/30">
                  <span className="text-[#434655]">使用者暱稱 (name)</span>
                  <span className="font-bold text-[#191c1e]">
                    {verifiedData.user.name || verifiedData.user.nickname}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#c3c6d7]/30">
                  <span className="text-[#434655]">登入帳號 (identifier)</span>
                  <span className="font-mono font-semibold text-[#191c1e]">
                    {verifiedData.user.identifier}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#c3c6d7]/30">
                  <span className="text-[#434655]">唯一識別碼 (uuid)</span>
                  <span className="font-mono text-[12px] text-[#434655]">
                    {verifiedData.user.uuid}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#c3c6d7]/30">
                  <span className="text-[#434655]">帳號狀態 (status)</span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#d1fae5] text-[#065f46]">
                    1 = 啟用
                  </span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#c3c6d7]/30">
                  <span className="text-[#434655]">角色代碼 (roles.code)</span>
                  <span className="px-2.5 py-0.5 rounded bg-[#dbe1ff] text-[#004ac6] font-mono font-bold text-[12px]">
                    {verifiedData.user.role}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-[#434655]">角色名稱 (roles.name)</span>
                  <span className="font-bold text-[#004ac6]">
                    {verifiedData.roleInfo?.name || verifiedData.user.roleName}
                  </span>
                </div>
                {(verifiedData.roleInfo?.description ||
                  verifiedData.user.roleDescription) && (
                  <div className="pt-2 border-t border-[#c3c6d7]/30 text-[12px] text-[#434655]">
                    <span className="font-semibold text-[#191c1e]">角色權限描述：</span>
                    {verifiedData.roleInfo?.description ||
                      verifiedData.user.roleDescription}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setVerifiedData(null)}
                  className="px-4 py-2.5 rounded-xl border border-[#c3c6d7] text-[#434655] text-[13px] font-semibold hover:bg-[#f2f4f6] transition-colors cursor-pointer"
                >
                  切換帳號
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onLoginSuccess(verifiedData.user, verifiedData.roleInfo)
                  }
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#004ac6] text-white text-[14px] font-bold hover:bg-[#003ea8] shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>進入系統後台</span>
                  <span className="material-symbols-outlined text-[18px]">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          ) : (
            /* 1. 登入表單 (帳號、密碼) + 2. 記住帳號 */
            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-[#fee2e2] border border-[#ef4444]/40 text-[#991b1b] text-[12.5px] font-medium flex items-start gap-2.5 animate-in fade-in">
                  <span className="material-symbols-outlined text-[18px] text-[#dc2626] shrink-0 mt-0.5">
                    error
                  </span>
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* 帳號 (identifier) */}
              <div>
                <label
                  htmlFor="login-identifier"
                  className="block text-[13px] font-bold text-[#191c1e] mb-1.5"
                >
                  帳號 <span className="text-[11px] font-normal text-[#434655]">(users.identifier)</span>
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined text-[19px] text-[#737686] absolute left-3.5 top-1/2 -translate-y-1/2">
                    person
                  </span>
                  <input
                    id="login-identifier"
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="請輸入您的帳號..."
                    autoComplete="username"
                    disabled={isSubmitting}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-[#f8f9fa] border border-[#c3c6d7] rounded-xl text-[14px] text-[#191c1e] placeholder:text-[#737686] focus:outline-none focus:border-[#004ac6] focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* 密碼 (credential) */}
              <div>
                <label
                  htmlFor="login-credential"
                  className="block text-[13px] font-bold text-[#191c1e] mb-1.5"
                >
                  密碼 <span className="text-[11px] font-normal text-[#434655]">(users.credential)</span>
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined text-[19px] text-[#737686] absolute left-3.5 top-1/2 -translate-y-1/2">
                    lock
                  </span>
                  <input
                    id="login-credential"
                    type={showPassword ? 'text' : 'password'}
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    placeholder="請輸入您的密碼..."
                    autoComplete="current-password"
                    disabled={isSubmitting}
                    className="w-full pl-10 pr-10 py-2.5 bg-[#f8f9fa] border border-[#c3c6d7] rounded-xl text-[14px] text-[#191c1e] placeholder:text-[#737686] focus:outline-none focus:border-[#004ac6] focus:bg-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    tabIndex={-1}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737686] hover:text-[#191c1e] cursor-pointer"
                    title={showPassword ? '隱藏密碼' : '顯示密碼'}
                  >
                    <span className="material-symbols-outlined text-[19px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* 2. 記住帳號 + 3. 說明頁面快捷連結 */}
              <div className="flex items-center justify-between pt-0.5">
                <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberAccount}
                    onChange={(e) => setRememberAccount(e.target.checked)}
                    className="w-4 h-4 rounded border-[#c3c6d7] text-[#004ac6] focus:ring-[#004ac6]"
                  />
                  <span className="text-[13px] font-medium text-[#434655]">
                    記住帳號
                  </span>
                </label>

                <button
                  type="button"
                  onClick={() => setActiveTab('guide')}
                  className="text-[12px] font-semibold text-[#004ac6] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[15px]">
                    help_outline
                  </span>
                  <span>系統與角色說明</span>
                </button>
              </div>

              {/* 送出按鈕 */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-1 w-full py-2.5 px-4 rounded-xl bg-[#004ac6] text-white text-[14px] font-bold hover:bg-[#003ea8] disabled:opacity-60 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] animate-spin">
                      progress_activity
                    </span>
                    <span>正在與 Google Sheet 資料庫比對帳密與角色...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">
                      verified_user
                    </span>
                    <span>登入並驗證角色身分</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Footer note */}
      <p className="mt-4 text-[12px] text-[#434655]">
        連線資料庫：Google Sheets <code className="font-mono">users</code> ＆{' '}
        <code className="font-mono">roles</code> 即時權限驗證
      </p>
    </div>
  );
};

export default LoginPage;

