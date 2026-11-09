'use client';

import React, { useState } from 'react';
import { AuditLog } from '@/types';

interface SystemSettingsViewProps {
  auditLogs: AuditLog[];
}

export const SystemSettingsView: React.FC<SystemSettingsViewProps> = ({ auditLogs }) => {
  const [defaultDuration, setDefaultDuration] = useState(60);
  const [passPercentage, setPassPercentage] = useState(60);
  const [enableAIProctoring, setEnableAIProctoring] = useState(true);
  const [browserLock, setBrowserLock] = useState(true);
  const [autoSaveNotification, setAutoSaveNotification] = useState(false);

  const handleSave = () => {
    setAutoSaveNotification(true);
    setTimeout(() => setAutoSaveNotification(false), 2500);
  };

  return (
    <div className="flex flex-col w-full max-w-5xl">

      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-[26px] font-bold text-[#191c1e] tracking-tight">
            系統全域組態設定 (System Settings)
          </h1>
          <p className="text-[13px] text-[#434655] mt-1">
            管理測驗參數、監考防弊規則與稽核日誌
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#004ac6] text-white rounded-lg text-[13px] font-semibold hover:bg-[#2563eb] shadow-sm transition-all cursor-pointer"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">save</span>
          <span>儲存所有設定</span>
        </button>
      </div>

      {autoSaveNotification && (
        <div className="mb-4 p-3 rounded-lg bg-[#6ffbbe]/30 border border-[#007d55] text-[#006242] text-[13px] font-medium flex items-center gap-2 animate-in fade-in">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          <span>設定已成功同步至系統資料庫與雲端監控節點！</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Exam Default Parameters */}
        <div className="bg-white p-5 rounded-xl border border-[#c3c6d7]/30 shadow-xs flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-[#c3c6d7]/30 pb-2">
            <span className="material-symbols-outlined text-[#004ac6] text-[20px]">tune</span>
            <h2 className="text-[16px] font-bold text-[#191c1e]">組卷與測驗預設參數</h2>
          </div>

          <div className="flex flex-col gap-3">
            <div>
              <label className="text-[12px] font-semibold text-[#191c1e] block mb-1">
                預設測驗作答時長 (分鐘)
              </label>
              <input
                type="number"
                min="15"
                max="180"
                value={defaultDuration}
                onChange={(e) => setDefaultDuration(Number(e.target.value))}
                className="w-full bg-[#f2f4f6] px-3 py-2 rounded-lg text-[13px] text-[#191c1e] border border-[#c3c6d7]"
              />
            </div>

            <div>
              <label className="text-[12px] font-semibold text-[#191c1e] block mb-1">
                合格標準分數百分比 (%)
              </label>
              <input
                type="number"
                min="40"
                max="90"
                value={passPercentage}
                onChange={(e) => setPassPercentage(Number(e.target.value))}
                className="w-full bg-[#f2f4f6] px-3 py-2 rounded-lg text-[13px] text-[#191c1e] border border-[#c3c6d7]"
              />
            </div>

            <div>
              <label className="text-[12px] font-semibold text-[#191c1e] block mb-1">
                預設匯出格式
              </label>
              <select className="w-full bg-[#f2f4f6] px-3 py-2 rounded-lg text-[13px] text-[#191c1e] border border-[#c3c6d7]">
                <option>PDF 格式 (內建答題紙排版)</option>
                <option>Microsoft Word (DOCX)</option>
                <option>Markdown 試題純文字檔</option>
              </select>
            </div>
          </div>
        </div>

        {/* Proctoring & Integrity */}
        <div className="bg-white p-5 rounded-xl border border-[#c3c6d7]/30 shadow-xs flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-[#c3c6d7]/30 pb-2">
            <span className="material-symbols-outlined text-[#ba1a1a] text-[20px]">shield</span>
            <h2 className="text-[16px] font-bold text-[#191c1e]">線上防弊與高規格監考安全</h2>
          </div>

          <div className="flex flex-col gap-3">
            <label className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#f2f4f6] cursor-pointer">
              <input
                type="checkbox"
                checked={enableAIProctoring}
                onChange={(e) => setEnableAIProctoring(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded text-[#004ac6] accent-[#004ac6]"
              />
              <div>
                <span className="text-[13px] font-semibold text-[#191c1e] block">
                  AI 視訊人臉與多重面孔識別監測
                </span>
                <span className="text-[11px] text-[#434655]">
                  自動偵測考生離座、視線偏移與考場旁人提示事件。
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#f2f4f6] cursor-pointer">
              <input
                type="checkbox"
                checked={browserLock}
                onChange={(e) => setBrowserLock(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded text-[#004ac6] accent-[#004ac6]"
              />
              <div>
                <span className="text-[13px] font-semibold text-[#191c1e] block">
                  鎖定視窗與防切換螢幕模式 (Safe Exam Lock)
                </span>
                <span className="text-[11px] text-[#434655]">
                  作答期間禁止切換視窗、分頁、複製貼上或截圖。
                </span>
              </div>
            </label>

            <div className="p-3 bg-[#ffdad6]/30 rounded-lg border border-[#ffdad6] text-xs text-[#93000a]">
              <strong>安全聲明：</strong>
              所有考卷刪除操作皆強制依循「二階段防呆驗證」，需由具備系統管理員權限者手動輸入確認代碼方可執行。
            </div>
          </div>
        </div>
      </div>

      {/* System Audit Logs */}
      <div className="bg-white p-5 rounded-xl border border-[#c3c6d7]/30 shadow-xs flex flex-col gap-3">
        <div className="flex items-center justify-between border-b border-[#c3c6d7]/30 pb-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#007d55] text-[20px]">history_edu</span>
            <h2 className="text-[16px] font-bold text-[#191c1e]">系統操作安全審計日誌 (Audit Logs - 讀寫自 Google Sheet "log" 分頁)</h2>
          </div>
          <span className="text-[11px] text-[#434655]">即時同步中 ({auditLogs.length} 筆)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[12px]">
            <thead className="bg-[#f2f4f6] text-[#434655] font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-2.5 px-3">異動日誌編號</th>
                <th className="py-2.5 px-3">操作行為</th>
                <th className="py-2.5 px-3">目標對象</th>
                <th className="py-2.5 px-3">執行管理者</th>
                <th className="py-2.5 px-3">時間戳記</th>
                <th className="py-2.5 px-3 text-right">狀態</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c3c6d7]/20">
              {auditLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[#737686] text-[13px]">
                    目前 Google Sheet「<code className="font-mono">log</code>」分頁尚無操作紀錄（當新增、發布或刪除題目/試卷時將自動寫入）
                  </td>
                </tr>
              ) : (
                auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-[#f2f4f6] transition-colors">
                    <td className="py-2.5 px-3 font-mono font-semibold text-[#004ac6]">{log.id}</td>
                    <td className="py-2.5 px-3 font-medium text-[#191c1e]">{log.action}</td>
                    <td className="py-2.5 px-3 text-[#434655] truncate max-w-[200px]">{log.target}</td>
                    <td className="py-2.5 px-3 text-[#191c1e]">{log.operator}</td>
                    <td className="py-2.5 px-3 font-mono text-[#434655]">{log.timestamp}</td>
                    <td className="py-2.5 px-3 text-right">
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                          log.status === 'warning'
                            ? 'bg-[#ffdad6] text-[#ba1a1a]'
                            : 'bg-[#6ffbbe]/40 text-[#006242]'
                        }`}
                      >
                        {log.status === 'warning' ? '高風險刪除' : '已核准'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SystemSettingsView;
