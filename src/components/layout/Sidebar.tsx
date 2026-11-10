'use client';

import React, { useState } from 'react';
import { SubjectId, SubjectFilter, Question, CategoryItem, UserProfile } from '@/types';
import { CATEGORY_ID_TO_SUBJECT, SUBJECT_NAME_MAP } from '@/services/publicSheet';

export type AppPageId =
  | 'question-bank'
  | 'exam-papers'
  | 'system-settings'
  | 'account-manage'
  | 'user-selector'
  | 'user-exam-select'
  | 'user-wrong-questions'
  | 'user-settings';

interface SidebarProps {
  activePage: AppPageId;
  selectedSubject: SubjectFilter;
  onSelectSubject: (id: SubjectFilter) => void;
  onNavigate: (page: AppPageId) => void;
  onOpenCreateQuestion: () => void;
  onOpenUploadExam?: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  questions: Question[];
  categories?: CategoryItem[];
  isSheetsConnected?: boolean;
  spreadsheetUrl?: string | null;
  onSync?: () => void;
  isSyncing?: boolean;
  currentUser?: UserProfile | null;
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
  onOpenUploadExam,
  collapsed,
  onToggleCollapse,
  questions,
  categories = [],
  isSheetsConnected,
  spreadsheetUrl,
  onSync,
  isSyncing,
  currentUser,
}) => {
  const [expandedGroupIds, setExpandedGroupIds] = useState<Record<number, boolean>>({ 1: true, 2: true });
  const [questionBankOpen, setQuestionBankOpen] = useState(false);

  // 判定是否為管理員，非管理員角色一律在 else 處理為使用者
  const roleCode = String(currentUser?.role || '').toUpperCase();
  const isAdmin = roleCode === 'ADMIN';

  const toggleGroup = (id: number) => {
    setExpandedGroupIds((prev) => ({ ...prev, [id]: !(prev[id] ?? true) }));
  };

  const getSubjectCount = (id: SubjectId, catId?: number) =>
    questions.filter((q) => (catId && q.categoryId === catId) || q.subjectId === id).length;

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
        <div className="flex flex-col items-center gap-3 w-full">
          {/* Expand toggle */}
          <button
            onClick={onToggleCollapse}
            className="p-2 text-[#434655] hover:text-[#191c1e] hover:bg-[#eceef0] rounded-lg transition-colors cursor-pointer"
            title="展開側邊欄 ( [ )"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">keyboard_double_arrow_right</span>
          </button>

          {isAdmin ? (
            /* 管理員收合圖示 */
            <>
              <button
                onClick={() => onNavigate('account-manage')}
                className={`p-2.5 rounded-lg transition-colors cursor-pointer ${activePage === 'account-manage'
                    ? 'bg-[#004ac6] text-white shadow-sm'
                    : 'text-[#434655] hover:bg-[#eceef0] hover:text-[#191c1e]'
                  }`}
                title="帳號管理"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">manage_accounts</span>
              </button>

              <button
                onClick={() => onNavigate('question-bank')}
                className={`p-2.5 rounded-lg transition-colors cursor-pointer ${activePage === 'question-bank'
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
                className={`p-2.5 rounded-lg transition-colors cursor-pointer ${activePage === 'exam-papers'
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
                className={`p-2.5 rounded-lg transition-colors cursor-pointer ${activePage === 'system-settings'
                    ? 'bg-[#004ac6] text-white shadow-sm'
                    : 'text-[#434655] hover:bg-[#eceef0] hover:text-[#191c1e]'
                  }`}
                title="系統設定"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">settings</span>
              </button>
            </>
          ) : (
            /* 使用者收合圖示 */
            <>
              <button
                onClick={() => onNavigate('user-exam-select')}
                className={`p-2.5 rounded-lg transition-colors cursor-pointer ${activePage === 'user-exam-select'
                    ? 'bg-[#004ac6] text-white shadow-sm'
                    : 'text-[#434655] hover:bg-[#eceef0] hover:text-[#191c1e]'
                  }`}
                title="試卷選擇頁面"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">quiz</span>
              </button>

              <button
                onClick={() => onNavigate('user-selector')}
                className={`p-2.5 rounded-lg transition-colors cursor-pointer ${activePage === 'user-selector'
                    ? 'bg-[#004ac6] text-white shadow-sm'
                    : 'text-[#434655] hover:bg-[#eceef0] hover:text-[#191c1e]'
                  }`}
                title="題目選擇頁面"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">checklist</span>
              </button>

              <button
                onClick={() => onNavigate('user-wrong-questions')}
                className={`p-2.5 rounded-lg transition-colors cursor-pointer ${activePage === 'user-wrong-questions'
                    ? 'bg-[#004ac6] text-white shadow-sm'
                    : 'text-[#434655] hover:bg-[#eceef0] hover:text-[#191c1e]'
                  }`}
                title="錯題匯入頁面"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">analytics</span>
              </button>

              <button
                onClick={() => onNavigate('user-settings')}
                className={`p-2.5 rounded-lg transition-colors cursor-pointer ${activePage === 'user-settings'
                    ? 'bg-[#004ac6] text-white shadow-sm'
                    : 'text-[#434655] hover:bg-[#eceef0] hover:text-[#191c1e]'
                  }`}
                title="個人設定"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">person</span>
              </button>
            </>
          )}
        </div>

        {isAdmin && (
          <button
            onClick={onOpenCreateQuestion}
            className="p-2.5 bg-[#dbe1ff] text-[#004ac6] rounded-full hover:bg-[#b4c5ff] transition-colors cursor-pointer"
            title="手動新增題目"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
          </button>
        )}
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
            <kbd className="font-mono text-[11px] bg-[#e0e3e5] px-1.5 py-0.5 rounded text-[#434655]">[</kbd>
          </button>

          {isAdmin ? (
            /* ================= 管理員介面選單 (Admin Portal) ================= */
            <>
              <div className="px-3 pt-2 pb-1 text-[11px] font-bold text-[#737686] uppercase tracking-wider">
                管理員功能 (ADMIN)
              </div>

              {/* 1. 帳號管理 */}
              <button
                onClick={() => onNavigate('account-manage')}
                className={`flex items-center gap-3 px-3 py-2.5 transition-colors rounded text-[14px] cursor-pointer text-left ${activePage === 'account-manage'
                    ? 'bg-[#004ac6] text-white font-semibold shadow-xs'
                    : 'text-[#434655] hover:bg-[#eceef0] hover:text-[#191c1e]'
                  }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">manage_accounts</span>
                <span>帳號管理</span>
              </button>

              {/* 2. 題庫管理 (可折疊學科樹狀選單) */}
              <div className="flex flex-col">
                <button
                  onClick={() => {
                    onNavigate('question-bank');
                    setQuestionBankOpen(!questionBankOpen);
                  }}
                  className={`flex items-center justify-between px-3 py-2.5 transition-colors rounded text-[14px] cursor-pointer ${activePage === 'question-bank'
                      ? 'bg-[#004ac6] text-white font-semibold shadow-xs'
                      : 'text-[#434655] hover:bg-[#eceef0] hover:text-[#191c1e]'
                    }`}
                  type="button"
                >
                  <span className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[20px]">menu_book</span>
                    <span>題庫管理</span>
                  </span>
                  <span className="material-symbols-outlined text-[18px]">
                    {questionBankOpen ? 'expand_less' : 'expand_more'}
                  </span>
                </button>

                {questionBankOpen && (
                  <div className="pl-3 pr-1 py-1.5 flex flex-col gap-1 border-l-2 border-[#c3c6d7]/40 ml-4 my-1">
                    {/* 全部題目 */}
                    <button
                      onClick={() => {
                        onSelectSubject('all');
                        onNavigate('question-bank');
                      }}
                      className={`flex items-center justify-between px-2.5 py-1.5 rounded text-[13px] cursor-pointer transition-colors ${selectedSubject === 'all' && activePage === 'question-bank'
                          ? 'bg-[#004ac6]/10 text-[#004ac6] font-bold'
                          : 'text-[#434655] hover:bg-[#f2f4f6]'
                        }`}
                      type="button"
                    >
                      <span>全部題目</span>
                      <span className="text-[11px] font-mono text-[#737686]">{questions.length}</span>
                    </button>

                    {topLevelCategories.map((topCat) => {
                      const children = getChildCategories(topCat.id);
                      const isExpanded = expandedGroupIds[topCat.id] ?? true;
                      const domainName = DOMAIN_DISPLAY_LABEL[topCat.categories_name] || topCat.categories_name;

                      return (
                        <div key={topCat.id} className="flex flex-col gap-0.5">
                          {children.length > 0 ? (
                            <>
                              <button
                                onClick={() => toggleGroup(topCat.id)}
                                className="flex items-center justify-between px-2 py-1 text-[12px] font-semibold text-[#434655] hover:text-[#191c1e] cursor-pointer"
                                type="button"
                              >
                                <span>{domainName}</span>
                                <span className="material-symbols-outlined text-[16px]">
                                  {isExpanded ? 'expand_less' : 'expand_more'}
                                </span>
                              </button>
                              {isExpanded &&
                                children.map((subCat) => {
                                  const subId = resolveCategorySubjectId(subCat);
                                  if (!subId) return null;
                                  const count = getSubjectCount(subId, subCat.id);
                                  const isSel = selectedSubject === subId && activePage === 'question-bank';
                                  return (
                                    <button
                                      key={subCat.id}
                                      onClick={() => {
                                        onSelectSubject(subId);
                                        onNavigate('question-bank');
                                      }}
                                      className={`flex items-center justify-between pl-4 pr-2 py-1 rounded text-[12px] cursor-pointer transition-colors ${isSel
                                          ? 'bg-[#004ac6] text-white font-bold'
                                          : 'text-[#434655] hover:bg-[#f2f4f6]'
                                        }`}
                                      type="button"
                                    >
                                      <span>{subCat.categories_name}</span>
                                      <span className="text-[10px] font-mono">{count}</span>
                                    </button>
                                  );
                                })}
                            </>
                          ) : (
                            (() => {
                              const subId = resolveCategorySubjectId(topCat);
                              if (!subId) return null;
                              const count = getSubjectCount(subId, topCat.id);
                              const isSel = selectedSubject === subId && activePage === 'question-bank';
                              return (
                                <button
                                  key={topCat.id}
                                  onClick={() => {
                                    onSelectSubject(subId);
                                    onNavigate('question-bank');
                                  }}
                                  className={`flex items-center justify-between px-2.5 py-1 rounded text-[12px] cursor-pointer transition-colors ${isSel
                                      ? 'bg-[#004ac6] text-white font-bold'
                                      : 'text-[#434655] hover:bg-[#f2f4f6]'
                                    }`}
                                  type="button"
                                >
                                  <span>{SUBJECT_DISPLAY_LABEL[subId] || topCat.categories_name}</span>
                                  <span className="text-[10px] font-mono">{count}</span>
                                </button>
                              );
                            })()
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 3. 試卷管理 */}
              <button
                onClick={() => onNavigate('exam-papers')}
                className={`flex items-center gap-3 px-3 py-2.5 transition-colors rounded text-[14px] cursor-pointer text-left ${activePage === 'exam-papers'
                    ? 'bg-[#004ac6] text-white font-semibold shadow-xs'
                    : 'text-[#434655] hover:bg-[#eceef0] hover:text-[#191c1e]'
                  }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">assignment</span>
                <span>試卷管理</span>
              </button>

              {/* 快速新增/匯入試卷按鈕 */}
              <div className="pt-2 flex flex-col gap-1.5">
                <button
                  onClick={onOpenCreateQuestion}
                  className="flex items-center justify-center gap-2 w-full py-2 bg-[#dbe1ff] text-[#004ac6] rounded-xl text-xs font-bold hover:bg-[#b4c5ff] transition-colors cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                  <span>手動新增題目</span>
                </button>

                {onOpenUploadExam && (
                  <button
                    onClick={onOpenUploadExam}
                    className="flex items-center justify-center gap-2 w-full py-2 bg-[#f2f4f6] text-[#191c1e] rounded-xl text-xs font-bold hover:bg-[#e6e8ea] border border-[#c3c6d7]/50 transition-colors cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">upload_file</span>
                    <span>上傳整份試卷</span>
                  </button>
                )}
              </div>

              {/* 系統設定 */}
              <div className="pt-2 border-t border-[#c3c6d7]/30">
                <button
                  onClick={() => onNavigate('system-settings')}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded text-[14px] text-left cursor-pointer transition-colors w-full ${activePage === 'system-settings'
                      ? 'bg-[#004ac6] text-white font-semibold shadow-xs'
                      : 'text-[#434655] hover:bg-[#eceef0] hover:text-[#191c1e]'
                    }`}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">settings</span>
                  <span>系統設定</span>
                </button>
              </div>
            </>
          ) : (
            /* ================= 使用者介面選單 (User Portal) ================= */
            <>
              <div className="px-3 pt-2 pb-1 text-[11px] font-bold text-[#737686] uppercase tracking-wider">
                學習與測驗功能
              </div>

              {/* 1. 試卷選擇頁面 (預設導向) */}
              <button
                onClick={() => onNavigate('user-exam-select')}
                className={`flex items-center gap-3 px-3 py-2.5 transition-colors rounded text-[14px] cursor-pointer text-left ${activePage === 'user-exam-select'
                    ? 'bg-[#004ac6] text-white font-semibold shadow-xs'
                    : 'text-[#434655] hover:bg-[#eceef0] hover:text-[#191c1e]'
                  }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">quiz</span>
                <span>試卷選擇頁面</span>
              </button>

              {/* 2. 題目選擇頁面 */}
              <button
                onClick={() => onNavigate('user-selector')}
                className={`flex items-center gap-3 px-3 py-2.5 transition-colors rounded text-[14px] cursor-pointer text-left ${activePage === 'user-selector'
                    ? 'bg-[#004ac6] text-white font-semibold shadow-xs'
                    : 'text-[#434655] hover:bg-[#eceef0] hover:text-[#191c1e]'
                  }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">checklist</span>
                <span>題目選擇頁面</span>
              </button>

              {/* 3. 錯題匯入頁面 */}
              <button
                onClick={() => onNavigate('user-wrong-questions')}
                className={`flex items-center gap-3 px-3 py-2.5 transition-colors rounded text-[14px] cursor-pointer text-left ${activePage === 'user-wrong-questions'
                    ? 'bg-[#004ac6] text-white font-semibold shadow-xs'
                    : 'text-[#434655] hover:bg-[#eceef0] hover:text-[#191c1e]'
                  }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">analytics</span>
                <span>錯題匯入頁面</span>
              </button>

              {/* 4. 設定 (個人資料) */}
              <div className="pt-2 border-t border-[#c3c6d7]/30">
                <button
                  onClick={() => onNavigate('user-settings')}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded text-[14px] text-left cursor-pointer transition-colors w-full ${activePage === 'user-settings'
                      ? 'bg-[#004ac6] text-white font-semibold shadow-xs'
                      : 'text-[#434655] hover:bg-[#eceef0] hover:text-[#191c1e]'
                    }`}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">person</span>
                  <span>個人資料設定</span>
                </button>
              </div>
            </>
          )}
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
