import { ExamQuestion } from '../types';
import { mockQuestions } from '../data/mockData';

const STORAGE_KEYS = {
  OFFLINE_BANK: 'test_platform_offline_bank_v1',
  CACHED_EXAMS: 'test_platform_cached_exams_v1',
  OFFLINE_RESULTS: 'test_platform_offline_results_v1',
  WRONG_NOTEBOOK: 'test_platform_wrong_notebook_v1',
  LAST_SYNC: 'test_platform_last_sync_timestamp',
};

export interface OfflineBankMeta {
  totalQuestions: number;
  lastDownloaded: string;
  sizeBytes: number;
  categories: { name: string; count: number }[];
  isAvailableOffline: boolean;
}

export interface OfflineExamRecord {
  id: string;
  title: string;
  timestamp: string;
  score: number;
  totalPoints: number;
  accuracy: number;
  wrongCount: number;
  totalQuestions: number;
  questions: ExamQuestion[];
}

/**
 * Checks if local device is online
 */
export function isDeviceOnline(): boolean {
  return typeof navigator !== 'undefined' ? navigator.onLine : true;
}

/**
 * Get offline bank metadata & summary
 */
export function getOfflineBankMeta(): OfflineBankMeta {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.OFFLINE_BANK);
    if (!raw) {
      return {
        totalQuestions: 0,
        lastDownloaded: '',
        sizeBytes: 0,
        categories: [],
        isAvailableOffline: false,
      };
    }
    const questions: ExamQuestion[] = JSON.parse(raw);
    const categoriesMap: Record<string, number> = {};
    questions.forEach((q) => {
      const cat = q.category || '綜合題型';
      categoriesMap[cat] = (categoriesMap[cat] || 0) + 1;
    });

    const lastSync = localStorage.getItem(STORAGE_KEYS.LAST_SYNC) || '';

    return {
      totalQuestions: questions.length,
      lastDownloaded: lastSync ? new Date(parseInt(lastSync, 10)).toLocaleString('zh-TW') : '已儲存',
      sizeBytes: new Blob([raw]).size,
      categories: Object.entries(categoriesMap).map(([name, count]) => ({ name, count })),
      isAvailableOffline: questions.length > 0,
    };
  } catch (e) {
    console.error('Failed to read offline bank meta:', e);
    return {
      totalQuestions: 0,
      lastDownloaded: '',
      sizeBytes: 0,
      categories: [],
      isAvailableOffline: false,
    };
  }
}

/**
 * Download / Sync questions from backend API or bundle to local storage
 */
export async function downloadQuestionsToOfflineStorage(
  customQuestions?: ExamQuestion[]
): Promise<{ success: boolean; count: number; error?: string }> {
  try {
    let dataset = customQuestions;
    if (!dataset || dataset.length === 0) {
      // Fetch from backend API
      try {
        const res = await fetch('/api/questions');
        if (res.ok) {
          dataset = await res.json();
        }
      } catch (err) {
        console.warn('Backend /api/questions fetch failed, using built-in mock questions', err);
      }
    }

    // Fallback to built-in verified questions
    if (!dataset || dataset.length === 0) {
      dataset = mockQuestions;
    }

    localStorage.setItem(STORAGE_KEYS.OFFLINE_BANK, JSON.stringify(dataset));
    localStorage.setItem(STORAGE_KEYS.LAST_SYNC, Date.now().toString());

    return {
      success: true,
      count: dataset.length,
    };
  } catch (err: any) {
    console.error('Download offline bank error:', err);
    return {
      success: false,
      count: 0,
      error: err?.message || '儲存空間不足或讀寫失敗',
    };
  }
}

/**
 * Load offline question bank
 */
export function getOfflineQuestions(): ExamQuestion[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.OFFLINE_BANK);
    if (raw) {
      const parsed: ExamQuestion[] = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to read offline questions:', e);
  }
  // If nothing saved yet, return default questions
  return mockQuestions;
}

/**
 * Save an exam result to offline history
 */
export function saveOfflineExamResult(
  title: string,
  questions: ExamQuestion[]
): OfflineExamRecord {
  const totalQuestions = questions.length;
  let earnedPoints = 0;
  let maxPoints = 0;
  let correctCount = 0;
  let wrongCount = 0;

  questions.forEach((q) => {
    maxPoints += q.points;
    if (q.status === 'correct') {
      earnedPoints += q.points;
      correctCount++;
    } else if (q.status === 'wrong') {
      wrongCount++;
    }
  });

  const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  const record: OfflineExamRecord = {
    id: `exam_${Date.now()}`,
    title,
    timestamp: new Date().toLocaleString('zh-TW'),
    score: Math.round(earnedPoints * 10) / 10,
    totalPoints: Math.round(maxPoints * 10) / 10,
    accuracy,
    wrongCount,
    totalQuestions,
    questions,
  };

  try {
    const raw = localStorage.getItem(STORAGE_KEYS.OFFLINE_RESULTS);
    const list: OfflineExamRecord[] = raw ? JSON.parse(raw) : [];
    list.unshift(record);
    // Keep max 20 offline history records
    localStorage.setItem(STORAGE_KEYS.OFFLINE_RESULTS, JSON.stringify(list.slice(0, 20)));
  } catch (e) {
    console.error('Failed to save offline exam result:', e);
  }

  // Also collect wrong questions to persistent wrong notebook
  saveWrongQuestionsToNotebook(questions.filter((q) => q.status === 'wrong'));

  return record;
}

/**
 * Get offline exam results list
 */
export function getOfflineExamHistory(): OfflineExamRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.OFFLINE_RESULTS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

/**
 * Save wrong questions to Wrong Notebook
 */
export function saveWrongQuestionsToNotebook(wrongQuestions: ExamQuestion[]): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.WRONG_NOTEBOOK);
    const existing: ExamQuestion[] = raw ? JSON.parse(raw) : [];
    const map = new Map<number | string, ExamQuestion>();

    existing.forEach((q) => map.set(q.id, q));
    wrongQuestions.forEach((q) => map.set(q.id, q));

    const merged = Array.from(map.values());
    localStorage.setItem(STORAGE_KEYS.WRONG_NOTEBOOK, JSON.stringify(merged));
  } catch (e) {
    console.error('Failed to save to wrong notebook:', e);
  }
}

/**
 * Get all accumulated wrong questions for retake
 */
export function getWrongNotebookQuestions(): ExamQuestion[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.WRONG_NOTEBOOK);
    if (raw) {
      const list: ExamQuestion[] = JSON.parse(raw);
      if (Array.isArray(list) && list.length > 0) {
        return list;
      }
    }
  } catch (e) {
    console.error('Failed to get wrong notebook questions:', e);
  }

  // Default fallback: 8 wrong questions from default questions
  return mockQuestions.filter((q) => q.status === 'wrong');
}

/**
 * Clear offline database
 */
export function clearOfflineStorage(): void {
  localStorage.removeItem(STORAGE_KEYS.OFFLINE_BANK);
  localStorage.removeItem(STORAGE_KEYS.LAST_SYNC);
  localStorage.removeItem(STORAGE_KEYS.OFFLINE_RESULTS);
  localStorage.removeItem(STORAGE_KEYS.WRONG_NOTEBOOK);
}
