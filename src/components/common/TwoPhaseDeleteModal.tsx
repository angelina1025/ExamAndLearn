import React, { useState, useEffect, useRef } from 'react';

export interface DeleteItem {
  id: string;
  title: string;
  extraInfo?: string;
}

interface TwoPhaseDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmSuccess: () => void;
  items: DeleteItem[];
  itemTypeLabel?: string; // '試卷' or '題目'
}

export const TwoPhaseDeleteModal: React.FC<TwoPhaseDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirmSuccess,
  items,
  itemTypeLabel = '試卷',
}) => {
  const [phase, setPhase] = useState<'confirm' | 'success'>('confirm');
  const [inputValue, setInputValue] = useState('');
  const [auditId, setAuditId] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const successBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPhase('confirm');
      setInputValue('');
      setAuditId(`#LOG-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 60);
    }
  }, [isOpen]);

  useEffect(() => {
    if (phase === 'success') {
      setTimeout(() => {
        successBtnRef.current?.focus();
      }, 60);
    }
  }, [phase]);

  // Handle ESC and Enter
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'Enter') {
        if (phase === 'confirm') {
          if (inputValue.trim().toUpperCase() === 'DELETE') {
            setPhase('success');
          }
        } else if (phase === 'success') {
          handleFinish();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, phase, inputValue]);

  if (!isOpen) return null;

  const isMatched = inputValue.trim().toUpperCase() === 'DELETE';

  const handleFinish = () => {
    onConfirmSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={phase === 'confirm' ? onClose : undefined}
      ></div>

      {phase === 'confirm' ? (
        /* Phase 1: Danger Confirmation Modal */
        <div className="relative bg-white w-full max-w-xl rounded-xl shadow-2xl overflow-hidden flex flex-col z-10 animate-in fade-in zoom-in-95 duration-200 border border-[#c3c6d7]/30">
          {/* Header Warning */}
          <div className="bg-[#ffdad6]/30 px-6 py-4 flex items-start gap-4 border-b border-[#ffdad6]">
            <div className="w-12 h-12 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[28px]">warning</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h2 className="text-[20px] leading-[28px] text-[#93000a] font-bold">
                  確定要刪除選取的 {items.length} 份{itemTypeLabel}嗎？
                </h2>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-[#93000a]/70 hover:text-[#93000a] p-1 rounded cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>
              <p className="text-[13px] text-[#ba1a1a] font-medium mt-1">
                警告：已產生的測驗記錄與學生作答歷程可能受影響，此動作一旦確認將無法還原！
              </p>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 flex flex-col gap-4">
            {/* Selected Items Scrollable List */}
            <div>
              <label className="block text-[12px] text-[#434655] font-semibold mb-1">
                已選取的受影響{itemTypeLabel}清單 ({items.length} 份)：
              </label>
              <div className="max-h-40 overflow-y-auto bg-[#f2f4f6] rounded p-2 flex flex-col gap-1.5 border border-[#c3c6d7]/30">
                {items.map((it) => (
                  <div
                    key={it.id}
                    className="flex items-center justify-between p-2 bg-white rounded shadow-2xs border border-[#eceef0]"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="material-symbols-outlined text-[#ba1a1a] text-[18px]">
                        description
                      </span>
                      <div className="truncate">
                        <span className="font-mono text-[12px] text-[#004ac6] font-semibold">
                          [{it.id}]
                        </span>
                        <span className="text-[13px] text-[#191c1e] ml-2 font-medium">
                          {it.title}
                        </span>
                      </div>
                    </div>
                    {it.extraInfo && (
                      <span className="text-[11px] bg-[#ffdad6] text-[#93000a] px-2 py-0.5 rounded shrink-0 font-medium">
                        {it.extraInfo}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Safety Confirmation Input Block */}
            <div className="bg-[#eceef0] p-4 rounded flex flex-col gap-2 border border-[#c3c6d7]/40">
              <label
                className="text-[13px] text-[#191c1e] font-medium"
                htmlFor="deleteConfirmInput"
              >
                為避免誤觸高風險操作，請在下方輸入框輸入{' '}
                <span className="font-mono text-[12px] text-[#ba1a1a] bg-white px-1.5 py-0.5 rounded select-all font-bold border border-[#ffdad6]">
                  DELETE
                </span>{' '}
                以確認刪除：
              </label>
              <div className="relative">
                <input
                  ref={inputRef}
                  id="deleteConfirmInput"
                  type="text"
                  autoComplete="off"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="請輸入 DELETE"
                  className="w-full bg-white px-3 py-2 rounded font-mono text-[13px] text-[#191c1e] uppercase placeholder:normal-case placeholder:text-[#434655]/60 focus:outline-none focus:ring-2 focus:ring-[#ba1a1a] border border-[#c3c6d7] transition-all"
                />
                {isMatched && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#006242] flex items-center">
                    <span className="material-symbols-outlined text-[20px]">check_circle</span>
                  </div>
                )}
              </div>
              <span
                className={`text-[11px] font-medium transition-colors ${
                  isMatched ? 'text-[#006242]' : 'text-[#434655]'
                }`}
              >
                {isMatched
                  ? '✓ 驗證成功，可點擊確認刪除'
                  : '請輸入完全相符的文字以解鎖刪除按鈕'}
              </span>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="bg-[#f2f4f6] px-6 py-3.5 flex items-center justify-end gap-3 border-t border-[#c3c6d7]/30">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white text-[#191c1e] rounded hover:bg-[#eceef0] transition-colors text-[13px] font-medium border border-[#c3c6d7]/40 cursor-pointer"
            >
              取消
            </button>
            <button
              type="button"
              disabled={!isMatched}
              onClick={() => setPhase('success')}
              className={`px-5 py-2 bg-[#ba1a1a] text-white rounded font-semibold text-[14px] flex items-center gap-1.5 shadow-sm transition-all cursor-pointer ${
                isMatched
                  ? 'hover:bg-[#93000a] active:scale-95'
                  : 'opacity-40 cursor-not-allowed'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">delete_forever</span>
              <span>確認刪除 (Confirm)</span>
            </button>
          </div>
        </div>
      ) : (
        /* Phase 2: Deletion Success Modal */
        <div className="relative bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden p-6 flex flex-col items-center text-center z-10 animate-in fade-in zoom-in-95 duration-200 border border-[#c3c6d7]/30">
          {/* Success Icon */}
          <div className="w-16 h-16 rounded-full bg-[#6ffbbe] text-[#006242] flex items-center justify-center mb-3">
            <span
              className="material-symbols-outlined text-[36px]"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              check_circle
            </span>
          </div>

          <h3 className="text-[20px] text-[#191c1e] font-bold tracking-tight">
            {itemTypeLabel}已成功刪除
          </h3>
          <p className="text-[13px] text-[#434655] mt-1 mb-4">
            系統已將所選之 {items.length} 份{itemTypeLabel}移出發布池，相關歷史資料已登錄審計日誌。
          </p>

          {/* Audit Detail Box */}
          <div className="w-full bg-[#f2f4f6] rounded p-3 text-left text-[13px] flex flex-col gap-2 mb-5 border border-[#c3c6d7]/30">
            <div className="flex justify-between items-center text-[#434655] text-[12px]">
              <span>異動編號 (Audit ID):</span>
              <span className="font-mono text-[#191c1e] font-semibold">{auditId}</span>
            </div>
            <div className="flex justify-between items-center text-[#434655] text-[12px]">
              <span>已移除{itemTypeLabel}編號:</span>
              <span className="font-mono text-[#ba1a1a] font-semibold truncate max-w-[200px]" title={items.map((i) => i.id).join(', ')}>
                {items.map((i) => i.id).join(', ')}
              </span>
            </div>
            <div className="flex justify-between items-center text-[#434655] text-[12px]">
              <span>執行管理者:</span>
              <span className="text-[#191c1e] font-medium">王敏行 (Admin Wang)</span>
            </div>
          </div>

          {/* Action button */}
          <button
            ref={successBtnRef}
            type="button"
            onClick={handleFinish}
            className="w-full py-2.5 bg-[#004ac6] text-white rounded font-semibold text-[14px] hover:bg-[#2563eb] focus:outline-none focus:ring-4 focus:ring-[#004ac6]/30 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            <span>確認 (Enter)</span>
            <kbd className="font-mono text-[11px] bg-white/20 px-1.5 py-0.5 rounded text-white">
              ↵
            </kbd>
          </button>
        </div>
      )}
    </div>
  );
};
