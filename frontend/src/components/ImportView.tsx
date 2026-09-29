import React, { useState } from 'react';
import {
  Sparkles,
  FileText,
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  Edit2,
  Copy,
  Trash2,
  Plus,
  BookOpen,
  Check,
  Download,
  RotateCcw,
  Tag,
  Brain,
  ArrowRight,
  FileCode,
} from 'lucide-react';
import { defaultImportText } from '../data/mockData';
import { ExamQuestion } from '../types';

interface ParsedCard {
  id: string;
  number: string;
  stem: string;
  type: string;
  category: string;
  status: 'ready' | 'action_required';
  aiConfidence?: number;
  options: { id: string; text: string; subtext?: string; isCorrect: boolean }[];
  explanation: string;
}

interface ImportViewProps {
  onStartExamWithQuestions: (questions: ExamQuestion[]) => void;
  onSaveToBank: (questions: ExamQuestion[]) => void;
}

export const ImportView: React.FC<ImportViewProps> = ({
  onStartExamWithQuestions,
  onSaveToBank,
}) => {
  const [activeTab, setActiveTab] = useState<'text' | 'file'>('text');
  const [inputText, setInputText] = useState<string>(defaultImportText);
  const [syncToBank, setSyncToBank] = useState<boolean>(true);
  const [showDraftSaved, setShowDraftSaved] = useState<boolean>(false);
  const [isParsing, setIsParsing] = useState<boolean>(false);

  // Editing state for cards
  const [editingCard, setEditingCard] = useState<ParsedCard | null>(null);

  // Manual difficulty coefficient & knowledge tags
  const [manualDifficultyScore, setManualDifficultyScore] = useState<number>(0.65);
  const [tags, setTags] = useState<string[]>(['資訊科技', '程式設計', '資料結構']);
  const [newTagInput, setNewTagInput] = useState<string>('');

  // Initial cards matching Image 5
  const [cards, setCards] = useState<ParsedCard[]>([
    {
      id: 'c1',
      number: '# 01',
      stem: '什麼是里氏替換原則 (Liskov Substitution Principle, LSP)？',
      type: '單選題 · 物件導向設計',
      category: '軟體工程',
      status: 'ready',
      options: [
        {
          id: 'A',
          text: '子類別必須能夠替換其父類別且不破壞程式正確性',
          isCorrect: true,
        },
        {
          id: 'B',
          text: '類別應僅有一個引起其變化的原因',
          subtext: '(單一職責原則 SRP)',
          isCorrect: false,
        },
        {
          id: 'C',
          text: '高層模組不應依賴低層模組，兩者皆應依賴抽象介面',
          subtext: '(依賴反轉原則 DIP)',
          isCorrect: false,
        },
      ],
      explanation:
        'LSP 是物件導向 SOLID 原則之一，確保衍生類別保有父類別行為的一致性，避免因覆寫違反契約 (Contract) 而導致非預期的執行期例外。',
    },
    {
      id: 'c2',
      number: '# 02',
      stem: '在平均情況下，QuickSelect 演算法的時間複雜度為何？',
      type: '演算法複雜度分析',
      category: '演算法',
      status: 'action_required', // Needs user confirmation for correct answer
      aiConfidence: 98,
      options: [
        { id: 'A', text: 'O(n) - 線性時間', isCorrect: true },
        { id: 'B', text: 'O(log n)', isCorrect: false },
        { id: 'C', text: 'O(n²) - 最壞分割情況', isCorrect: false },
      ],
      explanation:
        '解析備忘：透過隨機 pivot 分割，每次僅遞迴進入目標所在單側，幾何級數求和之期望時間複雜度為線性。',
    },
    {
      id: 'c3',
      number: '# 03',
      stem: '在 Python 中，Tuple（元組）是可變物件 (Mutable)。',
      type: '是非判斷題 · Python 核心型態',
      category: '程式語言',
      status: 'ready',
      options: [
        { id: 'A', text: '是 (True)', isCorrect: false },
        { id: 'B', text: '否 (False)', isCorrect: true },
      ],
      explanation:
        '說明備註：Tuple 於初始化建立後即可不變更其成員指標 (Immutable)。如需動態變更內容應使用 List。',
    },
  ]);

  // Handle setting correct answer on card 2
  const handleSetCorrectOption = (cardId: string, optionId: string) => {
    setCards((prev) =>
      prev.map((c) => {
        if (c.id === cardId) {
          const updatedOptions = c.options.map((opt) => ({
            ...opt,
            isCorrect: opt.id === optionId,
          }));
          return {
            ...c,
            options: updatedOptions,
            status: 'ready', // Marked ready now!
          };
        }
        return c;
      })
    );
  };

  const handleDeleteCard = (cardId: string) => {
    setCards((prev) => prev.filter((c) => c.id !== cardId));
  };

  const handleDuplicateCard = (card: ParsedCard) => {
    const newCard: ParsedCard = {
      ...card,
      id: `c_${Date.now()}`,
      number: `# 0${cards.length + 1}`,
      stem: `${card.stem} (副本)`,
    };
    setCards((prev) => [...prev, newCard]);
  };

  const handleAddNewCard = () => {
    const newCard: ParsedCard = {
      id: `c_${Date.now()}`,
      number: `# 0${cards.length + 1}`,
      stem: '請輸入新題目之題幹敘述...',
      type: '單選題 · 自訂考題',
      category: tags[0] || '綜合測驗',
      status: 'action_required',
      options: [
        { id: 'A', text: '選項 A 說明', isCorrect: true },
        { id: 'B', text: '選項 B 說明', isCorrect: false },
        { id: 'C', text: '選項 C 說明', isCorrect: false },
        { id: 'D', text: '選項 D 說明', isCorrect: false },
      ],
      explanation: '此題之詳細觀念解析與推導步驟。',
    };
    setCards((prev) => [...prev, newCard]);
    setEditingCard(newCard); // Immediately open edit modal for user to edit!
  };

  const handleSaveEditedCard = (updatedCard: ParsedCard) => {
    const hasCorrect = updatedCard.options.some((o) => o.isCorrect);
    const finalCard: ParsedCard = {
      ...updatedCard,
      status: hasCorrect ? 'ready' : 'action_required',
    };
    setCards((prev) => prev.map((c) => (c.id === finalCard.id ? finalCard : c)));
    setEditingCard(null);
  };

  // Parser function to convert raw text into structured parsed cards
  const parseRawQuestions = (text: string): ParsedCard[] => {
    const raw = text.replace(/\r\n/g, '\n').trim();
    if (!raw) return [];

    // Split text by questions (e.g., "1. ", "2. ", "Q1. ", "【1】", or blank lines preceding a number)
    const regex = /(?:^|\n)(?=(?:(?:Q|\b)?\d+[\.、\s\)]|【\d+】|第\s*\d+\s*題))/i;
    let chunks = raw.split(regex).map((s) => s.trim()).filter(Boolean);

    // Fallback if no numbered headings found: split by double line breaks
    if (chunks.length <= 1) {
      const doubleBreakChunks = raw.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean);
      if (doubleBreakChunks.length > 1) {
        chunks = doubleBreakChunks;
      }
    }

    const parsedList: ParsedCard[] = [];

    chunks.forEach((chunk, index) => {
      const lines = chunk.split('\n').map((l) => l.trim()).filter(Boolean);
      if (lines.length === 0) return;

      let stem = '';
      const options: { id: string; text: string; subtext?: string; isCorrect: boolean }[] = [];
      let detectedAnswer: string | null = null;
      let explanation = '';

      lines.forEach((line) => {
        // Detect Answer: e.g. "答案: A", "答案：A", "正解: C", "Ans: A", "答案: 否"
        const ansMatch = line.match(/^(?:答案|正解|Ans|Answer)[：:\s]+([A-Za-z0-9是否TrueFalse]+)/i);
        if (ansMatch) {
          detectedAnswer = ansMatch[1].trim();
          return;
        }

        // Detect Explanation: e.g. "解析: ...", "說明: ...", "備註: ..."
        const expMatch = line.match(/^(?:解析|說明|備註|詳解)[：:\s]+(.*)/i);
        if (expMatch) {
          explanation = expMatch[1].trim();
          return;
        }

        // Detect Option: e.g. "A. ...", "A: ...", "(A) ...", "A) ..."
        const optMatch = line.match(/^[\(（]?([A-Da-d0-9])[\)）\.\:、\s]\s*(.*)/);
        if (optMatch) {
          const optId = optMatch[1].toUpperCase();
          let optText = optMatch[2].trim();
          let subtext: string | undefined = undefined;

          // Check if option contains subtext like "(單一職責原則 SRP)"
          const parenMatch = optText.match(/^(.*?)\s*([（\(].*?[）\)])$/);
          if (parenMatch) {
            optText = parenMatch[1].trim();
            subtext = parenMatch[2].trim();
          }

          options.push({
            id: optId,
            text: optText,
            subtext,
            isCorrect: false,
          });
          return;
        }

        // Detect True/False answers without explicit options
        if (options.length === 0 && !detectedAnswer && !explanation) {
          // Clean question number from stem
          const cleanLine = line.replace(/^(?:(?:Q|\b)?\d+[\.、\s\)]|【\d+】|第\s*\d+\s*題)\s*/, '');
          stem = stem ? `${stem} ${cleanLine}` : cleanLine;
        } else if (explanation) {
          explanation += ` ${line}`;
        }
      });

      // Pre-compute lower and upper cases for safe matching
      const ansTrimmed: string = detectedAnswer ?? '';
      const ansLower = ansTrimmed.toLowerCase();
      const ansUpper = ansTrimmed.toUpperCase();

      // Handle True/False questions if no options were listed
      if (options.length === 0) {
        if (
          ansTrimmed === '是' ||
          ansTrimmed === '否' ||
          ansLower === 'true' ||
          ansLower === 'false' ||
          stem.includes('是非') ||
          stem.includes('Mutable') ||
          stem.includes('可變物件') ||
          stem.includes('正確或錯誤')
        ) {
          const isTrueCorrect = ansTrimmed === '是' || ansLower === 'true';
          const isFalseCorrect = ansTrimmed === '否' || ansLower === 'false';
          options.push({ id: 'A', text: '是 (True)', isCorrect: isTrueCorrect });
          options.push({ id: 'B', text: '否 (False)', isCorrect: isFalseCorrect });
        } else {
          // If no options detected, provide standard options template
          options.push(
            { id: 'A', text: '選項 A 說明', isCorrect: ansUpper === 'A' },
            { id: 'B', text: '選項 B 說明', isCorrect: ansUpper === 'B' },
            { id: 'C', text: '選項 C 說明', isCorrect: ansUpper === 'C' },
            { id: 'D', text: '選項 D 說明', isCorrect: ansUpper === 'D' }
          );
        }
      }

      // Mark the correct option based on detectedAnswer
      let hasCorrectAnswer = false;
      if (ansTrimmed) {
        options.forEach((opt) => {
          if (opt.id === ansUpper) {
            opt.isCorrect = true;
            hasCorrectAnswer = true;
          }
        });
        if (!hasCorrectAnswer) {
          if (ansTrimmed === '是' && options[0]) {
            options[0].isCorrect = true;
            hasCorrectAnswer = true;
          } else if (ansTrimmed === '否' && options[1]) {
            options[1].isCorrect = true;
            hasCorrectAnswer = true;
          }
        }
      }

      // Determine category and question type label
      let typeLabel = '單選題';
      let category = '自選練習';
      if (options.length === 2) {
        typeLabel = '是非判斷題';
      }
      if (stem.includes('Liskov') || stem.includes('SOLID') || stem.includes('物件導向')) {
        typeLabel = '單選題 · 物件導向設計';
        category = '軟體工程';
      } else if (stem.includes('QuickSelect') || stem.includes('複雜度') || stem.includes('時間複雜度')) {
        typeLabel = '演算法複雜度分析';
        category = '演算法';
      } else if (stem.includes('Python') || stem.includes('Tuple')) {
        typeLabel = '是非判斷題 · Python 核心型態';
        category = '程式語言';
      }

      const cardStatus: 'ready' | 'action_required' = hasCorrectAnswer ? 'ready' : 'action_required';

      parsedList.push({
        id: `parsed_${index + 1}_${Date.now()}`,
        number: `# 0${index + 1}`,
        stem: stem || '未命名試題題幹',
        type: typeLabel,
        category,
        status: cardStatus,
        aiConfidence: cardStatus === 'action_required' ? 98 : undefined,
        options,
        explanation: explanation || '此題之詳細觀念解析與推導步驟。',
      });
    });

    return parsedList;
  };

  // Live Auto-Detect and Parse: convert whatever is in inputText to parsed cards
  const handleAutoParse = () => {
    setIsParsing(true);
    setTimeout(() => {
      const parsed = parseRawQuestions(inputText);
      if (parsed.length > 0) {
        setCards(parsed);
      }
      setIsParsing(false);
      setShowDraftSaved(true);
      setTimeout(() => setShowDraftSaved(false), 2500);
    }, 400);
  };

  const handleDownloadSample = () => {
    const blob = new Blob([defaultImportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'exam_sample_template.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const readyCount = cards.filter((c) => c.status === 'ready').length;
  const actionRequiredCount = cards.length - readyCount;

  // Transform cards to exam questions
  const handleStartExam = () => {
    const examQs: ExamQuestion[] = cards.map((c, i) => {
      const correctOpt = c.options.find((o) => o.isCorrect)?.id || 'A';
      return {
        id: i + 1,
        code: `#IMP-00${i + 1}`,
        prompt: c.stem,
        type: c.options.length === 2 ? 'boolean' : 'single',
        typeLabel: c.type.split('·')[0].trim(),
        difficulty: 'medium',
        difficultyScore: 0.6,
        difficultyLabel: '中等',
        points: 2.0,
        topic: c.type.split('·')[1]?.trim() || '自訂考題',
        category: c.category,
        tags: ['自訂匯入', c.category],
        options: c.options.map((o) => ({ id: o.id, text: o.text, subtext: o.subtext })),
        correctAnswer: correctOpt,
        explanation: c.explanation,
        status: 'unanswered',
      };
    });
    onStartExamWithQuestions(examQs);
  };

  const lineCount = inputText.split('\n').length;
  const charCount = inputText.length;

  return (
    <div className="max-w-[1580px] mx-auto px-4 sm:px-6 py-4 space-y-5">
      {/* Breadcrumbs & NLP Header matching Image 5 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2 text-slate-500">
          <span>自學模組</span>
          <span>&gt;</span>
          <span>智測題庫引擎</span>
          <span>&gt;</span>
          <span className="font-semibold text-slate-800">自訂練習題組建立器</span>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-medium border border-emerald-200/60">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>深度語意結構剖析器 v3.4 就緒</span>
          </div>
          <span className="text-slate-400 font-mono">編碼支援: UTF-8 / LaTeX 符號</span>
        </div>
      </div>

      {/* Main Title & Description */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          建立自訂練習題組與智慧匯入
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          匯入複習筆記、考古題或文字段落，系統將自動偵測並結構化解析題目、題型、選項與正解說明。
        </p>
      </div>

      {/* Tabs matching Image 5: 文字快速貼上 vs 檔案批次上傳 */}
      <div className="flex items-center space-x-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('text')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
            activeTab === 'text'
              ? 'bg-white border-t border-x border-slate-200 text-blue-600 shadow-2xs'
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>文字快速貼上</span>
        </button>

        <button
          onClick={() => setActiveTab('file')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
            activeTab === 'file'
              ? 'bg-white border-t border-x border-slate-200 text-blue-600 shadow-2xs'
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
          }`}
        >
          <UploadCloud className="w-4 h-4" />
          <span>檔案批次上傳 (.xlsx, .docx)</span>
        </button>
      </div>

      {/* 2-Columns Layout: Left Text Area vs Right Parsed Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (5 cols): Raw Input Text Area & Actions */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-4">
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <FileCode className="w-4 h-4 text-blue-600" />
                <span className="font-bold text-slate-800 text-xs sm:text-sm">
                  原始考題文字或筆記段落
                </span>
              </div>
              <div className="flex items-center space-x-2 text-[11px]">
                <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                  純文字格式 (Plain Text)
                </span>
                <span className="text-blue-600 font-semibold font-mono">
                  {cards.length} 題已輸入
                </span>
              </div>
            </div>

            {/* Character & draft indicators */}
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span>題組草稿暫存已啟動</span>
              </span>
              <span className="font-mono text-blue-600 font-semibold">{charCount} 字元</span>
            </div>

            {/* Code/Text Editor with simulated line numbers matching Image 5 */}
            <div className="relative border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50 flex">
              {/* Line numbers column */}
              <div className="w-10 bg-slate-100/80 border-r border-slate-200 text-right pr-2 py-3 select-none text-[11px] font-mono text-slate-400 leading-[1.625rem]">
                {Array.from({ length: Math.max(16, lineCount) }).map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>

              {/* Textarea */}
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={16}
                className="w-full bg-transparent p-3 text-xs sm:text-[13px] font-mono text-slate-800 leading-[1.625rem] resize-y focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="貼上考題或筆記文字..."
              />
            </div>

            {/* Format Suggestion Box */}
            <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-xs text-blue-900 space-y-1">
              <span className="font-semibold block">支援格式建議：</span>
              <p className="text-[11px] text-blue-800/80 leading-relaxed">
                題號自動識別（如 1. 或 Q1）、選項以 A. B. C. 分行標註、支援「答案:」與「解析:」關鍵字自動抽取。
              </p>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={handleAutoParse}
              disabled={isParsing}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-blue-500/25 flex items-center justify-center transition cursor-pointer"
            >
              <span>
                {isParsing
                  ? 'NLP 結構化剖析處理中...'
                  : '自動偵測並結構化解析題目 (Auto-Detect & Parse)'}
              </span>
            </button>

            {/* Secondary Utility Buttons */}
            <div className="flex items-center justify-between text-xs pt-1">
              <button
                onClick={handleDownloadSample}
                className="flex items-center space-x-1 text-slate-500 hover:text-blue-600 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>下載試題標準範本 (.txt)</span>
              </button>

              <button
                onClick={() => setInputText('')}
                className="flex items-center space-x-1 text-slate-400 hover:text-rose-600 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>清空重填</span>
              </button>
            </div>
          </div>

          {/* Manual Difficulty & Knowledge Tags Widget */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Tag className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold text-slate-800">
                  手動評難度係數與知識點標籤
                </span>
              </div>
              <span className="text-[11px] text-slate-400">已自訂套用至本題組</span>
            </div>

            {/* Manual Difficulty Coefficient */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-700">手動難度係數：</span>
                <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {manualDifficultyScore.toFixed(2)} (
                  {manualDifficultyScore >= 0.8
                    ? '基礎'
                    : manualDifficultyScore >= 0.5
                    ? '中等'
                    : manualDifficultyScore >= 0.3
                    ? '困難'
                    : '極難'}
                  )
                </span>
              </div>

              {/* Preset buttons */}
              <div className="grid grid-cols-4 gap-1.5 text-xs">
                {[
                  { label: '基礎', score: 0.85 },
                  { label: '中等', score: 0.65 },
                  { label: '困難', score: 0.40 },
                  { label: '極難', score: 0.20 },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setManualDifficultyScore(item.score)}
                    className={`py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      Math.abs(manualDifficultyScore - item.score) < 0.1
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Slider for fine adjustment */}
              <div className="flex items-center space-x-2 pt-1">
                <span className="text-[10px] text-slate-400">難 0.1</span>
                <input
                  type="range"
                  min="0.10"
                  max="0.99"
                  step="0.01"
                  value={manualDifficultyScore}
                  onChange={(e) => setManualDifficultyScore(parseFloat(e.target.value))}
                  className="flex-1 accent-blue-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                />
                <span className="text-[10px] text-slate-400">易 0.99</span>
              </div>
            </div>

            {/* Knowledge Tags */}
            <div className="space-y-2 pt-1 border-t border-slate-100">
              <span className="text-xs font-medium text-slate-700 block">評知識點標籤：</span>

              {/* Existing tags */}
              <div className="flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium border border-blue-200/70"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => setTags(tags.filter((t) => t !== tag))}
                      className="hover:text-rose-600 ml-1 text-slate-400"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>

              {/* Add tag input */}
              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="text"
                  value={newTagInput}
                  onChange={(e) => setNewTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (newTagInput.trim() && !tags.includes(newTagInput.trim())) {
                        setTags([...tags, newTagInput.trim()]);
                        setNewTagInput('');
                      }
                    }
                  }}
                  placeholder="輸入考點標籤後按 Enter..."
                  className="flex-1 p-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newTagInput.trim() && !tags.includes(newTagInput.trim())) {
                      setTags([...tags, newTagInput.trim()]);
                      setNewTagInput('');
                    }
                  }}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold"
                >
                  新增標籤
                </button>
              </div>

              {/* Recommended Quick Tags */}
              <div className="flex flex-wrap gap-1 pt-1 text-[11px] text-slate-500">
                <span>推薦：</span>
                {['演算法', '時間複雜度', '快速排序', '物件導向', 'SOLID原則', 'Python'].map(
                  (rec) =>
                    !tags.includes(rec) && (
                      <button
                        key={rec}
                        type="button"
                        onClick={() => setTags([...tags, rec])}
                        className="text-blue-600 hover:underline mr-1"
                      >
                        +{rec}
                      </button>
                    )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): Parsed Cards matching Image 5 */}
        <div className="lg:col-span-7 space-y-4">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-slate-900 text-sm">已解析題目清單</span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                共 {cards.length} 題
              </span>
            </div>

            <div className="flex items-center space-x-2 text-xs">
              <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/60 font-medium flex items-center space-x-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>{readyCount} 題格式完整</span>
              </span>

              {actionRequiredCount > 0 && (
                <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200/60 font-medium flex items-center space-x-1">
                  <AlertTriangle className="w-3 h-3 text-amber-600" />
                  <span>{actionRequiredCount} 題待確認正解</span>
                </span>
              )}
            </div>
          </div>

          {/* Cards List */}
          <div className="space-y-4">
            {cards.map((card) => {
              const isActionRequired = card.status === 'action_required';

              return (
                <div
                  key={card.id}
                  className={`bg-white rounded-2xl border transition-all duration-200 shadow-xs p-5 space-y-4 ${
                    isActionRequired
                      ? 'border-amber-300 ring-2 ring-amber-400/20'
                      : 'border-slate-200/90'
                  }`}
                >
                  {/* Warning banner for card 2 */}
                  {isActionRequired && (
                    <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3 flex items-center justify-between text-xs text-amber-900">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                        <span className="font-bold">尚未指定正確答案 · 需要操作確認</span>
                      </div>
                      {card.aiConfidence && (
                        <span className="text-[11px] text-amber-700 font-medium">
                          剖析信心度 {card.aiConfidence}% 偵測為單選題
                        </span>
                      )}
                    </div>
                  )}

                  {/* Card Header matching Image 5 */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono font-bold text-slate-800 text-xs">
                        {card.number}
                      </span>
                      {card.status === 'ready' ? (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[11px] font-semibold flex items-center space-x-1 border border-emerald-200/50">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>已就緒 (Ready)</span>
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 text-[11px] font-semibold flex items-center space-x-1 border border-amber-200/50">
                          <AlertTriangle className="w-3 h-3 text-amber-600" />
                          <span>待確認 (Action Required)</span>
                        </span>
                      )}
                      <span className="text-xs text-slate-500">{card.type}</span>
                    </div>

                    <div className="flex items-center space-x-1 text-slate-400">
                      <button
                        onClick={() => setEditingCard(card)}
                        className="p-1 hover:text-blue-600 rounded transition"
                        title="編輯此題"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDuplicateCard(card)}
                        className="p-1 hover:text-slate-700 rounded transition"
                        title="複製副本"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteCard(card.id)}
                        className="p-1 hover:text-rose-600 rounded transition"
                        title="刪除"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Question Stem */}
                  <div className="text-sm font-semibold text-slate-900 leading-relaxed">
                    {card.stem}
                  </div>

                  {/* Instruction for Action Required */}
                  {isActionRequired && (
                    <div className="text-xs text-blue-600 font-medium">
                      👉 請直接點擊下方任一選項卡片以設定為正解：
                    </div>
                  )}

                  {/* Options List matching Image 5 */}
                  <div className="space-y-2">
                    {card.options.map((opt) => {
                      const isCorrect = opt.isCorrect;

                      return (
                        <div
                          key={opt.id}
                          className={`p-3 rounded-xl border text-xs flex items-center justify-between transition ${
                            isCorrect
                              ? 'border-emerald-500 bg-emerald-50/70 text-slate-900 font-medium'
                              : 'border-slate-200 bg-slate-50/40 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center space-x-2.5">
                            <span
                              className={`w-5 h-5 rounded-md font-mono font-bold flex items-center justify-center text-[11px] ${
                                isCorrect
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-slate-200 text-slate-700'
                              }`}
                            >
                              {opt.id}
                            </span>
                            <span>{opt.text}</span>
                            {opt.subtext && (
                              <span className="text-slate-400 text-[11px]">{opt.subtext}</span>
                            )}
                          </div>

                          {/* Correct badge or action button */}
                          <div>
                            {isCorrect ? (
                              <span className="px-2 py-0.5 rounded bg-emerald-600 text-white text-[11px] font-semibold flex items-center space-x-1">
                                <Check className="w-3 h-3" />
                                <span>{isActionRequired ? '正解已指定' : '正解 (Correct)'}</span>
                              </span>
                            ) : (
                              <button
                                onClick={() => handleSetCorrectOption(card.id, opt.id)}
                                className="px-2.5 py-1 rounded bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 text-[11px] font-semibold transition cursor-pointer"
                              >
                                設為答案
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation Section */}
                  {card.explanation && (
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 space-y-1">
                      <div className="font-semibold text-slate-800 flex items-center space-x-1">
                        <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                        <span>題目解析與觀念補充</span>
                      </div>
                      <p className="leading-relaxed pl-4">{card.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Add Blank Question Card Button matching Image 5 */}
          <button
            onClick={handleAddNewCard}
            className="w-full py-3.5 border-2 border-dashed border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 rounded-2xl text-xs font-semibold text-slate-500 hover:text-blue-600 flex items-center justify-center space-x-1.5 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>手動新增一題空試題卡片</span>
          </button>
        </div>
      </div>

      {/* Bottom Sticky Action Bar matching bottom of Image 5 */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Options */}
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <label className="flex items-center space-x-2 cursor-pointer font-medium text-slate-800">
            <input
              type="checkbox"
              checked={syncToBank}
              onChange={(e) => setSyncToBank(e.target.checked)}
              className="rounded text-blue-600 border-slate-300 focus:ring-blue-500 w-4 h-4"
            />
            <span>同步儲存至我的個人題庫收藏庫</span>
          </label>

          <div className="flex items-center space-x-1 text-slate-500">
            <Tag className="w-3.5 h-3.5 text-slate-400" />
            <span>標籤：{tags.join(' · ')}</span>
          </div>

          <div className="flex items-center space-x-1 text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md font-medium">
            <Brain className="w-3.5 h-3.5 text-blue-600" />
            <span>智慧遺忘曲線 (Spaced Repetition) 間隔重複演算法已自動啟用</span>
          </div>
        </div>

        {/* Right CTA Buttons */}
        <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
          <button
            onClick={() => {
              setShowDraftSaved(true);
              setTimeout(() => setShowDraftSaved(false), 2000);
            }}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
          >
            儲存為草稿
          </button>

          <button
            onClick={handleStartExam}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-blue-500/25 flex items-center space-x-2 transition cursor-pointer"
          >
            <span>立即開始線上練習 (共 {cards.length} 題)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {showDraftSaved && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center space-x-2 text-xs animate-in slide-in-from-bottom-5">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>題組資料與解析已自動儲存至草稿箱！</span>
        </div>
      )}

      {/* Edit Question Card Modal */}
      {editingCard && (
        <EditCardModal
          card={editingCard}
          onClose={() => setEditingCard(null)}
          onSave={handleSaveEditedCard}
        />
      )}
    </div>
  );
};

// Sub-component for editing parsed question card
interface EditCardModalProps {
  card: ParsedCard;
  onClose: () => void;
  onSave: (updated: ParsedCard) => void;
}

const EditCardModal: React.FC<EditCardModalProps> = ({ card, onClose, onSave }) => {
  const [stem, setStem] = useState(card.stem);
  const [type, setType] = useState(card.type);
  const [category, setCategory] = useState(card.category);
  const [options, setOptions] = useState(card.options);
  const [explanation, setExplanation] = useState(card.explanation);

  const handleToggleCorrect = (index: number) => {
    setOptions((prev) =>
      prev.map((opt, i) => ({
        ...opt,
        isCorrect: i === index,
      }))
    );
  };

  const handleOptionTextChange = (index: number, text: string) => {
    setOptions((prev) =>
      prev.map((opt, i) => (i === index ? { ...opt, text } : opt))
    );
  };

  const handleAddOption = () => {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    const nextId = letters[options.length] || `OPT${options.length + 1}`;
    setOptions((prev) => [
      ...prev,
      { id: nextId, text: `選項 ${nextId} 說明`, isCorrect: false },
    ]);
  };

  const handleDeleteOption = (index: number) => {
    if (options.length <= 2) return; // Keep at least 2 options
    setOptions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...card,
      stem,
      type,
      category,
      options,
      explanation,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center space-x-2">
            <Edit2 className="w-4 h-4 text-blue-600" />
            <h3 className="font-bold text-slate-800 text-base">
              編輯試題卡片 ({card.number})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 max-h-[75vh] overflow-y-auto space-y-4 text-xs">
          {/* Stem */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-700">題目題幹敘述 (Stem) *</label>
            <textarea
              required
              rows={3}
              value={stem}
              onChange={(e) => setStem(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
              placeholder="請輸入題目完整題幹敘述..."
            />
          </div>

          {/* Type & Category */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">題型標籤說明</label>
              <input
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="例如：單選題 · 演算法分析"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">考題領域 / 分類</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="例如：演算法、軟體工程"
              />
            </div>
          </div>

          {/* Options */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-700">
                選項設定（請標定正確答案）：
              </label>
              <button
                type="button"
                onClick={handleAddOption}
                className="text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>新增選項</span>
              </button>
            </div>

            <div className="space-y-2">
              {options.map((opt, i) => (
                <div
                  key={opt.id}
                  className={`p-2.5 rounded-xl border flex items-center space-x-2 transition ${
                    opt.isCorrect
                      ? 'border-emerald-300 bg-emerald-50/50'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-md font-mono font-bold flex items-center justify-center text-xs shrink-0 ${
                      opt.isCorrect
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {opt.id}
                  </span>

                  <input
                    type="text"
                    value={opt.text}
                    onChange={(e) => handleOptionTextChange(i, e.target.value)}
                    className="flex-1 p-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder={`選項 ${opt.id} 敘述...`}
                  />

                  <button
                    type="button"
                    onClick={() => handleToggleCorrect(i)}
                    className={`px-2.5 py-1 rounded-lg font-semibold text-[11px] transition shrink-0 ${
                      opt.isCorrect
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {opt.isCorrect ? '✓ 正確答案' : '設為正解'}
                  </button>

                  {options.length > 2 && (
                    <button
                      type="button"
                      onClick={() => handleDeleteOption(i)}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded transition"
                      title="刪除此選項"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Explanation */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-700">題目解析與觀念補充</label>
            <textarea
              rows={3}
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
              placeholder="輸入觀念解析、推導公式或解題備註..."
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 font-semibold"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-xs transition"
            >
              完成並儲存變更
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
