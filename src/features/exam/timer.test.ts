import { describe, expect, it } from "vitest";
import { formatTime, remainingFromDeadline } from "./timer";

describe("formatTime", () => {
  it("formats seconds as mm:ss", () => {
    expect(formatTime(9 * 60 + 42)).toBe("09:42");
  });

  it("pads single-digit seconds", () => {
    expect(formatTime(65)).toBe("01:05");
  });

  it("never shows negative values", () => {
    expect(formatTime(-5)).toBe("00:00");
  });

  it("shows zero as 00:00", () => {
    expect(formatTime(0)).toBe("00:00");
  });
});

describe("remainingFromDeadline", () => {
  it("rounds partial seconds up", () => {
    expect(remainingFromDeadline(10_500, 10_000)).toBe(1);
  });

  it("returns zero after the deadline", () => {
    expect(remainingFromDeadline(9_000, 10_000)).toBe(0);
  });

  it("returns full seconds when exactly on the second", () => {
    expect(remainingFromDeadline(70_000, 10_000)).toBe(60);
  });
});
