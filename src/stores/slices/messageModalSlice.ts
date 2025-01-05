import { ImmerStateCreator } from "../useAppStore";

export interface messageModalStore {
  isVisible: boolean;
  message: string;
  actions: {
    show: (message: string) => void;
    close: () => void;
  };
}

export interface messageModalSlice {
  messageModalStore: messageModalStore;
}

export const initMessageModalStore: ImmerStateCreator<messageModalSlice> = (set) => ({
  messageModalStore: {
    isVisible: false,
    message: "",
    actions: {
      show(message) {
        set((state) => {
          state.messageModalStore.message = message;
          state.messageModalStore.isVisible = true;
        });
      },
      close() {
        set((state) => {
          state.messageModalStore.message = "";
          state.messageModalStore.isVisible = false;
        });
      },
    },
  },
});
