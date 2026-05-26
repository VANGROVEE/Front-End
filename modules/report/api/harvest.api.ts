import { api } from "@/lib/axios/api";
import {
  CreateHarvestReportDto,
  UpdateHarvestReportDto,
} from "../schema/harvestReport.schema";
import { DashboardData } from "../types/harvest";

const prefix = "/harvest-report";

export const harvestReportApi = {
  getDashboardData: async (): Promise<DashboardData> => {
    const response = await api.get(`${prefix}/dashboard`);
    return response.data.data;
  },

  findAll: async () => {
    const response = await api.get(prefix);
    return response.data.data;
  },

  findById: async (id: string) => {
    const response = await api.get(`${prefix}/${id}`);
    return response.data.data;
  },

  create: async (payload: CreateHarvestReportDto) => {
    const response = await api.post(prefix, payload);
    return response.data.data;
  },

  update: async (id: string, payload: UpdateHarvestReportDto) => {
    const response = await api.patch(`${prefix}/${id}`, payload);
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`${prefix}/${id}`);
  },
};
