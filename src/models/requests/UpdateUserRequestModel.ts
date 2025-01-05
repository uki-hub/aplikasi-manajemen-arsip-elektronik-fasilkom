type UpdateUserRequestModel = {
  id_pengguna: number;
  nama_lengkap: string;
  username: string;
  password: string;
  role_id: number;
  status: boolean;
};

type UpdateUserResponseModel = {
  message: string;
};

export type { UpdateUserRequestModel, UpdateUserResponseModel };
