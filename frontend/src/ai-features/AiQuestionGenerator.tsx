import React, { useState } from 'react';
import { Sparkles, Brain, Check, RefreshCw, KeyRound, AlertTriangle } from 'lucide-react';

interface AiQuestionGeneratorProps {
  baseStem: string;
  onQuestionsGenerated?: (questions: any[]) => void;
}

/**
 * AI Question Generator Component (Gemini API Integration Placeholder)
 * Keep all Gemini API calls and prompt configurations isolated here.
 * When GEMINI_API_KEY or an AI endpoint is connected, plug in the SDK call here.
 */
export const AiQuestionGenerator: React.FC<AiQuestionGeneratorProps> = ({
  baseStem,
  onQuestionsGenerated,
}) => {
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);

  const handleGenerate = async () => {
    if (!hasApiKey) return;
    setLoading(true);
    try {
      // Connect to Gemini SDK / API endpoint here when enabled
      // e.g. await aiClient.generateContent(...)
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-3 text-xs">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span className="font-bold text-slate-800">Gemini AI 考題智慧生成模組</span>
        </div>
        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
          {hasApiKey ? '已連線' : '待設定 API Key'}
        </span>
      </div>

      {!hasApiKey ? (
        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
          <p className="text-slate-600">
            請輸入 Google AI Studio / Gemini API Key 以啟用深度語意考題衍生。
          </p>
          <div className="flex items-center space-x-2">
            <input
              type="password"
              placeholder="輸入 API Key..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="flex-1 p-2 border border-slate-200 rounded-lg text-xs"
            />
            <button
              onClick={() => apiKey.trim() && setHasApiKey(true)}
              className="px-3 py-2 bg-blue-600 text-white rounded-lg font-bold"
            >
              啟用
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <span className="text-slate-600">已就緒，基準題幹：{baseStem.slice(0, 20)}...</span>
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="px-3 py-1.5 bg-blue-600 text-white rounded-lg font-semibold flex items-center space-x-1"
          >
            <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'AI 演算中...' : '生成衍生試題'}</span>
          </button>
        </div>
      )}
    </div>
  );
};
