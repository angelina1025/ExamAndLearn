'use client';

import React, { useState } from 'react';
import { UserProfile } from '@/types';
import { ProfileForm } from '@/app/(auth)/profile/_components/ProfileForm';

interface UserSettingsViewProps {
  currentUser: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
}

export const UserSettingsView: React.FC<UserSettingsViewProps> = ({
  currentUser,
  onUpdateProfile,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyUuid = () => {
    if (currentUser?.uuid) {
      navigator.clipboard?.writeText(currentUser.uuid);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#191c1e] tracking-tight">個人設定與資料庫綁定</h1>
        <p className="text-xs text-[#434655] mt-1">
          管理您的個人顯示資料，並配置個人自選題目與自選試卷的 Google Sheet 儲存庫
        </p>
      </div>

      {/* Notice Card for Google Sheet Requirement */}
      <div className="bg-[#dbe1ff]/50 border border-[#004ac6]/30 rounded-2xl p-4 flex items-start gap-3">
        <span className="material-symbols-outlined text-[#004ac6] text-[22px] mt-0.5">
          info
        </span>
        <div className="text-xs leading-relaxed text-[#191c1e]">
          <h4 className="font-bold text-[#004ac6] text-sm mb-0.5">自選題庫與試卷使用規範</h4>
          <p className="text-[#434655]">
            依系統規格：<strong>自選題目及自選試卷需在綁定 Google Sheet 的狀況下才能使用該功能。</strong>
            請在下方填寫您個人的 Google 試算表連結（含「知道連結的人皆可編輯」權限），系統便能自動將您自組的題目與自選試卷同步寫入個人資料庫中。
          </p>
        </div>
      </div>

      {/* Account Info Summary Card */}
      <div className="bg-white rounded-2xl border border-[#c3c6d7]/40 p-5 flex flex-col gap-3 shadow-2xs">
        <h3 className="text-sm font-bold text-[#191c1e]">當前帳號身分</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-[#f8f9fa] p-3 rounded-xl border border-[#c3c6d7]/30">
            <span className="text-[#737686] block mb-0.5">登入帳號 (identifier)</span>
            <span className="font-mono font-bold text-[#191c1e]">{currentUser.identifier || '—'}</span>
          </div>
          <div className="bg-[#f8f9fa] p-3 rounded-xl border border-[#c3c6d7]/30">
            <span className="text-[#737686] block mb-0.5">使用者角色 (role)</span>
            <span className="font-bold text-[#004ac6]">
              {currentUser.roleName ? `${currentUser.roleName} (${currentUser.role})` : currentUser.role}
            </span>
          </div>
          <div className="bg-[#f8f9fa] p-3 rounded-xl border border-[#c3c6d7]/30 flex items-center justify-between">
            <div>
              <span className="text-[#737686] block mb-0.5">唯一識別碼 (uuid)</span>
              <span className="font-mono text-[11px] text-[#434655]">{currentUser.uuid}</span>
            </div>
            <button
              type="button"
              onClick={handleCopyUuid}
              className="text-[#004ac6] hover:bg-[#dbe1ff]/50 p-1.5 rounded-lg text-xs"
              title="複製 UUID"
            >
              <span className="material-symbols-outlined text-[16px]">
                {copied ? 'check' : 'content_copy'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Profile Form (Nickname & Sheet URL) */}
      <ProfileForm profile={currentUser} onSave={onUpdateProfile} />
    </div>
  );
};

