import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { PauseOverlay } from "@/app/exam/[examId]/_components/PauseOverlay";

describe("PauseOverlay", () => {
  it("shows the paused state and the frozen time", () => {
    render(<PauseOverlay remainingSec={300} onResume={vi.fn()} onReset={vi.fn()} />);
    expect(screen.getByText("考試已暫停")).toBeInTheDocument();
    expect(screen.getByText("05:00")).toBeInTheDocument();
  });

  it("calls onResume when continuing", async () => {
    const user = userEvent.setup();
    const onResume = vi.fn();
    render(<PauseOverlay remainingSec={300} onResume={onResume} onReset={vi.fn()} />);
    await user.click(screen.getByRole("button", { name: "繼續考試" }));
    expect(onResume).toHaveBeenCalledTimes(1);
  });

  it("calls onReset when restarting", async () => {
    const user = userEvent.setup();
    const onReset = vi.fn();
    render(<PauseOverlay remainingSec={300} onResume={vi.fn()} onReset={onReset} />);
    await user.click(screen.getByRole("button", { name: "重新測試" }));
    expect(onReset).toHaveBeenCalledTimes(1);
  });
});
