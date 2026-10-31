import { describe, expect, it } from "vitest";
import type { ExamSessionState } from "@/types/exam";
import { createInitialState, examReducer } from "./examReducer";

function baseState(overrides: Partial<ExamSessionState> = {}): ExamSessionState {
  return {
    examId: "demo",
    answers: {},
    flags: [],
    currentIndex: 0,
    remainingSec: 600,
    status: "running",
    deadline: 1_000_000,
    ...overrides,
  };
}

describe("createInitialState", () => {
  it("starts running at the first question with full duration", () => {
    const state = createInitialState("demo", 600, 1_000_000);
    expect(state).toEqual({
      examId: "demo",
      answers: {},
      flags: [],
      currentIndex: 0,
      remainingSec: 600,
      status: "running",
      deadline: 1_000_000,
    });
  });
});

describe("examReducer", () => {
  it("stores a single answer", () => {
    const next = examReducer(baseState(), { type: "ANSWER", questionId: "q1", answer: "A" });
    expect(next.answers).toEqual({ q1: "A" });
  });

  it("stores a multiple answer", () => {
    const next = examReducer(baseState(), { type: "ANSWER", questionId: "q2", answer: ["A", "C"] });
    expect(next.answers.q2).toEqual(["A", "C"]);
  });

  it("ignores answers while paused", () => {
    const state = baseState({ status: "paused" });
    expect(examReducer(state, { type: "ANSWER", questionId: "q1", answer: "A" })).toBe(state);
  });

  it("toggles a flag on and off", () => {
    const on = examReducer(baseState(), { type: "TOGGLE_FLAG", questionId: "q1" });
    expect(on.flags).toEqual(["q1"]);
    const off = examReducer(on, { type: "TOGGLE_FLAG", questionId: "q1" });
    expect(off.flags).toEqual([]);
  });

  it("never duplicates a flag when toggled repeatedly", () => {
    const first = examReducer(baseState(), { type: "TOGGLE_FLAG", questionId: "q1" });
    const second = examReducer(first, { type: "TOGGLE_FLAG", questionId: "q1" });
    const third = examReducer(second, { type: "TOGGLE_FLAG", questionId: "q1" });
    expect(third.flags).toEqual(["q1"]);
  });

  it("clamps navigation to the exam bounds", () => {
    expect(examReducer(baseState(), { type: "GOTO", index: 5, total: 3 }).currentIndex).toBe(2);
    expect(examReducer(baseState(), { type: "GOTO", index: -2, total: 3 }).currentIndex).toBe(0);
  });

  it("updates remaining time on tick", () => {
    const next = examReducer(baseState(), { type: "TICK", remainingSec: 120 });
    expect(next.remainingSec).toBe(120);
    expect(next.status).toBe("running");
  });

  it("auto-submits when the timer reaches zero", () => {
    const next = examReducer(baseState(), { type: "TICK", remainingSec: 0 });
    expect(next.status).toBe("submitted");
    expect(next.deadline).toBeNull();
  });

  it("pauses and clears the deadline", () => {
    const next = examReducer(baseState(), { type: "PAUSE", remainingSec: 300 });
    expect(next.status).toBe("paused");
    expect(next.remainingSec).toBe(300);
    expect(next.deadline).toBeNull();
  });

  it("resumes with a new deadline", () => {
    const paused = baseState({ status: "paused", remainingSec: 300, deadline: null });
    const next = examReducer(paused, { type: "RESUME", deadline: 2_000_000 });
    expect(next.status).toBe("running");
    expect(next.deadline).toBe(2_000_000);
  });

  it("resets answers, flags, index and timer", () => {
    const state = baseState({
      answers: { q1: "A" },
      flags: ["q2"],
      currentIndex: 2,
      remainingSec: 10,
    });
    const next = examReducer(state, { type: "RESET", durationSec: 600, deadline: 3_000_000 });
    expect(next).toEqual({
      examId: "demo",
      answers: {},
      flags: [],
      currentIndex: 0,
      remainingSec: 600,
      status: "running",
      deadline: 3_000_000,
    });
  });

  it("submits and clears the deadline", () => {
    const next = examReducer(baseState(), { type: "SUBMIT" });
    expect(next.status).toBe("submitted");
    expect(next.deadline).toBeNull();
  });

  it("hydrates a saved state", () => {
    const saved = baseState({ remainingSec: 42, currentIndex: 1 });
    expect(examReducer(baseState(), { type: "HYDRATE", state: saved })).toBe(saved);
  });
});
