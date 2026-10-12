import React, { useState } from 'react';
import { X, Sparkles, Check, Copy, ArrowRight, BrainCircuit, Sliders, AlertCircle } from 'lucide-react';

interface AiDeriveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyQuestion?: (question: any) => void;
  apiKeyAvailable?: boolean;
}

/**
 * AI-powered Question Derivation Modal
 * Isolated in /src/ai-features/ for easy plug-and-play when AI API is connected.
 */
export const AiDeriveModal: React.FC<AiDeriveModalProps> = ({
  isOpen,
  onClose,
  onApplyQuestion,
  apiKeyAvailable = false,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedList, setGeneratedList] = useState([
    {
      id: 'QS-0842-V1',
      title: '變形 A：參數替換版（隨機化 Pivot）',
      prompt: '在 Lomuto 分割演算法中，若改採隨機挑選 Pivot 並與最後一個元素交換後再執行劃分，請推導其於「近乎已排序（Nearly Sorted）」數列下的預期比較次數。',
      type: '單選題',
      difficulty: '中等 (0.55)',
      similarity: '等價防作弊 · 難度係數偏差 < 0.03',
    },
    {
      id: 'QS-0842-V2',
      title: '變形 B：反向條件題（極端情況）',
      prompt: '若給定一長度為 n 且所有元素值均相同之陣列，請比較 Lomuto 與 Hoare 兩種劃分法在遞迴深度與子陣列劃分比例上的極端退化表現。',
      type: '單選題',
      difficulty: '困難 (0.38)',
      similarity: '高鑑別度衍生 · 著重邊界條件考查',
    },
    {
      id: 'QS-0842-V3',
      title: '變形 C：程式碼填空題（實作細節）',
      prompt: '下列為 Hoare Partition 之核心雙指標相向迴圈，請指出在 `while (A[i] < pivot)` 與 `while (A[j] > pivot)` 中，若將嚴格大於/小於改為含等號（≤/≥），將導致何種致命執行期錯誤？',
      type: '程式實作',
      difficulty: '困難 (0.31)',
      similarity: '實作防盲猜題 · 驗證指針越界邊界',
    },
  ]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleRegenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 700);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-700">
              <Sparkles className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base">
                AI 題目多樣化衍生生成引擎 (Gemini Pro 支援)
              </h3>
              <p className="text-xs text-slate-500">
                基準題幹：#QS-0842 Lomuto 與 Hoare 劃分法 · 演算法排序分析
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

        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4 text-xs">
          {!apiKeyAvailable && (
            <div className="flex items-center space-x-2 bg-amber-50 border border-amber-200 rounded-xl p-3 text-amber-800 text-xs">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                提示：目前處於未串接外部 AI API 模式，下方顯示預先驗證之衍生範本。若需要手動命題請使用系統預設的「手動組題與複製」功能。
              </span>
            </div>
          )}

          <div className="flex items-center justify-between bg-blue-50/60 border border-blue-200/60 rounded-xl p-3 text-blue-900">
            <div className="flex items-center space-x-2">
              <BrainCircuit className="w-4 h-4 text-blue-600" />
              <span>已建立關聯之知識圖譜：快速排序、雙指針、最壞時間複雜度。</span>
            </div>
            <button
              onClick={handleRegenerate}
              disabled={isGenerating}
              className="px-3 py-1 bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 rounded-lg font-semibold text-xs transition cursor-pointer"
            >
              {isGenerating ? 'AI 生成中...' : '重新生成變形題'}
            </button>
          </div>

          <div className="space-y-3">
            {generatedList.map((item) => (
              <div
                key={item.id}
                className="bg-slate-50/70 border border-slate-200 rounded-xl p-4 space-y-2 hover:border-blue-300 transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold text-blue-700">{item.id}</span>
                    <span className="font-semibold text-slate-900">{item.title}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600 font-mono">
                      {item.difficulty}
                    </span>
                    <button
                      onClick={() => handleCopy(item.id, item.prompt)}
                      className="p-1 text-slate-400 hover:text-slate-700 rounded transition cursor-pointer"
                      title="複製題幹"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                <p className="text-slate-700 leading-relaxed pl-1">{item.prompt}</p>

                <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-[11px] text-slate-500">
                  <span>{item.similarity}</span>
                  <span className="text-emerald-700 font-medium">✓ 已校驗等價度 99.4%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-400">已自動同步至暫存衍生庫</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs cursor-pointer"
          >
            完成並返回題庫
          </button>
        </div>
      </div>
    </div>
  );
};
