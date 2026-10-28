const ExcelJS = require('exceljs');

// 模擬的考試資料與使用者的作答結果
const examData = {
  totalQuestions: 5, // 全部 a 題
  questions: [
    {
      id: 1,
      subject: '數學',
      difficulty: '簡單',
      question: '2 + 2 = ?',
      options: ['2', '3', '4', '5'],
      correctAnswer: '4',
      userAnswer: '4',
      explanation: '2 加 2 等於 4。'
    },
    {
      id: 2,
      subject: '數學',
      difficulty: '中等',
      question: '5 * 5 = ?',
      options: ['10', '20', '25', '30'],
      correctAnswer: '25',
      userAnswer: '20', // 答錯
      explanation: '5 乘以 5 等於 25。'
    },
    {
      id: 3,
      subject: '英文',
      difficulty: '簡單',
      question: 'Apple 的中文是什麼？',
      options: ['香蕉', '蘋果', '橘子', '葡萄'],
      correctAnswer: '蘋果',
      userAnswer: '蘋果',
      explanation: 'Apple 中文即為蘋果。'
    },
    {
      id: 4,
      subject: '英文',
      difficulty: '困難',
      question: '以下哪個單字是「共同作業」？',
      options: ['Collaboration', 'Competition', 'Isolation', 'Separation'],
      correctAnswer: 'Collaboration',
      userAnswer: 'Competition', // 答錯
      explanation: 'Collaboration 意指合作或共同作業。'
    },
    {
      id: 5,
      subject: '自然',
      difficulty: '中等',
      question: '水的化學式是什麼？',
      options: ['CO2', 'H2O', 'O2', 'NaCl'],
      correctAnswer: 'H2O',
      userAnswer: 'H2O',
      explanation: '水是由氫和氧組成的化合物，化學式為 H2O。'
    }
  ]
};

/**
 * 1. 計算考試成績 (全部 a 題、對 b 題、錯 c 題)
 */
function calculateScore(data) {
  const totalA = data.totalQuestions;
  let correctB = 0;
  
  data.questions.forEach(q => {
    if (q.userAnswer === q.correctAnswer) {
      correctB++;
    }
  });

  const wrongC = totalA - correctB;

  return {
    total: totalA,      // 全部 a 題
    correct: correctB,  // 對 b 題
    wrong: wrongC       // 錯 c 題
  };
}

/**
 * 2. 全部題詳解呈現
 */
function getDetailedResults(data) {
  return data.questions.map(q => ({
    題號: q.id,
    題目: q.question,
    您的答案: q.userAnswer,
    正確答案: q.correctAnswer,
    是否正確: q.userAnswer === q.correctAnswer ? '正確' : '錯誤',
    詳解: q.explanation
  }));
}

/**
 * 3. 錯題篩選
 */
function getWrongQuestions(data) {
  return data.questions.filter(q => q.userAnswer !== q.correctAnswer);
}

/**
 * 5. 錯題分析 (依學科、難度分類統計)
 */
function analyzeWrongQuestions(wrongQuestions) {
  const subjectAnalysis = {};
  const difficultyAnalysis = {};

  wrongQuestions.forEach(q => {
    // 依學科統計
    subjectAnalysis[q.subject] = (subjectAnalysis[q.subject] || 0) + 1;
    // 依難度統計
    difficultyAnalysis[q.difficulty] = (difficultyAnalysis[q.difficulty] || 0) + 1;
  });

  return {
    bySubject: subjectAnalysis,
    byDifficulty: difficultyAnalysis
  };
}

/**
 * 4. 錯題下載 (匯出成 Excel 檔案)
 */
async function exportWrongQuestionsToExcel(wrongQuestions, filePath = 'wrong_questions.xlsx') {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('錯題本');

  // 設定 Excel 欄位
  worksheet.columns = [
    { header: '題號', key: 'id', width: 10 },
    { header: '學科', key: 'subject', width: 15 },
    { header: '難度', key: 'difficulty', width: 10 },
    { header: '題目', key: 'question', width: 30 },
    { header: '您的答案', key: 'userAnswer', width: 15 },
    { header: '正確答案', key: 'correctAnswer', width: 15 },
    { header: '詳解', key: 'explanation', width: 35 }
  ];

  // 寫入錯題資料
  wrongQuestions.forEach(q => {
    worksheet.addRow({
      id: q.id,
      subject: q.subject,
      difficulty: q.difficulty,
      question: q.question,
      userAnswer: q.userAnswer,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation
    });
  });

  await workbook.xlsx.writeFile(filePath);
  console.log(`\n[系統] 錯題 Excel 檔案已成功匯出至：${filePath}`);
}

// === 執行完整流程示範 ===
async function main() {
  console.log('=== 考試結果處理系統 ===\n');

  // 1. 成績計算
  const score = calculateScore(examData);
  console.log(`1. 成績總覽：全部 ${score.total} 題，答對 ${score.correct} 題，答錯 ${score.wrong} 題`);

  // 2. 全部題詳解呈現
  console.log('\n2. 全部題詳解：');
  console.table(getDetailedResults(examData));

  // 3. 錯題篩選
  const wrongList = getWrongQuestions(examData);
  console.log(`\n3. 錯題篩選：共篩選出 ${wrongList.length} 道錯題`);

  // 5. 錯題分析
  const analysis = analyzeWrongQuestions(wrongList);
  console.log('\n5. 錯題分析結果：');
  console.log('   - 依學科分佈：', analysis.bySubject);
  console.log('   - 依難度分佈：', analysis.byDifficulty);

  // 4. 錯題下載 (Excel)
  await exportWrongQuestionsToExcel(wrongList, '錯題本.xlsx');
}

main();