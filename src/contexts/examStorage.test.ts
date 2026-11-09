import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Exam, ExamSessionState } from "@/types/exam";
import { clearSession, loadSession, saveSession, storageKey } from "@/contexts/examStorage";

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

const state: ExamSessionState = {
  examId: "demo",
  answers: { q1: "A" },
  flags: ["q1"],
  currentIndex: 1,
  remainingSec: 300,
  status: "running",
  deadline: 1_000_000,
};

describe("storage", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("round-trips a session", () => {
    expect(saveSession(state)).toBe(true);
    expect(loadSession(exam, 700_000)).toEqual(state);
  });

  it("uses a versioned key", () => {
    expect(storageKey("demo")).toBe("exam-session:v1:demo");
  });

  it("returns null when nothing is stored", () => {
    expect(loadSession(exam)).toBeNull();
  });

  it("clears a session", () => {
    saveSession(state);
    clearSession("demo");
    expect(loadSession(exam)).toBeNull();
  });

  it("rejects a session for a different exam", () => {
    localStorage.setItem(storageKey("demo"), JSON.stringify({ ...state, examId: "other" }));
    expect(loadSession(exam)).toBeNull();
  });

  it("rejects malformed JSON and removes it", () => {
    localStorage.setItem(storageKey("demo"), "{not json");
    expect(loadSession(exam)).toBeNull();
    expect(localStorage.getItem(storageKey("demo"))).toBeNull();
  });

  it("rejects an out-of-range current index", () => {
    saveSession({ ...state, currentIndex: 99 });
    expect(loadSession(exam)).toBeNull();
  });

  it("auto-submits when the saved deadline has passed", () => {
    saveSession({ ...state, deadline: 1_000 });
    const loaded = loadSession(exam, 5_000);
    expect(loaded?.status).toBe("submitted");
    expect(loaded?.remainingSec).toBe(0);
  });

  it("recalculates remaining seconds from the deadline", () => {
    saveSession({ ...state, deadline: 305_000 });
    expect(loadSession(exam, 300_000)?.remainingSec).toBe(5);
  });
});
