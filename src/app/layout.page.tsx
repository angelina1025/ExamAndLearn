import type { Metadata } from 'next';
import React from 'react';
import { Providers } from '@/app/providers';
import './globals.css';
import './selection-pages.css';

export const metadata: Metadata = {
  title: 'QuizCMS — 數位題庫與組卷管理系統',
  description: '數位題庫管理、組卷、線上測驗與錯題分析平台',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className="min-h-screen bg-[#f8f9fa] text-[#191c1d] antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
