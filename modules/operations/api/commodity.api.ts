import { api } from "@/lib/axios/api";
import { Commodity } from "../types/commodity";

const prefix = "/commodities";

export const commodityApi = {
  findAll: async (): Promise<Commodity[]> => {
    const response = await api.get(`${prefix}`);
    return response.data.data;
  },
};
