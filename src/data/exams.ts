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
