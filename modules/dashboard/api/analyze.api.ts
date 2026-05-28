import { api } from "@/lib/axios/api";
import { SpatialAnalysisResponse } from "../types/analyze.type";

const prefix = "/analyze";

export const analyzeApi = {
  getSpatial: async (): Promise<SpatialAnalysisResponse> => {
    const response = await api.get(`${prefix}/spatial`);
    return response.data.data;
  },

  /**
   * Contoh method lain jika nanti butuh analisis spesifik per lahan
   */
  getLandDetailAnalysis: async (landId: string): Promise<any> => {
    const response = await api.get(`${prefix}/land/${landId}`);
    return response.data.data;
  },
};
