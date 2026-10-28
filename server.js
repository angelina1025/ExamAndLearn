const express = require('express');
const app = express();
const PORT = 3000;

// 模擬考試資料
const examData = {
  totalQuestions: 5,
  questions: [
    { id: 1, subject: '數學', difficulty: '簡單', question: '2 + 2 = ?', correctAnswer: '4', userAnswer: '4', explanation: '2 加 2 等於 4。' },
    { id: 2, subject: '數學', difficulty: '中等', question: '5 * 5 = ?', correctAnswer: '25', userAnswer: '20', explanation: '5 乘以 5 等於 25。' }
  ]
};

// 設定根目錄回傳一個簡單的 HTML 網頁
app.get('/', (req, res) => {
  const correctCount = examData.questions.filter(q => q.userAnswer === q.correctAnswer).length;
  const wrongCount = examData.totalQuestions - correctCount;

  // 動態產生網頁內容
  res.send(`
    <html>
      <head>
        <meta charset="utf-8">
        <title>考試結果系統</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; background: #1e1e1e; color: #fff; }
          .card { background: #2d2d2d; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
          .wrong { color: #ff6b6b; }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>考試結果總覽</h1>
          <p>全部題數：${examData.totalQuestions} 題</p>
          <p>答對題數：${correctCount} 題</p>
          <p class="wrong">答錯題數：${wrongCount} 題</p>
        </div>
        <div class="card">
          <h2>錯題詳解</h2>
          ${examData.questions
            .filter(q => q.userAnswer !== q.correctAnswer)
            .map(q => `<div><strong>題目：</strong>${q.question} <br><strong>您的答案：</strong>${q.userAnswer} (錯) | <strong>正確答案：</strong>${q.correctAnswer}<br><em>詳解：${q.explanation}</em><hr></div>`)
            .join('')}
        </div>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`網頁伺服器已啟動！請打開瀏覽器前往：http://localhost:${PORT}`);
});