'use client';

import React, { useState } from 'react';
import { UserProfile } from '@/types';

interface ProfileFormProps {
  profile: UserProfile | null;
  onSave?: (updated: Partial<UserProfile>) => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ profile, onSave }) => {
  const [nickname, setNickname] = useState(profile?.nickname ?? '');
  const [sheetUrl, setSheetUrl] = useState(profile?.google_sheet_URL ?? '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave?.({ nickname, google_sheet_URL: sheetUrl });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl border border-[#c3c6d7]/40 p-6 flex flex-col gap-4"
    >
      <h2 className="text-base font-bold text-[#191c1d]">個人基本資料設定</h2>
      <div>
        <label className="block text-xs font-bold text-[#434655] mb-1">
          使用者名稱
        </label>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-[#c3c6d7] rounded-lg"
          placeholder="請輸入顯示名稱"
        />
      </div>
      <div>
        <label className="block text-xs font-bold text-[#434655] mb-1">
          私人題庫 Google Sheet URL (google_sheet_URL)
        </label>
        <input
          type="url"
          value={sheetUrl}
          onChange={(e) => setSheetUrl(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-[#c3c6d7] rounded-lg"
          placeholder="https://docs.google.com/spreadsheets/d/..."
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 rounded-lg text-xs font-bold bg-[#004ac6] text-white hover:bg-[#003ea8]"
        >
          儲存個人設定
        </button>
      </div>
    </form>
  );
};

