import { api } from "@/lib/axios/api";
import { useAuthStore } from "@/common/icons/stores/use-auth-store";

export interface UserProfile {
  name: string;
  nickname: string;
  avatar_url: string;
  phone_number: string;
  bio: string;
  address_home: string;
  fcm_token: string;
  email: string;
  role: "FARMER" | "ADMIN";
}

const prefix = "/user";
const getUserId = () => useAuthStore.getState().user?.id;

export const profileApi = {
  get: async (): Promise<UserProfile> => {
    const id = getUserId();
    const response = await api.get(`${prefix}/${id}`);
    return response.data.data;
  },

  update: async (data: Partial<UserProfile>): Promise<UserProfile> => {
    const id = getUserId();
    const response = await api.patch(`${prefix}/${id}`, data);
    return response.data.data;
  },
};
