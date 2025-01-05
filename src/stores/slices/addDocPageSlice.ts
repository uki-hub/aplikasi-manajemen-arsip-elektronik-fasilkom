import { SavePengajuanSuratRequestModel } from "@/models/requests/SavePengajuanSuratRequestModel";
import { ImmerStateCreator } from "../useAppStore";
import appRequest from "@/lib/appRequests";

export interface addDocStore {
  actions: {
    save: (payload: SavePengajuanSuratRequestModel) => Promise<boolean>;
  };
}

export interface addDocSlice {
  addDocStore: addDocStore;
}

export const initaddDocStore: ImmerStateCreator<addDocSlice> = () => ({
  addDocStore: {
    actions: {
      save: async (payload) => {
        const id_dokumen = await appRequest.saveDocumentPengajuan(payload);

        return !id_dokumen;
      },
    },
  },
});
