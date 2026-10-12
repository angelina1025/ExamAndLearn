# Test 測驗評量與題庫平台 (my-exam-system)

專業線上測驗、題庫管理、成績與錯題深度分析、智慧組題評量平台。支援**雙模式架構**：離線預載題庫隨時隨地無網作答與算分，連線時自動無縫同步雲端後端。

---

## 專案目錄結構 (Architecture)

```text
my-exam-system/
├── frontend/                     # 前端客戶端 (TypeScript + PWA 離線支援)
│   ├── public/                   # 離線 PWA Web App Manifest、Service Worker、向量圖示
│   │   ├── manifest.json         # PWA 應用設定 (獨立全螢幕 standalone)
│   │   ├── sw.js                 # 核心 Service Worker 離線快取通道
│   │   └── icons/                # 跨端 App 圖示
│   ├── src/
│   │   ├── components/           # 視圖組件 (ExamView, AnalysisView, BankView, ImportView)
│   │   │   └── OfflineManagerModal.tsx # 離線題庫預載中心與錯題管理
│   │   ├── services/
│   │   │   ├── offlineStorage.ts # 離線本機快取、錯題本儲存、離線歷史紀錄
│   │   │   └── examEngine.ts     # 雙重評分閘道 (連線後端 / 離線客戶端引擎)
│   │   ├── data/                 # 內建模擬與已發布完整題庫
│   │   ├── types/                # 前端介面與資料型別
│   │   └── App.tsx               # 前端核心狀態調度
│   └── index.html                # 前端主入口與 Service Worker 註冊
│
├── backend/                      # 獨立後端服務 (Express / Node.js API)
│   ├── app/
│   │   ├── api/
│   │   │   └── questionController.ts # 題庫下載、同步與即時評分控制器
│   │   ├── models/
│   │   │   └── schema.ts             # 資料庫模型與資料合約
│   │   └── main.ts                   # 後端 API 服務核心
│   └── tests/
│       └── grading.test.ts           # 評分與業務邏輯測試
│
├── server.ts                     # 全端伺服器整合入口 (整合 Backend API 與 Frontend)
├── metadata.json                 # 平台屬性與能力定義
└── README.md                     # 專案架構與使用說明手冊
```

---

## 核心功能說明

### 1. 預先下載題庫 (Offline Question Bank Preload)
- 點選頂部導覽列綠色的**「離線題庫預載」**或題庫管理頁的「預載離線題庫」按鈕。
- 系統自動透過後端 `GET /api/questions` 將題庫打包快取至瀏覽器本機儲存空間（LocalStorage / IndexedDB / Service Worker）。
- 下載完成後即具備「完全離線使用」標記，拔掉網路或開啟飛航模式題目依然完整。

### 2. 離線隨時考試與即時評分 (Offline Exam & Dual Grading Engine)
- 無論連線或斷線，測驗計時、選項答題、進度條、交卷評分均零延遲響應。
- **雙重評分引擎**：
  - **連線時**：優先經由後端 `POST /api/exam/grade` 評分並回傳診斷分析。
  - **離線時**：自動無縫降級至前端本機秒速評分引擎，算出總分、正確率與錯題診斷。

### 3. 離線錯題本與針對性重考 (Wrong Question Notebook & Retest)
- 考試交卷後，所有錯誤題目會自動收錄至**「本機錯題筆記本」**。
- 隨時點擊**「重測錯題」**或從離線中心選擇**「離線重考錯題本」**，系統將自動抽出錯題並清空作答紀錄，讓學生隨時隨地突破弱點。

### 4. 手機及電腦跨裝置支援 (PWA & Multi-Device Support)
- **手機端 (iOS Safari / Android Chrome)**：
  - 支援「加入主畫面 (Add to Home Screen)」，安裝為全螢幕 App，通勤通學無網路照常刷題。
- **電腦端 (Mac / Windows / Linux)**：
  - 網址列支援一鍵安裝獨立應用，支援 50 題矩陣診斷板與大螢幕分割檢視。

---

## 啟動與建置指令

```bash
# 安裝相依套件
npm install

# 啟動開發伺服器 (包含後端 API 與前端 Vite 中間件，連接於 port 3000)
npm run dev

# 專案程式碼型別檢查
npm run lint

# 前端專案生產環境建置
npm run build
```
