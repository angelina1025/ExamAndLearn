import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Exam, ExamSessionState } from "@/types/exam";
import { loadSession, saveSession } from "./storage";
import { useExamSession } from "./useExamSession";

const exam: Exam = {
  id: "demo",
  title: "Demo",
  subtitle: "",
  durationSec: 600,
  questions: [
    { id: "q1", type: "single", prompt: "Q1", points: 2, options: [] },
    { id: "q2", type: "boolean", prompt: "Q2", points: 1, options: [] },
  ],
};

const NOW = new Date("2026-01-01T00:00:00.000Z").getTime();

function runningSession(
  deadline: number,
  answers: ExamSessionState["answers"] = {}
): ExamSessionState {
  return {
    examId: "demo",
    answers,
    flags: [],
    currentIndex: 0,
    remainingSec: 120,
    status: "running",
    deadline,
  };
}

describe("useExamSession", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
    vi.setSystemTime(NOW);
  });

  afterEach(() => {
    vi.useRealTimers();
    localStorage.clear();
  });

  it("hydrates a saved session", () => {
    saveSession(runningSession(NOW + 120_000, { q1: "A" }));

    const { result } = renderHook(() => useExamSession(exam));

    expect(result.current.ready).toBe(true);
    expect(result.current.state.answers.q1).toBe("A");
    expect(result.current.state.remainingSec).toBeGreaterThanOrEqual(119);
    expect(result.current.state.remainingSec).toBeLessThanOrEqual(120);
  });

  it("writes an initial session after hydration", () => {
    const { result } = renderHook(() => useExamSession(exam));

    expect(result.current.ready).toBe(true);
    const saved = loadSession(exam);
    expect(saved).not.toBeNull();
    expect(saved?.answers).toEqual({});
  });

  it("auto-submits when the deadline passes", () => {
    saveSession(runningSession(NOW + 2_000));

    const { result } = renderHook(() => useExamSession(exam));
    expect(result.current.ready).toBe(true);

    act(() => vi.advanceTimersByTime(2_000));
    act(() => vi.advanceTimersByTime(250));

    expect(result.current.state.status).toBe("submitted");
    expect(loadSession(exam)?.status).toBe("submitted");
  });

  it("saves the latest answer on pagehide", () => {
    const { result } = renderHook(() => useExamSession(exam));
    expect(result.current.ready).toBe(true);

    act(() => result.current.answer("q1", "A"));
    act(() => {
      window.dispatchEvent(new Event("pagehide"));
    });

    expect(loadSession(exam)?.answers.q1).toBe("A");
  });
});
