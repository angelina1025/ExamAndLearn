'use client';

import { useEffect } from 'react';

export function remainingFromDeadline(deadline: number, now: number = Date.now()): number {
  return Math.max(0, Math.ceil((deadline - now) / 1000));
}

export function useCountdown(
  enabled: boolean,
  deadline: number | null,
  onTick: (remainingSec: number) => void
) {
  useEffect(() => {
    if (!enabled || deadline === null) return;
    const tick = () => {
      onTick(remainingFromDeadline(deadline));
    };
    tick();
    const timer = window.setInterval(tick, 250);
    return () => window.clearInterval(timer);
  }, [enabled, deadline, onTick]);
}
