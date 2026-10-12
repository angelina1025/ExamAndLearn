import React, { useState, useEffect } from 'react';
import {
  X,
  Download,
  Wifi,
  WifiOff,
  CheckCircle2,
  RefreshCw,
  Trash2,
  Smartphone,
  Laptop,
  Layers,
  RotateCcw,
  BookOpen,
  Calendar,
  Award,
  AlertCircle,
} from 'lucide-react';
import {
  getOfflineBankMeta,
  downloadQuestionsToOfflineStorage,
  getOfflineExamHistory,
  getWrongNotebookQuestions,
  clearOfflineStorage,
  isDeviceOnline,
  OfflineBankMeta,
  OfflineExamRecord,
} from '../services/offlineStorage';
import { ExamQuestion } from '../types';

interface OfflineManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartOfflineExam: (questions: ExamQuestion[], title?: string) => void;
  onStartRetestWrong: (wrongQuestions: ExamQuestion[]) => void;
}

export const OfflineManagerModal: React.FC<OfflineManagerModalProps> = ({
  isOpen,
  onClose,
  onStartOfflineExam,
  onStartRetestWrong,
}) => {
  const [meta, setMeta] = useState<OfflineBankMeta>(getOfflineBankMeta());
  const [history, setHistory] = useState<OfflineExamRecord[]>(getOfflineExamHistory());
  const [wrongCount, setWrongCount] = useState<number>(getWrongNotebookQuestions().length);
  const [isOnline, setIsOnline] = useState<boolean>(isDeviceOnline());
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'bank' | 'history' | 'install'>('bank');

  // Listen to network online/offline events
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      refreshData();
    }
  }, [isOpen]);

  const refreshData = () => {
    setMeta(getOfflineBankMeta());
    setHistory(getOfflineExamHistory());
    setWrongCount(getWrongNotebookQuestions().length);
    setIsOnline(isDeviceOnline());
  };

  if (!isOpen) return null;

  const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadSuccess(false);
    const res = await downloadQuestionsToOfflineStorage();
    setIsDownloading(false);
    if (res.success) {
      setDownloadSuccess(true);
      refreshData();
      setTimeout(() => setDownloadSuccess(false), 3000);
    }
  };

  const handleClear = () => {
    if (window.confirm('確定要清空離線題庫與本機所有考試紀錄嗎？清空後可隨時重新預先下載。')) {
      clearOfflineStorage();
      refreshData();
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 KB';
    const k = 1024;
    return `${(bytes / k).toFixed(1)} KB`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-100 bg-slate-50/90">
          <div className="flex items-center space-x-2.5">
            <div className={`p-2 rounded-xl ${isOnline ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
              {isOnline ? <Wifi className="w-5 h-5" /> : <WifiOff className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-slate-800 text-sm sm:text-base">
                  離線考試與題庫預載中心
                </h3>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                    isOnline
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-amber-50 text-amber-800 border-amber-200 animate-pulse'
                  }`}
                >
                  {isOnline ? '目前連線中 (Online)' : '目前離線中 (Offline)'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                預先下載題庫至本機裝置，無網路環境隨時測驗、評分、錯題重考
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center space-x-2 px-5 sm:px-6 pt-3 border-b border-slate-100 bg-white text-xs">
          <button
            onClick={() => setActiveTab('bank')}
            className={`pb-2.5 font-semibold transition border-b-2 flex items-center space-x-1.5 cursor-pointer ${
              activeTab === 'bank'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>離線題庫庫存 ({meta.totalQuestions} 題)</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`pb-2.5 font-semibold transition border-b-2 flex items-center space-x-1.5 cursor-pointer ${
              activeTab === 'history'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>離線測驗紀錄 ({history.length} 份)</span>
          </button>

          <button
            onClick={() => setActiveTab('install')}
            className={`pb-2.5 font-semibold transition border-b-2 flex items-center space-x-1.5 cursor-pointer ${
              activeTab === 'install'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>手機 / 電腦多端支援</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs flex-1">
          {/* TAB 1: BANK */}
          {activeTab === 'bank' && (
            <div className="space-y-4">
              {/* Status Box */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/90 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-[11px] text-slate-500 font-medium block">
                      本機已快取試題
                    </span>
                    <div className="text-2xl font-bold font-mono text-slate-900 mt-0.5">
                      {meta.totalQuestions} <span className="text-xs font-normal text-slate-500">道完整題目</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleDownload}
                      disabled={isDownloading}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white rounded-xl font-bold text-xs shadow-xs transition flex items-center space-x-1.5 cursor-pointer"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isDownloading ? 'animate-spin' : ''}`} />
                      <span>{isDownloading ? '下載題庫中...' : '一鍵預先下載 / 更新題庫'}</span>
                    </button>

                    {meta.totalQuestions > 0 && (
                      <button
                        onClick={handleClear}
                        className="p-2 border border-slate-200 hover:bg-rose-50 hover:border-rose-200 text-slate-500 hover:text-rose-600 rounded-xl transition cursor-pointer"
                        title="清空本機暫存"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-200/60 text-[11px] text-slate-600">
                  <div>
                    <span className="text-slate-400 block">離線狀態：</span>
                    <span className={`font-semibold ${meta.isAvailableOffline ? 'text-emerald-700' : 'text-amber-700'}`}>
                      {meta.isAvailableOffline ? '✓ 已可完全離線使用' : '尚未預載'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">快取大小：</span>
                    <span className="font-mono">{formatBytes(meta.sizeBytes)}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">上次同步時間：</span>
                    <span>{meta.lastDownloaded || '無'}</span>
                  </div>
                </div>

                {downloadSuccess && (
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center space-x-2 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>題庫已成功快取至本機瀏覽器！拔掉網路線或開啟飛航模式亦可隨時作答。</span>
                  </div>
                )}
              </div>

              {/* Category Breakdown */}
              {meta.categories.length > 0 && (
                <div className="space-y-2">
                  <span className="font-bold text-slate-700 block">已下載題庫分類分佈：</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {meta.categories.map((c) => (
                      <div
                        key={c.name}
                        className="p-2.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between"
                      >
                        <span className="text-slate-800 font-medium">{c.name}</span>
                        <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-mono font-bold">
                          {c.count} 題
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons for Offline Exam */}
              <div className="pt-2 space-y-2">
                <span className="font-bold text-slate-700 block">立即啟動離線模式練習：</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      onClose();
                      onStartOfflineExam(getWrongNotebookQuestions(), '離線錯題重考卷');
                    }}
                    disabled={wrongCount === 0}
                    className="p-3 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl text-left transition cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-amber-900 flex items-center space-x-1.5">
                        <RotateCcw className="w-3.5 h-3.5 text-amber-700" />
                        <span>離線重考錯題本</span>
                      </div>
                      <p className="text-[11px] text-amber-800 mt-0.5">
                        累積歷次測驗錯題（共 {wrongCount} 題）
                      </p>
                    </div>
                    <span className="px-2 py-1 rounded-lg bg-amber-600 text-white font-mono font-bold text-xs">
                      開始重考
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      onStartOfflineExam([], '全題庫隨機離線測驗');
                    }}
                    className="p-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl text-left transition cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-blue-900 flex items-center space-x-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-blue-700" />
                        <span>全題庫離線隨機考試</span>
                      </div>
                      <p className="text-[11px] text-blue-800 mt-0.5">
                        從離線題庫載入完整試卷（含自訂計時）
                      </p>
                    </div>
                    <span className="px-2 py-1 rounded-lg bg-blue-600 text-white font-mono font-bold text-xs">
                      即刻測驗
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HISTORY */}
          {activeTab === 'history' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700">離線測驗評分成果與歷史紀錄</span>
                <span className="text-[11px] text-slate-400">儲存於本機 LocalStorage</span>
              </div>

              {history.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-2">
                  <Calendar className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="text-slate-500 font-medium">尚無離線測驗紀錄</p>
                  <p className="text-[11px] text-slate-400">
                    完成測驗並送出後，系統將自動於本機儲存成績、題項評分與錯題本。
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {history.map((rec) => (
                    <div
                      key={rec.id}
                      className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs flex items-center justify-between"
                    >
                      <div className="space-y-1">
                        <div className="font-bold text-slate-900 text-xs sm:text-sm">
                          {rec.title}
                        </div>
                        <div className="flex items-center space-x-3 text-[11px] text-slate-500">
                          <span>{rec.timestamp}</span>
                          <span>·</span>
                          <span>總題數：{rec.totalQuestions} 題</span>
                          <span>·</span>
                          <span className="text-rose-600 font-semibold">錯題：{rec.wrongCount} 題</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <div className="text-base sm:text-lg font-bold font-mono text-blue-700 leading-none">
                            {rec.score} <span className="text-xs text-slate-400 font-normal">/ {rec.totalPoints}</span>
                          </div>
                          <div className="text-[10px] text-emerald-700 font-medium mt-0.5">
                            正確率 {rec.accuracy}%
                          </div>
                        </div>

                        {rec.wrongCount > 0 && (
                          <button
                            onClick={() => {
                              onClose();
                              onStartRetestWrong(rec.questions.filter((q) => q.status === 'wrong'));
                            }}
                            className="px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-lg text-xs font-semibold transition"
                          >
                            重考此卷錯題
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: INSTALL / MULTI-DEVICE */}
          {activeTab === 'install' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 space-y-2">
                  <div className="flex items-center space-x-2 text-blue-800 font-bold">
                    <Smartphone className="w-5 h-5 text-blue-600" />
                    <span>手機行動裝置 (iOS / Android)</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    在 Safari 或 Chrome 點擊「分享」或選單中的「加入主畫面 (Add to Home Screen)」，即可像原生 App 一般全螢幕運行，通勤離線隨身刷題。
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/50 space-y-2">
                  <div className="flex items-center space-x-2 text-indigo-800 font-bold">
                    <Laptop className="w-5 h-5 text-indigo-600" />
                    <span>電腦端 (Mac / Windows / Linux)</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    點擊網址列右側的「安裝應用程式」圖示，或在桌面直接開啟，享鍵盤快捷鍵、多欄位試題排版與大螢幕深度解析診斷。
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <span className="font-bold text-slate-800 block">離線架構與資料同步保證：</span>
                <ul className="list-disc pl-4 text-[11px] text-slate-600 space-y-1">
                  <li><strong>雙重評分引擎</strong>：連線時可走後端 <code>/api/exam/grade</code>，無網路時自動在前端客戶端即時秒速算分並產出錯題對照。</li>
                  <li><strong>離線題庫持續快取</strong>：採用 LocalStorage / Service Worker 雙重機制，即便重新開啟瀏覽器題目依然存在。</li>
                  <li><strong>錯題累積重考</strong>：歷次作答錯題均會自動收集，離線隨時點擊「錯題重考」進行針對性精熟複習。</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 sm:px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            裝置狀態：{isOnline ? '🟢 網路暢通' : '🟡 離線快取運行中'}
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold transition cursor-pointer"
          >
            關閉
          </button>
        </div>
      </div>
    </div>
  );
};
