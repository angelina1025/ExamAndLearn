import React, { useState, useMemo } from 'react';
import { Question, SubjectId, SubjectFilter, QuestionType, DifficultyLevel, ColumnVisibilityState } from '@/types';
import { ColumnVisibilityMenu } from './components/ColumnVisibilityMenu';

interface QuestionBankViewProps {
  subjectId: SubjectFilter;
  questions: Question[];
  selectedQuestionIds: string[];
  onToggleSelectQuestion: (id: string) => void;
  onSelectAllQuestions: (ids: string[]) => void;
  onClearSelection: () => void;
  onOpenCreateModal: () => void;
  onOpenExamModal: () => void;
  onOpenBatchDeleteModal: () => void;
  onViewQuestion: (q: Question) => void;
  onEditQuestion: (q: Question) => void;
  onDeleteQuestion: (q: Question) => void;
  isLoadingData?: boolean;
}

export const QuestionBankView: React.FC<QuestionBankViewProps> = ({
  subjectId,
  questions,
  selectedQuestionIds,
  onToggleSelectQuestion,
  onSelectAllQuestions,
  onClearSelection,
  onOpenCreateModal,
  onOpenExamModal,
  onOpenBatchDeleteModal,
  onViewQuestion,
  onEditQuestion,
  onDeleteQuestion,
  isLoadingData,
}) => {
  const [activeTab, setActiveTab] = useState<QuestionType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | DifficultyLevel>('all');
  type QuestionSortField = 'id' | 'content' | 'difficulty' | 'points' | 'tags' | 'updatedAt';
  type SortOrder = 'asc' | 'desc';

  const [sortField, setSortField] = useState<QuestionSortField>('updatedAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [jumpPage, setJumpPage] = useState('1');
  const [copyFeedbackId, setCopyFeedbackId] = useState<string | null>(null);

  const difficultyWeights: Record<DifficultyLevel, number> = {
    easy: 1,
    medium: 2,
    hard: 3,
  };

  const handleSort = (field: QuestionSortField) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder(field === 'updatedAt' || field === 'points' || field === 'difficulty' ? 'desc' : 'asc');
    }
    setCurrentPage(1);
  };

  const renderSortArrow = (field: QuestionSortField) => {
    const isCurrent = sortField === field;
    const isAsc = isCurrent && sortOrder === 'asc';
    const isDesc = isCurrent && sortOrder === 'desc';

    return (
      <span className="inline-flex flex-col -space-y-1 text-[#434655]/50 group-hover:text-[#004ac6] transition-colors ml-0.5">
        <span
          className={`material-symbols-outlined text-[12px] leading-none transition-colors ${
            isAsc ? 'text-[#004ac6] font-bold' : isCurrent ? 'text-[#c3c6d7] opacity-30' : ''
          }`}
        >
          arrow_drop_up
        </span>
        <span
          className={`material-symbols-outlined text-[12px] leading-none transition-colors ${
            isDesc ? 'text-[#004ac6] font-bold' : isCurrent ? 'text-[#c3c6d7] opacity-30' : ''
          }`}
        >
          arrow_drop_down
        </span>
      </span>
    );
  };

  // Column visibility state
  const [showColumnMenu, setShowColumnMenu] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibilityState>({
    id: true,
    content: true,
    difficulty: true,
    points: true,
    tags: true,
    updatedAt: true,
    actions: true,
  });

  const subjectTitles: Record<SubjectFilter, string> = {
    all: '題目列表總表 (全部科目)',
    math: '數學科 (Math)',
    chinese: '國文科 (Chinese)',
    english: '英文科 (English)',
    physics: '自然 (物理)',
    chemistry: '自然 (化學)',
    biology: '自然 (生物)',
    astronomy: '自然 (天文)',
    civics: '社會 (公民)',
    geography: '社會 (地理)',
    history: '社會 (歷史)',
  };

  const subjectShortNames: Record<SubjectId, string> = {
    math: '數學',
    chinese: '國文',
    english: '英文',
    physics: '物理',
    chemistry: '化學',
    biology: '生物',
    astronomy: '天文',
    civics: '公民',
    geography: '地理',
    history: '歷史',
  };

  // Real mock data questions for current subject or all subjects
  const currentSubjectQuestions = useMemo(() => {
    if (subjectId === 'all') {
      return questions;
    }
    return questions.filter((q) => q.subjectId === subjectId);
  }, [questions, subjectId]);

  // Actual dynamic counts from mock data
  const totalSubjectCount = currentSubjectQuestions.length;
  const singleCount = currentSubjectQuestions.filter((q) => q.type === 'single').length;
  const multipleCount = currentSubjectQuestions.filter((q) => q.type === 'multiple').length;
  const trueFalseCount = currentSubjectQuestions.filter((q) => q.type === 'true_false').length;

  // Filtered list
  const filteredQuestions = useMemo(() => {
    return currentSubjectQuestions
      .filter((q) => {
        // Type tab filter
        if (activeTab !== 'all' && q.type !== activeTab) return false;

        // Difficulty filter
        if (difficultyFilter !== 'all' && q.difficulty !== difficultyFilter) return false;

        // Text query
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchId = q.id.toLowerCase().includes(query);
          const matchContent = q.content.toLowerCase().includes(query);
          const matchTag = q.tags.some((t) => t.toLowerCase().includes(query));
          if (!matchId && !matchContent && !matchTag) return false;
        }

        return true;
      })
      .sort((a, b) => {
        const factor = sortOrder === 'asc' ? 1 : -1;
        switch (sortField) {
          case 'id':
            return a.id.localeCompare(b.id) * factor;
          case 'content':
            return a.content.localeCompare(b.content, 'zh-Hant') * factor;
          case 'difficulty':
            return ((difficultyWeights[a.difficulty] || 0) - (difficultyWeights[b.difficulty] || 0)) * factor;
          case 'points':
            return (a.points - b.points) * factor;
          case 'tags':
            return (a.tags.join(', ').localeCompare(b.tags.join(', '), 'zh-Hant')) * factor;
          case 'updatedAt':
            return a.updatedAt.localeCompare(b.updatedAt) * factor;
          default:
            return 0;
        }
      });
  }, [currentSubjectQuestions, activeTab, difficultyFilter, searchQuery, sortField, sortOrder]);

  // Pagination calculation based on real filtered mock data
  const totalPages = Math.max(1, Math.ceil(filteredQuestions.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIdx = filteredQuestions.length === 0 ? 0 : (safeCurrentPage - 1) * pageSize + 1;
  const endIdx = Math.min(safeCurrentPage * pageSize, filteredQuestions.length);

  const displayedQuestions = filteredQuestions.slice(
    (safeCurrentPage - 1) * pageSize,
    safeCurrentPage * pageSize
  );

  const isAllCurrentSelected =
    displayedQuestions.length > 0 &&
    displayedQuestions.every((q) => selectedQuestionIds.includes(q.id));

  const handleSelectAllToggle = () => {
    if (isAllCurrentSelected) {
      onClearSelection();
    } else {
      const ids = displayedQuestions.map((q) => q.id);
      onSelectAllQuestions(Array.from(new Set([...selectedQuestionIds, ...ids])));
    }
  };

  const handleCopyId = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(id);
    setCopyFeedbackId(id);
    setTimeout(() => setCopyFeedbackId(null), 1500);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <h1 className="text-[24px] leading-[32px] text-[#191c1e] font-bold tracking-tight">
              {subjectId === 'all' ? '題目列表總表' : (subjectTitles[subjectId]?.split(' ')[0] || '數學科')}
            </h1>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Batch Delete Button */}
          {selectedQuestionIds.length > 0 && (
            <button
              onClick={onOpenBatchDeleteModal}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#ba1a1a] text-white hover:bg-[#93000a] text-[14px] font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">delete_sweep</span>
              <span>批次刪除 ({selectedQuestionIds.length})</span>
            </button>
          )}



          {/* Generate Exam Button */}
          <button
            onClick={onOpenExamModal}
            className="relative flex items-center gap-1.5 px-3 py-1.5 bg-[#004ac6] text-white text-[14px] font-semibold rounded-lg hover:bg-[#2563eb] shadow-sm transition-all group cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">post_add</span>
            <span>生成考卷</span>
            <span className="flex items-center justify-center bg-[#6ffbbe] text-[#002113] font-mono text-[11px] font-bold px-1.5 py-0.5 rounded-full ml-1">
              已選 {selectedQuestionIds.length} 題
            </span>
          </button>

          {/* Create Question Button */}
          <button
            onClick={onOpenCreateModal}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2563eb] text-[#eeefff] text-[14px] font-semibold rounded-lg hover:bg-[#004ac6] shadow-sm transition-all cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>新增題目</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation - Dynamic counts from actual mock data */}
      <div className="flex items-center gap-2 border-b border-[#c3c6d7]/30 mb-4 overflow-x-auto">
        <button
          onClick={() => {
            setActiveTab('all');
            setCurrentPage(1);
          }}
          className={`flex items-center gap-1.5 pb-2 px-1 text-[14px] font-semibold transition-colors cursor-pointer border-b-2 ${
            activeTab === 'all'
              ? 'text-[#004ac6] border-[#004ac6]'
              : 'text-[#434655] border-transparent hover:text-[#191c1e]'
          }`}
          type="button"
        >
          <span>全部題目</span>
          <span className={`px-1.5 py-0.5 rounded-full font-mono text-[11px] ${
            activeTab === 'all' ? 'bg-[#dbe1ff] text-[#00174b]' : 'bg-[#e6e8ea] text-[#434655]'
          }`}>
            {totalSubjectCount}
          </span>
        </button>

        <button
          onClick={() => {
            setActiveTab('single');
            setCurrentPage(1);
          }}
          className={`flex items-center gap-1.5 pb-2 px-1 text-[14px] font-semibold transition-colors cursor-pointer border-b-2 ${
            activeTab === 'single'
              ? 'text-[#004ac6] border-[#004ac6]'
              : 'text-[#434655] border-transparent hover:text-[#191c1e]'
          }`}
          type="button"
        >
          <span>單選題</span>
          <span className={`px-1.5 py-0.5 rounded-full font-mono text-[11px] ${
            activeTab === 'single' ? 'bg-[#dbe1ff] text-[#00174b]' : 'bg-[#e6e8ea] text-[#434655]'
          }`}>
            {singleCount}
          </span>
        </button>

        <button
          onClick={() => {
            setActiveTab('multiple');
            setCurrentPage(1);
          }}
          className={`flex items-center gap-1.5 pb-2 px-1 text-[14px] font-semibold transition-colors cursor-pointer border-b-2 ${
            activeTab === 'multiple'
              ? 'text-[#004ac6] border-[#004ac6]'
              : 'text-[#434655] border-transparent hover:text-[#191c1e]'
          }`}
          type="button"
        >
          <span>多選題</span>
          <span className={`px-1.5 py-0.5 rounded-full font-mono text-[11px] ${
            activeTab === 'multiple' ? 'bg-[#dbe1ff] text-[#00174b]' : 'bg-[#e6e8ea] text-[#434655]'
          }`}>
            {multipleCount}
          </span>
        </button>

        <button
          onClick={() => {
            setActiveTab('true_false');
            setCurrentPage(1);
          }}
          className={`flex items-center gap-1.5 pb-2 px-1 text-[14px] font-semibold transition-colors cursor-pointer border-b-2 ${
            activeTab === 'true_false'
              ? 'text-[#004ac6] border-[#004ac6]'
              : 'text-[#434655] border-transparent hover:text-[#191c1e]'
          }`}
          type="button"
        >
          <span>是非題</span>
          <span className={`px-1.5 py-0.5 rounded-full font-mono text-[11px] ${
            activeTab === 'true_false' ? 'bg-[#dbe1ff] text-[#00174b]' : 'bg-[#e6e8ea] text-[#434655]'
          }`}>
            {trueFalseCount}
          </span>
        </button>
      </div>

      {/* Action Bar & Controls */}
      <div className="bg-white p-3 rounded-xl shadow-xs mb-3 flex flex-col gap-3 border border-[#c3c6d7]/30">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3">
          {/* Left Filters */}
          <div className="flex flex-wrap items-center gap-2 flex-1">
            {/* Search Field */}
            <div className="relative flex-1 min-w-[280px] max-w-[420px]">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#434655] text-[18px]">
                search
              </span>
              <input
                className="w-full bg-[#f2f4f6] pl-9 pr-14 py-1.5 text-[#191c1e] placeholder:text-[#434655]/70 text-[13px] rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-[#004ac6]/40 transition-all"
                placeholder="搜尋題目內文、選項或知識點標籤..."
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
              <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 font-mono text-[11px] bg-[#e0e3e5] px-1.5 py-0.5 rounded text-[#434655] font-medium">
                ⌘K
              </kbd>
            </div>

            {/* Difficulty Filter */}
            <div className="relative">
              <select
                value={difficultyFilter}
                onChange={(e) => {
                  setDifficultyFilter(e.target.value as any);
                  setCurrentPage(1);
                }}
                className="appearance-none bg-[#f2f4f6] text-[#191c1e] text-[13px] pl-3 pr-8 py-1.5 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#004ac6]/30 border-0"
              >
                <option value="all">難度: 全部難度</option>
                <option value="easy">簡單 Easy</option>
                <option value="medium">中等 Medium</option>
                <option value="hard">困難 Hard</option>
              </select>
              <span className="material-symbols-outlined pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#434655] text-[18px]">
                expand_more
              </span>
            </div>

            {/* Sort Filter */}
            <div className="relative">
              <select
                value={`${sortField}_${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('_') as [QuestionSortField, SortOrder];
                  setSortField(field);
                  setSortOrder(order);
                  setCurrentPage(1);
                }}
                className="appearance-none bg-[#f2f4f6] text-[#191c1e] text-[13px] pl-3 pr-8 py-1.5 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#004ac6]/30 border-0"
              >
                <option value="updatedAt_desc">排序: 建立時間 (新到舊)</option>
                <option value="updatedAt_asc">排序: 建立時間 (舊到新)</option>
                <option value="points_desc">排序: 配分 (高到低)</option>
                <option value="points_asc">排序: 配分 (低到高)</option>
                <option value="difficulty_desc">排序: 難度 (難到易)</option>
                <option value="difficulty_asc">排序: 難度 (易到難)</option>
                <option value="id_asc">排序: 題目 ID (A-Z)</option>
                <option value="id_desc">排序: 題目 ID (Z-A)</option>
                <option value="content_asc">排序: 內容摘要 (A-Z)</option>
                <option value="content_desc">排序: 內容摘要 (Z-A)</option>
                <option value="tags_asc">排序: 知識點標籤 (A-Z)</option>
                <option value="tags_desc">排序: 知識點標籤 (Z-A)</option>
              </select>
              <span className="material-symbols-outlined pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#434655] text-[18px]">
                expand_more
              </span>
            </div>
          </div>

          {/* Right Action: Column Visibility Button */}
          <div className="flex items-center gap-2 self-end xl:self-center relative">
            <button
              onClick={() => setShowColumnMenu(!showColumnMenu)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f2f4f6] hover:bg-[#eceef0] text-[#191c1e] text-[13px] rounded-lg transition-colors cursor-pointer border border-[#c3c6d7]/40"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">view_column</span>
              <span>自訂欄位</span>
              <span className="material-symbols-outlined text-[16px] text-[#434655]">arrow_drop_down</span>
            </button>

            <ColumnVisibilityMenu
              isOpen={showColumnMenu}
              onClose={() => setShowColumnMenu(false)}
              columns={columnVisibility}
              onChange={setColumnVisibility}
            />
          </div>
        </div>
      </div>

      {/* Main Data Table */}
      <div className="bg-white rounded-xl shadow-xs overflow-hidden flex flex-col border border-[#c3c6d7]/30">
        <div className="overflow-x-auto max-w-full relative">
          <table className="w-full min-w-[1100px] text-left border-collapse">
            <thead>
              <tr className="bg-[#f2f4f6] text-[#434655] text-[12px] uppercase tracking-wider select-none font-semibold border-b border-[#c3c6d7]/30">
                {/* Select All Checkbox */}
                <th className="py-3 px-3 w-12 text-center">
                  <div
                    onClick={handleSelectAllToggle}
                    className={`w-4 h-4 rounded flex items-center justify-center mx-auto cursor-pointer shadow-xs transition-colors ${
                      isAllCurrentSelected ? 'bg-[#004ac6] text-white' : 'border border-[#737686] bg-white'
                    }`}
                  >
                    {isAllCurrentSelected && (
                      <span className="material-symbols-outlined text-[14px] leading-none">check</span>
                    )}
                  </div>
                </th>

                {/* 題目 ID */}
                {columnVisibility.id && (
                  <th className="py-3 px-2 w-44">
                    <div
                      onClick={() => handleSort('id')}
                      className={`inline-flex items-center gap-1 cursor-pointer group transition-colors select-none ${
                        sortField === 'id' ? 'text-[#004ac6] font-semibold' : 'text-[#434655] hover:text-[#004ac6]'
                      }`}
                      title="點擊依題目 ID 排序"
                    >
                      <span>題目 ID</span>
                      {renderSortArrow('id')}
                    </div>
                  </th>
                )}

                {/* 題目內容摘要 */}
                {columnVisibility.content && (
                  <th className="py-3 px-3 min-w-[340px]">
                    <div
                      onClick={() => handleSort('content')}
                      className={`inline-flex items-center gap-1 cursor-pointer group transition-colors select-none ${
                        sortField === 'content' ? 'text-[#004ac6] font-semibold' : 'text-[#434655] hover:text-[#004ac6]'
                      }`}
                      title="點擊依內容摘要排序"
                    >
                      <span>題目內容摘要</span>
                      {renderSortArrow('content')}
                    </div>
                  </th>
                )}

                {/* 難易度 */}
                {columnVisibility.difficulty && (
                  <th className="py-3 px-2 w-32">
                    <div
                      onClick={() => handleSort('difficulty')}
                      className={`inline-flex items-center gap-1 cursor-pointer group transition-colors select-none ${
                        sortField === 'difficulty' ? 'text-[#004ac6] font-semibold' : 'text-[#434655] hover:text-[#004ac6]'
                      }`}
                      title="點擊依難易度排序"
                    >
                      <span>難易度</span>
                      {renderSortArrow('difficulty')}
                    </div>
                  </th>
                )}

                {/* 配分 */}
                {columnVisibility.points && (
                  <th className="py-3 px-2 w-20 text-center">
                    <div
                      onClick={() => handleSort('points')}
                      className={`inline-flex items-center justify-center gap-1 cursor-pointer group transition-colors select-none mx-auto ${
                        sortField === 'points' ? 'text-[#004ac6] font-semibold' : 'text-[#434655] hover:text-[#004ac6]'
                      }`}
                      title="點擊依配分排序"
                    >
                      <span>配分</span>
                      {renderSortArrow('points')}
                    </div>
                  </th>
                )}

                {/* 知識點標籤 */}
                {columnVisibility.tags && (
                  <th className="py-3 px-3 min-w-[200px]">
                    <div
                      onClick={() => handleSort('tags')}
                      className={`inline-flex items-center gap-1 cursor-pointer group transition-colors select-none ${
                        sortField === 'tags' ? 'text-[#004ac6] font-semibold' : 'text-[#434655] hover:text-[#004ac6]'
                      }`}
                      title="點擊依知識點標籤排序"
                    >
                      <span>知識點標籤</span>
                      {renderSortArrow('tags')}
                    </div>
                  </th>
                )}

                {/* 建立/更新時間 */}
                {columnVisibility.updatedAt && (
                  <th className="py-3 px-2 w-36">
                    <div
                      onClick={() => handleSort('updatedAt')}
                      className={`inline-flex items-center gap-1 cursor-pointer group transition-colors select-none ${
                        sortField === 'updatedAt' ? 'text-[#004ac6] font-semibold' : 'text-[#434655] hover:text-[#004ac6]'
                      }`}
                      title="點擊依建立/更新時間排序"
                    >
                      <span>建立/更新時間</span>
                      {renderSortArrow('updatedAt')}
                    </div>
                  </th>
                )}

                {/* 操作 (Sticky Right) */}
                {columnVisibility.actions && (
                  <th className="py-3 px-2 min-w-[120px] text-center sticky right-0 bg-[#f2f4f6] shadow-[-4px_0_12px_rgba(0,0,0,0.06)] z-20">
                    操作
                  </th>
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-[#c3c6d7]/20 text-[13px]">
              {displayedQuestions.map((q) => {
                const isSelected = selectedQuestionIds.includes(q.id);
                return (
                  <tr
                    key={q.id}
                    className={`transition-colors group ${
                      isSelected
                        ? 'bg-[#dbe1ff]/20 hover:bg-[#dbe1ff]/30'
                        : 'hover:bg-[#f2f4f6]'
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="py-2.5 px-3 text-center">
                      <div
                        onClick={() => onToggleSelectQuestion(q.id)}
                        className={`w-4 h-4 rounded flex items-center justify-center mx-auto cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-[#004ac6] text-white'
                            : 'bg-[#e0e3e5] border-0 hover:bg-[#c3c6d7]'
                        }`}
                      >
                        {isSelected && (
                          <span className="material-symbols-outlined text-[14px]">check</span>
                        )}
                      </div>
                    </td>

                    {/* 題目 ID */}
                    {columnVisibility.id && (
                      <td className="py-2.5 px-2 font-mono text-[12px] text-[#004ac6] font-semibold">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {subjectId === 'all' && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#dae2fd] text-[#004ac6] font-sans font-medium tracking-normal shrink-0">
                              {subjectShortNames[q.subjectId] || q.subjectId}
                            </span>
                          )}
                          <span>{q.id}</span>
                          <button
                            type="button"
                            onClick={(e) => handleCopyId(q.id, e)}
                            className="text-[#434655]/60 hover:text-[#004ac6] p-0.5 rounded cursor-pointer"
                            title={copyFeedbackId === q.id ? '已複製！' : '複製 ID'}
                          >
                            <span className="material-symbols-outlined text-[14px]">
                              {copyFeedbackId === q.id ? 'done' : 'content_copy'}
                            </span>
                          </button>
                        </div>
                      </td>
                    )}

                    {/* 題目內容摘要 */}
                    {columnVisibility.content && (
                      <td className="py-2.5 px-3">
                        <div
                          onClick={() => onViewQuestion(q)}
                          className="flex items-center gap-2 group/tip cursor-pointer"
                        >
                          <p className="text-[#191c1e] line-clamp-1 max-w-xl text-[14px] font-medium hover:text-[#004ac6] transition-colors">
                            {q.content}
                          </p>
                          <span
                            className="material-symbols-outlined text-[16px] text-[#004ac6] opacity-0 group-hover:opacity-100 transition-opacity"
                            title="快速預覽題目與詳解"
                          >
                            visibility
                          </span>
                        </div>
                      </td>
                    )}

                    {/* 難易度 */}
                    {columnVisibility.difficulty && (
                      <td className="py-2.5 px-2">
                        {q.difficulty === 'hard' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] text-[11px] font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a]"></span>
                            困難 Hard
                          </span>
                        ) : q.difficulty === 'medium' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#dae2fd] text-[#5c647a] text-[11px] font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#565e74]"></span>
                            中等 Medium
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#6ffbbe]/50 text-[#002113] text-[11px] font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#006242]"></span>
                            簡單 Easy
                          </span>
                        )}
                      </td>
                    )}

                    {/* 配分 */}
                    {columnVisibility.points && (
                      <td className="py-2.5 px-2 text-center text-[15px] font-bold text-[#191c1e]">
                        {q.points}分
                      </td>
                    )}

                    {/* 知識點標籤 */}
                    {columnVisibility.tags && (
                      <td className="py-2.5 px-3">
                        <div className="flex flex-wrap items-center gap-1">
                          {q.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded bg-[#eceef0] text-[#191c1e] text-[11px]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                    )}

                    {/* 建立/更新時間 */}
                    {columnVisibility.updatedAt && (
                      <td className="py-2.5 px-2 font-mono text-[12px] text-[#434655]">
                        {q.updatedAt}
                      </td>
                    )}

                    {/* 操作 (Sticky Right) */}
                    {columnVisibility.actions && (
                      <td
                        className={`py-2.5 px-2 text-center sticky right-0 shadow-[-4px_0_12px_rgba(0,0,0,0.06)] z-10 min-w-[120px] transition-colors ${
                          isSelected
                            ? 'bg-[#eff6ff] group-hover:bg-[#dbeafe]'
                            : 'bg-white group-hover:bg-[#f2f4f6]'
                        }`}
                      >
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => onViewQuestion(q)}
                            className="p-1 hover:bg-[#eceef0] rounded text-[#434655] hover:text-[#004ac6] transition-colors cursor-pointer"
                            title="檢視題目"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[18px]">visibility</span>
                          </button>
                          <button
                            onClick={() => onEditQuestion(q)}
                            className="p-1 hover:bg-[#eceef0] rounded text-[#434655] hover:text-[#004ac6] transition-colors cursor-pointer"
                            title="編輯題目"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[18px]">edit_note</span>
                          </button>
                          <button
                            onClick={() => onDeleteQuestion(q)}
                            className="p-1 hover:bg-[#ffdad6] rounded text-[#434655] hover:text-[#ba1a1a] transition-colors cursor-pointer"
                            title="刪除題目"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}

              {displayedQuestions.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[#434655]">
                    <div className="flex flex-col items-center gap-2">
                      <span className={`material-symbols-outlined text-[36px] text-[#737686] ${isLoadingData ? 'animate-spin text-[#004ac6]' : ''}`}>
                        {isLoadingData ? 'sync' : 'search_off'}
                      </span>
                      <p className="font-medium text-[15px] text-[#191c1e]">
                        {isLoadingData
                          ? '正在從 Google 試算表讀取試題資料...'
                          : questions.length === 0
                          ? '目前尚未從 Google 試算表載入題目'
                          : '無符合條件的題目'}
                      </p>
                      {questions.length === 0 ? (
                        <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
                          <button
                            onClick={onOpenCreateModal}
                            className="px-3 py-1.5 bg-[#004ac6] text-white text-[12px] font-semibold rounded-lg hover:bg-[#003da6] shadow-2xs transition-colors cursor-pointer"
                            type="button"
                          >
                            新增題目 (自動寫入試算表)
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setSearchQuery('');
                            setDifficultyFilter('all');
                            setActiveTab('all');
                          }}
                          className="text-[13px] text-[#004ac6] hover:underline cursor-pointer"
                        >
                          清除搜尋與篩選條件
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Section - Strictly computed from actual mock data */}
        <div className="p-3 bg-white border-t border-[#c3c6d7]/30 flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Left counter */}
          <div className="text-[13px] text-[#434655]">
            顯示第 <span className="font-semibold text-[#191c1e]">{startIdx}</span> 至{' '}
            <span className="font-semibold text-[#191c1e]">{endIdx}</span> 筆，共{' '}
            <span className="font-semibold text-[#191c1e]">{filteredQuestions.length}</span> 筆資料
          </div>

          {/* Middle items per page */}
          <div className="flex items-center gap-2">
            <span className="text-[13px] text-[#434655]">每頁顯示:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-[#f2f4f6] text-[#191c1e] text-[13px] px-2 py-1 rounded cursor-pointer border-0 focus:ring-1 focus:ring-[#004ac6]"
            >
              <option value={5}>5 筆/頁</option>
              <option value={10}>10 筆/頁</option>
              <option value={20}>20 筆/頁</option>
            </select>
          </div>

          {/* Right page buttons generated dynamically */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={safeCurrentPage === 1}
              className="p-1 rounded text-[#434655] hover:bg-[#eceef0] disabled:opacity-30 disabled:cursor-not-allowed flex items-center cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded text-[12px] font-semibold cursor-pointer transition-colors ${
                  safeCurrentPage === page
                    ? 'bg-[#004ac6] text-white'
                    : 'hover:bg-[#eceef0] text-[#191c1e]'
                }`}
                type="button"
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={safeCurrentPage >= totalPages}
              className="p-1 rounded text-[#191c1e] hover:bg-[#eceef0] disabled:opacity-30 disabled:cursor-not-allowed flex items-center cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>

            {totalPages > 1 && (
              <div className="flex items-center gap-1 ml-2 text-[#434655] text-[13px]">
                <span>跳至</span>
                <input
                  className="w-12 text-center bg-[#f2f4f6] rounded py-0.5 text-[#191c1e] font-mono text-[12px] border-0 focus:ring-1 focus:ring-[#004ac6]"
                  max={totalPages}
                  min={1}
                  type="number"
                  value={jumpPage}
                  onChange={(e) => setJumpPage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const p = Math.max(1, Math.min(totalPages, Number(jumpPage) || 1));
                      setCurrentPage(p);
                    }
                  }}
                />
                <span>頁</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
