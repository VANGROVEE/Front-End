import { extractErrorMessage } from "@/common/utils/error";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { aiRecommendationApi } from "../api/ai.api";

export const AI_RECO_KEYS = {
  all: ["ai-recommendations"] as const,
  history: (cycle_id?: string) =>
    [...AI_RECO_KEYS.all, "history", cycle_id] as const,
  daily: (cycle_id?: string) =>
    [...AI_RECO_KEYS.all, "daily", cycle_id] as const,
  failure: (cycle_id?: string) =>
    [...AI_RECO_KEYS.all, "failure", cycle_id] as const,
};

export const useAiRecommendation = ({
  cycle_id,
  type,
}: {
  cycle_id?: string;
  type?: string;
}) => {
  const queryClient = useQueryClient();

  const useHistory = () => {
    return useQuery({
      queryKey: AI_RECO_KEYS.history(cycle_id),
      queryFn: () => aiRecommendationApi.findAllByCycle(cycle_id!, type!),
      enabled: !!cycle_id && !!type,
      staleTime: 1000 * 60 * 15,
    });
  };

  const useDaily = () => {
    const query = useQuery({
      queryKey: AI_RECO_KEYS.daily(cycle_id),
      queryFn: () => aiRecommendationApi.getDaily(cycle_id!),
      enabled: !!cycle_id,
      retry: false,
      staleTime: 1000 * 60 * 5,
    });

    useEffect(() => {
      if (query.error) {
        toast.error(
          extractErrorMessage(query.error, "Gagal mendapatkan saran AI"),
        );
      }
    }, [query.error]);

    return query;
  };

  const useFailureAnalysis = () => {
    return useMutation({
      mutationFn: (target_cycle_id: string) =>
        aiRecommendationApi.getFailureAnalysis(target_cycle_id),
      onSuccess: (_, target_cycle_id) => {
        toast.success("Analisis kegagalan berhasil diperbarui");

        queryClient.invalidateQueries({
          queryKey: AI_RECO_KEYS.history(target_cycle_id),
        });

        queryClient.invalidateQueries({ queryKey: ["harvest-reports"] });
        queryClient.invalidateQueries({
          queryKey: ["planting-cycles", "detail", target_cycle_id],
        });
      },
      onError: (error: any) => {
        toast.error(extractErrorMessage(error, "Gagal memproses analisis AI"));
      },
    });
  };

  return {
    useHistory,
    useDaily,
    useFailureAnalysis,
  };
};
