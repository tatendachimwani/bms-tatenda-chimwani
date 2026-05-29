import api from "./api";

export const http = {
  get: <T>(url: string) => api.get<T>(url).then(res => res.data),

  post: <T>(url: string, body: unknown) =>
    api.post<T>(url, body).then(res => res.data),

  patch: <T>(url: string, body?: unknown) =>
    api.patch<T>(url, body).then(res => res.data),

  delete: <T>(url: string) =>
    api.delete<T>(url).then(res => res.data),
};