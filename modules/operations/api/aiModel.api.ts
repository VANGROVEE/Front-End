import { api } from "@/lib/axios/api";

export interface HealthReport {
  id: string;
  cycle_id: string;
  image_url: string;
  image_key: string;
  disease_id?: string | null;
  confidence_score: number;
  gemini_insight: any;
  is_outbreak_trigger: boolean;
  created_at: string;
  disease?: {
    name: string;
  };
}

export interface CreateHealthReportDto {
  cycle_id: string;
  image_url: string;
  image_key: string;
  notes?: string;
}

const prefix = "/health-reports";

export const aiModelApi = {
  create: async (payload: CreateHealthReportDto): Promise<HealthReport> => {
    const response = await api.post(prefix, payload);
    return response.data.data;
  },
};
