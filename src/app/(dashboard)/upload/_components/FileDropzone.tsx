'use client';

import React from 'react';

interface FileDropzoneProps {
  onFileSelected: (file: File) => void;
}

export const FileDropzone: React.FC<FileDropzoneProps> = ({ onFileSelected }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelected(file);
    }
  };

  return (
    <div className="border-2 border-dashed border-[#c3c6d7] rounded-xl p-8 text-center bg-white hover:border-[#004ac6] transition-colors">
      <p className="text-sm font-bold text-[#191c1d]">
        拖曳 Excel / CSV 題庫檔案至此，或點擊選擇檔案
      </p>
      <p className="text-xs text-[#737686] mt-1">
        支援 .xlsx, .csv 格式，請依照範例模板欄位填寫
      </p>
      <label className="inline-block mt-4 px-4 py-2 rounded-lg text-xs font-bold bg-[#004ac6] text-white cursor-pointer hover:bg-[#003ea8]">
        選擇檔案
        <input
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
    </div>
  );
};

