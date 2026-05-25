import { api } from "@/lib/axios/api";
import { useAuthStore } from "@/common/icons/stores/use-auth-store";
import { createClient } from "@/lib/supabase/client";

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

export type UpdateUserPayload = {
  name?: string;
  nickname?: string;
  avatar_url?: string;
  phone_number?: string;
  bio?: string;
  address_home?: string;
  fcm_token?: string;
};

const prefix = "/users";
const getUserId = () => useAuthStore.getState().user?.id;

const getFreshToken = async (): Promise<string | null> => {
  const supabase = createClient();
  const { data } = await supabase.auth.refreshSession();
  return data.session?.access_token ?? null;
};

const sanitizePayload = (data: Partial<UserProfile>): UpdateUserPayload => {
  const payload: UpdateUserPayload = {};
  if (data.name && data.name.trim() !== "") payload.name = data.name;
  if (data.nickname && data.nickname.trim() !== "")
    payload.nickname = data.nickname;
  if (data.bio && data.bio.trim() !== "") payload.bio = data.bio;
  if (data.address_home && data.address_home.trim() !== "")
    payload.address_home = data.address_home;
  if (data.fcm_token && data.fcm_token.trim() !== "")
    payload.fcm_token = data.fcm_token;
  if (data.phone_number && data.phone_number.trim().length >= 10)
    payload.phone_number = data.phone_number;
  if (data.avatar_url && data.avatar_url.trim() !== "")
    payload.avatar_url = data.avatar_url;
  return payload;
};

export const profileApi = {
  get: async (): Promise<UserProfile> => {
    const id = getUserId();
    const token = await getFreshToken();
    console.log("FRESH TOKEN:", token ? "ada" : "kosong");
    const response = await api.get(`${prefix}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("GET PROFILE:", response.data);
    return response.data.data;
  },

  update: async (data: Partial<UserProfile>): Promise<UserProfile> => {
    const id = getUserId();
    const token = await getFreshToken();
    const payload = sanitizePayload(data);
    console.log("UPDATE PAYLOAD:", payload);
    const response = await api.patch(`${prefix}/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("UPDATE RESPONSE:", response.data);
    return response.data.data;
  },
};
