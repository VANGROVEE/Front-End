import { api } from "@/lib/axios/api";
import { CreateLandDto, UpdateLandDto } from "../schema/land-schema";
import { Land, LandDetail } from "../types/lands";

const prefix = "/land";

export const landApi = {
  findAll: async (): Promise<Land[]> => {
    const response = await api.get(prefix);
    return response.data.data;
  },

  findById: async (id: string): Promise<LandDetail> => {
    const response = await api.get(`${prefix}/${id}`);
    return response.data.data;
  },

  create: async (payload: CreateLandDto): Promise<Land> => {
    const response = await api.post(prefix, payload);
    return response.data.data;
  },

  update: async (id: string, payload: UpdateLandDto): Promise<Land> => {
    const response = await api.patch(`${prefix}/${id}`, payload);
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`${prefix}/${id}`);
  },

  getSats: async (): Promise<any> => {
    const response = await api.get(`${prefix}/stats`);
    return response.data.data;
  },
};
