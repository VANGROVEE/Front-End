import { api } from "@/lib/axios/api";
import {
  CreatePlantingCycleDto,
  UpdatePlantingCycleDto,
} from "../schema/cycle.schema";
import { CycleSummary, HeatmapData, PlantingCycle } from "../types/cycle";

const prefix = "/planting-cycle";

export const cycleApi = {
  findAll: async (): Promise<PlantingCycle[]> => {
    const response = await api.get(prefix);
    return response.data.data;
  },
  getSummary: async (cycleId: string): Promise<CycleSummary> => {
    const response = await api.get(`${prefix}/cycle-summary`, {
      params: { cycle_id: cycleId },
    });
    return response.data.data;
  },

  findById: async (id: string): Promise<PlantingCycle> => {
    const response = await api.get(`${prefix}/${id}`);
    return response.data.data;
  },

  create: async (payload: CreatePlantingCycleDto): Promise<PlantingCycle> => {
    const response = await api.post(prefix, payload);
    return response.data.data;
  },

  update: async (
    id: string,
    payload: UpdatePlantingCycleDto,
  ): Promise<PlantingCycle> => {
    const response = await api.patch(`${prefix}/${id}`, payload);
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`${prefix}/${id}`);
  },

  getHeatmapCalendar: async (cycleId?: string): Promise<HeatmapData[]> => {
    const response = await api.get(`${prefix}/heatmap-calendar`, {
      params: { cycle_id: cycleId },
    });
    return response.data.data;
  },
};
