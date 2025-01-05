import { getCookie, removeCookie, setCookie } from "typescript-cookie";

type appCookies = "uid";

const set = (key: appCookies, value: string | number | boolean) => setCookie(key, value);

const get = (key: appCookies) => getCookie(key);

const remove = (key: appCookies) => removeCookie(key);

const cookieService = {
  set,
  get,
  remove,
};

export default cookieService;
