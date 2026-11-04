import React, { useState } from 'react';
import { SubjectId, SubjectFilter, Question, CategoryItem } from '@/types';
import { CATEGORY_ID_TO_SUBJECT, SUBJECT_NAME_MAP } from '@/services/publicSheet';

interface SidebarProps {
  activePage: 'question-bank' | 'exam-papers' | 'system-settings';
  selectedSubject: SubjectFilter;
  onSelectSubject: (id: SubjectFilter) => void;
  onNavigate: (page: 'question-bank' | 'exam-papers' | 'system-settings') => void;
  onOpenCreateQuestion: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  questions: Question[];
  categories?: CategoryItem[];
  isSheetsConnected?: boolean;
  spreadsheetUrl?: string | null;
  onSync?: () => void;
  isSyncing?: boolean;
}

const SUBJECT_DISPLAY_LABEL: Record<string, string> = {
  chinese: '國文 (Chinese)',
  english: '英文 (English)',
  math: '數學 (Math)',
  biology: '生物',
  physics: '物理',
  chemistry: '化學',
  astronomy: '天文',
  civics: '公民',
  geography: '地理',
  history: '歷史',
};

const DOMAIN_DISPLAY_LABEL: Record<string, string> = {
  '自然領域': '自然 (Science)',
  '社會領域': '社會 (Social Studies)',
};

function resolveCategorySubjectId(cat: CategoryItem): SubjectId | undefined {
  return CATEGORY_ID_TO_SUBJECT[cat.id] || SUBJECT_NAME_MAP[cat.categories_name];
}

export const Sidebar: React.FC<SidebarProps> = ({
  activePage,
  selectedSubject,
  onSelectSubject,
  onNavigate,
  onOpenCreateQuestion,
  collapsed,
  onToggleCollapse,
  questions,
  categories = [],
  isSheetsConnected,
  spreadsheetUrl,
  onSync,
  isSyncing,
}) => {
  const [expandedGroupIds, setExpandedGroupIds] = useState<Record<number, boolean>>({ 1: true, 2: true });
  const [questionBankOpen, setQuestionBankOpen] = useState(false);

  const toggleGroup = (id: number) => {
    setExpandedGroupIds((prev) => ({ ...prev, [id]: !(prev[id] ?? true) }));
  };

  // Compute actual question counts dynamically without any hardcoding
  const getSubjectCount = (id: SubjectId, catId?: number) =>
    questions.filter((q) => (catId && q.categoryId === catId) || q.subjectId === id).length;

  // Separate top-level categories (parent_id === 0) and child categories (parent_id > 0)
  const topLevelCategories = categories
    .filter((c) => !c.parent_id || c.parent_id === 0)
    .sort((a, b) => a.sort_order - b.sort_order);

  const getChildCategories = (parentId: number) =>
    categories
      .filter((c) => c.parent_id === parentId)
      .sort((a, b) => a.sort_order - b.sort_order);

  if (collapsed) {
    return (
      <aside className="fixed left-0 top-14 bottom-0 w-16 bg-white border-r border-[#c3c6d7]/30 z-30 flex flex-col justify-between py-4 items-center">
        <div className="flex flex-col items-center gap-4 w-full">
          {/* Expand toggle */}
          <button
            onClick={onToggleCollapse}
            className="p-2 text-[#434655] hover:text-[#191c1e] hover:bg-[#eceef0] rounded-lg transition-colors cursor-pointer"
            title="展開側邊欄 ( [ )"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">keyboard_double_arrow_right</span>
          </button>

          <button
            onClick={() => onNavigate('question-bank')}
            className={`p-2.5 rounded-lg transition-colors cursor-pointer ${
              activePage === 'question-bank'
                ? 'bg-[#004ac6] text-white shadow-sm'
                : 'text-[#434655] hover:bg-[#eceef0] hover:text-[#191c1e]'
            }`}
            title="題庫管理"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">menu_book</span>
          </button>

          <button
            onClick={() => onNavigate('exam-papers')}
            className={`p-2.5 rounded-lg transition-colors cursor-pointer ${
              activePage === 'exam-papers'
                ? 'bg-[#004ac6] text-white shadow-sm'
                : 'text-[#434655] hover:bg-[#eceef0] hover:text-[#191c1e]'
            }`}
            title="試卷管理"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">assignment</span>
          </button>

          <button
            onClick={() => onNavigate('system-settings')}
            className={`p-2.5 rounded-lg transition-colors cursor-pointer ${
              activePage === 'system-settings'
                ? 'bg-[#004ac6] text-white shadow-sm'
                : 'text-[#434655] hover:bg-[#eceef0] hover:text-[#191c1e]'
            }`}
            title="系統設定"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">settings</span>
          </button>
        </div>

        {/* Quick create */}
        <button
          onClick={onOpenCreateQuestion}
          className="p-2.5 bg-[#dbe1ff] text-[#004ac6] rounded-full hover:bg-[#b4c5ff] transition-colors cursor-pointer"
          title="新增題目"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
        </button>
      </aside>
    );
  }

  return (
    <aside className="fixed left-0 top-14 bottom-0 w-64 bg-white border-r border-[#c3c6d7]/30 z-30 flex flex-col justify-between overflow-y-auto">
      <div className="p-3 flex flex-col gap-2">
        <nav className="flex flex-col gap-1">
          {/* Collapse sidebar button */}
          <button
            onClick={onToggleCollapse}
            className="flex items-center justify-between w-full px-3 py-2 text-[#434655] hover:text-[#191c1e] hover:bg-[#eceef0] rounded transition-colors text-[13px] cursor-pointer"
            type="button"
          >
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">keyboard_double_arrow_left</span>
              <span>收合側邊欄</span>
            </span>
            <kbd className="font-mono text-[11px] bg-[#e6e8ea] px-1.5 py-0.5 rounded text-[#434655]">[</kbd>
          </button>

          {/* 題庫管理 Group */}
          <div className="pt-1">
            <div
              onClick={() => setQuestionBankOpen(!questionBankOpen)}
              className="flex items-center justify-between px-3 py-2 text-[#191c1e] font-semibold text-[15px] cursor-pointer hover:bg-[#f2f4f6] rounded"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px] text-[#004ac6]">menu_book</span>
                <span>題庫管理</span>
              </div>
              <span className={`material-symbols-outlined text-[18px] text-[#434655] transition-transform ${questionBankOpen ? 'rotate-0' : '-rotate-90'}`}>
                expand_more
              </span>
            </div>

            {questionBankOpen && (
              <div className="pl-4 flex flex-col gap-1 mt-1">
                {/* 新增題目 */}
                <button
                  onClick={onOpenCreateQuestion}
                  className="flex items-center gap-2 px-3 py-1.5 rounded text-[13px] text-[#004ac6] hover:bg-[#dbe1ff]/30 transition-colors w-full text-left font-medium cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  <span>新增題目</span>
                </button>

                {/* 題目列表 (點擊前往題目列表總表，同時展開各科目) */}
                <button
                  onClick={() => {
                    onSelectSubject('all');
                    onNavigate('question-bank');
                    setQuestionBankOpen(true);
                  }}
                  className={`flex items-center justify-between px-3 py-1.5 rounded text-[13px] transition-colors w-full text-left cursor-pointer ${
                    activePage === 'question-bank' && selectedSubject === 'all'
                      ? 'bg-[#004ac6] text-white font-semibold'
                      : 'text-[#191c1e] font-semibold hover:bg-[#eceef0]'
                  }`}
                  type="button"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px]">format_list_bulleted</span>
                    <span>題目列表</span>
                  </div>
                  <span
                    className={`text-[11px] font-mono ${
                      activePage === 'question-bank' && selectedSubject === 'all'
                        ? 'text-white/90'
                        : 'text-[#434655]/80'
                    }`}
                  >
                    {questions.length}
                  </span>
                </button>

                {/* 科目清單：完全從 Google Sheet table:categories 動態讀取；若未同步則不顯示科目 */}
                {topLevelCategories.length === 0 ? (
                  <div className="px-3 py-2.5 mt-1 rounded-lg bg-[#f8f9fa] border border-dashed border-[#c3c6d7]/60 text-[12px] text-[#434655] flex flex-col gap-1.5">
                    <span className="leading-snug text-[#737686]">
                      尚未同步 Google Sheet (<code className="font-mono text-[11px]">categories</code>)，暫無科目清單
                    </span>
                    {onSync && (
                      <button
                        onClick={onSync}
                        disabled={isSyncing}
                        type="button"
                        className="inline-flex items-center justify-center gap-1 px-2 py-1 bg-[#004ac6] hover:bg-[#003da6] text-white text-[11px] font-semibold rounded transition-colors cursor-pointer disabled:opacity-50"
                      >
                        <span className={`material-symbols-outlined text-[13px] ${isSyncing ? 'animate-spin' : ''}`}>
                          sync
                        </span>
                        <span>{isSyncing ? '同步中...' : '立即同步讀取科目'}</span>
                      </button>
                    )}
                  </div>
                ) : (
                  topLevelCategories.map((cat) => {
                    const children = getChildCategories(cat.id);
                    const isDomainGroup = cat.level === 1 || children.length > 0;

                    if (isDomainGroup) {
                      const isOpen = expandedGroupIds[cat.id] ?? true;
                      const groupLabel = DOMAIN_DISPLAY_LABEL[cat.categories_name] || cat.categories_name;
                      return (
                        <div key={cat.id} className="flex flex-col gap-1">
                          <div
                            onClick={() => toggleGroup(cat.id)}
                            className="flex items-center justify-between px-3 py-1 text-[13px] text-[#434655] hover:text-[#191c1e] cursor-pointer"
                          >
                            <span className="font-medium">{groupLabel}</span>
                            <span
                              className={`material-symbols-outlined text-[14px] transition-transform ${
                                isOpen ? 'rotate-0' : '-rotate-90'
                              }`}
                            >
                              expand_more
                            </span>
                          </div>

                          {isOpen && children.length > 0 && (
                            <div className="pl-3 flex flex-col gap-0.5">
                              {children.map((child) => {
                                const subj = resolveCategorySubjectId(child);
                                if (!subj) return null;
                                const isCurrent = activePage === 'question-bank' && selectedSubject === subj;
                                const childLabel = SUBJECT_DISPLAY_LABEL[subj] || child.categories_name;
                                return (
                                  <button
                                    key={child.id}
                                    onClick={() => {
                                      onSelectSubject(subj);
                                      onNavigate('question-bank');
                                    }}
                                    className={`px-3 py-1 rounded text-[13px] text-left transition-colors cursor-pointer flex items-center justify-between ${
                                      isCurrent
                                        ? 'bg-[#004ac6] text-white font-semibold'
                                        : 'text-[#434655] hover:bg-[#eceef0] hover:text-[#191c1e]'
                                    }`}
                                    type="button"
                                  >
                                    <span>{childLabel}</span>
                                    <span
                                      className={`text-[11px] font-mono ${
                                        isCurrent ? 'text-white/80' : 'text-[#434655]/70'
                                      }`}
                                    >
                                      {getSubjectCount(subj, child.id)}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    }

                    const subj = resolveCategorySubjectId(cat);
                    if (!subj) return null;
                    const isCurrent = activePage === 'question-bank' && selectedSubject === subj;
                    const label = SUBJECT_DISPLAY_LABEL[subj] || cat.categories_name;

                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          onSelectSubject(subj);
                          onNavigate('question-bank');
                        }}
                        className={`flex items-center justify-between px-3 py-1.5 rounded text-[13px] transition-colors w-full text-left cursor-pointer ${
                          isCurrent
                            ? 'bg-[#004ac6] text-white font-semibold'
                            : 'text-[#434655] hover:bg-[#eceef0] hover:text-[#191c1e]'
                        }`}
                        type="button"
                      >
                        <span>{label}</span>
                        <span
                          className={`text-[11px] font-mono ${
                            isCurrent ? 'text-white/90' : 'text-[#434655]/80'
                          }`}
                        >
                          {getSubjectCount(subj, cat.id)}
                        </span>
                      </button>
                    );
                  })
                )}
              </div>
            )}
          </div>

          {/* 試卷管理 */}
          <button
            onClick={() => onNavigate('exam-papers')}
            className={`flex items-center gap-3 px-3 py-2.5 transition-colors rounded text-[14px] cursor-pointer text-left ${
              activePage === 'exam-papers'
                ? 'bg-[#004ac6] text-white font-semibold shadow-xs'
                : 'text-[#434655] hover:bg-[#eceef0] hover:text-[#191c1e]'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">assignment</span>
            <span>試卷管理</span>
          </button>

          {/* 系統設定 */}
          <button
            onClick={() => onNavigate('system-settings')}
            className={`flex items-center gap-3 px-3 py-2.5 rounded text-[14px] text-left cursor-pointer transition-colors ${
              activePage === 'system-settings'
                ? 'bg-[#004ac6] text-white font-semibold shadow-xs'
                : 'text-[#434655] hover:bg-[#eceef0] hover:text-[#191c1e]'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">settings</span>
            <span>系統設定</span>
          </button>
        </nav>
      </div>

      {/* Public Database Connection & Sync Card */}
      <div className="p-3 border-t border-[#c3c6d7]/30 flex flex-col gap-2">
        <div className="p-3 bg-[#f8f9fa] rounded-xl border border-[#c3c6d7]/40 shadow-2xs flex flex-col gap-2.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#191c1e]">
              <span className="material-symbols-outlined text-[18px] text-[#0f9d58]">table_chart</span>
              <span>公用資料庫</span>
            </div>

            {isSheetsConnected ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#e8f5e9] text-[#2e7d32] border border-[#a5d6a7] text-[11px] font-medium shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0f9d58] animate-pulse"></span>
                <span>已連線</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ffdad6]/70 text-[#ba1a1a] border border-[#ffb4ab] text-[11px] font-medium shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a]"></span>
                <span>未連線</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {onSync && (
              <button
                onClick={onSync}
                disabled={isSyncing}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 bg-[#004ac6] hover:bg-[#003da6] text-white text-[12px] font-semibold rounded-lg shadow-2xs transition-all cursor-pointer disabled:opacity-50"
                title={isSheetsConnected ? '同步 Google 試算表最新資料' : '連線並同步 Google 試算表資料'}
                type="button"
              >
                <span className={`material-symbols-outlined text-[14px] ${isSyncing ? 'animate-spin' : ''}`}>
                  sync
                </span>
                <span>{isSyncing ? '同步中...' : isSheetsConnected ? '同步' : '連線同步'}</span>
              </button>
            )}

            {isSheetsConnected && spreadsheetUrl && (
              <a
                href={spreadsheetUrl}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 text-[#434655] hover:text-[#004ac6] bg-white hover:bg-[#eceef0] border border-[#c3c6d7]/50 rounded-lg transition-colors flex items-center justify-center shrink-0"
                title="在 Google 試算表開啟 (另開新分頁)"
              >
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};
