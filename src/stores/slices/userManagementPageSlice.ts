import UserModel from "@/models/UserModel";
import { ImmerStateCreator } from "../useAppStore";
import appRequest from "@/lib/appRequests";
import { UpdateUserRequestModel } from "@/models/requests/UpdateUserRequestModel";
import { SaveUserRequestModel } from "@/models/requests/SaveUserRequestModel";

export interface userManagementPageStore {
  users: UserModel[];
  updatePenggunaID?: number;
  actions: {
    getUsers: () => Promise<UserModel[]>;
    saveUser: (payload: SaveUserRequestModel) => Promise<boolean>;
    updateUser: (payload: UpdateUserRequestModel) => Promise<boolean>;
    deleteUser: (id_pengguna: number) => Promise<boolean>;
    setUpdatePenggunaID: (id_pengguna: number) => void;
  };
}

export interface userManagementPageSlice {
  userManagementPageStore: userManagementPageStore;
}

export const initUserManagementPageStore: ImmerStateCreator<userManagementPageSlice> = (set, get) => ({
  userManagementPageStore: {
    users: [],
    actions: {
      async getUsers() {
        const users = await appRequest.getAllUser();

        set((state) => {
          state.userManagementPageStore.users = users;
        });

        return users;
      },
      async saveUser(payload: SaveUserRequestModel) {
        try {
          const res = await appRequest.saveUser(payload);

          if (res.message != "success") return false;

          await get().userManagementPageStore.actions.getUsers();
        } catch {
          return false;
        }

        return true;
      },
      async updateUser(payload: UpdateUserRequestModel) {
        try {
          const res = await appRequest.updateUser(payload);

          if (res.message != "success") return false;

          await get().userManagementPageStore.actions.getUsers();
        } catch {
          return false;
        }

        return true;
      },
      async deleteUser(id_pengguna: number) {
        try {
          await appRequest.deleteUser(id_pengguna);
          await get().userManagementPageStore.actions.getUsers();
        } catch {
          return false;
        }

        return true;
      },
      setUpdatePenggunaID(id_pengguna) {
        set((state) => {
          state.userManagementPageStore.updatePenggunaID = id_pengguna;
        });
      },
    },
  },
});
