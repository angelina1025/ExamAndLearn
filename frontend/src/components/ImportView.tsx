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
  Layers,
  Filter,
  ArrowDown,
  ArrowUp,
  Bookmark,
  Eye,
  Upload,
  ChevronDown,
  Search,
  X,
  FileSpreadsheet,
} from 'lucide-react';
import { defaultImportText } from '../data/mockData';
import { ExamQuestion } from '../types';
import { UserRole } from './Navbar';

export interface DraftQuestion {
  id: string;
  stem: string;
  prompt?: string;
  tags: string[];
  type: string;
  difficulty: string;
  difficultyScore?: string;
  points: number;
  lastModified: string;
  options: { id: string; text: string; subtext?: string; isCorrect: boolean }[];
  correctAnswer: string;
  explanation: string;
  category?: string;
}

const initialDrafts: DraftQuestion[] = [
  {
    id: 'DFT-0101',
    stem: '請說明在分散式系統架構中，CAP 定理 (Consistency, Availability, Partition Tolerance) 的權衡取捨原則，並分析當網路分割 (Network Partition) 發生時，CP 與 AP 系統各自的運作策略與保證。',
    prompt: '請說明在分散式系統架構中，CAP 定理 (Consistency, Availability, Partition Tolerance) 的權衡取捨原則，並分析當網路分割 (Network Partition) 發生時，CP 與 AP 系統各自的運作策略與保證。',
    tags: ['分散式系統', 'CAP定理', '系統架構'],
    type: '單選題',
    difficulty: '困難',
    difficultyScore: '0.35',
    points: 3,
    lastModified: '10 分鐘前',
    category: '系統架構',
    options: [
      {
        id: 'A',
        text: '在發生網路分割 (P) 時，系統必須在一致性 (C) 與可用性 (A) 之間進行權衡取捨，無法兩者兼得',
        isCorrect: true,
      },
      {
        id: 'B',
        text: '任何現代分散式資料庫皆可透過 Raft 共識演算法同時保證 CA 與 P 三者',
        isCorrect: false,
      },
      {
        id: 'C',
        text: 'AP 系統會在網路分割時拒絕所有寫入以確保資料絕對正確',
        isCorrect: false,
      },
      {
        id: 'D',
        text: 'CP 系統在任何分區故障情況下仍保證 100% 的請求低延遲回應',
        isCorrect: false,
      },
    ],
    correctAnswer: 'A',
    explanation:
      'CAP 定理指出分散式系統遭遇網路分區 (P) 必然存在時，僅能在強一致性 (CP) 與高可用性 (AP) 間擇一。',
  },
  {
    id: 'DFT-0102',
    stem: '在關聯式資料庫中，B+ Tree 相比於一般 B Tree 更適合用於磁碟索引結構的主要原因為何？',
    prompt: '在關聯式資料庫中，B+ Tree 相比於一般 B Tree 更適合用於磁碟索引結構的主要原因為何？',
    tags: ['資料庫', 'B+樹', '磁碟索引'],
    type: '單選題',
    difficulty: '中等',
    difficultyScore: '0.55',
    points: 2,
    lastModified: '30 分鐘前',
    category: '資料庫系統',
    options: [
      {
        id: 'A',
        text: 'B+ Tree 所有資料記錄均存於葉節點，且葉節點以雙向鏈結串列相連，大幅提升區間範圍查詢 (Range Scan) 效率',
        isCorrect: true,
      },
      {
        id: 'B',
        text: 'B+ Tree 的非葉節點儲存完整記錄，減少磁碟 I/O 次數',
        isCorrect: false,
      },
      {
        id: 'C',
        text: 'B+ Tree 具有更低的樹高，但無法支援二元搜尋',
        isCorrect: false,
      },
      {
        id: 'D',
        text: 'B+ Tree 不需要進行節點分裂 (Split) 或合併',
        isCorrect: false,
      },
    ],
    correctAnswer: 'A',
    explanation:
      'B+ Tree 內部節點僅儲存鍵值供路由使用，葉節點以鏈結相接，極佳化範圍掃描並提升頁面快取密度。',
  },
  {
    id: 'DFT-0103',
    stem: '在 Python 語言中，全域直譯器鎖 (Global Interpreter Lock, GIL) 會導致多執行緒 (Multi-threading) 無法有效利用多核心 CPU 進行 CPU-bound 計算密集型任務。',
    prompt: '在 Python 語言中，全域直譯器鎖 (Global Interpreter Lock, GIL) 會導致多執行緒 (Multi-threading) 無法有效利用多核心 CPU 進行 CPU-bound 計算密集型任務。',
    tags: ['Python', 'GIL', '並行計算'],
    type: '是非題',
    difficulty: '基礎',
    difficultyScore: '0.85',
    points: 2,
    lastModified: '1 小時前',
    category: '程式語言',
    options: [
      { id: 'A', text: '是 (True)', isCorrect: true },
      { id: 'B', text: '否 (False)', isCorrect: false },
    ],
    correctAnswer: 'A',
    explanation:
      'CPython 直譯器的 GIL 限制同一個行程內任何時間只能有一個原生執行緒執行 Python 位元碼，因此 CPU 密集任務應改採多行程 (multiprocessing)。',
  },
];

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
  currentRole?: UserRole;
  onStartExamWithQuestions?: (questions: ExamQuestion[]) => void;
  onSaveToBank?: (questions: any[]) => void;
}

export const ImportView: React.FC<ImportViewProps> = ({
  currentRole = 'user',
  onStartExamWithQuestions,
  onSaveToBank,
}) => {
  const [activeTab, setActiveTab] = useState<'text' | 'file' | 'drafts'>('text');
  const [inputText, setInputText] = useState<string>(defaultImportText);
  const [syncToBank, setSyncToBank] = useState<boolean>(true);
  const [showDraftSaved, setShowDraftSaved] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [isParsing, setIsParsing] = useState<boolean>(false);

  // Drafts management state
  const [drafts, setDrafts] = useState<DraftQuestion[]>(initialDrafts);
  const [selectedDraftIds, setSelectedDraftIds] = useState<Record<string, boolean>>({});
  const [draftSearchQuery, setDraftSearchQuery] = useState<string>('');
  const [draftDifficultyFilter, setDraftDifficultyFilter] = useState<string>('全部難度');
  const [draftTypeFilter, setDraftTypeFilter] = useState<string>('全部');
  const [draftSortField, setDraftSortField] = useState<
    'id' | 'stem' | 'tags' | 'type' | 'difficulty' | 'points' | 'lastModified'
  >('lastModified');
  const [draftSortDirections, setDraftSortDirections] = useState<
    Record<string, 'default' | 'inverted'>
  >({
    id: 'default',
    stem: 'default',
    tags: 'default',
    type: 'default',
    difficulty: 'default',
    points: 'default',
    lastModified: 'default',
  });
  const [visibleDraftColumns, setVisibleDraftColumns] = useState<Record<string, boolean>>({
    id: true,
    stem: true,
    tags: true,
    type: true,
    difficulty: true,
    points: true,
    lastModified: true,
  });
  const [showDraftColumnDropdown, setShowDraftColumnDropdown] = useState<boolean>(false);
  const [previewDraft, setPreviewDraft] = useState<DraftQuestion | null>(null);
  const [editingDraft, setEditingDraft] = useState<DraftQuestion | null>(null);

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

  // Draft filtering and sorting logic matching BankView
  const filteredDrafts = drafts
    .filter((d) => {
      if (draftDifficultyFilter !== '全部難度' && d.difficulty !== draftDifficultyFilter) {
        return false;
      }
      if (draftTypeFilter !== '全部' && d.type !== draftTypeFilter) {
        return false;
      }
      if (draftSearchQuery.trim()) {
        const q = draftSearchQuery.toLowerCase();
        const matchStem = d.stem.toLowerCase().includes(q);
        const matchTag = d.tags.some((t) => t.toLowerCase().includes(q));
        const matchId = d.id.toLowerCase().includes(q);
        if (!matchStem && !matchTag && !matchId) return false;
      }
      return true;
    })
    .sort((a, b) => {
      const dir = draftSortDirections[draftSortField] === 'inverted' ? -1 : 1;
      if (draftSortField === 'id') return dir * a.id.localeCompare(b.id);
      if (draftSortField === 'stem') return dir * a.stem.localeCompare(b.stem);
      if (draftSortField === 'points') return dir * (a.points - b.points);
      if (draftSortField === 'difficulty') {
        const diffMap: Record<string, number> = { 基礎: 1, 中等: 2, 困難: 3 };
        return dir * ((diffMap[a.difficulty] || 0) - (diffMap[b.difficulty] || 0));
      }
      if (draftSortField === 'type') return dir * a.type.localeCompare(b.type);
      if (draftSortField === 'tags') return dir * ((a.tags[0] || '').localeCompare(b.tags[0] || ''));
      return dir * a.lastModified.localeCompare(b.lastModified);
    });

  const selectedDraftCount = Object.values(selectedDraftIds).filter(Boolean).length;
  const isAllDraftsSelected =
    filteredDrafts.length > 0 && filteredDrafts.every((d) => selectedDraftIds[d.id]);

  const handleSelectAllDrafts = (checked: boolean) => {
    const next: Record<string, boolean> = {};
    if (checked) {
      filteredDrafts.forEach((d) => {
        next[d.id] = true;
      });
    }
    setSelectedDraftIds(next);
  };

  const handleDraftHeaderSort = (
    field: 'id' | 'stem' | 'tags' | 'type' | 'difficulty' | 'points' | 'lastModified'
  ) => {
    if (draftSortField === field) {
      setDraftSortDirections((prev) => ({
        ...prev,
        [field]: prev[field] === 'default' ? 'inverted' : 'default',
      }));
    } else {
      setDraftSortField(field);
    }
  };

  // 2. 儲存為草稿 (把目前解析卡片加入草稿清單)
  const handleSaveAsDraft = () => {
    const newDrafts: DraftQuestion[] = cards.map((c, i) => {
      const isBool = c.options.length === 2;
      const isMulti = c.options.filter((o) => o.isCorrect).length > 1;
      const qType = isMulti ? '多選題' : isBool ? '是非題' : '單選題';
      const diffLabel =
        manualDifficultyScore >= 0.8
          ? '基礎'
          : manualDifficultyScore >= 0.5
          ? '中等'
          : '困難';
      return {
        id: `DFT-${String(drafts.length + i + 101).padStart(4, '0')}`,
        stem: c.stem,
        prompt: c.stem,
        tags: tags.length > 0 ? [...tags] : [c.category],
        type: qType,
        difficulty: diffLabel,
        difficultyScore: manualDifficultyScore.toFixed(2),
        points: 2,
        lastModified: '剛剛',
        options: c.options.map((o) => ({ ...o })),
        correctAnswer: c.options.find((o) => o.isCorrect)?.id || 'A',
        explanation: c.explanation,
        category: c.category,
      };
    });
    setDrafts((prev) => [...newDrafts, ...prev]);
    setToastMessage(`已將 ${cards.length} 題試題儲存至草稿箱！可在「草稿題目清單」頁簽檢視。`);
    setShowDraftSaved(true);
    setTimeout(() => setShowDraftSaved(false), 2500);
  };

  // 3. 上傳至題庫 (管理員上傳同步給所有人，使用者上傳僅自己與管理員可見)
  const handleUploadToBank = () => {
    const newBankQuestions = cards.map((c) => {
      const correctOpt = c.options.find((o) => o.isCorrect)?.id || 'A';
      const isBool = c.options.length === 2;
      const isMulti = c.options.filter((o) => o.isCorrect).length > 1;
      const qType = isMulti ? '多選題' : isBool ? '是非題' : '單選題';

      const typeColor =
        qType === '多選題'
          ? 'bg-purple-100 text-purple-700 border-purple-200'
          : qType === '是非題'
          ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
          : 'bg-blue-100 text-blue-700 border-blue-200';

      const diffLabel =
        manualDifficultyScore >= 0.8
          ? '基礎'
          : manualDifficultyScore >= 0.5
          ? '中等'
          : '困難';
      const diffColor =
        diffLabel === '基礎'
          ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
          : diffLabel === '中等'
          ? 'bg-amber-100 text-amber-800 border-amber-200'
          : 'bg-rose-100 text-rose-800 border-rose-200';

      return {
        id: `QS-0${Math.floor(850 + Math.random() * 50)}`,
        prompt: c.stem,
        tags: tags.length > 0 ? [...tags] : ['自訂匯入', c.category],
        type: qType,
        typeBadgeColor: typeColor,
        difficulty: diffLabel,
        difficultyScore: manualDifficultyScore.toFixed(2),
        difficultyColor: diffColor,
        points: 2,
        lastModified: '剛剛',
        author: currentRole === 'admin' ? '管理員 AAA' : '使用者 AAA',
        importedBy: currentRole === 'admin' ? ('admin' as const) : ('user' as const),
        options: c.options.map((o) => ({
          id: o.id,
          text: o.text,
          subtext: o.subtext,
          isCorrect: o.isCorrect,
        })),
        correctAnswer: correctOpt,
        explanation: c.explanation,
        status: 'unanswered',
      };
    });

    if (onSaveToBank) {
      onSaveToBank(newBankQuestions);
    }
  };

  const handleUploadSingleDraftToBank = (draft: DraftQuestion) => {
    const correctOpt = draft.options.find((o) => o.isCorrect)?.id || 'A';
    const typeColor =
      draft.type === '多選題'
        ? 'bg-purple-100 text-purple-700 border-purple-200'
        : draft.type === '是非題'
        ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
        : 'bg-blue-100 text-blue-700 border-blue-200';

    const diffColor =
      draft.difficulty === '基礎'
        ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
        : draft.difficulty === '中等'
        ? 'bg-amber-100 text-amber-800 border-amber-200'
        : 'bg-rose-100 text-rose-800 border-rose-200';

    const bankQ = {
      id: `QS-0${Math.floor(860 + Math.random() * 50)}`,
      prompt: draft.stem,
      tags: draft.tags,
      type: draft.type,
      typeBadgeColor: typeColor,
      difficulty: draft.difficulty,
      difficultyScore: draft.difficultyScore || '0.60',
      difficultyColor: diffColor,
      points: draft.points,
      lastModified: '剛剛',
      author: currentRole === 'admin' ? '管理員 AAA' : '使用者 AAA',
      importedBy: currentRole === 'admin' ? ('admin' as const) : ('user' as const),
      options: draft.options.map((o) => ({
        id: o.id,
        text: o.text,
        subtext: o.subtext,
        isCorrect: o.isCorrect,
      })),
      correctAnswer: correctOpt,
      explanation: draft.explanation,
      status: 'unanswered',
    };

    setDrafts((prev) => prev.filter((d) => d.id !== draft.id));
    if (previewDraft?.id === draft.id) setPreviewDraft(null);
    if (onSaveToBank) {
      onSaveToBank([bankQ]);
    }
  };

  const handleBatchUploadDrafts = () => {
    const selectedDraftsList = drafts.filter((d) => selectedDraftIds[d.id]);
    if (selectedDraftsList.length === 0) return;

    const bankQs = selectedDraftsList.map((draft) => {
      const correctOpt = draft.options.find((o) => o.isCorrect)?.id || 'A';
      const typeColor =
        draft.type === '多選題'
          ? 'bg-purple-100 text-purple-700 border-purple-200'
          : draft.type === '是非題'
          ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
          : 'bg-blue-100 text-blue-700 border-blue-200';

      const diffColor =
        draft.difficulty === '基礎'
          ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
          : draft.difficulty === '中等'
          ? 'bg-amber-100 text-amber-800 border-amber-200'
          : 'bg-rose-100 text-rose-800 border-rose-200';

      return {
        id: `QS-0${Math.floor(860 + Math.random() * 50)}`,
        prompt: draft.stem,
        tags: draft.tags,
        type: draft.type,
        typeBadgeColor: typeColor,
        difficulty: draft.difficulty,
        difficultyScore: draft.difficultyScore || '0.60',
        difficultyColor: diffColor,
        points: draft.points,
        lastModified: '剛剛',
        author: currentRole === 'admin' ? '管理員 AAA' : '使用者 AAA',
        importedBy: currentRole === 'admin' ? ('admin' as const) : ('user' as const),
        options: draft.options.map((o) => ({
          id: o.id,
          text: o.text,
          subtext: o.subtext,
          isCorrect: o.isCorrect,
        })),
        correctAnswer: correctOpt,
        explanation: draft.explanation,
        status: 'unanswered',
      };
    });

    const selectedIds = new Set(selectedDraftsList.map((d) => d.id));
    setDrafts((prev) => prev.filter((d) => !selectedIds.has(d.id)));
    setSelectedDraftIds({});
    if (onSaveToBank) {
      onSaveToBank(bankQs);
    }
  };

  const handleDeleteDraft = (draftId: string) => {
    setDrafts((prev) => prev.filter((d) => d.id !== draftId));
    setSelectedDraftIds((prev) => {
      const copy = { ...prev };
      delete copy[draftId];
      return copy;
    });
  };

  const handleBatchDeleteDrafts = () => {
    setDrafts((prev) => prev.filter((d) => !selectedDraftIds[d.id]));
    setSelectedDraftIds({});
  };

  // Transform cards to exam questions
  const handleStartExam = () => {
    if (onStartExamWithQuestions) {
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
    }
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
          <span className="font-semibold text-slate-800">題目匯入</span>
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
          題目匯入
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          匯入複習筆記、考古題或文字段落，系統將自動偵測並結構化解析題目、題型、選項與正解說明。
        </p>
      </div>

      {/* Tabs: 文字快速貼上 vs 檔案批次上傳 vs 草稿題目清單 */}
      <div className="flex items-center space-x-2 border-b border-slate-200">
        <button
          type="button"
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
          type="button"
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

        <button
          type="button"
          onClick={() => setActiveTab('drafts')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
            activeTab === 'drafts'
              ? 'bg-white border-t border-x border-slate-200 text-blue-600 shadow-2xs'
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>草稿題目清單</span>
          <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
            {drafts.length}
          </span>
        </button>
      </div>

      {/* 2-Columns Layout: Left Text Area vs Right Parsed Cards */}
      {activeTab === 'text' && (
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
      )}

      {/* TAB 2: 檔案批次上傳模式 */}
      {activeTab === 'file' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-8 text-center space-y-5">
            <div className="max-w-md mx-auto space-y-2">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-2xs">
                <UploadCloud className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-800">
                批次匯入試題檔案
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                支援試題試算表 (.xlsx, .csv) 或試卷文件 (.docx)。系統將自動剖析題幹、選項、正解與詳解解析。
              </p>
            </div>

            {/* Dropzone */}
            <div
              onClick={() => {
                setToastMessage('已模擬解析試題範本檔案！已載入 3 題試題至下方預覽卡片。');
                setShowDraftSaved(true);
                setTimeout(() => setShowDraftSaved(false), 2500);
              }}
              className="border-2 border-dashed border-slate-200 hover:border-blue-400 hover:bg-blue-50/20 rounded-2xl p-8 transition cursor-pointer max-w-xl mx-auto flex flex-col items-center justify-center space-y-3"
            >
              <FileSpreadsheet className="w-10 h-10 text-slate-400" />
              <div className="text-xs">
                <span className="font-semibold text-blue-600 hover:underline">點擊選擇檔案</span>
                <span className="text-slate-500"> 或將檔案拖曳至此處</span>
              </div>
              <div className="flex items-center space-x-2 text-[11px] text-slate-400">
                <span className="px-1.5 py-0.5 bg-slate-100 rounded">.xlsx</span>
                <span className="px-1.5 py-0.5 bg-slate-100 rounded">.docx</span>
                <span className="px-1.5 py-0.5 bg-slate-100 rounded">.csv</span>
                <span>單檔上限 25 MB</span>
              </div>
            </div>

            {/* Template Download Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleDownloadSample}
                className="px-4 py-2 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 rounded-xl text-xs font-semibold text-slate-700 flex items-center space-x-1.5 transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-blue-600" />
                <span>下載試題 Excel 範本 (.xlsx)</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadSample}
                className="px-4 py-2 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 rounded-xl text-xs font-semibold text-slate-700 flex items-center space-x-1.5 transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-blue-600" />
                <span>下載試題 Word 範本 (.docx)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2 & 3: 底部操作列 (只保留「儲存為草稿」與「上傳至題庫」) */}
      {(activeTab === 'text' || activeTab === 'file') && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md p-4 sm:p-5 flex items-center justify-end">
          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={handleSaveAsDraft}
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer flex items-center space-x-1.5"
            >
              <Bookmark className="w-4 h-4 text-slate-500" />
              <span>儲存為草稿</span>
            </button>

            <button
              type="button"
              onClick={handleUploadToBank}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-blue-500/25 flex items-center space-x-2 transition cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>上傳至題庫 (共 {cards.length} 題)</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: 5 & 6 草稿題目清單頁簽 (呈現方式與題庫題目管理清單相似) */}
      {activeTab === 'drafts' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
            {/* Draft Table Header */}
            <div className="pb-2 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center space-x-3">
                  <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                    草稿題目管理清單
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold font-mono">
                    共 {drafts.length} 題草稿
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  檢視、編修與管理暫存題目草稿。支援編輯題目選項與解析，可單題或批次上傳發佈至題庫。
                </p>
              </div>

              {/* Quick action to switch back */}
              <div className="flex items-center space-x-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveTab('text')}
                  className="px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>從文字匯入新題草稿</span>
                </button>
              </div>
            </div>

            {/* Filter and Search Bar matching BankView */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="relative flex-1 min-w-[220px]">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={draftSearchQuery}
                  onChange={(e) => setDraftSearchQuery(e.target.value)}
                  placeholder="搜尋草稿題幹或標籤關鍵字..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                />
              </div>

              <div className="flex items-center space-x-2">
                <select
                  value={draftDifficultyFilter}
                  onChange={(e) => setDraftDifficultyFilter(e.target.value)}
                  className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-none text-xs"
                >
                  <option value="全部難度">全部難度</option>
                  <option value="基礎">基礎</option>
                  <option value="中等">中等</option>
                  <option value="困難">困難</option>
                </select>

                <select
                  value={draftTypeFilter}
                  onChange={(e) => setDraftTypeFilter(e.target.value)}
                  className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-none text-xs"
                >
                  <option value="全部">全部題型</option>
                  <option value="單選題">單選題</option>
                  <option value="多選題">多選題</option>
                  <option value="是非題">是非題</option>
                </select>

                {/* 欄位呈現 (下拉複選) */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowDraftColumnDropdown((prev) => !prev)}
                    className={`flex items-center px-3 py-2 bg-white border rounded-xl text-slate-700 hover:bg-slate-50 transition text-xs font-medium cursor-pointer ${
                      showDraftColumnDropdown ? 'border-blue-500 ring-1 ring-blue-500/20' : 'border-slate-200'
                    }`}
                    title="自訂草稿清單欄位呈現"
                  >
                    <Filter className="w-3.5 h-3.5 text-slate-500 mr-1.5 shrink-0" />
                    <span>欄位</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-400 ml-1.5 shrink-0 transition-transform ${showDraftColumnDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {showDraftColumnDropdown && (
                    <div className="absolute right-0 mt-1.5 w-52 bg-white border border-slate-200 rounded-xl shadow-xl p-2.5 z-40 space-y-1 animate-in fade-in zoom-in-95">
                      <div className="px-2 py-1 text-[11px] font-semibold text-slate-400 border-b border-slate-100 flex items-center justify-between">
                        <span>顯示欄位 (複選)</span>
                        <div className="flex items-center space-x-1.5 text-[10px]">
                          <button
                            type="button"
                            onClick={() =>
                              setVisibleDraftColumns({
                                id: true,
                                stem: true,
                                tags: true,
                                type: true,
                                difficulty: true,
                                points: true,
                                lastModified: true,
                              })
                            }
                            className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                          >
                            全選
                          </button>
                          <span className="text-slate-300">|</span>
                          <button
                            type="button"
                            onClick={() =>
                              setVisibleDraftColumns({
                                id: true,
                                stem: false,
                                tags: false,
                                type: false,
                                difficulty: false,
                                points: false,
                                lastModified: false,
                              })
                            }
                            className="text-slate-500 hover:text-slate-700 hover:underline cursor-pointer"
                          >
                            清空
                          </button>
                        </div>
                      </div>

                      <div className="py-1 space-y-0.5">
                        {[
                          { key: 'id', label: '題號' },
                          { key: 'stem', label: '題幹' },
                          { key: 'tags', label: '標籤' },
                          { key: 'type', label: '題型' },
                          { key: 'difficulty', label: '難度' },
                          { key: 'points', label: '配分' },
                          { key: 'lastModified', label: '儲存時間' },
                        ].map((col) => {
                          const activeCount = Object.values(visibleDraftColumns).filter(Boolean).length;
                          const isOnlyActive = visibleDraftColumns[col.key] && activeCount <= 1;
                          return (
                            <label
                              key={col.key}
                              className={`flex items-center space-x-2.5 px-2 py-1.5 rounded-lg text-xs select-none ${
                                isOnlyActive
                                  ? 'text-slate-400 cursor-not-allowed bg-slate-50/50'
                                  : 'text-slate-700 hover:bg-slate-50 cursor-pointer'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={visibleDraftColumns[col.key]}
                                disabled={isOnlyActive}
                                onChange={() => {
                                  if (!isOnlyActive) {
                                    setVisibleDraftColumns((prev) => ({
                                      ...prev,
                                      [col.key]: !prev[col.key],
                                    }));
                                  }
                                }}
                                className={`rounded text-blue-600 border-slate-300 focus:ring-blue-500 w-3.5 h-3.5 ${
                                  isOnlyActive ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
                                }`}
                              />
                              <span className="font-medium">{col.label}</span>
                              {isOnlyActive && (
                                <span className="text-[10px] text-slate-400 ml-auto">(最少1項)</span>
                              )}
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Batch Actions Bar (matching BankView) */}
            {selectedDraftCount > 0 && (
              <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center space-x-2 text-amber-900 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>已選取 {selectedDraftCount} 題草稿</span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={handleBatchUploadDrafts}
                    className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-xs flex items-center space-x-1.5 transition cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>批次上傳至題庫 ({selectedDraftCount})</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleBatchDeleteDrafts}
                    className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg font-semibold flex items-center space-x-1.5 transition cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>批次刪除 ({selectedDraftCount})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedDraftIds({})}
                    className="px-2.5 py-1.5 text-slate-500 hover:text-slate-800 transition cursor-pointer"
                  >
                    取消選取
                  </button>
                </div>
              </div>
            )}

            {/* Draft Table */}
            <div className="border border-slate-200 rounded-xl overflow-x-auto shadow-2xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold select-none">
                    <th className="p-3 w-10 text-center">
                      <input
                        type="checkbox"
                        checked={isAllDraftsSelected}
                        onChange={(e) => handleSelectAllDrafts(e.target.checked)}
                        className="rounded text-blue-600 border-slate-300 focus:ring-blue-500 w-3.5 h-3.5 cursor-pointer"
                      />
                    </th>

                    {visibleDraftColumns.id && (
                      <th
                        onClick={() => handleDraftHeaderSort('id')}
                        className="p-3 w-28 cursor-pointer hover:bg-slate-100/70 transition select-none group"
                      >
                        <div className="flex items-center space-x-1.5">
                          <span>題號</span>
                          {draftSortDirections.id === 'inverted' ? (
                            <ArrowUp className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          ) : (
                            <ArrowDown
                              className={`w-3.5 h-3.5 shrink-0 ${
                                draftSortField === 'id'
                                  ? 'text-blue-600'
                                  : 'text-slate-400 group-hover:text-slate-600'
                              }`}
                            />
                          )}
                        </div>
                      </th>
                    )}

                    {visibleDraftColumns.stem && (
                      <th
                        onClick={() => handleDraftHeaderSort('stem')}
                        className="p-3 min-w-[280px] cursor-pointer hover:bg-slate-100/70 transition select-none group"
                      >
                        <div className="flex items-center space-x-1.5">
                          <span>題幹</span>
                          {draftSortDirections.stem === 'inverted' ? (
                            <ArrowUp className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          ) : (
                            <ArrowDown
                              className={`w-3.5 h-3.5 shrink-0 ${
                                draftSortField === 'stem'
                                  ? 'text-blue-600'
                                  : 'text-slate-400 group-hover:text-slate-600'
                              }`}
                            />
                          )}
                        </div>
                      </th>
                    )}

                    {visibleDraftColumns.tags && (
                      <th
                        onClick={() => handleDraftHeaderSort('tags')}
                        className="p-3 min-w-[130px] cursor-pointer hover:bg-slate-100/70 transition select-none group"
                      >
                        <div className="flex items-center space-x-1.5">
                          <span>標籤</span>
                          {draftSortDirections.tags === 'inverted' ? (
                            <ArrowUp className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          ) : (
                            <ArrowDown
                              className={`w-3.5 h-3.5 shrink-0 ${
                                draftSortField === 'tags'
                                  ? 'text-blue-600'
                                  : 'text-slate-400 group-hover:text-slate-600'
                              }`}
                            />
                          )}
                        </div>
                      </th>
                    )}

                    {visibleDraftColumns.type && (
                      <th
                        onClick={() => handleDraftHeaderSort('type')}
                        className="p-3 w-20 cursor-pointer hover:bg-slate-100/70 transition select-none group"
                      >
                        <div className="flex items-center space-x-1.5">
                          <span>題型</span>
                          {draftSortDirections.type === 'inverted' ? (
                            <ArrowUp className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          ) : (
                            <ArrowDown
                              className={`w-3.5 h-3.5 shrink-0 ${
                                draftSortField === 'type'
                                  ? 'text-blue-600'
                                  : 'text-slate-400 group-hover:text-slate-600'
                              }`}
                            />
                          )}
                        </div>
                      </th>
                    )}

                    {visibleDraftColumns.difficulty && (
                      <th
                        onClick={() => handleDraftHeaderSort('difficulty')}
                        className="p-3 w-24 cursor-pointer hover:bg-slate-100/70 transition select-none group"
                      >
                        <div className="flex items-center space-x-1.5">
                          <span>難度</span>
                          {draftSortDirections.difficulty === 'inverted' ? (
                            <ArrowUp className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          ) : (
                            <ArrowDown
                              className={`w-3.5 h-3.5 shrink-0 ${
                                draftSortField === 'difficulty'
                                  ? 'text-blue-600'
                                  : 'text-slate-400 group-hover:text-slate-600'
                              }`}
                            />
                          )}
                        </div>
                      </th>
                    )}

                    {visibleDraftColumns.points && (
                      <th
                        onClick={() => handleDraftHeaderSort('points')}
                        className="p-3 w-16 cursor-pointer hover:bg-slate-100/70 transition select-none group"
                      >
                        <div className="flex items-center space-x-1.5">
                          <span>配分</span>
                          {draftSortDirections.points === 'inverted' ? (
                            <ArrowUp className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          ) : (
                            <ArrowDown
                              className={`w-3.5 h-3.5 shrink-0 ${
                                draftSortField === 'points'
                                  ? 'text-blue-600'
                                  : 'text-slate-400 group-hover:text-slate-600'
                              }`}
                            />
                          )}
                        </div>
                      </th>
                    )}

                    {visibleDraftColumns.lastModified && (
                      <th
                        onClick={() => handleDraftHeaderSort('lastModified')}
                        className="p-3 w-28 cursor-pointer hover:bg-slate-100/70 transition select-none group"
                      >
                        <div className="flex items-center space-x-1.5">
                          <span>儲存時間</span>
                          {draftSortDirections.lastModified === 'inverted' ? (
                            <ArrowUp className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          ) : (
                            <ArrowDown
                              className={`w-3.5 h-3.5 shrink-0 ${
                                draftSortField === 'lastModified'
                                  ? 'text-blue-600'
                                  : 'text-slate-400 group-hover:text-slate-600'
                              }`}
                            />
                          )}
                        </div>
                      </th>
                    )}

                    <th className="p-3 w-40 text-center">操作</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredDrafts.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="p-8 text-center text-slate-400">
                        <Bookmark className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                        <p>尚無符合篩選條件的草稿題目</p>
                        <p className="text-[11px] text-slate-400 mt-1">
                          可在文字快速貼上完成解析後點擊「儲存為草稿」
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filteredDrafts.map((draft) => {
                      const isSelected = !!selectedDraftIds[draft.id];
                      return (
                        <tr
                          key={draft.id}
                          className={`hover:bg-blue-50/30 transition group ${
                            isSelected ? 'bg-blue-50/40' : ''
                          }`}
                        >
                          <td className="p-3 text-center">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => {
                                setSelectedDraftIds((prev) => ({
                                  ...prev,
                                  [draft.id]: !prev[draft.id],
                                }));
                              }}
                              className="rounded text-blue-600 border-slate-300 focus:ring-blue-500 w-3.5 h-3.5 cursor-pointer"
                            />
                          </td>

                          {visibleDraftColumns.id && (
                            <td className="p-3 font-mono font-bold text-amber-700 whitespace-nowrap">
                              <span className="px-1.5 py-0.5 bg-amber-50 rounded border border-amber-200/80">
                                #{draft.id}
                              </span>
                            </td>
                          )}

                          {visibleDraftColumns.stem && (
                            <td
                              onClick={() => setPreviewDraft(draft)}
                              className="p-3 text-slate-800 leading-relaxed max-w-md font-medium cursor-pointer hover:text-blue-600 transition"
                              title="點擊預覽完整題目與選項"
                            >
                              <div className="line-clamp-2">{draft.stem}</div>
                            </td>
                          )}

                          {visibleDraftColumns.tags && (
                            <td className="p-3">
                              <div className="flex flex-wrap gap-1 max-w-[160px]">
                                {draft.tags.map((t, idx) => (
                                  <span
                                    key={idx}
                                    className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-medium"
                                  >
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </td>
                          )}

                          {visibleDraftColumns.type && (
                            <td className="p-3 whitespace-nowrap">
                              <span
                                className={`px-2 py-0.5 rounded-md font-bold text-[11px] border ${
                                  draft.type === '多選題'
                                    ? 'bg-purple-100 text-purple-700 border-purple-200'
                                    : draft.type === '是非題'
                                    ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                                    : 'bg-blue-100 text-blue-700 border-blue-200'
                                }`}
                              >
                                {draft.type}
                              </span>
                            </td>
                          )}

                          {visibleDraftColumns.difficulty && (
                            <td className="p-3 whitespace-nowrap">
                              <span
                                className={`px-2 py-0.5 rounded-md font-medium text-[11px] border ${
                                  draft.difficulty === '基礎'
                                    ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                                    : draft.difficulty === '中等'
                                    ? 'bg-amber-100 text-amber-800 border-amber-200'
                                    : 'bg-rose-100 text-rose-800 border-rose-200'
                                }`}
                              >
                                {draft.difficulty}
                              </span>
                            </td>
                          )}

                          {visibleDraftColumns.points && (
                            <td className="p-3 whitespace-nowrap font-mono font-semibold text-slate-700">
                              {draft.points} 分
                            </td>
                          )}

                          {visibleDraftColumns.lastModified && (
                            <td className="p-3 whitespace-nowrap text-slate-400 text-[11px]">
                              {draft.lastModified}
                            </td>
                          )}

                          <td className="p-3 whitespace-nowrap text-center">
                            <div className="flex items-center justify-center space-x-1.5">
                              <button
                                type="button"
                                onClick={() => setPreviewDraft(draft)}
                                className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer"
                                title="檢視完整題目與選項"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>

                              <button
                                type="button"
                                onClick={() => setEditingDraft(draft)}
                                className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition cursor-pointer"
                                title="編輯草稿內容與選項"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>

                              <button
                                type="button"
                                onClick={() => handleUploadSingleDraftToBank(draft)}
                                className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition cursor-pointer"
                                title="上傳此題至正式題庫"
                              >
                                <Upload className="w-3.5 h-3.5" />
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDeleteDraft(draft.id)}
                                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                                title="刪除此草稿"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showDraftSaved && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center space-x-2 text-xs animate-in slide-in-from-bottom-5">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage || '題組資料與解析已自動儲存至草稿箱！'}</span>
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

      {/* Preview Draft Modal */}
      {previewDraft && (
        <PreviewDraftModal
          draft={previewDraft}
          onClose={() => setPreviewDraft(null)}
          onUploadToBank={handleUploadSingleDraftToBank}
        />
      )}

      {/* Edit Draft Modal */}
      {editingDraft && (
        <EditDraftModal
          draft={editingDraft}
          onClose={() => setEditingDraft(null)}
          onSave={(updated) => {
            setDrafts((prev) => prev.map((d) => (d.id === updated.id ? updated : d)));
            setEditingDraft(null);
            setToastMessage(`草稿 #${updated.id} 內容與選項已成功更新！`);
            setShowDraftSaved(true);
            setTimeout(() => setShowDraftSaved(false), 2500);
          }}
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

// Sub-component for previewing draft question
interface PreviewDraftModalProps {
  draft: DraftQuestion;
  onClose: () => void;
  onUploadToBank: (draft: DraftQuestion) => void;
}

const PreviewDraftModal: React.FC<PreviewDraftModalProps> = ({ draft, onClose, onUploadToBank }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80 shrink-0">
          <div className="flex items-center space-x-2">
            <Bookmark className="w-5 h-5 text-amber-600" />
            <h3 className="font-bold text-slate-800 text-base">
              草稿題目檢視 #{draft.id}
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
              草稿暫存中
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 overflow-y-auto flex-1 text-xs">
          {/* Metadata chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 font-bold border border-blue-200">
              {draft.type}
            </span>
            <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-medium border border-amber-200">
              {draft.difficulty}
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono">
              配分: {draft.points} 分
            </span>
            <span className="text-slate-400 ml-auto">最後儲存: {draft.lastModified}</span>
          </div>

          {/* Prompt */}
          <div className="space-y-1.5">
            <span className="text-slate-400 font-semibold block text-[11px]">完整題幹敘述：</span>
            <p className="text-slate-900 text-sm font-medium leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              {draft.stem}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-2">
            <span className="text-slate-400 font-semibold block text-[11px]">試題選項清單：</span>
            <div className="space-y-2">
              {draft.options.map((opt) => (
                <div
                  key={opt.id}
                  className={`p-3 rounded-xl border flex items-center justify-between text-xs transition ${
                    opt.isCorrect
                      ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 font-medium'
                      : 'bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span
                      className={`w-6 h-6 rounded-lg font-bold flex items-center justify-center shrink-0 ${
                        opt.isCorrect
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {opt.id}
                    </span>
                    <span>{opt.text}</span>
                  </div>
                  {opt.isCorrect && (
                    <span className="px-2 py-0.5 rounded bg-emerald-600 text-white text-[11px] font-bold flex items-center space-x-1 shrink-0">
                      <Check className="w-3 h-3" />
                      <span>正解</span>
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Explanation */}
          {draft.explanation && (
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <span className="text-slate-400 font-semibold block text-[11px]">觀念解析與說明：</span>
              <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-blue-900 text-xs leading-relaxed">
                {draft.explanation}
              </div>
            </div>
          )}

          {/* Tags */}
          {draft.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-slate-400 text-[11px]">標籤：</span>
              {draft.tags.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px]"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold text-xs transition cursor-pointer"
          >
            關閉
          </button>

          <button
            type="button"
            onClick={() => onUploadToBank(draft)}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-md shadow-blue-500/20 flex items-center space-x-1.5 transition cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>立即上傳此題至題庫</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Sub-component for editing draft question
interface EditDraftModalProps {
  draft: DraftQuestion;
  onClose: () => void;
  onSave: (updated: DraftQuestion) => void;
}

const EditDraftModal: React.FC<EditDraftModalProps> = ({ draft, onClose, onSave }) => {
  const [stem, setStem] = useState(draft.stem);
  const [type, setType] = useState(draft.type);
  const [difficulty, setDifficulty] = useState(draft.difficulty);
  const [points, setPoints] = useState(draft.points);
  const [tagsInput, setTagsInput] = useState(draft.tags.join(', '));
  const [options, setOptions] = useState(draft.options);
  const [explanation, setExplanation] = useState(draft.explanation);

  const handleToggleCorrect = (index: number) => {
    setOptions((prev) =>
      prev.map((opt, i) => {
        if (type === '多選題') {
          return i === index ? { ...opt, isCorrect: !opt.isCorrect } : opt;
        }
        return { ...opt, isCorrect: i === index };
      })
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
      { id: nextId, text: '', isCorrect: false },
    ]);
  };

  const handleDeleteOption = (index: number) => {
    if (options.length <= 2) return;
    setOptions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctOpt = options.find((o) => o.isCorrect)?.id || 'A';
    const parsedTags = tagsInput
      .split(/[,，、]/)
      .map((t) => t.trim())
      .filter(Boolean);

    onSave({
      ...draft,
      stem,
      prompt: stem,
      type,
      difficulty,
      points,
      tags: parsedTags.length > 0 ? parsedTags : draft.tags,
      options,
      correctAnswer: correctOpt,
      explanation,
      lastModified: '剛剛',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80 shrink-0">
          <div className="flex items-center space-x-2">
            <Edit2 className="w-4 h-4 text-amber-600" />
            <h3 className="font-bold text-slate-800 text-base">
              編輯草稿試題 #{draft.id}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs overflow-y-auto flex-1">
          <div className="space-y-1">
            <label className="font-semibold text-slate-700">完整題幹敘述 (Stem / Prompt) *</label>
            <textarea
              required
              rows={4}
              value={stem}
              onChange={(e) => setStem(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs leading-relaxed"
            />
          </div>

          {/* Option Editor */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-700 flex items-center space-x-1.5">
                <span>試題選項內容與正解設定 *</span>
                <span className="text-[10px] text-slate-400 font-normal">（點擊標籤可設為正解）</span>
              </label>
              <button
                type="button"
                onClick={handleAddOption}
                className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>新增選項</span>
              </button>
            </div>

            <div className="space-y-2">
              {options.map((opt, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => handleToggleCorrect(idx)}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer shrink-0 ${
                      opt.isCorrect
                        ? 'bg-emerald-500 text-white border-emerald-600 shadow-xs'
                        : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                    }`}
                    title="點擊設定為正解"
                  >
                    {opt.isCorrect ? '✓ 正解' : '選項'} {opt.id || String.fromCharCode(65 + idx)}
                  </button>

                  <input
                    type="text"
                    required
                    value={opt.text}
                    onChange={(e) => handleOptionTextChange(idx, e.target.value)}
                    placeholder={`請輸入選項 ${opt.id} 的文字敘述...`}
                    className="flex-1 p-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />

                  {options.length > 2 && (
                    <button
                      type="button"
                      onClick={() => handleDeleteOption(idx)}
                      className="p-1.5 text-slate-400 hover:text-rose-500 rounded transition cursor-pointer"
                      title="刪除此選項"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Type, Difficulty, Points */}
          <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-100">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">題型</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full p-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="單選題">單選題</option>
                <option value="多選題">多選題</option>
                <option value="是非題">是非題</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">難度</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full p-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="基礎">基礎</option>
                <option value="中等">中等</option>
                <option value="困難">困難</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">配分 (Points)</label>
              <input
                type="number"
                min="1"
                max="20"
                value={points}
                onChange={(e) => setPoints(Number(e.target.value))}
                className="w-full p-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-700">標籤 (以逗號分隔)</label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="例：分散式系統, CAP定理, 系統架構"
              className="w-full p-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Explanation */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-700">解析與備註 (Explanation)</label>
            <textarea
              rows={3}
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold transition cursor-pointer"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold shadow-md shadow-amber-500/20 transition cursor-pointer"
            >
              儲存草稿修改
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
