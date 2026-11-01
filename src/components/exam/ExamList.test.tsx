import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { MouseEvent, ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Exam } from "@/types/exam";
import { saveSession, storageKey } from "@/features/exam/storage";
import { ExamList } from "./ExamList";

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    onClick,
  }: {
    href: string;
    children: ReactNode;
    onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  }) => (
    <a
      href={href}
      onClick={(event) => {
        // jsdom 不支援導航，先阻止預設行為再轉呼叫 ExamList 的 onClick。
        event.preventDefault();
        onClick?.(event);
      }}
    >
      {children}
    </a>
  ),
}));

const exam: Exam = {
  id: "assigned-demo",
  title: "Demo Exam",
  subtitle: "",
  durationSec: 3600,
  questions: [
    { id: "q1", type: "single", prompt: "Q1", points: 2, options: [] },
  ],
};

const submitted = {
  examId: "assigned-demo",
  answers: { q1: "A" },
  flags: [],
  currentIndex: 0,
  remainingSec: 0,
  status: "submitted" as const,
  deadline: null,
};

describe("ExamList", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("shows the completed state for a submitted session", async () => {
    saveSession(submitted);

    render(<ExamList exams={[exam]} />);

    expect(await screen.findByText("已完成")).toBeInTheDocument();
    expect(screen.getByText("重新測試")).toBeInTheDocument();
  });

  it("clears the session when restarting is confirmed", async () => {
    saveSession(submitted);
    const user = userEvent.setup();
    const confirm = vi.spyOn(window, "confirm").mockReturnValue(true);

    render(<ExamList exams={[exam]} />);
    await user.click(await screen.findByText("重新測試"));

    expect(confirm).toHaveBeenCalledWith("這份考卷已完成，要重新測試嗎？");
    expect(localStorage.getItem(storageKey("assigned-demo"))).toBeNull();
  });

  it("keeps the session when restarting is cancelled", async () => {
    saveSession(submitted);
    const user = userEvent.setup();
    vi.spyOn(window, "confirm").mockReturnValue(false);

    render(<ExamList exams={[exam]} />);
    await user.click(await screen.findByText("重新測試"));

    expect(localStorage.getItem(storageKey("assigned-demo"))).not.toBeNull();
  });
});
