import { api } from "@/lib/axios/api";

const prefix = "/notifications";

export interface NotificationResponse {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  isRead: boolean;
  createdAt: string;
}

export const notificationApi = {
  getAll: async (): Promise<NotificationResponse[]> => {
    const response = await api.get(prefix);
    return response.data.data;
  },

  markAsRead: async (id: string): Promise<void> => {
    await api.patch(`${prefix}/${id}/read`);
  },

  markAllRead: async (): Promise<void> => {
    await api.patch(`${prefix}/read-all`);
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`${prefix}/${id}`);
  },

  deleteAll: async (): Promise<void> => {
    await api.delete(`${prefix}/all`);
  },
};
