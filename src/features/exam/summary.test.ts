import { describe, expect, it } from "vitest";
import type { Exam } from "@/types/exam";
import { countAnswered, countFlagged, getUnansweredNumbers, isAnswered } from "./summary";

const exam: Exam = {
  id: "demo",
  title: "Demo",
  subtitle: "",
  durationSec: 600,
  questions: [
    { id: "q1", type: "single", prompt: "Q1", points: 2, options: [] },
    { id: "q2", type: "multiple", prompt: "Q2", points: 3, options: [] },
    { id: "q3", type: "boolean", prompt: "Q3", points: 1, options: [] },
  ],
};

describe("isAnswered", () => {
  it("treats undefined and empty values as unanswered", () => {
    expect(isAnswered(undefined)).toBe(false);
    expect(isAnswered("")).toBe(false);
    expect(isAnswered([])).toBe(false);
  });

  it("treats selected values as answered", () => {
    expect(isAnswered("A")).toBe(true);
    expect(isAnswered(["A", "C"])).toBe(true);
  });
});

describe("countAnswered", () => {
  it("counts answered questions", () => {
    expect(countAnswered(exam, { q1: "A", q2: ["B", "C"], q3: "" })).toBe(2);
  });

  it("returns zero for an empty answer map", () => {
    expect(countAnswered(exam, {})).toBe(0);
  });
});

describe("getUnansweredNumbers", () => {
  it("returns 1-based question numbers", () => {
    expect(getUnansweredNumbers(exam, { q1: "A", q3: "F" })).toEqual([2]);
  });
});

describe("countFlagged", () => {
  it("counts flags that belong to the exam", () => {
    expect(countFlagged(exam, ["q1", "unknown"])).toBe(1);
  });
});
