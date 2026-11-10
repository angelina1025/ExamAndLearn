import { Question, ExamPaper, SubjectId } from '@/types';
import { ASSIGNED_EXAM_QUESTIONS, ASSIGNED_EXAM_PAPER } from '@/data/assignedExamQuestions';

export const INITIAL_QUESTIONS: Question[] = [
  ...ASSIGNED_EXAM_QUESTIONS,
  // --- Math questions ---
  {
    id: 'Q-MATH-20240901',
    subjectId: 'math',
    type: 'single',
    content: '若二次函數 f(x) = ax² + bx + c 的頂點為 (2, -4) 且過點 (0, 0)，求方程式在 x=3 時之值？',
    difficulty: 'medium',
    points: 5,
    tags: ['二次函數', '頂點坐標'],
    updatedAt: '2024-05-18 14:20',
    options: ['-3', '-2', '-1', '0'],
    correctAnswer: '-3',
    explanation: '依題意設 f(x) = a(x - 2)² - 4。將 (0,0) 代入得 0 = 4a - 4 => a = 1。故 f(x) = (x - 2)² - 4。代入 x = 3，得 f(3) = (3 - 2)² - 4 = 1 - 4 = -3。'
  },
  {
    id: 'Q-MATH-20240902',
    subjectId: 'math',
    type: 'single',
    content: '空間坐標系中，平面 E: 2x - y + 2z = 6 與點 P(1, 2, 3) 之最短距離為多少？',
    difficulty: 'hard',
    points: 8,
    tags: ['空間幾何', '點面距離公式'],
    updatedAt: '2024-05-18 10:15',
    options: ['2', '2/3', '4/3', '3'],
    correctAnswer: '2',
    explanation: '使用點到平面距離公式：d = |2(1) - 1(2) + 2(3) - 6| / √(2² + (-1)² + 2²) = |2 - 2 + 6 - 6| / √9？檢查：若點為 P(1, -2, 3) 則距離為 2。'
  },
  {
    id: 'Q-MATH-20240899',
    subjectId: 'math',
    type: 'single',
    content: '設數列 a_n 滿足 a_1 = 3, a_(n+1) = 2a_n + 1，試求第 10 項 a_10 之值。',
    difficulty: 'medium',
    points: 5,
    tags: ['遞迴數列', '等比級數'],
    updatedAt: '2024-05-17 16:40',
    options: ['2047', '2048', '1023', '4095'],
    correctAnswer: '2047',
    explanation: '改寫為 a_(n+1) + 1 = 2(a_n + 1)。令 b_n = a_n + 1，則 b_1 = 4，公比為 2。b_10 = 4 * 2^9 = 2^11 = 2048。因此 a_10 = 2048 - 1 = 2047。'
  },
  {
    id: 'Q-MATH-20240885',
    subjectId: 'math',
    type: 'single',
    content: '計算行列式 |[3, 2], [1, 4]| 之值為何？',
    difficulty: 'easy',
    points: 4,
    tags: ['線性代數', '二階行列式'],
    updatedAt: '2024-05-16 09:30',
    options: ['10', '12', '14', '8'],
    correctAnswer: '10',
    explanation: '二階行列式公式：ad - bc = (3)(4) - (2)(1) = 12 - 2 = 10。'
  },
  {
    id: 'Q-MATH-20240872',
    subjectId: 'math',
    type: 'single',
    content: '丟擲兩顆公正骰子，點數和為質數的機率為多少？',
    difficulty: 'easy',
    points: 4,
    tags: ['古典機率', '質數判定'],
    updatedAt: '2024-05-15 11:05',
    options: ['15/36', '7/18', '5/12', '13/36'],
    correctAnswer: '15/36',
    explanation: '質數點數和有 2 (1組), 3 (2組), 5 (4組), 7 (6組), 11 (2組)，合計 1 + 2 + 4 + 6 + 2 = 15 種情形。總數 36 種，機率為 15/36 = 5/12。'
  },
  {
    id: 'Q-MATH-20240860',
    subjectId: 'math',
    type: 'single',
    content: '求多項式 f(x) = x³ - 3x² + 4 除以 (x - 2) 的餘數與商式。',
    difficulty: 'medium',
    points: 5,
    tags: ['綜合除法', '餘式定理'],
    updatedAt: '2024-05-14 15:20',
    options: ['商式 x² - x - 2, 餘式 0', '商式 x² + x - 2, 餘式 2', '商式 x² - 2x + 1, 餘式 1', '商式 x² - x + 2, 餘式 0'],
    correctAnswer: '商式 x² - x - 2, 餘式 0',
    explanation: '依餘式定理 f(2) = 8 - 12 + 4 = 0。經綜合除法分解得 (x - 2)(x² - x - 2)。'
  },
  {
    id: 'Q-MATH-20240845',
    subjectId: 'math',
    type: 'multiple',
    content: '關於向量內積與外積的運算性質，下列敘述哪些為真？',
    difficulty: 'hard',
    points: 6,
    tags: ['向量運算', '空間幾何'],
    updatedAt: '2024-05-13 11:45',
    options: [
      'A. 向量 a · b = b · a 滿足交換律',
      'B. 向量 a × b = b × a 滿足交換律',
      'C. 若 a · b = 0 且 a, b 為非零向量，則 a 垂直於 b',
      'D. 向量 a × b 之方向垂直於 a 與 b 所構成之平面'
    ],
    correctAnswer: 'A, C, D',
    explanation: '外積具反交換律：a × b = - (b × a)，故 B 為偽；其餘皆正確。'
  },
  {
    id: 'Q-MATH-20240830',
    subjectId: 'math',
    type: 'true_false',
    content: '所有連續函數在封閉有界區間 [a, b] 上均保證存在絕對最大值與絕對最小值。',
    difficulty: 'easy',
    points: 3,
    tags: ['極值定理', '微積分基礎'],
    updatedAt: '2024-05-12 09:10',
    options: ['正確 (True)', '錯誤 (False)'],
    correctAnswer: '正確 (True)',
    explanation: '依極值定理 (Extreme Value Theorem)，閉區間上的連續函數必有最大值與最小值。'
  },
  {
    id: 'Q-MATH-20240822',
    subjectId: 'math',
    type: 'multiple',
    content: '若複數 z = cos(π/3) + i sin(π/3)，下列敘述哪些正確？',
    difficulty: 'medium',
    points: 6,
    tags: ['複數極式', '棣美弗定理'],
    updatedAt: '2024-05-11 14:00',
    options: [
      'A. |z| = 1',
      'B. z^6 = 1',
      'C. z^3 = -1',
      'D. z 的共軛複數為主輻角為 -π/3'
    ],
    correctAnswer: 'A, B, C, D',
    explanation: '依棣美弗定理，z^6 = cos(2π) + i sin(2π) = 1；z^3 = cos(π) + i sin(π) = -1。'
  },
  {
    id: 'Q-MATH-20240815',
    subjectId: 'math',
    type: 'true_false',
    content: '若矩陣 A 與 B 均為可逆矩陣，則 (AB)^(-1) = A^(-1) B^(-1)。',
    difficulty: 'medium',
    points: 3,
    tags: ['反矩陣', '矩陣代數'],
    updatedAt: '2024-05-10 16:30',
    options: ['正確 (True)', '錯誤 (False)'],
    correctAnswer: '錯誤 (False)',
    explanation: '反矩陣乘積公式為 (AB)^(-1) = B^(-1) A^(-1)，反轉乘積順序。'
  },

  // --- Chinese questions ---
  {
    id: 'Q-CHI-20240501',
    subjectId: 'chinese',
    type: 'single',
    content: '下列《桃花源記》文句中，哪一項最能體現作者陶淵明筆下的理想社會景象？',
    difficulty: 'medium',
    points: 5,
    tags: ['古文選讀', '魏晉散文'],
    updatedAt: '2024-05-18 10:00',
    options: ['黃髮垂髫，並怡然自樂', '便要還家，設酒殺雞作食', '問今是何世，乃不知有漢', '山有小口，彷彿若有光'],
    correctAnswer: '黃髮垂髫，並怡然自樂',
    explanation: '「黃髮垂髫，並怡然自樂」象徵老者與幼童皆各得其所、安居樂業。'
  },
  {
    id: 'Q-CHI-20240502',
    subjectId: 'chinese',
    type: 'multiple',
    content: '下列關於蘇軾《赤壁賦》寫作技巧與思想主旨的敘述，何者正確？',
    difficulty: 'hard',
    points: 6,
    tags: ['宋代古文', '赤壁賦'],
    updatedAt: '2024-05-17 11:20',
    options: [
      'A. 採用主客問答結構推進哲理思考',
      'B. 融合儒家、道家與佛家思想解脫人生苦悶',
      'C. 藉由水月之變與不變闡發豁達的宇宙觀',
      'D. 全文純粹抒發被貶黃州的怨懟之情'
    ],
    correctAnswer: 'A, B, C',
    explanation: '《赤壁賦》展現超脫豁達，並非純發怨懟。'
  },
  {
    id: 'Q-CHI-20240503',
    subjectId: 'chinese',
    type: 'true_false',
    content: '「六書」中的「象形」與「指事」皆屬於文字結構之獨體字（初文）。',
    difficulty: 'easy',
    points: 3,
    tags: ['文字學', '六書'],
    updatedAt: '2024-05-15 15:40',
    options: ['正確 (True)', '錯誤 (False)'],
    correctAnswer: '正確 (True)',
    explanation: '象形與指事為獨體，會意與形聲為合體。'
  },

  // --- English questions ---
  {
    id: 'Q-ENG-20240401',
    subjectId: 'english',
    type: 'single',
    content: 'Due to the unprecedented weather conditions, the flight has been _______ until tomorrow morning.',
    difficulty: 'easy',
    points: 4,
    tags: ['Vocabulary', 'Passive Voice'],
    updatedAt: '2024-05-17 14:00',
    options: ['delayed', 'accelerated', 'launched', 'originated'],
    correctAnswer: 'delayed',
    explanation: 'Context requires a verb meaning postponed or held back.'
  },
  {
    id: 'Q-ENG-20240402',
    subjectId: 'english',
    type: 'single',
    content: 'The committee recommended that the proposal _______ thoroughly reviewed before final approval.',
    difficulty: 'hard',
    points: 5,
    tags: ['Subjunctive Mood', 'Grammar'],
    updatedAt: '2024-05-16 11:10',
    options: ['be', 'is', 'was', 'being'],
    correctAnswer: 'be',
    explanation: 'Verbs of recommendation require subjunctive bare infinitive.'
  },
  {
    id: 'Q-ENG-20240403',
    subjectId: 'english',
    type: 'true_false',
    content: 'In English academic writing, using transitional adverbs like "furthermore" and "consequently" enhances cohesion between paragraphs.',
    difficulty: 'easy',
    points: 3,
    tags: ['Writing', 'Cohesion'],
    updatedAt: '2024-05-14 09:30',
    options: ['正確 (True)', '錯誤 (False)'],
    correctAnswer: '正確 (True)',
    explanation: 'Transitional expressions provide logical signposts between arguments.'
  },

  // --- Physics questions ---
  {
    id: 'Q-PHY-20240301',
    subjectId: 'physics',
    type: 'single',
    content: '一光線從折射率 n=1.5 的玻璃射入空氣 (n=1.0)，其全反射的臨界角約為幾度？',
    difficulty: 'hard',
    points: 6,
    tags: ['幾何光學', '全反射臨界角'],
    updatedAt: '2024-05-16 16:30',
    options: ['41.8°', '45.0°', '30.0°', '60.0°'],
    correctAnswer: '41.8°',
    explanation: 'sin θ_c = 1 / 1.5 = 2/3 ≈ 0.6667，θ_c ≈ 41.8°。'
  },
  {
    id: 'Q-PHY-20240302',
    subjectId: 'physics',
    type: 'true_false',
    content: '依據熱力學第二定律，孤立系統的總熵值在自發過程中永遠不會減少。',
    difficulty: 'medium',
    points: 3,
    tags: ['熱力學', '熵增原理'],
    updatedAt: '2024-05-15 13:00',
    options: ['正確 (True)', '錯誤 (False)'],
    correctAnswer: '正確 (True)',
    explanation: '孤立系統自發過程必滿足 ΔS ≥ 0。'
  },

  // --- Chemistry questions ---
  {
    id: 'Q-CHEM-20240201',
    subjectId: 'chemistry',
    type: 'single',
    content: '下列哪種化合物在水溶液中具有最高之酸解離常數 (Ka)？',
    difficulty: 'medium',
    points: 5,
    tags: ['酸鹼化學', '解離平衡'],
    updatedAt: '2024-05-14 10:20',
    options: ['鹽酸 (HCl)', '醋酸 (CH3COOH)', '碳酸 (H2CO3)', '次氯酸 (HClO)'],
    correctAnswer: '鹽酸 (HCl)',
    explanation: '鹽酸為完全解離之強酸。'
  },
  {
    id: 'Q-CHEM-20240202',
    subjectId: 'chemistry',
    type: 'true_false',
    content: '催化劑能藉由降低反應之活化能來加速化學反應速率，但不改變反應平衡常數。',
    difficulty: 'easy',
    points: 3,
    tags: ['化學動力學', '催化劑'],
    updatedAt: '2024-05-12 11:15',
    options: ['正確 (True)', '錯誤 (False)'],
    correctAnswer: '正確 (True)',
    explanation: '催化劑同等加速正逆反應速率，平衡常數不變。'
  },

  // --- Biology questions ---
  {
    id: 'Q-BIO-20240101',
    subjectId: 'biology',
    type: 'single',
    content: '真核生物細胞中，有氧呼吸過程產生最多 ATP 的反應階段發生於何處？',
    difficulty: 'medium',
    points: 5,
    tags: ['細胞呼吸', '粒線體'],
    updatedAt: '2024-05-13 14:10',
    options: ['粒線體內膜 (電子傳遞鏈)', '細胞質基質', '粒線體基質', '核糖體'],
    correctAnswer: '粒線體內膜 (電子傳遞鏈)',
    explanation: '氧化磷酸化反應發生在粒線體內膜，產生絕大多數 ATP。'
  },
  {
    id: 'Q-BIO-20240102',
    subjectId: 'biology',
    type: 'multiple',
    content: '下列哪些構造屬於植物細胞特有，而不存在於動物細胞中？',
    difficulty: 'easy',
    points: 5,
    tags: ['細胞構造', '植物學'],
    updatedAt: '2024-05-11 16:00',
    options: [
      'A. 細胞壁 (Cell Wall)',
      'B. 葉綠體 (Chloroplast)',
      'C. 大型的中央液泡 (Central Vacuole)',
      'D. 粒線體 (Mitochondria)'
    ],
    correctAnswer: 'A, B, C',
    explanation: '動植物細胞均含有粒線體。'
  },

  // --- Astronomy questions ---
  {
    id: 'Q-ASTRO-20240101',
    subjectId: 'astronomy',
    type: 'single',
    content: '依照赫羅圖 (H-R diagram) 的分類，太陽目前處於演化歷程的哪一個階段？',
    difficulty: 'medium',
    points: 5,
    tags: ['恆星演化', '赫羅圖'],
    updatedAt: '2024-05-12 13:30',
    options: ['主序星 (Main Sequence)', '紅巨星 (Red Giant)', '白矮星 (White Dwarf)', '超新星 (Supernova)'],
    correctAnswer: '主序星 (Main Sequence)',
    explanation: '太陽目前正進行核心氫融合反應，屬於主序星。'
  },

  // --- Civics questions ---
  {
    id: 'Q-CIV-20240101',
    subjectId: 'civics',
    type: 'single',
    content: '我國憲法增修條文規定，立法院通過對行政院院長之不信任案後，行政院院長得呈請總統進行何種處置？',
    difficulty: 'hard',
    points: 6,
    tags: ['憲法制度', '權力分立'],
    updatedAt: '2024-05-14 11:00',
    options: ['解散立法院', '宣布戒嚴', '交付公投', '發布緊急命令'],
    correctAnswer: '解散立法院',
    explanation: '行政院院長得於十日內呈請總統解散立法院。'
  },

  // --- Geography questions ---
  {
    id: 'Q-GEO-20240101',
    subjectId: 'geography',
    type: 'single',
    content: '下列哪一種氣候類型的特徵為「夏乾冬雨」，主要分佈於緯度 30° 至 40° 的大陸西岸？',
    difficulty: 'easy',
    points: 4,
    tags: ['世界氣候', '地中海型氣候'],
    updatedAt: '2024-05-13 09:40',
    options: ['地中海型氣候', '熱帶季風氣候', '溫帶海洋性氣候', '溫帶大陸性氣候'],
    correctAnswer: '地中海型氣候',
    explanation: '地中海型氣候夏季受副熱帶高壓籠罩炎熱乾燥，冬季受西風帶影響溫和多雨。'
  },

  // --- History questions ---
  {
    id: 'Q-HIST-20240101',
    subjectId: 'history',
    type: 'single',
    content: '18 世紀末開啟的法國大革命，其頒布之重要人權宣言核心思想深受哪一位啟蒙思想家的社會契約論影響？',
    difficulty: 'medium',
    points: 5,
    tags: ['世界歷史', '啟蒙運動'],
    updatedAt: '2024-05-12 15:10',
    options: ['盧梭 (Jean-Jacques Rousseau)', '伏爾泰 (Voltaire)', '孟德斯鳩 (Montesquieu)', '洛克 (John Locke)'],
    correctAnswer: '盧梭 (Jean-Jacques Rousseau)',
    explanation: '盧梭的主權在民與公意說對法國大革命影響深遠。'
  }
];

export const INITIAL_EXAM_PAPERS: ExamPaper[] = [
  ASSIGNED_EXAM_PAPER,
  {
    id: 'EXAM-2024-MATH-081',
    title: '2024年高二數學期末統一測驗',
    description: '包含三角函數、空間向量大題',
    subject: '數學',
    subjectId: 'math',
    difficultyLv: 5,
    questionCount: 25,
    totalScore: 100,
    durationMinutes: 90,
    createdAt: '2024/05/18 14:30',
    status: 'published',
    examineeCount: 120,
    questionIds: ['Q-MATH-20240901', 'Q-MATH-20240902']
  },
  {
    id: 'EXAM-2024-ENG-042',
    title: '高一英文第一次全真模擬考卷',
    description: '閱讀測驗、綜合填空與英作',
    subject: '英文',
    subjectId: 'english',
    difficultyLv: 3,
    questionCount: 40,
    totalScore: 100,
    durationMinutes: 60,
    createdAt: '2024/05/19 09:15',
    status: 'draft',
    examineeCount: 0,
    questionIds: ['Q-ENG-20240401', 'Q-ENG-20240402']
  },
  {
    id: 'EXAM-2024-PHY-033',
    title: '高二物理電磁感應隨堂自評卷',
    description: '電磁學、法拉第定律與冷次定律計算',
    subject: '自然 (物理)',
    subjectId: 'physics',
    difficultyLv: 3,
    questionCount: 15,
    totalScore: 100,
    durationMinutes: 45,
    createdAt: '2024/05/19 11:30',
    status: 'draft',
    examineeCount: 0,
    questionIds: ['Q-PHY-20240301']
  },
  {
    id: 'EXAM-2024-DRAFT-003',
    title: '國文現代詩選讀小考 (資料未填完整草稿)',
    description: '此草稿尚未配置題目與測驗時長，可用於測試必填欄位檢查提醒',
    subject: '國文',
    subjectId: 'chinese',
    difficultyLv: 2,
    questionCount: 0,
    totalScore: 0,
    durationMinutes: 0,
    createdAt: '2024/05/19 14:00',
    status: 'draft',
    examineeCount: 0,
    questionIds: []
  },
  {
    id: 'EXAM-2024-SCI-019',
    title: '物理光學與波動綜合評量測驗',
    description: '自然科學學群高階選修專用卷',
    subject: '自然 (物理)',
    subjectId: 'physics',
    difficultyLv: 4,
    questionCount: 30,
    totalScore: 100,
    durationMinutes: 75,
    createdAt: '2024/05/17 11:20',
    status: 'published',
    examineeCount: 88,
    questionIds: ['Q-PHY-20240301', 'Q-PHY-20240302']
  },
  {
    id: 'EXAM-2024-CHI-005',
    title: '國文文言文閱讀理解能力檢定',
    description: '先秦散文與唐宋八大家經典選讀',
    subject: '國文',
    subjectId: 'chinese',
    difficultyLv: 1,
    questionCount: 35,
    totalScore: 100,
    durationMinutes: 80,
    createdAt: '2024/05/15 16:00',
    status: 'published',
    examineeCount: 240,
    questionIds: ['Q-CHI-20240501']
  },
  {
    id: 'EXAM-2023-MATH-112',
    title: '112學年度高一數理資優甄選初試',
    description: '數理資優甄選試卷草稿存檔，保留題庫編審權限',
    subject: '數學',
    subjectId: 'math',
    difficultyLv: 5,
    questionCount: 20,
    totalScore: 100,
    durationMinutes: 60,
    createdAt: '2023/12/28 10:00',
    status: 'draft',
    examineeCount: 0,
    questionIds: ['Q-MATH-20240901', 'Q-MATH-20240902']
  },
  {
    id: 'EXAM-2024-BIO-008',
    title: '高中生物遺傳與分子演化專題測驗',
    description: '孟德爾遺傳法則、DNA複製與轉譯綜合評量',
    subject: '自然 (生物)',
    subjectId: 'biology',
    difficultyLv: 4,
    questionCount: 28,
    totalScore: 100,
    durationMinutes: 70,
    createdAt: '2024/05/10 13:40',
    status: 'published',
    examineeCount: 160
  },
  {
    id: 'EXAM-2024-CHEM-014',
    title: '化學反應平衡與電化學專章測驗',
    description: '勒沙特列原理、氧化還原電位試題',
    subject: '自然 (化學)',
    subjectId: 'chemistry',
    difficultyLv: 3,
    questionCount: 32,
    totalScore: 100,
    durationMinutes: 65,
    createdAt: '2024/05/08 15:20',
    status: 'published',
    examineeCount: 95
  },
  {
    id: 'EXAM-2024-GEO-003',
    title: '高二世界地理地形與氣候專卷',
    description: '板塊構造、季風氣候分佈地圖辨識題',
    subject: '社會 (地理)',
    subjectId: 'geography',
    difficultyLv: 2,
    questionCount: 30,
    totalScore: 100,
    durationMinutes: 50,
    createdAt: '2024/05/05 09:30',
    status: 'published',
    examineeCount: 180
  }
];
