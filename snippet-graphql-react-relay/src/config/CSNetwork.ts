import { apiClient } from ".";

export default {
  get: async (url: string, header?: any, data?: any) => {
    if (header) apiClient.setHeaders(header);
    return await apiClient.get(url, data);
  },

  post: async (url: string, data: any = {}, header?: any) => {
    if (header) apiClient.setHeaders(header);
    return await apiClient.post(url, data);
  },

  patch: async (url: string, data: any, header?: any) => {
    if (header) apiClient.setHeaders(header);
    return await apiClient.patch(url, data);
  },
  put: async (url: string, data: any, header?: any) => {
    if (header) apiClient.setHeaders(header);
    return await apiClient.put(url, data);
  },

  delete: async (url: string, data: any = {}, header?: any) => {
    if (header) apiClient.setHeaders(header);
    return await apiClient.delete(url, data);
  },
};
