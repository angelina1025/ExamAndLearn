import express from 'express';
import {
  getCategoriesHandler,
  getQuestionsHandler,
  getBankHandler,
  gradeExamHandler,
} from './api/questionController';

export function createApp() {
  const app = express();

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      service: 'exam-evaluation-backend',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    });
  });

  // Question bank download & sync APIs
  app.get('/api/categories', getCategoriesHandler);
  app.get('/api/questions', getQuestionsHandler);
  app.get('/api/bank', getBankHandler);

  // Online grading engine
  app.post('/api/exam/grade', gradeExamHandler);

  return app;
}
