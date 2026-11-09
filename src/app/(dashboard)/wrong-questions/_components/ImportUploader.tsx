'use client';

import React from 'react';

interface ImportUploaderProps {
  onImportFile?: (file: File) => void;
}

export const ImportUploader: React.FC<ImportUploaderProps> = ({ onImportFile }) => {
  return (
    <div className="bg-white rounded-xl border border-[#c3c6d7]/40 p-5 flex items-center justify-between">
      <div>
        <h3 className="text-sm font-bold text-[#191c1d]">匯入歷史測驗紀錄 / 錯題本</h3>
        <p className="text-xs text-[#737686] mt-0.5">
          上傳測驗結果檔案以彙整歷次易錯知識點
        </p>
      </div>
      <label className="px-4 py-2 rounded-lg text-xs font-bold bg-[#f2f4f6] text-[#191c1d] hover:bg-[#e5e8eb] cursor-pointer">
        選擇紀錄檔
        <input
          type="file"
          accept=".json,.csv,.xlsx"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onImportFile?.(f);
          }}
          className="hidden"
        />
      </label>
    </div>
  );
};

