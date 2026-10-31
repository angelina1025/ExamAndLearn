import type { Exam, ExamSessionState } from "@/types/exam";
import { remainingFromDeadline } from "./timer";

const PREFIX = "exam-session:v1:";

export function storageKey(examId: string): string {
  return `${PREFIX}${examId}`;
}

export function isStorageAvailable(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const key = "__exam_storage_test__";
    window.localStorage.setItem(key, "1");
    window.localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

function isValidSession(value: unknown, exam: Exam): value is ExamSessionState {
  if (!value || typeof value !== "object") return false;
  const session = value as Record<string, unknown>;
  if (session.examId !== exam.id) return false;
  if (!["running", "paused", "submitted"].includes(session.status as string)) return false;
  if (typeof session.remainingSec !== "number" || session.remainingSec < 0) return false;
  if (
    typeof session.currentIndex !== "number" ||
    session.currentIndex < 0 ||
    session.currentIndex >= exam.questions.length
  ) {
    return false;
  }
  if (!Array.isArray(session.flags) || !session.flags.every((f) => typeof f === "string")) {
    return false;
  }
  if (!session.answers || typeof session.answers !== "object" || Array.isArray(session.answers)) {
    return false;
  }
  if (session.status === "running" && typeof session.deadline !== "number") return false;
  return true;
}

export function loadSession(exam: Exam, now: number = Date.now()): ExamSessionState | null {
  if (!isStorageAvailable()) return null;
  try {
    const raw = window.localStorage.getItem(storageKey(exam.id));
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!isValidSession(parsed, exam)) {
      window.localStorage.removeItem(storageKey(exam.id));
      return null;
    }
    if (parsed.status === "running" && parsed.deadline !== null) {
      const remainingSec = remainingFromDeadline(parsed.deadline, now);
      if (remainingSec === 0) {
        return { ...parsed, remainingSec: 0, status: "submitted", deadline: null };
      }
      return { ...parsed, remainingSec };
    }
    return parsed;
  } catch {
    try {
      window.localStorage.removeItem(storageKey(exam.id));
    } catch {
      // localStorage 不可用時忽略
    }
    return null;
  }
}

export function saveSession(state: ExamSessionState): boolean {
  if (!isStorageAvailable()) return false;
  try {
    window.localStorage.setItem(storageKey(state.examId), JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

export function clearSession(examId: string): void {
  if (!isStorageAvailable()) return;
  try {
    window.localStorage.removeItem(storageKey(examId));
  } catch {
    // 忽略
  }
}
