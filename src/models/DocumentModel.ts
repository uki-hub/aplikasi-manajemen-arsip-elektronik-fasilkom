type DocumentModel = {
  id_dokumen: number;
  id_pembuat: number;
  nama_pembuat: string;
  judul_dokumen: string;
  deskripsi_dokumen: string;
  tanggal_dibuat: string;
  status_dokumen: string;
  nama_file: string;
  lokasi_file: string;
};

export default DocumentModel;
