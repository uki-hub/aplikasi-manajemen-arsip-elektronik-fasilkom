import { ImmerStateCreator } from "../useAppStore";

export interface loadingStore {
  isLoading: boolean;
  actions: {
    setLoading: (loading: boolean) => void;
  };
}

export interface loadingSlice {
  loadingStore: loadingStore;
}

export const initloadingStore: ImmerStateCreator<loadingSlice> = (set) => ({
  loadingStore: {
    isLoading: false,

    actions: {
      setLoading(loading) {
        set((state) => {
          state.loadingStore.isLoading = loading;
        });
      },
    },
  },
});
