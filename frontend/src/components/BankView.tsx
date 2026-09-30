import React, { useState } from 'react';
import {
  Search,
  Filter,
  Plus,
  Sparkles,
  Download,
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
  BookOpen,
  Clock,
  CheckCircle,
  Database,
  ArrowUpDown,
  Tag,
  Share2,
  Layers,
  Sliders,
} from 'lucide-react';
import { mockBankQuestions, initialCategories } from '../data/mockData';
import { CategoryNode, ExamQuestion } from '../types';
import { AssemblyModal } from './AssemblyModal';
import { NewQuestionModal } from './NewQuestionModal';
import { ManualVariantModal } from './ManualVariantModal';
// Isolated AI feature module (can be toggled with AI_CONFIG.ENABLE_AI_API)
import { AiDeriveModal, AI_CONFIG } from '../ai-features';

interface BankViewProps {
  onStartExam: () => void;
  onNavigateToImport: () => void;
  onOpenOfflineManager?: () => void;
}

export const BankView: React.FC<BankViewProps> = ({
  onStartExam,
  onNavigateToImport,
  onOpenOfflineManager,
}) => {
  const [categories, setCategories] = useState<CategoryNode[]>(initialCategories);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('sorting-searching');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTypeFilter, setActiveTypeFilter] = useState<string>('全部');
  const [questions, setQuestions] = useState(mockBankQuestions);
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({
    'QS-0842': true,
  });

  // Modals state
  const [showAssemblyModal, setShowAssemblyModal] = useState<boolean>(false);
  const [showAiDeriveModal, setShowAiDeriveModal] = useState<boolean>(false);
  const [showManualVariantModal, setShowManualVariantModal] = useState<boolean>(false);
  const [showNewModal, setShowNewModal] = useState<boolean>(false);
  const [showPreviewModal, setShowPreviewModal] = useState<any | null>(null);

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
      questions.forEach((q) => {
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
    setQuestions([newQ, ...questions]);
  };

  const selectedCount = Object.values(selectedRows).filter(Boolean).length;
  const isAllSelected = selectedCount > 0 && selectedCount === questions.length;

  // Filter questions based on type and search query
  const filteredQuestions = questions.filter((q) => {
    if (activeTypeFilter !== '全部' && !q.type.includes(activeTypeFilter.replace('題', ''))) {
      if (activeTypeFilter === '簡答題 / 程式題' && !q.type.includes('簡答') && !q.type.includes('實作')) {
        return false;
      }
    }
    if (searchQuery.trim() && !q.prompt.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="max-w-[1580px] mx-auto px-4 sm:px-6 py-4 space-y-4">
      {/* Top Status Bar matching Image 7 */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs px-5 py-3 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-6 text-slate-600">
          <div className="flex items-center space-x-1.5">
            <Database className="w-4 h-4 text-blue-600" />
            <span className="font-semibold text-slate-800">題庫總量：12,480 題</span>
          </div>

          <div className="flex items-center space-x-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>已通過同儕審核率：<strong className="text-slate-800">94.2%</strong></span>
          </div>

          <div className="flex items-center space-x-1.5">
            <Clock className="w-4 h-4 text-slate-400" />
            <span>最近修訂週期：2025 年春季第 2 梯次</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>雲端資料庫同步正常 (0.18s)</span>
          </div>

          <button className="flex items-center space-x-1 text-slate-600 hover:text-blue-600 transition">
            <BookOpen className="w-3.5 h-3.5" />
            <span>指引手冊</span>
          </button>
        </div>
      </div>

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
              <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                7 層級
              </span>
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-100">
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

              {/* Action Buttons matching Image 7 */}
              <div className="flex flex-wrap items-center gap-2">
                {onOpenOfflineManager && (
                  <button
                    onClick={onOpenOfflineManager}
                    className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/80 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition cursor-pointer"
                    title="下載本題庫至本機電腦或手機，離線即可隨時考試"
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-600" />
                    <span>預載離線題庫</span>
                  </button>
                )}

                <button
                  onClick={onNavigateToImport}
                  className="px-3.5 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5 text-slate-500" />
                  <span>批次匯入 (Excel/CSV)</span>
                </button>

                <button
                  onClick={() => setShowAssemblyModal(true)}
                  className="px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-600 hover:opacity-95 text-white rounded-xl text-xs font-bold shadow-xs flex items-center space-x-1.5 transition cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>智慧組卷</span>
                </button>

                <button
                  onClick={() => setShowNewModal(true)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white rounded-xl text-xs font-bold shadow-xs shadow-blue-500/25 flex items-center space-x-1.5 transition cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>新增考題</span>
                </button>
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
                <select className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-none">
                  <option>全部難度</option>
                  <option>基礎</option>
                  <option>中等</option>
                  <option>困難</option>
                </select>

                <select className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-none">
                  <option>已發布 (已審查)</option>
                  <option>待同儕審查</option>
                  <option>草稿箱</option>
                </select>

                <select className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-none">
                  <option>最後修改 (最新)</option>
                  <option>難度由高到低</option>
                  <option>配分由高到低</option>
                </select>

                <button className="p-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-500 transition">
                  <Filter className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Question Type Fast-Filter Pills matching Image 7 */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 mr-1">題型快篩：</span>
              {[
                { label: '全部 (248)', value: '全部' },
                { label: '單選題 (140)', value: '單選題' },
                { label: '多選題 (68)', value: '多選題' },
                { label: '是非題 (28)', value: '是非題' },
                { label: '簡答題 / 程式題 (12)', value: '簡答題 / 程式題' },
              ].map((pill) => (
                <button
                  key={pill.value}
                  onClick={() => setActiveTypeFilter(pill.value)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                    activeTypeFilter === pill.value
                      ? 'bg-blue-600 text-white shadow-xs font-semibold'
                      : 'bg-slate-100 hover:bg-slate-200/80 text-slate-600'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
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
                        className="rounded text-blue-600 border-slate-300 focus:ring-blue-500 w-3.5 h-3.5"
                      />
                    </th>
                    <th className="p-3 min-w-[280px]">題號 / 題幹預覽 (QUESTION PROMPT)</th>
                    <th className="p-3 min-w-[130px]">知識點標籤</th>
                    <th className="p-3 w-20">題型</th>
                    <th className="p-3 w-24">難度係數</th>
                    <th className="p-3 w-16 text-center">配分</th>
                    <th className="p-3 min-w-[140px]">最後修訂紀錄</th>
                    <th className="p-3 w-16 text-right">操作</th>
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

                        {/* Prompt & Code */}
                        <td className="p-3 space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-mono font-bold text-blue-700">
                              #{row.id}
                            </span>
                            <span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-semibold rounded border border-blue-200/60">
                              {row.badge}
                            </span>
                          </div>
                          <div className="font-medium text-slate-800 line-clamp-2 leading-relaxed">
                            {row.prompt}
                          </div>
                        </td>

                        {/* Tags */}
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

                        {/* Question Type */}
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${row.typeBadgeColor}`}
                          >
                            {row.type}
                          </span>
                        </td>

                        {/* Difficulty */}
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-medium border font-mono ${row.difficultyColor}`}
                          >
                            {row.difficulty} ({row.difficultyScore})
                          </span>
                        </td>

                        {/* Points */}
                        <td className="p-3 text-center font-bold text-blue-700 font-mono">
                          {row.points} 分
                        </td>

                        {/* Revision */}
                        <td className="p-3 text-slate-500 text-[11px] leading-snug">
                          <div className="font-medium text-slate-700">{row.lastModified}</div>
                          <div className="text-slate-400">{row.author}</div>
                        </td>

                        {/* Action buttons */}
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end space-x-1.5 text-slate-400">
                            <button
                              onClick={() => setShowPreviewModal(row)}
                              className="p-1 hover:text-slate-700 rounded transition"
                              title="預覽試題"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {}}
                              className="p-1 hover:text-blue-600 rounded transition"
                              title="編輯"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
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

      {/* Question Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="font-mono font-bold text-blue-700 text-sm">
                #{showPreviewModal.id} {showPreviewModal.badge}
              </span>
              <button
                onClick={() => setShowPreviewModal(null)}
                className="text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            </div>
            <div className="font-medium text-slate-800 text-sm leading-relaxed">
              {showPreviewModal.prompt}
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold">
                {showPreviewModal.type}
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-mono">
                難度: {showPreviewModal.difficulty} ({showPreviewModal.difficultyScore})
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">
                {showPreviewModal.points} 分
              </span>
            </div>
            <div className="pt-2 text-right">
              <button
                onClick={() => setShowPreviewModal(null)}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold"
              >
                關閉
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
