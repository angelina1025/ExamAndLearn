import React, { useState } from 'react';
import { X, Plus, Trash2, CheckCircle2, Save } from 'lucide-react';
import { QuestionType, DifficultyLevel } from '../types';

interface NewQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (question: any) => void;
}

export const NewQuestionModal: React.FC<NewQuestionModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [prompt, setPrompt] = useState('');
  const [type, setType] = useState<QuestionType>('single');
  const [topic, setTopic] = useState('排序與搜尋演算法');
  const [points, setPoints] = useState(2);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('medium');
  const [options, setOptions] = useState([
    { id: 'A', text: '', isCorrect: true },
    { id: 'B', text: '', isCorrect: false },
    { id: 'C', text: '', isCorrect: false },
    { id: 'D', text: '', isCorrect: false },
  ]);
  const [explanation, setExplanation] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctOpt = options.find((o) => o.isCorrect)?.id || 'A';
    onSave({
      id: `QS-${Math.floor(1000 + Math.random() * 9000)}`,
      badge: '最新新增',
      prompt: prompt || '未命名題目',
      tags: [topic.split(' ')[0] || '資料結構', '演算法'],
      type: type === 'single' ? '單選題' : type === 'multiple' ? '多選題' : '是非題',
      typeBadgeColor: 'bg-blue-100 text-blue-700 border-blue-200',
      difficulty: difficulty === 'basic' ? '基礎' : difficulty === 'medium' ? '中等' : '困難',
      difficultyScore: '0.60',
      difficultyColor: 'bg-amber-100 text-amber-800 border-amber-200',
      points: points,
      lastModified: '剛剛',
      author: '管理員 AAA',
      isSelected: false,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <h3 className="font-bold text-slate-800 text-base">新增試題至題庫</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 max-h-[75vh] overflow-y-auto space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-slate-700">題目題幹敘述 (Question Prompt) *</label>
            <textarea
              required
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="請輸入題目完整題幹敘述與條件限制..."
              className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">試題類型</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as QuestionType)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="single">單選題</option>
                <option value="multiple">多選題</option>
                <option value="boolean">是非題</option>
                <option value="code">簡答 / 程式手寫題</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">預估難度</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="basic">基礎 (0.80+)</option>
                <option value="medium">中等 (0.50 ~ 0.79)</option>
                <option value="hard">困難 (0.30 ~ 0.49)</option>
                <option value="extreme">極難 (&lt; 0.30)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">預設配分 (分)</label>
              <input
                type="number"
                min={0.5}
                step={0.5}
                value={points}
                onChange={(e) => setPoints(parseFloat(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Options */}
          <div className="space-y-2">
            <label className="font-semibold text-slate-700 block">各選項設定（請標定正確解答）</label>
            <div className="space-y-2">
              {options.map((opt, i) => (
                <div key={opt.id} className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center font-bold text-slate-700">
                    {opt.id}
                  </span>
                  <input
                    type="text"
                    value={opt.text}
                    onChange={(e) => {
                      const updated = [...options];
                      updated[i].text = e.target.value;
                      setOptions(updated);
                    }}
                    placeholder={`請輸入選項 ${opt.id} 說明...`}
                    className="flex-1 p-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const updated = options.map((o, idx) => ({
                        ...o,
                        isCorrect: idx === i,
                      }));
                      setOptions(updated);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      opt.isCorrect
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {opt.isCorrect ? '✓ 正確答案' : '設為正解'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">詳解與知識記憶錨點</label>
            <textarea
              rows={2}
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="輸入正確解答之邏輯依據、常見混淆盲點解析..."
              className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
            />
          </div>

          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 font-semibold"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-xs flex items-center space-x-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>儲存並發布</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
