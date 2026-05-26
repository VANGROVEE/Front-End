import { api } from "@/lib/axios/api";
import { LoginValue, RegisterValue } from "../schemas/auth.schema";

const prefix = "/auth";
export const authApi = {
  login: async (payload: LoginValue): Promise<any> => {
    const response = await api.post(prefix + "/login", payload);
    return response.data.data;
  },
  register: async (payload: RegisterValue): Promise<any> => {
    const response = await api.post(prefix + "/register", payload);
    return response.data.data;
  },
};
