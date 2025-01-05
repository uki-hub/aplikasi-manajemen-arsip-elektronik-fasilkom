import { create, StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";
import { authSlice, initAuthStore } from "./slices/authSlice";
import { loginPageSlice, initLoginPageStore } from "./slices/loginPageSlice";
import { devtools } from "zustand/middleware";
import { initloadingStore, loadingSlice } from "./slices/loadingSlice";
import { initMasterDataStore, masterDataSlice } from "./slices/masterDataSlice";
import { dashboardPageSlice, initDashboardPageStore } from "./slices/dashboardPageSlice";
import { appSlice, initAppStore } from "./slices/appSlice";
import { documentPageSlice, initDocumentPageStore } from "./slices/documentPageSlice";
import { initUserManagementPageStore, userManagementPageSlice } from "./slices/userManagementPageSlice";
import { initMessageModalStore, messageModalSlice } from "./slices/messageModalSlice";

type AppStore = loadingSlice &
  messageModalSlice &
  masterDataSlice &
  authSlice &
  loginPageSlice &
  dashboardPageSlice &
  appSlice &
  documentPageSlice &
  userManagementPageSlice;

const useAppStore = create<AppStore>()(
  immer(
    devtools((...args) => ({
      ...initAppStore(...args),
      ...initloadingStore(...args),
      ...initMessageModalStore(...args),
      ...initMasterDataStore(...args),
      ...initAuthStore(...args),
      ...initLoginPageStore(...args),
      ...initDashboardPageStore(...args),
      ...initDocumentPageStore(...args),
      ...initUserManagementPageStore(...args),
    }))
  )
);

export default useAppStore;

export type ImmerStateCreator<T> = StateCreator<AppStore, [["zustand/immer", never], never], [], T>;
