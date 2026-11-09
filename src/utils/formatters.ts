import { remainingFromDeadline } from '@/hooks/useCountdown';

/**
 * Format timestamp to Google Sheet standard format: "YYYY/M/D HH:mm:ss"
 */
export function formatSheetTimestamp(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const hh = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  const ss = String(date.getSeconds()).padStart(2, '0');
  return `${y}/${m}/${d} ${hh}:${mm}:${ss}`;
}

/**
 * Format seconds into mm:ss string for exam countdown timer
 */
export function formatTime(totalSec: number): string {
  const safe = Math.max(0, Math.floor(totalSec));
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export const formatSecondsToMmSs = formatTime;

export { remainingFromDeadline };
