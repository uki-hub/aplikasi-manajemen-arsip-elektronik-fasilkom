import UserModel from "../UserModel";

type LoginRequestModel = {
  username: string;
  password: string;
};

export interface LoginResponseModel extends UserModel {
  error: string;
}

export type { LoginRequestModel };
