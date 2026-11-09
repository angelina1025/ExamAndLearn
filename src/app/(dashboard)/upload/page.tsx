'use client';

import React, { useState } from 'react';
import { Question } from '@/types';
import { parseQuestionsFromUpload } from '@/utils/fileParsers';
import { FileDropzone } from '@/app/(dashboard)/upload/_components/FileDropzone';
import { SingleQuestionForm } from '@/app/(dashboard)/upload/_components/SingleQuestionForm';
import { PreviewTable } from '@/app/(dashboard)/upload/_components/PreviewTable';

export default function QuestionUploadPage() {
  const [previewList, setPreviewList] = useState<Question[]>([]);

  const handleFileSelected = async (file: File) => {
    const parsed = await parseQuestionsFromUpload(file);
    setPreviewList((prev) => [...prev, ...parsed]);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto flex flex-col gap-5">
      <div>
        <h1 className="text-xl font-extrabold text-[#191c1d]">題目批次上傳與建檔</h1>
        <p className="text-xs text-[#434655] mt-1">
          支援 Excel / CSV 批次匯入或單筆快速新增至題庫
        </p>
      </div>
      <FileDropzone onFileSelected={handleFileSelected} />
      <SingleQuestionForm
        onAdd={(q) => setPreviewList((prev) => [...prev, q])}
      />
      <PreviewTable questions={previewList} />
    </div>
  );
}

