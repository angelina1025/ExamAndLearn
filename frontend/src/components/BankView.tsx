import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Filter,
  Plus,
  Upload,
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
  CheckSquare,
  Square,
  Edit,
  Eye,
  Trash2,
  Database,
  ArrowUpDown,
  ArrowDown,
  ArrowUp,
  Tag,
  Share2,
  Layers,
  Sliders,
  Lock,
  ShieldCheck,
  ShieldAlert,
  UserCheck,
  Check,
  AlertCircle,
  X,
} from 'lucide-react';
import { mockBankQuestions, initialCategories } from '../data/mockData';
import { CategoryNode, ExamQuestion } from '../types';
import { UserRole } from './Navbar';
import { AssemblyModal } from './AssemblyModal';
import { NewQuestionModal } from './NewQuestionModal';
import { ManualVariantModal } from './ManualVariantModal';
// Isolated AI feature module (can be toggled with AI_CONFIG.ENABLE_AI_API)
import { AiDeriveModal, AI_CONFIG } from '../ai-features';

type SortField = 'id' | 'prompt' | 'tags' | 'type' | 'difficulty' | 'points' | 'lastModified';
type SortDirection = 'default' | 'inverted';

interface BankViewProps {
  currentRole?: UserRole;
  questions?: any[];
  onUpdateQuestions?: (qs: any[]) => void;
  onStartExam: () => void;
  onNavigateToImport: () => void;
  onOpenOfflineManager?: () => void;
}

export const BankView: React.FC<BankViewProps> = ({
  currentRole = 'user',
  questions: externalQuestions,
  onUpdateQuestions,
  onStartExam,
  onNavigateToImport,
  onOpenOfflineManager,
}) => {
  const [categories, setCategories] = useState<CategoryNode[]>(initialCategories);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('sorting-searching');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTypeFilter, setActiveTypeFilter] = useState<string>('全部');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('全部難度');
  const [localQuestions, setLocalQuestions] = useState<any[]>(mockBankQuestions);

  const questions = externalQuestions || localQuestions;
  const setQuestions = (updater: any) => {
    if (onUpdateQuestions) {
      if (typeof updater === 'function') {
        onUpdateQuestions(updater(questions));
      } else {
        onUpdateQuestions(updater);
      }
    } else {
      setLocalQuestions(updater);
    }
  };

  // 4. 使用者上傳的題目不會同步呈現到其他使用者題庫，只有管理員上傳的題目才會同步呈現到所有使用者的題庫
  const roleVisibleQuestions = questions.filter((q) => {
    if (currentRole === 'admin') {
      return true; // 管理員可檢視所有題目以進行題目審核
    }
    // 使用者模式 (使用者 AAA)
    if (q.importedBy === 'admin') {
      return true; // 管理員上傳的題目同步呈現到所有使用者的題庫
    }
    // 只有使用者自己 (使用者 AAA) 上傳的題目才會呈現給自己，不會呈現其他使用者的私有題目
    return q.author === '使用者 AAA' || (q.importedBy === 'user' && !q.author?.includes('王小明'));
  });

  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({
    'QS-0842': true,
  });

  // Sorting state: field and per-column direction
  const [sortField, setSortField] = useState<SortField>('lastModified');
  const [sortDirections, setSortDirections] = useState<Record<SortField, SortDirection>>({
    id: 'default',
    prompt: 'default',
    tags: 'default',
    type: 'default',
    difficulty: 'default',
    points: 'default',
    lastModified: 'default',
  });

  const handleHeaderSort = (field: SortField) => {
    setSortField(field);
    setSortDirections((prev) => ({
      ...prev,
      [field]: prev[field] === 'default' ? 'inverted' : 'default',
    }));
  };

  // Column visibility state (multi-select)
  const [showColumnDropdown, setShowColumnDropdown] = useState<boolean>(false);
  const columnDropdownRef = useRef<HTMLDivElement>(null);

  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
    id: true,
    prompt: true,
    tags: true,
    type: true,
    difficulty: true,
    points: true,
    lastModified: true,
    actions: true,
  });

  const columnOptions = [
    { key: 'id', label: '題號' },
    { key: 'prompt', label: '題幹' },
    { key: 'tags', label: '知識點標籤' },
    { key: 'type', label: '題型' },
    { key: 'difficulty', label: '難度係數' },
    { key: 'points', label: '配分' },
    { key: 'lastModified', label: '最後修訂紀錄' },
    { key: 'actions', label: '操作' },
  ];

  const activeColumnCount = Object.values(visibleColumns).filter(Boolean).length;

  const handleToggleColumn = (key: string) => {
    // 至少要保留一個欄位
    if (visibleColumns[key] && activeColumnCount <= 1) {
      return;
    }
    setVisibleColumns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSelectAllColumns = () => {
    setVisibleColumns({
      id: true,
      prompt: true,
      tags: true,
      type: true,
      difficulty: true,
      points: true,
      lastModified: true,
      actions: true,
    });
  };

  const handleClearColumns = () => {
    // 清空時預設勾選題號
    setVisibleColumns({
      id: true,
      prompt: false,
      tags: false,
      type: false,
      difficulty: false,
      points: false,
      lastModified: false,
      actions: false,
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (columnDropdownRef.current && !columnDropdownRef.current.contains(event.target as Node)) {
        setShowColumnDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Modals state
  const [showAssemblyModal, setShowAssemblyModal] = useState<boolean>(false);
  const [showAiDeriveModal, setShowAiDeriveModal] = useState<boolean>(false);
  const [showManualVariantModal, setShowManualVariantModal] = useState<boolean>(false);
  const [showNewModal, setShowNewModal] = useState<boolean>(false);
  const [showPreviewModal, setShowPreviewModal] = useState<any | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<any | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // 判斷是否為使用者自行匯入的題目
  const isUserQuestion = (q: any) => {
    return q.importedBy === 'user' || q.author?.includes('使用者 AAA') || q.author?.includes('使用者');
  };

  // 管理員匯入的題目只有管理員能編輯或刪除，使用者只能檢視
  // 使用者能編輯或刪除的只有自己匯入的題目
  const canEditOrDelete = (q: any) => {
    if (currentRole === 'admin') {
      return true;
    }
    return isUserQuestion(q);
  };

  const handleEditQuestion = (q: any) => {
    if (!canEditOrDelete(q)) {
      showToast('此題目為管理員匯入之試題，您目前僅具備檢視完整題幹權限，無法進行編輯。');
      return;
    }
    const defaultOpts = [
      { id: 'A', text: '', isCorrect: true },
      { id: 'B', text: '', isCorrect: false },
      { id: 'C', text: '', isCorrect: false },
      { id: 'D', text: '', isCorrect: false },
    ];
    setEditingQuestion({
      ...q,
      options: q.options && q.options.length > 0 ? JSON.parse(JSON.stringify(q.options)) : defaultOpts,
    });
  };

  const handleSaveEditedQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingQuestion) return;
    setQuestions((prev: any[]) =>
      prev.map((item) => (item.id === editingQuestion.id ? editingQuestion : item))
    );
    if (showPreviewModal?.id === editingQuestion.id) {
      setShowPreviewModal(editingQuestion);
    }
    showToast(`試題 #${editingQuestion.id} 已成功更新修訂（含題幹與選項）`);
    setEditingQuestion(null);
  };

  const handleDeleteQuestion = (id: string) => {
    const target = questions.find((q: any) => q.id === id);
    if (!target) return;
    if (!canEditOrDelete(target)) {
      showToast('此題目為管理員匯入之試題，您無權限刪除。');
      return;
    }
    if (window.confirm(`確定要刪除試題 #${id} 嗎？此操作無法復原。`)) {
      setQuestions((prev: any[]) => prev.filter((item) => item.id !== id));
      if (showPreviewModal?.id === id) {
        setShowPreviewModal(null);
      }
      showToast(`試題 #${id} 已自題庫中刪除`);
    }
  };

  // Toggle category tree nodes
  const toggleCategory = (id: string) => {
    const toggleNode = (nodes: CategoryNode[]): CategoryNode[] => {
      return nodes.map((n) => {
        if (n.id === id) {
          return { ...n, isOpen: !n.isOpen };
        }
        if (n.children) {
          return { ...n, children: toggleNode(n.children) };
        }
        return n;
      });
    };
    setCategories(toggleNode(categories));
  };

  const handleSelectAll = (checked: boolean) => {
    const updated: Record<string, boolean> = {};
    if (checked) {
      roleVisibleQuestions.forEach((q: any) => {
        updated[q.id] = true;
      });
    }
    setSelectedRows(updated);
  };

  const handleToggleRow = (id: string) => {
    setSelectedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleAddNewQuestion = (newQ: any) => {
    const enriched = {
      ...newQ,
      author: currentRole === 'admin' ? '管理員 AAA' : '使用者 AAA',
      importedBy: currentRole === 'admin' ? 'admin' : 'user',
    };
    setQuestions([enriched, ...questions]);
  };

  const selectedCount = Object.values(selectedRows).filter(Boolean).length;
  const isAllSelected = selectedCount > 0 && selectedCount === roleVisibleQuestions.length;

  // Filter questions based on type, difficulty, search query, and sorting
  const filteredQuestions = roleVisibleQuestions
    .filter((q: any) => {
      if (difficultyFilter !== '全部難度' && q.difficulty !== difficultyFilter) {
        return false;
      }
      if (activeTypeFilter !== '全部' && !q.type.includes(activeTypeFilter.replace('題', ''))) {
        return false;
      }
      if (searchQuery.trim() && !q.prompt.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      const dir = sortDirections[sortField] || 'default';
      const isDefault = dir === 'default';

      switch (sortField) {
        case 'id': {
          const idA = parseInt(a.id.replace(/\D/g, '') || '0', 10);
          const idB = parseInt(b.id.replace(/\D/g, '') || '0', 10);
          return isDefault ? idA - idB : idB - idA;
        }
        case 'prompt': {
          return isDefault ? a.prompt.localeCompare(b.prompt) : b.prompt.localeCompare(a.prompt);
        }
        case 'tags': {
          const tagA = (a.tags || []).join(',');
          const tagB = (b.tags || []).join(',');
          return isDefault ? tagA.localeCompare(tagB) : tagB.localeCompare(tagA);
        }
        case 'type': {
          return isDefault ? a.type.localeCompare(b.type) : b.type.localeCompare(a.type);
        }
        case 'difficulty': {
          // 預設由低到高: 基礎 (1) -> 中等 (2) -> 困難 (3)
          // 向上: 由高到低: 困難 (3) -> 中等 (2) -> 基礎 (1)
          const diffWeight: Record<string, number> = { '基礎': 1, '中等': 2, '困難': 3 };
          const wA = diffWeight[a.difficulty] || 2;
          const wB = diffWeight[b.difficulty] || 2;
          return isDefault ? wA - wB : wB - wA;
        }
        case 'points': {
          // 預設由低到高: 1分 -> 2分 -> 3分
          // 向上: 由高到低: 3分 -> 2分 -> 1分
          const pA = a.points || 0;
          const pB = b.points || 0;
          return isDefault ? pA - pB : pB - pA;
        }
        case 'lastModified': {
          // 預設由近到遠: 最新在前 (2 小時前 < 昨天 < 3 天前)
          // 向上: 由遠至近
          const getTimeRank = (t: string) => {
            if (t.includes('分鐘') || t.includes('小時')) return 1;
            if (t.includes('昨天')) return 2;
            if (t.includes('天前')) {
              const days = parseInt(t.match(/\d+/)?.[0] || '1', 10);
              return 2 + days;
            }
            return 99;
          };
          const rankA = getTimeRank(a.lastModified || '');
          const rankB = getTimeRank(b.lastModified || '');
          return isDefault ? rankA - rankB : rankB - rankA;
        }
        default:
          return 0;
      }
    });

  return (
    <div className="max-w-[1580px] mx-auto px-4 sm:px-6 py-4 space-y-4">
      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column (3.5 cols): Category Tree (7 層級) */}
        <div className="lg:col-span-3 space-y-3">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Folder className="w-4 h-4 text-blue-600" />
                <span className="font-bold text-slate-800 text-xs sm:text-sm">題庫分類層</span>
              </div>
              <div className="flex items-center space-x-1.5 text-xs text-slate-600 font-semibold bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/80">
                <Database className="w-3.5 h-3.5 text-blue-600" />
                <span>題庫總量：12,480 題</span>
              </div>
            </div>

            {/* Tree Search Box */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="篩選節點..."
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Tree Nodes List matching Image 7 */}
            <div className="space-y-1 text-xs max-h-[580px] overflow-y-auto pr-1">
              {/* Level 1: 電腦科學與資訊工程 */}
              <div>
                <button
                  onClick={() => toggleCategory('cs')}
                  className="w-full flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-50 text-slate-800 font-semibold text-left transition"
                >
                  <div className="flex items-center space-x-1.5 truncate">
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <FolderOpen className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="truncate">電腦科學與資訊工程</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 font-normal">1,240</span>
                </button>

                {/* Level 2: 資料結構與演算法 */}
                <div className="pl-4 space-y-0.5 mt-0.5 border-l border-slate-100 ml-3">
                  <button
                    onClick={() => toggleCategory('dsa')}
                    className="w-full flex items-center justify-between p-1 rounded-lg hover:bg-slate-50 text-slate-700 text-left transition"
                  >
                    <div className="flex items-center space-x-1.5 truncate">
                      <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
                      <FolderOpen className="w-3 h-3 text-indigo-500 shrink-0" />
                      <span className="truncate">資料結構與演算法</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">580</span>
                  </button>

                  {/* Level 3: Children */}
                  <div className="pl-4 space-y-0.5 border-l border-slate-100 ml-2.5">
                    <div className="flex items-center justify-between p-1 rounded-md hover:bg-slate-50 text-slate-600 cursor-pointer">
                      <span className="truncate">陣列與鏈結串列</span>
                      <span className="text-[10px] font-mono text-slate-400">120</span>
                    </div>

                    <div className="flex items-center justify-between p-1 rounded-md hover:bg-slate-50 text-slate-600 cursor-pointer">
                      <span className="truncate">堆疊與佇列</span>
                      <span className="text-[10px] font-mono text-slate-400">85</span>
                    </div>

                    {/* Active: 排序與搜尋演算法 (145) */}
                    <div>
                      <button
                        onClick={() => setSelectedCategoryId('sorting-searching')}
                        className="w-full flex items-center justify-between p-1.5 rounded-lg bg-blue-50 text-blue-700 font-semibold text-left border border-blue-200/60"
                      >
                        <div className="flex items-center space-x-1.5 truncate">
                          <ChevronDown className="w-3 h-3 text-blue-600 shrink-0" />
                          <span className="truncate">排序與搜尋演算法</span>
                        </div>
                        <span className="text-[10px] font-mono px-1.5 bg-blue-600 text-white rounded-full">
                          145
                        </span>
                      </button>

                      {/* Sub nodes under 排序與搜尋 */}
                      <div className="pl-4 space-y-0.5 border-l border-blue-200 ml-2 mt-0.5 py-0.5">
                        <div className="flex items-center justify-between p-1 text-slate-600 hover:text-blue-700 cursor-pointer text-[11px]">
                          <span>快速排序與分割</span>
                          <span className="font-mono text-slate-400">42</span>
                        </div>
                        <div className="flex items-center justify-between p-1 text-slate-600 hover:text-blue-700 cursor-pointer text-[11px]">
                          <span>合併排序與分治</span>
                          <span className="font-mono text-slate-400">38</span>
                        </div>
                        <div className="flex items-center justify-between p-1 text-slate-600 hover:text-blue-700 cursor-pointer text-[11px]">
                          <span>堆積排序</span>
                          <span className="font-mono text-slate-400">35</span>
                        </div>
                        <div className="flex items-center justify-between p-1 text-slate-600 hover:text-blue-700 cursor-pointer text-[11px]">
                          <span>二元搜尋</span>
                          <span className="font-mono text-slate-400">30</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-1 rounded-md hover:bg-slate-50 text-slate-600 cursor-pointer">
                      <span className="truncate">樹狀結構與平衡樹</span>
                      <span className="text-[10px] font-mono text-slate-400">230</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-1 rounded-md hover:bg-slate-50 text-slate-700 cursor-pointer">
                    <div className="flex items-center space-x-1.5">
                      <ChevronRight className="w-3 h-3 text-slate-400" />
                      <Folder className="w-3 h-3 text-slate-400" />
                      <span>作業系統原理</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">320</span>
                  </div>

                  <div className="flex items-center justify-between p-1 rounded-md hover:bg-slate-50 text-slate-700 cursor-pointer">
                    <div className="flex items-center space-x-1.5">
                      <ChevronRight className="w-3 h-3 text-slate-400" />
                      <Folder className="w-3 h-3 text-slate-400" />
                      <span>計算機網路</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">340</span>
                  </div>
                </div>
              </div>

              {/* Level 1: 高等微積分與線性代數 */}
              <div className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-50 text-slate-800 font-medium cursor-pointer">
                <div className="flex items-center space-x-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  <Folder className="w-3.5 h-3.5 text-slate-400" />
                  <span>高等微積分與線性代數</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">890</span>
              </div>

              {/* Level 1: 軟體工程與系統設計 */}
              <div className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-50 text-slate-800 font-medium cursor-pointer">
                <div className="flex items-center space-x-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  <Folder className="w-3.5 h-3.5 text-slate-400" />
                  <span>軟體工程與系統設計</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">410</span>
              </div>
            </div>

            {/* Bottom Category Actions */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <button
                onClick={() => {}}
                className="flex items-center space-x-1 text-slate-600 hover:text-blue-600 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>新增子分類</span>
              </button>

              <button
                onClick={() => {}}
                className="flex items-center space-x-1 text-slate-500 hover:text-slate-800 transition"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>分類批次匯出</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (8.5 cols): Question Bank Table & Intelligence Widgets */}
        <div className="lg:col-span-9 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
            {/* Breadcrumb & Main Header */}
            <div className="pb-2 border-b border-slate-100">
              <div>
                <div className="flex items-center space-x-2 text-xs text-slate-400">
                  <span>電腦科學與資訊工程</span>
                  <span>&gt;</span>
                  <span>資料結構與演算法</span>
                  <span>&gt;</span>
                  <span className="font-semibold text-blue-600">排序與搜尋演算法</span>
                </div>
                <div className="flex items-center space-x-3 mt-1">
                  <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                    題庫題目管理清單
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold font-mono">
                    248 題
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  檢視、編修與管理此分類下的測驗題目，支援多維度搜尋、題庫品質審查與即時考卷編排。
                </p>
              </div>
            </div>

            {/* Filter and Search Bar matching Image 7 */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="relative flex-1 min-w-[220px]">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜尋題幹關鍵: Ctrl K"
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                />
              </div>

              <div className="flex items-center space-x-2">
                <select
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value)}
                  className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-none text-xs"
                >
                  <option value="全部難度">全部難度</option>
                  <option value="基礎">基礎</option>
                  <option value="中等">中等</option>
                  <option value="困難">困難</option>
                </select>

                <select
                  value={activeTypeFilter}
                  onChange={(e) => setActiveTypeFilter(e.target.value)}
                  className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-none text-xs"
                >
                  <option value="全部">全部題型</option>
                  <option value="單選題">單選題</option>
                  <option value="多選題">多選題</option>
                  <option value="是非題">是非題</option>
                </select>

                {/* 欄位呈現 (下拉複選) */}
                <div className="relative" ref={columnDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setShowColumnDropdown((prev) => !prev)}
                    className={`flex items-center px-3 py-2 bg-white border rounded-xl text-slate-700 hover:bg-slate-50 transition text-xs font-medium cursor-pointer ${
                      showColumnDropdown ? 'border-blue-500 ring-1 ring-blue-500/20' : 'border-slate-200'
                    }`}
                    title="自訂題目清單欄位呈現"
                  >
                    <Filter className="w-3.5 h-3.5 text-slate-500 mr-1.5 shrink-0" />
                    <span>欄位</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-400 ml-1.5 shrink-0 transition-transform ${showColumnDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {showColumnDropdown && (
                    <div className="absolute right-0 mt-1.5 w-52 bg-white border border-slate-200 rounded-xl shadow-xl p-2.5 z-40 space-y-1 animate-in fade-in zoom-in-95">
                      <div className="px-2 py-1 text-[11px] font-semibold text-slate-400 border-b border-slate-100 flex items-center justify-between">
                        <span>顯示欄位 (複選)</span>
                        <div className="flex items-center space-x-1.5 text-[10px]">
                          <button
                            type="button"
                            onClick={handleSelectAllColumns}
                            className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                          >
                            全選
                          </button>
                          <span className="text-slate-300">|</span>
                          <button
                            type="button"
                            onClick={handleClearColumns}
                            className="text-slate-500 hover:text-slate-700 hover:underline cursor-pointer"
                            title="清空並保留預設題號"
                          >
                            清空
                          </button>
                        </div>
                      </div>

                      <div className="py-1 space-y-0.5">
                        {columnOptions.map((col) => {
                          const isOnlyActive = visibleColumns[col.key] && activeColumnCount <= 1;

                          return (
                            <label
                              key={col.key}
                              className={`flex items-center space-x-2.5 px-2 py-1.5 rounded-lg text-xs select-none ${
                                isOnlyActive
                                  ? 'text-slate-400 cursor-not-allowed bg-slate-50/50'
                                  : 'text-slate-700 hover:bg-slate-50 cursor-pointer'
                              }`}
                              title={isOnlyActive ? '至少需保留一個顯示欄位' : undefined}
                            >
                              <input
                                type="checkbox"
                                checked={visibleColumns[col.key]}
                                disabled={isOnlyActive}
                                onChange={() => handleToggleColumn(col.key)}
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

            {/* Data Table matching Image 7 */}
            <div className="border border-slate-200 rounded-xl overflow-x-auto shadow-2xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold select-none">
                    <th className="p-3 w-10 text-center">
                      <input
                        type="checkbox"
                        checked={isAllSelected}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className="rounded text-blue-600 border-slate-300 focus:ring-blue-500 w-3.5 h-3.5 cursor-pointer"
                      />
                    </th>

                    {visibleColumns.id && (
                      <th
                        onClick={() => handleHeaderSort('id')}
                        className="p-3 w-28 cursor-pointer hover:bg-slate-100/70 transition select-none group"
                        title={sortDirections.id === 'default' ? '目前排序：題號由低到高 (點擊切換為由高到低)' : '目前排序：題號由高到低 (點擊切換為由低到高)'}
                      >
                        <div className="flex items-center space-x-1.5">
                          <span>題號</span>
                          {sortDirections.id === 'inverted' ? (
                            <ArrowUp className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          ) : (
                            <ArrowDown className={`w-3.5 h-3.5 shrink-0 ${sortField === 'id' ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                          )}
                        </div>
                      </th>
                    )}

                    {visibleColumns.prompt && (
                      <th
                        onClick={() => handleHeaderSort('prompt')}
                        className="p-3 min-w-[280px] cursor-pointer hover:bg-slate-100/70 transition select-none group"
                        title={sortDirections.prompt === 'default' ? '目前排序：題幹由低到高 (點擊切換為由高到低)' : '目前排序：題幹由高到低 (點擊切換為由低到高)'}
                      >
                        <div className="flex items-center space-x-1.5">
                          <span>題幹</span>
                          {sortDirections.prompt === 'inverted' ? (
                            <ArrowUp className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          ) : (
                            <ArrowDown className={`w-3.5 h-3.5 shrink-0 ${sortField === 'prompt' ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                          )}
                        </div>
                      </th>
                    )}

                    {visibleColumns.tags && (
                      <th
                        onClick={() => handleHeaderSort('tags')}
                        className="p-3 min-w-[130px] cursor-pointer hover:bg-slate-100/70 transition select-none group"
                        title={sortDirections.tags === 'default' ? '目前排序：由低到高 (點擊切換為由高到低)' : '目前排序：由高到低 (點擊切換為由低到高)'}
                      >
                        <div className="flex items-center space-x-1.5">
                          <span>知識點標籤</span>
                          {sortDirections.tags === 'inverted' ? (
                            <ArrowUp className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          ) : (
                            <ArrowDown className={`w-3.5 h-3.5 shrink-0 ${sortField === 'tags' ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                          )}
                        </div>
                      </th>
                    )}

                    {visibleColumns.type && (
                      <th
                        onClick={() => handleHeaderSort('type')}
                        className="p-3 w-20 cursor-pointer hover:bg-slate-100/70 transition select-none group"
                        title={sortDirections.type === 'default' ? '目前排序：由低到高 (點擊切換為由高到低)' : '目前排序：由高到低 (點擊切換為由低到高)'}
                      >
                        <div className="flex items-center space-x-1.5">
                          <span>題型</span>
                          {sortDirections.type === 'inverted' ? (
                            <ArrowUp className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          ) : (
                            <ArrowDown className={`w-3.5 h-3.5 shrink-0 ${sortField === 'type' ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                          )}
                        </div>
                      </th>
                    )}

                    {visibleColumns.difficulty && (
                      <th
                        onClick={() => handleHeaderSort('difficulty')}
                        className="p-3 w-24 cursor-pointer hover:bg-slate-100/70 transition select-none group"
                        title={sortDirections.difficulty === 'default' ? '目前排序：由低到高 (基礎→困難，點擊切換為由高到低)' : '目前排序：由高到低 (困難→基礎，點擊切換為由低到高)'}
                      >
                        <div className="flex items-center space-x-1.5">
                          <span>難度係數</span>
                          {sortDirections.difficulty === 'inverted' ? (
                            <ArrowUp className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          ) : (
                            <ArrowDown className={`w-3.5 h-3.5 shrink-0 ${sortField === 'difficulty' ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                          )}
                        </div>
                      </th>
                    )}

                    {visibleColumns.points && (
                      <th
                        onClick={() => handleHeaderSort('points')}
                        className="p-3 w-16 text-center cursor-pointer hover:bg-slate-100/70 transition select-none group"
                        title={sortDirections.points === 'default' ? '目前排序：由低到高 (點擊切換為由高到低)' : '目前排序：由高到低 (點擊切換為由低到高)'}
                      >
                        <div className="flex items-center justify-center space-x-1">
                          <span>配分</span>
                          {sortDirections.points === 'inverted' ? (
                            <ArrowUp className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          ) : (
                            <ArrowDown className={`w-3.5 h-3.5 shrink-0 ${sortField === 'points' ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                          )}
                        </div>
                      </th>
                    )}

                    {visibleColumns.lastModified && (
                      <th
                        onClick={() => handleHeaderSort('lastModified')}
                        className="p-3 min-w-[140px] cursor-pointer hover:bg-slate-100/70 transition select-none group"
                        title={sortDirections.lastModified === 'default' ? '目前排序：由近到遠 (點擊切換為由遠至近)' : '目前排序：由遠至近 (點擊切換為由近到遠)'}
                      >
                        <div className="flex items-center space-x-1.5">
                          <span>最後修訂紀錄</span>
                          {sortDirections.lastModified === 'inverted' ? (
                            <ArrowUp className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          ) : (
                            <ArrowDown className={`w-3.5 h-3.5 shrink-0 ${sortField === 'lastModified' ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                          )}
                        </div>
                      </th>
                    )}

                    {visibleColumns.actions && (
                      <th className="p-3 w-16 text-right">操作</th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredQuestions.map((row) => {
                    const isChecked = selectedRows[row.id] ?? false;

                    return (
                      <tr
                        key={row.id}
                        className={`transition hover:bg-slate-50/80 ${
                          isChecked ? 'bg-blue-50/40' : ''
                        }`}
                      >
                        {/* Checkbox */}
                        <td className="p-3 text-center">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleToggleRow(row.id)}
                            className="rounded text-blue-600 border-slate-300 focus:ring-blue-500 w-3.5 h-3.5 cursor-pointer"
                          />
                        </td>

                        {/* Question ID */}
                        {visibleColumns.id && (
                          <td className="p-3 whitespace-nowrap">
                            <span className="font-mono font-bold text-blue-700">
                              #{row.id}
                            </span>
                          </td>
                        )}

                        {/* Prompt */}
                        {visibleColumns.prompt && (
                          <td className="p-3">
                            <div className="font-medium text-slate-800 line-clamp-2 leading-relaxed">
                              {row.prompt}
                            </div>
                          </td>
                        )}

                        {/* Tags */}
                        {visibleColumns.tags && (
                          <td className="p-3">
                            <div className="flex flex-wrap gap-1">
                              {row.tags.map((t, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[11px] rounded"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </td>
                        )}

                        {/* Question Type */}
                        {visibleColumns.type && (
                          <td className="p-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${row.typeBadgeColor}`}
                            >
                              {row.type}
                            </span>
                          </td>
                        )}

                        {/* Difficulty */}
                        {visibleColumns.difficulty && (
                          <td className="p-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[11px] font-medium border font-mono ${row.difficultyColor}`}
                            >
                              {row.difficulty} ({row.difficultyScore})
                            </span>
                          </td>
                        )}

                        {/* Points */}
                        {visibleColumns.points && (
                          <td className="p-3 text-center font-bold text-blue-700 font-mono">
                            {row.points} 分
                          </td>
                        )}

                        {/* Revision */}
                        {visibleColumns.lastModified && (
                          <td className="p-3 text-slate-500 text-[11px] leading-snug">
                            <div className="font-medium text-slate-700">{row.lastModified}</div>
                            <div className="flex items-center space-x-1.5 mt-0.5">
                              <span className="text-slate-400">{row.author}</span>
                              {isUserQuestion(row) ? (
                                <span className="px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 text-[10px] font-semibold border border-emerald-200/60">
                                  自訂匯入
                                </span>
                              ) : (
                                <span className="px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 text-[10px] font-semibold border border-blue-200/60">
                                  管理員匯入
                                </span>
                              )}
                            </div>
                          </td>
                        )}

                        {/* Action buttons */}
                        {visibleColumns.actions && (
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end space-x-1.5 text-slate-400">
                              <button
                                onClick={() => setShowPreviewModal(row)}
                                className="p-1 hover:text-blue-600 hover:bg-blue-50 rounded transition cursor-pointer"
                                title="檢視試題完整題幹"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>

                              {canEditOrDelete(row) ? (
                                <>
                                  <button
                                    onClick={() => handleEditQuestion(row)}
                                    className="p-1 hover:text-blue-600 hover:bg-blue-50 rounded transition cursor-pointer"
                                    title="編輯試題"
                                  >
                                    <Edit className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteQuestion(row.id)}
                                    className="p-1 hover:text-rose-600 hover:bg-rose-50 rounded transition cursor-pointer"
                                    title="刪除試題"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </>
                              ) : (
                                <span
                                  className="p-1 text-slate-300 flex items-center"
                                  title="管理員匯入之題目僅供檢視，無編輯或刪除權限"
                                >
                                  <Lock className="w-3.5 h-3.5" />
                                </span>
                              )}
                            </div>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Table Footer: Bulk selection actions & Pagination matching Image 7 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 text-xs">
              {/* Left Bulk Actions */}
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg font-semibold flex items-center space-x-1">
                  <CheckSquare className="w-3.5 h-3.5" />
                  <span>已勾選 {selectedCount} 項題目</span>
                </span>

                <button
                  onClick={() => setShowAssemblyModal(true)}
                  className="px-3 py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg font-medium transition cursor-pointer"
                >
                  批次加入考卷
                </button>

                <button className="px-3 py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg font-medium transition">
                  批次調整標籤
                </button>

                <button className="px-3 py-1 bg-white border border-rose-200 hover:bg-rose-50 text-rose-600 rounded-lg font-medium transition">
                  刪除
                </button>
              </div>

              {/* Right Pagination */}
              <div className="flex items-center space-x-4 text-slate-500">
                <div className="flex items-center space-x-1">
                  <span>每頁顯示</span>
                  <select className="px-2 py-0.5 border border-slate-200 rounded bg-white text-slate-700">
                    <option>25 筆</option>
                    <option>50 筆</option>
                    <option>100 筆</option>
                  </select>
                </div>

                <span>顯示第 1 至 5 筆，共 248 筆</span>

                <div className="flex items-center space-x-1 font-mono">
                  <button className="px-2 py-1 border border-slate-200 rounded hover:bg-slate-50">
                    &lt;
                  </button>
                  <button className="px-2 py-1 bg-blue-600 text-white rounded font-bold">1</button>
                  <button className="px-2 py-1 border border-slate-200 rounded hover:bg-slate-50">2</button>
                  <button className="px-2 py-1 border border-slate-200 rounded hover:bg-slate-50">3</button>
                  <span>...</span>
                  <button className="px-2 py-1 border border-slate-200 rounded hover:bg-slate-50">25</button>
                  <button className="px-2 py-1 border border-slate-200 rounded hover:bg-slate-50">
                    &gt;
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom 3 Summary/Intelligence Cards matching Image 7 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Card 1: 難度分布比例 */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-xs">難度分布比例</span>
                <span className="text-[11px] text-slate-400">高斯常態分佈</span>
              </div>

              {/* Bar charts matching Image 7 */}
              <div className="pt-2 flex items-end justify-between h-20 px-4">
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-8 bg-emerald-400 rounded-t-sm" style={{ height: '35px' }} />
                  <span className="text-[10px] text-slate-600">基礎 28%</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-8 bg-blue-500 rounded-t-sm" style={{ height: '65px' }} />
                  <span className="text-[10px] text-slate-600 font-semibold">中等 52%</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-8 bg-amber-400 rounded-t-sm" style={{ height: '22px' }} />
                  <span className="text-[10px] text-slate-600">困難 15%</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-8 bg-rose-400 rounded-t-sm" style={{ height: '10px' }} />
                  <span className="text-[10px] text-slate-600">極難 5%</span>
                </div>
              </div>
            </div>

            {/* Card 2: 目前組卷暫存匣 */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-1">
                  <div className="flex items-center space-x-1.5">
                    <CheckSquare className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-slate-900 text-xs">目前組卷暫存匣</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[11px] font-bold font-mono">
                    4 / 30 題
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  已預選 4 道題目（合計 8.5 分），目標為「113學年度演算法期末考 A 卷」。
                </p>
                <div className="text-[11px] text-slate-400 mt-1">預估測驗時長：45 分鐘</div>
              </div>

              <button
                onClick={() => setShowAssemblyModal(true)}
                className="w-full py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
              >
                預覽試卷排版
              </button>
            </div>

            {/* Card 3: 題幹多樣化衍生（手動版 / AI API 串接預備） */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-1">
                  <div className="flex items-center space-x-1.5">
                    <Layers className="w-4 h-4 text-indigo-600" />
                    <span className="font-bold text-slate-900 text-xs">題幹多樣化衍生</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                    AI_CONFIG.ENABLE_AI_API
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-slate-600 bg-slate-100 border border-slate-200'
                  }`}>
                    {AI_CONFIG.ENABLE_AI_API ? 'AI 模式' : '手動模板模式'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  依據勾選的題幹，產生參數替換、極端邊界或程式實作等 3 種等價防作弊平行試題。
                </p>
                <div className="flex items-center space-x-3 text-xs text-slate-500 mt-2">
                  <span>考點：快速排序、Partition</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <button
                  onClick={() => setShowManualVariantModal(true)}
                  className="flex-1 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold transition border border-indigo-200 cursor-pointer"
                >
                  手動編輯衍生題
                </button>
                {AI_CONFIG.ENABLE_AI_API && (
                  <button
                    onClick={() => setShowAiDeriveModal(true)}
                    className="py-2 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-bold transition border border-blue-200 cursor-pointer"
                    title="啟用 AI 模式"
                  >
                    AI 衍生
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Assembly Layout Preview Modal */}
      <AssemblyModal
        isOpen={showAssemblyModal}
        onClose={() => setShowAssemblyModal(false)}
        onStartExam={onStartExam}
      />

      {/* Manual Variation Modal (Default/Offline) */}
      <ManualVariantModal
        isOpen={showManualVariantModal}
        onClose={() => setShowManualVariantModal(false)}
        onSaveVariant={handleAddNewQuestion}
      />

      {/* AI Derivation Modal (Active when AI API enabled) */}
      {AI_CONFIG.ENABLE_AI_API && (
        <AiDeriveModal
          isOpen={showAiDeriveModal}
          onClose={() => setShowAiDeriveModal(false)}
        />
      )}

      {/* New Question Modal */}
      <NewQuestionModal
        isOpen={showNewModal}
        onClose={() => setShowNewModal(false)}
        onSave={handleAddNewQuestion}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center space-x-2 text-xs font-semibold animate-in fade-in slide-in-from-bottom-3">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Question Preview Modal (檢視完整題幹與權限資訊) */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-6 border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2.5">
                <span className="font-mono font-bold text-blue-700 text-base">
                  #{showPreviewModal.id}
                </span>
                {isUserQuestion(showPreviewModal) ? (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200 flex items-center space-x-1">
                    <UserCheck className="w-3 h-3 text-emerald-600" />
                    <span>使用者自行匯入</span>
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200 flex items-center space-x-1">
                    <ShieldCheck className="w-3 h-3 text-blue-600" />
                    <span>管理員匯入試題</span>
                  </span>
                )}
              </div>
              <button
                onClick={() => setShowPreviewModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Complete Question Prompt Display (完整題幹) */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center space-x-1">
                <span>完整題幹敘述 (Question Prompt)：</span>
              </label>
              <div className="p-4 bg-slate-50/90 rounded-2xl border border-slate-200/90 text-slate-800 text-sm leading-relaxed whitespace-pre-wrap select-text font-medium">
                {showPreviewModal.prompt}
              </div>
            </div>

            {/* Metadata Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-[10px] text-slate-400 font-medium">試題類型</div>
                <div className="font-semibold text-slate-800 mt-0.5">{showPreviewModal.type}</div>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-[10px] text-slate-400 font-medium">難度係數</div>
                <div className="font-semibold text-slate-800 mt-0.5">
                  {showPreviewModal.difficulty} ({showPreviewModal.difficultyScore})
                </div>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-[10px] text-slate-400 font-medium">預設配分</div>
                <div className="font-bold text-blue-700 font-mono mt-0.5">
                  {showPreviewModal.points} 分
                </div>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-[10px] text-slate-400 font-medium">匯入作者</div>
                <div className="font-semibold text-slate-800 truncate mt-0.5">
                  {showPreviewModal.author}
                </div>
              </div>
            </div>

            {/* Tags */}
            {showPreviewModal.tags && showPreviewModal.tags.length > 0 && (
              <div className="space-y-1">
                <div className="text-[11px] font-semibold text-slate-500">知識點標籤：</div>
                <div className="flex flex-wrap gap-1.5">
                  {showPreviewModal.tags.map((t: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-lg border border-blue-200/60 font-medium"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Options Display (選項內容與正解) */}
            {showPreviewModal.options && showPreviewModal.options.length > 0 && (
              <div className="space-y-1.5">
                <div className="text-xs font-semibold text-slate-700">試題選項與正解標示：</div>
                <div className="space-y-1.5">
                  {showPreviewModal.options.map((opt: any, idx: number) => (
                    <div
                      key={opt.id || idx}
                      className={`p-2.5 rounded-xl border text-xs flex items-center justify-between transition ${
                        opt.isCorrect
                          ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950 font-medium'
                          : 'bg-slate-50 border-slate-200/70 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <span
                          className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[11px] ${
                            opt.isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {opt.id || String.fromCharCode(65 + idx)}
                        </span>
                        <span className="leading-relaxed">{opt.text}</span>
                      </div>
                      {opt.isCorrect && (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-200/80 text-emerald-900 text-[10px] font-bold shrink-0 ml-2">
                          ✓ 正解
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Permission Notice Banner */}
            <div className="pt-1">
              {canEditOrDelete(showPreviewModal) ? (
                <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>您具備此題之編輯與刪除權限（可點擊下方按鈕進行編修）。</span>
                </div>
              ) : (
                <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-amber-800 text-xs flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>此題為管理員／官方匯入之題庫，您目前僅能檢視完整題幹內容，無法進行編輯或刪除。</span>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-100">
              <div>
                {canEditOrDelete(showPreviewModal) && (
                  <button
                    onClick={() => handleDeleteQuestion(showPreviewModal.id)}
                    className="px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center space-x-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>刪除此題</span>
                  </button>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowPreviewModal(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition cursor-pointer"
                >
                  關閉
                </button>
                {canEditOrDelete(showPreviewModal) && (
                  <button
                    onClick={() => {
                      const target = { ...showPreviewModal };
                      setShowPreviewModal(null);
                      handleEditQuestion(target);
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition cursor-pointer shadow-xs flex items-center space-x-1"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>編輯此題</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Question Modal (編輯題目，含選項編輯) */}
      {editingQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80 shrink-0">
              <div className="flex items-center space-x-2">
                <Edit className="w-4 h-4 text-blue-600" />
                <h3 className="font-bold text-slate-800 text-base">
                  編輯試題內容 #{editingQuestion.id}
                </h3>
              </div>
              <button
                onClick={() => setEditingQuestion(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditedQuestion} className="p-6 space-y-4 text-xs overflow-y-auto flex-1">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">完整題幹敘述 (Prompt) *</label>
                <textarea
                  required
                  rows={4}
                  value={editingQuestion.prompt}
                  onChange={(e) =>
                    setEditingQuestion({ ...editingQuestion, prompt: e.target.value })
                  }
                  className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs leading-relaxed"
                />
              </div>

              {/* 1. 題庫題目編輯要能編輯選項 */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-slate-700 flex items-center space-x-1.5">
                    <span>試題選項內容與正解設定 *</span>
                    <span className="text-[10px] text-slate-400 font-normal">（點擊標籤可設為正解）</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const cur = editingQuestion.options || [];
                      const nextChar = String.fromCharCode(65 + cur.length);
                      setEditingQuestion({
                        ...editingQuestion,
                        options: [
                          ...cur,
                          { id: nextChar, text: '', isCorrect: false },
                        ],
                      });
                    }}
                    className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>新增選項</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {(editingQuestion.options || []).map((opt: any, idx: number) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => {
                          const updated = (editingQuestion.options || []).map((o: any, i: number) => {
                            if (editingQuestion.type === '多選題') {
                              return i === idx ? { ...o, isCorrect: !o.isCorrect } : o;
                            }
                            return { ...o, isCorrect: i === idx };
                          });
                          setEditingQuestion({ ...editingQuestion, options: updated });
                        }}
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
                        onChange={(e) => {
                          const updated = [...(editingQuestion.options || [])];
                          updated[idx] = { ...updated[idx], text: e.target.value };
                          setEditingQuestion({ ...editingQuestion, options: updated });
                        }}
                        placeholder={`請輸入選項 ${opt.id || String.fromCharCode(65 + idx)} 的文字敘述...`}
                        className="flex-1 p-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />

                      {(editingQuestion.options || []).length > 2 && (
                        <button
                          type="button"
                          onClick={() => {
                            const updated = (editingQuestion.options || []).filter((_: any, i: number) => i !== idx);
                            setEditingQuestion({ ...editingQuestion, options: updated });
                          }}
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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">試題類型</label>
                  <select
                    value={editingQuestion.type}
                    onChange={(e) =>
                      setEditingQuestion({ ...editingQuestion, type: e.target.value })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                  >
                    <option value="單選題">單選題</option>
                    <option value="多選題">多選題</option>
                    <option value="是非題">是非題</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">難度評等</label>
                  <select
                    value={editingQuestion.difficulty}
                    onChange={(e) =>
                      setEditingQuestion({ ...editingQuestion, difficulty: e.target.value })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                  >
                    <option value="基礎">基礎</option>
                    <option value="中等">中等</option>
                    <option value="困難">困難</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">預設配分 (分)</label>
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    max="20"
                    value={editingQuestion.points}
                    onChange={(e) =>
                      setEditingQuestion({
                        ...editingQuestion,
                        points: parseFloat(e.target.value) || 2,
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">知識點標籤 (以逗號分隔)</label>
                <input
                  type="text"
                  value={editingQuestion.tags ? editingQuestion.tags.join(', ') : ''}
                  onChange={(e) =>
                    setEditingQuestion({
                      ...editingQuestion,
                      tags: e.target.value
                        .split(',')
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                  placeholder="例如：排序演算法, 堆積建構"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2 border-t border-slate-100 shrink-0">
                <button
                  type="button"
                  onClick={() => setEditingQuestion(null)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 font-semibold cursor-pointer"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-xs cursor-pointer"
                >
                  儲存修改
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
