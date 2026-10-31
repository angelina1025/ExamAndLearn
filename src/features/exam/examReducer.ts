import type { Answer, ExamSessionState } from "@/types/exam";

export type ExamAction =
  | { type: "ANSWER"; questionId: string; answer: Answer }
  | { type: "TOGGLE_FLAG"; questionId: string }
  | { type: "GOTO"; index: number; total: number }
  | { type: "TICK"; remainingSec: number }
  | { type: "PAUSE"; remainingSec: number }
  | { type: "RESUME"; deadline: number }
  | { type: "RESET"; durationSec: number; deadline: number }
  | { type: "SUBMIT" }
  | { type: "HYDRATE"; state: ExamSessionState };

export function createInitialState(
  examId: string,
  durationSec: number,
  deadline: number
): ExamSessionState {
  return {
    examId,
    answers: {},
    flags: [],
    currentIndex: 0,
    remainingSec: durationSec,
    status: "running",
    deadline,
  };
}

export function examReducer(state: ExamSessionState, action: ExamAction): ExamSessionState {
  switch (action.type) {
    case "ANSWER":
      if (state.status !== "running") return state;
      return {
        ...state,
        answers: { ...state.answers, [action.questionId]: action.answer },
      };

    case "TOGGLE_FLAG": {
      if (state.status !== "running") return state;
      const flagged = state.flags.includes(action.questionId);
      return {
        ...state,
        flags: flagged
          ? state.flags.filter((id) => id !== action.questionId)
          : [...state.flags, action.questionId],
      };
    }

    case "GOTO": {
      if (state.status === "submitted") return state;
      const max = Math.max(action.total - 1, 0);
      const index = Math.min(Math.max(action.index, 0), max);
      if (index === state.currentIndex) return state;
      return { ...state, currentIndex: index };
    }

    case "TICK": {
      if (state.status !== "running") return state;
      const remainingSec = Math.max(0, action.remainingSec);
      if (remainingSec === state.remainingSec) return state;
      if (remainingSec === 0) {
        return { ...state, remainingSec: 0, status: "submitted", deadline: null };
      }
      return { ...state, remainingSec };
    }

    case "PAUSE":
      if (state.status !== "running") return state;
      return {
        ...state,
        status: "paused",
        remainingSec: Math.max(0, action.remainingSec),
        deadline: null,
      };

    case "RESUME":
      if (state.status !== "paused") return state;
      return { ...state, status: "running", deadline: action.deadline };

    case "RESET":
      return createInitialState(state.examId, action.durationSec, action.deadline);

    case "SUBMIT":
      if (state.status === "submitted") return state;
      return { ...state, status: "submitted", deadline: null };

    case "HYDRATE":
      return action.state;

    default:
      return state;
  }
}
