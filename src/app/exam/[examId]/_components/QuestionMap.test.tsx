import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { ExamQuestion } from "@/types/exam";
import { QuestionMap } from "@/app/exam/[examId]/_components/QuestionMap";

const questions: ExamQuestion[] = [1, 2, 3, 4].map((number) => ({
  id: `q${number}`,
  type: "single",
  prompt: `題目 ${number}`,
  points: 1,
  options: [{ id: "A", text: "選項 A" }],
}));

describe("QuestionMap", () => {
  it("reflects answered, flagged, combined and current states", () => {
    render(
      <QuestionMap
        questions={questions}
        answers={{ q1: "A", q2: ["A"] }}
        flags={["q2", "q3"]}
        currentIndex={3}
        onNavigate={vi.fn()}
      />
    );

    const first = screen.getByRole("button", { name: "第 1 題" });
    expect(first).toHaveAttribute("data-done", "true");
    expect(first).toHaveAttribute("data-flagged", "false");

    const second = screen.getByRole("button", { name: "第 2 題" });
    expect(second).toHaveAttribute("data-done", "true");
    expect(second).toHaveAttribute("data-flagged", "true");
    expect(second.querySelector("span")).not.toBeNull();

    const third = screen.getByRole("button", { name: "第 3 題" });
    expect(third).toHaveAttribute("data-done", "false");
    expect(third).toHaveAttribute("data-flagged", "true");

    const fourth = screen.getByRole("button", { name: "第 4 題" });
    expect(fourth).toHaveAttribute("aria-current", "step");
  });

  it("navigates to the clicked question", async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();
    render(
      <QuestionMap
        questions={questions}
        answers={{}}
        flags={[]}
        currentIndex={0}
        onNavigate={onNavigate}
      />
    );

    await user.click(screen.getByRole("button", { name: "第 3 題" }));
    expect(onNavigate).toHaveBeenCalledWith(2);
  });

  it("marks the empty answer array as unanswered", () => {
    render(
      <QuestionMap
        questions={questions.slice(0, 1)}
        answers={{ q1: [] }}
        flags={[]}
        currentIndex={0}
        onNavigate={vi.fn()}
      />
    );

    expect(screen.getByRole("button", { name: "第 1 題" })).toHaveAttribute("data-done", "false");
  });
});
