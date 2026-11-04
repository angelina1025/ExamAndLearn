import { Question } from '@/types';

/**
 * Parse uploaded CSV / TXT content into Question draft items
 */
export function parseCsvQuestions(csvContent: string): Partial<Question>[] {
  const lines = csvContent
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length <= 1) return [];

  return lines.slice(1).map((line, idx) => {
    const cols = line.split(',').map((c) => c.trim());
    return {
      id: cols[0] || `Q-UPLOAD-${idx + 1}`,
      content: cols[1] || '',
      correctAnswer: cols[2] || '',
      explanation: cols[3] || '',
    };
  });
}

