"use client";

interface Props {
  open: boolean;
  answered: number;
  total: number;
  unansweredNumbers: number[];
  flaggedCount: number;
  onCancel: () => void;
  onConfirm: () => void;
}

export function SubmitDialog({
  open,
  answered,
  total,
  unansweredNumbers,
  flaggedCount,
  onCancel,
  onConfirm,
}: Props) {
  if (!open) return null;

  return (
    <div className="exam-overlay" role="dialog" aria-modal="true" aria-label="交卷確認">
      <div className="exam-card w-full max-w-lg p-6">
        <h2 className="text-xl font-bold">確認交卷？</h2>
        <dl className="mt-4 grid grid-cols-2 gap-3 border-y border-[#d5dce4] py-4 text-sm">
          <div>
            <dt className="text-xs text-[#5b6673]">已作答</dt>
            <dd className="text-lg font-bold">{answered} / {total} 題</dd>
          </div>
          <div>
            <dt className="text-xs text-[#5b6673]">已標註</dt>
            <dd className="text-lg font-bold">{flaggedCount} 題</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-xs text-[#5b6673]">未作答題號</dt>
            <dd className="mt-1">{unansweredNumbers.length > 0 ? unansweredNumbers.join("、") : "無"}</dd>
          </div>
        </dl>
        <p className="mt-3 text-xs text-[#5b6673]">交卷後將無法修改答案。</p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button type="button" onClick={onCancel} className="exam-btn py-2 sm:px-6">
            繼續作答
          </button>
          <button type="button" onClick={onConfirm} className="exam-btn exam-btn-primary py-2 sm:px-6">
            確認交卷
          </button>
        </div>
      </div>
    </div>
  );
}
