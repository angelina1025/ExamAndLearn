import type { Exam } from "@/types/exam";
import { assignedExam } from "./assignedExamData";

export const ASSIGNED_EXAM_ID = "assigned-demo";

export async function getAssignedExam(examId: string): Promise<Exam | null> {
  if (examId !== ASSIGNED_EXAM_ID) return null;
  return assignedExam;
}
