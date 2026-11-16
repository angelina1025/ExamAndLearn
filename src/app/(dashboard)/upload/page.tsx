'use client';

import React, { useState } from 'react';
import { Question } from '@/types';
import { parseQuestionsFromUpload } from '@/utils/fileParsers';
import { FileDropzone } from '@/app/(dashboard)/upload/_components/FileDropzone';
import { SingleQuestionForm } from '@/app/(dashboard)/upload/_components/SingleQuestionForm';
import { PreviewTable } from '@/app/(dashboard)/upload/_components/PreviewTable';
import { downloadQuestionsAsGoogleSheetExcel } from '@/services/excelDatabaseExport';

interface QuestionUploadPageProps {
  onQuestionsAdded?: (newQuestions: Question[]) => void;
}

export default function QuestionUploadPage({
  onQuestionsAdded,
}: QuestionUploadPageProps = {}) {
  const [previewList, setPreviewList] = useState<Question[]>([]);
  const [statusMessage, setStatusMessage] = useState<string>('');

  const handleFileSelected = async (file: File) => {
    try {
      const parsed = await parseQuestionsFromUpload(file);
      setPreviewList((prev) => [...prev, ...parsed]);
      setStatusMessage(`已成功解析檔案，新增 ${parsed.length} 道試題至待匯入清單。`);
    } catch (err: any) {
      alert(err?.message || '解析題目檔案失敗，請確認檔案格式是否正確。');
    }
  };

  const handleDownloadExcel = async () => {
    if (previewList.length === 0) return;
    try {
      await downloadQuestionsAsGoogleSheetExcel(previewList);
    } catch (err: any) {
      alert('下載 Excel 檔案失敗：' + (err?.message || '未知錯誤'));
    }
  };

  const handleConfirmImport = async () => {
    if (previewList.length === 0) return;

    // 本地儲存與回呼 (個人題庫可離線 CRUD)
    if (typeof window !== 'undefined') {
      try {
        const existing = JSON.parse(localStorage.getItem('quiz_custom_questions') || '[]');
        localStorage.setItem(
          'quiz_custom_questions',
          JSON.stringify([...previewList, ...existing])
        );
      } catch {}
    }

    onQuestionsAdded?.(previewList);

    alert(
      `🎉 成功匯入 ${previewList.length} 題試題至個人題庫！\n若需離線操作，可透過側邊欄點擊「下載離線版本」打包下載。`
    );
    setPreviewList([]);
    setStatusMessage('');
  };

  return (
    <div className="p-6 max-w-5xl mx-auto flex flex-col gap-5">
      <div>
        <h1 className="text-xl font-extrabold text-[#191c1d]">題目批次上傳與建檔</h1>
        <p className="text-xs text-[#434655] mt-1">
          支援 Excel / CSV 批次匯入或單筆快速新增至個人題庫；支援離線編輯與重新連線時的衝突比對同步。
        </p>
      </div>

      {statusMessage && (
        <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-800 font-medium flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">info</span>
          <span>{statusMessage}</span>
        </div>
      )}

      <FileDropzone onFileSelected={handleFileSelected} />
      <SingleQuestionForm
        onAdd={(q) => {
          setPreviewList((prev) => [...prev, q]);
          setStatusMessage('已新增 1 題試題至待匯入清單。');
        }}
      />
      <PreviewTable
        questions={previewList}
        onDownloadExcel={handleDownloadExcel}
        onConfirmImport={handleConfirmImport}
      />
    </div>
  );
}
