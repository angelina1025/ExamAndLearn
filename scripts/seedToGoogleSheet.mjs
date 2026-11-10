// scripts/seedToGoogleSheet.mjs
import fs from 'node:fs';
import path from 'node:path';

const SHEET_ID = '175LZPtMn7Af4sMsk8ywzLgjRVBX0NncOLOOfa58j3uA';
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbySKASrw-Ft0Ao7pwz2RAH4dQymQaLzdE1BtrmqproI9LTZQ3P_5hb6rj3CwmozL8pNfA/exec';

// 讀取現有工作表資料
async function fetchSheetRows(name) {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&headers=1&sheet=${encodeURIComponent(name)}`;
  const res = await fetch(url);
  const text = await res.text();
  const match = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]+)\);?\s*$/);
  if (!match || !match[1]) return { cols: [], rows: [] };
  const json = JSON.parse(match[1]);
  const cols = json.table.cols.map((c) => c.label || c.id || '');
  const rows = json.table.rows.map((r) =>
    (r.c || []).map((cell) => (cell ? cell.f !== undefined && cell.f !== null ? cell.f : cell.v : ''))
  );
  return { cols, rows };
}

// 讀取 50 題 mock 題目
const mockDataPath = path.resolve('src/data/assignedExamQuestions.ts');
const mockContent = fs.readFileSync(mockDataPath, 'utf-8');

// 動態載入編譯後的 Question 實體
import('../src/data/assignedExamQuestions.ts').catch(() => null);

// 為了確保完整獨立執行，將 50 題題目與解答直接構建
const { assignedExam } = await import('../src/services/mockExamData.ts');

const QUESTION_ANSWERS = {
  'assigned-01': { answer: 'B', explanation: '算術邏輯單元（ALU）負責執行所有算術運算與邏輯判斷。', tags: '計算機結構, ALU' },
  'assigned-02': { answer: 'B', explanation: '1 個位元組（Byte）等於 8 個位元（Bit）。', tags: '數值系統, 單位換算' },
  'assigned-03': { answer: 'C', explanation: '二進位 1011 = 1*8 + 0*4 + 1*2 + 1*1 = 11。', tags: '進位制換算, 二進位' },
  'assigned-04': { answer: 'C', explanation: '十六進位 1A = 1*16 + 10 = 26。', tags: '進位制換算, 十六進位' },
  'assigned-05': { answer: 'B', explanation: '快取記憶體（Cache）置於 CPU 與主記憶體之間，可加快 CPU 存取常用資料的速度。', tags: '記憶體階層, Cache' },
  'assigned-06': { answer: 'B', explanation: 'DRAM（動態隨機存取記憶體）斷電後資料會消失，屬於揮發性記憶體。', tags: '記憶體種類, RAM' },
  'assigned-07': { answer: 'C', explanation: 'ROM（唯讀記憶體）為非揮發性記憶體，電腦關機後仍會保留資料。', tags: '記憶體種類, ROM' },
  'assigned-08': { answer: 'A', explanation: '電腦匯流排（Bus）是連接各單元並傳輸資料、位址與控制訊號的通道。', tags: '硬體架構, 匯流排' },
  'assigned-09': { answer: 'B', explanation: '作業系統核心功能包括行程排程、記憶體管理、檔案管理與裝置控制。', tags: '作業系統, 系統功能' },
  'assigned-10': { answer: 'A', explanation: '分頁（Paging）機制將記憶體切成固定大小的頁框，可徹底消除外部碎片。', tags: '記憶體管理, Paging' },
  'assigned-11': { answer: 'A', explanation: '虛擬記憶體透過硬碟輔助交換，讓程式可使用的定址空間大於實體 RAM。', tags: '記憶體管理, 虛擬記憶體' },
  'assigned-12': { answer: 'C', explanation: '死結四大必要條件為互斥、持有並等待、不可剝奪、循環等待；「可剝奪」不是死結條件。', tags: '作業系統, Deadlock' },
  'assigned-13': { answer: 'A', explanation: 'Round Robin（輪轉排程）依固定的時間片段（Time Slice）讓行程輪流執行。', tags: '行程排程, Round Robin' },
  'assigned-14': { answer: 'C', explanation: '同行程中的多個執行緒各自擁有獨立的 Stack 與暫存器，但共用 Heap 與全域變數。', tags: '多執行緒, Thread' },
  'assigned-15': { answer: 'A', explanation: '中斷（Interrupt）機制用於通知 CPU 立即暫停手邊工作以處理外部突發事件。', tags: '計算機結構, 中斷' },
  'assigned-16': { answer: 'A', explanation: '檔案系統（File System）主要負責管理儲存媒體上的檔案與目錄結構。', tags: '檔案系統, OS' },
  'assigned-17': { answer: 'A', explanation: 'TCP 協定具備連線導向、流量控制、壅塞控制與可靠傳輸機制。', tags: '網路協定, TCP/IP' },
  'assigned-18': { answer: 'B', explanation: 'IPv4 位址由 32 個位元（4 個位元組）組成。', tags: '網路位址, IPv4' },
  'assigned-19': { answer: 'A', explanation: '網域名稱系統（DNS）負責將網域名稱解析轉換為對應的 IP 位址。', tags: '網路服務, DNS' },
  'assigned-20': { answer: 'C', explanation: 'HTTP 協定的預設通訊埠為 80；HTTPS 為 443。', tags: '網路通訊埠, HTTP' },
  'assigned-21': { answer: 'C', explanation: 'OSI 第 3 層網路層（Network Layer）負責邏輯定址與路徑選擇（Routing）。', tags: 'OSI模型, 網路層' },
  'assigned-22': { answer: 'A', explanation: '路由器運作於網路層，主要功能為依據路由表選擇最佳路徑並轉送封包。', tags: '網路設備, 路由器' },
  'assigned-23': { answer: 'A', explanation: '防火牆透過自訂規則過濾並控管進出內部網路的封包流量。', tags: '資訊安全, 防火牆' },
  'assigned-24': { answer: 'A', explanation: '對稱式加密演算法中，資料加密與解密使用完全相同的同一把金鑰。', tags: '密碼學, 對稱加密' },
  'assigned-25': { answer: 'A', explanation: '數位簽章利用非對稱金鑰提供發送者身分驗證、資料完整性保證與不可否認性。', tags: '資訊安全, 數位簽章' },
  'assigned-26': { answer: 'C', explanation: '勒索軟體（Ransomware）會惡意加密使用者資料以勒索贖金，屬於惡意程式。', tags: '資安威脅, 惡意程式' },
  'assigned-27': { answer: 'A', explanation: '結構化查詢語言（SQL）用於管理、查詢與操作關聯式資料庫（RDBMS）。', tags: '資料庫, SQL' },
  'assigned-28': { answer: 'A', explanation: '主鍵（Primary Key）必須滿足實體完整性：值不可重複（唯一）且不得為空。', tags: '資料庫設計, Primary Key' },
  'assigned-29': { answer: 'A', explanation: '資料庫正規化透過階層分解減少資料重複度，避免新增、刪除及修改異常。', tags: '資料庫正規化, 關聯模型' },
  'assigned-30': { answer: 'A', explanation: '關聯式資料庫以二維資料表（Table/Relation）組織資料及欄位間之關係。', tags: '資料庫模型, 資料表' },
  'assigned-31': { answer: 'B', explanation: '二分搜尋法對已排序資料每次切半搜尋，平均時間複雜度為 O(log n)。', tags: '演算法, 搜尋時間複雜度' },
  'assigned-32': { answer: 'A', explanation: '穩定排序保證相同鍵值的元素在排序後維持原先的相對順序不變。', tags: '排序演算法, 穩定性' },
  'assigned-33': { answer: 'B', explanation: '堆疊（Stack）結構遵循後進先出（Last-In First-Out, LIFO）原則。', tags: '資料結構, Stack' },
  'assigned-34': { answer: 'B', explanation: '佇列（Queue）結構遵循先進先出（First-In First-Out, FIFO）原則。', tags: '資料結構, Queue' },
  'assigned-35': { answer: 'A', explanation: '單向鏈結串列在頭部插入新節點僅需變更指標，時間複雜度為 O(1)。', tags: '鏈結串列, 時間複雜度' },
  'assigned-36': { answer: 'A', explanation: '雜湊表在均勻雜湊無嚴重碰撞之理想狀況下，平均搜尋時間複雜度為 O(1)。', tags: '雜湊表, HashTable' },
  'assigned-37': { answer: 'A', explanation: '遞迴函式必須具備終止條件（Base Case），否則會陷入無窮遞迴導致堆疊溢位。', tags: '程式邏輯, 遞迴' },
  'assigned-38': { answer: 'A', explanation: '編譯器將整個原始程式預先編譯為目的機器碼；直譯器則逐行直譯執行。', tags: '編譯原理, Compiler' },
  'assigned-39': { answer: 'A', explanation: '資料型別規範了變數在記憶體所佔大小、有效取值範圍以及合法的運算操作。', tags: '程式語言, 資料型別' },
  'assigned-40': { answer: 'A', explanation: '物件導向的封裝隱藏物件內部實作細節，僅透過公用方法或介面提供存取。', tags: '物件導向, 封裝' },
  'assigned-41': { answer: 'A', explanation: 'IaaS（基礎架構即服務）提供虛擬機器、網路、儲存空間等基礎運算資源。', tags: '雲端運算, IaaS' },
  'assigned-42': { answer: 'D', explanation: '大數據 3V 特徵為 Volume、Velocity、Variety；Color 並非 3V。', tags: '新興科技, 大數據' },
  'assigned-43': { answer: 'A', explanation: '機器學習需透過大量訓練資料集與合適的演算法訓練出具預測能力的模型。', tags: '人工智慧, 機器學習' },
  'assigned-44': { answer: 'A', explanation: '物聯網（IoT）的核心概念是將各種實體設備嵌入感測器並連網交換資訊。', tags: '物聯網, IoT' },
  'assigned-45': { answer: 'A', explanation: '區塊鏈以分散式帳本、密碼學雜湊與共識機制確保資料難以被單方竄改。', tags: '新興科技, 區塊鏈' },
  'assigned-46': { answer: 'A', explanation: '數位憑證由具有公信力的憑證授權中心（Certificate Authority, CA）簽發。', tags: '網路安全, 數位憑證' },
  'assigned-47': { answer: 'A', explanation: '儲存使用者密碼時應使用單向雜湊演算法並加入隨機鹽值以防範彩虹表破解。', tags: '資安防護, 密碼雜湊' },
  'assigned-48': { answer: 'A', explanation: '備份 3-2-1 原則：至少 3 份資料、使用 2 種不同儲存媒介、至少 1 份存放在異地。', tags: '資料備份, 3-2-1原則' },
  'assigned-49': { answer: 'A', explanation: '個人資料保護法主要旨在規範個人資料合理使用並保護個人隱私與人格權。', tags: '資訊法規, 個資法' },
  'assigned-50': { answer: 'D', explanation: '馮紐曼計算機五大單元包含輸入、輸出、記憶、控制與算術邏輯單元；不含通訊單元。', tags: '計算機結構, 五大單元' },
};

async function main() {
  console.log('1. 正在讀取目前試算表中的 test_bank 與 quiz_bank_publish...');
  const { cols: testBankCols, rows: testBankRows } = await fetchSheetRows('test_bank');
  const { cols: pubCols, rows: pubRows } = await fetchSheetRows('quiz_bank_publish');

  console.log(`目前 test_bank 共有 ${testBankRows.length} 列題目`);
  console.log(`目前 quiz_bank_publish 共有 ${pubRows.length} 列試卷`);

  // 保留原有的非 assigned 題目
  const existingFiltered = testBankRows.filter(
    (row) => !String(row[1] || '').startsWith('assigned-')
  );

  const nowTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');

  // 轉換 50 題 assignedExam 題目
  const assignedRows = assignedExam.questions.map((q, idx) => {
    const meta = QUESTION_ANSWERS[q.id] || { answer: 'A', explanation: '', tags: '計算機概論' };
    const optionMap = {};
    for (const opt of q.options) {
      optionMap[opt.id] = opt.text;
    }
    const rowId = existingFiltered.length + idx + 1;
    return [
      rowId,
      q.id,
      q.prompt,
      JSON.stringify(optionMap),
      meta.answer,
      meta.explanation,
      3, // difficulty
      q.points || 2, // score
      3, // category_id (數學/計算機)
      meta.tags,
      nowTimestamp,
      1, // updated_by
      1, // time
    ];
  });

  const finalTestBankRows = [
    testBankCols,
    ...existingFiltered.map((row, i) => [i + 1, ...row.slice(1)]),
    ...assignedRows,
  ];

  console.log(`即將寫入 test_bank: 標題列 + ${finalTestBankRows.length - 1} 題（含 50 題計算機概論）`);

  // 處理 quiz_bank_publish
  const existingPubFiltered = pubRows.filter(
    (row) => String(row[1] || '') !== 'assigned-demo'
  );

  const allAssignedIds = assignedExam.questions.map((q) => q.id).join(', ');
  const assignedPaperRow = [
    existingPubFiltered.length + 1,
    'assigned-demo',
    '計算機概論 模擬測驗',
    '計算機概論',
    3,
    50,
    100,
    60,
    nowTimestamp,
    allAssignedIds,
  ];

  const finalPubRows = [
    pubCols,
    ...existingPubFiltered.map((row, i) => [i + 1, ...row.slice(1)]),
    assignedPaperRow,
  ];

  console.log(`即將寫入 quiz_bank_publish: 標題列 + ${finalPubRows.length - 1} 份試卷（含計算機概論 模擬測驗）`);

  console.log('2. 正在透過 GAS script 執行 replaceSheets 寫入 Google 試算表...');
  const res = await fetch(SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({
      action: 'replaceSheets',
      sheets: [
        { sheetName: 'test_bank', rows: finalTestBankRows },
        { sheetName: 'quiz_bank_publish', rows: finalPubRows },
      ],
    }),
  });

  const resJson = await res.json();
  console.log('GAS 回應結果:', resJson);

  if (resJson.success) {
    console.log('🎉 成功將 50 題試題與計算機概論試卷寫入 Google 試算表 (test_bank & quiz_bank_publish)！');
  } else {
    console.error('寫入失敗:', resJson.error);
    process.exit(1);
  }
}

main().catch(console.error);

