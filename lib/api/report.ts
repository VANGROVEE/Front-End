import { api } from "@/lib/axios/api";
import { Commodity } from "@/modules/operations/types/commodity";

export interface PlantingCycle {
  id: string;
  commodity: Commodity;
  variety: string | null;
  planting_method: string | null;
  start_date: string;
  estimated_harvest: string | null;
  status: "PLANTING" | "HARVESTED" | "COMPLETED" | "FAILED";
  land_id: string;
}

export interface DailyActivity {
  id: string;
  cycle_id: string;
  activity_date: string;
  activity_type: string;
  amount: number | null;
  unit: string | null;
  notes: string | null;
  weather_data: {
    condition?: string;
    temperature?: number;
    humidity?: number;
    wind_speed?: number;
  } | null;
}

export const reportApi = {
  getPlantingCycles: async (): Promise<PlantingCycle[]> => {
    const response = await api.get("/planting-cycle");
    return response.data.data;
  },

  getDailyActivities: async (): Promise<DailyActivity[]> => {
    const response = await api.get("/daily-activities");
    return response.data.data;
  },
};
