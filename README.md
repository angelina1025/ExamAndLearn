<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# 線上測驗管理系統 (QuizCMS - Admin Portal)

本專案採用 **React + TypeScript (.tsx) + Vite + Tailwind CSS** 建置，支援 6 人團隊協同開發與雙層 Google Sheet 資料庫架構。

---

## 專案架構與資料流設計

1. **技術棧與多人協作**：
   - 採用 React + TypeScript (`.tsx`)，為支援 6 人團隊協同開發，各功能頁面高度解耦獨立，將專屬子元件收斂在各自頁面目錄 (`src/pages/<PageName>/components/`) 內，避免 Git 合併衝突。
   - 統一使用 `@/` 路徑別名（指向 `src/`）進行跨模組引用。
2. **雙層 Google Sheet 資料庫架構**：
   - **公用 Sheet**：由 `.env.local`（或 `.env`）中的 `VITE_PUBLIC_GOOGLE_SHEET_URL`（相容 `VITE_GOOGLE_SHEET_URL`）綁定，存放公用題庫 (`test_bank`)、公用試卷 (`quiz_bank_publish` / `quiz_bank_unpublish`)、學科分類 (`categories`)、角色 (`roles`) 與使用者帳號列表 (`users`)。
   - **私人 Sheet**：登入後從公用 `users` 表中的 `google_sheet_URL` 欄位動態讀取，存放個人自訂題庫、個人考卷與作答紀錄。
   - **資料格式特性**：題目選項欄位 (`option`) 為 JSON 字串（如 `{"A": "...", "B": "..."}`），答案欄位 (`answer`) 支援單選或逗號分隔之多選（如 `"A, C"`）。

---

## 目標目錄結構規範

```text
QuizCMS/                                     # 專案根目錄
├── public/                                  # 靜態資源 (範本檔 template.xlsx/csv 等)
├── src/
│   ├── assets/                              # 樣式與圖標 (styles/ 全域 CSS, icons/ SVG)
│   ├── types/                               # TypeScript 型別定義
│   │   ├── question.ts                      # 題庫資料型別 (id, test_id, question, option, answer, explanation)
│   │   ├── exam.ts                          # 試卷資料型別 (試卷 ID、題號清單、考試時限、合格分數)
│   │   ├── session.ts                       # 作答狀態型別 (userAnswers, flags, timer, isPaused)
│   │   ├── result.ts                        # 考試成果與錯題型別 (score, correctCount, wrongCount, analysis)
│   │   ├── user.ts                          # 個人資料型別 (uuid, nickname, role, google_sheet_URL)
│   │   └── sheet.ts                         # Google Sheet 欄位 mapping 介面
│   │
│   ├── services/                            # 資料存取層 (Google Sheet / GAS API)
│   │   ├── client.ts                        # Fetch / Axios 基礎連線器
│   │   ├── publicSheet.ts                   # 公用 Sheet 存取服務
│   │   ├── userSheet.ts                     # 私人 Sheet 存取服務 (動態依使用者的 google_sheet_URL 讀寫)
│   │   └── fileExport.ts                    # 錯題下載 (匯出 Excel / 寫回 Google Sheet)
│   │
│   ├── contexts/ (或 stores/)               # React 全域狀態
│   │   ├── AuthContext.tsx                  # 登入身分、角色與個人 google_sheet_URL
│   │   └── ExamSessionContext.tsx           # 考試進行中核心狀態 (作答暫存、計時倒數、暫停狀態)
│   │
│   ├── hooks/                               # 共用 Custom Hooks
│   │   ├── useCountdown.ts                  # 倒數計時與強制交卷
│   │   ├── useQuestionFilter.ts             # 題目與試卷搜尋、排序、篩選
│   │   └── useSheetSync.ts                  # Google Sheet 連線與同步狀態
│   │
│   ├── utils/                               # 共用純輔助函式
│   │   ├── sheetParser.ts                   # 解析 option JSON 字串與答案切割
│   │   ├── fileParsers.ts                   # 題目上傳解析器 (解析 Excel, CSV, TXT)
│   │   ├── scoreCalculator.ts               # 計算答對/錯題數與學科分析
│   │   └── formatters.ts                    # 時間轉 mm:ss、日期字串格式化
│   │
│   ├── components/                          # 通用共用 UI 元件 (無特定業務邏輯)
│   │   ├── common/                          # Button.tsx, Modal.tsx, Input.tsx, Table.tsx
│   │   └── layout/                          # Header.tsx, Sidebar.tsx, MainLayout.tsx
│   │
│   ├── pages/                               # 核心 9 大功能頁面 (專屬元件放在各頁的 components/)
│   │   ├── QuestionManage/                  # 1. 題庫管理 (CRUD)
│   │   │   ├── index.tsx
│   │   │   ├── QuestionModal.tsx
│   │   │   └── components/ (FilterBar.tsx)
│   │   ├── ExamManage/                      # 2. 試卷管理 (CRUD)
│   │   │   ├── index.tsx
│   │   │   ├── ExamFormModal.tsx
│   │   │   └── components/ (ExamTable.tsx)
│   │   ├── QuestionSelector/                # 3. 題目選擇頁面 (組卷頁)
│   │   │   ├── index.tsx
│   │   │   └── components/ (SourceTab.tsx, QuestionPickerList.tsx, AssemblySummaryBar.tsx)
│   │   ├── QuestionUpload/                  # 4. 題目上傳頁面
│   │   │   ├── index.tsx
│   │   │   └── components/ (FileDropzone.tsx, SingleQuestionForm.tsx, PreviewTable.tsx, TargetSelector.tsx)
│   │   ├── ExamLobby/                       # 5. 試卷選擇頁面 (測驗大廳)
│   │   │   ├── index.tsx
│   │   │   └── components/ (ScopeFilter.tsx, ExamCard.tsx)
│   │   ├── ExamSession/                     # 6. 考試介面 (核心作答)
│   │   │   ├── index.tsx
│   │   │   └── components/ (ExamHeader.tsx, QuestionDisplay.tsx, QuestionMap.tsx, ProgressBar.tsx, NavigationButtons.tsx)
│   │   ├── ExamResult/                      # 7. 考試結果頁面
│   │   │   ├── index.tsx
│   │   │   └── components/ (ScoreBanner.tsx, QuestionReviewList.tsx, WrongFilterTab.tsx, ExportActions.tsx, SubjectAnalysisChart.tsx)
│   │   ├── WrongQuestionHub/                # 8. 錯題匯入首頁
│   │   │   ├── index.tsx
│   │   │   └── components/ (ImportUploader.tsx, TrendStatsChart.tsx, RetestActionCard.tsx)
│   │   └── Profile/                         # 9. 個人資料頁面
│   │       ├── index.tsx
│   │       └── components/ (ProfileForm.tsx, SheetUrlBinding.tsx)
│   │
│   ├── routes/                              # 路由設定 (index.tsx, ProtectedRoute.tsx)
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
```

---

## 本地端開發與執行 (Run Locally)

**環境需求：** Node.js (v18+)

1. 安裝套件：
   ```bash
   npm install
   ```
2. 設定環境變數：
   於 `.env.local` 或 `.env` 設定公用試算表網址：
   ```env
   VITE_PUBLIC_GOOGLE_SHEET_URL="https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit"
   ```
3. 啟動開發伺服器：
   ```bash
   npm run dev
   ```

## 使用語言

Next.js
