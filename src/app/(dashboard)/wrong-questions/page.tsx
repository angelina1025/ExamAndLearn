'use client';

import React, { useState, useEffect } from 'react';
import type { UserProfile, Question } from '@/types';
import { ImportUploader } from '@/app/(dashboard)/wrong-questions/_components/ImportUploader';
import { TrendStatsChart } from '@/app/(dashboard)/wrong-questions/_components/TrendStatsChart';
import { RetestActionCard } from '@/app/(dashboard)/wrong-questions/_components/RetestActionCard';
import { parseWrongQuestionsExcel } from '@/utils/fileParsers';

interface WrongQuestionsPageProps {
  currentUser?: UserProfile | null;
  onNavigate?: (page: string) => void;
}

export default function WrongQuestionsPage({
  currentUser,
  onNavigate,
}: WrongQuestionsPageProps = {}) {
  const [wrongQuestions, setWrongQuestions] = useState<Question[]>([]);
  const [importMessage, setImportMessage] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('quiz_wrong_questions_book');
        if (saved) {
          setWrongQuestions(JSON.parse(saved));
        }
      } catch {}
    }
  }, []);

  const handleImportFile = async (file: File) => {
    try {
      setImportMessage(`正在解析檔案「${file.name}」...`);
      const { questions, wrongRecords } = await parseWrongQuestionsExcel(file);

      if (questions.length === 0) {
        alert('檔案中未找到任何有效之錯題資料，請確認檔案格式是否正確。');
        setImportMessage('');
        return;
      }

      setWrongQuestions((prev) => {
        const combined = [...questions, ...prev];
        const map = new Map<string, Question>();
        combined.forEach((q) => map.set(q.id, q));
        const unique = Array.from(map.values());
        try {
          localStorage.setItem('quiz_wrong_questions_book', JSON.stringify(unique));
        } catch {}
        return unique;
      });

      setImportMessage(`✅ 成功匯入 ${questions.length} 道錯題！已自動收錄至錯題本中。`);
      alert(`🎉 成功匯入 ${questions.length} 題錯題！\n您可於上方直接點擊「開始錯題重測」進行二次練習。`);
    } catch (err: any) {
      alert(`匯入錯題檔案失敗：${err?.message || '未知錯誤'}`);
      setImportMessage('');
    }
  };

  const handleStartRetest = () => {
    if (wrongQuestions.length === 0) {
      alert('目前錯題本中尚無試題，請先上傳成果匯出的錯題 Excel 檔！');
      return;
    }

    const newId = `RETEST-${Date.now().toString().slice(-6)}`;
    const newPaper = {
      id: newId,
      title: `錯題二次重測練習卷 (${wrongQuestions.length} 題)`,
      description: `由歷史錯題本匯入之弱點強化測驗`,
      subject: wrongQuestions[0]?.subjectId || '綜合',
      subjectId: wrongQuestions[0]?.subjectId || 'math',
      difficultyLv: 3,
      questionCount: wrongQuestions.length,
      totalScore: wrongQuestions.reduce((s, q) => s + (q.points || 5), 0),
      durationMinutes: Math.max(10, wrongQuestions.length * 2),
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      status: 'published' as const,
      questionIds: wrongQuestions.map((q) => q.id),
      sourceScope: 'private' as const,
    };

    if (typeof window !== 'undefined') {
      try {
        const existingExams = JSON.parse(localStorage.getItem('quiz_custom_exams') || '[]');
        localStorage.setItem('quiz_custom_exams', JSON.stringify([newPaper, ...existingExams]));

        const existingQuestions = JSON.parse(localStorage.getItem('quiz_custom_questions') || '[]');
        const qMap = new Map();
        [...wrongQuestions, ...existingQuestions].forEach((q) => qMap.set(q.id, q));
        localStorage.setItem('quiz_custom_questions', JSON.stringify(Array.from(qMap.values())));
      } catch {}
    }

    if (
      window.confirm(
        `🎉 已為您成功生成專屬錯題試卷「${newPaper.title}」！\n共 ${wrongQuestions.length} 題，總分 ${newPaper.totalScore} 分。\n\n是否立即前往開始測驗？`
      )
    ) {
      window.location.href = `/exam/${newPaper.id}`;
    }
  };

  const handleClearWrongBook = () => {
    if (window.confirm('確定要清空目前收錄的錯題本嗎？')) {
      setWrongQuestions([]);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('quiz_wrong_questions_book');
      }
      setImportMessage('已清空錯題本。');
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto flex flex-col gap-5">
      <div>
        <h1 className="text-xl font-extrabold text-[#191c1d]">錯題本與弱點分析</h1>
        <p className="text-xs text-[#434655] mt-1">
          支援匯入測驗成果匯出之「錯題檢討 Excel (.xlsx)」，自動彙整易錯題目並可一鍵重測
        </p>
      </div>

      {importMessage && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-800 font-medium flex items-center justify-between">
          <span>{importMessage}</span>
          <button
            onClick={() => setImportMessage('')}
            className="text-blue-500 hover:text-blue-700 font-bold ml-2 cursor-pointer"
            type="button"
          >
            ✕
          </button>
        </div>
      )}

      {/* 錯題重測卡片 */}
      <RetestActionCard
        wrongQuestionCount={wrongQuestions.length}
        onStartRetest={handleStartRetest}
      />

      <TrendStatsChart items={[]} />

      {/* 匯入上傳卡片 */}
      <ImportUploader
        currentUser={currentUser}
        onNavigate={onNavigate}
        onImportFile={handleImportFile}
      />

      {/* 錯題清單檢視 */}
      {wrongQuestions.length > 0 && (
        <div className="bg-white rounded-2xl border border-[#c3c6d7]/40 p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#191c1d]">
                已收錄待複習錯題清單 ({wrongQuestions.length} 題)
              </h3>
              <p className="text-xs text-[#737686] mt-0.5">
                可逐題檢視題目與正解，或點擊上方「開始錯題重測」進行加強訓練
              </p>
            </div>
            <button
              onClick={handleClearWrongBook}
              type="button"
              className="text-xs text-red-600 hover:text-red-800 font-semibold px-3 py-1.5 rounded-lg border border-red-200 hover:bg-red-50 transition-colors cursor-pointer"
            >
              清空錯題本
            </button>
          </div>

          <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto pr-1">
            {wrongQuestions.map((q, idx) => (
              <div key={q.id || idx} className="py-3 text-xs flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-900">
                    第 {idx + 1} 題 ({q.subjectId || '綜合'})
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                    正解：{q.correctAnswer}
                  </span>
                </div>
                <p className="text-gray-800 font-medium leading-relaxed">{q.content}</p>
                {q.explanation && (
                  <div className="p-2 bg-gray-50 rounded-lg text-gray-600 text-[11px] leading-relaxed">
                    <span className="font-bold text-gray-700">解析：</span>
                    {q.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
