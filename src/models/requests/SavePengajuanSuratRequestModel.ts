type SavePengajuanSuratRequestModel = {
  id_pengguna: number;
  id_dosen: number;
  id_kategori_arsip: number;
  judul_dokumen: string;
  deskripsi: string;
  lokasi_file: string;
};

type SavePengajuanSuratResponseModel = {
  id_dokumen: number;
};

export type { SavePengajuanSuratRequestModel, SavePengajuanSuratResponseModel };
