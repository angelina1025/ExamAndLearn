'use client';

import { useState } from 'react';
import type { ReviewQuestion } from '@/utils/examReport';
import { downloadWrongQuestions, exportWrongQuestionsToGoogleSheet } from '@/services/resultExport';

export function ExportActions({ items, title }: { items: ReviewQuestion[]; title: string }) {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [sheetUrl, setSheetUrl] = useState('');

  async function handleExport(target: 'excel' | 'google') {
    if (busy || !items.length) return;
    setBusy(true);
    setMessage('');
    setSheetUrl('');
    try {
      if (target === 'excel') {
        await downloadWrongQuestions(items, title);
        setMessage(`已產生 ${items.length} 題錯題的 Excel 檔案。`);
      } else {
        const { getAccessToken, googleSignIn } = await import('@/services/googleAuth');
        const token = await getAccessToken() || (await googleSignIn())?.accessToken;
        if (!token) throw new Error('尚未取得 Google 授權，未匯出任何資料。');
        setSheetUrl(await exportWrongQuestionsToGoogleSheet(items, title, token));
        setMessage(`已成功寫入 ${items.length} 題錯題至新的 Google 試算表。`);
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : '匯出失敗，請稍後再試。');
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5" aria-labelledby="export-title">
      <h2 id="export-title" className="font-bold text-slate-800">錯題下載</h2>
      <p className="mt-1 text-sm text-slate-600">匯出目前學科與難度條件下的 {items.length} 題錯題（包含未作答）。</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button className="exam-btn rounded-lg" disabled={busy || !items.length} onClick={() => handleExport('excel')}>下載錯題 Excel (.xlsx)</button>
        <button className="exam-btn rounded-lg" disabled={busy || !items.length} onClick={() => handleExport('google')}>匯出錯題至 Google Sheets</button>
      </div>
      <p className="mt-3 text-xs text-slate-500">Google 匯出需登入並授權，會在你的帳號建立新試算表，不修改共用題庫。</p>
      <p role="status" className="mt-2 text-sm text-slate-700">{busy ? '正在匯出，請稍候…' : message}</p>
      {sheetUrl && <a href={sheetUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm text-blue-800 underline">開啟已匯出的 Google 試算表</a>}
    </section>
  );
}
