import appRequest from "@/lib/appRequests";
import { ImmerStateCreator } from "../useAppStore";
import DashboardModel from "@/models/DashboardModel";

export interface dashboardPageStore {
  dashboardPageData?: DashboardModel;
  actions: {
    getDashboard: () => Promise<void>;
  };
}

export interface dashboardPageSlice {
  dashboardPageStore: dashboardPageStore;
}

export const initDashboardPageStore: ImmerStateCreator<dashboardPageSlice> = (set) => ({
  dashboardPageStore: {
    dashboardPageData: undefined,
    actions: {
      async getDashboard() {
        const dashboardPage = await appRequest.getDashboard();

        set((state) => {
          state.dashboardPageStore.dashboardPageData = dashboardPage;
        });
      },
    },
  },
});
