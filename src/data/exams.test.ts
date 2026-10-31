import { describe, expect, it } from "vitest";
import { exams, getExam } from "./exams";

const EXPECTED = [
  { id: "ds-midterm", questionCount: 10, durationSec: 600 },
  { id: "cs-quiz", questionCount: 5, durationSec: 300 },
  { id: "os-final", questionCount: 15, durationSec: 1200 },
];

describe("exams", () => {
  it("provides three exams with unique ids", () => {
    expect(exams).toHaveLength(3);
    expect(exams.map((exam) => exam.id)).toEqual(EXPECTED.map((exam) => exam.id));
    expect(new Set(exams.map((exam) => exam.id)).size).toBe(exams.length);
  });

  it("matches the expected question count and duration per exam", () => {
    for (const expected of EXPECTED) {
      const exam = exams.find((item) => item.id === expected.id);
      expect(exam, `missing exam ${expected.id}`).toBeDefined();
      expect(exam?.questions).toHaveLength(expected.questionCount);
      expect(exam?.durationSec).toBe(expected.durationSec);
    }
  });

  it("uses unique question ids and valid options within each exam", () => {
    for (const exam of exams) {
      const questionIds = exam.questions.map((question) => question.id);
      expect(new Set(questionIds).size, `${exam.id} question ids`).toBe(questionIds.length);

      for (const question of exam.questions) {
        expect(question.options.length, `${question.id} option count`).toBeGreaterThanOrEqual(2);
        const optionIds = question.options.map((option) => option.id);
        expect(new Set(optionIds).size, `${question.id} option ids`).toBe(optionIds.length);
      }
    }
  });

  it("gives every question positive points and states the question count in the subtitle", () => {
    for (const expected of EXPECTED) {
      const exam = exams.find((item) => item.id === expected.id);
      expect(exam).toBeDefined();
      expect(exam?.subtitle).toContain(`${expected.questionCount} 題`);

      for (const question of exam?.questions ?? []) {
        expect(question.points, `${question.id} points`).toBeGreaterThan(0);
      }
    }
  });
});

describe("getExam", () => {
  it("returns the matching exam", () => {
    const exam = getExam("ds-midterm");
    expect(exam?.id).toBe("ds-midterm");
    expect(exam?.questions).toHaveLength(10);
  });

  it("returns undefined for an unknown id", () => {
    expect(getExam("nope")).toBeUndefined();
  });
});
