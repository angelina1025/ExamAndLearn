# 已接收考卷考試頁 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 首頁只顯示一張「已接收」的 50 題單選考卷，考試頁透過 `getAssignedExam` 介面取得考卷，原有作答功能全部保留。

**Architecture:** 新增 `assignedExam` 資料介面與 mock 資料；首頁與考試路由改為 async server component 取得考卷；`ExamClient` 與作答邏輯完全不動。未來組卷端只要替換 `getAssignedExam` 實作。

**Tech Stack:** Next.js 16 App Router、TypeScript、Tailwind CSS v4、Vitest + Testing Library。

---

## 檔案結構

- `src/data/assignedExam.ts`：`ASSIGNED_EXAM_ID` 與 `getAssignedExam(examId)` 介面，目前回傳 mock。
- `src/data/assignedExamData.ts`：50 題 mock 考卷資料。
- `src/data/assignedExam.test.ts`：資料介面測試。
- `src/app/page.tsx`：首頁改為單張已接收考卷。
- `src/app/exam/[examId]/page.tsx`：改用 `getAssignedExam`，移除 `generateStaticParams`。
- `src/components/exam/ExamList.test.tsx`：補上已完成／重新測試測試。
- 刪除：`src/data/exams.ts`、`src/data/exams.test.ts`。

---

## Task 1: 已接收考卷介面與 50 題 mock 資料

**Files:**
- Create: `src/data/assignedExam.test.ts`
- Create: `src/data/assignedExam.ts`
- Create: `src/data/assignedExamData.ts`

- [ ] **Step 1: 寫失敗測試**

Create `src/data/assignedExam.test.ts`：

```ts
import { describe, expect, it } from "vitest";
import { ASSIGNED_EXAM_ID, getAssignedExam } from "./assignedExam";

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
```

- [ ] **Step 2: 執行測試確認失敗**

```powershell
npm test -- src/data/assignedExam.test.ts --run
```

Expected: FAIL，`Failed to resolve import "./assignedExam"`。

- [ ] **Step 3: 建立資料介面**

Create `src/data/assignedExam.ts`：

```ts
import type { Exam } from "@/types/exam";
import { assignedExam } from "./assignedExamData";

export const ASSIGNED_EXAM_ID = "assigned-demo";

export async function getAssignedExam(examId: string): Promise<Exam | null> {
  if (examId !== ASSIGNED_EXAM_ID) return null;
  return assignedExam;
}
```

- [ ] **Step 4: 建立 50 題 mock 考卷**

Create `src/data/assignedExamData.ts`：

```ts
import type { Exam, ExamQuestion } from "@/types/exam";

const OPTION_IDS = ["A", "B", "C", "D"];

function single(
  id: string,
  prompt: string,
  options: [string, string, string, string]
): ExamQuestion {
  return {
    id,
    type: "single",
    prompt,
    points: 2,
    options: options.map((text, index) => ({ id: OPTION_IDS[index], text })),
  };
}

export const assignedExam: Exam = {
  id: "assigned-demo",
  title: "計算機概論 模擬測驗",
  subtitle: "公職考試 ・ 50 題 ・ 60 分鐘",
  durationSec: 60 * 60,
  questions: [
    single("assigned-01", "計算機五大單元中，負責執行算術與邏輯運算的是下列哪一個單元？", [
      "控制單元",
      "算術邏輯單元",
      "記憶單元",
      "輸入輸出單元",
    ]),
    single("assigned-02", "1 個位元組（Byte）等於多少個位元（Bit）？", [
      "4 個",
      "8 個",
      "16 個",
      "32 個",
    ]),
    single("assigned-03", "二進位數 1011 的十進位值為何？", ["9", "10", "11", "13"]),
    single("assigned-04", "十六進位數 1A 的十進位值為何？", ["24", "25", "26", "27"]),
    single("assigned-05", "快取記憶體（Cache）的主要作用為何？", [
      "增加硬碟容量",
      "加快 CPU 存取常用資料的速度",
      "負責網路路由",
      "永久保存資料",
    ]),
    single("assigned-06", "下列哪一種記憶體屬於揮發性記憶體？", [
      "ROM",
      "DRAM",
      "SSD",
      "隨身碟",
    ]),
    single("assigned-07", "電腦關機後，下列哪一種記憶體仍會保留資料？", [
      "RAM",
      "暫存器",
      "ROM",
      "快取記憶體",
    ]),
    single("assigned-08", "電腦匯流排（Bus）的主要功能為何？", [
      "連接各單元並傳輸資料",
      "儲存使用者檔案",
      "執行防毒掃描",
      "提供螢幕畫面",
    ]),
    single("assigned-09", "下列哪一項屬於作業系統的主要功能？", [
      "文書編輯",
      "記憶體與行程管理",
      "網頁瀏覽",
      "影像剪輯",
    ]),
    single("assigned-10", "作業系統中的分頁（Paging）機制主要用來解決什麼問題？", [
      "外部碎片",
      "CPU 過熱",
      "網路壅塞",
      "螢幕解析度不足",
    ]),
    single("assigned-11", "虛擬記憶體（Virtual Memory）的主要作用為何？", [
      "讓程式可使用的位址空間大於實體記憶體",
      "加快印表機列印速度",
      "壓縮圖片檔案",
      "加密網路封包",
    ]),
    single("assigned-12", "下列哪一項「不是」發生死結（Deadlock）的必要條件？", [
      "互斥（Mutual Exclusion）",
      "持有並等待（Hold and Wait）",
      "可剝奪（Preemption）",
      "循環等待（Circular Wait）",
    ]),
    single("assigned-13", "Round Robin 排程演算法的主要特性為何？", [
      "依固定時間片段輪流執行",
      "先來先服務",
      "依優先權高低執行",
      "最短工作優先執行",
    ]),
    single("assigned-14", "同一行程（Process）中的多個執行緒（Thread）通常共用下列哪一項資源？", [
      "堆疊（Stack）",
      "程式計數器（Program Counter）",
      "堆積（Heap）與全域變數",
      "暫存器（Register）",
    ]),
    single("assigned-15", "中斷（Interrupt）機制的主要用途為何？", [
      "通知 CPU 處理需要立即反應的事件",
      "增加記憶體容量",
      "壓縮資料檔案",
      "備份作業系統",
    ]),
    single("assigned-16", "檔案系統（File System）主要負責下列哪一項工作？", [
      "管理檔案與目錄",
      "執行病毒掃描",
      "提供螢幕畫面",
      "控制印表機墨水",
    ]),
    single("assigned-17", "TCP 協定的主要特性為何？", [
      "可靠且具連線導向",
      "不可靠且不保證送達",
      "只支援廣播",
      "不需要任何確認機制",
    ]),
    single("assigned-18", "IPv4 位址的長度為多少位元？", ["16 位元", "32 位元", "64 位元", "128 位元"]),
    single("assigned-19", "DNS 的主要功能為何？", [
      "將網域名稱轉換為 IP 位址",
      "壓縮網路封包",
      "加密電子郵件",
      "分配實體網路卡",
    ]),
    single("assigned-20", "HTTP 協定的預設通訊埠為何？", ["21", "25", "80", "443"]),
    single("assigned-21", "OSI 七層模型中，負責選擇路由與轉送封包的是哪一層？", [
      "實體層",
      "資料鏈結層",
      "網路層",
      "應用層",
    ]),
    single("assigned-22", "路由器（Router）的主要功能為何？", [
      "選擇路徑並轉送封包",
      "放大網路訊號",
      "儲存網頁內容",
      "過濾垃圾郵件",
    ]),
    single("assigned-23", "防火牆（Firewall）的主要用途為何？", [
      "控制進出網路的流量",
      "增加硬碟容量",
      "提升螢幕解析度",
      "備份使用者資料",
    ]),
    single("assigned-24", "對稱式加密（Symmetric Encryption）的特性為何？", [
      "加密與解密使用同一把金鑰",
      "使用公開金鑰與私密金鑰",
      "加密後無法還原",
      "只能用於數位簽章",
    ]),
    single("assigned-25", "數位簽章（Digital Signature）的主要目的為何？", [
      "驗證身分與資料完整性",
      "壓縮傳輸檔案",
      "增加網路頻寬",
      "備份資料庫",
    ]),
    single("assigned-26", "下列哪一項屬於惡意程式？", [
      "作業系統",
      "編譯器",
      "勒索軟體",
      "網頁瀏覽器",
    ]),
    single("assigned-27", "SQL 的主要用途為何？", [
      "查詢與操作關聯式資料庫",
      "設計網頁版面",
      "壓縮影片檔案",
      "管理印表機",
    ]),
    single("assigned-28", "關聯式資料表中，主鍵（Primary Key）的特性為何？", [
      "唯一且不可為空",
      "可以重複",
      "必須是文字型別",
      "允許空值",
    ]),
    single("assigned-29", "資料庫正規化（Normalization）的主要目的為何？", [
      "減少資料重複與更新異常",
      "增加資料重複以提升速度",
      "提高硬體運算速度",
      "將資料加密",
    ]),
    single("assigned-30", "關聯式資料庫主要以何種方式表示資料與關聯？", [
      "資料表",
      "圖片",
      "音訊",
      "影片",
    ]),
    single("assigned-31", "二分搜尋法（Binary Search）的平均時間複雜度為何？", [
      "O(1)",
      "O(log n)",
      "O(n)",
      "O(n²)",
    ]),
    single("assigned-32", "穩定排序（Stable Sort）的特性為何？", [
      "相同鍵值元素的相對順序維持不變",
      "一定是執行最快的排序",
      "不需要進行比較",
      "只能用於數字資料",
    ]),
    single("assigned-33", "堆疊（Stack）的存取順序為何？", [
      "先進先出（FIFO）",
      "後進先出（LIFO）",
      "隨機存取",
      "依優先權存取",
    ]),
    single("assigned-34", "佇列（Queue）的存取順序為何？", [
      "後進先出（LIFO）",
      "先進先出（FIFO）",
      "隨機存取",
      "依索引大小存取",
    ]),
    single("assigned-35", "在單向鏈結串列（Singly Linked List）的頭部插入新節點，時間複雜度為何？", [
      "O(1)",
      "O(log n)",
      "O(n)",
      "O(n log n)",
    ]),
    single("assigned-36", "雜湊表（Hash Table）在理想情況下的平均搜尋時間複雜度為何？", [
      "O(1)",
      "O(log n)",
      "O(n)",
      "O(n²)",
    ]),
    single("assigned-37", "撰寫遞迴函式時，必須具備下列哪一項要素？", [
      "終止條件",
      "無窮迴圈",
      "全域變數",
      "多執行緒",
    ]),
    single("assigned-38", "編譯器（Compiler）與直譯器（Interpreter）的主要差異為何？", [
      "編譯器先將程式轉為機器碼再執行",
      "直譯器一定執行較快",
      "編譯器不能檢查語法錯誤",
      "直譯器只能處理硬體電路",
    ]),
    single("assigned-39", "程式語言中變數的資料型別主要決定什麼？", [
      "可儲存的值範圍與可進行的操作",
      "螢幕顯示顏色",
      "網路傳輸速度",
      "檔案名稱長度",
    ]),
    single("assigned-40", "物件導向中的「封裝」（Encapsulation）是指什麼？", [
      "隱藏內部實作並提供公開介面",
      "複製多個相同物件",
      "刪除不需要的類別",
      "將所有變數設為公開",
    ]),
    single("assigned-41", "雲端運算的 IaaS（Infrastructure as a Service）主要提供什麼？", [
      "虛擬機器與儲存等基礎運算資源",
      "只能提供網頁瀏覽器",
      "只能提供文書軟體",
      "只能提供電子郵件",
    ]),
    single("assigned-42", "大數據常以 3V 描述，下列哪一項「不是」3V 的內容？", [
      "資料量（Volume）",
      "資料速度（Velocity）",
      "資料多樣性（Variety）",
      "資料顏色（Color）",
    ]),
    single("assigned-43", "機器學習模型訓練通常需要下列哪一組要素？", [
      "資料與演算法",
      "只有螢幕與鍵盤",
      "只有印表機",
      "只有網路線",
    ]),
    single("assigned-44", "物聯網（IoT）的核心概念為何？", [
      "讓各種裝置連網並交換資料",
      "只能玩線上遊戲",
      "只能使用離線電腦",
      "只能處理文書排版",
    ]),
    single("assigned-45", "區塊鏈（Blockchain）的主要特性為何？", [
      "分散式帳本且資料難以竄改",
      "單一集中式資料庫",
      "只能儲存圖片",
      "保證完全匿名",
    ]),
    single("assigned-46", "數位憑證（Digital Certificate）通常由誰簽發？", [
      "憑證授權中心（CA）",
      "使用者本人",
      "網際網路服務供應商（ISP）",
      "作業系統廠商",
    ]),
    single("assigned-47", "系統儲存使用者密碼時，通常會採用下列哪一種方式？", [
      "雜湊加鹽（Hashing with Salt）",
      "直接明文儲存",
      "壓縮後儲存",
      "轉成圖片儲存",
    ]),
    single("assigned-48", "備份 3-2-1 原則中的「1」代表什麼？", [
      "至少一份異地備份",
      "只需要一份密碼",
      "只需要一台電腦",
      "只能有一位使用者",
    ]),
    single("assigned-49", "個人資料保護法的主要目的為何？", [
      "保護個人資料與隱私",
      "增加政府稅收",
      "管制網路速度",
      "限制電腦數量",
    ]),
    single("assigned-50", "計算機五大單元「不包括」下列哪一項？", [
      "輸入單元",
      "輸出單元",
      "記憶單元",
      "通訊單元",
    ]),
  ],
};
```

- [ ] **Step 5: 執行測試確認通過**

```powershell
npm test -- src/data/assignedExam.test.ts --run
```

Expected: `4 tests passed`。

- [ ] **Step 6: 型別檢查**

```powershell
npm run typecheck
```

Expected: 沒有錯誤。

- [ ] **Step 7: Commit**

```powershell
git add src/data/assignedExam.ts src/data/assignedExamData.ts src/data/assignedExam.test.ts
git commit -m "feat: add assigned exam data interface with 50 mock questions"
```

---

## Task 2: 首頁改為單張已接收考卷

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: 改寫首頁**

把 `src/app/page.tsx` 整份取代為：

```tsx
import { notFound } from "next/navigation";
import { ExamList } from "@/components/exam/ExamList";
import { ASSIGNED_EXAM_ID, getAssignedExam } from "@/data/assignedExam";

export default async function HomePage() {
  const exam = await getAssignedExam(ASSIGNED_EXAM_ID);
  if (!exam) notFound();

  return (
    <main className="min-h-screen">
      <header className="exam-topbar">
        <div className="exam-shell py-6">
          <p className="text-[11px] tracking-[0.3em] text-slate-300">EXAM AND LEARN</p>
          <h1 className="mt-1 text-2xl font-bold">線上測驗系統</h1>
          <p className="mt-1 text-sm text-slate-300">系統已接收你的自組卷，確認後即可開始作答</p>
        </div>
      </header>
      <div className="exam-shell py-6">
        <ExamList exams={[exam]} />
      </div>
    </main>
  );
}
```

- [ ] **Step 2: 型別檢查與建置**

```powershell
npm run typecheck
npm run build
```

Expected: 沒有型別錯誤，建置成功，首頁為靜態產出。

- [ ] **Step 3: Commit**

```powershell
git add src/app/page.tsx
git commit -m "feat: show the single assigned exam on the home page"
```

---

## Task 3: 考試路由改用已接收考卷介面

**Files:**
- Modify: `src/app/exam/[examId]/page.tsx`
- Delete: `src/data/exams.ts`
- Delete: `src/data/exams.test.ts`

- [ ] **Step 1: 改寫考試路由**

把 `src/app/exam/[examId]/page.tsx` 整份取代為：

```tsx
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ExamClient } from "@/components/exam/ExamClient";
import { getAssignedExam } from "@/data/assignedExam";

async function ExamContent({
  params,
}: {
  params: Promise<{ examId: string }>;
}) {
  const { examId } = await params;
  const exam = await getAssignedExam(examId);
  if (!exam) notFound();
  return <ExamClient exam={exam} />;
}

export default function ExamPage({
  params,
}: {
  params: Promise<{ examId: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="grid min-h-screen place-items-center text-sm text-[#5b6673]">
          載入作答進度…
        </div>
      }
    >
      <ExamContent params={params} />
    </Suspense>
  );
}
```

- [ ] **Step 2: 刪除舊考卷資料**

```powershell
git rm src/data/exams.ts src/data/exams.test.ts
```

- [ ] **Step 3: 全域搜尋確認沒有殘留引用**

```powershell
rg "exams|getExam" src
```

Expected: 沒有 `from "@/data/exams"` 或 `getExam(` 的引用（`getAssignedExam` 不算）。

- [ ] **Step 4: 執行測試與建置**

```powershell
npm test -- --run
npm run typecheck
npm run build
```

Expected: 所有測試通過、型別無錯誤、建置成功。

- [ ] **Step 5: Commit**

```powershell
git add src/app/exam/[examId]/page.tsx
git commit -m "feat: load the exam page from the assigned exam interface"
```

---

## Task 4: 補上首頁已完成／重新測試測試

**Files:**
- Create: `src/components/exam/ExamList.test.tsx`

- [ ] **Step 1: 寫測試**

Create `src/components/exam/ExamList.test.tsx`：

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { MouseEvent, ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Exam } from "@/types/exam";
import { saveSession, storageKey } from "@/features/exam/storage";
import { ExamList } from "./ExamList";

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    onClick,
  }: {
    href: string;
    children: ReactNode;
    onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  }) => (
    <a
      href={href}
      onClick={(event) => {
        // jsdom 不支援導航，先阻止預設行為再轉呼叫 ExamList 的 onClick。
        event.preventDefault();
        onClick?.(event);
      }}
    >
      {children}
    </a>
  ),
}));

const exam: Exam = {
  id: "assigned-demo",
  title: "Demo Exam",
  subtitle: "",
  durationSec: 3600,
  questions: [
    { id: "q1", type: "single", prompt: "Q1", points: 2, options: [] },
  ],
};

const submitted = {
  examId: "assigned-demo",
  answers: { q1: "A" },
  flags: [],
  currentIndex: 0,
  remainingSec: 0,
  status: "submitted" as const,
  deadline: null,
};

describe("ExamList", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("shows the completed state for a submitted session", async () => {
    saveSession(submitted);

    render(<ExamList exams={[exam]} />);

    expect(await screen.findByText("已完成")).toBeInTheDocument();
    expect(screen.getByText("重新測試")).toBeInTheDocument();
  });

  it("clears the session when restarting is confirmed", async () => {
    saveSession(submitted);
    const user = userEvent.setup();
    const confirm = vi.spyOn(window, "confirm").mockReturnValue(true);

    render(<ExamList exams={[exam]} />);
    await user.click(await screen.findByText("重新測試"));

    expect(confirm).toHaveBeenCalledWith("這份考卷已完成，要重新測試嗎？");
    expect(localStorage.getItem(storageKey("assigned-demo"))).toBeNull();
  });

  it("keeps the session when restarting is cancelled", async () => {
    saveSession(submitted);
    const user = userEvent.setup();
    vi.spyOn(window, "confirm").mockReturnValue(false);

    render(<ExamList exams={[exam]} />);
    await user.click(await screen.findByText("重新測試"));

    expect(localStorage.getItem(storageKey("assigned-demo"))).not.toBeNull();
  });
});
```

- [ ] **Step 2: 執行測試確認通過**

```powershell
npm test -- src/components/exam/ExamList.test.tsx --run
```

Expected: `3 tests passed`。

- [ ] **Step 3: Commit**

```powershell
git add src/components/exam/ExamList.test.tsx
git commit -m "test: cover completed and restart states on the exam list"
```

---

## Task 5: 完整驗證與瀏覽器檢查

**Files:** 無（僅驗證）

- [ ] **Step 1: 執行完整測試與建置**

```powershell
npm test -- --run
npm run typecheck
npm run lint
npm run build
```

Expected: 所有測試通過、型別與 lint 無錯誤、建置成功。

- [ ] **Step 2: 啟動 dev server 並手動確認**

```powershell
npm run dev
```

依序確認：

1. 首頁只有一張「計算機概論 模擬測驗」，顯示 `50 題`、`60:00`、`開始考試`。
2. 點擊後進入 `/exam/assigned-demo`，可見 50 題與題目地圖（5 欄 × 10 列）。
3. 作答幾題、標註一題，重新整理後答案、標註、題號與剩餘時間保留。
4. 暫停／繼續考試正常，暫停後重新整理仍保持暫停。
5. 交卷確認視窗顯示未作答題號；確認後顯示「交卷成功」。
6. 回首頁顯示「已完成」與「重新測試」；確認重新測試後回到 50 題完整時間、無答案。
7. 直接開啟 `/exam/unknown` 顯示「找不到這份考卷」。

- [ ] **Step 3: Commit（僅在驗證過程有修正時）**

若驗證發現問題並修正：

```powershell
git add -A
git commit -m "fix: address assigned exam verification issues"
```

若無修正則不需要 commit。
