# 已接收考卷的考試頁 — 設計規格

日期：2026-11-02
狀態：已確認

## 1. 背景與目標

目前考試頁只能對三份寫死的考卷作答（`src/data/exams.ts`）。實際流程中，考卷由「選題／組卷」功能產生，考試頁只負責「已接收到題目之後的作答體驗」。

本次目標：把考試頁與題目來源解耦，讓考試頁接收一份外部考卷；在組卷端的資料格式尚未確定前，先用 mock 實作這個介面。

## 2. 範圍

### 納入

- 新增「已接收考卷」資料介面，目前以 mock 實作。
- 首頁改為只顯示一張已接收的考卷。
- 考試頁改從新介面取得考卷。
- 50 題公職計算機概論風格 mock 題目。
- 更新資料與首頁相關測試。
- 移除舊的三份現成考卷資料。

### 不纳入

- 選題、組卷、挑選題庫等功能（其他組員負責）。
- 成績計算、答案正確性、結果分析。
- 後端 API、資料庫、登入與權限。
- 與組卷端的最終資料格式整合（待對方確定）。

## 3. 名詞

- **已接收考卷（assigned exam）**：由組卷端產生、交給考試頁作答的一份考卷。包含 id、標題、副標、考試秒數與題目陣列。
- **mock 實作**：目前以固定資料模擬「已接收到考卷」，不連接任何後端。

## 4. 資料介面

沿用現有型別 `Exam`：

```ts
interface Exam {
  id: string;
  title: string;
  subtitle: string;
  durationSec: number;
  questions: ExamQuestion[];
}
```

新增 `src/data/assignedExam.ts`：

```ts
export const ASSIGNED_EXAM_ID = "assigned-demo";

export async function getAssignedExam(examId: string): Promise<Exam | null>;
```

- 介面設計為 async，模擬未來從 API 或 localStorage 取得資料。
- 目前實作：`examId === ASSIGNED_EXAM_ID` 時回傳 mock 考卷，其餘回傳 `null`。
- 未來整合時只替換此檔實作，首頁與考試頁不需修改。

mock 考卷資料放 `src/data/assignedExamData.ts`，與介面分開，避免介面檔隨題目內容膨脹。

## 5. 首頁

- `src/app/page.tsx` 改為 async server component，取得 `ASSIGNED_EXAM_ID` 對應的考卷。
- 找不到考卷時呼叫 `notFound()`。
- 沿用 `ExamList`，傳入單一考卷的陣列，因此仍保有「已完成／重新測試」行為。
- 文案調整：
  - 主標題維持「線上測驗系統」。
  - 副標改為「系統已接收你的自組卷，確認後即可開始作答」。
- 顯示欄位：考卷名稱、題數（50 題）、時間（60:00）、狀態（未作答／已完成）、動作（開始考試／重新測試）。

## 6. 考試頁

- `src/app/exam/[examId]/page.tsx` 的資料來源由 `getExam` 改為 `getAssignedExam`。
- 移除 `generateStaticParams`：考卷 id 由組卷端決定，不再限於固定三份。
- `params` 仍於 `<Suspense>` 內讀取，維持 Next.js 16 的 instant navigation 規則。
- `ExamClient`、`useExamSession`、reducer、storage、timer 等作答邏輯完全不變。

## 7. Mock 考卷規格

| 欄位 | 值 |
|---|---|
| id | `assigned-demo` |
| title | `計算機概論 模擬測驗` |
| subtitle | `公職考試 ・ 50 題 ・ 60 分鐘` |
| durationSec | `3600` |
| 題數 | 50 |
| 題型 | 全部 `single`（單選） |
| 選項 | 每題 4 個（A–D） |
| 配分 | 每題 2 分（總分 100） |
| 題目 id | `assigned-01` ～ `assigned-50` |

題目內容採公職「計算機概論」常見主題：計算機基本結構、數字系統與資料表示、作業系統、網路、資料庫、資訊安全、程式語言與演算法等。畫面不顯示正確答案，也不做批改。

## 8. 持久化與邊界行為

- localStorage key 由既有 storage 模組產生：`exam-session:v1:assigned-demo`。
- 重新整理（作答中）：依 deadline 重算剩餘時間，保留答案、標註、目前題號。
- 重新整理（暫停中）：保持暫停並顯示遮罩。
- 重新整理（已交卷）：顯示交卷成功畫面。
- 首頁於考卷已交卷時顯示「已完成」；點「重新測試」需確認，確認後清除 session 並重新開始。
- 暫停遮罩的「重新測試」同樣重置答案、標註、題號與時間。
- localStorage 損壞或不可用時，沿用現有錯誤處理。

## 9. 測試策略

- `src/data/assignedExam.test.ts`
  - `getAssignedExam(ASSIGNED_EXAM_ID)` 回傳考卷；未知 id 回傳 `null`。
  - 考卷為 50 題、全部單選、每題 4 個選項、選項 id 在題內不重複、題目 id 不重複。
  - 每題 2 分、`durationSec` 為 3600、標題與副標符合規格。
- `src/components/exam/ExamList.test.tsx`
  - 有已交卷 session 時顯示「已完成」與「重新測試」。
  - 確認重新測試後會清除該考卷的 session。
- 既有 `ExamClient`、`useExamSession`、reducer、storage、timer 測試維持通過。
- 刪除 `src/data/exams.ts` 與 `src/data/exams.test.ts`。

## 10. 驗收標準

1. 首頁只出現一張「計算機概論 模擬測驗」，顯示 50 題、60:00、開始考試。
2. 點擊後進入 `/exam/assigned-demo`，可看到 50 題單選題與題目地圖。
3. 倒數、標註、題目跳轉、上一題／下一題、暫停／繼續、交卷、時間到自動交卷全部正常。
4. 重新整理後答案、標註、題號與剩餘時間保留。
5. 交卷後只顯示「交卷成功」，回首頁顯示「已完成」。
6. 首頁或暫停遮罩可重新測試，狀態完全重置。
7. `npm test`、`npm run typecheck`、`npm run lint`、`npm run build` 全部通過。
