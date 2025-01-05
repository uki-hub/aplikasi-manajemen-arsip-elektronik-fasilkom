import { StateCreator, create } from "zustand";
import { immer } from "zustand/middleware/immer";

// practice-slice.ts
export interface PracticeState {
  PracticeState: {
    activeQuestion: number;
    nextQuestion: () => void;
  };
}

export interface PracticeState2 {
  PracticeState2: {
    activeQuestion: number;
    nextQuestion: () => void;
  };
}

export const practiceSlice: ImmerStateCreator<PracticeState> = (set) => ({
  PracticeState: {
    activeQuestion: 0,
    nextQuestion: () =>
      set((state) => {
        state.practice.PracticeState.activeQuestion++;
      }),
  },
});

export const practiceSlice2: ImmerStateCreator<PracticeState2> = (set) => ({
  PracticeState2: {
    activeQuestion: 0,
    nextQuestion: () =>
      set((state) => {
        state.practice2.PracticeState2.activeQuestion++;
      }),
  },
});

// store.ts
export type CommonState = {
  practice: PracticeState;
  practice2: PracticeState2;
};

export type ImmerStateCreator<T> = StateCreator<CommonState, [["zustand/immer", never], never], [], T>;

export const useStore = create<CommonState>()(
  immer((...args) => ({
    practice: practiceSlice(...args),
    practice2: practiceSlice2(...args),
  }))
);
