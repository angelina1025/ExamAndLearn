import React, { useState, useEffect, useRef } from 'react';
import {
  Clock,
  CloudCheck,
  Send,
  Flag,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  ShieldCheck,
  Video,
  Monitor,
  AlertTriangle,
  Eye,
  Check,
  Settings,
  Play,
  Pause,
  Plus,
  Minus,
  Timer as TimerIcon,
  Zap,
} from 'lucide-react';
import { ExamQuestion } from '../types';
import { ComplexityCheatsheetModal } from './ComplexityCheatsheetModal';

interface ExamViewProps {
  questions: ExamQuestion[];
  onFinishExam: (updatedQuestions: ExamQuestion[]) => void;
}

export const ExamView: React.FC<ExamViewProps> = ({ questions: initialQuestions, onFinishExam }) => {
  const [questions, setQuestions] = useState<ExamQuestion[]>(initialQuestions);
  const [currentIndex, setCurrentIndex] = useState<number>(13); // Default to question #14 (index 13) as in screenshot!
  
  // Timer States
  const [timeLimitMinutes, setTimeLimitMinutes] = useState<number>(30); // Default 30 mins limit
  const [timeLeft, setTimeLeft] = useState<number>(26 * 60 + 54); // 26:54 matching screenshot
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [showTimerModal, setShowTimerModal] = useState<boolean>(false);
  const [customMinutesInput, setCustomMinutesInput] = useState<string>('30');
  const [isTimeUp, setIsTimeUp] = useState<boolean>(false);

  const [showCheatsheet, setShowCheatsheet] = useState<boolean>(false);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [filterMarkedOnly, setFilterMarkedOnly] = useState<boolean>(false);
  const [filterUnansweredOnly, setFilterUnansweredOnly] = useState<boolean>(false);
  const [violations, setViolations] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showCameraStream, setShowCameraStream] = useState<boolean>(true);

  const currentQ = questions[currentIndex] || questions[0];
  const hasTriggeredTimeoutRef = useRef(false);

  // Countdown timer effect
  useEffect(() => {
    if (!isTimerRunning || isTimeUp) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isTimerRunning, isTimeUp]);

  // Handle Time Up: automatically finish exam and transition to score report
  useEffect(() => {
    if (timeLeft === 0 && !hasTriggeredTimeoutRef.current) {
      hasTriggeredTimeoutRef.current = true;
      setIsTimerRunning(false);
      setIsTimeUp(true);

      // Transition to score report after brief notice
      const timeout = setTimeout(() => {
        onFinishExam(questions);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [timeLeft, onFinishExam, questions]);

  // Window visibility switch detection (real proctoring listener)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setViolations((v) => v + 1);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleApplyNewTimer = (minutes: number) => {
    const totalSecs = Math.max(1, Math.round(minutes * 60));
    setTimeLimitMinutes(minutes);
    setTimeLeft(totalSecs);
    setIsTimerRunning(true);
    hasTriggeredTimeoutRef.current = false;
    setIsTimeUp(false);
    setShowTimerModal(false);
  };

  const handleAdjustTime = (secondsToAdd: number) => {
    setTimeLeft((prev) => Math.max(5, prev + secondsToAdd));
  };

  // Immediate time-up test simulation for user verification
  const handleSimulateTimeUp = () => {
    setShowTimerModal(false);
    setTimeLeft(0);
  };

  const handleSelectOption = (optionId: string) => {
    setQuestions((prev) =>
      prev.map((q, idx) => {
        if (idx === currentIndex) {
          return {
            ...q,
            userAnswer: optionId,
            status: optionId === q.correctAnswer ? 'correct' : 'wrong',
          };
        }
        return q;
      })
    );
  };

  const handleClearOption = () => {
    setQuestions((prev) =>
      prev.map((q, idx) => {
        if (idx === currentIndex) {
          const { userAnswer, ...rest } = q;
          return {
            ...rest,
            userAnswer: undefined,
            status: 'unanswered',
          };
        }
        return q;
      })
    );
  };

  const handleToggleFlag = () => {
    setQuestions((prev) =>
      prev.map((q, idx) => {
        if (idx === currentIndex) {
          return {
            ...q,
            isFlagged: !q.isFlagged,
          };
        }
        return q;
      })
    );
  };

  const answeredCount = questions.filter((q) => q.userAnswer !== undefined).length;
  const flaggedCount = questions.filter((q) => q.isFlagged).length;
  const unansweredCount = questions.length - answeredCount;
  const progressPercent = Math.round((answeredCount / questions.length) * 100);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div className="max-w-[1580px] mx-auto px-4 sm:px-6 py-4 space-y-4">
      {/* Top Header Row matching Image 3 */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>CS-302 資料結構與演算法 期中評量 (Data Structures Midterm...)</span>
          </h1>
          <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500">
            <span className="font-semibold text-slate-700">
              第 {currentIndex + 1} 題 / 共 {questions.length} 題
            </span>
            <span className="text-slate-300">•</span>
            <div className="w-32 bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.round((answeredCount / (questions.length || 1)) * 100)}%` }}
              />
            </div>
            <span className="font-semibold text-blue-600">
              {Math.round((answeredCount / (questions.length || 1)) * 100)}% 完成
            </span>
          </div>
        </div>

        {/* Timer & Controls */}
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center space-x-2.5 px-3.5 py-2 rounded-xl border transition-all ${
              timeLeft <= 60
                ? 'bg-rose-50 border-rose-300 ring-2 ring-rose-400/30'
                : timeLeft <= 300
                ? 'bg-amber-50 border-amber-300'
                : 'bg-blue-50/70 border-blue-200/80'
            }`}
          >
            <Clock
              className={`w-4 h-4 ${
                timeLeft <= 60
                  ? 'text-rose-600 animate-bounce'
                  : timeLeft <= 300
                  ? 'text-amber-600 animate-pulse'
                  : 'text-blue-600 animate-pulse'
              }`}
            />
            <div className="text-right">
              <div
                className={`text-[10px] font-medium leading-tight ${
                  timeLeft <= 60
                    ? 'text-rose-700'
                    : timeLeft <= 300
                    ? 'text-amber-700'
                    : 'text-blue-700'
                }`}
              >
                剩餘測驗時間
              </div>
              <div
                className={`text-lg font-mono font-bold leading-none ${
                  timeLeft <= 60
                    ? 'text-rose-700'
                    : timeLeft <= 300
                    ? 'text-amber-800'
                    : 'text-blue-900'
                }`}
              >
                {formatTime(timeLeft)}
              </div>
            </div>

            {/* Play/Pause & Settings buttons */}
            <div className="flex items-center space-x-1 pl-2 border-l border-slate-200/80">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="p-1 hover:bg-white/80 rounded-md text-slate-500 hover:text-slate-800 transition"
                title={isTimerRunning ? '暫停計時' : '繼續計時'}
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-blue-600" />}
              </button>
              <button
                onClick={() => {
                  setCustomMinutesInput(timeLimitMinutes.toString());
                  setShowTimerModal(true);
                }}
                className="p-1 hover:bg-white/80 rounded-md text-slate-500 hover:text-blue-600 transition flex items-center space-x-1"
                title="設定測驗限時"
              >
                <Settings className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <button
            onClick={() => {
              setCustomMinutesInput(timeLimitMinutes.toString());
              setShowTimerModal(true);
            }}
            className="hidden sm:flex items-center space-x-1 px-2.5 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-semibold transition cursor-pointer"
          >
            <TimerIcon className="w-3.5 h-3.5 text-blue-600" />
            <span>設定限時</span>
          </button>
        </div>
      </div>

      {/* Sub-bar: Auto-save status and Submit Exam button */}
      <div className="flex items-center justify-between bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs">
        <div className="flex items-center space-x-2 text-slate-600">
          <CloudCheck className="w-4 h-4 text-emerald-600" />
          <span>本機自動儲存於 14:22:05</span>
        </div>
        <button
          onClick={() => setShowSubmitModal(true)}
          className="flex items-center space-x-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 active:scale-98 text-white font-semibold rounded-lg shadow-sm shadow-red-500/20 transition cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
          <span>交卷送出 (Submit Exam)</span>
        </button>
      </div>

      {/* Main Grid: Question & Right Answer Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Current Question Area (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
            {/* Meta Tags */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 bg-blue-600 text-white text-xs font-bold rounded-md shadow-xs">
                  題號 #{currentQ.id}
                </span>
                <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-xs font-medium rounded-md">
                  {currentQ.typeLabel} ({currentQ.points}分)
                </span>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-md border border-emerald-200/50">
                  難度: {currentQ.difficultyLabel}
                </span>
                <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-md border border-indigo-100">
                  主題: {currentQ.topic}
                </span>
              </div>
              <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-mono">
                <Eye className="w-3.5 h-3.5" />
                <span>考生作答代號: TP-883902</span>
              </div>
            </div>

            {/* Question Stem */}
            <div className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
              {currentQ.prompt}
            </div>

            {/* Schematic Diagram (For Question 14 - AVL Diagram) */}
            {(currentQ.id === 14 || currentQ.hasDiagram) && (
              <div className="bg-slate-50/80 border border-slate-200 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-semibold text-slate-500 uppercase tracking-wide">
                    結構驗證圖 14-A (TREE INVARIANT SCHEMA)
                  </span>
                  <span className="font-medium text-blue-600">AVL 自平衡不變量展示</span>
                </div>

                {/* SVG Visual Schema matching Image 3 */}
                <div className="flex flex-col items-center justify-center py-4">
                  <div className="relative w-72 h-36">
                    {/* SVG Connecting Lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      <line x1="144" y1="28" x2="68" y2="88" stroke="#cbd5e1" strokeWidth="2.5" />
                      <line x1="144" y1="28" x2="220" y2="88" stroke="#cbd5e1" strokeWidth="2.5" />
                    </svg>

                    {/* Root Node */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 flex flex-col items-center">
                      <span className="text-[11px] font-semibold text-slate-700 mb-1">Root (h=2)</span>
                      <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shadow-md shadow-blue-500/20 text-sm">
                        20
                      </div>
                    </div>

                    {/* Left Child */}
                    <div className="absolute left-10 top-18 flex flex-col items-center">
                      <div className="w-11 h-11 rounded-full bg-white border-2 border-blue-400 text-blue-800 font-bold flex items-center justify-center shadow-xs text-sm">
                        10
                      </div>
                      <span className="text-[11px] font-mono font-medium text-slate-500 mt-1">BF = 0</span>
                    </div>

                    {/* Right Child */}
                    <div className="absolute right-10 top-18 flex flex-col items-center">
                      <div className="w-11 h-11 rounded-full bg-white border-2 border-blue-400 text-blue-800 font-bold flex items-center justify-center shadow-xs text-sm">
                        30
                      </div>
                      <span className="text-[11px] font-mono font-medium text-slate-500 mt-1">BF = 0</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 text-center mt-3 font-medium">
                    節點左右子樹高度差絕對值不超過 1，樹高約束維持於{' '}
                    <span className="font-mono text-slate-800 font-semibold">
                      h ≤ 1.44 log₂(n+2)
                    </span>
                  </p>
                </div>
              </div>
            )}

            {/* Options List */}
            <div className="space-y-3">
              {currentQ.options?.map((opt) => {
                const isSelected = currentQ.userAnswer === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-150 flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                    }`}
                  >
                    <div className="flex items-center space-x-3.5">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono transition ${
                          isSelected
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                      >
                        {opt.id}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 text-sm">{opt.text}</div>
                        {opt.subtext && (
                          <div className="text-xs text-slate-500 mt-0.5">{opt.subtext}</div>
                        )}
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition ${
                        isSelected
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-slate-300'
                      }`}
                    >
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation & Question Controls matching bottom of Image 3 */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <button
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none rounded-xl text-xs font-semibold text-slate-700 flex items-center space-x-1.5 transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>上一題 (Prev)</span>
                </button>

                <button
                  onClick={handleToggleFlag}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition ${
                    currentQ.isFlagged
                      ? 'bg-amber-100/80 text-amber-800 border border-amber-300/80'
                      : 'bg-slate-100 hover:bg-slate-200/70 text-slate-600'
                  }`}
                >
                  <Flag className={`w-3.5 h-3.5 ${currentQ.isFlagged ? 'fill-amber-600 text-amber-600' : ''}`} />
                  <span>{currentQ.isFlagged ? '已標記此題稍後檢查' : '標記此題稍後檢查'}</span>
                </button>

                <button
                  onClick={handleClearOption}
                  className="px-3 py-2 text-xs font-medium text-slate-500 hover:text-slate-800 flex items-center space-x-1 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>清除選項</span>
                </button>
              </div>

              <button
                disabled={currentIndex === questions.length - 1}
                onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white rounded-xl text-xs font-semibold shadow-xs shadow-blue-500/20 flex items-center space-x-1.5 transition cursor-pointer"
              >
                <span>下一題 (Next)</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bottom Cheatsheet Banner matching Image 3 */}
          <div className="bg-blue-50/70 border border-blue-200/70 rounded-2xl p-4 flex items-center justify-between gap-4">
            <div className="flex items-center space-x-3 text-xs text-blue-900">
              <BookOpen className="w-5 h-5 text-blue-600 shrink-0" />
              <div>
                <span className="font-bold">附錄參考資料：二元樹時間複雜度速查表 (Complexity Cheatsheet)</span>
                <p className="text-blue-700/80 text-[11px] mt-0.5">
                  點擊可於獨立右側浮層檢視漸進符號定義與推導依據
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowCheatsheet(true)}
              className="px-3.5 py-1.5 bg-white hover:bg-blue-50 text-blue-700 border border-blue-300 rounded-lg text-xs font-semibold whitespace-nowrap shadow-xs transition cursor-pointer"
            >
              查閱附錄
            </button>
          </div>
        </div>

        {/* Right Sidebar: 50 Answer Card Matrix & Proctoring (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Answer Matrix Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="font-bold text-slate-800 text-sm flex items-center space-x-1.5">
                <span className="text-blue-600 font-mono">品</span>
                <span>答題卡矩陣</span>
              </h2>
              <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-md border border-emerald-100">
                進度：{answeredCount} / {questions.length} 題
              </span>
            </div>

            {/* Status Legend */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center space-x-2 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-xs bg-emerald-600" />
                <span>已作答 ({answeredCount})</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-xs bg-blue-600" />
                <span>當前題目 (1)</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-xs bg-amber-500" />
                <span>標記複查 ({flaggedCount})</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-xs bg-slate-200 border border-slate-300" />
                <span>尚未作答 ({unansweredCount})</span>
              </div>
            </div>

            {/* Quick jump title */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium pt-1">
              <span>題號 01 - 50</span>
              <span>單擊快速跳轉</span>
            </div>

            {/* 50-grid matching Image 3: 5 columns x 10 rows layout */}
            <div className="grid grid-cols-5 gap-1.5 max-h-[340px] overflow-y-auto pr-1">
              {questions.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const isAnswered = q.userAnswer !== undefined;
                const isFlagged = q.isFlagged;

                // Match style from Image 3:
                // Green background for answered questions
                // Blue background for current question
                // Amber star or ring for flagged
                // Gray/White for unanswered
                let bgStyle = 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100';
                if (isCurrent) {
                  bgStyle = 'bg-blue-600 text-white border-blue-600 font-bold shadow-xs';
                } else if (isAnswered) {
                  bgStyle = 'bg-emerald-700 text-white border-emerald-700 font-semibold';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative h-8 rounded-md text-xs font-mono border transition flex items-center justify-center cursor-pointer ${bgStyle}`}
                  >
                    <span>{q.id.toString().padStart(2, '0')}</span>
                    {isFlagged && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Quick Filter checkboxes */}
            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                快速篩選檢視
              </span>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-1.5 cursor-pointer text-slate-700">
                  <input
                    type="checkbox"
                    checked={filterMarkedOnly}
                    onChange={(e) => setFilterMarkedOnly(e.target.checked)}
                    className="rounded text-blue-600 border-slate-300 focus:ring-blue-500 w-3.5 h-3.5"
                  />
                  <span>僅看標記題 ({flaggedCount})</span>
                </label>
                <label className="flex items-center space-x-1.5 cursor-pointer text-slate-700">
                  <input
                    type="checkbox"
                    checked={filterUnansweredOnly}
                    onChange={(e) => setFilterUnansweredOnly(e.target.checked)}
                    className="rounded text-blue-600 border-slate-300 focus:ring-blue-500 w-3.5 h-3.5"
                  />
                  <span>未作答題 ({unansweredCount})</span>
                </label>
              </div>
            </div>
          </div>

          {/* Online Proctoring Status Card matching bottom right of Image 3 */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="font-bold text-slate-800 text-xs">線上防弊監考運作中</span>
              </div>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono font-semibold">
                ACTIVE
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">視窗切換偵測：</span>
                <span className={`font-semibold font-mono ${violations > 0 ? 'text-rose-600' : 'text-slate-800'}`}>
                  {violations} 次違規
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">全螢幕鎖定：</span>
                <button
                  onClick={toggleFullscreen}
                  className="font-semibold text-emerald-600 hover:text-emerald-700 flex items-center space-x-1"
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>{isFullscreen ? '鎖定運作中' : '已啟動 (Lockdown)'}</span>
                </button>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-slate-500">監考鏡頭串流：</span>
                <button
                  onClick={() => setShowCameraStream(!showCameraStream)}
                  className="font-semibold text-emerald-600 hover:text-emerald-700 flex items-center space-x-1"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>連線良好 (720p)</span>
                </button>
              </div>
            </div>

            {/* Simulated mini proctoring camera view */}
            {showCameraStream && (
              <div className="relative mt-2 rounded-lg bg-slate-900 h-24 overflow-hidden flex items-center justify-center border border-slate-800">
                <div className="absolute top-2 left-2 flex items-center space-x-1 bg-black/60 px-1.5 py-0.5 rounded text-[10px] text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span>REC · 24fps</span>
                </div>
                <div className="flex flex-col items-center justify-center text-slate-400 text-[11px]">
                  <Video className="w-6 h-6 text-slate-500 mb-1" />
                  <span>考生 AI 臉部注視點分析正常</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cheatsheet Modal */}
      <ComplexityCheatsheetModal
        isOpen={showCheatsheet}
        onClose={() => setShowCheatsheet(false)}
      />

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-red-100 text-red-600">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">確認交卷送出試卷？</h3>
                <p className="text-xs text-slate-500">送出後將立即結算總分並產出錯題精準診斷報告。</p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between text-slate-700">
                <span>總題目數：</span>
                <span className="font-semibold">{questions.length} 題</span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>已作答完成：</span>
                <span className="font-semibold">{answeredCount} 題</span>
              </div>
              <div className="flex justify-between text-rose-600">
                <span>尚未作答：</span>
                <span className="font-semibold">{unansweredCount} 題</span>
              </div>
              <div className="flex justify-between text-amber-700">
                <span>標記複查：</span>
                <span className="font-semibold">{flaggedCount} 題</span>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-semibold transition"
              >
                繼續作答
              </button>
              <button
                onClick={() => {
                  setShowSubmitModal(false);
                  onFinishExam(questions);
                }}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold shadow-sm transition"
              >
                確認送出並查看分析
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Countdown Timer Settings Modal */}
      {showTimerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-200 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">測驗限時倒數設定</h3>
                  <p className="text-xs text-slate-500">自訂測驗限時，時間結束時將自動強制交卷</p>
                </div>
              </div>
              <button
                onClick={() => setShowTimerModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg text-xs"
              >
                ✕
              </button>
            </div>

            {/* Current Status */}
            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 font-medium">目前剩餘作答時間</span>
                <div className="text-xl font-mono font-bold text-slate-900 mt-0.5">
                  {formatTime(timeLeft)}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleAdjustTime(60)}
                  className="px-2 py-1 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg text-xs font-semibold text-slate-700"
                >
                  +1 分
                </button>
                <button
                  onClick={() => handleAdjustTime(300)}
                  className="px-2 py-1 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg text-xs font-semibold text-slate-700"
                >
                  +5 分
                </button>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 block">
                常用測驗限時預設（點擊直接設定）：
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[15, 30, 45, 60].map((mins) => (
                  <button
                    key={mins}
                    onClick={() => {
                      setCustomMinutesInput(mins.toString());
                      handleApplyNewTimer(mins);
                    }}
                    className={`py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                      timeLimitMinutes === mins
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {mins} 分鐘
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block">
                自訂測驗時長 (分鐘)：
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="1"
                  max="300"
                  value={customMinutesInput}
                  onChange={(e) => setCustomMinutesInput(e.target.value)}
                  className="flex-1 p-2.5 rounded-xl border border-slate-200 text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="輸入分鐘數..."
                />
                <button
                  onClick={() => {
                    const mins = parseFloat(customMinutesInput) || 30;
                    handleApplyNewTimer(mins);
                  }}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition cursor-pointer"
                >
                  套用限時
                </button>
              </div>
            </div>

            {/* Instant Timeout Simulation for Testing */}
            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={handleSimulateTimeUp}
                className="w-full py-2 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 text-rose-600" />
                <span>立即模擬時間到（測試自動交卷並跳轉）</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Time's Up Auto-Submission Overlay */}
      {isTimeUp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center space-y-4 border border-rose-200 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-md">
              <Clock className="w-8 h-8 animate-bounce" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-black text-slate-900">⏰ 測驗時間截止！</h3>
              <p className="text-xs text-slate-500">
                作答時間已用罄，系統已自動儲存您所有已填寫之答題卡。
              </p>
            </div>
            <div className="p-3 bg-rose-50 rounded-xl border border-rose-100 text-xs text-rose-800 font-medium flex items-center justify-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span>正在結算成績並跳轉至評量分析報告...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
