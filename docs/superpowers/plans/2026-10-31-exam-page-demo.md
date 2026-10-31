# 考試頁面展示版 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 用 Next.js 建立一個可在本地獨立執行、全響應式的考試頁面展示版，完整呈現架構圖中的 14 項功能。

**Architecture:** Next.js App Router + TypeScript + Tailwind CSS v4。考試狀態集中於 `examReducer`，由 `useExamSession` 提供 actions 並同步 `localStorage`；UI 由 `ExamClient` 組合 header、題目清單、題目地圖、暫停遮罩、交卷確認與成功畫面。

**Tech Stack:** Next.js 16.4.3、React 19、TypeScript、Tailwind CSS 4.3.3、Vitest 5、React Testing Library。

**Spec:** `docs/superpowers/specs/2026-10-31-exam-page-demo-design.md`

---

## 檔案結構

| 檔案 | 責任 |
|---|---|
| `src/types/exam.ts` | 考試、題目、作答、session 型別 |
| `src/features/exam/timer.ts` | `mm:ss` 格式化、依 deadline 計算剩餘秒數 |
| `src/features/exam/summary.ts` | 已答題數、未答題號、標註數 |
| `src/features/exam/examReducer.ts` | 純函式狀態轉移、初始狀態 |
| `src/features/exam/storage.ts` | localStorage 讀寫、版本與形狀驗證 |
| `src/features/exam/useExamSession.ts` | reducer、計時器、持久化、actions |
| `src/data/exams.ts` | 三份 mock 考卷（10／5／15 題） |
| `src/app/globals.css` | C 校務風格設計變數與元件樣式 |
| `src/app/page.tsx` | 試卷選擇頁（Server Component） |
| `src/components/exam/ExamList.tsx` | 試卷清單、已完成狀態、重新測試 |
| `src/app/exam/[examId]/page.tsx` | 考試頁路由（Server Component） |
| `src/components/exam/ExamClient.tsx` | 考試頁 Client Component、scroll spy、版面 |
| `src/components/exam/ExamHeader.tsx` | 標題、倒數、進度、返回、暫停、交卷 |
| `src/components/exam/QuestionCard.tsx` | 題目、選項、標註 |
| `src/components/exam/QuestionMap.tsx` | 題目地圖與狀態 |
| `src/components/exam/PauseOverlay.tsx` | 暫停遮罩與重新測試 |
| `src/components/exam/SubmitDialog.tsx` | 交卷確認 |
| `src/components/exam/SuccessView.tsx` | 交卷成功 |
| `src/app/not-found.tsx` | 找不到考卷 |

---

## Task 1: 建立 Next.js 專案與測試工具

**Files:**
- Create: 整個 Next.js 專案骨架
- Create: `vitest.config.mts`
- Create: `src/test/setup.ts`
- Modify: `package.json`

- [ ] **Step 1: 在暫存資料夾建立 Next.js 專案**

執行：

```powershell
npx create-next-app@16.4.3 .next-scaffold --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --yes
```

預期：出現 `Success! Created ...`，`.next-scaffold` 內有 `src/app`、`package.json`、`next.config.ts`。

- [ ] **Step 2: 把骨架搬進專案根目錄**

執行：

```powershell
Get-ChildItem .next-scaffold -Force | Where-Object { $_.Name -notin @(".git", "node_modules", ".next") } | Move-Item -Destination .
Remove-Item .next-scaffold -Recurse -Force
npm install
```

預期：根目錄出現 `src/`、`public/`、`package.json`、`tsconfig.json`、`next.config.ts`、`postcss.config.mjs`、`eslint.config.mjs`；`docs/` 與 `.git/` 不受影響。

- [ ] **Step 3: 安裝測試套件**

執行：

```powershell
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm pkg set scripts.test="vitest run" scripts.test:watch="vitest"
```

預期：`package.json` 的 `scripts` 含 `"test": "vitest run"` 與 `"test:watch": "vitest"`。

- [ ] **Step 4: 建立 Vitest 設定**

Create `vitest.config.mts`：

```ts
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const srcDir = fileURLToPath(new URL("./src", import.meta.url));

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
  },
  resolve: {
    alias: { "@": srcDir },
  },
});
```

- [ ] **Step 5: 建立測試初始化檔**

Create `src/test/setup.ts`：

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 6: 確認空測試可執行**

執行：

```powershell
npm test
```

預期：Vitest 啟動，顯示 `No test files found` 並以 exit code 1 結束。這是預期行為，下一步才會有測試。

- [ ] **Step 7: Commit**

```powershell
git add package.json package-lock.json src public next.config.ts postcss.config.mjs eslint.config.mjs tsconfig.json next-env.d.ts vitest.config.mts .gitignore README.md
git commit -m "chore: scaffold Next.js project with Vitest"
```

---

## Task 2: 型別、時間與摘要工具

**Files:**
- Create: `src/types/exam.ts`
- Create: `src/features/exam/timer.ts`
- Create: `src/features/exam/timer.test.ts`
- Create: `src/features/exam/summary.ts`
- Create: `src/features/exam/summary.test.ts`

- [ ] **Step 1: 建立型別**

Create `src/types/exam.ts`：

```ts
export type QuestionType = "single" | "multiple" | "boolean";

export interface ExamOption {
  id: string;
  text: string;
}

export interface ExamQuestion {
  id: string;
  type: QuestionType;
  prompt: string;
  options: ExamOption[];
  points: number;
}

export interface Exam {
  id: string;
  title: string;
  subtitle: string;
  durationSec: number;
  questions: ExamQuestion[];
}

export type Answer = string | string[];

export type ExamStatus = "running" | "paused" | "submitted";

export interface ExamSessionState {
  examId: string;
  answers: Record<string, Answer>;
  flags: string[];
  currentIndex: number;
  remainingSec: number;
  status: ExamStatus;
  deadline: number | null;
}
```

- [ ] **Step 2: 寫時間工具的失敗測試**

Create `src/features/exam/timer.test.ts`：

```ts
import { describe, expect, it } from "vitest";
import { formatTime, remainingFromDeadline } from "./timer";

describe("formatTime", () => {
  it("formats seconds as mm:ss", () => {
    expect(formatTime(9 * 60 + 42)).toBe("09:42");
  });

  it("pads single-digit seconds", () => {
    expect(formatTime(65)).toBe("01:05");
  });

  it("never shows negative values", () => {
    expect(formatTime(-5)).toBe("00:00");
  });

  it("shows zero as 00:00", () => {
    expect(formatTime(0)).toBe("00:00");
  });
});

describe("remainingFromDeadline", () => {
  it("rounds partial seconds up", () => {
    expect(remainingFromDeadline(10_500, 10_000)).toBe(1);
  });

  it("returns zero after the deadline", () => {
    expect(remainingFromDeadline(9_000, 10_000)).toBe(0);
  });

  it("returns full seconds when exactly on the second", () => {
    expect(remainingFromDeadline(70_000, 10_000)).toBe(60);
  });
});
```

- [ ] **Step 3: 執行測試確認失敗**

執行：

```powershell
npm test -- src/features/exam/timer.test.ts
```

預期：FAIL，訊息包含 `Cannot find module './timer'`。

- [ ] **Step 4: 實作時間工具**

Create `src/features/exam/timer.ts`：

```ts
export function formatTime(totalSec: number): string {
  const safe = Math.max(0, Math.floor(totalSec));
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function remainingFromDeadline(deadline: number, now: number = Date.now()): number {
  return Math.max(0, Math.ceil((deadline - now) / 1000));
}
```

- [ ] **Step 5: 執行測試確認通過**

執行：

```powershell
npm test -- src/features/exam/timer.test.ts
```

預期：`7 tests passed`。

- [ ] **Step 6: 寫摘要工具的失敗測試**

Create `src/features/exam/summary.test.ts`：

```ts
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
```

- [ ] **Step 7: 執行測試確認失敗**

執行：

```powershell
npm test -- src/features/exam/summary.test.ts
```

預期：FAIL，訊息包含 `Cannot find module './summary'`。

- [ ] **Step 8: 實作摘要工具**

Create `src/features/exam/summary.ts`：

```ts
import type { Answer, Exam } from "@/types/exam";

export function isAnswered(answer: Answer | undefined): boolean {
  if (answer === undefined) return false;
  return Array.isArray(answer) ? answer.length > 0 : answer !== "";
}

export function countAnswered(exam: Exam, answers: Record<string, Answer>): number {
  return exam.questions.filter((question) => isAnswered(answers[question.id])).length;
}

export function getUnansweredNumbers(exam: Exam, answers: Record<string, Answer>): number[] {
  return exam.questions
    .map((question, index) => ({ question, number: index + 1 }))
    .filter(({ question }) => !isAnswered(answers[question.id]))
    .map(({ number }) => number);
}

export function countFlagged(exam: Exam, flags: string[]): number {
  const ids = new Set(exam.questions.map((question) => question.id));
  return flags.filter((id) => ids.has(id)).length;
}
```

- [ ] **Step 9: 執行測試確認通過**

執行：

```powershell
npm test -- src/features/exam/timer.test.ts src/features/exam/summary.test.ts
```

預期：全部通過。

- [ ] **Step 10: Commit**

```powershell
git add src/types/exam.ts src/features/exam
git commit -m "feat: add exam types, timer and summary utilities"
```

---

## Task 3: 考試狀態 reducer

**Files:**
- Create: `src/features/exam/examReducer.ts`
- Create: `src/features/exam/examReducer.test.ts`

- [ ] **Step 1: 寫 reducer 的失敗測試**

Create `src/features/exam/examReducer.test.ts`：

```ts
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
```

- [ ] **Step 2: 執行測試確認失敗**

執行：

```powershell
npm test -- src/features/exam/examReducer.test.ts
```

預期：FAIL，訊息包含 `Cannot find module './examReducer'`。

- [ ] **Step 3: 實作 reducer**

Create `src/features/exam/examReducer.ts`：

```ts
import type { Answer, ExamSessionState } from "@/types/exam";

export type ExamAction =
  | { type: "ANSWER"; questionId: string; answer: Answer }
  | { type: "TOGGLE_FLAG"; questionId: string }
  | { type: "GOTO"; index: number; total: number }
  | { type: "TICK"; remainingSec: number }
  | { type: "PAUSE"; remainingSec: number }
  | { type: "RESUME"; deadline: number }
  | { type: "RESET"; durationSec: number; deadline: number }
  | { type: "SUBMIT" }
  | { type: "HYDRATE"; state: ExamSessionState };

export function createInitialState(
  examId: string,
  durationSec: number,
  deadline: number
): ExamSessionState {
  return {
    examId,
    answers: {},
    flags: [],
    currentIndex: 0,
    remainingSec: durationSec,
    status: "running",
    deadline,
  };
}

export function examReducer(state: ExamSessionState, action: ExamAction): ExamSessionState {
  switch (action.type) {
    case "ANSWER":
      if (state.status !== "running") return state;
      return {
        ...state,
        answers: { ...state.answers, [action.questionId]: action.answer },
      };

    case "TOGGLE_FLAG": {
      if (state.status !== "running") return state;
      const flagged = state.flags.includes(action.questionId);
      return {
        ...state,
        flags: flagged
          ? state.flags.filter((id) => id !== action.questionId)
          : [...state.flags, action.questionId],
      };
    }

    case "GOTO": {
      if (state.status === "submitted") return state;
      const max = Math.max(action.total - 1, 0);
      const index = Math.min(Math.max(action.index, 0), max);
      if (index === state.currentIndex) return state;
      return { ...state, currentIndex: index };
    }

    case "TICK": {
      if (state.status !== "running") return state;
      const remainingSec = Math.max(0, action.remainingSec);
      if (remainingSec === state.remainingSec) return state;
      if (remainingSec === 0) {
        return { ...state, remainingSec: 0, status: "submitted", deadline: null };
      }
      return { ...state, remainingSec };
    }

    case "PAUSE":
      if (state.status !== "running") return state;
      return {
        ...state,
        status: "paused",
        remainingSec: Math.max(0, action.remainingSec),
        deadline: null,
      };

    case "RESUME":
      if (state.status !== "paused") return state;
      return { ...state, status: "running", deadline: action.deadline };

    case "RESET":
      return createInitialState(state.examId, action.durationSec, action.deadline);

    case "SUBMIT":
      if (state.status === "submitted") return state;
      return { ...state, status: "submitted", deadline: null };

    case "HYDRATE":
      return action.state;

    default:
      return state;
  }
}
```

- [ ] **Step 4: 執行測試確認通過**

執行：

```powershell
npm test -- src/features/exam/examReducer.test.ts
```

預期：`13 tests passed`。

- [ ] **Step 5: Commit**

```powershell
git add src/features/exam/examReducer.ts src/features/exam/examReducer.test.ts
git commit -m "feat: add exam session reducer"
```

---

## Task 4: localStorage 與考試 session hook

**Files:**
- Create: `src/features/exam/storage.ts`
- Create: `src/features/exam/storage.test.ts`
- Create: `src/features/exam/useExamSession.ts`

- [ ] **Step 1: 寫 storage 的失敗測試**

Create `src/features/exam/storage.test.ts`：

```ts
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Exam, ExamSessionState } from "@/types/exam";
import { clearSession, loadSession, saveSession, storageKey } from "./storage";

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
```

- [ ] **Step 2: 執行測試確認失敗**

執行：

```powershell
npm test -- src/features/exam/storage.test.ts
```

預期：FAIL，訊息包含 `Cannot find module './storage'`。

- [ ] **Step 3: 實作 storage**

Create `src/features/exam/storage.ts`：

```ts
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
```

- [ ] **Step 4: 執行測試確認通過**

執行：

```powershell
npm test -- src/features/exam/storage.test.ts
```

預期：`9 tests passed`。

- [ ] **Step 5: 實作 useExamSession**

Create `src/features/exam/useExamSession.ts`：

```ts
"use client";

import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import type { Answer, Exam, ExamSessionState } from "@/types/exam";
import { createInitialState, examReducer } from "./examReducer";
import { isStorageAvailable, loadSession, saveSession } from "./storage";
import { remainingFromDeadline } from "./timer";

export function useExamSession(exam: Exam) {
  const [state, dispatch] = useReducer(examReducer, undefined, () =>
    createInitialState(exam.id, exam.durationSec, Date.now() + exam.durationSec * 1000)
  );
  const [ready, setReady] = useState(false);
  const [storageWarning, setStorageWarning] = useState(false);
  const stateRef = useRef(state);
  const previousRef = useRef<ExamSessionState | null>(null);

  stateRef.current = state;

  useEffect(() => {
    const saved = loadSession(exam);
    if (saved) dispatch({ type: "HYDRATE", state: saved });
    setStorageWarning(!isStorageAvailable());
    setReady(true);
  }, [exam]);

  useEffect(() => {
    if (!ready) return;
    const previous = previousRef.current;
    const onlyTimerChanged =
      previous !== null &&
      previous.remainingSec !== state.remainingSec &&
      previous.answers === state.answers &&
      previous.flags === state.flags &&
      previous.currentIndex === state.currentIndex &&
      previous.status === state.status &&
      previous.deadline === state.deadline;
    if (onlyTimerChanged && state.remainingSec % 5 !== 0 && state.remainingSec !== 0) return;
    if (!saveSession(state)) setStorageWarning(true);
    previousRef.current = state;
  }, [ready, state]);

  useEffect(() => {
    if (!ready || state.status !== "running" || state.deadline === null) return;
    const deadline = state.deadline;
    const tick = () => {
      dispatch({ type: "TICK", remainingSec: remainingFromDeadline(deadline) });
    };
    tick();
    const timer = window.setInterval(tick, 250);
    return () => window.clearInterval(timer);
  }, [ready, state.deadline, state.status]);

  useEffect(() => {
    const handler = () => saveSession(stateRef.current);
    window.addEventListener("pagehide", handler);
    return () => window.removeEventListener("pagehide", handler);
  }, []);

  const actions = useMemo(
    () => ({
      answer(questionId: string, answer: Answer) {
        dispatch({ type: "ANSWER", questionId, answer });
      },
      toggleFlag(questionId: string) {
        dispatch({ type: "TOGGLE_FLAG", questionId });
      },
      goTo(index: number) {
        dispatch({ type: "GOTO", index, total: exam.questions.length });
      },
      pause() {
        const current = stateRef.current;
        if (current.status !== "running") return;
        const remainingSec = current.deadline
          ? remainingFromDeadline(current.deadline)
          : current.remainingSec;
        dispatch({ type: "PAUSE", remainingSec });
      },
      resume() {
        dispatch({
          type: "RESUME",
          deadline: Date.now() + stateRef.current.remainingSec * 1000,
        });
      },
      reset() {
        dispatch({
          type: "RESET",
          durationSec: exam.durationSec,
          deadline: Date.now() + exam.durationSec * 1000,
        });
      },
      submit() {
        dispatch({ type: "SUBMIT" });
      },
    }),
    [exam.durationSec, exam.questions.length]
  );

  return { state, ready, storageWarning, ...actions };
}
```

- [ ] **Step 6: 執行型別檢查**

執行：

```powershell
npx tsc --noEmit
```

預期：沒有錯誤。

- [ ] **Step 7: Commit**

```powershell
git add src/features/exam/storage.ts src/features/exam/storage.test.ts src/features/exam/useExamSession.ts
git commit -m "feat: persist exam sessions and expose session hook"
```

## Task 5: Mock 考卷資料

**Files:**
- Create: `src/data/exams.ts`

- [ ] **Step 1: 建立三份 mock 考卷**

Create `src/data/exams.ts`：

```ts
import type { Exam, ExamQuestion } from "@/types/exam";

const OPTION_IDS = ["A", "B", "C", "D"];

function choice(
  id: string,
  type: "single" | "multiple",
  prompt: string,
  options: string[],
  points: number
): ExamQuestion {
  return {
    id,
    type,
    prompt,
    points,
    options: options.map((text, index) => ({ id: OPTION_IDS[index], text })),
  };
}

function bool(id: string, prompt: string, points = 1): ExamQuestion {
  return {
    id,
    type: "boolean",
    prompt,
    points,
    options: [
      { id: "T", text: "是（True）" },
      { id: "F", text: "否（False）" },
    ],
  };
}

export const exams: Exam[] = [
  {
    id: "ds-midterm",
    title: "資料結構與演算法 期中測驗",
    subtitle: "資工系二年級 ・ 10 題 ・ 10 分鐘",
    durationSec: 10 * 60,
    questions: [
      choice(
        "ds-01",
        "single",
        "下列哪一種資料結構最適合實作「後進先出（LIFO）」的操作？",
        ["佇列（Queue）", "堆疊（Stack）", "鏈結串列（Linked List）", "二元搜尋樹（BST）"],
        2
      ),
      choice(
        "ds-02",
        "multiple",
        "關於二元搜尋樹（Binary Search Tree），下列敘述哪些正確？",
        [
          "左子樹中所有節點的值皆小於根節點",
          "中序走訪（In-order）可得到遞增序列",
          "樹高必定為 O(log n)",
          "最差情況下可能退化為鏈結串列",
        ],
        3
      ),
      bool("ds-03", "雜湊表（Hash Table）在理想情況下，搜尋、插入與刪除的平均時間複雜度皆為 O(1)。"),
      choice(
        "ds-04",
        "single",
        "在含有 n 個節點的完整二元樹中，樹高約為下列何者？",
        ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        2
      ),
      choice(
        "ds-05",
        "multiple",
        "下列哪些應用通常會使用堆疊（Stack）？",
        ["函式呼叫與遞迴", "括號匹配檢查", "作業系統的工作排程佇列", "深度優先搜尋（DFS）"],
        3
      ),
      choice(
        "ds-06",
        "single",
        "佇列（Queue）遵循下列哪一種存取順序？",
        ["後進先出（LIFO）", "先進先出（FIFO）", "隨機存取", "依優先權存取"],
        2
      ),
      bool("ds-07", "陣列（Array）可以透過索引在 O(1) 時間內存取任一元素。"),
      choice(
        "ds-08",
        "single",
        "在單向鏈結串列中，於「頭部」插入一個新節點的時間複雜度為何？",
        ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        2
      ),
      choice(
        "ds-09",
        "multiple",
        "下列哪些排序演算法屬於「穩定排序」（Stable Sort）？",
        ["合併排序（Merge Sort）", "快速排序（Quick Sort）", "插入排序（Insertion Sort）", "氣泡排序（Bubble Sort）"],
        3
      ),
      choice(
        "ds-10",
        "single",
        "深度優先搜尋（DFS）通常使用哪一種資料結構來保存待拜訪節點？",
        ["佇列", "堆疊", "雜湊表", "最小堆積"],
        2
      ),
    ],
  },
  {
    id: "cs-quiz",
    title: "計算機概論 小考",
    subtitle: "大一必修 ・ 5 題 ・ 5 分鐘",
    durationSec: 5 * 60,
    questions: [
      choice(
        "cs-01",
        "single",
        "CPU 排程（CPU Scheduling）的主要目的為何？",
        ["降低硬碟容量", "提高 CPU 使用率並縮短等待時間", "增加記憶體容量", "壓縮網路封包"],
        2
      ),
      choice(
        "cs-02",
        "single",
        "二進位數 1011 的十進位值為何？",
        ["9", "10", "11", "13"],
        2
      ),
      choice(
        "cs-03",
        "multiple",
        "下列哪些屬於作業系統的主要功能？",
        ["記憶體管理", "檔案系統管理", "編譯原始碼", "行程（Process）管理"],
        3
      ),
      bool("cs-04", "1 個位元組（Byte）等於 8 個位元（Bit）。"),
      choice(
        "cs-05",
        "single",
        "快取記憶體（Cache）的主要作用為何？",
        ["永久儲存資料", "加快 CPU 存取常用資料的速度", "負責網路路由", "提供螢幕顯示"],
        2
      ),
    ],
  },
  {
    id: "os-final",
    title: "作業系統 期末測驗",
    subtitle: "資工系三年級 ・ 15 題 ・ 20 分鐘",
    durationSec: 20 * 60,
    questions: [
      choice(
        "os-01",
        "single",
        "同一行程（Process）中的多個執行緒（Thread）通常共用下列哪一項資源？",
        ["堆疊（Stack）", "程式計數器（Program Counter）", "堆積（Heap）與全域變數", "暫存器（Register）"],
        2
      ),
      choice(
        "os-02",
        "multiple",
        "發生死結（Deadlock）必須同時滿足哪些條件？",
        ["互斥（Mutual Exclusion）", "持有並等待（Hold and Wait）", "不可剝奪（No Preemption）", "循環等待（Circular Wait）"],
        3
      ),
      bool("os-03", "虛擬記憶體（Virtual Memory）可以讓程式使用的位址空間大於實體記憶體。"),
      choice(
        "os-04",
        "single",
        "當行程存取的頁面不在實體記憶體中時，會發生下列哪一種情況？",
        ["Context Switch", "Page Fault", "Deadlock", "Starvation"],
        2
      ),
      choice(
        "os-05",
        "multiple",
        "下列哪些排程演算法屬於「可搶先式」（Preemptive）？",
        ["Round Robin", "SRTF（Shortest Remaining Time First）", "FCFS", "優先權排程（可搶先版本）"],
        3
      ),
      choice(
        "os-06",
        "single",
        "號誌（Semaphore）最常被用來解決下列哪一類問題？",
        ["同步與互斥", "磁碟重組", "記憶體壓縮", "網路封包加密"],
        2
      ),
      bool("os-07", "同一行程中的所有執行緒共用同一份堆積（Heap）記憶體。"),
      choice(
        "os-08",
        "single",
        "系統因過度分頁（Paging）導致 CPU 使用率大幅下降，這種現象稱為？",
        ["Thrashing", "Aging", "Spooling", "Buffering"],
        2
      ),
      choice(
        "os-09",
        "multiple",
        "下列哪些是常見的檔案配置方法？",
        ["連續配置（Contiguous Allocation）", "鏈結配置（Linked Allocation）", "索引配置（Indexed Allocation）", "隨機配置（Random Allocation）"],
        3
      ),
      choice(
        "os-10",
        "single",
        "行程切換（Context Switch）時，系統主要儲存與還原下列哪一項？",
        ["硬碟分割表", "CPU 暫存器與程式計數器", "網路 IP 位址", "螢幕解析度"],
        2
      ),
      bool("os-11", "採用優先權排程時，低優先權行程可能長時間得不到 CPU，這種情況稱為飢餓（Starvation）。"),
      choice(
        "os-12",
        "single",
        "LRU（Least Recently Used）頁面置換演算法會優先換出下列哪一種頁面？",
        ["最常被使用", "最久未被使用", "編號最大", "最早載入"],
        2
      ),
      choice(
        "os-13",
        "multiple",
        "下列哪些屬於行程間通訊（IPC）機制？",
        ["Pipe", "Shared Memory", "Message Queue", "Register"],
        3
      ),
      bool("os-14", "作業系統的核心模式（Kernel Mode）可以直接存取硬體與特權指令。"),
      choice(
        "os-15",
        "single",
        "磁碟排程演算法 SSTF 的選取原則是什麼？",
        ["先來先服務", "選擇離目前磁頭最近的請求", "選擇編號最大的請求", "隨機選取請求"],
        2
      ),
    ],
  },
];

export function getExam(id: string): Exam | undefined {
  return exams.find((exam) => exam.id === id);
}
```

- [ ] **Step 2: 執行型別檢查**

執行：

```powershell
npx tsc --noEmit
```

預期：沒有錯誤。

- [ ] **Step 3: Commit**

```powershell
git add src/data/exams.ts
git commit -m "feat: add mock exam data"
```

---

## Task 6: C 校務風格樣式與試卷選擇頁

**Files:**
- Modify: `src/app/globals.css`（整份取代）
- Modify: `src/app/layout.tsx`（整份取代）
- Modify: `src/app/page.tsx`（整份取代）
- Create: `src/components/exam/ExamList.tsx`

- [ ] **Step 1: 建立設計變數與共用樣式**

把 `src/app/globals.css` 整份取代為：

```css
@import "tailwindcss";

:root {
  --exam-navy: #2f5597;
  --exam-navy-dark: #24437a;
  --exam-ink: #1f2937;
  --exam-muted: #5b6673;
  --exam-line: #9aa8b8;
  --exam-soft-line: #d5dce4;
  --exam-bg: #eef1f5;
  --exam-gold: #e0b64a;
  --exam-red: #c0392b;
}

body {
  background: var(--exam-bg);
  color: var(--exam-ink);
  font-family: "Microsoft JhengHei", "Noto Sans TC", system-ui, sans-serif;
}

.exam-shell {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding-left: 16px;
  padding-right: 16px;
}

.exam-topbar {
  background: var(--exam-navy);
  color: #fff;
  border-bottom: 1px solid var(--exam-navy-dark);
}

.exam-card {
  background: #fff;
  border: 1px solid var(--exam-line);
  border-radius: 0;
}

.exam-btn {
  border: 1px solid #8b9aab;
  background: #f7f9fb;
  color: var(--exam-ink);
  padding: 6px 12px;
  font-size: 13px;
  line-height: 1.4;
  cursor: pointer;
}

.exam-btn:hover:not(:disabled) {
  background: #eef2f7;
}

.exam-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.exam-btn-primary {
  background: var(--exam-red);
  border-color: #a93226;
  color: #fff;
}

.exam-btn-primary:hover:not(:disabled) {
  background: #a93226;
}

.exam-btn-onnavy {
  background: #3f6bb5;
  border-color: #6f8fc4;
  color: #fff;
}

.exam-btn-onnavy:hover:not(:disabled) {
  background: #4a78c4;
}

.exam-chip {
  display: inline-flex;
  align-items: center;
  border: 1px solid #b8c3d1;
  background: #f4f6f9;
  color: #35465c;
  padding: 2px 8px;
  font-size: 11px;
  line-height: 1.6;
}

.exam-chip-done {
  border-color: #b8c9e0;
  background: #e8eef7;
  color: var(--exam-navy);
}

.exam-chip-flag {
  border-color: #b8942f;
  background: var(--exam-gold);
  color: #3d2b00;
}

.exam-option {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  border: 1px solid #c3ccd7;
  background: #fbfcfd;
  padding: 10px 12px;
  text-align: left;
  font-size: 14px;
  line-height: 1.6;
  cursor: pointer;
}

.exam-option:hover {
  background: #f1f5fa;
}

.exam-option[data-selected="true"] {
  border-color: var(--exam-navy);
  background: #e8eef7;
}

.exam-mark {
  display: grid;
  place-items: center;
  flex: none;
  width: 18px;
  height: 18px;
  margin-top: 2px;
  border: 1.5px solid #8fa0b4;
  border-radius: 9999px;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
}

.exam-option[data-multiple="true"] .exam-mark {
  border-radius: 2px;
}

.exam-option[data-selected="true"] .exam-mark {
  background: var(--exam-navy);
  border-color: var(--exam-navy);
}

.exam-question {
  scroll-margin-top: 104px;
}

@media (max-width: 767px) {
  .exam-question {
    scroll-margin-top: 132px;
  }
}

.exam-num {
  position: relative;
  display: grid;
  place-items: center;
  aspect-ratio: 1;
  border: 1px solid #aeb9c6;
  background: #fbfcfd;
  color: #2d3b4c;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}

.exam-num[data-done="true"] {
  background: var(--exam-navy);
  border-color: var(--exam-navy-dark);
  color: #fff;
}

.exam-num[data-flagged="true"] {
  background: var(--exam-gold);
  border-color: #b8942f;
  color: #3d2b00;
}

.exam-num[data-current="true"] {
  outline: 2px solid var(--exam-navy);
  outline-offset: 1px;
}

.exam-progress-track {
  height: 8px;
  background: #d7dee8;
  overflow: hidden;
}

.exam-progress-fill {
  height: 100%;
  background: var(--exam-gold);
  transition: width 150ms ease;
}

.timer-danger {
  color: #ff8080;
}

.exam-overlay {
  position: fixed;
  inset: 0;
  z-index: 60;
  display: grid;
  place-items: center;
  padding: 16px;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(6px);
}
```

- [ ] **Step 2: 建立根 layout**

把 `src/app/layout.tsx` 整份取代為：

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ExamAndLearn 線上測驗",
  description: "考試頁面展示版",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: 建立試卷清單元件**

Create `src/components/exam/ExamList.tsx`：

```tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { clearSession, loadSession } from "@/features/exam/storage";
import { formatTime } from "@/features/exam/timer";
import type { Exam } from "@/types/exam";

export function ExamList({ exams }: { exams: Exam[] }) {
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    setCompleted(
      exams
        .filter((exam) => loadSession(exam)?.status === "submitted")
        .map((exam) => exam.id)
    );
  }, [exams]);

  function handleStart(event: MouseEvent<HTMLAnchorElement>, exam: Exam) {
    if (!completed.includes(exam.id)) return;
    if (!window.confirm("這份考卷已完成，要重新測試嗎？")) {
      event.preventDefault();
      return;
    }
    clearSession(exam.id);
  }

  return (
    <div className="exam-card">
      <div className="hidden border-b border-[#9aa8b8] bg-[#f4f6f9] px-4 py-2 text-xs font-bold text-[#35465c] md:grid md:grid-cols-[1fr_80px_100px_120px]">
        <span>試卷名稱</span>
        <span>題數</span>
        <span>時間</span>
        <span>狀態</span>
      </div>
      <ul>
        {exams.map((exam) => {
          const isCompleted = completed.includes(exam.id);
          return (
            <li
              key={exam.id}
              className="grid gap-2 border-b border-[#d5dce4] px-4 py-4 last:border-b-0 md:grid-cols-[1fr_80px_100px_120px] md:items-center"
            >
              <div>
                <p className="text-[15px] font-bold">{exam.title}</p>
                <p className="mt-1 text-xs text-[#5b6673]">{exam.subtitle}</p>
              </div>
              <span className="text-sm">{exam.questions.length} 題</span>
              <span className="text-sm">{formatTime(exam.durationSec)}</span>
              <div className="flex items-center gap-2">
                <span className={`exam-chip ${isCompleted ? "exam-chip-done" : ""}`}>
                  {isCompleted ? "已完成" : "未作答"}
                </span>
                <Link
                  href={`/exam/${exam.id}`}
                  onClick={(event) => handleStart(event, exam)}
                  className="exam-btn exam-btn-primary text-center md:ml-auto"
                >
                  {isCompleted ? "重新測試" : "開始考試"}
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
```

- [ ] **Step 4: 建立首頁**

把 `src/app/page.tsx` 整份取代為：

```tsx
import { ExamList } from "@/components/exam/ExamList";
import { exams } from "@/data/exams";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <header className="exam-topbar">
        <div className="exam-shell py-6">
          <p className="text-[11px] tracking-[0.3em] text-slate-300">EXAM AND LEARN</p>
          <h1 className="mt-1 text-2xl font-bold">線上測驗系統</h1>
          <p className="mt-1 text-sm text-slate-300">請選擇要作答的試卷</p>
        </div>
      </header>
      <div className="exam-shell py-6">
        <ExamList exams={exams} />
      </div>
    </main>
  );
}
```

- [ ] **Step 5: 啟動並確認首頁**

執行：

```powershell
npm run dev
```

開啟 `http://localhost:3000`。預期：看到深藍頂欄與三份考卷，每份顯示題數、時間、狀態與「開始考試」按鈕。按 Ctrl+C 停止。

- [ ] **Step 6: Commit**

```powershell
git add src/app/globals.css src/app/layout.tsx src/app/page.tsx src/components/exam/ExamList.tsx
git commit -m "feat: add school-style exam list page"
```

---

## Task 7: 考試標頭與題目卡片

**Files:**
- Create: `src/components/exam/ExamHeader.tsx`
- Create: `src/components/exam/QuestionCard.tsx`
- Create: `src/components/exam/QuestionCard.test.tsx`

- [ ] **Step 1: 寫題目卡片的失敗測試**

Create `src/components/exam/QuestionCard.test.tsx`：

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { ExamQuestion } from "@/types/exam";
import { QuestionCard } from "./QuestionCard";

const singleQuestion: ExamQuestion = {
  id: "q1",
  type: "single",
  prompt: "單選題目",
  points: 2,
  options: [
    { id: "A", text: "選項 A" },
    { id: "B", text: "選項 B" },
  ],
};

const multipleQuestion: ExamQuestion = {
  id: "q2",
  type: "multiple",
  prompt: "多選題目",
  points: 3,
  options: [
    { id: "A", text: "選項 A" },
    { id: "B", text: "選項 B" },
  ],
};

const booleanQuestion: ExamQuestion = {
  id: "q3",
  type: "boolean",
  prompt: "是非題目",
  points: 1,
  options: [
    { id: "T", text: "是（True）" },
    { id: "F", text: "否（False）" },
  ],
};

describe("QuestionCard", () => {
  it("replaces the answer when a single choice is clicked twice", async () => {
    const user = userEvent.setup();
    const onAnswer = vi.fn();
    render(
      <QuestionCard
        question={singleQuestion}
        number={1}
        answer={undefined}
        flagged={false}
        onAnswer={onAnswer}
        onToggleFlag={vi.fn()}
      />
    );

    await user.click(screen.getByText("選項 A"));
    await user.click(screen.getByText("選項 B"));

    expect(onAnswer).toHaveBeenNthCalledWith(1, "A");
    expect(onAnswer).toHaveBeenNthCalledWith(2, "B");
  });

  it("adds and removes multiple choices", async () => {
    const user = userEvent.setup();
    const onAnswer = vi.fn();
    render(
      <QuestionCard
        question={multipleQuestion}
        number={2}
        answer={["A"]}
        flagged={false}
        onAnswer={onAnswer}
        onToggleFlag={vi.fn()}
      />
    );

    await user.click(screen.getByText("選項 B"));
    expect(onAnswer).toHaveBeenLastCalledWith(["A", "B"]);

    await user.click(screen.getByText("選項 A"));
    expect(onAnswer).toHaveBeenLastCalledWith([]);
  });

  it("renders boolean options and toggles the flag", async () => {
    const user = userEvent.setup();
    const onToggleFlag = vi.fn();
    render(
      <QuestionCard
        question={booleanQuestion}
        number={3}
        answer="T"
        flagged={false}
        onAnswer={vi.fn()}
        onToggleFlag={onToggleFlag}
      />
    );

    expect(screen.getByText("是（True）")).toBeInTheDocument();
    expect(screen.getByText("否（False）")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /標註/ }));
    expect(onToggleFlag).toHaveBeenCalledTimes(1);
  });

  it("shows the flagged label", () => {
    render(
      <QuestionCard
        question={singleQuestion}
        number={1}
        answer="A"
        flagged
        onAnswer={vi.fn()}
        onToggleFlag={vi.fn()}
      />
    );
    expect(screen.getByRole("button", { name: /已標註/ })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: 執行測試確認失敗**

執行：

```powershell
npm test -- src/components/exam/QuestionCard.test.tsx
```

預期：FAIL，訊息包含 `Cannot find module './QuestionCard'`。

- [ ] **Step 3: 實作題目卡片**

Create `src/components/exam/QuestionCard.tsx`：

```tsx
"use client";

import type { Answer, ExamQuestion } from "@/types/exam";

const TYPE_LABELS: Record<ExamQuestion["type"], string> = {
  single: "單選題",
  multiple: "多選題",
  boolean: "是非題",
};

interface Props {
  question: ExamQuestion;
  number: number;
  answer: Answer | undefined;
  flagged: boolean;
  onAnswer: (answer: Answer) => void;
  onToggleFlag: () => void;
}

export function QuestionCard({ question, number, answer, flagged, onAnswer, onToggleFlag }: Props) {
  const selected = Array.isArray(answer) ? answer : answer ? [answer] : [];
  const multiple = question.type === "multiple";

  function select(optionId: string) {
    if (!multiple) {
      onAnswer(optionId);
      return;
    }
    const next = selected.includes(optionId)
      ? selected.filter((id) => id !== optionId)
      : [...selected, optionId];
    onAnswer(next);
  }

  return (
    <section
      id={`question-${question.id}`}
      data-index={number - 1}
      className="exam-card exam-question p-4 sm:p-5"
    >
      <div className="mb-3 flex flex-wrap items-center gap-2 border-b border-[#d5dce4] pb-2">
        <span className="grid h-8 w-8 place-items-center bg-[#2f5597] text-sm font-bold text-white">
          {number}
        </span>
        <span className="exam-chip">{TYPE_LABELS[question.type]}</span>
        <span className="exam-chip">{question.points} 分</span>
        <button
          type="button"
          onClick={onToggleFlag}
          aria-pressed={flagged}
          className={`exam-chip ml-auto ${flagged ? "exam-chip-flag" : ""}`}
        >
          {flagged ? "★ 已標註" : "☆ 標註"}
        </button>
      </div>

      <p className="mb-3 text-[15px] leading-7">{question.prompt}</p>

      <div className={question.type === "boolean" ? "grid gap-2 sm:grid-cols-2" : "space-y-2"}>
        {question.options.map((option) => {
          const isSelected = selected.includes(option.id);
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => select(option.id)}
              data-selected={isSelected}
              data-multiple={multiple}
              className="exam-option"
            >
              <span className="exam-mark">{isSelected ? "✓" : ""}</span>
              <span className="font-bold text-[#5b6673]">{option.id}</span>
              <span>{option.text}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: 執行測試確認通過**

執行：

```powershell
npm test -- src/components/exam/QuestionCard.test.tsx
```

預期：`4 tests passed`。

- [ ] **Step 5: 建立考試標頭**

Create `src/components/exam/ExamHeader.tsx`：

```tsx
"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import { formatTime } from "@/features/exam/timer";
import type { Exam } from "@/types/exam";

interface Props {
  exam: Exam;
  remainingSec: number;
  answered: number;
  total: number;
  running: boolean;
  onPause: () => void;
  onSubmit: () => void;
}

export function ExamHeader({ exam, remainingSec, answered, total, running, onPause, onSubmit }: Props) {
  const percent = total === 0 ? 0 : Math.round((answered / total) * 100);
  const danger = remainingSec <= 60;

  function handleBack(event: MouseEvent<HTMLAnchorElement>) {
    if (!window.confirm("返回試卷選擇頁？作答進度會保留。")) {
      event.preventDefault();
    }
  }

  return (
    <header className="exam-topbar sticky top-0 z-30">
      <div className="exam-shell">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 py-3">
          <div className="min-w-0">
            <h1 className="truncate text-[17px] font-bold">{exam.title}</h1>
            <p className="text-[11px] text-slate-300">{exam.subtitle}</p>
          </div>

          <div className="hidden max-w-xs flex-1 md:block">
            <div className="flex justify-between text-[11px] text-slate-200">
              <span>作答進度</span>
              <span>{answered} / {total} 題</span>
            </div>
            <div className="exam-progress-track mt-1">
              <div className="exam-progress-fill" style={{ width: `${percent}%` }} />
            </div>
          </div>

          <div className="ml-auto flex flex-wrap items-center gap-2">
            <Link href="/" onClick={handleBack} className="exam-btn exam-btn-onnavy">
              返回
            </Link>
            <div className={`text-[22px] font-bold tabular-nums ${danger ? "timer-danger" : ""}`}>
              {formatTime(remainingSec)}
            </div>
            <button type="button" onClick={onPause} disabled={!running} className="exam-btn exam-btn-onnavy">
              暫停
            </button>
            <button type="button" onClick={onSubmit} disabled={!running} className="exam-btn exam-btn-primary">
              交卷
            </button>
          </div>
        </div>

        <div className="pb-2 md:hidden">
          <div className="flex justify-between text-[11px] text-slate-200">
            <span>作答進度</span>
            <span>{answered} / {total} 題</span>
          </div>
          <div className="exam-progress-track mt-1">
            <div className="exam-progress-fill" style={{ width: `${percent}%` }} />
          </div>
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 6: 執行型別檢查**

執行：

```powershell
npx tsc --noEmit
```

預期：沒有錯誤。

- [ ] **Step 7: Commit**

```powershell
git add src/components/exam/ExamHeader.tsx src/components/exam/QuestionCard.tsx src/components/exam/QuestionCard.test.tsx
git commit -m "feat: add exam header and question card"
```

---

## Task 8: 題目地圖、暫停、交卷與成功畫面

**Files:**
- Create: `src/components/exam/QuestionMap.tsx`
- Create: `src/components/exam/PauseOverlay.tsx`
- Create: `src/components/exam/SubmitDialog.tsx`
- Create: `src/components/exam/SuccessView.tsx`

- [ ] **Step 1: 建立題目地圖**

Create `src/components/exam/QuestionMap.tsx`：

```tsx
"use client";

import { isAnswered } from "@/features/exam/summary";
import type { Answer, ExamQuestion } from "@/types/exam";

interface Props {
  questions: ExamQuestion[];
  answers: Record<string, Answer>;
  flags: string[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export function QuestionMap({ questions, answers, flags, currentIndex, onNavigate }: Props) {
  return (
    <div className="exam-card p-3">
      <h2 className="mb-2 text-[13px] font-bold">題目地圖</h2>
      <div className="grid grid-cols-5 gap-1.5">
        {questions.map((question, index) => {
          const done = isAnswered(answers[question.id]);
          const flagged = flags.includes(question.id);
          const current = index === currentIndex;
          return (
            <button
              key={question.id}
              type="button"
              onClick={() => onNavigate(index)}
              className="exam-num"
              data-done={done}
              data-flagged={flagged}
              data-current={current}
              aria-label={`第 ${index + 1} 題`}
              aria-current={current ? "step" : undefined}
            >
              {index + 1}
              {done && flagged ? (
                <span className="absolute bottom-0.5 right-0.5 h-1.5 w-1.5 rounded-full bg-[#2f5597]" />
              ) : null}
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 border-t border-[#d5dce4] pt-2 text-[10px] text-[#5b6673]">
        <span className="inline-flex items-center gap-1">
          <i className="inline-block h-2.5 w-2.5 border border-[#24437a] bg-[#2f5597]" />
          已作答
        </span>
        <span className="inline-flex items-center gap-1">
          <i className="inline-block h-2.5 w-2.5 border border-[#b8942f] bg-[#e0b64a]" />
          已標註
        </span>
        <span className="inline-flex items-center gap-1">
          <i className="inline-block h-2.5 w-2.5 border border-[#aeb9c6] bg-[#fbfcfd]" />
          未作答
        </span>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 建立暫停遮罩**

Create `src/components/exam/PauseOverlay.tsx`：

```tsx
"use client";

import { formatTime } from "@/features/exam/timer";

interface Props {
  remainingSec: number;
  onResume: () => void;
  onReset: () => void;
}

export function PauseOverlay({ remainingSec, onResume, onReset }: Props) {
  return (
    <div className="exam-overlay" role="dialog" aria-modal="true" aria-label="考試暫停">
      <div className="exam-card w-full max-w-md p-6">
        <h2 className="text-xl font-bold">考試已暫停</h2>
        <p className="mt-2 text-sm text-[#5b6673]">
          題目與倒數計時已停止。準備好後請繼續考試。
        </p>
        <p className="mt-4 text-center text-3xl font-bold tabular-nums">{formatTime(remainingSec)}</p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <button type="button" onClick={onResume} className="exam-btn exam-btn-primary flex-1 py-2">
            繼續考試
          </button>
          <button type="button" onClick={onReset} className="exam-btn flex-1 py-2">
            重新測試
          </button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: 建立交卷確認**

Create `src/components/exam/SubmitDialog.tsx`：

```tsx
"use client";

interface Props {
  open: boolean;
  answered: number;
  total: number;
  unansweredNumbers: number[];
  flaggedCount: number;
  onCancel: () => void;
  onConfirm: () => void;
}

export function SubmitDialog({
  open,
  answered,
  total,
  unansweredNumbers,
  flaggedCount,
  onCancel,
  onConfirm,
}: Props) {
  if (!open) return null;

  return (
    <div className="exam-overlay" role="dialog" aria-modal="true" aria-label="交卷確認">
      <div className="exam-card w-full max-w-lg p-6">
        <h2 className="text-xl font-bold">確認交卷？</h2>
        <dl className="mt-4 grid grid-cols-2 gap-3 border-y border-[#d5dce4] py-4 text-sm">
          <div>
            <dt className="text-xs text-[#5b6673]">已作答</dt>
            <dd className="text-lg font-bold">{answered} / {total} 題</dd>
          </div>
          <div>
            <dt className="text-xs text-[#5b6673]">已標註</dt>
            <dd className="text-lg font-bold">{flaggedCount} 題</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-xs text-[#5b6673]">未作答題號</dt>
            <dd className="mt-1">{unansweredNumbers.length > 0 ? unansweredNumbers.join("、") : "無"}</dd>
          </div>
        </dl>
        <p className="mt-3 text-xs text-[#5b6673]">交卷後將無法修改答案。</p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button type="button" onClick={onCancel} className="exam-btn py-2 sm:px-6">
            繼續作答
          </button>
          <button type="button" onClick={onConfirm} className="exam-btn exam-btn-primary py-2 sm:px-6">
            確認交卷
          </button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: 建立交卷成功畫面**

Create `src/components/exam/SuccessView.tsx`：

```tsx
import Link from "next/link";
import type { Exam } from "@/types/exam";

interface Props {
  exam: Exam;
  answered: number;
  total: number;
  autoSubmitted: boolean;
}

export function SuccessView({ exam, answered, total, autoSubmitted }: Props) {
  return (
    <main className="min-h-screen">
      <header className="exam-topbar">
        <div className="exam-shell py-4">
          <h1 className="text-lg font-bold">{exam.title}</h1>
        </div>
      </header>
      <div className="exam-shell py-10 sm:py-16">
        <div className="exam-card mx-auto max-w-xl p-6 text-center sm:p-10">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#2f5597] text-3xl text-white">
            ✓
          </div>
          <h2 className="mt-5 text-2xl font-bold">交卷成功</h2>
          <p className="mt-2 text-sm text-[#5b6673]">
            {autoSubmitted ? "時間到，系統已自動交卷。" : "答案已送出，交卷後無法再修改。"}
          </p>
          <p className="mt-4 text-sm">
            作答題數：{answered} / {total} 題
          </p>
          <Link href="/" className="exam-btn exam-btn-primary mt-8 inline-block px-6 py-2">
            返回試卷選擇
          </Link>
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 5: 寫暫停遮罩的失敗測試**

Create `src/components/exam/PauseOverlay.test.tsx`：

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { PauseOverlay } from "./PauseOverlay";

describe("PauseOverlay", () => {
  it("shows the paused state and the frozen time", () => {
    render(<PauseOverlay remainingSec={300} onResume={vi.fn()} onReset={vi.fn()} />);
    expect(screen.getByText("考試已暫停")).toBeInTheDocument();
    expect(screen.getByText("05:00")).toBeInTheDocument();
  });

  it("calls onResume when continuing", async () => {
    const user = userEvent.setup();
    const onResume = vi.fn();
    render(<PauseOverlay remainingSec={300} onResume={onResume} onReset={vi.fn()} />);
    await user.click(screen.getByRole("button", { name: "繼續考試" }));
    expect(onResume).toHaveBeenCalledTimes(1);
  });

  it("calls onReset when restarting", async () => {
    const user = userEvent.setup();
    const onReset = vi.fn();
    render(<PauseOverlay remainingSec={300} onResume={vi.fn()} onReset={onReset} />);
    await user.click(screen.getByRole("button", { name: "重新測試" }));
    expect(onReset).toHaveBeenCalledTimes(1);
  });
});
```

- [ ] **Step 6: 執行測試確認失敗**

執行：

```powershell
npm test -- src/components/exam/PauseOverlay.test.tsx
```

預期：FAIL，訊息包含 `Cannot find module './PauseOverlay'`。若元件已存在則直接進行下一步。

- [ ] **Step 7: 執行型別檢查與測試**

執行：

```powershell
npx tsc --noEmit
npm test -- src/components/exam/PauseOverlay.test.tsx
```

預期：沒有型別錯誤，`3 tests passed`。

- [ ] **Step 8: Commit**

```powershell
git add src/components/exam/QuestionMap.tsx src/components/exam/PauseOverlay.tsx src/components/exam/PauseOverlay.test.tsx src/components/exam/SubmitDialog.tsx src/components/exam/SuccessView.tsx
git commit -m "feat: add question map and exam dialogs"
```

---

## Task 9: 考試頁整合與路由

**Files:**
- Create: `src/components/exam/ExamClient.tsx`
- Create: `src/app/exam/[examId]/page.tsx`
- Create: `src/app/not-found.tsx`

- [ ] **Step 1: 建立考試頁 Client Component**

Create `src/components/exam/ExamClient.tsx`：

```tsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { countAnswered, countFlagged, getUnansweredNumbers } from "@/features/exam/summary";
import { useExamSession } from "@/features/exam/useExamSession";
import type { Exam } from "@/types/exam";
import { ExamHeader } from "./ExamHeader";
import { PauseOverlay } from "./PauseOverlay";
import { QuestionCard } from "./QuestionCard";
import { QuestionMap } from "./QuestionMap";
import { SubmitDialog } from "./SubmitDialog";
import { SuccessView } from "./SuccessView";

export function ExamClient({ exam }: { exam: Exam }) {
  const { state, ready, storageWarning, ...actions } = useExamSession(exam);
  const [mapOpen, setMapOpen] = useState(false);
  const [submitOpen, setSubmitOpen] = useState(false);
  const refs = useRef<Array<HTMLElement | null>>([]);
  const userScrolledRef = useRef(false);
  const restoredRef = useRef(false);

  const answered = countAnswered(exam, state.answers);

  const navigate = useCallback(
    (index: number) => {
      actions.goTo(index);
      setMapOpen(false);
      const id = exam.questions[index]?.id;
      if (id) {
        document.getElementById(`question-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [actions, exam.questions]
  );

  useEffect(() => {
    const onScroll = () => {
      userScrolledRef.current = true;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!ready || restoredRef.current) return;
    restoredRef.current = true;
    const id = exam.questions[state.currentIndex]?.id;
    if (id) {
      document.getElementById(`question-${id}`)?.scrollIntoView({ block: "start" });
    }
  }, [ready, state.currentIndex, exam.questions]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!userScrolledRef.current) return;
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (!visible) return;
        const index = Number((visible.target as HTMLElement).dataset.index);
        if (!Number.isNaN(index)) actions.goTo(index);
      },
      { rootMargin: "-100px 0px -55% 0px", threshold: 0 }
    );

    refs.current.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [actions, exam.questions.length]);

  function handleReset() {
    if (!window.confirm("確定要重新測試嗎？答案、標註與計時都會重置。")) return;
    actions.reset();
    setMapOpen(false);
    setSubmitOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleConfirmSubmit() {
    setSubmitOpen(false);
    actions.submit();
    window.scrollTo({ top: 0 });
  }

  if (!ready) {
    return <div className="grid min-h-screen place-items-center text-sm text-[#5b6673]">載入作答進度…</div>;
  }

  if (state.status === "submitted") {
    return (
      <SuccessView
        exam={exam}
        answered={answered}
        total={exam.questions.length}
        autoSubmitted={state.remainingSec === 0}
      />
    );
  }

  const total = exam.questions.length;
  const current = state.currentIndex;

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      <ExamHeader
        exam={exam}
        remainingSec={state.remainingSec}
        answered={answered}
        total={total}
        running={state.status === "running"}
        onPause={actions.pause}
        onSubmit={() => setSubmitOpen(true)}
      />

      {storageWarning ? (
        <div className="exam-shell mt-3">
          <p className="border border-[#d8b55a] bg-[#fff4d1] px-3 py-2 text-xs text-[#7a5400]">
            瀏覽器無法使用本機儲存，重新整理後作答進度可能遺失。
          </p>
        </div>
      ) : null}

      <div className="exam-shell mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_264px]">
        <main className="space-y-3">
          {exam.questions.map((question, index) => (
            <div
              key={question.id}
              ref={(element) => {
                refs.current[index] = element;
              }}
            >
              <QuestionCard
                question={question}
                number={index + 1}
                answer={state.answers[question.id]}
                flagged={state.flags.includes(question.id)}
                onAnswer={(answer) => actions.answer(question.id, answer)}
                onToggleFlag={() => actions.toggleFlag(question.id)}
              />
            </div>
          ))}

          <div className="flex gap-2 pb-6">
            <button
              type="button"
              onClick={() => navigate(current - 1)}
              disabled={current <= 0}
              className="exam-btn flex-1 py-2"
            >
              上一題
            </button>
            <button
              type="button"
              onClick={() => navigate(current + 1)}
              disabled={current >= total - 1}
              className="exam-btn flex-1 py-2"
            >
              下一題
            </button>
          </div>
        </main>

        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <QuestionMap
              questions={exam.questions}
              answers={state.answers}
              flags={state.flags}
              currentIndex={state.currentIndex}
              onNavigate={navigate}
            />
          </div>
        </aside>
      </div>

      <button
        type="button"
        onClick={() => setMapOpen(true)}
        className="exam-btn exam-btn-primary fixed bottom-4 right-4 z-30 px-4 py-3 lg:hidden"
      >
        題目地圖
      </button>

      {mapOpen ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            aria-label="關閉題目地圖"
            onClick={() => setMapOpen(false)}
            className="absolute inset-0 bg-black/40"
          />
          <div className="absolute right-0 top-0 h-full w-72 overflow-y-auto bg-[#eef1f5] p-3 shadow-xl">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-bold">題目地圖</span>
              <button type="button" onClick={() => setMapOpen(false)} className="exam-btn px-2 py-1 text-xs">
                關閉
              </button>
            </div>
            <QuestionMap
              questions={exam.questions}
              answers={state.answers}
              flags={state.flags}
              currentIndex={state.currentIndex}
              onNavigate={navigate}
            />
          </div>
        </div>
      ) : null}

      {state.status === "paused" ? (
        <PauseOverlay remainingSec={state.remainingSec} onResume={actions.resume} onReset={handleReset} />
      ) : null}

      <SubmitDialog
        open={submitOpen}
        answered={answered}
        total={total}
        unansweredNumbers={getUnansweredNumbers(exam, state.answers)}
        flaggedCount={countFlagged(exam, state.flags)}
        onCancel={() => setSubmitOpen(false)}
        onConfirm={handleConfirmSubmit}
      />
    </div>
  );
}
```

- [ ] **Step 2: 建立考試頁路由**

Create `src/app/exam/[examId]/page.tsx`：

```tsx
import { notFound } from "next/navigation";
import { ExamClient } from "@/components/exam/ExamClient";
import { exams, getExam } from "@/data/exams";

export function generateStaticParams() {
  return exams.map((exam) => ({ examId: exam.id }));
}

export default async function ExamPage({
  params,
}: {
  params: Promise<{ examId: string }>;
}) {
  const { examId } = await params;
  const exam = getExam(examId);
  if (!exam) notFound();
  return <ExamClient exam={exam} />;
}
```

- [ ] **Step 3: 建立找不到頁面**

Create `src/app/not-found.tsx`：

```tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center p-6">
      <div className="exam-card w-full max-w-md p-8 text-center">
        <h1 className="text-2xl font-bold">找不到這份考卷</h1>
        <p className="mt-2 text-sm text-[#5b6673]">請回到試卷選擇頁重新選擇。</p>
        <Link href="/" className="exam-btn exam-btn-primary mt-6 inline-block px-6 py-2">
          返回試卷選擇
        </Link>
      </div>
    </main>
  );
}
```

- [ ] **Step 4: 啟動並手動確認主要流程**

執行：

```powershell
npm run dev
```

依序確認：

1. 首頁點「開始考試」進入 `/exam/ds-midterm`。
2. 單選題只能選一個；多選題可勾選多個。
3. 點「標註」會變成「★ 已標註」，題目地圖對應題號變金黃色。
4. 點題目地圖任一題號會捲動到該題。
5. 按「暫停」出現遮罩，倒數停止；按「繼續考試」恢復。
6. 按「交卷」出現確認視窗，顯示已答／未答題號。
7. 確認交卷後顯示「交卷成功」。

按 Ctrl+C 停止。

- [ ] **Step 5: 執行型別檢查與測試**

執行：

```powershell
npx tsc --noEmit
npm test
```

預期：沒有型別錯誤，所有測試通過。

- [ ] **Step 6: Commit**

```powershell
git add src/components/exam/ExamClient.tsx src/app/exam src/app/not-found.tsx
git commit -m "feat: integrate exam page with timer, map and dialogs"
```

---

## Task 10: 邊界情況、響應式與完整驗證

**Files:**
- Modify: `src/components/exam/ExamClient.tsx`（只在發現問題時修改）
- Modify: `src/features/exam/useExamSession.ts`（只在發現問題時修改）

- [ ] **Step 1: 驗證重新整理接續作答**

執行 `npm run dev`，進入 `ds-midterm`：

1. 回答第 1、2 題，標註第 3 題。
2. 記下剩餘時間。
3. 按 F5 重新整理。

預期：答案、標註、目前題號與剩餘時間都保留（剩餘時間誤差 1～2 秒內）。

- [ ] **Step 2: 驗證暫停後重新整理**

1. 按「暫停」。
2. 重新整理。

預期：仍顯示暫停遮罩，時間不會繼續倒數。

- [ ] **Step 3: 驗證時間到自動交卷**

在 `src/data/exams.ts` 暫時把 `ds-midterm` 的 `durationSec` 改成 `5`，重新整理並等待 5 秒。

預期：自動顯示「交卷成功」與「時間到，系統已自動交卷。」

驗證後把 `durationSec` 改回 `10 * 60`：

```ts
durationSec: 10 * 60,
```

- [ ] **Step 4: 驗證手機版**

在瀏覽器開發者工具切換到 390px 寬度：

1. 頂欄顯示兩列（標題／計時、進度條）。
2. 右下角出現「題目地圖」按鈕。
3. 點擊後右側抽屜開啟，點題號會跳題並關閉抽屜。

- [ ] **Step 5: 驗證返回與保留進度**

1. 在考試頁按「返回」，確認視窗按取消 → 留在原頁。
2. 再按「返回」，按確定 → 回到首頁。
3. 重新進入同一考卷 → 進度仍在。

- [ ] **Step 6: 驗證重新測試**

1. 按「暫停」→「重新測試」→ 確認。
2. 預期：答案清空、標註清空、題號回到第 1 題、時間回到完整長度。

- [ ] **Step 7: 執行完整測試與建置**

執行：

```powershell
npm test
npx tsc --noEmit
npm run build
```

預期：所有測試通過、沒有型別錯誤、建置成功並顯示 route 清單（`/`、`/exam/[examId]`）。

- [ ] **Step 8: 逐項核對驗收標準**

對照 spec 第 12 節：

1. 首頁看到三份考卷。
2. 三種題型皆可作答。
3. 14 項功能皆可操作。
4. 重新整理後狀態保留。
5. 倒數歸零自動交卷。
6. 手機版題目地圖可開啟並跳題。
7. 交卷後只顯示成功畫面。
8. `npm test` 與 `npm run build` 通過。

- [ ] **Step 9: Commit**

```powershell
git add -A
git commit -m "chore: verify exam page edge cases and responsive behavior"
```

---

## 完成定義

- `npm run dev` 可啟動，首頁與考試頁可正常操作。
- `npm test` 全數通過。
- `npx tsc --noEmit` 無錯誤。
- `npm run build` 成功。
- spec 第 12 節的 8 項驗收標準全部達成。
- 所有工作已 commit 到 `main`。

