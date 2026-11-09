import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { ExamQuestion } from "@/types/exam";
import { QuestionDisplay as QuestionCard } from "@/app/exam/[examId]/_components/QuestionDisplay";

const singleQuestion: ExamQuestion = {
  id: "q1",
  type: "single",
  prompt: "單選題目",
  points: 2,
  options: [
    { id: "A", text: "選項 A" },
    { id: "B", text: "選項 B" },
  ],
};

const multipleQuestion: ExamQuestion = {
  id: "q2",
  type: "multiple",
  prompt: "多選題目",
  points: 3,
  options: [
    { id: "A", text: "選項 A" },
    { id: "B", text: "選項 B" },
  ],
};

const booleanQuestion: ExamQuestion = {
  id: "q3",
  type: "boolean",
  prompt: "是非題目",
  points: 1,
  options: [
    { id: "T", text: "是（True）" },
    { id: "F", text: "否（False）" },
  ],
};

describe("QuestionCard", () => {
  it("replaces the answer when a single choice is clicked twice", async () => {
    const user = userEvent.setup();
    const onAnswer = vi.fn();
    render(
      <QuestionCard
        question={singleQuestion}
        number={1}
        answer={undefined}
        flagged={false}
        onAnswer={onAnswer}
        onToggleFlag={vi.fn()}
      />
    );

    await user.click(screen.getByText("選項 A"));
    await user.click(screen.getByText("選項 B"));

    expect(onAnswer).toHaveBeenNthCalledWith(1, "A");
    expect(onAnswer).toHaveBeenNthCalledWith(2, "B");
  });

  it("adds and removes multiple choices", async () => {
    const user = userEvent.setup();
    const onAnswer = vi.fn();
    render(
      <QuestionCard
        question={multipleQuestion}
        number={2}
        answer={["A"]}
        flagged={false}
        onAnswer={onAnswer}
        onToggleFlag={vi.fn()}
      />
    );

    await user.click(screen.getByText("選項 B"));
    expect(onAnswer).toHaveBeenLastCalledWith(["A", "B"]);

    await user.click(screen.getByText("選項 A"));
    expect(onAnswer).toHaveBeenLastCalledWith([]);
  });

  it("renders boolean options and toggles the flag", async () => {
    const user = userEvent.setup();
    const onToggleFlag = vi.fn();
    render(
      <QuestionCard
        question={booleanQuestion}
        number={3}
        answer="T"
        flagged={false}
        onAnswer={vi.fn()}
        onToggleFlag={onToggleFlag}
      />
    );

    expect(screen.getByText("是（True）")).toBeInTheDocument();
    expect(screen.getByText("否（False）")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /標註/ }));
    expect(onToggleFlag).toHaveBeenCalledTimes(1);
  });

  it("shows the flagged label", () => {
    render(
      <QuestionCard
        question={singleQuestion}
        number={1}
        answer="A"
        flagged
        onAnswer={vi.fn()}
        onToggleFlag={vi.fn()}
      />
    );
    expect(screen.getByRole("button", { name: /已標註/ })).toBeInTheDocument();
  });
});
