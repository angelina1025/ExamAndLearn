import { ExamQuestion, CategoryNode } from '../types';

export const initialCategories: CategoryNode[] = [
  {
    id: 'cs',
    name: '電腦科學與資訊工程',
    count: 1240,
    isOpen: true,
    children: [
      {
        id: 'dsa',
        name: '資料結構與演算法',
        count: 580,
        isOpen: true,
        children: [
          { id: 'arrays-lists', name: '陣列與鏈結串列', count: 120 },
          { id: 'stacks-queues', name: '堆疊與佇列', count: 85 },
          {
            id: 'sorting-searching',
            name: '排序與搜尋演算法',
            count: 145,
            isOpen: true,
            children: [
              { id: 'quicksort', name: '快速排序與分割', count: 42 },
              { id: 'mergesort', name: '合併排序與分治', count: 38 },
              { id: 'heapsort', name: '堆積排序', count: 35 },
              { id: 'binary-search', name: '二元搜尋', count: 30 },
            ],
          },
          { id: 'trees-balanced', name: '樹狀結構與平衡樹', count: 230 },
        ],
      },
      { id: 'os', name: '作業系統原理', count: 320 },
      { id: 'networks', name: '計算機網路', count: 340 },
    ],
  },
  {
    id: 'math',
    name: '高等微積分與線性代數',
    count: 890,
  },
  {
    id: 'se',
    name: '軟體工程與系統設計',
    count: 410,
  },
];

// 50 exam questions dataset
export const mockQuestions: ExamQuestion[] = Array.from({ length: 50 }, (_, i) => {
  const num = i + 1;
  const isWrong = [7, 12, 19, 23, 27, 32, 37, 44].includes(num);
  const isFlagged = [7, 14, 23].includes(num);

  if (num === 7) {
    return {
      id: 7,
      code: '#QS-0715',
      prompt: '在平均情況下，QuickSelect（快速選擇演算法）的時間複雜度為 O(n)，但在最壞情況（Worst Case）下，若選取的基準點（Pivot）極度不均衡，其時間複雜度可能退化為多少？',
      type: 'single',
      typeLabel: '單選題',
      difficulty: 'medium',
      difficultyScore: 0.62,
      difficultyLabel: '中等',
      points: 2.5,
      topic: '演算法 / 快速排序 (QuickSelect)',
      category: '排序與搜尋演算法',
      tags: ['演算法', '快速排序', 'Partition'],
      options: [
        { id: 'A', text: 'O(n log n)', subtext: '對數線性時間複雜度' },
        { id: 'B', text: 'O(n)', subtext: '嚴格線性時間' },
        { id: 'C', text: 'O(n²)', subtext: '最壞劃分情況' },
        { id: 'D', text: 'O(2ⁿ)', subtext: '指數級時間複雜度' },
      ],
      correctAnswer: 'C',
      userAnswer: 'A',
      isFlagged: true,
      status: 'wrong',
      userWrongReason: '誤將最壞情況的分割與最佳遞迴樹深度相混淆。',
      standardReason: '每次選中最大或最小值，遞迴深度退化為 n，累積 n + (n-1) + ... + 1。',
      explanation: 'QuickSelect 運用了與 QuickSort 相同的分割 (Partition) 機制。不同之處在於，QuickSort 需遞迴處理兩側子陣列，而 QuickSelect 僅遞迴進入包含目標第 k 小元素的單一側。在極端不利狀況（例如陣列已排序且每次均選擇最後一個元素為 Pivot），每次分割僅將問題規模縮小 1，導致遞迴層數高達 n，總工作量累積為等差級數 n + (n-1) + ... + 1 = O(n²)。',
      keyTakeaway: '引入隨機基準點 (Randomized Pivot) 或中位數的中位數法 (Median-of-Medians)，可保證最壞情況亦達到嚴格 O(n) 線性時間。',
      lastModified: '2025-03-24 10:15',
      author: '陳維倫 講座教授',
    };
  }

  if (num === 12) {
    return {
      id: 12,
      code: '#QS-0789',
      prompt: '在包含 n 個節點的標準二元最小堆積 (Binary Min-Heap) 中，若要尋找其中的「最大元素」，其時間複雜度為何？',
      type: 'single',
      typeLabel: '單選題',
      difficulty: 'medium',
      difficultyScore: 0.55,
      difficultyLabel: '中等',
      points: 2.0,
      topic: '資料結構 / Min-Heap 最小堆積',
      category: '樹狀結構與平衡樹',
      tags: ['資料結構', '堆積結構', '偏序關係'],
      options: [
        { id: 'A', text: 'O(1)', subtext: '常數時間直讀' },
        { id: 'B', text: 'O(log n)', subtext: '樹高層次搜尋' },
        { id: 'C', text: 'O(n log n)', subtext: '重構堆積耗時' },
        { id: 'D', text: 'O(n)', subtext: '需線性搜尋所有葉節點' },
      ],
      correctAnswer: 'D',
      userAnswer: 'B',
      isFlagged: false,
      status: 'wrong',
      userWrongReason: '誤認為最小堆積具有二元搜尋樹 (BST) 之橫向全域有序性。',
      standardReason: '最大元素必定落在底層葉節點群中，葉節點數量約為 ⌈n/2⌉。',
      conceptBreakdown: '二元最小堆積僅維護父節點小於等於子節點的偏序關係 (Partial Order)，並不保證左右子節點之間的大小關聯。因此，最大值必然出現在無子節點的葉節點 (Leaves) 之一。二元堆積中約有 ⌈n/2⌉ 個葉節點，在無額外索引結構輔助下，必須進行過歷掃描，耗時為 O(n)！',
      memoryAnchor: 'Min-Heap 查最小值為 O(1)，BST 查極值為 O(h)，而 Min-Heap 查最大值需掃描所有葉子，故為 O(n)！',
      lastModified: '2025-03-22 14:30',
      author: '林敬言 副教授',
    };
  }

  if (num === 14) {
    return {
      id: 14,
      code: '#QS-0814',
      prompt: '在包含 n 個節點的平衡二元搜尋樹（例如 AVL 樹或紅黑樹 Red-Black Tree）中，搜尋特定關鍵元素（Key Search）的 worst-case 時間複雜度（Time Complexity）為何？',
      type: 'single',
      typeLabel: '單選題',
      difficulty: 'medium',
      difficultyScore: 0.52,
      difficultyLabel: '中等',
      points: 2.0,
      topic: '平衡二元搜尋樹',
      category: '樹狀結構與平衡樹',
      tags: ['二元搜尋樹', 'AVL樹', '時間複雜度'],
      options: [
        { id: 'A', text: 'O(1)', subtext: '常數時間查找 (Constant Time Search)' },
        { id: 'B', text: 'O(log n)', subtext: '對數時間複雜度 (Logarithmic Complexity Bound)' },
        { id: 'C', text: 'O(n)', subtext: '線性循序搜尋 (Linear Sequential Search)' },
        { id: 'D', text: 'O(n log n)', subtext: '線性對數遍歷界限 (Linearithmic Traversal Limit)' },
      ],
      correctAnswer: 'B',
      userAnswer: 'B',
      isFlagged: true,
      status: 'correct',
      hasDiagram: true,
      diagramTitle: '結構驗證圖 14-A (TREE INVARIANT SCHEMA)',
      diagramSubtitle: 'AVL 自平衡不變量展示',
      explanation: 'AVL 樹嚴格維持每個節點的平衡因子 (Balance Factor) 介於 -1, 0, 1 之間。根據費氏數列下界推導，高度 h ≤ 1.44 log₂(n+2)，搜尋、插入、刪除均能在 O(log n) 時間內完成。',
      keyTakeaway: '相較於未平衡的 BST 最壞退化為 O(n) 斜曲鏈結串列，自平衡樹保證 O(log n) 最壞上界。',
      lastModified: '2025-03-25 09:10',
      author: '陳維倫 講座教授',
    };
  }

  if (num === 23) {
    return {
      id: 23,
      code: '#QS-0823',
      prompt: '使用 Dijkstra 演算法求解單源最短路徑時，若圖中存在負權重邊（Negative Weight Edge）且無負環，下列敘述何者正確？',
      type: 'single',
      typeLabel: '單選題',
      difficulty: 'hard',
      difficultyScore: 0.35,
      difficultyLabel: '困難',
      points: 2.5,
      topic: '圖論 / 最短路徑演算法',
      category: '圖論與搜尋',
      tags: ['Dijkstra', '圖論', '貪婪演算法'],
      options: [
        { id: 'A', text: '演算法仍保證求得正確解', subtext: '只要無負環即可收斂' },
        { id: 'B', text: '演算法可能陷入無窮迴圈', subtext: '重複造訪頂點' },
        { id: 'C', text: '演算法可能產生錯誤的最短路徑結果', subtext: '因貪婪性質假設已確認節點距離不可再被縮減' },
        { id: 'D', text: '時間複雜度自動升為 O(V³)', subtext: '退化為 Floyd-Warshall' },
      ],
      correctAnswer: 'C',
      userAnswer: 'A',
      isFlagged: true,
      status: 'wrong',
      userWrongReason: '誤以為只要無負環，貪婪原則就能自發修正常見路徑鬆弛。',
      standardReason: 'Dijkstra 依賴「離起點最近節點已定型」的貪婪貪心假設，負權邊會打破此單調性。應使用 Bellman-Ford。',
      explanation: 'Dijkstra 演算法本質為貪心法 (Greedy)，一旦某節點從 Priority Queue 中被取出並標記為 visited，便視其最短距離已確定，後續不會再度更新其已確定之距離。若後續路徑出現負權重邊，將無法回溯鬆弛該節點。',
      keyTakeaway: '有負邊圖請直接採用 Bellman-Ford 演算法或 SPFA 演算法！',
      lastModified: '2025-03-20 16:00',
      author: '林敬言 副教授',
    };
  }

  // Generic generator for remaining items
  const topics = [
    '陣列與指標運算',
    '鏈結串列倒轉',
    '佇列與循環佇列',
    '合併排序演算法',
    '堆積排序與 Heapify',
    '圖論深度優先搜尋 (DFS)',
    '廣度優先搜尋 (BFS)',
    '動態規劃背包問題',
    '紅黑樹顏色翻轉與旋轉',
    '雜湊表碰撞處理 (Chaining vs Open Addressing)',
    '拓撲排序 (Topological Sort)',
    '最小生成樹 (Kruskal vs Prim)',
  ];

  const questionTopic = topics[i % topics.length];
  const isAnswered = num <= 14;

  return {
    id: num,
    code: `#QS-0${800 + num}`,
    prompt: `關於 ${questionTopic} 的時間複雜度與空間複雜度特性分析，下列各項敘述何者最符合計算理論之標準定義？`,
    type: 'single',
    typeLabel: '單選題',
    difficulty: num % 5 === 0 ? 'hard' : num % 2 === 0 ? 'medium' : 'basic',
    difficultyScore: num % 5 === 0 ? 0.38 : num % 2 === 0 ? 0.58 : 0.82,
    difficultyLabel: num % 5 === 0 ? '困難' : num % 2 === 0 ? '中等' : '基礎',
    points: 2.0,
    topic: questionTopic,
    category: [
      '資料結構與演算法',
      '排序與搜尋演算法',
      '樹狀結構與平衡樹',
      '作業系統原理',
      '計算機網路',
      '軟體工程與系統設計',
      '高等微積分與線性代數',
    ][num % 7],
    tags: [questionTopic.split(' ')[0], '演算法', '期中考'],
    options: [
      { id: 'A', text: '最佳情況下執行時間為 O(1)，最壞情況為 O(n)', subtext: '常見線性搜尋範式' },
      { id: 'B', text: '平均時間複雜度為 O(n log n)，且為原地排序 (In-place)', subtext: '空間複雜度 O(1)' },
      { id: 'C', text: '需要 O(n) 的額外空間輔助以維持運算穩定性', subtext: '非原地演算法' },
      { id: 'D', text: '最壞情況時間複雜度受限於 O(log² n) 的多項式對數界限', subtext: '多對數邊界' },
    ],
    correctAnswer: 'B',
    userAnswer: isWrong ? 'A' : isAnswered ? 'B' : undefined,
    isFlagged: isFlagged,
    status: isWrong ? 'wrong' : isAnswered ? 'correct' : 'unanswered',
    explanation: `本題考查 ${questionTopic} 之核心運算代價。根據經典演算法教科書規範，B 選項為最精確之理論界限。`,
    keyTakeaway: `複習此主題時，請特別牢記平均與最差情況的漸近上界差額。`,
    lastModified: '2025-03-18 11:20',
    author: '考選小組 審定',
  };
});

// Question Bank Table Rows matching Image 7
export const mockBankQuestions = [
  {
    id: 'QS-0842',
    badge: '代碼測驗',
    prompt: '請說明 Lomuto 與 Hoare 劃分法 (Partition Scheme) 在快速排序中的交換次數與指針移動特性...',
    tags: ['演算法', '排序分析'],
    type: '單選題',
    typeBadgeColor: 'bg-blue-100 text-blue-700 border-blue-200',
    difficulty: '中等',
    difficultyScore: '0.58',
    difficultyColor: 'bg-amber-100 text-amber-800 border-amber-200',
    points: 2,
    lastModified: '2 小時前',
    author: '陳維倫 講座教授',
    isSelected: true,
  },
  {
    id: 'QS-0841',
    badge: '歷屆大考題',
    prompt: '下列何種排序演算法在遭遇相同鍵值 (Equal Keys) 之元素時，能具備嚴格的穩定性保證？',
    tags: ['穩定性檢定', '合併排序'],
    type: '單選題',
    typeBadgeColor: 'bg-blue-100 text-blue-700 border-blue-200',
    difficulty: '基礎',
    difficultyScore: '0.84',
    difficultyColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    points: 1,
    lastModified: '昨天 16:42',
    author: '系統自動匯入',
    isSelected: false,
  },
  {
    id: 'QS-0839',
    badge: '高鑑別度',
    prompt: '基數排序 (Radix Sort) 是否在不經任何浮點數位元轉換之情況下，仍直接適用於 IEEE-754 浮點數表示法？',
    tags: ['基數排序', 'IEEE-754'],
    type: '是非題',
    typeBadgeColor: 'bg-purple-100 text-purple-700 border-purple-200',
    difficulty: '困難',
    difficultyScore: '0.29',
    difficultyColor: 'bg-rose-100 text-rose-800 border-rose-200',
    points: 3,
    lastModified: '3 天前',
    author: '林敬言 副教授',
    isSelected: false,
  },
  {
    id: 'QS-0835',
    badge: '多選檢驗',
    prompt: '關於二元搜尋演算法 (Binary Search) 在已排序陣列中的運用，下列敘述哪些為真？',
    tags: ['二元搜尋', '分治法'],
    type: '多選題',
    typeBadgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
    difficulty: '中等',
    difficultyScore: '0.52',
    difficultyColor: 'bg-amber-100 text-amber-800 border-amber-200',
    points: 2.5,
    lastModified: '5 天前',
    author: '考選小組 審定',
    isSelected: false,
  },
  {
    id: 'QS-0820',
    badge: '程式手寫題',
    prompt: '實作堆積排序 (Heap Sort) 之 `heapify` 演算法，並計算自底向上建構堆積之時間複雜度上界。',
    tags: ['堆積排序', '自底向上建構'],
    type: '簡答 / 實作',
    typeBadgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    difficulty: '困難',
    difficultyScore: '0.33',
    difficultyColor: 'bg-rose-100 text-rose-800 border-rose-200',
    points: 5,
    lastModified: '1 週前',
    author: '陳維倫 講座教授',
    isSelected: false,
  },
];

// Sample raw text for Image 5 (Smart Import)
export const defaultImportText = `1. 什麼是里氏替換原則 (Liskov Substitution Principle, LSP)？
A. 子類別必須能夠替換其父類別且不破壞程式正確性
B. 類別應僅有一個引起其變化的原因
C. 高層模組不應依賴低層模組，兩者皆應依賴抽象介面
答案: A
解析: LSP 是物件導向 SOLID 原則之一，確保衍生類別保有父類別行為的一致性。

2. 在平均情況下，QuickSelect 演算法的時間複雜度為何？
A. O(n) - 線性時間
B. O(log n)
C. O(n²) - 最壞分割情況
解析: 透過隨機 pivot 分割，期望時間複雜度為線性。

3. 在 Python 中，Tuple（元組）是可變物件 (Mutable)。
答案: 否
解析: Tuple 於初始化建立後即不可變更其成員指標 (Immutable)。如需動態變更內容應使用 List。`;
