import RoleModel from "@/models/RoleModel";
import { ImmerStateCreator } from "../useAppStore";
import appRequest from "@/lib/appRequests";
import KategoriArsipModel from "@/models/KategoriArsipModel";

export interface masterDataStore {
  roles: RoleModel[];
  kategoriArsip: KategoriArsipModel[];
  actions: {
    getRoles: () => Promise<void>;
    getKategoriArsip: () => Promise<void>;
  };
}

export interface masterDataSlice {
  masterDataStore: masterDataStore;
}

export const initMasterDataStore: ImmerStateCreator<masterDataSlice> = (set) => ({
  masterDataStore: {
    roles: [],
    kategoriArsip: [],
    actions: {
      async getRoles() {
        const data = await appRequest.getAllRoles();

        set((state) => {
          state.masterDataStore.roles = data;
        });
      },
      async getKategoriArsip() {
        const data = await appRequest.getAllKategoriArsip();

        set((state) => {
          state.masterDataStore.kategoriArsip = data;
        });
      },
    },
  },
});
