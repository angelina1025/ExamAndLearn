'use client';

import React, { useState } from 'react';
import type { UserProfile } from '@/types';
import {
  fetchUsersAndRolesFromSheet,
  appendUserToSpreadsheet,
  extractSpreadsheetId,
  getEnvConfiguredSpreadsheetUrl,
  getEnvConfiguredScriptUrl,
} from '@/services/publicSheet';

interface RegisterFormProps {
  onRegisterSuccess?: (user: UserProfile) => void;
  onNavigateToLogin?: () => void;
  spreadsheetId?: string | null;
  accessToken?: string | null;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onRegisterSuccess,
  onNavigateToLogin,
  spreadsheetId,
  accessToken,
}) => {
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [credential, setCredential] = useState('');
  const [confirmCredential, setConfirmCredential] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [registeredUser, setRegisteredUser] = useState<UserProfile | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // 1. 欄位基礎檢核
    const cleanName = name.trim();
    const cleanId = identifier.trim();
    const cleanCred = credential.trim();
    const cleanConfirm = confirmCredential.trim();

    if (!cleanName) {
      setErrorMessage('請輸入您的姓名或暱稱');
      return;
    }
    if (!cleanId) {
      setErrorMessage('請輸入登入帳號');
      return;
    }
    if (cleanId.length < 3) {
      setErrorMessage('帳號長度至少需 3 個字元');
      return;
    }
    if (!/^[a-zA-Z0-9_.-]+$/.test(cleanId)) {
      setErrorMessage('帳號僅能包含英文字母、數字、小數點、減號或底線');
      return;
    }
    if (!cleanCred) {
      setErrorMessage('請設定登入密碼');
      return;
    }
    if (cleanCred.length < 6) {
      setErrorMessage('密碼長度至少需 6 個字元');
      return;
    }
    if (cleanCred !== cleanConfirm) {
      setErrorMessage('兩次輸入的密碼不相符，請重新確認');
      return;
    }

    setIsSubmitting(true);

    try {
      const targetId =
        spreadsheetId ||
        extractSpreadsheetId(getEnvConfiguredSpreadsheetUrl()) ||
        (typeof window !== 'undefined' ? localStorage.getItem('google_spreadsheet_id') : null) ||
        '';

      // 2. 帳號唯一性檢查與計算 nextRowIndex
      let nextRowIndex = 2; // 預設第 2 行 (第 1 行是標題)
      let checkedOnline = false;

      try {
        const { users } = await fetchUsersAndRolesFromSheet(targetId, accessToken);
        checkedOnline = true;
        nextRowIndex = users.length + 2;
        const existsInSheet = users.some(
          (u) => (u.identifier || '').toLowerCase() === cleanId.toLowerCase()
        );
        if (existsInSheet) {
          setErrorMessage(`帳號「${cleanId}」已被註冊，請換一個帳號重試。`);
          setIsSubmitting(false);
          return;
        }

        // 若線上 Google Sheet 確認無此帳號，自動清理 localStorage 中過去殘留的幽靈暫存
        if (typeof window !== 'undefined') {
          try {
            const raw = localStorage.getItem('quiz_registered_users');
            if (raw) {
              const localUsers: UserProfile[] = JSON.parse(raw);
              const cleaned = localUsers.filter(
                (u) => (u.identifier || '').toLowerCase() !== cleanId.toLowerCase()
              );
              localStorage.setItem('quiz_registered_users', JSON.stringify(cleaned));
            }
          } catch {}
        }
      } catch {
        // 若遠端完全斷線/無法讀取，才檢查本地離線快照
      }

      // 只有在完全無法連線 Google Sheet 時，才檢查本地離線快照
      if (!checkedOnline && typeof window !== 'undefined') {
        try {
          const localUsers: UserProfile[] = JSON.parse(
            localStorage.getItem('quiz_registered_users') || '[]'
          );
          if (localUsers.some((u) => (u.identifier || '').toLowerCase() === cleanId.toLowerCase())) {
            setErrorMessage(`帳號「${cleanId}」已被註冊，請換一個帳號重試。`);
            setIsSubmitting(false);
            return;
          }
        } catch {}
      }

      // 3. 建立 UserProfile 物件（依需求：剛註冊統一是 USER，沒有其他身分）
      const nowStr = new Date().toISOString().slice(0, 19).replace('T', ' ');
      const newUser: UserProfile = {
        id: Date.now(),
        uuid: `USR-${Date.now().toString().slice(-6)}`,
        status: 1, // 啟用
        role: 'USER',
        roleName: '一般用戶',
        name: cleanName,
        nickname: cleanName,
        identifier: cleanId,
        credential: cleanCred,
        created_at: nowStr,
        updated_at: nowStr,
      };

      // 4. 註冊送出：寫入 Google Sheets users 資料表
      let writeSuccess = false;
      let writeErrorDetail = '';

      if (targetId || getEnvConfiguredScriptUrl() || typeof window !== 'undefined') {
        try {
          const writeRes = await appendUserToSpreadsheet(
            accessToken || null,
            targetId,
            newUser,
            nextRowIndex
          );
          if (writeRes && writeRes.success) {
            writeSuccess = true;
          } else {
            writeErrorDetail = writeRes?.message || '寫入失敗';
          }
        } catch (sheetErr: any) {
          writeErrorDetail = sheetErr?.message || '雲端資料庫寫入連線錯誤';
          console.error('Google Sheet append user failed:', sheetErr);
        }
      } else {
        writeErrorDetail = '未配置 Google 試算表或 Google Apps Script 網址';
      }

      // 若未成功寫入雲端 Google Sheet，必須明確回報失敗，絕不假裝註冊成功
      if (!writeSuccess) {
        throw new Error(`無法將帳號寫入 Google Sheet users 資料表：${writeErrorDetail}。請確認雲端試算表連線狀態後重試。`);
      }

      // 5. 確定雲端寫入成功後，同步寫入本地備援快照供離線登入使用
      if (typeof window !== 'undefined') {
        try {
          const localUsers: UserProfile[] = JSON.parse(
            localStorage.getItem('quiz_registered_users') || '[]'
          );
          const filtered = localUsers.filter((u) => u.identifier !== newUser.identifier);
          localStorage.setItem('quiz_registered_users', JSON.stringify([newUser, ...filtered]));
        } catch (storageErr) {
          console.warn('Failed to save user to local storage:', storageErr);
        }
      }

      setRegisteredUser(newUser);
    } catch (err: any) {
      setErrorMessage(err?.message || '註冊失敗，請檢查輸入資料或網路連線。');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 註冊成功完成畫面
  if (registeredUser) {
    return (
      <div className="flex flex-col gap-5 animate-in fade-in zoom-in-95 duration-200">
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 flex items-start gap-3">
          <span className="material-symbols-outlined text-emerald-600 text-[26px] mt-0.5">
            check_circle
          </span>
          <div>
            <h3 className="text-[16px] font-bold text-emerald-900">帳號註冊成功！</h3>
            <p className="text-[13px] text-emerald-700 mt-1">
              已成功建立新帳號並寫入 Google Sheets <code className="font-mono font-bold">users</code> 資料表。
            </p>
          </div>
        </div>

        <div className="bg-[#f8f9fa] rounded-xl border border-[#c3c6d7]/50 p-4 space-y-2.5 text-[13px]">
          <div className="flex items-center justify-between py-1 border-b border-[#c3c6d7]/30">
            <span className="text-[#434655]">使用者名稱</span>
            <span className="font-bold text-[#191c1e]">{registeredUser.name}</span>
          </div>
          <div className="flex items-center justify-between py-1 border-b border-[#c3c6d7]/30">
            <span className="text-[#434655]">登入帳號</span>
            <span className="font-mono font-bold text-[#004ac6]">{registeredUser.identifier}</span>
          </div>
          <div className="flex items-center justify-between py-1 border-b border-[#c3c6d7]/30">
            <span className="text-[#434655]">系統權限身分</span>
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#dbe1ff] text-[#004ac6]">
              一般用戶 (USER)
            </span>
          </div>
          {registeredUser.google_sheet_URL ? (
            <div className="flex items-center justify-between py-1 border-b border-[#c3c6d7]/30">
              <span className="text-[#434655]">個人 Google Sheet</span>
              <span className="text-[12px] text-emerald-700 font-semibold truncate max-w-[200px]">
                已綁定個人試算表
              </span>
            </div>
          ) : (
            <div className="py-1 text-[12px] text-amber-700">
              💡 尚未綁定個人 Google Sheet，登入後可隨時至「個人設定」進行綁定。
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          {onNavigateToLogin && (
            <button
              type="button"
              onClick={onNavigateToLogin}
              className="py-2.5 px-4 rounded-xl border border-[#c3c6d7] text-[#434655] text-[13px] font-semibold hover:bg-[#f2f4f6] transition-colors cursor-pointer text-center"
            >
              前往登入頁面
            </button>
          )}
          {onRegisterSuccess && (
            <button
              type="button"
              onClick={() => onRegisterSuccess(registeredUser)}
              className="flex-1 py-2.5 px-4 rounded-xl bg-[#004ac6] text-white text-[14px] font-bold hover:bg-[#003ea8] shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>立即進入系統</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-300 text-red-800 text-[12.5px] font-medium flex items-start gap-2.5 animate-in fade-in">
          <span className="material-symbols-outlined text-[18px] text-red-600 shrink-0 mt-0.5">
            error
          </span>
          <span>{errorMessage}</span>
        </div>
      )}

      {/* 姓名 / 暱稱 */}
      <div>
        <label htmlFor="reg-name" className="block text-[13px] font-bold text-[#191c1e] mb-1.5">
          姓名 / 暱稱 <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <span className="material-symbols-outlined text-[19px] text-[#737686] absolute left-3.5 top-1/2 -translate-y-1/2">
            badge
          </span>
          <input
            id="reg-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="請輸入您的真實姓名或暱稱"
            disabled={isSubmitting}
            required
            className="w-full pl-10 pr-3.5 py-2.5 bg-[#f8f9fa] border border-[#c3c6d7] rounded-xl text-[14px] text-[#191c1e] placeholder:text-[#737686] focus:outline-none focus:border-[#004ac6] focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* 登入帳號 */}
      <div>
        <label htmlFor="reg-identifier" className="block text-[13px] font-bold text-[#191c1e] mb-1.5">
          登入帳號 (Identifier) <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <span className="material-symbols-outlined text-[19px] text-[#737686] absolute left-3.5 top-1/2 -translate-y-1/2">
            person
          </span>
          <input
            id="reg-identifier"
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="請設定帳號 (至少 3 碼英數字)"
            autoComplete="username"
            disabled={isSubmitting}
            required
            className="w-full pl-10 pr-3.5 py-2.5 bg-[#f8f9fa] border border-[#c3c6d7] rounded-xl text-[14px] text-[#191c1e] placeholder:text-[#737686] focus:outline-none focus:border-[#004ac6] focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* 密碼 */}
      <div>
        <label htmlFor="reg-credential" className="block text-[13px] font-bold text-[#191c1e] mb-1.5">
          登入密碼 <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <span className="material-symbols-outlined text-[19px] text-[#737686] absolute left-3.5 top-1/2 -translate-y-1/2">
            lock
          </span>
          <input
            id="reg-credential"
            type={showPassword ? 'text' : 'password'}
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            placeholder="請設定密碼 (至少 6 碼)"
            autoComplete="new-password"
            disabled={isSubmitting}
            required
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

      {/* 確認密碼 */}
      <div>
        <label htmlFor="reg-confirm" className="block text-[13px] font-bold text-[#191c1e] mb-1.5">
          再次輸入密碼 <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <span className="material-symbols-outlined text-[19px] text-[#737686] absolute left-3.5 top-1/2 -translate-y-1/2">
            lock_reset
          </span>
          <input
            id="reg-confirm"
            type={showPassword ? 'text' : 'password'}
            value={confirmCredential}
            onChange={(e) => setConfirmCredential(e.target.value)}
            placeholder="請再次輸入相同密碼"
            autoComplete="new-password"
            disabled={isSubmitting}
            required
            className="w-full pl-10 pr-3.5 py-2.5 bg-[#f8f9fa] border border-[#c3c6d7] rounded-xl text-[14px] text-[#191c1e] placeholder:text-[#737686] focus:outline-none focus:border-[#004ac6] focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* 送出註冊按鈕 */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 w-full py-2.5 px-4 rounded-xl bg-[#004ac6] text-white text-[14px] font-bold hover:bg-[#003ea8] disabled:opacity-60 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <span className="material-symbols-outlined text-[18px] animate-spin">
              progress_activity
            </span>
            <span>正在寫入 users 資料表並建立帳號...</span>
          </>
        ) : (
          <>
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            <span>立即註冊並寫入資料庫</span>
          </>
        )}
      </button>

      {/* 切換至登入 */}
      {onNavigateToLogin && (
        <div className="pt-2 text-center text-[13px] text-[#434655]">
          已經有帳號了嗎？{' '}
          <button
            type="button"
            onClick={onNavigateToLogin}
            className="text-[#004ac6] font-bold hover:underline cursor-pointer"
          >
            返回帳號登入
          </button>
        </div>
      )}
    </form>
  );
};
