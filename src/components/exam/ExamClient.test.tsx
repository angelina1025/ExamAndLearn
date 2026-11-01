import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Exam } from "@/types/exam";
import { ExamClient } from "./ExamClient";

const exam: Exam = {
  id: "demo-exam",
  title: "示範考卷",
  subtitle: "2 題",
  durationSec: 60,
  questions: [
    {
      id: "q1",
      type: "single",
      prompt: "單選題目",
      points: 2,
      options: [
        { id: "A", text: "選項 A" },
        { id: "B", text: "選項 B" },
      ],
    },
    {
      id: "q2",
      type: "multiple",
      prompt: "多選題目",
      points: 3,
      options: [
        { id: "A", text: "選項 A" },
        { id: "B", text: "選項 B" },
      ],
    },
  ],
};

class FakeIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

function firstGroup() {
  return screen.getAllByRole("group")[0];
}

describe("ExamClient", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.stubGlobal("IntersectionObserver", FakeIntersectionObserver);
    Element.prototype.scrollIntoView = vi.fn();
    window.scrollTo = vi.fn();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("renders the questions and updates progress after answering", async () => {
    const user = userEvent.setup();
    render(<ExamClient exam={exam} />);

    expect(await screen.findByText("單選題目")).toBeInTheDocument();
    expect(screen.getAllByText("0 / 2 題").length).toBeGreaterThan(0);

    await user.click(within(firstGroup()).getByRole("button", { name: /選項 A/ }));

    expect(screen.getAllByText("1 / 2 題").length).toBeGreaterThan(0);
    expect(within(firstGroup()).getByRole("button", { name: /選項 A/ })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
    expect(within(firstGroup()).getByRole("button", { name: /選項 B/ })).toHaveAttribute(
      "aria-pressed",
      "false"
    );
  });

  it("pauses and resumes the exam", async () => {
    const user = userEvent.setup();
    render(<ExamClient exam={exam} />);
    await screen.findByText("單選題目");

    await user.click(screen.getByRole("button", { name: "暫停" }));
    const overlay = screen.getByRole("dialog", { name: "考試已暫停" });
    expect(overlay).toBeInTheDocument();
    expect(within(overlay).getByText("01:00")).toBeInTheDocument();

    await user.click(within(overlay).getByRole("button", { name: "繼續考試" }));
    expect(screen.queryByRole("dialog", { name: "考試已暫停" })).toBeNull();
  });

  it("confirms submission and shows the success screen", async () => {
    const user = userEvent.setup();
    render(<ExamClient exam={exam} />);
    await screen.findByText("單選題目");

    await user.click(screen.getByRole("button", { name: "交卷" }));
    const dialog = screen.getByRole("dialog", { name: "確認交卷？" });
    expect(within(dialog).getByText("0 / 2 題")).toBeInTheDocument();
    expect(within(dialog).getByText("1、2")).toBeInTheDocument();

    await user.click(within(dialog).getByRole("button", { name: "確認交卷" }));

    expect(screen.getByText("交卷成功")).toBeInTheDocument();
    expect(screen.getByText("答案已送出，交卷後無法再修改。")).toBeInTheDocument();
    expect(screen.queryByText("單選題目")).toBeNull();
  });

  it("closes the submit dialog with Escape without submitting", async () => {
    const user = userEvent.setup();
    render(<ExamClient exam={exam} />);
    await screen.findByText("單選題目");

    await user.click(screen.getByRole("button", { name: "交卷" }));
    fireEvent.keyDown(document, { key: "Escape" });

    expect(screen.queryByRole("dialog", { name: "確認交卷？" })).toBeNull();
    expect(screen.queryByText("交卷成功")).toBeNull();
    expect(screen.getByText("單選題目")).toBeInTheDocument();
  });

  it("restarts the exam from the pause overlay", async () => {
    const user = userEvent.setup();
    const confirm = vi.spyOn(window, "confirm").mockReturnValue(true);
    render(<ExamClient exam={exam} />);
    await screen.findByText("單選題目");

    await user.click(within(firstGroup()).getByRole("button", { name: /選項 A/ }));
    await user.click(screen.getAllByRole("button", { name: /標註/ })[0]);
    await user.click(screen.getByRole("button", { name: "暫停" }));
    await user.click(screen.getByRole("button", { name: "重新測試" }));

    expect(confirm).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("dialog", { name: "考試已暫停" })).toBeNull();
    expect(screen.getAllByText("0 / 2 題").length).toBeGreaterThan(0);
    expect(
      screen.getAllByRole("button", { name: /選項 A/ }).every((button) => button.getAttribute("aria-pressed") === "false")
    ).toBe(true);
    expect(screen.queryAllByRole("button", { name: /已標註/ })).toHaveLength(0);
  });
});
