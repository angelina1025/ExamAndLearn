// server.ts
import express2 from "express";
import path from "path";
import { fileURLToPath } from "url";

// backend/app/main.ts
import express from "express";

// frontend/src/data/mockData.ts
var initialCategories = [
  {
    id: "cs",
    name: "\u96FB\u8166\u79D1\u5B78\u8207\u8CC7\u8A0A\u5DE5\u7A0B",
    count: 1240,
    isOpen: true,
    children: [
      {
        id: "dsa",
        name: "\u8CC7\u6599\u7D50\u69CB\u8207\u6F14\u7B97\u6CD5",
        count: 580,
        isOpen: true,
        children: [
          { id: "arrays-lists", name: "\u9663\u5217\u8207\u93C8\u7D50\u4E32\u5217", count: 120 },
          { id: "stacks-queues", name: "\u5806\u758A\u8207\u4F47\u5217", count: 85 },
          {
            id: "sorting-searching",
            name: "\u6392\u5E8F\u8207\u641C\u5C0B\u6F14\u7B97\u6CD5",
            count: 145,
            isOpen: true,
            children: [
              { id: "quicksort", name: "\u5FEB\u901F\u6392\u5E8F\u8207\u5206\u5272", count: 42 },
              { id: "mergesort", name: "\u5408\u4F75\u6392\u5E8F\u8207\u5206\u6CBB", count: 38 },
              { id: "heapsort", name: "\u5806\u7A4D\u6392\u5E8F", count: 35 },
              { id: "binary-search", name: "\u4E8C\u5143\u641C\u5C0B", count: 30 }
            ]
          },
          { id: "trees-balanced", name: "\u6A39\u72C0\u7D50\u69CB\u8207\u5E73\u8861\u6A39", count: 230 }
        ]
      },
      { id: "os", name: "\u4F5C\u696D\u7CFB\u7D71\u539F\u7406", count: 320 },
      { id: "networks", name: "\u8A08\u7B97\u6A5F\u7DB2\u8DEF", count: 340 }
    ]
  },
  {
    id: "math",
    name: "\u9AD8\u7B49\u5FAE\u7A4D\u5206\u8207\u7DDA\u6027\u4EE3\u6578",
    count: 890
  },
  {
    id: "se",
    name: "\u8EDF\u9AD4\u5DE5\u7A0B\u8207\u7CFB\u7D71\u8A2D\u8A08",
    count: 410
  }
];
var mockQuestions = Array.from({ length: 50 }, (_, i) => {
  const num = i + 1;
  const isWrong = [7, 12, 19, 23, 27, 32, 37, 44].includes(num);
  const isFlagged = [7, 14, 23].includes(num);
  if (num === 7) {
    return {
      id: 7,
      code: "#QS-0715",
      prompt: "\u5728\u5E73\u5747\u60C5\u6CC1\u4E0B\uFF0CQuickSelect\uFF08\u5FEB\u901F\u9078\u64C7\u6F14\u7B97\u6CD5\uFF09\u7684\u6642\u9593\u8907\u96DC\u5EA6\u70BA O(n)\uFF0C\u4F46\u5728\u6700\u58DE\u60C5\u6CC1\uFF08Worst Case\uFF09\u4E0B\uFF0C\u82E5\u9078\u53D6\u7684\u57FA\u6E96\u9EDE\uFF08Pivot\uFF09\u6975\u5EA6\u4E0D\u5747\u8861\uFF0C\u5176\u6642\u9593\u8907\u96DC\u5EA6\u53EF\u80FD\u9000\u5316\u70BA\u591A\u5C11\uFF1F",
      type: "single",
      typeLabel: "\u55AE\u9078\u984C",
      difficulty: "medium",
      difficultyScore: 0.62,
      difficultyLabel: "\u4E2D\u7B49",
      points: 2.5,
      topic: "\u6F14\u7B97\u6CD5 / \u5FEB\u901F\u6392\u5E8F (QuickSelect)",
      category: "\u6392\u5E8F\u8207\u641C\u5C0B\u6F14\u7B97\u6CD5",
      tags: ["\u6F14\u7B97\u6CD5", "\u5FEB\u901F\u6392\u5E8F", "Partition"],
      options: [
        { id: "A", text: "O(n log n)", subtext: "\u5C0D\u6578\u7DDA\u6027\u6642\u9593\u8907\u96DC\u5EA6" },
        { id: "B", text: "O(n)", subtext: "\u56B4\u683C\u7DDA\u6027\u6642\u9593" },
        { id: "C", text: "O(n\xB2)", subtext: "\u6700\u58DE\u5283\u5206\u60C5\u6CC1" },
        { id: "D", text: "O(2\u207F)", subtext: "\u6307\u6578\u7D1A\u6642\u9593\u8907\u96DC\u5EA6" }
      ],
      correctAnswer: "C",
      userAnswer: "A",
      isFlagged: true,
      status: "wrong",
      userWrongReason: "\u8AA4\u5C07\u6700\u58DE\u60C5\u6CC1\u7684\u5206\u5272\u8207\u6700\u4F73\u905E\u8FF4\u6A39\u6DF1\u5EA6\u76F8\u6DF7\u6DC6\u3002",
      standardReason: "\u6BCF\u6B21\u9078\u4E2D\u6700\u5927\u6216\u6700\u5C0F\u503C\uFF0C\u905E\u8FF4\u6DF1\u5EA6\u9000\u5316\u70BA n\uFF0C\u7D2F\u7A4D n + (n-1) + ... + 1\u3002",
      explanation: "QuickSelect \u904B\u7528\u4E86\u8207 QuickSort \u76F8\u540C\u7684\u5206\u5272 (Partition) \u6A5F\u5236\u3002\u4E0D\u540C\u4E4B\u8655\u5728\u65BC\uFF0CQuickSort \u9700\u905E\u8FF4\u8655\u7406\u5169\u5074\u5B50\u9663\u5217\uFF0C\u800C QuickSelect \u50C5\u905E\u8FF4\u9032\u5165\u5305\u542B\u76EE\u6A19\u7B2C k \u5C0F\u5143\u7D20\u7684\u55AE\u4E00\u5074\u3002\u5728\u6975\u7AEF\u4E0D\u5229\u72C0\u6CC1\uFF08\u4F8B\u5982\u9663\u5217\u5DF2\u6392\u5E8F\u4E14\u6BCF\u6B21\u5747\u9078\u64C7\u6700\u5F8C\u4E00\u500B\u5143\u7D20\u70BA Pivot\uFF09\uFF0C\u6BCF\u6B21\u5206\u5272\u50C5\u5C07\u554F\u984C\u898F\u6A21\u7E2E\u5C0F 1\uFF0C\u5C0E\u81F4\u905E\u8FF4\u5C64\u6578\u9AD8\u9054 n\uFF0C\u7E3D\u5DE5\u4F5C\u91CF\u7D2F\u7A4D\u70BA\u7B49\u5DEE\u7D1A\u6578 n + (n-1) + ... + 1 = O(n\xB2)\u3002",
      keyTakeaway: "\u5F15\u5165\u96A8\u6A5F\u57FA\u6E96\u9EDE (Randomized Pivot) \u6216\u4E2D\u4F4D\u6578\u7684\u4E2D\u4F4D\u6578\u6CD5 (Median-of-Medians)\uFF0C\u53EF\u4FDD\u8B49\u6700\u58DE\u60C5\u6CC1\u4EA6\u9054\u5230\u56B4\u683C O(n) \u7DDA\u6027\u6642\u9593\u3002",
      lastModified: "2025-03-24 10:15",
      author: "\u9673\u7DAD\u502B \u8B1B\u5EA7\u6559\u6388"
    };
  }
  if (num === 12) {
    return {
      id: 12,
      code: "#QS-0789",
      prompt: "\u5728\u5305\u542B n \u500B\u7BC0\u9EDE\u7684\u6A19\u6E96\u4E8C\u5143\u6700\u5C0F\u5806\u7A4D (Binary Min-Heap) \u4E2D\uFF0C\u82E5\u8981\u5C0B\u627E\u5176\u4E2D\u7684\u300C\u6700\u5927\u5143\u7D20\u300D\uFF0C\u5176\u6642\u9593\u8907\u96DC\u5EA6\u70BA\u4F55\uFF1F",
      type: "single",
      typeLabel: "\u55AE\u9078\u984C",
      difficulty: "medium",
      difficultyScore: 0.55,
      difficultyLabel: "\u4E2D\u7B49",
      points: 2,
      topic: "\u8CC7\u6599\u7D50\u69CB / Min-Heap \u6700\u5C0F\u5806\u7A4D",
      category: "\u6A39\u72C0\u7D50\u69CB\u8207\u5E73\u8861\u6A39",
      tags: ["\u8CC7\u6599\u7D50\u69CB", "\u5806\u7A4D\u7D50\u69CB", "\u504F\u5E8F\u95DC\u4FC2"],
      options: [
        { id: "A", text: "O(1)", subtext: "\u5E38\u6578\u6642\u9593\u76F4\u8B80" },
        { id: "B", text: "O(log n)", subtext: "\u6A39\u9AD8\u5C64\u6B21\u641C\u5C0B" },
        { id: "C", text: "O(n log n)", subtext: "\u91CD\u69CB\u5806\u7A4D\u8017\u6642" },
        { id: "D", text: "O(n)", subtext: "\u9700\u7DDA\u6027\u641C\u5C0B\u6240\u6709\u8449\u7BC0\u9EDE" }
      ],
      correctAnswer: "D",
      userAnswer: "B",
      isFlagged: false,
      status: "wrong",
      userWrongReason: "\u8AA4\u8A8D\u70BA\u6700\u5C0F\u5806\u7A4D\u5177\u6709\u4E8C\u5143\u641C\u5C0B\u6A39 (BST) \u4E4B\u6A6B\u5411\u5168\u57DF\u6709\u5E8F\u6027\u3002",
      standardReason: "\u6700\u5927\u5143\u7D20\u5FC5\u5B9A\u843D\u5728\u5E95\u5C64\u8449\u7BC0\u9EDE\u7FA4\u4E2D\uFF0C\u8449\u7BC0\u9EDE\u6578\u91CF\u7D04\u70BA \u2308n/2\u2309\u3002",
      conceptBreakdown: "\u4E8C\u5143\u6700\u5C0F\u5806\u7A4D\u50C5\u7DAD\u8B77\u7236\u7BC0\u9EDE\u5C0F\u65BC\u7B49\u65BC\u5B50\u7BC0\u9EDE\u7684\u504F\u5E8F\u95DC\u4FC2 (Partial Order)\uFF0C\u4E26\u4E0D\u4FDD\u8B49\u5DE6\u53F3\u5B50\u7BC0\u9EDE\u4E4B\u9593\u7684\u5927\u5C0F\u95DC\u806F\u3002\u56E0\u6B64\uFF0C\u6700\u5927\u503C\u5FC5\u7136\u51FA\u73FE\u5728\u7121\u5B50\u7BC0\u9EDE\u7684\u8449\u7BC0\u9EDE (Leaves) \u4E4B\u4E00\u3002\u4E8C\u5143\u5806\u7A4D\u4E2D\u7D04\u6709 \u2308n/2\u2309 \u500B\u8449\u7BC0\u9EDE\uFF0C\u5728\u7121\u984D\u5916\u7D22\u5F15\u7D50\u69CB\u8F14\u52A9\u4E0B\uFF0C\u5FC5\u9808\u9032\u884C\u904E\u6B77\u6383\u63CF\uFF0C\u8017\u6642\u70BA O(n)\uFF01",
      memoryAnchor: "Min-Heap \u67E5\u6700\u5C0F\u503C\u70BA O(1)\uFF0CBST \u67E5\u6975\u503C\u70BA O(h)\uFF0C\u800C Min-Heap \u67E5\u6700\u5927\u503C\u9700\u6383\u63CF\u6240\u6709\u8449\u5B50\uFF0C\u6545\u70BA O(n)\uFF01",
      lastModified: "2025-03-22 14:30",
      author: "\u6797\u656C\u8A00 \u526F\u6559\u6388"
    };
  }
  if (num === 14) {
    return {
      id: 14,
      code: "#QS-0814",
      prompt: "\u5728\u5305\u542B n \u500B\u7BC0\u9EDE\u7684\u5E73\u8861\u4E8C\u5143\u641C\u5C0B\u6A39\uFF08\u4F8B\u5982 AVL \u6A39\u6216\u7D05\u9ED1\u6A39 Red-Black Tree\uFF09\u4E2D\uFF0C\u641C\u5C0B\u7279\u5B9A\u95DC\u9375\u5143\u7D20\uFF08Key Search\uFF09\u7684 worst-case \u6642\u9593\u8907\u96DC\u5EA6\uFF08Time Complexity\uFF09\u70BA\u4F55\uFF1F",
      type: "single",
      typeLabel: "\u55AE\u9078\u984C",
      difficulty: "medium",
      difficultyScore: 0.52,
      difficultyLabel: "\u4E2D\u7B49",
      points: 2,
      topic: "\u5E73\u8861\u4E8C\u5143\u641C\u5C0B\u6A39",
      category: "\u6A39\u72C0\u7D50\u69CB\u8207\u5E73\u8861\u6A39",
      tags: ["\u4E8C\u5143\u641C\u5C0B\u6A39", "AVL\u6A39", "\u6642\u9593\u8907\u96DC\u5EA6"],
      options: [
        { id: "A", text: "O(1)", subtext: "\u5E38\u6578\u6642\u9593\u67E5\u627E (Constant Time Search)" },
        { id: "B", text: "O(log n)", subtext: "\u5C0D\u6578\u6642\u9593\u8907\u96DC\u5EA6 (Logarithmic Complexity Bound)" },
        { id: "C", text: "O(n)", subtext: "\u7DDA\u6027\u5FAA\u5E8F\u641C\u5C0B (Linear Sequential Search)" },
        { id: "D", text: "O(n log n)", subtext: "\u7DDA\u6027\u5C0D\u6578\u904D\u6B77\u754C\u9650 (Linearithmic Traversal Limit)" }
      ],
      correctAnswer: "B",
      userAnswer: "B",
      isFlagged: true,
      status: "correct",
      hasDiagram: true,
      diagramTitle: "\u7D50\u69CB\u9A57\u8B49\u5716 14-A (TREE INVARIANT SCHEMA)",
      diagramSubtitle: "AVL \u81EA\u5E73\u8861\u4E0D\u8B8A\u91CF\u5C55\u793A",
      explanation: "AVL \u6A39\u56B4\u683C\u7DAD\u6301\u6BCF\u500B\u7BC0\u9EDE\u7684\u5E73\u8861\u56E0\u5B50 (Balance Factor) \u4ECB\u65BC -1, 0, 1 \u4E4B\u9593\u3002\u6839\u64DA\u8CBB\u6C0F\u6578\u5217\u4E0B\u754C\u63A8\u5C0E\uFF0C\u9AD8\u5EA6 h \u2264 1.44 log\u2082(n+2)\uFF0C\u641C\u5C0B\u3001\u63D2\u5165\u3001\u522A\u9664\u5747\u80FD\u5728 O(log n) \u6642\u9593\u5167\u5B8C\u6210\u3002",
      keyTakeaway: "\u76F8\u8F03\u65BC\u672A\u5E73\u8861\u7684 BST \u6700\u58DE\u9000\u5316\u70BA O(n) \u659C\u66F2\u93C8\u7D50\u4E32\u5217\uFF0C\u81EA\u5E73\u8861\u6A39\u4FDD\u8B49 O(log n) \u6700\u58DE\u4E0A\u754C\u3002",
      lastModified: "2025-03-25 09:10",
      author: "\u9673\u7DAD\u502B \u8B1B\u5EA7\u6559\u6388"
    };
  }
  if (num === 23) {
    return {
      id: 23,
      code: "#QS-0823",
      prompt: "\u4F7F\u7528 Dijkstra \u6F14\u7B97\u6CD5\u6C42\u89E3\u55AE\u6E90\u6700\u77ED\u8DEF\u5F91\u6642\uFF0C\u82E5\u5716\u4E2D\u5B58\u5728\u8CA0\u6B0A\u91CD\u908A\uFF08Negative Weight Edge\uFF09\u4E14\u7121\u8CA0\u74B0\uFF0C\u4E0B\u5217\u6558\u8FF0\u4F55\u8005\u6B63\u78BA\uFF1F",
      type: "single",
      typeLabel: "\u55AE\u9078\u984C",
      difficulty: "hard",
      difficultyScore: 0.35,
      difficultyLabel: "\u56F0\u96E3",
      points: 2.5,
      topic: "\u5716\u8AD6 / \u6700\u77ED\u8DEF\u5F91\u6F14\u7B97\u6CD5",
      category: "\u5716\u8AD6\u8207\u641C\u5C0B",
      tags: ["Dijkstra", "\u5716\u8AD6", "\u8CAA\u5A6A\u6F14\u7B97\u6CD5"],
      options: [
        { id: "A", text: "\u6F14\u7B97\u6CD5\u4ECD\u4FDD\u8B49\u6C42\u5F97\u6B63\u78BA\u89E3", subtext: "\u53EA\u8981\u7121\u8CA0\u74B0\u5373\u53EF\u6536\u6582" },
        { id: "B", text: "\u6F14\u7B97\u6CD5\u53EF\u80FD\u9677\u5165\u7121\u7AAE\u8FF4\u5708", subtext: "\u91CD\u8907\u9020\u8A2A\u9802\u9EDE" },
        { id: "C", text: "\u6F14\u7B97\u6CD5\u53EF\u80FD\u7522\u751F\u932F\u8AA4\u7684\u6700\u77ED\u8DEF\u5F91\u7D50\u679C", subtext: "\u56E0\u8CAA\u5A6A\u6027\u8CEA\u5047\u8A2D\u5DF2\u78BA\u8A8D\u7BC0\u9EDE\u8DDD\u96E2\u4E0D\u53EF\u518D\u88AB\u7E2E\u6E1B" },
        { id: "D", text: "\u6642\u9593\u8907\u96DC\u5EA6\u81EA\u52D5\u5347\u70BA O(V\xB3)", subtext: "\u9000\u5316\u70BA Floyd-Warshall" }
      ],
      correctAnswer: "C",
      userAnswer: "A",
      isFlagged: true,
      status: "wrong",
      userWrongReason: "\u8AA4\u4EE5\u70BA\u53EA\u8981\u7121\u8CA0\u74B0\uFF0C\u8CAA\u5A6A\u539F\u5247\u5C31\u80FD\u81EA\u767C\u4FEE\u6B63\u5E38\u898B\u8DEF\u5F91\u9B06\u5F1B\u3002",
      standardReason: "Dijkstra \u4F9D\u8CF4\u300C\u96E2\u8D77\u9EDE\u6700\u8FD1\u7BC0\u9EDE\u5DF2\u5B9A\u578B\u300D\u7684\u8CAA\u5A6A\u8CAA\u5FC3\u5047\u8A2D\uFF0C\u8CA0\u6B0A\u908A\u6703\u6253\u7834\u6B64\u55AE\u8ABF\u6027\u3002\u61C9\u4F7F\u7528 Bellman-Ford\u3002",
      explanation: "Dijkstra \u6F14\u7B97\u6CD5\u672C\u8CEA\u70BA\u8CAA\u5FC3\u6CD5 (Greedy)\uFF0C\u4E00\u65E6\u67D0\u7BC0\u9EDE\u5F9E Priority Queue \u4E2D\u88AB\u53D6\u51FA\u4E26\u6A19\u8A18\u70BA visited\uFF0C\u4FBF\u8996\u5176\u6700\u77ED\u8DDD\u96E2\u5DF2\u78BA\u5B9A\uFF0C\u5F8C\u7E8C\u4E0D\u6703\u518D\u5EA6\u66F4\u65B0\u5176\u5DF2\u78BA\u5B9A\u4E4B\u8DDD\u96E2\u3002\u82E5\u5F8C\u7E8C\u8DEF\u5F91\u51FA\u73FE\u8CA0\u6B0A\u91CD\u908A\uFF0C\u5C07\u7121\u6CD5\u56DE\u6EAF\u9B06\u5F1B\u8A72\u7BC0\u9EDE\u3002",
      keyTakeaway: "\u6709\u8CA0\u908A\u5716\u8ACB\u76F4\u63A5\u63A1\u7528 Bellman-Ford \u6F14\u7B97\u6CD5\u6216 SPFA \u6F14\u7B97\u6CD5\uFF01",
      lastModified: "2025-03-20 16:00",
      author: "\u6797\u656C\u8A00 \u526F\u6559\u6388"
    };
  }
  const topics = [
    "\u9663\u5217\u8207\u6307\u6A19\u904B\u7B97",
    "\u93C8\u7D50\u4E32\u5217\u5012\u8F49",
    "\u4F47\u5217\u8207\u5FAA\u74B0\u4F47\u5217",
    "\u5408\u4F75\u6392\u5E8F\u6F14\u7B97\u6CD5",
    "\u5806\u7A4D\u6392\u5E8F\u8207 Heapify",
    "\u5716\u8AD6\u6DF1\u5EA6\u512A\u5148\u641C\u5C0B (DFS)",
    "\u5EE3\u5EA6\u512A\u5148\u641C\u5C0B (BFS)",
    "\u52D5\u614B\u898F\u5283\u80CC\u5305\u554F\u984C",
    "\u7D05\u9ED1\u6A39\u984F\u8272\u7FFB\u8F49\u8207\u65CB\u8F49",
    "\u96DC\u6E4A\u8868\u78B0\u649E\u8655\u7406 (Chaining vs Open Addressing)",
    "\u62D3\u64B2\u6392\u5E8F (Topological Sort)",
    "\u6700\u5C0F\u751F\u6210\u6A39 (Kruskal vs Prim)"
  ];
  const questionTopic = topics[i % topics.length];
  const isAnswered = num <= 14;
  return {
    id: num,
    code: `#QS-0${800 + num}`,
    prompt: `[\u984C\u865F #${num}] \u95DC\u65BC ${questionTopic} \u7684\u6642\u9593\u8907\u96DC\u5EA6\u8207\u7A7A\u9593\u8907\u96DC\u5EA6\u7279\u6027\u5206\u6790\uFF0C\u4E0B\u5217\u5404\u9805\u6558\u8FF0\u4F55\u8005\u6700\u7B26\u5408\u8A08\u7B97\u7406\u8AD6\u4E4B\u6A19\u6E96\u5B9A\u7FA9\uFF1F`,
    type: "single",
    typeLabel: "\u55AE\u9078\u984C",
    difficulty: num % 5 === 0 ? "hard" : num % 2 === 0 ? "medium" : "basic",
    difficultyScore: num % 5 === 0 ? 0.38 : num % 2 === 0 ? 0.58 : 0.82,
    difficultyLabel: num % 5 === 0 ? "\u56F0\u96E3" : num % 2 === 0 ? "\u4E2D\u7B49" : "\u57FA\u790E",
    points: 2,
    topic: questionTopic,
    category: num % 3 === 0 ? "\u6A39\u72C0\u7D50\u69CB\u8207\u5E73\u8861\u6A39" : "\u6392\u5E8F\u8207\u641C\u5C0B\u6F14\u7B97\u6CD5",
    tags: [questionTopic.split(" ")[0], "\u6F14\u7B97\u6CD5", "\u671F\u4E2D\u8003"],
    options: [
      { id: "A", text: "\u6700\u4F73\u60C5\u6CC1\u4E0B\u57F7\u884C\u6642\u9593\u70BA O(1)\uFF0C\u6700\u58DE\u60C5\u6CC1\u70BA O(n)", subtext: "\u5E38\u898B\u7DDA\u6027\u641C\u5C0B\u7BC4\u5F0F" },
      { id: "B", text: "\u5E73\u5747\u6642\u9593\u8907\u96DC\u5EA6\u70BA O(n log n)\uFF0C\u4E14\u70BA\u539F\u5730\u6392\u5E8F (In-place)", subtext: "\u7A7A\u9593\u8907\u96DC\u5EA6 O(1)" },
      { id: "C", text: "\u9700\u8981 O(n) \u7684\u984D\u5916\u7A7A\u9593\u8F14\u52A9\u4EE5\u7DAD\u6301\u904B\u7B97\u7A69\u5B9A\u6027", subtext: "\u975E\u539F\u5730\u6F14\u7B97\u6CD5" },
      { id: "D", text: "\u6700\u58DE\u60C5\u6CC1\u6642\u9593\u8907\u96DC\u5EA6\u53D7\u9650\u65BC O(log\xB2 n) \u7684\u591A\u9805\u5F0F\u5C0D\u6578\u754C\u9650", subtext: "\u591A\u5C0D\u6578\u908A\u754C" }
    ],
    correctAnswer: "B",
    userAnswer: isWrong ? "A" : isAnswered ? "B" : void 0,
    isFlagged,
    status: isWrong ? "wrong" : isAnswered ? "correct" : "unanswered",
    explanation: `\u672C\u984C\u8003\u67E5 ${questionTopic} \u4E4B\u6838\u5FC3\u904B\u7B97\u4EE3\u50F9\u3002\u6839\u64DA\u7D93\u5178\u6F14\u7B97\u6CD5\u6559\u79D1\u66F8\u898F\u7BC4\uFF0CB \u9078\u9805\u70BA\u6700\u7CBE\u78BA\u4E4B\u7406\u8AD6\u754C\u9650\u3002`,
    keyTakeaway: `\u8907\u7FD2\u6B64\u4E3B\u984C\u6642\uFF0C\u8ACB\u7279\u5225\u7262\u8A18\u5E73\u5747\u8207\u6700\u5DEE\u60C5\u6CC1\u7684\u6F38\u8FD1\u4E0A\u754C\u5DEE\u984D\u3002`,
    lastModified: "2025-03-18 11:20",
    author: "\u8003\u9078\u5C0F\u7D44 \u5BE9\u5B9A"
  };
});
var mockBankQuestions = [
  {
    id: "QS-0842",
    badge: "\u4EE3\u78BC\u6E2C\u9A57",
    prompt: "\u8ACB\u8AAA\u660E Lomuto \u8207 Hoare \u5283\u5206\u6CD5 (Partition Scheme) \u5728\u5FEB\u901F\u6392\u5E8F\u4E2D\u7684\u4EA4\u63DB\u6B21\u6578\u8207\u6307\u91DD\u79FB\u52D5\u7279\u6027...",
    tags: ["\u6F14\u7B97\u6CD5", "\u6392\u5E8F\u5206\u6790"],
    type: "\u55AE\u9078\u984C",
    typeBadgeColor: "bg-blue-100 text-blue-700 border-blue-200",
    difficulty: "\u4E2D\u7B49",
    difficultyScore: "0.58",
    difficultyColor: "bg-amber-100 text-amber-800 border-amber-200",
    points: 2,
    lastModified: "2 \u5C0F\u6642\u524D",
    author: "\u9673\u7DAD\u502B \u8B1B\u5EA7\u6559\u6388",
    isSelected: true
  },
  {
    id: "QS-0841",
    badge: "\u6B77\u5C46\u5927\u8003\u984C",
    prompt: "\u4E0B\u5217\u4F55\u7A2E\u6392\u5E8F\u6F14\u7B97\u6CD5\u5728\u906D\u9047\u76F8\u540C\u9375\u503C (Equal Keys) \u4E4B\u5143\u7D20\u6642\uFF0C\u80FD\u5177\u5099\u56B4\u683C\u7684\u7A69\u5B9A\u6027\u4FDD\u8B49\uFF1F",
    tags: ["\u7A69\u5B9A\u6027\u6AA2\u5B9A", "\u5408\u4F75\u6392\u5E8F"],
    type: "\u55AE\u9078\u984C",
    typeBadgeColor: "bg-blue-100 text-blue-700 border-blue-200",
    difficulty: "\u57FA\u790E",
    difficultyScore: "0.84",
    difficultyColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    points: 1,
    lastModified: "\u6628\u5929 16:42",
    author: "\u7CFB\u7D71\u81EA\u52D5\u532F\u5165",
    isSelected: false
  },
  {
    id: "QS-0839",
    badge: "\u9AD8\u9451\u5225\u5EA6",
    prompt: "\u57FA\u6578\u6392\u5E8F (Radix Sort) \u662F\u5426\u5728\u4E0D\u7D93\u4EFB\u4F55\u6D6E\u9EDE\u6578\u4F4D\u5143\u8F49\u63DB\u4E4B\u60C5\u6CC1\u4E0B\uFF0C\u4ECD\u76F4\u63A5\u9069\u7528\u65BC IEEE-754 \u6D6E\u9EDE\u6578\u8868\u793A\u6CD5\uFF1F",
    tags: ["\u57FA\u6578\u6392\u5E8F", "IEEE-754"],
    type: "\u662F\u975E\u984C",
    typeBadgeColor: "bg-purple-100 text-purple-700 border-purple-200",
    difficulty: "\u56F0\u96E3",
    difficultyScore: "0.29",
    difficultyColor: "bg-rose-100 text-rose-800 border-rose-200",
    points: 3,
    lastModified: "3 \u5929\u524D",
    author: "\u6797\u656C\u8A00 \u526F\u6559\u6388",
    isSelected: false
  },
  {
    id: "QS-0835",
    badge: "\u591A\u9078\u6AA2\u9A57",
    prompt: "\u95DC\u65BC\u4E8C\u5143\u641C\u5C0B\u6F14\u7B97\u6CD5 (Binary Search) \u5728\u5DF2\u6392\u5E8F\u9663\u5217\u4E2D\u7684\u904B\u7528\uFF0C\u4E0B\u5217\u6558\u8FF0\u54EA\u4E9B\u70BA\u771F\uFF1F",
    tags: ["\u4E8C\u5143\u641C\u5C0B", "\u5206\u6CBB\u6CD5"],
    type: "\u591A\u9078\u984C",
    typeBadgeColor: "bg-teal-100 text-teal-800 border-teal-200",
    difficulty: "\u4E2D\u7B49",
    difficultyScore: "0.52",
    difficultyColor: "bg-amber-100 text-amber-800 border-amber-200",
    points: 2.5,
    lastModified: "5 \u5929\u524D",
    author: "\u8003\u9078\u5C0F\u7D44 \u5BE9\u5B9A",
    isSelected: false
  },
  {
    id: "QS-0820",
    badge: "\u7A0B\u5F0F\u624B\u5BEB\u984C",
    prompt: "\u5BE6\u4F5C\u5806\u7A4D\u6392\u5E8F (Heap Sort) \u4E4B `heapify` \u6F14\u7B97\u6CD5\uFF0C\u4E26\u8A08\u7B97\u81EA\u5E95\u5411\u4E0A\u5EFA\u69CB\u5806\u7A4D\u4E4B\u6642\u9593\u8907\u96DC\u5EA6\u4E0A\u754C\u3002",
    tags: ["\u5806\u7A4D\u6392\u5E8F", "\u81EA\u5E95\u5411\u4E0A\u5EFA\u69CB"],
    type: "\u7C21\u7B54 / \u5BE6\u4F5C",
    typeBadgeColor: "bg-indigo-100 text-indigo-800 border-indigo-200",
    difficulty: "\u56F0\u96E3",
    difficultyScore: "0.33",
    difficultyColor: "bg-rose-100 text-rose-800 border-rose-200",
    points: 5,
    lastModified: "1 \u9031\u524D",
    author: "\u9673\u7DAD\u502B \u8B1B\u5EA7\u6559\u6388",
    isSelected: false
  }
];

// backend/app/api/questionController.ts
function getCategoriesHandler(_req, res) {
  res.json(initialCategories);
}
function getQuestionsHandler(req, res) {
  const category = req.query.category;
  const limit = parseInt(req.query.limit, 10) || 100;
  let dataset = [...mockQuestions];
  if (category) {
    dataset = dataset.filter((q) => q.category === category || q.topic.includes(category));
  }
  res.json(dataset.slice(0, limit));
}
function getBankHandler(_req, res) {
  res.json(mockBankQuestions);
}
function gradeExamHandler(req, res) {
  const submission = req.body;
  const questions = submission.questions;
  const examTitle = submission.examTitle || "\u6F14\u7B97\u6CD5\u671F\u672B\u6E2C\u9A57 A \u5377";
  if (!Array.isArray(questions)) {
    return res.status(400).json({ error: "questions must be an array" });
  }
  let earnedPoints = 0;
  let totalPoints = 0;
  let correctCount = 0;
  let wrongCount = 0;
  let unansweredCount = 0;
  const gradedQuestions = questions.map((q) => {
    const pts = q.points || 2;
    totalPoints += pts;
    let isCorrect = false;
    let status = "unanswered";
    if (!q.userAnswer) {
      unansweredCount++;
      status = "unanswered";
    } else if (Array.isArray(q.correctAnswer)) {
      const userArr = Array.isArray(q.userAnswer) ? q.userAnswer : [q.userAnswer];
      const correctArr = Array.isArray(q.correctAnswer) ? q.correctAnswer : [q.correctAnswer];
      isCorrect = userArr.length === correctArr.length && userArr.every((ans) => correctArr.includes(ans));
      status = isCorrect ? "correct" : "wrong";
    } else {
      isCorrect = q.userAnswer === q.correctAnswer;
      status = isCorrect ? "correct" : "wrong";
    }
    if (isCorrect) {
      earnedPoints += pts;
      correctCount++;
    } else if (status === "wrong") {
      wrongCount++;
    }
    return {
      ...q,
      status
    };
  });
  const accuracy = questions.length > 0 ? Math.round(correctCount / questions.length * 100) : 0;
  const result = {
    examTitle,
    score: Math.round(earnedPoints * 10) / 10,
    totalPoints: Math.round(totalPoints * 10) / 10,
    accuracy,
    correctCount,
    wrongCount,
    unansweredCount,
    totalQuestions: questions.length,
    gradedQuestions,
    gradedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  res.json(result);
}

// backend/app/main.ts
function createApp() {
  const app = express();
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      service: "exam-evaluation-backend",
      version: "1.0.0",
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  });
  app.get("/api/categories", getCategoriesHandler);
  app.get("/api/questions", getQuestionsHandler);
  app.get("/api/bank", getBankHandler);
  app.post("/api/exam/grade", gradeExamHandler);
  return app;
}

// server.ts
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
async function startServer() {
  const app = express2();
  const PORT = Number(process.env.PORT) || 3e3;
  const isDev = process.env.NODE_ENV !== "production";
  const backendApp = createApp();
  app.use(backendApp);
  if (isDev) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, "dist");
    app.use(express2.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.resolve(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`\u{1F680} [Server] Backend API + Frontend running on port ${PORT} (${isDev ? "dev" : "prod"})`);
  });
}
startServer().catch((err) => {
  console.error("Fatal server startup error:", err);
  process.exit(1);
});
