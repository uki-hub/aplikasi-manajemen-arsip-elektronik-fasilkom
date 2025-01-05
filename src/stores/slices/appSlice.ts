import { DashboardMenu } from "@/lib/appConst";
import { ImmerStateCreator } from "../useAppStore";

export interface appStore {
  synced: boolean;
  dashboardCurrentMenu: DashboardMenu;
  actions: {
    sync: () => Promise<void>;
    dashboardMenuToggle: (menu: DashboardMenu) => void;
    reset: () => void;
  };
}

export interface appSlice {
  appStore: appStore;
}

export const initAppStore: ImmerStateCreator<appSlice> = (set, get) => ({
  appStore: {
    synced: false,
    dashboardCurrentMenu: "dashboard",
    actions: {
      async sync() {
        get().loadingStore.actions.setLoading(true);

        await get().masterDataStore.actions.getRoles();
        await get().masterDataStore.actions.getKategoriArsip();
        await get().authStore.actions.refreshUser();
        await get().userManagementPageStore.actions.getUsers();

        // if (get().authStore.gets.getUserRole() == "Mahasiswa" && window.location.pathname == "/management-user") {
        //   window.location.href = "/";
        // }

        set((state) => {
          state.appStore.synced = true;
          state.loadingStore.isLoading = false;
        });
      },
      dashboardMenuToggle(menu) {
        set((state) => {
          state.appStore.dashboardCurrentMenu = menu;
        });
      },
      reset() {
        set((state) => {
          state.appStore.synced = false;
          state.appStore.dashboardCurrentMenu = "dashboard";
        });
      },
    },
  },
});
