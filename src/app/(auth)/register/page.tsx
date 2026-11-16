'use client';

import React from 'react';
import Link from 'next/link';
import type { UserProfile } from '@/types';
import { RegisterForm } from './_components/RegisterForm';

interface RegisterPageProps {
  onRegisterSuccess?: (user: UserProfile) => void;
  onNavigateToLogin?: () => void;
  spreadsheetId?: string | null;
  accessToken?: string | null;
}

export default function RegisterPage({
  onRegisterSuccess,
  onNavigateToLogin,
  spreadsheetId,
  accessToken,
}: RegisterPageProps = {}) {
  const handleSuccess = (user: UserProfile) => {
    if (onRegisterSuccess) {
      onRegisterSuccess(user);
    } else if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  };

  const handleGoLogin = () => {
    if (onNavigateToLogin) {
      onNavigateToLogin();
    } else if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef2ff] via-[#f8f9fa] to-[#e0e7ff] flex flex-col justify-center items-center p-4 sm:p-6 font-sans antialiased">
      {/* Main Card Container */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-[#c3c6d7]/40 overflow-hidden transition-all duration-200">
        {/* Top Brand Header */}
        <div className="bg-[#004ac6] px-6 py-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-xs flex items-center justify-center font-extrabold text-base tracking-wider shadow-inner">
                PP
              </div>
              <div>
                <h1 className="text-[18px] font-bold tracking-tight leading-snug">
                  建立新使用者帳號
                </h1>
                <p className="text-[12px] text-white/80 mt-0.5">
                  ExamAndLearn 雲端測驗與自主學習平台
                </p>
              </div>
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/15 text-white font-medium">
              新註冊
            </span>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6">
          <RegisterForm
            onRegisterSuccess={handleSuccess}
            onNavigateToLogin={handleGoLogin}
            spreadsheetId={spreadsheetId}
            accessToken={accessToken}
          />
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="mt-4 flex items-center gap-4 text-[12px] text-[#434655]">
        <button
          type="button"
          onClick={handleGoLogin}
          className="hover:text-[#004ac6] hover:underline cursor-pointer"
        >
          ← 返回帳號登入
        </button>
        <span>·</span>
        <span>Google Sheets 即時帳號同步</span>
      </div>
    </div>
  );
}

