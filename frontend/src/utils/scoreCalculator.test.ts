import { describe, it, expect } from "vitest";

interface Question {
  id: string;
  subjectId: string;
  type: "single" | "multiple";
  content: string;
  difficulty: "easy" | "medium" | "hard";
  points: number;
  tags: string[];
  updatedAt: string;
  correctAnswer: string;
}

function calculateExamScore(
  questions: Question[],
  answers: Record<string, string[]>
) {
  let score = 0;
  let correctCount = 0;
  let wrongCount = 0;
  let unansweredCount = 0;

  for (const q of questions) {
    const userAns = answers[q.id];
    if (!userAns || userAns.length === 0) {
      unansweredCount++;
      continue;
    }
    const expected = q.correctAnswer
      .split(",")
      .map((s) => s.trim())
      .sort();
    const actual = [...userAns].map((s) => s.trim()).sort();
    const isCorrect =
      expected.length === actual.length &&
      expected.every((val, idx) => val === actual[idx]);

    if (isCorrect) {
      score += q.points;
      correctCount++;
    } else {
      wrongCount++;
    }
  }

  return { score, correctCount, wrongCount, unansweredCount };
}

describe("calculateExamScore (Decision Table)", () => {
  const sampleQuestions: Question[] = [
    {
      id: "Q-SINGLE-1",
      subjectId: "math",
      type: "single",
      content: "1 + 1 = ?",
      difficulty: "easy",
      points: 10,
      tags: ["math"],
      updatedAt: "2026-11-19",
      correctAnswer: "A",
    },
    {
      id: "Q-MULTI-1",
      subjectId: "english",
      type: "multiple",
      content: "Select vowels",
      difficulty: "medium",
      points: 10,
      tags: ["english"],
      updatedAt: "2026-11-19",
      correctAnswer: "A, C",
    },
  ];

  it("R1: 單選與複選皆全對時給予滿分", () => {
    const res = calculateExamScore(sampleQuestions, {
      "Q-SINGLE-1": ["A"],
      "Q-MULTI-1": ["C", "A"],
    });
    expect(res.score).toBe(20);
    expect(res.correctCount).toBe(2);
    expect(res.wrongCount).toBe(0);
    expect(res.unansweredCount).toBe(0);
  });

  it("R2: 複選題少選或多選皆判定為錯誤（不給部分分）", () => {
    const partialRes = calculateExamScore(sampleQuestions, {
      "Q-SINGLE-1": ["A"],
      "Q-MULTI-1": ["A"],
    });
    expect(partialRes.score).toBe(10);
    expect(partialRes.wrongCount).toBe(1);

    const extraRes = calculateExamScore(sampleQuestions, {
      "Q-SINGLE-1": ["A"],
      "Q-MULTI-1": ["A", "B", "C"],
    });
    expect(extraRes.score).toBe(10);
    expect(extraRes.wrongCount).toBe(1);
  });

  it("R3: 未作答題目計入 unansweredCount 且不計分", () => {
    const res = calculateExamScore(sampleQuestions, {});
    expect(res.score).toBe(0);
    expect(res.unansweredCount).toBe(2);
  });
});
