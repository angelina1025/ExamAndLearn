'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Question } from '@/types';
import {
  validateAndParseExamFile,
  ExamUploadValidationResult,
} from '@/utils/fileParsers';

interface UploadExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess?: (questions: Question[], file: File) => void;
}

export const UploadExamModal: React.FC<UploadExamModalProps> = ({
  isOpen,
  onClose,
  onUploadSuccess,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [validationResult, setValidationResult] =
    useState<ExamUploadValidationResult | null>(null);
  const [uploadSucceeded, setUploadSucceeded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setSelectedFile(null);
      setIsDragging(false);
      setIsChecking(false);
      setValidationResult(null);
      setUploadSucceeded(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectNewFile = (file: File | null) => {
    setSelectedFile(file);
    setValidationResult(null);
    setUploadSucceeded(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      handleSelectNewFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0] || null;
    if (file) {
      handleSelectNewFile(file);
    }
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleSelectNewFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsChecking(true);
    setValidationResult(null);
    setUploadSucceeded(false);

    try {
      const result = await validateAndParseExamFile(selectedFile);
      setValidationResult(result);

      if (result.isValid && result.questions.length > 0) {
        setUploadSucceeded(true);
        onUploadSuccess?.(result.questions, selectedFile);
      }
    } finally {
      setIsChecking(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const hasValidationFailed =
    validationResult !== null && !validationResult.isValid;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-xl max-w-3xl w-full shadow-2xl p-6 flex flex-col gap-5 z-10 animate-in fade-in zoom-in-95 duration-200 border border-[#c3c6d7]/30 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#c3c6d7]/30">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#dbe1ff] text-[#004ac6] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">upload_file</span>
            </span>
            <h2 className="text-[18px] text-[#191c1e] font-bold">上傳整份試卷</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#434655] hover:text-[#191c1e] p-1 rounded cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Sample Excel Download Banner - Single Line */}
          <div className="flex items-center justify-between gap-4 px-4 py-2.5 rounded-lg bg-[#e8edff] text-[#004ac6] border border-[#b4c5ff]/60 text-[13px]">
            <div className="flex items-center gap-2 whitespace-nowrap">
              <span className="material-symbols-outlined text-[18px] shrink-0">
                table_view
              </span>
              <span>
                請依照「下載範例Excel 檔」新增題目 ，所有欄位皆填寫完成後即可上傳。
              </span>
            </div>
            <a
              href="/題庫試卷上傳範例.xlsx"
              download="題庫試卷上傳範例.xlsx"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[#dbe1ff]/50 text-[#004ac6] border border-[#b4c5ff] rounded-md text-[12px] font-semibold transition-colors shrink-0 shadow-2xs whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>下載範例 Excel</span>
            </a>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.csv"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Local File Picker Dropzone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-3 text-center transition-colors cursor-pointer ${
              isDragging
                ? 'border-[#004ac6] bg-[#dbe1ff]/30'
                : hasValidationFailed
                ? 'border-[#ba1a1a]/60 bg-[#fff8f7]'
                : uploadSucceeded
                ? 'border-[#137333]/60 bg-[#e6f4ea]/40'
                : selectedFile
                ? 'border-[#004ac6]/60 bg-[#f8f9ff]'
                : 'border-[#c3c6d7] bg-[#f8f9fa] hover:border-[#004ac6]/60 hover:bg-[#f2f4f6]'
            }`}
          >
            {selectedFile ? (
              <div className="flex items-center justify-between w-full px-3.5 py-2.5 bg-white rounded-lg border border-[#c3c6d7]/50 shadow-2xs">
                <div className="flex items-center gap-3 min-w-0 text-left">
                  <span className="w-9 h-9 rounded-lg bg-[#dbe1ff] text-[#004ac6] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">description</span>
                  </span>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[13px] font-semibold text-[#191c1e] break-all">
                      {selectedFile.name}
                    </span>
                    <span className="text-[11px] text-[#434655] font-mono">
                      {formatFileSize(selectedFile.size)}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="p-1.5 text-[#434655] hover:text-[#ba1a1a] hover:bg-[#ffdad6]/50 rounded-lg transition-colors cursor-pointer shrink-0"
                  title="移除已選檔案並重新選擇"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>
            ) : (
              <>
                <span className="w-12 h-12 rounded-full bg-[#dbe1ff]/60 text-[#004ac6] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[26px]">folder_open</span>
                </span>
                <div className="flex flex-col gap-1">
                  <p className="text-[14px] font-semibold text-[#191c1e]">
                    點擊選取本地檔案，或將試卷檔案拖曳至此
                  </p>
                  <p className="text-[12px] text-[#434655]">
                    支援標準 Excel (.xlsx) 與 CSV (.csv) 格式試卷檔案
                  </p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="mt-1 px-3.5 py-1.5 bg-white hover:bg-[#eceef0] text-[#004ac6] border border-[#c3c6d7] rounded-lg text-[12px] font-semibold transition-colors cursor-pointer shadow-2xs"
                >
                  瀏覽本地檔案
                </button>
              </>
            )}
          </div>

          {/* Validation Failure Report */}
          {hasValidationFailed && validationResult && (
            <div className="rounded-xl border border-[#ffdad6] bg-[#fff8f7] overflow-hidden animate-in fade-in duration-150">
              <div className="bg-[#ba1a1a]/10 px-4 py-3 flex items-center gap-2.5 border-b border-[#ba1a1a]/20">
                <span className="w-7 h-7 rounded-full bg-[#ba1a1a] text-white flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[18px]">error</span>
                </span>
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-[#ba1a1a]">
                    上傳失敗：試卷內容審查未通過
                  </span>
                  <span className="text-[12px] text-[#434655]">
                    {validationResult.fileError
                      ? '檔案結構或標題欄位不符合規範'
                      : `共有 ${validationResult.rowErrors.length} 題的欄位內容不完整或格式有誤，請修正後重新上傳`}
                  </span>
                </div>
              </div>

              <div className="p-4 max-h-60 overflow-y-auto flex flex-col gap-2.5">
                {validationResult.fileError ? (
                  <div className="p-3 bg-white border border-[#ffdad6] rounded-lg text-[13px] text-[#ba1a1a] flex items-start gap-2">
                    <span className="material-symbols-outlined text-[18px] shrink-0 mt-0.5">
                      cancel
                    </span>
                    <span>{validationResult.fileError}</span>
                  </div>
                ) : (
                  validationResult.rowErrors.map((err) => (
                    <div
                      key={err.rowNumber}
                      className="p-3 bg-white border border-[#ffdad6] rounded-lg flex flex-col gap-1.5"
                    >
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="font-semibold text-[13px] text-[#191c1e]">
                          第 {err.questionIndex} 題：{err.questionPreview}
                        </span>
                        <span className="font-mono text-[11px] text-[#ba1a1a] bg-[#fff8f7] px-2 py-0.5 rounded border border-[#ffdad6] shrink-0">
                          Excel 第 {err.rowNumber} 列
                        </span>
                      </div>
                      <div className="text-[12px] text-[#434655] font-medium">
                        有問題的欄位：
                      </div>
                      <ul className="text-[12px] text-[#ba1a1a] flex flex-col gap-1 pl-1">
                        {err.fieldErrors.map((fe, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="material-symbols-outlined text-[15px] text-[#ba1a1a] shrink-0 mt-0.5">
                              cancel
                            </span>
                            <span>{fe}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Validation Success Report */}
          {uploadSucceeded && validationResult && (
            <div className="rounded-xl border border-[#a5d6a7] bg-[#e8f5e9] px-4 py-3.5 flex items-center justify-between gap-3 animate-in fade-in duration-150">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#0f9d58] text-white flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">check_circle</span>
                </span>
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-[#1b5e20]">
                    上傳成功！所有欄位皆已通過完整性審查
                  </span>
                  <span className="text-[12px] text-[#2e7d32]">
                    已成功匯入 {validationResult.questions.length} 筆完整試題至題庫中。
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Modal Footer */}
          <div className="pt-3 border-t border-[#c3c6d7]/30 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#eceef0] text-[#191c1e] rounded-lg hover:bg-[#e0e3e5] text-[13px] font-medium transition-colors cursor-pointer"
            >
              {uploadSucceeded ? '關閉視窗' : '取消'}
            </button>
            {!uploadSucceeded && (
              <button
                type="submit"
                disabled={!selectedFile || isChecking}
                className="px-5 py-2 bg-[#004ac6] text-white rounded-lg hover:bg-[#2563eb] disabled:opacity-40 disabled:cursor-not-allowed text-[13px] font-semibold shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span
                  className={`material-symbols-outlined text-[18px] ${
                    isChecking ? 'animate-spin' : ''
                  }`}
                >
                  {isChecking ? 'sync' : 'upload'}
                </span>
                <span>{isChecking ? '審查檔案中...' : '上傳試卷'}</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
