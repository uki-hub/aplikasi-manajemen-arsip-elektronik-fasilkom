import DocumentModel from "@/models/DocumentModel";
import { ImmerStateCreator } from "../useAppStore";
import appRequest from "@/lib/appRequests";
import { UploadDocumentRequestModel } from "@/models/requests/UploadDocumentRequestModel";
import { SavePengajuanSuratRequestModel } from "@/models/requests/SavePengajuanSuratRequestModel";

export interface documentPageStore {
  documents: DocumentModel[];
  actions: {
    getDocuments: () => Promise<DocumentModel[]>;
    approveDocument: (dokumen_id: number) => Promise<boolean>;
    mahasiswaUploadDocument: (payload: SavePengajuanSuratRequestModel) => Promise<boolean>;
    adminUploadDocument: (payload: UploadDocumentRequestModel) => Promise<boolean>;
    getDocument: (dokument_id: number) => Promise<DocumentModel>;
  };
}

export interface documentPageSlice {
  documentPageStore: documentPageStore;
}

export const initDocumentPageStore: ImmerStateCreator<documentPageSlice> = (set, get) => ({
  documentPageStore: {
    isLoading: true,
    documents: [],
    actions: {
      async getDocuments() {
        const documents = await appRequest.getDocuments();

        set((state) => {
          state.documentPageStore.documents = documents;
        });

        return documents;
      },
      async mahasiswaUploadDocument(payload) {
        try {
          await appRequest.saveDocumentPengajuan(payload);
          await get().documentPageStore.actions.getDocuments();
        } catch {
          return false;
        }

        return true;
      },
      async approveDocument(dokumen_id) {
        try {
          const res = await appRequest.approveDocumentPengajuan({ id_dokumen: dokumen_id });

          if (res.message != "success") return false;

          await get().documentPageStore.actions.getDocuments();
        } catch {
          return false;
        }

        return true;
      },
      async adminUploadDocument(payload) {
        try {
          await appRequest.uploadDocument(payload);
          await get().documentPageStore.actions.getDocuments();
        } catch {
          return false;
        }

        return true;
      },
      async getDocument(dokument_id) {
        try {
          const doc = await appRequest.getDocument(dokument_id);
          return doc;
        } catch {
          throw Error("Something went wrong");
        }
      },
    },
  },
});
