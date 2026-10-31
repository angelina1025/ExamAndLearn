import type { Answer, Exam } from "@/types/exam";

export function isAnswered(answer: Answer | undefined): boolean {
  if (answer === undefined) return false;
  return Array.isArray(answer) ? answer.length > 0 : answer !== "";
}

export function countAnswered(exam: Exam, answers: Record<string, Answer>): number {
  return exam.questions.filter((question) => isAnswered(answers[question.id])).length;
}

export function getUnansweredNumbers(exam: Exam, answers: Record<string, Answer>): number[] {
  return exam.questions
    .map((question, index) => ({ question, number: index + 1 }))
    .filter(({ question }) => !isAnswered(answers[question.id]))
    .map(({ number }) => number);
}

export function countFlagged(exam: Exam, flags: string[]): number {
  const ids = new Set(exam.questions.map((question) => question.id));
  return flags.filter((id) => ids.has(id)).length;
}
