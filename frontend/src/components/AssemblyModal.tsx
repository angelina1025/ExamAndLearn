import React from 'react';
import { X, Printer, FileText, CheckCircle, Clock, BookOpen } from 'lucide-react';

interface AssemblyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartExam: () => void;
}

export const AssemblyModal: React.FC<AssemblyModalProps> = ({
  isOpen,
  onClose,
  onStartExam,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base">
                113 學年度演算法期末考 A 卷 · 試卷排版預覽
              </h3>
              <p className="text-xs text-slate-500">
                目前組卷進度：4 / 30 題 · 合計 8.5 分 · 預估作答時間 45 分鐘
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-5 text-xs text-slate-700">
          <div className="bg-blue-50/60 border border-blue-200/70 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-blue-600" />
              <div>
                <span className="font-bold text-blue-900">組卷規範符合性檢查通過</span>
                <p className="text-blue-700/80 text-[11px]">
                  基礎 28% · 中等 52% · 困難 20% 符合教學評量高斯常態分佈。
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 bg-emerald-600 text-white font-bold rounded-lg text-[11px]">
              審查通過 (Verified)
            </span>
          </div>

          {/* Test Paper Layout Preview */}
          <div className="border border-slate-200 rounded-xl p-6 bg-white space-y-6 shadow-xs font-serif">
            <div className="text-center space-y-1 pb-4 border-b border-slate-200">
              <h2 className="text-base font-bold tracking-wider text-slate-900 font-sans">
                國立大學 資訊工程學系 113 學年度第一學期
              </h2>
              <h1 className="text-lg font-black text-slate-900 font-sans">
                「演算法設計與複雜度分析」期末總評量試卷 (A 卷)
              </h1>
              <div className="flex justify-center space-x-6 text-[11px] text-slate-500 font-sans pt-1">
                <span>考試時間：45 分鐘</span>
                <span>滿分：100 分 (現階段預選 8.5 分)</span>
                <span>命題委員：陳維倫 講座教授</span>
              </div>
            </div>

            {/* Questions preview */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="font-bold text-slate-900 font-sans">
                  第 1 題 (單選題，2 分) 【QS-0842】
                </div>
                <p className="font-sans text-slate-800 leading-relaxed">
                  請說明 Lomuto 與 Hoare 劃分法 (Partition Scheme) 在快速排序中的交換次數與指針移動特性，並論述何者於包含大量相同鍵值元素時表現更優？
                </p>
                <div className="grid grid-cols-2 gap-2 text-slate-600 font-sans pl-2 pt-1">
                  <div>(A) Lomuto 單向指標遍歷，交換次數極少</div>
                  <div>(B) Hoare 雙向相向指針，平均交換次數僅約為 Lomuto 的三分之一</div>
                  <div>(C) 兩者在相同元素聚集時退化時間相同</div>
                  <div>(D) Lomuto 具備完全穩定排序特性</div>
                </div>
              </div>

              <div className="space-y-1.5 pt-3 border-t border-slate-100">
                <div className="font-bold text-slate-900 font-sans">
                  第 2 題 (單選題，1 分) 【QS-0841】
                </div>
                <p className="font-sans text-slate-800 leading-relaxed">
                  下列何種排序演算法在遭遇相同鍵值 (Equal Keys) 之元素時，能具備嚴格的穩定性保證？
                </p>
                <div className="grid grid-cols-2 gap-2 text-slate-600 font-sans pl-2 pt-1">
                  <div>(A) 快速排序 (QuickSort)</div>
                  <div>(B) 堆積排序 (HeapSort)</div>
                  <div>(C) 合併排序 (MergeSort)</div>
                  <div>(D) 選擇排序 (SelectionSort)</div>
                </div>
              </div>

              <div className="space-y-1.5 pt-3 border-t border-slate-100">
                <div className="font-bold text-slate-900 font-sans">
                  第 3 題 (是非題，3 分) 【QS-0839】
                </div>
                <p className="font-sans text-slate-800 leading-relaxed">
                  基數排序 (Radix Sort) 是否在不經任何浮點數位元轉換之情況下，仍直接適用於 IEEE-754 浮點數表示法？
                </p>
              </div>

              <div className="space-y-1.5 pt-3 border-t border-slate-100">
                <div className="font-bold text-slate-900 font-sans">
                  第 4 題 (多選題，2.5 分) 【QS-0835】
                </div>
                <p className="font-sans text-slate-800 leading-relaxed">
                  關於二元搜尋演算法 (Binary Search) 在已排序陣列中的運用，下列敘述哪些為真？
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-xl text-xs font-semibold flex items-center space-x-1.5"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>匯出試卷並列印</span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-100 rounded-xl text-xs font-semibold"
            >
              關閉預覽
            </button>
            <button
              onClick={() => {
                onClose();
                onStartExam();
              }}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition"
            >
              發布並開啟線上考試
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
