import { apiClient } from ".";

export default {
  get: async (url, header, data) => {
    if (header) apiClient.setHeaders(header);
    return await apiClient.get(url, data);
  },

  post: async (url, data, header) => {
    if (header) apiClient.setHeaders(header);
    return await apiClient.post(url, data);
  },

  patch: async (url, data, header) => {
    if (header) apiClient.setHeaders(header);
    return await apiClient.patch(url, data);
  },

  delete: async (url, data, header) => {
    if (header) apiClient.setHeaders(header);
    return await apiClient.delete(url, data);
  },
};
