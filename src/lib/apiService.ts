import configService from "./configService";
import logService from "./logService";
import axios, { AxiosResponse } from "axios";

const baseRequest = async <T>(axiosRequest: () => Promise<AxiosResponse<T>>): Promise<T> => {
  let response: AxiosResponse;
  let data: T;

  try {
    response = await axiosRequest();

    data = response.data;
  } catch (e) {
    logService.log(e);

    throw Error("Something went wrong");
  }

  return data!;
};

const post = async <T>(url: string, body: Record<string, unknown>): Promise<T> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return baseRequest(() =>
    axios.post(url, body, {
      // auth: {
      //   username: "admin",
      //   password: "admin123",
      // },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "1",
      },
    })
  );
};

const postFormData = async <T>(
  url: string,
  body: Record<string, unknown>,
  files: Record<string, File | Blob>
): Promise<T> => {
  return baseRequest(() => {
    const formData = new FormData();

    [...Object.entries(body), ...Object.entries(files)].forEach(([key, value]) =>
      formData.append(key, value as string | Blob)
    );

    return axios.post(url, formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        "ngrok-skip-browser-warning": "1",
      },
    });
  });
};

const get = async <T>(url: string, queryParams?: Record<string, string | number | boolean>): Promise<T> => {
  return baseRequest(() =>
    axios.get(url, {
      params: queryParams,
      // auth: {
      //   username: "admin",
      //   password: "admin123",
      // },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "1",
      },
    })
  );
};

const url = (path: string) => {
  const domain = configService.get().API_URL;
  // const domain = '/api';

  return `${domain}${path}`;
};

export { post, postFormData, get, url };
