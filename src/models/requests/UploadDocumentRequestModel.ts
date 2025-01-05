type UploadDocumentRequestModel = {
  id_dokumen: number;
  lokasi_file: string;
};

type UploadDocumentResponsetModel = {
  message: string;
};

export type { UploadDocumentRequestModel, UploadDocumentResponsetModel };
