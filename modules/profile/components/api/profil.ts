import { useAuthStore } from "@/common/icons/stores/use-auth-store";
import { api } from "@/lib/axios/api";
import { Land } from "@/modules/operations/types/lands";

export interface UserProfile {
  id: string;
  name: string;
  nickname: string | null;
  email: string;
  phone_number: string | null;
  avatar_url: string | null;
  bio: string | null;
  address_home: string | null;
  role: "FARMER" | "ADMIN";
  lands?: Land[];
  _count?: {
    lands: number;
  };
}

export type UpdateUserPayload = Partial<
  Omit<UserProfile, "id" | "role" | "email" | "lands" | "_count">
>;

const prefix = "/users";

const sanitizePayload = (data: UpdateUserPayload): UpdateUserPayload => {
  return Object.fromEntries(
    Object.entries(data).filter(
      ([_, value]) => value !== "" && value !== null && value !== undefined,
    ),
  );
};

export const profileApi = {
  get: async (): Promise<UserProfile> => {
    const id = useAuthStore.getState().user?.id;
    const response = await api.get(`${prefix}/${id}`);
    return response.data.data;
  },

  update: async (data: UpdateUserPayload): Promise<UserProfile> => {
    const id = useAuthStore.getState().user?.id;
    const payload = sanitizePayload(data);

    const response = await api.patch(`${prefix}/${id}`, payload);
    return response.data.data;
  },
};
