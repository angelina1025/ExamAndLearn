import React from 'react';
import { ExamPaper } from '@/types';

interface ExamTableProps {
  exams: ExamPaper[];
  selectedExamIds: string[];
  onToggleSelectExam: (id: string) => void;
  onPreviewExam: (exam: ExamPaper) => void;
  onDeleteSingleExam: (exam: ExamPaper) => void;
}

export const ExamTable: React.FC<ExamTableProps> = ({
  exams,
  selectedExamIds,
  onToggleSelectExam,
  onPreviewExam,
  onDeleteSingleExam,
}) => {
  return (
    <div className="overflow-x-auto bg-white rounded-xl border border-[#c3c6d7]/30">
      <table className="w-full text-left border-collapse text-[13px]">
        <thead>
          <tr className="border-b border-[#c3c6d7]/40 bg-[#f8f9fa] text-[#434655]">
            <th className="p-3 w-10"></th>
            <th className="p-3">試卷編號</th>
            <th className="p-3">試卷名稱</th>
            <th className="p-3">科目</th>
            <th className="p-3">題數 / 總分</th>
            <th className="p-3">時限</th>
            <th className="p-3 text-right">操作</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#eceef0]">
          {exams.map((exam) => (
            <tr key={exam.id} className="hover:bg-[#f2f4f6]/60">
              <td className="p-3">
                <input
                  type="checkbox"
                  checked={selectedExamIds.includes(exam.id)}
                  onChange={() => onToggleSelectExam(exam.id)}
                />
              </td>
              <td className="p-3 font-mono text-[#004ac6] font-semibold">{exam.id}</td>
              <td className="p-3 font-medium text-[#191c1e]">{exam.title}</td>
              <td className="p-3">{exam.subject}</td>
              <td className="p-3">
                {exam.questionCount} 題 / {exam.totalScore} 分
              </td>
              <td className="p-3">{exam.durationMinutes} 分鐘</td>
              <td className="p-3 text-right space-x-2">
                <button
                  type="button"
                  onClick={() => onPreviewExam(exam)}
                  className="text-[#004ac6] hover:underline cursor-pointer"
                >
                  預覽
                </button>
                <button
                  type="button"
                  onClick={() => onDeleteSingleExam(exam)}
                  className="text-[#ba1a1a] hover:underline cursor-pointer"
                >
                  刪除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

