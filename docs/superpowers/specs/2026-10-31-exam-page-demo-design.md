# 考試頁面展示版 — 設計規格

- 日期：2026-10-31
- 專案：ExamAndLearn 小組作業（個人負責模組：考試頁面）
- 狀態：已與使用者確認設計方向

## 1. 目的

在本地做一個**獨立可跑的考試頁面展示版**，用 mock 資料完整呈現架構圖中「考試頁面」的 14 項功能，作為小組後續整合的參考實作。

## 2. 範圍

### 2.1 本次包含

- 試卷選擇頁（入口）
- 考試頁（14 項功能）
- 交卷成功畫面（只顯示成功與返回）
- 全響應式版面（桌機、平板、手機）

### 2.2 本次不包含

- 題庫管理、出題、AI 出題
- 成績計算、成績結果、錯題分析
- 權限管理、登入
- 後端 API、資料庫
- 真正的防弊功能

## 3. 技術決策

| 項目 | 決策 |
|---|---|
| 框架 | Next.js（App Router，最新穩定版） |
| 語言 | TypeScript |
| 樣式 | Tailwind CSS v4 |
| 狀態管理 | `useReducer` ＋ 自訂 hook `useExamSession` |
| 持續化 | `localStorage` |
| 資料來源 | 前端 mock 資料 |
| 視覺風格 | C 傳統校務系統風 |
| 執行環境 | 本地 `npm run dev` |

### 3.1 視覺規範（C 校務風格）

- 主色：深藍 `#2f5597`
- 頂欄：深藍底、白色文字
- 卡片：白色、1px 灰藍邊框、直角（`border-radius: 0`）
- 排版：資訊密集、字級偏小、表格感
- 狀態色：已作答深藍、已標註金黃 `#e0b64a`、未作答白底、目前題藍色外框
- 字型：`Microsoft JhengHei`、`Noto Sans TC`，題幹可用襯線字

## 4. 檔案結構

```
src/
  app/
    layout.tsx
    page.tsx                    試卷選擇頁
    globals.css                 設計變數與共用樣式
    exam/[examId]/page.tsx      考試頁（Server Component 包裝）
  components/exam/
    ExamList.tsx               試卷清單與已完成狀態
    ExamClient.tsx              考試頁 Client Component
    ExamHeader.tsx              標題、倒數、進度、暫停、交卷、返回
    QuestionCard.tsx            題目、選項、標註
    QuestionMap.tsx             題目地圖（桌機側欄／手機抽屜）
    PauseOverlay.tsx            暫停遮罩與重新測試
    SubmitDialog.tsx            交卷確認
    SuccessView.tsx             交卷成功
  features/exam/
    examReducer.ts              純函式狀態轉移
    useExamSession.ts           reducer、actions、localStorage 同步
    timer.ts                    時間格式化與剩餘時間計算
    storage.ts                  localStorage 讀寫與版本檢查
  data/exams.ts                 mock 考卷
  types/exam.ts                 型別定義
```

## 5. 資料模型

```ts
type QuestionType = 'single' | 'multiple' | 'boolean';

interface ExamOption {
  id: string;   // A / B / C / D；是非題為 T / F
  text: string;
}

interface ExamQuestion {
  id: string;
  type: QuestionType;
  prompt: string;
  options: ExamOption[];
  points: number;
}

interface Exam {
  id: string;
  title: string;
  subtitle: string;
  durationSec: number;
  questions: ExamQuestion[];
}

type Answer = string | string[];

interface ExamSessionState {
  examId: string;
  answers: Record<string, Answer>;
  flags: string[];
  currentIndex: number;
  remainingSec: number;
  status: 'running' | 'paused' | 'submitted';
  deadline: number | null;
}
```

## 6. Mock 考卷

| 考卷 | 題數 | 時間 | 題型組成 |
|---|---|---|---|
| 資料結構與演算法 期中測驗 | 10 題 | 10 分鐘 | 單選 5、多選 3、是非 2 |
| 計算機概論 小考 | 5 題 | 5 分鐘 | 單選 3、多選 1、是非 1 |
| 作業系統 期末測驗 | 15 題 | 20 分鐘 | 單選 8、多選 4、是非 3 |

- 每題皆有配分（1～3 分）。
- 題目內容為靜態 mock 文字，不接題庫。
- 每份考卷至少一題多選、一題是非。

## 7. 狀態與計時規則

### 7.1 計時

- 開始考試時：`deadline = Date.now() + remainingSec * 1000`。
- 每秒以 `Date.now()` 重算 `remainingSec = max(0, ceil((deadline - now) / 1000))`，避免計時器漂移。
- `remainingSec === 0` 時觸發強制交卷。
- 暫停時：停止計時，保存當下 `remainingSec`，`deadline = null`。
- 恢復時：重新計算 `deadline`。
- 剩餘 60 秒內，計時器顯示紅色。

### 7.2 狀態轉移

- `ANSWER`：寫入／更新答案。
- `TOGGLE_FLAG`：加入或移除標註。
- `GOTO`：設定 `currentIndex`。
- `TICK`：更新 `remainingSec`；歸零時轉為 `submitted`。
- `PAUSE`：`status = 'paused'`，保存剩餘秒數。
- `RESUME`：`status = 'running'`，重算 `deadline`。
- `RESET`：清空答案、標註、回到第 0 題、時間回到考試原始長度、`status = 'running'`。
- `SUBMIT`：`status = 'submitted'`。

### 7.3 持續化

- Key：`exam-session:v1:<examId>`；三份考卷各自獨立。
- 儲存欄位：`answers`、`flags`、`currentIndex`、`remainingSec`、`status`、`deadline`。
- 每次狀態變更後寫入（作答、標註、跳題、計時每 5 秒、暫停、恢復、重置、交卷）。
- 載入時驗證版本與資料形狀；格式錯誤則清除並重新開始。
- `localStorage` 不可用時，退回記憶體狀態，並在畫面顯示一次性提示。

## 8. 14 項功能行為

| # | 功能 | 行為 |
|---|---|---|
| 1 | 倒數計時 | 頂欄 `mm:ss`；剩 60 秒變紅；歸零自動交卷 |
| 2 | 題目標註 | 每題右上星號切換；地圖同步顯示 |
| 3 | 題目跳轉 | 點地圖題號平滑捲動至該題；捲動時以 `IntersectionObserver` 更新目前題號 |
| 4 | 題目 map | 四種狀態：已答、未答、已標註、目前題；桌機固定側欄、手機底部按鈕開啟抽屜 |
| 5 | 上一題／下一題 | 捲動至相鄰題目；第一題／最後一題時按鈕停用 |
| 6 | 交卷 | 確認視窗顯示已答／總題數、未答題號、已標註數；可取消 |
| 7 | 時間到強制交卷 | 不跳確認；直接進入交卷成功並顯示「時間到，已自動交卷」 |
| 8 | 題目呈現 | 題號、題型標籤、配分、題幹 |
| 9 | 選項呈現 | 單選／是非為圓形；多選為方形 |
| 10 | 選擇答案 | 單選／是非為單一選項；多選可勾選／取消；變更立即儲存 |
| 11 | 考試暫停 | 全頁遮罩、題目模糊、計時停止；按「繼續考試」恢復 |
| 12 | 重新測試 | 位於暫停遮罩；確認後重置答案、標註、計時並捲回第一題 |
| 13 | 返回試卷選擇頁 | 頂欄返回；確認後保留進度並回首頁 |
| 14 | 答題進度條 | 已答題數／總題數；隨作答即時更新 |

### 8.1 題目標註與地圖狀態優先序

- 已標註：金黃底。
- 已作答：深藍底。
- 同時已標註與已作答：金黃底＋右下角小藍點。
- 目前題：額外藍色外框。

### 8.2 試卷選擇頁

- 顯示三份考卷的標題、題數、時間。
- 開始考試：進入 `/exam/[examId]`。
- 若該考卷已有 `submitted` 狀態，顯示「已完成」，點擊時詢問是否重新測試；確認後清除狀態並重新開始。

## 9. 響應式規則

- `>= 1024px`：題目地圖固定於右側，寬度約 264px。
- `768～1023px`：地圖改為右側可收合面板。
- `< 768px`：
  - 題目單欄呈現。
  - 題目地圖由底部固定按鈕開啟抽屜。
  - 頂欄只保留標題、倒數、暫停、交卷；進度條置於頂欄下方。
  - 選項維持全寬，觸控目標高度至少 44px。

## 10. 邊界情況

| 情況 | 處理 |
|---|---|
| 重新整理（作答中） | 依 `deadline` 重算剩餘時間，接續作答 |
| 重新整理（暫停中） | 保持暫停，顯示遮罩 |
| 重新整理（已交卷） | 顯示交卷成功畫面 |
| 未作答直接交卷 | 允許，確認視窗列出未答題號 |
| 同一考卷開兩個分頁 | 以最後寫入的狀態為準（不做即時同步） |
| localStorage 損壞 | 清除該 key，重新開始 |
| localStorage 不可用 | 記憶體模式，顯示提示 |
| 剩餘時間歸零 | 自動交卷，不顯示確認視窗 |

## 11. 測試策略

- 單元測試（Vitest）：
  - `examReducer`：作答、標註、跳題、暫停、恢復、重置、交卷、計時歸零。
  - `timer`：`mm:ss` 格式化、剩餘時間計算、邊界值 0。
  - `storage`：寫入／讀取／版本不符／損壞資料。
- 元件測試（React Testing Library）：
  - 單選只能選一個、多選可複選、是非題切換。
  - 暫停遮罩出現／消失。
- 手動驗收：
  - 14 項功能逐項操作。
  - 桌機、平板、手機三種寬度。
  - 重新整理後接續作答。

## 12. 驗收標準

1. `npm run dev` 可啟動，首頁看到三份考卷。
2. 進入任一考卷可作答，三種題型皆正確運作。
3. 14 項功能皆可操作，且符合第 8 節行為。
4. 重新整理後答案、標註、題號、剩餘時間保留。
5. 倒數歸零會自動交卷。
6. 手機寬度下可開啟題目地圖抽屜並跳題。
7. 交卷後只顯示成功畫面，不產生任何成績分析。
8. `npm run test` 與 `npm run build` 通過。
