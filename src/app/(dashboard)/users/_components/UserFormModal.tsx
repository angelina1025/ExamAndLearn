'use client';

import React, { useState } from 'react';
import { UserProfile, RoleItem } from '@/types';
import { formatSheetTimestamp } from '@/utils/formatters';

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: UserProfile) => void;
  initialUser?: UserProfile | null;
  roles: RoleItem[];
}

export const UserFormModal: React.FC<UserFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialUser,
  roles,
}) => {
  const [identifier, setIdentifier] = useState(initialUser?.identifier ?? '');
  const [name, setName] = useState(initialUser?.name ?? initialUser?.nickname ?? '');
  const [credential, setCredential] = useState(initialUser?.credential ?? '');
  const [role, setRole] = useState(initialUser?.role ?? 'USER');
  const [status, setStatus] = useState<number>(initialUser?.status ?? 1);
  const [sheetUrl, setSheetUrl] = useState(initialUser?.google_sheet_URL ?? '');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || !name.trim()) return;

    const now = formatSheetTimestamp();
    const roleObj = roles.find((r) => r.code.toUpperCase() === String(role).toUpperCase());

    const savedUser: UserProfile = {
      id: initialUser?.id,
      uuid: initialUser?.uuid || `usr_${Date.now().toString().slice(-8)}`,
      identifier: identifier.trim(),
      name: name.trim(),
      nickname: name.trim(),
      credential: credential.trim() || 'password123',
      role,
      roleName: roleObj?.name || String(role),
      roleDescription: roleObj?.description || '',
      status,
      google_sheet_URL: sheetUrl.trim() || undefined,
      created_at: initialUser?.created_at || now,
      updated_at: now,
      last_login_at: initialUser?.last_login_at,
    };

    onSave(savedUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#c3c6d7]/40 flex flex-col gap-4 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 border-b border-[#c3c6d7]/30">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-[#dbe1ff] text-[#004ac6] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">manage_accounts</span>
            </span>
            <h2 className="text-base font-bold text-[#191c1e]">
              {initialUser ? '編輯帳號資料' : '新增系統帳號'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#737686] hover:text-[#191c1e] p-1 rounded-lg"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-[#434655] block mb-1">
                登入帳號 (identifier) *
              </label>
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="例如: student_01"
                className="w-full px-3 py-2 bg-[#f8f9fa] border border-[#c3c6d7] rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="font-bold text-[#434655] block mb-1">
                暱稱 / 姓名 (name) *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="例如: 陳小明"
                className="w-full px-3 py-2 bg-[#f8f9fa] border border-[#c3c6d7] rounded-lg text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-[#434655] block mb-1">
                密碼 (credential)
              </label>
              <input
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                placeholder="預設密碼"
                className="w-full px-3 py-2 bg-[#f8f9fa] border border-[#c3c6d7] rounded-lg text-sm font-mono"
              />
            </div>
            <div>
              <label className="font-bold text-[#434655] block mb-1">
                角色 (role → roles.code)
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 bg-[#f8f9fa] border border-[#c3c6d7] rounded-lg text-sm font-semibold text-[#004ac6]"
              >
                {roles.map((r) => (
                  <option key={r.code} value={r.code}>
                    {r.code} ({r.name})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-[#434655] block mb-1">
                帳號狀態 (status)
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#f8f9fa] border border-[#c3c6d7] rounded-lg text-sm"
              >
                <option value={1}>1 = 啟用 (正常)</option>
                <option value={0}>0 = 停用 (禁止登入)</option>
                <option value={2}>2 = 未驗證 (待審核)</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-[#434655] block mb-1">
                全域識別碼 (uuid)
              </label>
              <input
                type="text"
                readOnly
                value={initialUser?.uuid || '系統自動產生'}
                className="w-full px-3 py-2 bg-[#f2f4f6] text-[#737686] border border-[#c3c6d7]/50 rounded-lg text-sm font-mono"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-[#434655] block mb-1">
              個人資料庫網址 (google_sheet_URL)
            </label>
            <input
              type="url"
              value={sheetUrl}
              onChange={(e) => setSheetUrl(e.target.value)}
              placeholder="https://docs.google.com/spreadsheets/d/..."
              className="w-full px-3 py-2 bg-[#f8f9fa] border border-[#c3c6d7] rounded-lg text-sm font-mono"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#c3c6d7]/30">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-[#434655] hover:bg-[#f2f4f6]"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg text-xs font-bold bg-[#004ac6] text-white hover:bg-[#003ea8] shadow-sm"
            >
              儲存並寫入公用 Sheet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

