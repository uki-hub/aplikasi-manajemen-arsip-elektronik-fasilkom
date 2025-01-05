import { LoginRequestModel, LoginResponseModel } from "@/models/requests/LoginRequestModel";
import { post, get, url } from "./apiService";
import { ForgotPasswordRequestModel, ForgotPasswordResponseModel } from "@/models/requests/ForgotPasswordRequestModel";
import GetUserDataResponse from "@/models/requests/GetUserDataRequestModel";
import DashboardAdminResponseModel from "@/models/requests/DashboardRequestModel";
import GetAllDokumenResponseModel from "@/models/requests/GetAllDokumenRequestModel";
import {
  SavePengajuanSuratRequestModel,
  SavePengajuanSuratResponseModel,
} from "@/models/requests/SavePengajuanSuratRequestModel";
import {
  ApprovePengajuanSuratRequestModel,
  ApprovePengajuanSuratResponseModel,
} from "@/models/requests/ApprovePengajuanSuratRequsetModel";
import { UploadDocumentRequestModel, UploadDocumentResponsetModel } from "@/models/requests/UploadDocumentRequestModel";
import cookieService from "./cookieService";
import GetAllUserResponseModel from "@/models/requests/GetAllUserResponseModel";
import GetAllRolesResponseModel from "@/models/requests/GetAllRolesRequestModel";
import GetAllKategoriArsipResponseModel from "@/models/requests/GetAllKategoriResponseModel";
import { SaveUserRequestModel, SaveUserResponseModel } from "@/models/requests/SaveUserRequestModel";
import { UpdateUserRequestModel, UpdateUserResponseModel } from "@/models/requests/UpdateUserRequestModel";
import GetDocumentResponseModel from "@/models/requests/GetDocumentRequestModel";

const login = async (req: LoginRequestModel): Promise<LoginResponseModel> => {
  return await post(url("/pengguna/login"), req);
};

const forgotPassword = async (req: ForgotPasswordRequestModel): Promise<ForgotPasswordResponseModel> => {
  return await post(url("/pengguna/forgot_password"), req);
};

const getUserData = async (id_pengguna: number): Promise<GetUserDataResponse> => {
  return await get(url("/pengguna/get_user_data"), {
    id_pengguna,
  });
};

const getAllRoles = async (): Promise<GetAllRolesResponseModel> => {
  return await get(url("/role/get_all_role"));
};

const getDashboard = async (): Promise<DashboardAdminResponseModel> => {
  return await get(url("/dokumen/get_dashboard"), {
    id_pengguna: cookieService.get("uid")!,
  });
};

const getDocuments = async (): Promise<GetAllDokumenResponseModel> => {
  return await get(url("/dokumen/get_all_surat"), {
    id_pengguna: cookieService.get("uid")!,
  });
};

const saveDocumentPengajuan = async (req: SavePengajuanSuratRequestModel): Promise<SavePengajuanSuratResponseModel> => {
  return await post(url("/dokumen/save_pengajuan_surat"), req);
};

const approveDocumentPengajuan = async (
  req: ApprovePengajuanSuratRequestModel
): Promise<ApprovePengajuanSuratResponseModel> => {
  return await post(url("/dokumen/save_verifikasi_surat"), req);
};

const uploadDocument = async (req: UploadDocumentRequestModel): Promise<UploadDocumentResponsetModel> => {
  return await post(url("/dokumen/save_unggah_surat"), req);
};

const getDocument = async (dokumen_id: number): Promise<GetDocumentResponseModel> => {
  return await get(url("/dokumen/get_unduh_surat"), {
    id_dokumen: dokumen_id,
  });
};

const getAllUser = async (): Promise<GetAllUserResponseModel> => {
  return await get(url("/pengguna/get_all_user"));
};

const getAllKategoriArsip = async (): Promise<GetAllKategoriArsipResponseModel> => {
  return await get(url("/kategori_arsip/get_all_kategori_arsip"));
};

const saveUser = async (req: SaveUserRequestModel): Promise<SaveUserResponseModel> => {
  return await post(url("/pengguna/save_user_data"), req);
};

const updateUser = async (req: UpdateUserRequestModel): Promise<UpdateUserResponseModel> => {
  return await post(url("/pengguna/save_user_data"), req);
};

const deleteUser = async (id_pengguna: number): Promise<UpdateUserResponseModel> => {
  return await post(url("/pengguna/delete_user_data"), { id_pengguna });
};

const appRequest = {
  login,
  forgotPassword,
  getUserData,
  getAllRoles,
  getDashboard,
  getDocuments,
  saveDocumentPengajuan,
  approveDocumentPengajuan,
  uploadDocument,
  getDocument,
  getAllUser,
  getAllKategoriArsip,
  saveUser,
  updateUser,
  deleteUser,
};
export default appRequest;
