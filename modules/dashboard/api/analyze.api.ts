import { api } from "@/lib/axios/api";
import {
  AiTaskRecommendation,
  HealthReport,
  SpatialAnalysisResponse,
  TrendCommidity,
  TrendDisease,
} from "../types/analyze.type";

const prefix = "/analyze";

export const analyzeApi = {
  getSpatial: async (): Promise<SpatialAnalysisResponse> => {
    const response = await api.get(`${prefix}/spatial`);
    return response.data.data;
  },
  getHealth: async (): Promise<HealthReport[]> => {
    const response = await api.get(`${prefix}/health-reports`);
    return response.data.data;
  },

  getPlantingTrend: async (): Promise<TrendCommidity[]> => {
    const response = await api.get(`${prefix}/planting-trend`);
    return response.data.data;
  },
  getDiseaseTrend: async (): Promise<TrendDisease[]> => {
    const response = await api.get(`${prefix}/planting-trend`);
    return response.data.data;
  },

  getActiveRecommendations: async (): Promise<AiTaskRecommendation[]> => {
    const response = await api.get(`${prefix}/recommendations-reports`);

    return response.data.data;
  },
};
