import React, { useState, useMemo } from 'react';
import { ExamPaper, ExamColumnVisibilityState } from '@/types';
import { ExamColumnVisibilityMenu } from './components/ExamColumnVisibilityMenu';

interface ExamPapersViewProps {
  examPapers: ExamPaper[];
  selectedExamIds: string[];
  onToggleSelectExam: (id: string) => void;
  onSelectAllExams: (ids: string[]) => void;
  onClearExamSelection: () => void;
  onOpenCreateExamModal?: () => void;
  onOpenBatchDeleteModal: () => void;
  onPreviewExam: (exam: ExamPaper) => void;
  onEditExam: (exam: ExamPaper) => void;
  onDeleteSingleExam: (exam: ExamPaper) => void;
  onExportReport?: () => void;
  onBatchExport: () => void;
  onPublishExams: (examIds: string[]) => void;
}

export interface ExamValidationReport {
  exam: ExamPaper;
  isValid: boolean;
  missingFields: string[];
}

export const ExamPapersView: React.FC<ExamPapersViewProps> = ({
  examPapers,
  selectedExamIds,
  onToggleSelectExam,
  onSelectAllExams,
  onClearExamSelection,
  onOpenBatchDeleteModal,
  onPreviewExam,
  onEditExam,
  onDeleteSingleExam,
  onBatchExport,
  onPublishExams,
}) => {
  // Tabs: 'draft' (草稿資料表), 'published' (公用試卷資料表), 'all' (全部資料表)
  const [activeTab, setActiveTab] = useState<'draft' | 'published' | 'all'>('draft');

  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Sorting state for table columns
  type ExamSortField =
    | 'id'
    | 'title'
    | 'subject'
    | 'difficulty'
    | 'questionCount'
    | 'totalScore'
    | 'duration'
    | 'status'
    | 'createdAt';
  type SortOrder = 'asc' | 'desc';

  const [sortField, setSortField] = useState<ExamSortField>('createdAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const handleSort = (field: ExamSortField) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder(field === 'createdAt' ? 'desc' : 'asc');
    }
    setCurrentPage(1);
  };

  const renderSortArrow = (field: ExamSortField) => {
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

  // Modals for publish checking & confirmation
  const [validationFailures, setValidationFailures] = useState<ExamValidationReport[] | null>(null);
  const [confirmPublishList, setConfirmPublishList] = useState<ExamPaper[] | null>(null);

  const [showColumnMenu, setShowColumnMenu] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState<ExamColumnVisibilityState>({
    id: true,
    title: true,
    subject: true,
    difficulty: true,
    questionCount: true,
    totalScore: true,
    duration: true,
    status: true,
    createdAt: true,
    actions: true,
  });

  const subjectNames: Record<string, string> = {
    math: '數學',
    english: '英文',
    chinese: '國文',
    physics: '自然 (物理)',
    biology: '自然 (生物)',
    chemistry: '自然 (化學)',
    geography: '社會 (地理)',
    history: '社會 (歷史)',
  };

  const draftExamsCount = useMemo(
    () => examPapers.filter((e) => e.status === 'draft').length,
    [examPapers]
  );
  const publishedExamsCount = useMemo(
    () => examPapers.filter((e) => e.status === 'published').length,
    [examPapers]
  );

  // Selected drafts subset
  const selectedDraftIds = useMemo(() => {
    return selectedExamIds.filter((id) => {
      const exam = examPapers.find((e) => e.id === id);
      return exam?.status === 'draft';
    });
  }, [selectedExamIds, examPapers]);

  // Validate required fields for publishing to public table
  const validateExamForPublish = (exam: ExamPaper): ExamValidationReport => {
    const missing: string[] = [];
    if (!exam.title || exam.title.trim().length === 0) {
      missing.push('試卷名稱 (不可為空白)');
    }
    if (!exam.subject || !exam.subjectId) {
      missing.push('學科類別 (未指定學科)');
    }
    if (!exam.difficultyLv || exam.difficultyLv < 1 || exam.difficultyLv > 5) {
      missing.push('難易度等級 (需介於 Lv.1 ~ Lv.5)');
    }
    if (!exam.questionCount || exam.questionCount <= 0 || !exam.questionIds || exam.questionIds.length === 0) {
      missing.push('試卷題數/題目配置 (題數需大於 0，且必須已配置試題)');
    }
    if (!exam.totalScore || exam.totalScore <= 0) {
      missing.push('試卷總分 (總分需大於 0 分)');
    }
    if (!exam.durationMinutes || exam.durationMinutes <= 0) {
      missing.push('測驗時長 (時長需大於 0 分鐘)');
    }

    return {
      exam,
      isValid: missing.length === 0,
      missingFields: missing,
    };
  };

  // Trigger publish check for target exams
  const handleTriggerPublish = (targetExamIds: string[]) => {
    if (targetExamIds.length === 0) return;
    const targetExams = examPapers.filter((e) => targetExamIds.includes(e.id));
    const reports = targetExams.map(validateExamForPublish);
    const failures = reports.filter((r) => !r.isValid);

    if (failures.length > 0) {
      // Has missing required fields -> show alert modal
      setValidationFailures(failures);
      setConfirmPublishList(null);
    } else {
      // All passed -> show confirmation modal
      setValidationFailures(null);
      setConfirmPublishList(targetExams);
    }
  };

  const handleConfirmPublish = () => {
    if (!confirmPublishList || confirmPublishList.length === 0) return;
    const ids = confirmPublishList.map((e) => e.id);
    onPublishExams(ids);
    setConfirmPublishList(null);
    // Switch to published tab and reset page to view newly published exams
    setActiveTab('published');
    setCurrentPage(1);
  };

  const isAnyFilterActive = subjectFilter !== 'all' || difficultyFilter !== 'all' || statusFilter !== 'all';
  const activeFilterCount = (subjectFilter !== 'all' ? 1 : 0) + (difficultyFilter !== 'all' ? 1 : 0) + (statusFilter !== 'all' ? 1 : 0);

  const activeFilterSummary = useMemo(() => {
    const parts: string[] = [];
    if (subjectFilter !== 'all') parts.push(`科目: ${subjectNames[subjectFilter] || subjectFilter}`);
    if (difficultyFilter !== 'all') parts.push(`難度: Lv.${difficultyFilter}`);
    if (statusFilter !== 'all') parts.push(`狀態: ${statusFilter === 'published' ? '已發布' : '草稿'}`);
    return parts.join('、');
  }, [subjectFilter, difficultyFilter, statusFilter]);

  const handleResetFilters = () => {
    setSubjectFilter('all');
    setDifficultyFilter('all');
    setStatusFilter('all');
    setCurrentPage(1);
  };

  const filteredExams = useMemo(() => {
    return examPapers
      .filter((exam) => {
        // Tab filter
        if (activeTab === 'draft' && exam.status !== 'draft') {
          return false;
        }
        if (activeTab === 'published' && exam.status !== 'published') {
          return false;
        }

        if (subjectFilter !== 'all' && exam.subjectId !== subjectFilter) {
          return false;
        }
        if (difficultyFilter !== 'all' && String(exam.difficultyLv) !== difficultyFilter) {
          return false;
        }
        if (activeTab === 'all' && statusFilter !== 'all' && exam.status !== statusFilter) {
          return false;
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchId = exam.id.toLowerCase().includes(q);
          const matchTitle = exam.title.toLowerCase().includes(q);
          const matchSub = exam.subject.toLowerCase().includes(q);
          if (!matchId && !matchTitle && !matchSub) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (!sortField) return 0;
        const factor = sortOrder === 'asc' ? 1 : -1;
        switch (sortField) {
          case 'id':
            return a.id.localeCompare(b.id) * factor;
          case 'title':
            return a.title.localeCompare(b.title, 'zh-Hant') * factor;
          case 'subject':
            return a.subject.localeCompare(b.subject, 'zh-Hant') * factor;
          case 'difficulty':
            return (a.difficultyLv - b.difficultyLv) * factor;
          case 'questionCount':
            return (a.questionCount - b.questionCount) * factor;
          case 'totalScore':
            return (a.totalScore - b.totalScore) * factor;
          case 'duration':
            return (a.durationMinutes - b.durationMinutes) * factor;
          case 'status':
            return a.status.localeCompare(b.status) * factor;
          case 'createdAt':
            return a.createdAt.localeCompare(b.createdAt) * factor;
          default:
            return 0;
        }
      });
  }, [examPapers, activeTab, subjectFilter, difficultyFilter, statusFilter, searchQuery, sortField, sortOrder]);

  const totalExams = filteredExams.length;
  const totalPages = Math.max(1, Math.ceil(totalExams / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIdx = totalExams === 0 ? 0 : (safeCurrentPage - 1) * pageSize + 1;
  const endIdx = Math.min(safeCurrentPage * pageSize, totalExams);

  const displayedExams = filteredExams.slice(
    (safeCurrentPage - 1) * pageSize,
    safeCurrentPage * pageSize
  );

  const isAllCurrentSelected =
    displayedExams.length > 0 &&
    displayedExams.every((e) => selectedExamIds.includes(e.id));

  const handleSelectAllToggle = () => {
    if (isAllCurrentSelected) {
      onClearExamSelection();
    } else {
      const ids = displayedExams.map((e) => e.id);
      onSelectAllExams(Array.from(new Set([...selectedExamIds, ...ids])));
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Title Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-4">
        <div>
          <h1 className="text-[30px] leading-[38px] text-[#191c1e] font-bold tracking-tight">
            試卷管理 (Exam Paper Management)
          </h1>
        </div>
      </div>

      {/* Draft vs Published Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-4 bg-[#f2f4f6]/80 p-1.5 rounded-lg border border-[#c3c6d7]/30">
        <button
          onClick={() => {
            setActiveTab('draft');
            setCurrentPage(1);
          }}
          className={`flex items-center gap-2 px-4 py-2 text-[13px] font-semibold rounded-md transition-all cursor-pointer ${
            activeTab === 'draft'
              ? 'bg-[#004ac6] text-white shadow-sm'
              : 'text-[#434655] hover:text-[#191c1e] hover:bg-white/80'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">edit_note</span>
          <span>草稿 (草稿資料表)</span>
          <span
            className={`px-2 py-0.5 rounded-full text-[11px] font-mono font-bold ${
              activeTab === 'draft' ? 'bg-white text-[#004ac6]' : 'bg-[#e2e7ef] text-[#434655]'
            }`}
          >
            {draftExamsCount}
          </span>
        </button>

        <button
          onClick={() => {
            setActiveTab('published');
            setCurrentPage(1);
          }}
          className={`flex items-center gap-2 px-4 py-2 text-[13px] font-semibold rounded-md transition-all cursor-pointer ${
            activeTab === 'published'
              ? 'bg-[#137333] text-white shadow-sm'
              : 'text-[#434655] hover:text-[#191c1e] hover:bg-white/80'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">verified</span>
          <span>發布 (公用試卷資料表)</span>
          <span
            className={`px-2 py-0.5 rounded-full text-[11px] font-mono font-bold ${
              activeTab === 'published' ? 'bg-white text-[#137333]' : 'bg-[#e2e7ef] text-[#434655]'
            }`}
          >
            {publishedExamsCount}
          </span>
        </button>

        <button
          onClick={() => {
            setActiveTab('all');
            setCurrentPage(1);
          }}
          className={`flex items-center gap-2 px-4 py-2 text-[13px] font-semibold rounded-md transition-all cursor-pointer ${
            activeTab === 'all'
              ? 'bg-[#434655] text-white shadow-sm'
              : 'text-[#434655] hover:text-[#191c1e] hover:bg-white/80'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">folder_open</span>
          <span>全部試卷 (全部資料表)</span>
          <span
            className={`px-2 py-0.5 rounded-full text-[11px] font-mono font-bold ${
              activeTab === 'all' ? 'bg-white text-[#434655]' : 'bg-[#e2e7ef] text-[#434655]'
            }`}
          >
            {examPapers.length}
          </span>
        </button>
      </div>

      {/* Action & Filter Control Bar */}
      <div className="bg-white p-3 rounded shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 mb-3 border border-[#c3c6d7]/30">
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 flex-1 max-w-xl">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-[18px] text-[#434655]">
              search
            </span>
            <input
              className="w-full bg-[#f2f4f6] pl-9 pr-3 py-1.5 rounded text-[#191c1e] text-[13px] placeholder:text-[#434655]/70 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#004ac6]/20 transition-all border-0"
              placeholder="搜尋試卷名稱、試卷編號..."
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <div className="relative">
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className={`p-1.5 rounded transition-colors cursor-pointer flex items-center gap-1.5 ${
                isAnyFilterActive
                  ? 'text-[#004ac6] bg-[#dbe1ff] font-semibold'
                  : 'text-[#434655] bg-[#f2f4f6] hover:bg-[#eceef0]'
              }`}
              title={isAnyFilterActive ? `目前篩選：${activeFilterSummary}` : '開啟進階過濾器'}
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">filter_list</span>
              {isAnyFilterActive && (
                <span className="text-[10px] bg-[#004ac6] text-white px-1.5 py-0.2 rounded-full font-mono">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Filter Dropdown Popover */}
            {showFilterMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowFilterMenu(false)}
                />
                <div className="absolute left-0 top-full mt-1.5 w-72 bg-white rounded-lg shadow-xl border border-[#c3c6d7]/40 p-3.5 z-50 flex flex-col gap-3">
                  <div className="flex items-center justify-between border-b border-[#c3c6d7]/20 pb-2">
                    <span className="text-[13px] font-bold text-[#191c1e] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-[#004ac6]">filter_alt</span>
                      試卷篩選條件
                    </span>
                    {isAnyFilterActive && (
                      <button
                        onClick={handleResetFilters}
                        className="text-[12px] text-[#ba1a1a] hover:underline cursor-pointer font-medium"
                        type="button"
                      >
                        清除全部
                      </button>
                    )}
                  </div>

                  {/* 科目篩選 */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-semibold text-[#434655]">科目類別</label>
                    <select
                      value={subjectFilter}
                      onChange={(e) => {
                        setSubjectFilter(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full text-[12px] bg-[#f2f4f6] border border-[#c3c6d7]/40 rounded px-2.5 py-1.5 text-[#191c1e] focus:outline-none focus:border-[#004ac6] focus:bg-white"
                    >
                      <option value="all">全部科目 (不限)</option>
                      <option value="math">數學 (Math)</option>
                      <option value="english">英文 (English)</option>
                      <option value="chinese">國文 (Chinese)</option>
                      <option value="physics">自然 (物理)</option>
                      <option value="biology">自然 (生物)</option>
                      <option value="chemistry">自然 (化學)</option>
                      <option value="geography">社會 (地理)</option>
                      <option value="history">社會 (歷史)</option>
                    </select>
                  </div>

                  {/* 難度等級 */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-semibold text-[#434655]">難易度等級</label>
                    <select
                      value={difficultyFilter}
                      onChange={(e) => {
                        setDifficultyFilter(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full text-[12px] bg-[#f2f4f6] border border-[#c3c6d7]/40 rounded px-2.5 py-1.5 text-[#191c1e] focus:outline-none focus:border-[#004ac6] focus:bg-white"
                    >
                      <option value="all">全部難度 (Lv. 1 ~ 5)</option>
                      <option value="1">Lv. 1 (基礎入門)</option>
                      <option value="2">Lv. 2 (基礎熟練)</option>
                      <option value="3">Lv. 3 (中等進階)</option>
                      <option value="4">Lv. 4 (進階挑戰)</option>
                      <option value="5">Lv. 5 (高階競賽)</option>
                    </select>
                  </div>

                  {/* 發布狀態 */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-semibold text-[#434655]">試卷狀態</label>
                    <select
                      value={statusFilter}
                      onChange={(e) => {
                        setStatusFilter(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full text-[12px] bg-[#f2f4f6] border border-[#c3c6d7]/40 rounded px-2.5 py-1.5 text-[#191c1e] focus:outline-none focus:border-[#004ac6] focus:bg-white"
                    >
                      <option value="all">全部狀態 (不限)</option>
                      <option value="published">已發布 (公用試卷資料表)</option>
                      <option value="draft">草稿 (草稿資料表)</option>
                    </select>
                  </div>

                  <div className="pt-2 border-t border-[#c3c6d7]/20 flex items-center justify-end">
                    <button
                      onClick={() => setShowFilterMenu(false)}
                      className="w-full py-1.5 bg-[#004ac6] text-white rounded text-[12px] font-semibold hover:bg-[#2563eb] transition-colors cursor-pointer"
                      type="button"
                    >
                      完成套用
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Active Filter Tags */}
          {isAnyFilterActive && (
            <div className="flex items-center gap-1.5 text-[11px] text-[#004ac6] bg-[#dbe1ff]/70 px-2.5 py-1 rounded-full font-medium">
              <span>篩選：{activeFilterSummary}</span>
              <button
                onClick={handleResetFilters}
                className="material-symbols-outlined text-[14px] hover:text-[#ba1a1a] cursor-pointer ml-0.5"
                title="清除篩選"
                type="button"
              >
                close
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 justify-end">
          {/* 草稿頁面專屬發布按鈕 */}
          {activeTab === 'draft' && (
            <button
              onClick={() => handleTriggerPublish(selectedDraftIds)}
              disabled={selectedDraftIds.length === 0}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-[13px] font-semibold transition-all cursor-pointer ${
                selectedDraftIds.length > 0
                  ? 'bg-[#004ac6] text-white hover:bg-[#2563eb] shadow-sm active:scale-95'
                  : 'bg-[#f2f4f6] text-[#737686] opacity-60 cursor-not-allowed'
              }`}
              title={
                selectedDraftIds.length > 0
                  ? `檢查並發布已勾選的 ${selectedDraftIds.length} 份草稿試卷`
                  : '請先勾選欲發布的草稿試卷'
              }
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">publish</span>
              <span>發布選取試卷 {selectedDraftIds.length > 0 ? `(${selectedDraftIds.length})` : ''}</span>
            </button>
          )}

          <div className="relative">
            <button
              onClick={() => setShowColumnMenu(!showColumnMenu)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f2f4f6] border border-[#c3c6d7]/50 rounded text-[#191c1e] hover:bg-[#eceef0] transition-colors text-[13px] cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px] text-[#434655]">view_column</span>
              <span>自訂欄位</span>
              <span className={`material-symbols-outlined text-[16px] text-[#434655] transition-transform ${showColumnMenu ? 'rotate-180' : ''}`}>
                arrow_drop_down
              </span>
            </button>

            <ExamColumnVisibilityMenu
              isOpen={showColumnMenu}
              onClose={() => setShowColumnMenu(false)}
              columns={columnVisibility}
              onChange={setColumnVisibility}
            />
          </div>
        </div>
      </div>

      {/* Dynamic Batch Action Floating Bar (when rows are selected) */}
      {selectedExamIds.length > 0 && (
        <div className="bg-[#dae2fd] text-[#131b2e] p-3 rounded shadow-xs flex flex-wrap items-center justify-between gap-3 mb-3 transition-all duration-200 border border-[#b4c5ff]">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#004ac6] text-[20px]">checklist</span>
              <span className="text-[14px] font-semibold">
                已選取 <span className="text-[#004ac6] font-bold">{selectedExamIds.length}</span> 份試卷
                {selectedDraftIds.length > 0 && (
                  <span className="ml-1 text-[12px] text-[#004ac6] font-normal">
                    (含 {selectedDraftIds.length} 份草稿)
                  </span>
                )}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* 發布按鈕：檢查必填欄位並寫入公用試卷資料表 */}
            {selectedDraftIds.length > 0 && (
              <button
                onClick={() => handleTriggerPublish(selectedDraftIds)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#004ac6] text-white rounded shadow-sm hover:bg-[#2563eb] active:scale-95 transition-all text-[13px] font-semibold cursor-pointer"
                title="檢查必填欄位並發布選取的草稿試卷至公用試卷資料表"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">publish</span>
                <span>發布至公用資料表 ({selectedDraftIds.length})</span>
              </button>
            )}
            <button
              onClick={onBatchExport}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-[#191c1e] rounded shadow-xs hover:bg-[#eceef0] transition-all text-[13px] font-medium border border-[#c3c6d7]/40 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px] text-[#565e74]">file_present</span>
              <span>批次匯出 (PDF/Word)</span>
            </button>
            <button
              onClick={onOpenBatchDeleteModal}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#ba1a1a] text-white rounded shadow-xs hover:opacity-90 active:scale-95 transition-all text-[13px] font-medium cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">delete_forever</span>
              <span>批次刪除 ({selectedExamIds.length})</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Exam Papers Data Table Container */}
      <div className="bg-white rounded shadow-xs overflow-hidden mb-6 border border-[#c3c6d7]/30">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-[#f2f4f6] text-[#434655] text-[12px] uppercase tracking-wider font-semibold border-b border-[#c3c6d7]/30">
              <tr>
                <th className="py-3 px-4 w-12 text-center">
                  <input
                    checked={isAllCurrentSelected}
                    onChange={handleSelectAllToggle}
                    className="exam-row-cb w-4 h-4 rounded text-[#004ac6] focus:ring-0 cursor-pointer accent-[#004ac6]"
                    type="checkbox"
                  />
                </th>

                {columnVisibility.id && (
                  <th
                    className="py-3 px-3 cursor-pointer select-none group"
                    onClick={() => handleSort('id')}
                  >
                    <div className="inline-flex items-center gap-1 group-hover:text-[#004ac6] transition-colors">
                      <span className={sortField === 'id' ? 'text-[#004ac6] font-bold' : ''}>試卷編號 ID</span>
                      {renderSortArrow('id')}
                    </div>
                  </th>
                )}

                {columnVisibility.title && (
                  <th
                    className="py-3 px-3 cursor-pointer select-none group"
                    onClick={() => handleSort('title')}
                  >
                    <div className="inline-flex items-center gap-1 group-hover:text-[#004ac6] transition-colors">
                      <span className={sortField === 'title' ? 'text-[#004ac6] font-bold' : ''}>試卷名稱</span>
                      {renderSortArrow('title')}
                    </div>
                  </th>
                )}

                {columnVisibility.subject && (
                  <th
                    className="py-3 px-3 cursor-pointer select-none group"
                    onClick={() => handleSort('subject')}
                  >
                    <div className="inline-flex items-center gap-1 group-hover:text-[#004ac6] transition-colors">
                      <span className={sortField === 'subject' ? 'text-[#004ac6] font-bold' : ''}>學科類別</span>
                      {renderSortArrow('subject')}
                    </div>
                  </th>
                )}

                {columnVisibility.difficulty && (
                  <th
                    className="py-3 px-3 text-center cursor-pointer select-none group"
                    onClick={() => handleSort('difficulty')}
                  >
                    <div className="inline-flex items-center justify-center gap-1 group-hover:text-[#004ac6] transition-colors mx-auto">
                      <span className={sortField === 'difficulty' ? 'text-[#004ac6] font-bold' : ''}>難度 (Lv. 1-5)</span>
                      {renderSortArrow('difficulty')}
                    </div>
                  </th>
                )}

                {columnVisibility.questionCount && (
                  <th
                    className="py-3 px-3 text-center cursor-pointer select-none group"
                    onClick={() => handleSort('questionCount')}
                  >
                    <div className="inline-flex items-center justify-center gap-1 group-hover:text-[#004ac6] transition-colors mx-auto">
                      <span className={sortField === 'questionCount' ? 'text-[#004ac6] font-bold' : ''}>題數</span>
                      {renderSortArrow('questionCount')}
                    </div>
                  </th>
                )}

                {columnVisibility.totalScore && (
                  <th
                    className="py-3 px-3 text-center cursor-pointer select-none group"
                    onClick={() => handleSort('totalScore')}
                  >
                    <div className="inline-flex items-center justify-center gap-1 group-hover:text-[#004ac6] transition-colors mx-auto">
                      <span className={sortField === 'totalScore' ? 'text-[#004ac6] font-bold' : ''}>總分</span>
                      {renderSortArrow('totalScore')}
                    </div>
                  </th>
                )}

                {columnVisibility.duration && (
                  <th
                    className="py-3 px-3 text-center cursor-pointer select-none group"
                    onClick={() => handleSort('duration')}
                  >
                    <div className="inline-flex items-center justify-center gap-1 group-hover:text-[#004ac6] transition-colors mx-auto">
                      <span className={sortField === 'duration' ? 'text-[#004ac6] font-bold' : ''}>時長</span>
                      {renderSortArrow('duration')}
                    </div>
                  </th>
                )}

                {columnVisibility.status && (
                  <th
                    className="py-3 px-3 cursor-pointer select-none group"
                    onClick={() => handleSort('status')}
                  >
                    <div className="inline-flex items-center gap-1 group-hover:text-[#004ac6] transition-colors">
                      <span className={sortField === 'status' ? 'text-[#004ac6] font-bold' : ''}>狀態 (資料表歸屬)</span>
                      {renderSortArrow('status')}
                    </div>
                  </th>
                )}

                {columnVisibility.createdAt && (
                  <th
                    className="py-3 px-3 cursor-pointer select-none group"
                    onClick={() => handleSort('createdAt')}
                  >
                    <div className="inline-flex items-center gap-1 group-hover:text-[#004ac6] transition-colors">
                      <span className={sortField === 'createdAt' ? 'text-[#004ac6] font-bold' : ''}>建立時間</span>
                      {renderSortArrow('createdAt')}
                    </div>
                  </th>
                )}

                {columnVisibility.actions && (
                  <th className="py-3 px-4 text-right">操作</th>
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-[#eceef0]">
              {displayedExams.map((exam) => {
                const isSelected = selectedExamIds.includes(exam.id);
                const isArchived = exam.status === 'archived';

                return (
                  <tr
                    key={exam.id}
                    className={`transition-colors ${
                      isSelected
                        ? 'bg-[#dbe1ff]/20 hover:bg-[#dbe1ff]/30'
                        : 'hover:bg-[#f2f4f6]'
                    } ${isArchived ? 'opacity-85' : ''}`}
                  >
                    <td className="py-3 px-4 text-center">
                      <input
                        checked={isSelected}
                        onChange={() => onToggleSelectExam(exam.id)}
                        className="exam-row-cb w-4 h-4 rounded text-[#004ac6] focus:ring-0 cursor-pointer accent-[#004ac6]"
                        type="checkbox"
                      />
                    </td>

                    {columnVisibility.id && (
                      <td className="py-3 px-3 font-mono text-[12px] text-[#004ac6] font-medium">
                        {exam.id}
                      </td>
                    )}

                    {columnVisibility.title && (
                      <td className="py-3 px-3">
                        <div
                          onClick={() => onPreviewExam(exam)}
                          className={`text-[14px] font-semibold hover:text-[#004ac6] cursor-pointer ${
                            isArchived ? 'line-through text-[#434655]' : 'text-[#191c1e]'
                          }`}
                        >
                          {exam.title}
                        </div>
                        <div className="text-[11px] text-[#434655]">
                          {exam.description}
                        </div>
                      </td>
                    )}

                    {columnVisibility.subject && (
                      <td className="py-3 px-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#eceef0] text-[#191c1e] text-[12px]">
                          {exam.subject}
                        </span>
                      </td>
                    )}

                    {columnVisibility.difficulty && (
                      <td className="py-3 px-3 text-center">
                        <span className="font-mono text-[12px] font-semibold text-[#191c1e]">
                          Lv. {exam.difficultyLv}
                        </span>
                      </td>
                    )}

                    {columnVisibility.questionCount && (
                      <td className="py-3 px-3 text-center font-mono text-[12px] font-semibold">
                        {exam.questionCount} 題
                      </td>
                    )}

                    {columnVisibility.totalScore && (
                      <td className="py-3 px-3 text-center font-mono text-[12px]">
                        {exam.totalScore} 分
                      </td>
                    )}

                    {columnVisibility.duration && (
                      <td className="py-3 px-3 text-center font-mono text-[12px]">
                        {exam.durationMinutes} 分鐘
                      </td>
                    )}

                    {columnVisibility.status && (
                      <td className="py-3 px-3">
                        {exam.status === 'published' ? (
                          <div className="flex flex-col items-start gap-0.5">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#e6f4ea] text-[#137333] border border-[#ceead6]">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#137333]"></span>
                              發布
                            </span>
                            <span className="text-[10px] text-[#565e74] font-medium font-mono">
                              公用試卷資料表
                            </span>
                          </div>
                        ) : exam.status === 'draft' ? (
                          <div className="flex flex-col items-start gap-0.5">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#fef7e0] text-[#b06000] border border-[#feefc3]">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#b06000]"></span>
                              草稿
                            </span>
                            <span className="text-[10px] text-[#565e74] font-medium font-mono">
                              草稿資料表
                            </span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-start gap-0.5">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#f1f3f4] text-[#5f6368] border border-[#dadce0]">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#5f6368]"></span>
                              已封存
                            </span>
                          </div>
                        )}
                      </td>
                    )}

                    {columnVisibility.createdAt && (
                      <td className="py-3 px-3">
                        <div className="text-[#191c1e] font-mono text-[12px]">
                          {exam.createdAt}
                        </div>
                      </td>
                    )}

                    {columnVisibility.actions && (
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1 text-[#434655]">
                          {/* 草稿專屬快速發布按鈕 */}
                          {exam.status === 'draft' && (
                            <button
                              onClick={() => handleTriggerPublish([exam.id])}
                              className="p-1 hover:text-[#004ac6] text-[#004ac6] bg-[#004ac6]/10 hover:bg-[#004ac6]/20 rounded transition-colors cursor-pointer mr-1"
                              title="檢查必填欄位並發布至公用試卷資料表"
                              type="button"
                            >
                              <span className="material-symbols-outlined text-[18px]">publish</span>
                            </button>
                          )}
                          <button
                            onClick={() => onPreviewExam(exam)}
                            className="p-1 hover:text-[#004ac6] transition-colors cursor-pointer"
                            title="預覽試卷"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[18px]">visibility</span>
                          </button>
                          <button
                            onClick={() => onEditExam(exam)}
                            className="p-1 hover:text-[#004ac6] transition-colors cursor-pointer"
                            title="編輯內容"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[18px]">edit</span>
                          </button>
                          <button
                            onClick={() => onPreviewExam(exam)}
                            className="p-1 hover:text-[#004ac6] transition-colors cursor-pointer"
                            title="匯出卷卡"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[18px]">download</span>
                          </button>
                          <button
                            onClick={() => onDeleteSingleExam(exam)}
                            className="p-1 hover:text-[#ba1a1a] transition-colors cursor-pointer"
                            title="刪除試卷"
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

              {displayedExams.length === 0 && (
                <tr>
                  <td colSpan={Object.values(columnVisibility).filter(Boolean).length + 1} className="py-12 text-center text-[#434655]">
                    <div className="flex flex-col items-center gap-2">
                      <span className="material-symbols-outlined text-[36px] text-[#737686]">
                        search_off
                      </span>
                      <p className="font-medium">
                        {activeTab === 'draft'
                          ? '目前草稿資料表中無符合條件的試卷'
                          : activeTab === 'published'
                          ? '目前公用試卷資料表中無符合條件的試卷'
                          : '無符合條件的試卷'}
                      </p>
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setSubjectFilter('all');
                          setDifficultyFilter('all');
                          setStatusFilter('all');
                        }}
                        className="text-[13px] text-[#004ac6] hover:underline cursor-pointer"
                      >
                        清除搜尋篩選條件
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Pagination Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 bg-[#f2f4f6] text-[13px] text-[#434655] border-t border-[#c3c6d7]/30">
          <div>
            顯示第 <span className="font-mono font-semibold text-[#191c1e]">{startIdx}</span> 至{' '}
            <span className="font-mono font-semibold text-[#191c1e]">{endIdx}</span> 筆，共{' '}
            <span className="font-mono font-semibold text-[#191c1e]">{totalExams}</span> 筆試卷
          </div>
          <div className="flex items-center gap-1 mt-2 sm:mt-0">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={safeCurrentPage === 1}
              className="p-1 rounded hover:bg-[#eceef0] text-[#434655] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded font-mono text-[12px] font-medium cursor-pointer transition-colors ${
                  safeCurrentPage === page ? 'bg-[#004ac6] text-white' : 'hover:bg-[#eceef0] text-[#191c1e]'
                }`}
                type="button"
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={safeCurrentPage >= totalPages}
              className="p-1 rounded hover:bg-[#eceef0] text-[#191c1e] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* 1. 必填欄位檢查未通過警告彈窗 */}
      {validationFailures && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full border border-[#c3c6d7]/40 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="bg-[#ba1a1a]/10 px-5 py-4 flex items-center gap-3 border-b border-[#ba1a1a]/20">
              <div className="w-10 h-10 rounded-full bg-[#ba1a1a] text-white flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">warning</span>
              </div>
              <div>
                <h3 className="text-[17px] font-bold text-[#191c1e]">
                  必填欄位檢查未通過，無法發布
                </h3>
                <p className="text-[12px] text-[#434655]">
                  共有 {validationFailures.length} 份草稿試卷缺少必填資訊
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5 max-h-[60vh] overflow-y-auto flex flex-col gap-3">
              <div className="text-[13px] text-[#191c1e] bg-[#f2f4f6] p-3 rounded border border-[#c3c6d7]/30">
                <p className="font-medium text-[#ba1a1a] mb-1">
                  發布至公用試卷資料表前，必須完整填妥所有必填規範欄位：
                </p>
                <p className="text-[12px] text-[#434655]">
                  必填條件包括：試卷名稱、學科類別、難度等級、試卷題數（需配置題目）、總分以及測驗時長。
                </p>
              </div>

              <div className="flex flex-col gap-2.5">
                {validationFailures.map((failure) => (
                  <div
                    key={failure.exam.id}
                    className="p-3 bg-[#fff8f7] border border-[#ffdad6] rounded-lg flex flex-col gap-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[13px] text-[#191c1e]">
                        {failure.exam.title || '（未命名試卷）'}
                      </span>
                      <span className="font-mono text-[11px] text-[#ba1a1a] bg-white px-2 py-0.5 rounded border border-[#ffdad6]">
                        {failure.exam.id}
                      </span>
                    </div>

                    <div className="text-[12px] text-[#434655] font-medium">缺少必填項目：</div>
                    <ul className="list-disc list-inside text-[12px] text-[#ba1a1a] flex flex-col gap-1 pl-1">
                      {failure.missingFields.map((field, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[15px] text-[#ba1a1a]">cancel</span>
                          <span>{field}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#f2f4f6] border-t border-[#c3c6d7]/30 flex items-center justify-end">
              <button
                onClick={() => setValidationFailures(null)}
                className="px-4 py-2 bg-[#191c1e] text-white rounded-md text-[13px] font-semibold hover:bg-black transition-colors cursor-pointer"
                type="button"
              >
                我知道了，返回編輯補齊欄位
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. 必填檢驗通過，確認發布試卷彈窗 */}
      {confirmPublishList && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full border border-[#c3c6d7]/40 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="bg-[#e6f4ea] px-5 py-4 flex items-center gap-3 border-b border-[#ceead6]">
              <div className="w-10 h-10 rounded-full bg-[#137333] text-white flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">verified</span>
              </div>
              <div>
                <h3 className="text-[17px] font-bold text-[#191c1e]">
                  確認發布試卷 (寫入公用試卷資料表)
                </h3>
                <p className="text-[12px] text-[#137333] font-medium">
                  ✓ 必填欄位檢查全數合格，共 {confirmPublishList.length} 份試卷準備發布
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5 max-h-[60vh] overflow-y-auto flex flex-col gap-3">
              <div className="p-3 bg-[#e8f0fe] rounded-lg border border-[#d2e3fc] text-[12.5px] text-[#174ea6] flex flex-col gap-1">
                <div className="font-bold flex items-center gap-1.5 text-[13px]">
                  <span className="material-symbols-outlined text-[17px]">info</span>
                  發布作業流程說明：
                </div>
                <ul className="list-disc list-inside flex flex-col gap-0.5 pl-1 text-[12px]">
                  <li>
                    確認發布後，試卷資料將正式寫入<strong>「公用試卷資料表」</strong>（狀態更新為發布）。
                  </li>
                  <li>
                    系統將同步從<strong>「草稿資料表」</strong>刪除該筆資料。
                  </li>
                  <li>
                    發布完成後將自動跳轉至<strong>「發布 (公用試卷資料表)」</strong>分頁呈現最新發布清單。
                  </li>
                </ul>
              </div>

              <div className="text-[12px] font-semibold text-[#434655]">即將發布之試卷清單：</div>
              <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
                {confirmPublishList.map((exam) => (
                  <div
                    key={exam.id}
                    className="p-3 bg-[#f7f9fb] border border-[#c3c6d7]/40 rounded-lg flex items-center justify-between text-[13px]"
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="font-bold text-[#191c1e]">{exam.title}</span>
                      <span className="text-[11px] text-[#565e74] font-mono">
                        {exam.id} | {exam.subject} | Lv.{exam.difficultyLv} | {exam.questionCount}題 | {exam.totalScore}分 | {exam.durationMinutes}分鐘
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#137333] bg-[#e6f4ea] px-2 py-0.5 rounded-full border border-[#ceead6]">
                      <span className="material-symbols-outlined text-[14px]">check</span>
                      檢驗通過
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#f2f4f6] border-t border-[#c3c6d7]/30 flex items-center justify-end gap-2">
              <button
                onClick={() => setConfirmPublishList(null)}
                className="px-4 py-2 bg-white border border-[#c3c6d7]/60 text-[#191c1e] rounded-md text-[13px] font-medium hover:bg-[#eceef0] transition-colors cursor-pointer"
                type="button"
              >
                取消
              </button>
              <button
                onClick={handleConfirmPublish}
                className="px-4 py-2 bg-[#004ac6] text-white rounded-md text-[13px] font-semibold hover:bg-[#2563eb] shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">publish</span>
                <span>確認發布 (寫入公用資料表)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
