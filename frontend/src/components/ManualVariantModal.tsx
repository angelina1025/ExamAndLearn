import React, { useState } from 'react';
import { X, Copy, Plus, Check, FileText, ArrowRight, Layers, Sliders } from 'lucide-react';

interface ManualVariantModalProps {
  isOpen: boolean;
  onClose: () => void;
  baseQuestion?: {
    id: string;
    prompt: string;
    topic?: string;
  };
  onSaveVariant?: (newQuestion: any) => void;
}

/**
 * Manual Question Variation Modal (No AI API required)
 * Allows teachers and administrators to create parallel test variations manually
 * with parameter substitutions, extreme boundary condition tests, or code filling.
 */
export const ManualVariantModal: React.FC<ManualVariantModalProps> = ({
  isOpen,
  onClose,
  baseQuestion,
  onSaveVariant,
}) => {
  const [activeStrategy, setActiveStrategy] = useState<'param' | 'boundary' | 'code'>('param');
  const [variantTitle, setVariantTitle] = useState('變形 A：參數替換版');
  const [variantPrompt, setVariantPrompt] = useState(
    '在 Lomuto 分割演算法中，若改採隨機挑選 Pivot 並與最後一個元素交換後再執行劃分，請推導其於「近乎已排序（Nearly Sorted）」數列下的預期比較次數。'
  );
  const [difficulty, setDifficulty] = useState('中等 (0.55)');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const strategies = [
    {
      id: 'param',
      name: '參數替換題',
      desc: '調整輸入條件、常數、遞迴參數或陣列分佈',
      defaultTitle: '變形 A：參數替換版',
      defaultPrompt:
        '在 Lomuto 分割演算法中，若改採隨機挑選 Pivot 並與最後一個元素交換後再執行劃分，請推導其於「近乎已排序（Nearly Sorted）」數列下的預期比較次數。',
      defaultDifficulty: '中等 (0.55)',
    },
    {
      id: 'boundary',
      name: '極端邊界題',
      desc: '考查所有元素相同、已排序逆序等極端 Worst-Case 退化條件',
      defaultTitle: '變形 B：反向條件題（極端情況）',
      defaultPrompt:
        '若給定一長度為 n 且所有元素值均相同之陣列，請比較 Lomuto 與 Hoare 兩種劃分法在遞迴深度與子陣列劃分比例上的極端退化表現。',
      defaultDifficulty: '困難 (0.38)',
    },
    {
      id: 'code',
      name: '程式實作題',
      desc: '轉換為填空、邊界判斷條件改寫或迴圈終止條件',
      defaultTitle: '變形 C：程式碼填空題（實作細節）',
      defaultPrompt:
        '下列為 Hoare Partition 之核心雙指標相向迴圈，請指出在 `while (A[i] < pivot)` 與 `while (A[j] > pivot)` 中，若將嚴格大於/小於改為含等號（≤/≥），將導致何種致命執行期錯誤？',
      defaultDifficulty: '困難 (0.31)',
    },
  ];

  const handleSelectStrategy = (strat: (typeof strategies)[0]) => {
    setActiveStrategy(strat.id as any);
    setVariantTitle(strat.defaultTitle);
    setVariantPrompt(strat.defaultPrompt);
    setDifficulty(strat.defaultDifficulty);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(variantPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    if (onSaveVariant) {
      onSaveVariant({
        id: `QS-VAR-${Date.now().toString().slice(-4)}`,
        badge: '手動衍生',
        prompt: variantPrompt,
        tags: ['平行衍生', '變形題'],
        type: '單選題',
        typeBadgeColor: 'bg-blue-100 text-blue-700 border-blue-200',
        difficulty: difficulty.split(' ')[0] || '中等',
        difficultyScore: difficulty.match(/\((.*?)\)/)?.[1] || '0.50',
        difficultyColor: 'bg-amber-100 text-amber-800 border-amber-200',
        points: 2,
        lastModified: '剛剛',
        author: '管理員 AAA',
        isSelected: false,
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-indigo-100 text-indigo-700">
              <Layers className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base">
                手動題幹多樣化衍生與變形題組
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
          {/* Strategy Tabs */}
          <div>
            <label className="font-semibold text-slate-700 block mb-2">
              選擇手動衍生變形策略：
            </label>
            <div className="grid grid-cols-3 gap-2">
              {strategies.map((strat) => (
                <button
                  key={strat.id}
                  type="button"
                  onClick={() => handleSelectStrategy(strat)}
                  className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                    activeStrategy === strat.id
                      ? 'border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-500'
                      : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100'
                  }`}
                >
                  <div className="font-bold text-slate-900 mb-0.5">{strat.name}</div>
                  <div className="text-[11px] text-slate-500 line-clamp-2">{strat.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Form fields */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">變形題目代稱</label>
                <input
                  type="text"
                  value={variantTitle}
                  onChange={(e) => setVariantTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">目標難度係數</label>
                <input
                  type="text"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-slate-700">
                  衍生題幹敘述 (Question Prompt)
                </label>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="text-indigo-600 hover:text-indigo-800 text-[11px] font-semibold flex items-center space-x-1"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? '已複製到剪貼簿' : '複製題幹'}</span>
                </button>
              </div>
              <textarea
                rows={4}
                value={variantPrompt}
                onChange={(e) => setVariantPrompt(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans"
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1">
              <span className="font-bold text-slate-800 block">💡 命題指南建議：</span>
              <p>
                手動衍生考題時，建議維持相同的知識點標籤（如：快速排序、Partition），僅置換數值或邊界條件，可有效達到防作弊平行卷之評量目的。
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-100 rounded-xl text-xs font-semibold"
          >
            取消
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center space-x-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>儲存為新試題至題庫</span>
          </button>
        </div>
      </div>
    </div>
  );
};
