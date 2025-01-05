type SaveUserRequestModel = {
  nama_lengkap: string;
  username: string;
  password: string;
  role_id: number;
  status: boolean;
};

type SaveUserResponseModel = {
  message: string;
};

export type { SaveUserRequestModel, SaveUserResponseModel };
