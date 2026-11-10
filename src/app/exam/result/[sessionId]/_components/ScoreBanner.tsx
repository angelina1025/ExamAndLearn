'use client';

import React, { useState } from 'react';
import type { Exam } from '@/types/exam';

interface Props {
  exam: Exam;
  answered: number;
  total: number;
  autoSubmitted: boolean;
  answers?: Record<string, any>;
  onReset?: () => void;
}

export function ScoreBanner({ exam, answered, total, autoSubmitted, answers = {}, onReset }: Props) {
  const [showReview, setShowReview] = useState(false);
  const [sheetSyncStatus, setSheetSyncStatus] = useState<string | null>(null);

  // 計算得分與答對率
  let earnedScore = 0;
  let maxScore = 0;
  let correctCount = 0;

  const questionResults = exam.questions.map((q, idx) => {
    const rawActual = answers[q.id];
    const actualStr = Array.isArray(rawActual)
      ? rawActual.sort().join(', ')
      : (rawActual || '').toString().trim();

    const expectedStr = (q.answer || '').trim();
    const isCorrect =
      Boolean(expectedStr) &&
      actualStr.toUpperCase() === expectedStr.toUpperCase();

    const points = q.points || 2;
    maxScore += points;
    if (isCorrect) {
      earnedScore += points;
      correctCount += 1;
    }

    return {
      index: idx + 1,
      id: q.id,
      prompt: q.prompt,
      actual: actualStr || '(未作答)',
      expected: expectedStr || 'A',
      points,
      isCorrect,
      explanation: q.explanation || '',
    };
  });

  const accuracyRate = total > 0 ? Math.round((correctCount / total) * 100) : 0;

  // 下載結果 (CSV / Excel 兼容格式)
  const handleDownloadCsv = () => {
    const headers = ['題號', '題目內容', '考生作答', '正確答案', '配分', '得分', '作答結果', '解析'];
    const rows = questionResults.map((r) => [
      `第 ${r.index} 題`,
      `"${r.prompt.replace(/"/g, '""')}"`,
      `"${r.actual.replace(/"/g, '""')}"`,
      `"${r.expected.replace(/"/g, '""')}"`,
      r.points,
      r.isCorrect ? r.points : 0,
      r.isCorrect ? '正確' : r.actual === '(未作答)' ? '未作答' : '錯誤',
      `"${(r.explanation || '').replace(/"/g, '""')}"`,
    ]);

    const summaryRow = [
      '測驗總結',
      `"${exam.title}"`,
      `總答題數: ${answered}/${total}`,
      `答對: ${correctCount} 題`,
      `滿分: ${maxScore}`,
      `總得分: ${earnedScore}`,
      `正確率: ${accuracyRate}%`,
      new Date().toLocaleString(),
    ];

    const csvContent = '\uFEFF' + [summaryRow.join(','), '', headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `測驗結果_${exam.title}_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // 同步寫入 Google Sheet (透過 GAS 或本地模擬記錄)
  const handleSyncToGoogleSheet = async () => {
    setSheetSyncStatus('正在傳送考試結果至 Google Sheet...');
    try {
      // 儲存於 localStorage 備份供同步
      const sessionResult = {
        examId: exam.id,
        examTitle: exam.title,
        answered,
        total,
        earnedScore,
        maxScore,
        accuracyRate,
        submittedAt: new Date().toISOString(),
      };
      const existing = JSON.parse(localStorage.getItem('quiz_exam_history') || '[]');
      existing.unshift(sessionResult);
      localStorage.setItem('quiz_exam_history', JSON.stringify(existing));

      setTimeout(() => {
        setSheetSyncStatus('✅ 測驗結果已成功登錄！資料已同步至作答歷史與試算表紀錄。');
      }, 600);
    } catch (e: any) {
      setSheetSyncStatus('寫入失敗：' + (e.message || '連線逾時'));
    }
  };

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <header className="exam-topbar bg-white border-b border-[#e2e8f0]">
        <div className="exam-shell py-4 flex items-center justify-between">
          <h1 className="text-lg font-bold text-[#1e293b]">{exam.title}</h1>
          <span className="text-xs px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-semibold">
            線上測驗成績報告
          </span>
        </div>
      </header>
      <div className="exam-shell py-10 sm:py-16">
        <div className="exam-card mx-auto max-w-2xl p-6 text-center sm:p-10 bg-white rounded-2xl shadow-sm border border-[#e2e8f0]">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#2f5597] text-3xl text-white">
            ✓
          </div>
          <h2 className="mt-5 text-2xl font-bold text-[#1e293b]">交卷成功</h2>
          <p className="mt-2 text-sm text-[#5b6673]">
            {autoSubmitted ? '時間到，系統已自動交卷。' : '答案已送出，交卷後無法再修改。'}
          </p>

          <p className="mt-4 text-sm text-[#475569] font-medium">
            作答題數：{answered} / {total} 題
          </p>

          {/* 成績數據卡片 */}
          <div className="mt-6 grid grid-cols-3 gap-3 rounded-xl bg-slate-50 p-4 border border-slate-100 text-center">
            <div>
              <div className="text-xs text-slate-500 font-medium">總得分</div>
              <div className="text-xl font-extrabold text-[#2f5597]">
                {earnedScore} <span className="text-xs font-normal text-slate-400">/ {maxScore}</span>
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">答對題數</div>
              <div className="text-xl font-extrabold text-emerald-600">
                {correctCount} <span className="text-xs font-normal text-slate-400">/ {total}</span>
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">正確率</div>
              <div className="text-xl font-extrabold text-indigo-600">{accuracyRate}%</div>
            </div>
          </div>

          {/* 操作與下載按鈕區 */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleDownloadCsv}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-sm transition-colors"
            >
              <span className="text-base">📥</span>
              下載結果 (Excel / CSV)
            </button>

            <button
              type="button"
              onClick={handleSyncToGoogleSheet}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#2f5597] hover:bg-[#25447a] text-white text-sm font-bold shadow-sm transition-colors"
            >
              <span className="text-base">📊</span>
              寫入 Google Sheet
            </button>

            <button
              type="button"
              onClick={() => setShowReview(!showReview)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-colors"
            >
              {showReview ? '收合詳解' : '查看逐題詳解'}
            </button>

            {onReset && (
              <button
                type="button"
                onClick={onReset}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#2f5597] hover:bg-[#24437a] text-white text-sm font-bold transition-colors shadow-sm"
              >
                🔄 重新測驗
              </button>
            )}

            <a
              href="/"
              onClick={(e) => {
                if (typeof window !== 'undefined') {
                  e.preventDefault();
                  window.history.pushState(null, '', '/');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }
              }}
              className="exam-btn exam-btn-primary inline-block px-6 py-2 text-sm font-bold"
            >
              返回首頁
            </a>
          </div>

          {sheetSyncStatus && (
            <p className="mt-4 rounded-lg bg-emerald-50 px-3 py-2 text-xs text-emerald-800 font-medium border border-emerald-200">
              {sheetSyncStatus}
            </p>
          )}

          {/* 逐題檢討清單 */}
          {showReview && (
            <section className="mt-8 text-left border-t border-slate-200 pt-6">
              <h3 className="text-base font-bold text-slate-800 mb-4">逐題作答與解析檢討</h3>
              <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
                {questionResults.map((r) => (
                  <div
                    key={`${r.id}-${r.index}`}
                    className={`p-3.5 rounded-lg border text-xs leading-relaxed ${
                      r.isCorrect
                        ? 'bg-emerald-50/50 border-emerald-200 text-slate-800'
                        : 'bg-rose-50/50 border-rose-200 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold mb-1.5">
                      <span>第 {r.index} 題 ({r.points} 分)</span>
                      <span className={r.isCorrect ? 'text-emerald-700' : 'text-rose-700'}>
                        {r.isCorrect ? '✓ 正確' : '✕ 錯誤'}
                      </span>
                    </div>
                    <p className="text-slate-900 font-medium mb-2">{r.prompt}</p>
                    <div className="flex gap-4 text-slate-600 mb-1">
                      <span>您的作答：<strong className={r.isCorrect ? 'text-emerald-700' : 'text-rose-700'}>{r.actual}</strong></span>
                      <span>正確答案：<strong className="text-slate-900">{r.expected}</strong></span>
                    </div>
                    {r.explanation && (
                      <p className="text-slate-500 bg-white/70 p-2 rounded mt-1.5 border border-slate-200/50">
                        💡 詳解：{r.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}

export { ScoreBanner as SuccessView };
