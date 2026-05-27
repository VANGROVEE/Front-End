import { api } from "@/lib/axios/api";

// -- Types ----------------------------------------------------

export interface AiRecommendation {
  cycle_id: string;
  cycle_cycle_id: string;
  recommendation_date: string;
  type: "DAILY" | "FAILURE_ANALYSIS";
  ai_response: {
    status_lingkungan_dan_kesehatan: string;
    rekomendasi_penyiraman: {
      status: string;
      volume_liter: number;
      estimasi_hemat_kwh: number;
    };
    rekomendasi_pemupukan: {
      status: string;
      alasan: string;
    };
    pesan_petani: string;
    // Fields untuk Failure Analysis
    analisis_kegagalan?: string;
    faktor_dominan?: string;
    skor_kelalaian_manusia?: number;
    rekomendasi_perbaikan_masa_depan?: string[];
  };
  context_used: any;
  created_at: string;
}

const prefix = "/ai-recommendation";

export const aiRecommendationApi = {
  findAllByCycle: async (
    cycle_id: string,
    type: string,
  ): Promise<AiRecommendation[]> => {
    const response = await api.get(prefix, {
      params: { cycle_id: cycle_id, type },
    });
    return response.data.data;
  },

  getDaily: async (cycle_id: string): Promise<AiRecommendation> => {
    const response = await api.get(
      `${prefix}/daily-recommendation/${cycle_id}`,
    );
    return response.data.data;
  },

  getFailureAnalysis: async (cycle_id: string): Promise<AiRecommendation> => {
    const response = await api.get(
      `${prefix}/analyze-crop-failure/${cycle_id}`,
    );
    return response.data.data;
  },
};
