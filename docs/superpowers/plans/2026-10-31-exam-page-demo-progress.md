# 考試頁面展示版 — 執行進度

分支：`exam-page-demo`
Worktree：`C:\Users\ec14084\.local\share\opencode\worktree\047d70\exam-page-demo`
計畫：`docs/superpowers/plans/2026-10-31-exam-page-demo.md`

| # | 任務 | 狀態 | Commit |
|---|---|---|---|
| 1 | 建立 Next.js 專案與測試工具 | 完成 | `c71e756`, `e098dfe` |
| 2 | 型別、時間與摘要工具 | 完成 | `691efc9` |
| 3 | 考試狀態 reducer | 完成 | `63562a4`, `80b0362` |
| 4 | localStorage 與考試 session hook | 完成 | `f22c00d`, `0b24c09`, `f576738` |
| 5 | Mock 考卷資料 | 完成 | `b063152` |
| 6 | C 校務風格樣式與試卷選擇頁 | 完成 | `11da737` |
| 7 | 考試標頭與題目卡片 | 完成 | `fa9a7f8` |
| 8 | 題目地圖、暫停、交卷與成功畫面 | 完成 | `875ed22` |
| 9 | 考試頁整合與路由 | 完成 | `f25f358`, `466f457` |
| 10 | 邊界情況、響應式與完整驗證 | 完成 | 見下方驗證紀錄 |

## 與計畫的必要偏離

- **`useExamSession` 不在 render 期呼叫 `Date.now()`**（`466f457`）：Next.js 16 的 Cache Components 會在 prerender 期間阻擋 Client Component 讀取目前時間，原本的 lazy `useReducer` 初始化會讓 `npm run build` 失敗。改為初始狀態 `deadline: null`，掛載後在 effect 中計算 deadline（無存檔時 dispatch `RESET`）。`createInitialState` 的 `deadline` 型別因此放寬為 `number | null`。
- **考試頁 `params` 包在 `<Suspense>` 內**（`f25f358`）：Next.js 16 要求 URL 資料（`params`）不可在 Suspense 外讀取，否則 dev overlay 報 `instant-shell-url-data` 並卡在載入畫面。page 改為同步 shell + `ExamContent` 子元件在 Suspense 內 `await params`。
- **`ExamList` 的 localStorage 同步 effect** 加上 `eslint-disable-next-line react-hooks/set-state-in-effect`（`11da737`）：localStorage 只能在 client 掛載後讀取，避免 hydration mismatch。

## Task 10 驗證紀錄

指令（全部通過）：

- `npm test` → 8 files / 56 tests passed
- `npm run typecheck` → 通過
- `npm run lint` → 通過
- `npm run build` → 成功，routes：`/`、`/_not-found`、`/exam/[examId]`（含 3 份考卷 prerender）

瀏覽器手動驗證（dev server，800px 視窗＝平板／右側面板佈局）：

1. 首頁三份考卷；交卷後顯示「已完成」與「重新測試」。
2. 單選可換答案、多選可勾選／取消、是非題可作答，進度條同步更新。
3. 標註後題目地圖該題變金黃；同時作答＋標註顯示藍點。
4. 題目地圖點題會捲動到該題並更新目前題號；平板／桌機右側面板可「收合題目地圖」再展開。
5. 上一題／下一題正常，第 1 題「上一題」停用。
6. 暫停：遮罩顯示凍結時間，等待 1.6 秒時間不變；「繼續考試」後恢復倒數。
7. 重新整理：答案、標註、目前題號、剩餘時間保留；暫停狀態也保留（仍顯示遮罩且不倒數）。
8. 交卷確認視窗顯示已作答／已標註／未作答題號；取消可繼續作答；確認後顯示「交卷成功」。
9. 剩餘 3 秒時自動交卷，顯示「時間到，系統已自動交卷。」，storage 狀態為 `submitted`。
10. 暫停→重新測試→確認：答案、標註清空、回到第 1 題、時間回到完整長度。
11. 返回：取消留在原頁；確定回首頁且進度保留。
12. 不存在的考卷顯示「找不到這份考卷」頁。
13. 無障礙：對話框開啟時焦點移入、背景 `inert`、交卷視窗可按 Escape 關閉；選項有 `aria-pressed` 與題目群組標籤。

未以真實 390px 裝置驗證（瀏覽器工具無法調整視窗寬度）：<768px 的底部按鈕與抽屜由 `md:hidden` 控制，平板以上改用右側面板（`md:block`，可收合），符合 spec §9。
