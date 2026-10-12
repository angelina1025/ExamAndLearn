import React from 'react';
import { X, BookOpen, ExternalLink, CheckCircle } from 'lucide-react';

interface ComplexityCheatsheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ComplexityCheatsheetModal: React.FC<ComplexityCheatsheetModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-700">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base">
                二元樹與常見資料結構時間複雜度速查表
              </h3>
              <p className="text-xs text-slate-500">
                附錄參考資料 · 漸進符號定義與樹高嚴格數學推導依據
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

        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6 text-sm">
          {/* Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 font-semibold border-b border-slate-200">
                  <th className="p-3">資料結構類型</th>
                  <th className="p-3">查找 (Average)</th>
                  <th className="p-3">查找 (Worst)</th>
                  <th className="p-3">插入 / 刪除</th>
                  <th className="p-3">空間複雜度</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-medium text-slate-900">二元搜尋樹 (BST)</td>
                  <td className="p-3 text-emerald-600 font-mono">O(log n)</td>
                  <td className="p-3 text-rose-600 font-mono font-semibold">O(n) 斜曲樹</td>
                  <td className="p-3 font-mono">O(log n) ~ O(n)</td>
                  <td className="p-3 font-mono">O(n)</td>
                </tr>
                <tr className="bg-blue-50/40 hover:bg-blue-50/70 border-l-4 border-l-blue-600">
                  <td className="p-3 font-semibold text-blue-900">
                    AVL 自平衡樹 ★
                  </td>
                  <td className="p-3 text-emerald-600 font-mono font-bold">O(log n)</td>
                  <td className="p-3 text-emerald-600 font-mono font-bold">O(log n) 嚴格</td>
                  <td className="p-3 font-mono font-bold text-blue-700">O(log n)</td>
                  <td className="p-3 font-mono">O(n)</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-medium text-slate-900">紅黑樹 (Red-Black)</td>
                  <td className="p-3 text-emerald-600 font-mono">O(log n)</td>
                  <td className="p-3 text-emerald-600 font-mono">O(log n) ≤ 2 log(n+1)</td>
                  <td className="p-3 font-mono">O(log n)</td>
                  <td className="p-3 font-mono">O(n)</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-medium text-slate-900">最小二元堆積 (Min-Heap)</td>
                  <td className="p-3 text-slate-600 font-mono">最小值 O(1)</td>
                  <td className="p-3 text-rose-600 font-mono font-semibold">最大值 O(n)</td>
                  <td className="p-3 font-mono">O(log n)</td>
                  <td className="p-3 font-mono">O(n)</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Theoretical notes */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs text-slate-700 space-y-2">
            <div className="font-semibold text-slate-900 flex items-center space-x-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>AVL 樹高數學推導摘要 (Adelson-Velsky and Landis)</span>
            </div>
            <p className="leading-relaxed text-slate-600">
              若 <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">N(h)</code> 表示高度為 <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">h</code> 的 AVL 樹所需之最少節點數，則遞迴滿足：
              <br />
              <code className="text-blue-700 font-mono font-semibold block my-1">
                N(h) = N(h-1) + N(h-2) + 1 （類似費氏數列 Fibonacci）
              </code>
              解此差分方程式可得樹高上界：
              <code className="text-slate-900 font-mono font-semibold block my-1">
                h &lt; 1.4404 · log₂(n + 2) - 0.328
              </code>
              故 Worst-case 查找次數仍嚴格受制於 <span className="font-bold text-blue-700">O(log n)</span>。
            </p>
          </div>
        </div>

        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition"
          >
            已閱讀並關閉附錄
          </button>
        </div>
      </div>
    </div>
  );
};
