import { useState, useEffect } from 'react';

interface UseCountdownOptions {
  initialSeconds: number;
  isPaused?: boolean;
  onExpire?: () => void;
}

/**
 * 倒數計時與強制交卷 Custom Hook
 */
export function useCountdown({
  initialSeconds,
  isPaused = false,
  onExpire,
}: UseCountdownOptions) {
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);

  useEffect(() => {
    setRemainingSeconds(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (isPaused || remainingSeconds <= 0) return;

    const timer = window.setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          onExpire?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isPaused, remainingSeconds, onExpire]);

  return { remainingSeconds, setRemainingSeconds };
}

