import { api } from "@/lib/axios/api";

export interface HealthReport {
  id: string;
  cycle_id: string;
  image_url: string;
  image_key: string;
  disease_id?: string | null;
  confidence_score: number;
  gemini_insight: {
    disease_description: string;
    causes: string;
    treatment: string[];
    prevention: string[];
    recovery: string;
    farmer_notes?: string | null;
  };
  is_outbreak_trigger: boolean;
  created_at: string;
  disease?: {
    name: string;
    scientific_name?: string;
  };
}

export interface CreateHealthReportDto {
  cycle_id: string;
  image_url: string;
  image_key: string;
  notes?: string;
}

const prefix = "/health-report";

export const healthApi = {
  findAll: async (params?: { cycle_id?: string }): Promise<HealthReport[]> => {
    const response = await api.get(prefix, { params });
    return response.data.data;
  },

  findById: async (id: string): Promise<HealthReport> => {
    const response = await api.get(`${prefix}/${id}`);
    return response.data.data;
  },

  create: async (payload: CreateHealthReportDto): Promise<HealthReport> => {
    const response = await api.post(prefix, payload);
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`${prefix}/${id}`);
  },

  getStats: async (cycle_id?: string): Promise<any> => {
    const response = await api.get(`${prefix}/stats`, { params: { cycle_id } });
    return response.data.data;
  },
};
