'use client';

import React, { useState } from 'react';

export interface ConflictDetails {
  type: 'personal' | 'public';
  title: string;
  localSummary: {
    questionCount: number;
    examCount: number;
    updatedAt?: string;
  };
  remoteSummary: {
    questionCount: number;
    examCount: number;
    updatedAt?: string;
  };
}

export interface SyncConflictModalProps {
  isOpen: boolean;
  conflict: ConflictDetails | null;
  onClose: () => void;
  /**
   * 當衝突為 personal 時：
   * choice: 'local' (以本地為主) | 'remote' (以線上為主)
   * updateTarget: boolean (是否確認更新對應端)
   */
  onResolvePersonalConflict?: (choice: 'local' | 'remote', updateTarget: boolean) => void;
  /**
   * 當衝突為 public 時：
   * shouldUpdateLocal: boolean (是否更新本地公用題庫)
   */
  onResolvePublicConflict?: (shouldUpdateLocal: boolean) => void;
  isProcessing?: boolean;
}

export const SyncConflictModal: React.FC<SyncConflictModalProps> = ({
  isOpen,
  conflict,
  onClose,
  onResolvePersonalConflict,
  onResolvePublicConflict,
  isProcessing = false,
}) => {
  const [selectedBase, setSelectedBase] = useState<'local' | 'remote' | null>(null);
  const [confirmUpdate, setConfirmUpdate] = useState<boolean>(true);

  if (!isOpen || !conflict) return null;

  const isPersonal = conflict.type === 'personal';

  const handlePersonalSubmit = () => {
    if (!selectedBase) return;
    onResolvePersonalConflict?.(selectedBase, confirmUpdate);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-gray-100 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[20px]">
                {isPersonal ? 'compare_arrows' : 'update'}
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">{conflict.title}</h3>
              <p className="text-xs text-gray-500">
                {isPersonal ? '雙向資料比對發現差異' : '線上題庫版本比對'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-4">
          {/* Comparison Cards */}
          <div className="grid grid-cols-2 gap-3">
            {/* 本地資料卡片 */}
            <div
              className={`p-3.5 rounded-xl border transition-all ${
                isPersonal && selectedBase === 'local'
                  ? 'border-blue-500 bg-blue-50/40 shadow-xs'
                  : 'border-gray-200 bg-gray-50/60'
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800">
                <span className="material-symbols-outlined text-[16px] text-gray-600">laptop</span>
                <span>本地資料庫</span>
              </div>
              <div className="mt-2 text-xs text-gray-600 space-y-1">
                <p>試題數：<span className="font-semibold text-gray-900">{conflict.localSummary.questionCount}</span> 題</p>
                <p>試卷數：<span className="font-semibold text-gray-900">{conflict.localSummary.examCount}</span> 份</p>
              </div>
            </div>

            {/* 線上資料卡片 */}
            <div
              className={`p-3.5 rounded-xl border transition-all ${
                isPersonal && selectedBase === 'remote'
                  ? 'border-blue-500 bg-blue-50/40 shadow-xs'
                  : 'border-gray-200 bg-gray-50/60'
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800">
                <span className="material-symbols-outlined text-[16px] text-[#0f9d58]">cloud</span>
                <span>線上 Google Sheet</span>
              </div>
              <div className="mt-2 text-xs text-gray-600 space-y-1">
                <p>試題數：<span className="font-semibold text-gray-900">{conflict.remoteSummary.questionCount}</span> 題</p>
                <p>試卷數：<span className="font-semibold text-gray-900">{conflict.remoteSummary.examCount}</span> 份</p>
              </div>
            </div>
          </div>

          {/* 情境 1: 個人題庫衝突 (需二選一並確認是否更新) */}
          {isPersonal ? (
            <div className="flex flex-col gap-3">
              <p className="text-xs font-medium text-gray-700">
                本地個人題庫與線上個人 Google Sheet 資料不一致，請選擇以何者為主：
              </p>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setSelectedBase('local')}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    selectedBase === 'local'
                      ? 'border-blue-600 bg-blue-600 text-white font-bold shadow-xs'
                      : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-800 font-semibold text-xs'
                  }`}
                >
                  <div className="text-xs">以本地為主</div>
                  <div className={`text-[11px] mt-0.5 ${selectedBase === 'local' ? 'text-blue-100' : 'text-gray-500'}`}>
                    保留本地自訂試題與考卷
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedBase('remote')}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    selectedBase === 'remote'
                      ? 'border-blue-600 bg-blue-600 text-white font-bold shadow-xs'
                      : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-800 font-semibold text-xs'
                  }`}
                >
                  <div className="text-xs">以線上為主</div>
                  <div className={`text-[11px] mt-0.5 ${selectedBase === 'remote' ? 'text-blue-100' : 'text-gray-500'}`}>
                    以個人雲端試算表為準
                  </div>
                </button>
              </div>

              {selectedBase && (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                  <span className="material-symbols-outlined text-amber-600 text-[18px] shrink-0 mt-0.5">
                    help
                  </span>
                  <div className="flex-1">
                    <p className="font-bold">
                      {selectedBase === 'local'
                        ? '是否將本地個人題庫同步更新至線上 Google Sheet？'
                        : '是否從線上個人 Google Sheet 更新覆蓋本地檔案？'}
                    </p>
                    <label className="inline-flex items-center gap-2 mt-2 cursor-pointer font-medium">
                      <input
                        type="checkbox"
                        checked={confirmUpdate}
                        onChange={(e) => setConfirmUpdate(e.target.checked)}
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span>
                        {selectedBase === 'local'
                          ? '確認立即覆蓋更新線上個人試算表'
                          : '確認立即覆蓋更新本地題庫資料'}
                      </span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* 情境 2: 公用題庫比對 (詢問是否更新本地公用題庫) */
            <div className="flex flex-col gap-2 p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-900">
              <div className="flex items-center gap-2 font-bold">
                <span className="material-symbols-outlined text-[18px] text-blue-600">info</span>
                <span>線上公用題庫已有新版本，是否更新本地唯讀公用題庫？</span>
              </div>
              <p className="text-blue-700 leading-relaxed">
                更新後將使本機公用試題與試卷與線上同步（公用題庫在離線時仍維持唯讀狀態）。
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-gray-100 bg-gray-50 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            取消
          </button>

          {isPersonal ? (
            <button
              type="button"
              onClick={handlePersonalSubmit}
              disabled={!selectedBase || isProcessing}
              className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors cursor-pointer disabled:opacity-50 inline-flex items-center gap-1.5"
            >
              {isProcessing && <span className="material-symbols-outlined text-[14px] animate-spin">progress_activity</span>}
              <span>確認同步決策</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onResolvePublicConflict?.(false)}
                disabled={isProcessing}
                className="px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
              >
                稍後更新
              </button>
              <button
                type="button"
                onClick={() => onResolvePublicConflict?.(true)}
                disabled={isProcessing}
                className="px-4 py-2 text-xs font-bold text-white bg-[#0f9d58] hover:bg-[#0b8043] rounded-lg shadow-xs transition-colors cursor-pointer inline-flex items-center gap-1.5"
              >
                {isProcessing && <span className="material-symbols-outlined text-[14px] animate-spin">progress_activity</span>}
                <span>立即更新本地公用題庫</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

