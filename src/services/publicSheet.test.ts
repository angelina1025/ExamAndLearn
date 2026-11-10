import { describe, expect, it } from "vitest";
import {
  ASSIGNED_EXAM_ID,
  getAssignedExam,
  parseRolesFromSheetRows,
  parseUsersFromSheetRows,
} from "@/services/publicSheet";

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

  it("dynamically resolves an exam paper from published exam papers", async () => {
    const mathExam = await getAssignedExam("EXAM-2024-MATH-081");
    expect(mathExam).not.toBeNull();
    expect(mathExam?.title).toContain("2024年高二數學期末統一測驗");
    expect(mathExam?.questions.length).toBeGreaterThan(0);
  });
});

describe("parseRolesFromSheetRows & parseUsersFromSheetRows", () => {
  it("parses roles and joins users.role with roles.code", () => {
    const roleRows = [
      ["id", "code", "name", "description", "created_at"],
      [1, "ADMIN", "管理員", "最高權限管理員", "2024-01-01 00:00:00"],
      [2, "USER", "用戶", "一般用戶", "2024-01-01 00:00:00"],
      [3, "GUEST", "訪客", "訪客權限", "2024-01-01 00:00:00"],
    ];

    const userRows = [
      [
        "id",
        "uuid",
        "status",
        "role",
        "name",
        "identifier",
        "credential",
        "google_sheet_URL",
        "last_login_at",
        "created_at",
        "updated_at",
      ],
      [
        1,
        "usr_001",
        1,
        "ADMIN",
        "王管理",
        "admin01",
        "pass123",
        "https://docs.google.com/spreadsheets/d/abc/edit",
        "2026-11-10 10:00:00",
        "2026-01-01 00:00:00",
        "2026-11-10 10:00:00",
      ],
      [
        2,
        "usr_002",
        0,
        "USER",
        "李停用",
        "user02",
        "pass456",
        "",
        "",
        "2026-01-01 00:00:00",
        "",
      ],
    ];

    const roles = parseRolesFromSheetRows(roleRows);
    expect(roles).toHaveLength(3);
    expect(roles[0]).toMatchObject({ code: "ADMIN", name: "管理員" });

    const users = parseUsersFromSheetRows(userRows, roles);
    expect(users).toHaveLength(2);
    expect(users[0]).toMatchObject({
      id: 1,
      uuid: "usr_001",
      status: 1,
      role: "ADMIN",
      roleName: "管理員",
      roleDescription: "最高權限管理員",
      name: "王管理",
      identifier: "admin01",
      credential: "pass123",
    });
    expect(users[1]).toMatchObject({
      id: 2,
      uuid: "usr_002",
      status: 0,
      role: "USER",
      roleName: "用戶",
      identifier: "user02",
    });
  });
});
