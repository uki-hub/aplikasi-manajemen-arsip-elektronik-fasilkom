import appRequest from "@/lib/appRequests";
import { ImmerStateCreator } from "../useAppStore";

export interface loginPageStore {
  currentMenu: "login" | "forgotPassword";
  username: string;
  password: string;
  actions: {
    menuToggle: (toggle: "login" | "forgotPassword") => void;
    login: (username: string, password: string) => Promise<boolean>;
    forgotPassword: (email: string) => Promise<boolean>;
  };
}

export interface loginPageSlice {
  loginPageStore: loginPageStore;
}

export const initLoginPageStore: ImmerStateCreator<loginPageSlice> = (set, get) => ({
  loginPageStore: {
    currentMenu: "login",
    username: "",
    password: "",
    actions: {
      async login(username, password) {
        if (username == "" && password == "") return false;

        const user = await appRequest.login({
          username,
          password,
        });

        if (user.error) return false;

        get().authStore.actions.signIn(user);

        return true;
      },
      menuToggle(toggle) {
        set((state) => {
          state.loginPageStore.currentMenu = toggle;
        });
      },
      async forgotPassword(email) {
        const res = await appRequest.forgotPassword({
          email,
        });

        return res?.success ?? false;
      },
    },
  },
});
