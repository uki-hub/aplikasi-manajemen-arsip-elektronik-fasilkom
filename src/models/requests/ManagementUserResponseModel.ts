type ManagementUserResponseModel = {
  id_pengguna: number;
  id_role: number;
  role_name: string;
  nama: string;
  username: string;
  password: string;
  status_aktif: string;
  tgl_registrasi: string;
};

export default ManagementUserResponseModel;
