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

export interface AiRawResult {
  disease_name: string;
  confidence_score: number;
  is_dangerous: boolean;
  insight: {
    disease_description: string;
    causes: string;
    treatment: string[];
    prevention: string[];
    recovery: string;
  };
}

const prefix = "/ml-model";

export const aiModelApi = {
  create: async (payload: CreateHealthReportDto): Promise<HealthReport> => {
    const response = await api.post(prefix, payload);
    return response.data.data;
  },

  predictOnly: async (imageUrl: string): Promise<AiRawResult> => {
    const response = await api.post(`${prefix}/predict-only`, {
      image_url: imageUrl,
    });
    return response.data.data;
  },
};
