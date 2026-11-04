import React, { useState, useEffect } from 'react';
import { ColumnVisibilityState } from '@/types';

interface ColumnVisibilityMenuProps {
  isOpen: boolean;
  onClose: () => void;
  columns: ColumnVisibilityState;
  onChange: (columns: ColumnVisibilityState) => void;
}

export const ColumnVisibilityMenu: React.FC<ColumnVisibilityMenuProps> = ({
  isOpen,
  onClose,
  columns,
  onChange,
}) => {
  // Local draft state so changes are applied upon clicking "完成套用"
  const [draftColumns, setDraftColumns] = useState<ColumnVisibilityState>(columns);
  const [showEmptyAlert, setShowEmptyAlert] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setDraftColumns(columns);
      setShowEmptyAlert(false);
    }
  }, [isOpen, columns]);

  if (!isOpen) return null;

  const total = Object.keys(draftColumns).length;
  const visibleCount = Object.values(draftColumns).filter(Boolean).length;
  const isAllSelected = visibleCount === total;
  const isNoneSelected = visibleCount === 0;

  const toggleColumn = (key: keyof ColumnVisibilityState) => {
    setDraftColumns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // "這個取消勾選會呈現清空勾選的效果"
  // If all are selected, uncheck all (清空勾選); otherwise select all
  const handleToggleSelectAll = () => {
    if (isAllSelected) {
      // Clear all
      setDraftColumns({
        id: false,
        content: false,
        difficulty: false,
        points: false,
        tags: false,
        updatedAt: false,
        actions: false,
      });
    } else {
      // Select all
      setDraftColumns({
        id: true,
        content: true,
        difficulty: true,
        points: true,
        tags: true,
        updatedAt: true,
        actions: true,
      });
    }
  };

  const resetDefault = () => {
    setDraftColumns({
      id: true,
      content: true,
      difficulty: true,
      points: true,
      tags: true,
      updatedAt: true,
      actions: true,
    });
  };

  // "按完成套用按鈕會檢查欄位設定最少要勾選一個選項，若沒有的話會跳彈窗提醒。"
  const handleApply = () => {
    if (visibleCount === 0) {
      setShowEmptyAlert(true);
      return;
    }
    onChange(draftColumns);
    onClose();
  };

  return (
    <>
      {/* Click-outside backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      <div className="absolute right-0 top-full mt-1.5 w-64 bg-white rounded-xl shadow-xl z-50 p-3 flex flex-col gap-2 border border-[#c3c6d7]/40 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#c3c6d7]/30">
          <div className="flex items-center gap-1.5">
            <span className="text-[14px] text-[#191c1e] font-semibold">表格欄位設定</span>
            <span
              className={`text-[11px] font-medium font-mono ${
                visibleCount === 0 ? 'text-[#ba1a1a] font-bold' : 'text-[#434655]'
              }`}
            >
              已顯示 {visibleCount}/{total}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#434655] hover:text-[#191c1e] p-1 rounded transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Column List */}
        <div className="flex flex-col gap-1 max-h-64 overflow-y-auto">
          {/* Select all toggle: 取消勾選會呈現清空勾選的效果 */}
          <div className="flex items-center justify-between p-1.5 rounded hover:bg-[#f2f4f6] cursor-pointer border-b border-[#c3c6d7]/20 pb-1.5">
            <button
              type="button"
              onClick={handleToggleSelectAll}
              className="flex items-center gap-2 text-[13px] text-[#191c1e] font-medium text-left cursor-pointer w-full select-none"
            >
              <span className="material-symbols-outlined text-[18px] text-[#004ac6]">
                {isAllSelected
                  ? 'check_box'
                  : isNoneSelected
                  ? 'check_box_outline_blank'
                  : 'indeterminate_check_box'}
              </span>
              <span>全選所有欄位</span>
              {isAllSelected && (
                <span className="text-[11px] text-[#434655]/70 ml-auto font-normal">
                  (點擊清空)
                </span>
              )}
            </button>
          </div>

          {/* 題目 ID */}
          <label
            onClick={() => toggleColumn('id')}
            className="flex items-center justify-between p-1.5 rounded hover:bg-[#f2f4f6] cursor-pointer select-none"
          >
            <span className="flex items-center gap-2 text-[13px] text-[#191c1e]">
              <span
                className={`material-symbols-outlined text-[18px] ${
                  draftColumns.id ? 'text-[#004ac6]' : 'text-[#737686]'
                }`}
              >
                {draftColumns.id ? 'check_box' : 'check_box_outline_blank'}
              </span>
              <span>題目 ID</span>
            </span>
          </label>

          {/* 題目內容摘要 */}
          <label
            onClick={() => toggleColumn('content')}
            className="flex items-center justify-between p-1.5 rounded hover:bg-[#f2f4f6] cursor-pointer select-none"
          >
            <span className="flex items-center gap-2 text-[13px] text-[#191c1e]">
              <span
                className={`material-symbols-outlined text-[18px] ${
                  draftColumns.content ? 'text-[#004ac6]' : 'text-[#737686]'
                }`}
              >
                {draftColumns.content ? 'check_box' : 'check_box_outline_blank'}
              </span>
              <span>題目內容摘要</span>
            </span>
          </label>

          {/* 難易度 */}
          <label
            onClick={() => toggleColumn('difficulty')}
            className="flex items-center justify-between p-1.5 rounded hover:bg-[#f2f4f6] cursor-pointer select-none"
          >
            <span className="flex items-center gap-2 text-[13px] text-[#191c1e]">
              <span
                className={`material-symbols-outlined text-[18px] ${
                  draftColumns.difficulty ? 'text-[#004ac6]' : 'text-[#737686]'
                }`}
              >
                {draftColumns.difficulty ? 'check_box' : 'check_box_outline_blank'}
              </span>
              <span>難易度</span>
            </span>
          </label>

          {/* 配分 */}
          <label
            onClick={() => toggleColumn('points')}
            className="flex items-center justify-between p-1.5 rounded hover:bg-[#f2f4f6] cursor-pointer select-none"
          >
            <span className="flex items-center gap-2 text-[13px] text-[#191c1e]">
              <span
                className={`material-symbols-outlined text-[18px] ${
                  draftColumns.points ? 'text-[#004ac6]' : 'text-[#737686]'
                }`}
              >
                {draftColumns.points ? 'check_box' : 'check_box_outline_blank'}
              </span>
              <span>配分</span>
            </span>
          </label>

          {/* 知識點標籤 */}
          <label
            onClick={() => toggleColumn('tags')}
            className="flex items-center justify-between p-1.5 rounded hover:bg-[#f2f4f6] cursor-pointer select-none"
          >
            <span className="flex items-center gap-2 text-[13px] text-[#191c1e]">
              <span
                className={`material-symbols-outlined text-[18px] ${
                  draftColumns.tags ? 'text-[#004ac6]' : 'text-[#737686]'
                }`}
              >
                {draftColumns.tags ? 'check_box' : 'check_box_outline_blank'}
              </span>
              <span>知識點標籤</span>
            </span>
          </label>

          {/* 建立 / 更新時間 */}
          <label
            onClick={() => toggleColumn('updatedAt')}
            className="flex items-center justify-between p-1.5 rounded hover:bg-[#f2f4f6] cursor-pointer select-none"
          >
            <span className="flex items-center gap-2 text-[13px] text-[#191c1e]">
              <span
                className={`material-symbols-outlined text-[18px] ${
                  draftColumns.updatedAt ? 'text-[#004ac6]' : 'text-[#737686]'
                }`}
              >
                {draftColumns.updatedAt ? 'check_box' : 'check_box_outline_blank'}
              </span>
              <span>建立 / 更新時間</span>
            </span>
          </label>

          {/* 操作 */}
          <label
            onClick={() => toggleColumn('actions')}
            className="flex items-center justify-between p-1.5 rounded hover:bg-[#f2f4f6] cursor-pointer select-none"
          >
            <span className="flex items-center gap-2 text-[13px] text-[#191c1e]">
              <span
                className={`material-symbols-outlined text-[18px] ${
                  draftColumns.actions ? 'text-[#004ac6]' : 'text-[#737686]'
                }`}
              >
                {draftColumns.actions ? 'check_box' : 'check_box_outline_blank'}
              </span>
              <span>操作欄</span>
            </span>
          </label>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-[#c3c6d7]/30 flex items-center justify-between text-[#434655] text-[12px]">
          <button
            type="button"
            onClick={resetDefault}
            className="text-[#434655] hover:text-[#191c1e] px-1 py-1 rounded transition-colors cursor-pointer"
          >
            重設預設
          </button>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={onClose}
              className="px-2 py-1 rounded hover:bg-[#eceef0] text-[#191c1e] transition-colors cursor-pointer"
            >
              取消
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="bg-[#004ac6] text-white px-3 py-1 rounded font-medium shadow-xs hover:bg-[#2563eb] transition-colors cursor-pointer"
            >
              完成套用
            </button>
          </div>
        </div>
      </div>

      {/* 檢查至少勾選一個選項的警告彈窗 */}
      {showEmptyAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setShowEmptyAlert(false)}
          ></div>
          <div className="relative bg-white rounded-xl max-w-sm w-full shadow-2xl p-6 flex flex-col items-center text-center gap-3 z-10 animate-in fade-in zoom-in-95 duration-150 border border-[#c3c6d7]/30">
            {/* Warning icon */}
            <div className="w-12 h-12 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[28px]">warning</span>
            </div>

            <h3 className="text-[17px] font-bold text-[#191c1e]">
              欄位設定提示
            </h3>

            <p className="text-[13px] text-[#434655] leading-relaxed">
              表格欄位設定<strong className="text-[#ba1a1a]">最少要勾選一個選項</strong>！目前未勾選任何欄位，請至少選擇一項欄位顯示後再進行套用。
            </p>

            <button
              type="button"
              autoFocus
              onClick={() => setShowEmptyAlert(false)}
              className="mt-2 w-full py-2 bg-[#004ac6] hover:bg-[#2563eb] text-white rounded-lg text-[13px] font-semibold transition-colors cursor-pointer shadow-sm"
            >
              我知道了 (確認)
            </button>
          </div>
        </div>
      )}
    </>
  );
};
