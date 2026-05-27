import { extractErrorMessage } from "@/common/utils/error";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiError } from "next/dist/server/api-utils";
import { useEffect } from "react";
import { toast } from "sonner";
import { aiRecommendationApi } from "../api/ai.api";

export const useAiRecommendation = ({
  cycle_id,
  type,
}: {
  cycle_id?: string;
  type: string;
}) => {
  const queryClient = useQueryClient();

  const useHistory = () => {
    return useQuery({
      queryKey: ["ai-recommendations", "history", cycle_id],
      queryFn: () => aiRecommendationApi.findAllByCycle(cycle_id!, type),
      enabled: !!cycle_id,
      staleTime: 1000 * 60 * 5,
    });
  };

  const useDaily = () => {
    const query = useQuery({
      queryKey: ["ai-recommendations", "daily", cycle_id],
      queryFn: () => aiRecommendationApi.getDaily(cycle_id!),
      enabled: !!cycle_id,
      retry: false,
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
      mutationFn: (cycle_id: string) =>
        aiRecommendationApi.getFailureAnalysis(cycle_id),
      onSuccess: () => {
        toast.success("Analisis kegagalan berhasil diperbarui");

        queryClient.invalidateQueries({
          queryKey: ["ai-recommendations", "history", cycle_id],
        });
      },
      onError: (error: ApiError) => {
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
