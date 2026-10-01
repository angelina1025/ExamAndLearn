import React, { useState } from 'react';
import {
  FileText,
  Clock,
  Sparkles,
  Layers,
  ChevronDown,
  Play,
  ShieldCheck,
  Award,
  BookOpen,
  Filter,
  CheckCircle2,
  AlertCircle,
  Cpu,
  Globe,
  Terminal,
  FolderTree,
  ArrowRight,
  Zap,
  RotateCcw,
  Shuffle,
} from 'lucide-react';
import { ExamQuestion } from '../types';
import { shuffleArray } from '../utils/shuffle';

export interface ExamSubject {
  id: string;
  name: string;
  code: string;
  categories: string[];
  description: string;
  badge: string;
  recommendedTime: number; // minutes
}

export const EXAM_SUBJECTS: ExamSubject[] = [
  {
    id: 'all',
    name: '全科綜合模擬檢定 (全領域總卷)',
    code: 'EXAM-ALL',
    categories: [],
    description: '涵蓋電腦科學、資料結構、演算法、作業系統、網路與軟體工程之綜合評量模擬考卷。',
    badge: '綜合考卷',
    recommendedTime: 40,
  },
  {
    id: 'dsa',
    name: '資料結構與演算法 (Data Structures & Algorithms)',
    code: 'CS-302',
    categories: ['資料結構與演算法', '排序與搜尋演算法', '樹狀結構與平衡樹', '圖論與搜尋'],
    description: '深入測驗二元平衡樹、Min-Heap、QuickSelect、動態規劃及漸近時間空間複雜度。',
    badge: '核心必修',
    recommendedTime: 30,
  },
  {
    id: 'sorting',
    name: '排序與搜尋演算法 (Sorting & Searching)',
    code: 'CS-302-A',
    categories: ['排序與搜尋演算法'],
    description: '聚焦於快速排序、合併排序、堆積排序、二元搜尋及演算法穩定性分析題型。',
    badge: '演算法模組',
    recommendedTime: 20,
  },
  {
    id: 'trees',
    name: '樹狀結構與平衡樹 (Trees & Heap)',
    code: 'CS-302-B',
    categories: ['樹狀結構與平衡樹'],
    description: '包含 AVL 樹旋轉平衡因子、紅黑樹不變量、二元搜尋樹與最小堆積性質驗證。',
    badge: '進階資料結構',
    recommendedTime: 25,
  },
  {
    id: 'os',
    name: '作業系統原理 (Operating Systems)',
    code: 'CS-204',
    categories: ['作業系統原理'],
    description: '涵蓋行程排班、虛擬記憶體分頁、死結 (Deadlock) 與多執行緒同步互斥鎖。',
    badge: '系統核心',
    recommendedTime: 25,
  },
  {
    id: 'networks',
    name: '計算機網路 (Computer Networks)',
    code: 'CS-305',
    categories: ['計算機網路'],
    description: '聚焦 OSI 七層模型、TCP 三向交握、壅塞控制、DNS 解析與子網路劃分。',
    badge: '通訊網路',
    recommendedTime: 25,
  },
  {
    id: 'se',
    name: '軟體工程與系統設計 (Software Engineering)',
    code: 'SE-401',
    categories: ['軟體工程與系統設計'],
    description: '物件導向設計原則 (SOLID)、常見設計模式 (GoF)、微服務與敏捷開發流程。',
    badge: '工程實踐',
    recommendedTime: 20,
  },
  {
    id: 'math',
    name: '高等微積分與線性代數 (Mathematics)',
    code: 'MATH-201',
    categories: ['高等微積分與線性代數'],
    description: '測驗特徵值分解、矩陣空間轉換、多變數微分方程與離散機率之數理計算。',
    badge: '數學基礎',
    recommendedTime: 30,
  },
];

interface ExamLandingViewProps {
  allQuestions: ExamQuestion[];
  onStartExam: (selectedQuestions: ExamQuestion[], examTitle: string, timeLimitMinutes: number) => void;
  onRetestWrong?: () => void;
}

export const ExamLandingView: React.FC<ExamLandingViewProps> = ({
  allQuestions,
  onStartExam,
  onRetestWrong,
}) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [customTimeLimit, setCustomTimeLimit] = useState<number>(30);
  const [examMode, setExamMode] = useState<'standard' | 'practice'>('standard');

  const currentSubject = EXAM_SUBJECTS.find((s) => s.id === selectedSubjectId) || EXAM_SUBJECTS[0];

  // Filter questions based on subject & difficulty
  const filteredQuestions = allQuestions.filter((q) => {
    // Subject filter
    if (currentSubject.categories.length > 0) {
      const match = currentSubject.categories.some(
        (cat) => q.category === cat || (q.tags && q.tags.includes(cat))
      );
      if (!match) return false;
    }

    // Difficulty filter
    if (selectedDifficulty !== 'all') {
      if (q.difficulty !== selectedDifficulty) return false;
    }

    return true;
  });

  // Fallback in case filter results in 0 questions (ensure user always has an active exam)
  const displayQuestions = filteredQuestions.length > 0 ? filteredQuestions : allQuestions.slice(0, 15);

  // Statistics calculation
  const totalQuestionsCount = displayQuestions.length;
  const totalPoints = displayQuestions.reduce((acc, q) => acc + (q.points || 2.0), 0);
  const basicCount = displayQuestions.filter((q) => q.difficulty === 'basic').length;
  const mediumCount = displayQuestions.filter((q) => q.difficulty === 'medium').length;
  const hardCount = displayQuestions.filter((q) => q.difficulty === 'hard').length;

  const handleSubjectChange = (subjectId: string) => {
    setSelectedSubjectId(subjectId);
    const sub = EXAM_SUBJECTS.find((s) => s.id === subjectId);
    if (sub) {
      setCustomTimeLimit(sub.recommendedTime);
    }
  };

  const handleLaunch = () => {
    const title = currentSubject.id === 'all'
      ? '全領域綜合資訊學門 模擬評量測驗'
      : `${currentSubject.code} ${currentSubject.name} 期末檢定卷`;
    
    // Randomize question order on every exam start
    const shuffled = shuffleArray(displayQuestions);

    // Reset status of questions before starting fresh exam
    const preparedQuestions: ExamQuestion[] = shuffled.map((q) => ({
      ...q,
      userAnswer: undefined,
      status: 'unanswered',
      isFlagged: false,
    }));

    onStartExam(preparedQuestions, title, customTimeLimit);
  };

  return (
    <div className="max-w-[1580px] mx-auto px-4 sm:px-6 py-4 space-y-6">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 text-white p-6 sm:p-10 shadow-xl shadow-blue-900/10">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-blue-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>智慧測驗評量中心・Online Examination Portal</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            線上測驗首頁與試題類科選擇
          </h1>
          <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed font-normal">
            請在下方下拉式選單選擇欲測驗之「試題類科」，系統將動態加載題庫試題、配置作答時限與評分標準，隨時即可一鍵開始測驗。
          </p>
        </div>

        {/* Decorative background shapes */}
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
        <div className="absolute right-40 bottom-0 -mb-20 w-80 h-80 rounded-full bg-indigo-500/20 blur-2xl pointer-events-none" />
      </div>

      {/* Main Configuration Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Subject Selector & Preferences (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Core Card: Subject Dropdown Selection */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">選擇測驗試題類科</h2>
                  <p className="text-xs text-slate-500 mt-0.5">點擊下拉式選單切換專業學門或點擊下方標籤快速選取</p>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg border border-blue-200/60">
                {currentSubject.code}
              </span>
            </div>

            {/* Prominent Dropdown Menu */}
            <div className="space-y-2">
              <label htmlFor="subject-dropdown" className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
                <span>試題類科 (Dropdown Selection)：</span>
                <span className="text-rose-500">*</span>
              </label>

              <div className="relative">
                <select
                  id="subject-dropdown"
                  value={selectedSubjectId}
                  onChange={(e) => handleSubjectChange(e.target.value)}
                  className="w-full appearance-none bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-slate-900 font-bold text-sm sm:text-base rounded-2xl border-2 border-slate-200 hover:border-blue-400 focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-500/15 py-3.5 pl-4 pr-12 transition cursor-pointer shadow-xs"
                >
                  {EXAM_SUBJECTS.map((sub) => (
                    <option key={sub.id} value={sub.id} className="py-2 text-slate-900 font-semibold">
                      【{sub.code}】{sub.name} ({sub.badge})
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                  <ChevronDown className="w-5 h-5 stroke-[2.5]" />
                </div>
              </div>

              {/* Subject Description Box */}
              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100/80 flex items-start space-x-3 text-xs text-slate-700 mt-3">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-semibold text-blue-900 flex items-center space-x-2">
                    <span>{currentSubject.name}</span>
                    <span className="px-2 py-0.5 bg-blue-200/70 text-blue-800 rounded text-[10px] font-bold">
                      {currentSubject.badge}
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {currentSubject.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Pills (Secondary selection convenience) */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-xs font-semibold text-slate-500 block">快捷類科標籤（點擊亦可切換）：</span>
              <div className="flex flex-wrap gap-2">
                {EXAM_SUBJECTS.map((sub) => {
                  const isActive = selectedSubjectId === sub.id;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => handleSubjectChange(sub.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer flex items-center space-x-1.5 ${
                        isActive
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      <span>{sub.badge}</span>
                      {isActive && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Preferences Card: Time Limit & Difficulty & Mode */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-5">
            <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>測驗作答參數設定</span>
            </h3>

            {/* Time limit presets */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 block">
                測驗限時（預設推薦 {currentSubject.recommendedTime} 分鐘）：
              </label>
              <div className="grid grid-cols-4 gap-2.5">
                {[15, 30, 45, 60].map((mins) => (
                  <button
                    key={mins}
                    onClick={() => setCustomTimeLimit(mins)}
                    className={`py-2.5 rounded-xl text-xs font-bold border transition cursor-pointer flex flex-col items-center justify-center ${
                      customTimeLimit === mins
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    <span>{mins} 分鐘</span>
                    <span className={`text-[10px] font-normal ${customTimeLimit === mins ? 'text-blue-100' : 'text-slate-400'}`}>
                      {Math.round(mins * 60 / (totalQuestionsCount || 1))} 秒/題
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 block">
                試題難易度過濾：
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'all', label: '全部難度' },
                  { id: 'basic', label: '基礎 (Basic)' },
                  { id: 'medium', label: '中等 (Medium)' },
                  { id: 'hard', label: '困難 (Hard)' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedDifficulty(item.id)}
                    className={`py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                      selectedDifficulty === item.id
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mode: Standard vs Practice */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setExamMode('standard')}
                className={`p-3.5 rounded-xl border text-left transition cursor-pointer ${
                  examMode === 'standard'
                    ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="font-bold text-xs text-slate-900 flex items-center justify-between">
                  <span>🏆 正式模擬考模式</span>
                  {examMode === 'standard' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">倒數計時、防作弊監控、交卷產生成績報告</p>
              </button>

              <button
                onClick={() => setExamMode('practice')}
                className={`p-3.5 rounded-xl border text-left transition cursor-pointer ${
                  examMode === 'practice'
                    ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="font-bold text-xs text-slate-900 flex items-center justify-between">
                  <span>📖 自主練習刷題模式</span>
                  {examMode === 'practice' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">無強制倒數壓力、彈性節奏作答鞏固弱點</p>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Exam Summary Card & Start CTA (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Exam Summary Preview Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-6 sticky top-20">
            <div>
              <span className="text-xs font-bold text-blue-600 tracking-wider uppercase">Exam Overview</span>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">考卷即時配置摘要</h3>
              <p className="text-xs text-slate-400 mt-0.5">系統已根據您選取的試題類科自動組裝試卷</p>
              <div className="inline-flex items-center space-x-1.5 mt-2 px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-200/70 text-[11px] font-semibold text-indigo-700">
                <Shuffle className="w-3.5 h-3.5 text-indigo-600" />
                <span>題號順序：每次開始自動隨機亂數排列</span>
              </div>
            </div>

            {/* Big Metrics Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-500 font-medium">試卷總題數</span>
                <div className="text-2xl font-black text-slate-900 mt-0.5 flex items-baseline space-x-1">
                  <span>{totalQuestionsCount}</span>
                  <span className="text-xs font-normal text-slate-400">題</span>
                </div>
                <span className="text-[11px] text-emerald-600 font-medium">題庫即時匹配</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-500 font-medium">試卷總分 / 及格</span>
                <div className="text-2xl font-black text-blue-600 mt-0.5 flex items-baseline space-x-1">
                  <span>{Math.round(totalPoints)}</span>
                  <span className="text-xs font-normal text-slate-400">/ 60% 及格</span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">單題平均 2.0 分</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-500 font-medium">作答時限</span>
                <div className="text-2xl font-black text-slate-900 mt-0.5 flex items-baseline space-x-1">
                  <span>{customTimeLimit}</span>
                  <span className="text-xs font-normal text-slate-400">分鐘</span>
                </div>
                <span className="text-[11px] text-blue-600 font-medium">時間到自動交卷</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-500 font-medium">當前類科</span>
                <div className="text-sm font-bold text-slate-900 mt-1 truncate">
                  {currentSubject.badge}
                </div>
                <span className="text-[11px] text-slate-400 font-medium">{currentSubject.code}</span>
              </div>
            </div>

            {/* Difficulty Breakdown Bar */}
            <div className="space-y-1.5 p-4 rounded-xl bg-slate-50/70 border border-slate-100">
              <div className="flex items-center justify-between text-xs text-slate-600 font-semibold">
                <span>難易度分佈</span>
                <span className="text-[11px] text-slate-400">
                  基 {basicCount}・中 {mediumCount}・難 {hardCount}
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden flex">
                <div
                  className="bg-emerald-500 h-full"
                  style={{ width: `${(basicCount / (totalQuestionsCount || 1)) * 100}%` }}
                  title={`基礎: ${basicCount}`}
                />
                <div
                  className="bg-amber-500 h-full"
                  style={{ width: `${(mediumCount / (totalQuestionsCount || 1)) * 100}%` }}
                  title={`中等: ${mediumCount}`}
                />
                <div
                  className="bg-rose-500 h-full"
                  style={{ width: `${(hardCount / (totalQuestionsCount || 1)) * 100}%` }}
                  title={`困難: ${hardCount}`}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 font-medium">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> 基礎題
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500" /> 中等題
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-rose-500" /> 困難題
                </span>
              </div>
            </div>

            {/* Launch Action Button */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleLaunch}
                className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-98 text-white font-bold text-base rounded-2xl shadow-lg shadow-blue-500/25 transition cursor-pointer flex items-center justify-center space-x-2.5 group"
              >
                <Play className="w-5 h-5 fill-current transition-transform group-hover:scale-110" />
                <span>立即開始測驗（{totalQuestionsCount} 題）</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              {onRetestWrong && (
                <button
                  onClick={onRetestWrong}
                  className="w-full py-2.5 px-4 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl border border-rose-200 transition cursor-pointer flex items-center justify-center space-x-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>直接進入「錯題突破專卷」重測</span>
                </button>
              )}
            </div>

            {/* Test Rules Guidance */}
            <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900 space-y-1.5">
              <div className="font-bold flex items-center space-x-1.5 text-amber-800">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>測驗注意事項</span>
              </div>
              <ul className="list-disc list-inside text-[11px] text-amber-800/90 space-y-0.5 leading-relaxed">
                <li>系統提供即時離線暫存防護，任何斷線或重新整理皆不會遺失作答。</li>
                <li>測驗時長結束時將自動鎖定答題卡並跳轉至成績分析報告。</li>
                <li>點擊作答介面左上角可隨時返回首頁更換類科試卷。</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
