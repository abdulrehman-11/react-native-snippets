import { create } from "axios";
import { getToken } from "../utils/storage";

const apiClient = create({
  baseURL: "",
});

apiClient.addAsyncRequestTransform(async (request) => {
  const token = await getToken();

  request.headers["Authorization"] = `Bearer ${token}`;
});

export const config = async () => {
  const token = await getToken();

  return {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  };
};

export const authConfig = async (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  };
};

export default apiClient;
