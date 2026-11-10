import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SubmitDialog } from "@/app/exam/[examId]/_components/SubmitDialog";

describe("SubmitDialog", () => {
  it("renders nothing when closed", () => {
    const { container } = render(
      <SubmitDialog
        open={false}
        answered={0}
        total={2}
        unansweredNumbers={[1, 2]}
        flaggedCount={0}
        onCancel={vi.fn()}
        onConfirm={vi.fn()}
      />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("lists the unanswered question numbers", () => {
    render(
      <SubmitDialog
        open
        answered={2}
        total={4}
        unansweredNumbers={[1, 3]}
        flaggedCount={2}
        onCancel={vi.fn()}
        onConfirm={vi.fn()}
      />
    );

    expect(screen.getByText("2 / 4 題")).toBeInTheDocument();
    expect(screen.getByText("2 題")).toBeInTheDocument();
    expect(screen.getByText("1、3")).toBeInTheDocument();
  });

  it("shows 無 when every question is answered", () => {
    render(
      <SubmitDialog
        open
        answered={2}
        total={2}
        unansweredNumbers={[]}
        flaggedCount={0}
        onCancel={vi.fn()}
        onConfirm={vi.fn()}
      />
    );

    expect(screen.getByText("無")).toBeInTheDocument();
  });

  it("calls the handlers and closes on Escape", () => {
    const onCancel = vi.fn();
    const onConfirm = vi.fn();
    render(
      <SubmitDialog
        open
        answered={1}
        total={2}
        unansweredNumbers={[2]}
        flaggedCount={0}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
    );

    screen.getByRole("button", { name: "確認交卷" }).click();
    expect(onConfirm).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(document, { key: "Escape" });
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
