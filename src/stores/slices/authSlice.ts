import UserModel from "@/models/UserModel";
import { ImmerStateCreator } from "../useAppStore";
import cookieService from "@/lib/cookieService";
import appRequest from "@/lib/appRequests";
import logService from "@/lib/logService";
import { UserRole } from "@/lib/appConst";

export interface authStore {
  user?: UserModel;
  gets: {
    isAuthenticated: () => boolean;
    getPenggunaId: () => number;
    getUserRole: () => UserRole | undefined;
  };
  actions: {
    signIn: (user: UserModel) => void;
    signOut: () => void;
    refreshUser: () => Promise<boolean>;
  };
}

export interface authSlice {
  authStore: authStore;
}

export const initAuthStore: ImmerStateCreator<authSlice> = (set, get) => ({
  authStore: {
    user: undefined,
    onSync: true,
    gets: {
      isAuthenticated() {
        return cookieService.get("uid") != null;
      },
      getPenggunaId() {
        const id = cookieService.get("uid");

        if (id == undefined) window.location.href = "/";

        return +id!;
      },
      getUserRole() {
        const roleID = get().authStore.user?.id_role;

        switch (roleID) {
          case 1:
            return "Admin";

          case 2:
            return "Mahasiswa";

          case 3:
            return "Dosen";

          case undefined:
            return undefined;

          default:
            logService.log(`Role id is not found ${roleID}`);
            throw Error("Role id is not found");
        }
      },
    },
    actions: {
      signIn(user) {
        cookieService.set("uid", user.id_pengguna);

        set((state) => {
          state.authStore.user = user;
        });
      },
      signOut() {
        cookieService.remove("uid");

        set((state) => {
          state.appStore.synced = false;
          state.authStore.user = undefined;
        });

        get().appStore.actions.reset();
      },
      async refreshUser() {
        let user: UserModel | undefined;

        try {
          user = await appRequest.getUserData(+cookieService.get("uid")!);
        } catch (e) {
          logService.log(e);

          return false;
        } finally {
          set((state) => {
            state.authStore.user = user;
          });
        }

        return true;
      },
    },
  },
});
