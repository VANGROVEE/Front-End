import { CreateDailyActivityDto, UpdateDailyActivityDto } from "../schema/actvity.schema";
import { DailyActivity } from "../types/activty";
import { api } from "@/lib/axios/api";

const prefix = "/daily-activities";

export const dailyApi = {
  findAll: async (): Promise<DailyActivity[]> => {
    const response = await api.get(prefix);
    return response.data.data;
  },

  findById: async (id: string): Promise<DailyActivity> => {
    const response = await api.get(`${prefix}/${id}`);
    return response.data.data;
  },

  create: async (payload: CreateDailyActivityDto): Promise<DailyActivity> => {
    const response = await api.post(prefix, payload);
    return response.data.data;
  },

  update: async (id: string, payload: UpdateDailyActivityDto): Promise<DailyActivity> => {
    const response = await api.patch(`${prefix}/${id}`, payload);
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`${prefix}/${id}`);
  },

  getHeatmapCalendar: async (): Promise<any> => {
    const response = await api.get(`${prefix}/heatmap-calendar`);
    return response.data.data;
  },
};
