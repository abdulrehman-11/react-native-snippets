import { create } from "apisauce";
import { getLanguage, getToken } from "../utils/storage";

const apiClient = create({
  baseURL: "https://coupons.thesinella.com/api/",
});

apiClient.addAsyncRequestTransform(async (request: any) => {
  const token = await getToken();
  const lang = await getLanguage();

  request.headers["Authorization"] = `Bearer ${token}`;
  request.headers["Accept-Language"] = !lang
    ? "jp"
    : lang === "jp"
    ? "jp"
    : "en";
});

export const config = async () => {
  const token = await getToken();
  const lang = await getLanguage();

  return {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Accept-Language": !lang ? "en" : lang === "jp" ? "jp" : "en",
    },
  };
};

export const urlEncodedConfig = async () => {
  const lang = await getLanguage();

  return {
    headers: {
      Accept: "application/x-www-form-urlencoded",
      "Accept-Language": !lang ? "en" : lang === "jp" ? "jp" : "en",
    },
  };
};

export const authConfig = async (token: string) => {
  console.log({ token });
  const lang = await getLanguage();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Accept-Language": !lang ? "en" : lang === "jp" ? "jp" : "en",
    },
  };
};

export default apiClient;
