import React, { useState } from 'react';
import {
  RotateCcw,
  Download,
  BookmarkPlus,
  HelpCircle,
  Clock,
  CheckCircle2,
  XCircle,
  Key,
  Anchor,
  ChevronDown,
  ChevronUp,
  FileCheck,
  Check,
  Printer,
  Sparkles,
  ArrowUpDown,
  BookOpen,
} from 'lucide-react';
import { ExamQuestion } from '../types';

interface AnalysisViewProps {
  questions: ExamQuestion[];
  onRetestWrong: () => void;
  onNavigateToExam: () => void;
}

type TabFilter = 'all' | 'mistakes' | 'flagged' | 'hard';

export const AnalysisView: React.FC<AnalysisViewProps> = ({
  questions,
  onRetestWrong,
  onNavigateToExam,
}) => {
  const [activeTab, setActiveTab] = useState<TabFilter>('mistakes');
  const [expandedSolutions, setExpandedSolutions] = useState<Record<number, boolean>>({
    7: true,
    12: true,
    23: true,
  });
  const [savedToNotebook, setSavedToNotebook] = useState<Record<number, boolean>>({
    7: true,
    12: true,
    23: true,
  });
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [showPlanToast, setShowPlanToast] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);

  const toggleSolution = (id: number) => {
    setExpandedSolutions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleNotebook = (id: number) => {
    setSavedToNotebook((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Filter questions based on active tab
  const filteredQuestions = questions.filter((q) => {
    if (activeTab === 'mistakes') return q.status === 'wrong';
    if (activeTab === 'flagged') return q.isFlagged;
    if (activeTab === 'hard') return q.difficulty === 'hard';
    return true; // all
  });

  const correctCount = questions.filter((q) => q.status === 'correct').length;
  const wrongCount = questions.filter((q) => q.status === 'wrong').length;
  const flaggedCount = questions.filter((q) => q.isFlagged).length;
  const hardCount = questions.filter((q) => q.difficulty === 'hard').length;
  const totalCount = questions.length || 1;

  // Real score calculation
  const totalPoints = questions.reduce((acc, q) => acc + (q.points || 2.0), 0);
  const earnedPoints = questions
    .filter((q) => q.status === 'correct')
    .reduce((acc, q) => acc + (q.points || 2.0), 0);
  const scorePercent = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;
  const displayScore = Math.round(earnedPoints * 10) / 10;
  const isPassed = scorePercent >= 60;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-[1580px] mx-auto px-4 sm:px-6 py-4 space-y-6">
      {/* Top Score & Performance Summary Banner matching Image 1 */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        {/* Left score dial */}
        <div className="flex items-center space-x-6">
          <div className="relative w-24 h-24 flex items-center justify-center">
            {/* Circular Gauge SVG */}
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="40"
                className="text-slate-100 stroke-current"
                strokeWidth="7"
                fill="none"
              />
              <circle
                cx="48"
                cy="48"
                r="40"
                className="text-blue-600 stroke-current transition-all duration-1000 ease-out"
                strokeWidth="7"
                strokeDasharray={251.2}
                strokeDashoffset={251.2 * (1 - scorePercent / 100)}
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-[10px] text-slate-400 font-medium">總分</span>
              <span className="text-2xl font-black text-blue-600 tracking-tight leading-none">
                {displayScore}
              </span>
              <span className="text-[10px] text-slate-400">/ {totalPoints}</span>
            </div>
          </div>

          <div>
            <div className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border mb-1 ${
              isPassed
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
                : 'bg-rose-50 text-rose-700 border-rose-200/60'
            }`}>
              {isPassed ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
              <span>{isPassed ? '測驗及格 Passed' : '未達標準 Need Review'}</span>
            </div>
            <h2 className="text-base font-bold text-slate-900">高階演算法與資料結構...</h2>
            <p className="text-xs text-slate-400 mt-0.5">CS-302 期中評量測驗結算報告</p>
          </div>
        </div>

        {/* Middle Key Metrics */}
        <div className="grid grid-cols-3 gap-6 sm:gap-10 border-y xl:border-y-0 xl:border-x border-slate-100 py-4 xl:py-0 xl:px-8">
          <div>
            <div className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <span>答題正確率</span>
              <span className="text-blue-600 font-bold">%</span>
            </div>
            <div className="text-2xl font-black text-slate-900 mt-1">{scorePercent}%</div>
            <div className="text-[11px] text-slate-400 mt-0.5 font-medium">{correctCount} / {questions.length} 題正確</div>
          </div>

          <div>
            <div className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <span>總花費時間</span>
              <Clock className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <div className="text-2xl font-black text-slate-900 mt-1">38分</div>
            <div className="text-[11px] text-slate-400 mt-0.5 font-medium">均題 45 秒</div>
          </div>

          <div>
            <div className="text-xs text-rose-600 font-medium flex items-center gap-1">
              <span>待加強錯題</span>
              <HelpCircle className="w-3.5 h-3.5 text-rose-500" />
            </div>
            <div className="text-2xl font-black text-rose-600 mt-1">{wrongCount} 題</div>
            <div className="text-[11px] text-slate-400 mt-0.5 font-medium">需立即鞏固</div>
          </div>
        </div>

        {/* Right CTA Actions matching Image 1 */}
        <div className="flex flex-wrap xl:flex-nowrap items-center gap-3">
          <button
            onClick={onRetestWrong}
            className="flex-1 xl:flex-none flex items-center justify-center space-x-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white text-xs font-semibold rounded-xl shadow-md shadow-blue-500/25 transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>重測 {wrongCount} 題錯題</span>
          </button>

          <button
            onClick={() => setShowPdfModal(true)}
            className="flex items-center space-x-1.5 px-3.5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold transition cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>匯出 PDF</span>
          </button>

          <button
            onClick={() => {
              setShowPlanToast(true);
              setTimeout(() => setShowPlanToast(false), 3000);
            }}
            className="flex items-center space-x-1.5 px-3.5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold transition cursor-pointer"
          >
            <BookmarkPlus className="w-4 h-4 text-slate-500" />
            <span>加複習計畫</span>
          </button>
        </div>
      </div>

      {/* Main Analysis Section: Left Questions list & Right 50-item Answer Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Diagnostic Radar & Question Breakdown */}
        <div className="lg:col-span-8 space-y-5">
          {/* Sub Navigation Tabs matching Image 1 */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-2">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setActiveTab('all')}
                className={`text-sm font-medium transition cursor-pointer pb-2 relative ${
                  activeTab === 'all'
                    ? 'text-blue-600 font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                全部題目 ({questions.length})
                {activeTab === 'all' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('mistakes')}
                className={`text-sm font-medium transition cursor-pointer pb-2 relative flex items-center space-x-1.5 ${
                  activeTab === 'mistakes'
                    ? 'text-blue-600 font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>錯題診斷專區 ({wrongCount})</span>
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                {activeTab === 'mistakes' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('flagged')}
                className={`text-sm font-medium transition cursor-pointer pb-2 relative ${
                  activeTab === 'flagged'
                    ? 'text-blue-600 font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                標記題目 ({flaggedCount})
                {activeTab === 'flagged' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('hard')}
                className={`text-sm font-medium transition cursor-pointer pb-2 relative ${
                  activeTab === 'hard'
                    ? 'text-blue-600 font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                高難度挑戰 ({hardCount})
                {activeTab === 'hard' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </button>
            </div>

            <div className="flex items-center space-x-1 text-xs text-slate-500 cursor-pointer hover:text-slate-800">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>依考點分類</span>
            </div>
          </div>

          {/* 知識點精準診斷雷達 matching Image 1 */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span className="font-bold text-slate-800 text-xs sm:text-sm">
                  知識點精準診斷雷達
                </span>
              </div>
              <span className="text-[11px] text-slate-400">根據難度加權評定</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Card 1: 排序演算法 */}
              <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-900 text-xs">排序演算法 (Sorting)</div>
                </div>
                <div className="px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-xs font-bold">
                  90% 精熟
                </div>
              </div>

              {/* Card 2: 二元樹與堆積 */}
              <div className="p-3.5 rounded-xl border border-rose-100 bg-rose-50/30 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-900 text-xs">二元樹與堆積 (Heap/BST)</div>
                </div>
                <div className="px-2.5 py-1 rounded-md bg-rose-50 border border-rose-200/60 text-rose-700 text-xs font-bold">
                  60% 待加強
                </div>
              </div>

              {/* Card 3: 圖論與搜尋 */}
              <div className="p-3.5 rounded-xl border border-blue-100 bg-blue-50/30 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-900 text-xs">圖論與搜尋 (Graph Search)</div>
                </div>
                <div className="px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-bold">
                  85% 良好
                </div>
              </div>
            </div>
          </div>

          {/* Mistakes List matching 錯題 #07, 錯題 #12 in Image 1 */}
          <div className="space-y-4">
            {filteredQuestions.map((q) => {
              const isExpanded = expandedSolutions[q.id] ?? true;
              const isSaved = savedToNotebook[q.id] ?? false;
              const isCorrect = q.status === 'correct';
              const isWrong = q.status === 'wrong';
              const isUnanswered = q.status === 'unanswered' || !q.userAnswer;

              return (
                <div
                  key={q.id}
                  id={`q-${q.id}`}
                  className={`bg-white rounded-2xl border transition shadow-xs p-6 space-y-4 ${
                    selectedQuestionId === q.id
                      ? 'border-blue-500 ring-2 ring-blue-500/20'
                      : isCorrect
                      ? 'border-slate-200/90'
                      : isWrong
                      ? 'border-rose-200/90'
                      : 'border-slate-200/90'
                  }`}
                >
                  {/* Card Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
                    <div className="flex items-center space-x-2">
                      {isCorrect ? (
                        <span className="px-2.5 py-0.5 rounded-md bg-emerald-600 text-white text-xs font-bold flex items-center space-x-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>答對題 #{q.id.toString().padStart(2, '0')}</span>
                        </span>
                      ) : isWrong ? (
                        <span className="px-2.5 py-0.5 rounded-md bg-rose-500 text-white text-xs font-bold">
                          錯題 #{q.id.toString().padStart(2, '0')}
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-md bg-slate-400 text-white text-xs font-bold">
                          未作答 #{q.id.toString().padStart(2, '0')}
                        </span>
                      )}

                      <span className="text-xs font-medium text-slate-600">
                        {q.topic}
                      </span>

                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                          isCorrect
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
                            : isWrong
                            ? 'bg-rose-50 text-rose-700 border-rose-200/60'
                            : 'bg-slate-100 text-slate-500 border-slate-200'
                        }`}
                      >
                        {isCorrect
                          ? `得分 ${q.points.toFixed(1)} / ${q.points.toFixed(1)} 分`
                          : `配分 ${q.points.toFixed(1)} 分 (得 0 分)`}
                      </span>
                    </div>

                    <button
                      onClick={() => toggleNotebook(q.id)}
                      className={`text-xs flex items-center space-x-1.5 transition ${
                        isSaved ? 'text-emerald-700 font-medium' : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      <CheckCircle2 className={`w-3.5 h-3.5 ${isSaved ? 'text-emerald-600' : 'text-slate-300'}`} />
                      <span>{isSaved ? '已收錄至生詞錯題本' : '收錄至生詞錯題本'}</span>
                    </button>
                  </div>

                  {/* Stem */}
                  <div className="text-sm sm:text-base font-medium text-slate-900 leading-relaxed">
                    {q.prompt}
                  </div>

                  {/* Answer Comparison Boxes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* User Answer Box */}
                    {isCorrect ? (
                      <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/60 space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-emerald-800 flex items-center space-x-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>您的作答 (回答正確)</span>
                          </span>
                          <span className="font-mono text-emerald-700 font-bold bg-white px-2 py-0.5 rounded border border-emerald-200">
                            選項 {q.userAnswer}
                          </span>
                        </div>
                        <div className="font-bold text-slate-900 text-sm">
                          {q.options?.find((o) => o.id === q.userAnswer)?.text || 'O(log n)'}
                        </div>
                        <p className="text-xs text-emerald-700/90 leading-normal">
                          恭喜作答完全正確！精準掌握本考點之定義與運算邊界特性。
                        </p>
                      </div>
                    ) : isWrong ? (
                      <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/40 space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-rose-600 flex items-center space-x-1">
                            <XCircle className="w-3.5 h-3.5" />
                            <span>您的答案 (作答錯誤)</span>
                          </span>
                          <span className="font-mono text-rose-500 font-semibold">
                            選項 {q.userAnswer || 'A'}
                          </span>
                        </div>
                        <div className="font-bold text-slate-900 text-sm">
                          {q.options?.find((o) => o.id === q.userAnswer)?.text || 'O(n log n)'}
                        </div>
                        <p className="text-xs text-slate-500 leading-normal">
                          {q.userWrongReason || '誤將最壞情況的分割與最佳遞迴樹深度相混淆。'}
                        </p>
                      </div>
                    ) : (
                      <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-slate-500">您的答案 (尚未作答)</span>
                          <span className="font-mono text-slate-400">未選</span>
                        </div>
                        <div className="font-medium text-slate-400 text-sm">此題未在時間內完成作答</div>
                        <p className="text-xs text-slate-400 leading-normal">
                          測驗結束時尚未填寫此題選項。
                        </p>
                      </div>
                    )}

                    {/* Standard Correct Answer (Green/Blue Box) */}
                    <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-emerald-700 flex items-center space-x-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>正確解答 (標準答案)</span>
                        </span>
                        <span className="font-mono text-emerald-600 font-semibold">
                          選項 {q.correctAnswer}
                        </span>
                      </div>
                      <div className="font-bold text-slate-900 text-sm">
                        {q.options?.find((o) => o.id === q.correctAnswer)?.text || 'O(n²) 最壞劃分情況'}
                      </div>
                      <p className="text-xs text-slate-500 leading-normal">
                        {q.standardReason || '每次選中最大或最小值，遞迴深度退化為 n，累積 n + (n-1) + ... + 1。'}
                      </p>
                    </div>
                  </div>

                  {/* Collapsible Detailed Explanation matching Image 1 */}
                  <div className="pt-2">
                    <div className="border border-slate-100 rounded-xl bg-slate-50/60 p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
                          <BookOpen className="w-4 h-4 text-blue-600" />
                          <span>
                            {q.id === 12
                              ? '核心觀念剖析 (Concept Breakdown)'
                              : '詳解與知識點解析 (Explanation & Solution)'}
                          </span>
                        </div>
                        <button
                          onClick={() => toggleSolution(q.id)}
                          className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1"
                        >
                          <span>{isExpanded ? '收合解析' : '展開解析'}</span>
                          {isExpanded ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                      {isExpanded && (
                        <div className="space-y-3 pt-2 text-xs text-slate-700 leading-relaxed">
                          <p>
                            {q.conceptBreakdown ||
                              q.explanation ||
                              '本題考查核心分割與邊界條件。在無額外索引結構輔助下，必須進行全域掃描。'}
                          </p>

                          {/* Key Takeaway or Memory Anchor */}
                          {q.keyTakeaway && (
                            <div className="p-3 bg-white rounded-lg border border-slate-200/80 text-xs space-y-1">
                              <span className="font-bold text-slate-900 flex items-center space-x-1 text-amber-700">
                                <Key className="w-3.5 h-3.5 text-amber-600" />
                                <span>關鍵記憶點 (Key Takeaway)</span>
                              </span>
                              <p className="text-slate-600 pl-4">{q.keyTakeaway}</p>
                            </div>
                          )}

                          {q.memoryAnchor && (
                            <div className="p-3 bg-white rounded-lg border border-slate-200/80 text-xs space-y-1">
                              <span className="font-bold text-slate-900 flex items-center space-x-1 text-indigo-700">
                                <Anchor className="w-3.5 h-3.5 text-indigo-600" />
                                <span>知識記憶錨點 (Memory Anchor)</span>
                              </span>
                              <p className="text-slate-600 pl-4">{q.memoryAnchor}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (4 cols): 50-Item Response Distribution Matrix matching Image 1 */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4 sticky top-20">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-sm flex items-center space-x-1.5">
                <span className="text-blue-600 font-mono">品</span>
                <span>試題作答分布矩陣</span>
              </h3>
              <span className="text-xs text-slate-500 font-medium">共 50 題</span>
            </div>

            {/* Legend matching Image 1 */}
            <div className="flex items-center justify-between text-xs pb-1">
              <div className="flex items-center space-x-1.5 text-slate-600">
                <span className="w-3 h-3 rounded-xs bg-emerald-700" />
                <span>正確 ({correctCount})</span>
              </div>
              <div className="flex items-center space-x-1.5 text-slate-600">
                <span className="w-3 h-3 rounded-xs bg-red-600" />
                <span>錯誤 ({wrongCount})</span>
              </div>
              <div className="flex items-center space-x-1.5 text-slate-600">
                <span className="w-3 h-3 rounded-xs bg-amber-500" />
                <span>有標記 ({flaggedCount})</span>
              </div>
            </div>

            {/* 50 Interactive Matrix Grid matching Image 1 (5 columns x 10 rows) */}
            <div className="grid grid-cols-5 gap-1.5">
              {questions.map((q) => {
                const isWrong = q.status === 'wrong';
                const isCorrect = q.status === 'correct';
                const isSelected = selectedQuestionId === q.id;

                let cardStyle = 'bg-slate-300 text-slate-700 font-medium';
                if (isCorrect) {
                  cardStyle = 'bg-emerald-700 text-white font-semibold';
                } else if (isWrong) {
                  cardStyle = 'bg-red-600 text-white font-bold';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setSelectedQuestionId(q.id);
                      const el = document.getElementById(`q-${q.id}`);
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      } else {
                        // Switch to all tab if not currently visible
                        setActiveTab('all');
                        setTimeout(() => {
                          const target = document.getElementById(`q-${q.id}`);
                          target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }, 100);
                      }
                    }}
                    className={`relative h-8 rounded-md text-xs font-mono transition flex items-center justify-center cursor-pointer ${cardStyle} ${
                      isSelected ? 'ring-2 ring-offset-2 ring-blue-600' : 'hover:opacity-90'
                    }`}
                  >
                    <span>{q.id.toString().padStart(2, '0')}</span>
                    {q.isFlagged && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-white" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-2 text-[11px] text-slate-400 text-center">
              點選題號方塊可即時聚焦檢視該題作答剖析
            </div>

            {/* Quick action button inside card */}
            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={onRetestWrong}
                className="w-full py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>立即開啟錯題重測模式</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Export Modal */}
      {showPdfModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <FileCheck className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-base">匯出個人化測驗診斷分析報告</h3>
              </div>
              <button
                onClick={() => setShowPdfModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <p>
                系統將彙整包含作答正確率 (84%)、總分 84 分、8 道錯題詳解與知識記憶錨點等完整考情報告，格式支援標準 A4 彩色印刷排版。
              </p>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5">
                <div className="flex justify-between">
                  <span>檔案名稱：</span>
                  <span className="font-mono font-semibold">CS302_Midterm_Analysis_TP883902.pdf</span>
                </div>
                <div className="flex justify-between">
                  <span>產出範圍：</span>
                  <span className="font-semibold">完整 50 題 + 錯題深度專區</span>
                </div>
                <div className="flex justify-between">
                  <span>防偽雜湊：</span>
                  <span className="font-mono text-slate-400">SHA256: 7f8a9c...3d2e</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-3">
              <button
                onClick={() => setShowPdfModal(false)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                取消
              </button>
              <button
                onClick={() => {
                  handlePrint();
                  setShowPdfModal(false);
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>立即列印 / 下載 PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Plan Toast */}
      {showPlanToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center space-x-3 text-xs animate-in slide-in-from-bottom-5">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>已將 8 道待鞏固錯題加入「艾賓浩斯間隔複習」第 1 週期計畫！</span>
        </div>
      )}
    </div>
  );
};
