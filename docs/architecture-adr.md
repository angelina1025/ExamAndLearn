# ADR-001：採用 Next.js BFF Route 與雙層 Google Sheet 作為資料儲存架構

- **狀態**：已採納（Accepted）
- **日期**：2026-11-19

## 背景與問題
團隊需要在有限學期時程內完成多人協作的線上測驗與題庫管理系統，同時兼顧「公用題庫共享」與「每位使用者可保管私人題庫與錯題紀錄」的權限隔離需求，且需避免瀏覽器直接請求 Google Sheets / GAS 產生 CORS 與金鑰外洩問題。

## 決策
採用 **Next.js 16 App Router BFF（`/api/sheet`、`/api/export`）+ 雙層 Google Sheet（公用 Sheet + 私人 `google_sheet_URL`）** 架構。

## 品質屬性權衡
- **安全性與可維護性（優點）**：由 `/api/sheet/route.ts` 在伺服器端讀取環境變數並轉發 gviz / GAS 請求，前端不接觸後端試算表設定。
- **開發效率（優點）**：無需額外維運關聯式資料庫伺服器，搭配 `SheetBindGuardModal` 即可防止未綁定私人試算表的寫入錯誤。
- **效能限制（已知權衡）**：受限於 Google Sheets API 讀寫延遲，不適合高併發即時萬人考試；未來若需擴展，可透過 `ISheetRepository` 介面替換為 PostgreSQL / Firestore。
