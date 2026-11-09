import { describe, expect, it } from "vitest";
import { ASSIGNED_EXAM_ID, getAssignedExam } from "@/services/publicSheet";

describe("getAssignedExam", () => {
  it("returns the assigned exam for the known id", async () => {
    const exam = await getAssignedExam(ASSIGNED_EXAM_ID);
    expect(exam).not.toBeNull();
    expect(exam?.id).toBe("assigned-demo");
    expect(exam?.title).toBe("計算機概論 模擬測驗");
    expect(exam?.subtitle).toBe("公職考試 ・ 50 題 ・ 60 分鐘");
    expect(exam?.durationSec).toBe(3600);
  });

  it("returns null for an unknown id", async () => {
    expect(await getAssignedExam("nope")).toBeNull();
  });

  it("provides 50 single-choice questions worth 2 points each", async () => {
    const exam = await getAssignedExam(ASSIGNED_EXAM_ID);
    expect(exam?.questions).toHaveLength(50);
    for (const question of exam?.questions ?? []) {
      expect(question.type).toBe("single");
      expect(question.points).toBe(2);
      expect(question.options).toHaveLength(4);
      expect(question.options.map((option) => option.id)).toEqual(["A", "B", "C", "D"]);
    }
  });

  it("uses unique question ids and a stable prefix", async () => {
    const exam = await getAssignedExam(ASSIGNED_EXAM_ID);
    const ids = exam?.questions.map((question) => question.id) ?? [];
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids.every((id) => id.startsWith("assigned-"))).toBe(true);
  });
});
