import { Question } from '@/types/question';
import { ExamPaper } from '@/types/exam';
import { AuditLog } from '@/types/user';

export interface SheetQuestionRow {
  id: string;
  test_id: string;
  question: string;
  option: string; // JSON string
  answer: string; // e.g. "A" or "A, C"
  explanation?: string;
}

export interface SheetExamRow {
  id: string;
  title: string;
  subtitle?: string;
  question_ids: string;
  duration_sec: number;
  passing_score?: number;
}

export interface CategoryItem {
  id: number;
  categories_name: string;
  parent_id: number;
  level: number;
  sort_order: number;
}

export interface SheetColumnDefinition {
  key: string;
  label: string;
  desc: string;
}

export interface SheetTableSchema {
  name: string;
  description: string;
  columns: SheetColumnDefinition[];
}

export interface ReadSpreadsheetResult {
  success: boolean;
  spreadsheetTitle: string;
  questions: Question[];
  publishedExams: ExamPaper[];
  draftExams: ExamPaper[];
  allExams: ExamPaper[];
  categories: CategoryItem[];
  auditLogs: AuditLog[];
  stats: Record<string, number>;
  message: string;
}
