"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { aiModelApi } from "../api/aiModel.api";
import { healthApi } from "../api/health.api";
import { extractErrorMessage } from "@/common/utils/error";

export const useHealth = (cycleId?: string) => {
  const queryClient = useQueryClient();

  const healthQuery = useQuery({
    queryKey: ["health-reports", cycleId],
    queryFn: () => healthApi.findAll({ cycle_id: cycleId }),
    enabled: !!cycleId,
  });

  const predictMutation = useMutation({
    mutationFn: async (imageUrl: string) => {
      return await aiModelApi.predictOnly(imageUrl);
    },
    onMutate: () => {
      return toast.loading("Vangrove AI sedang menganalisis foto...");
    },
    onSuccess: (data, _, toastId) => {
      toast.success("Analisis AI Selesai", {
        id: toastId,
        description: "Diagnosa berhasil dihasilkan.",
      });
      return data;
    },
    onError: (error, _, toastId) => {
      const message = extractErrorMessage(error, "AI gagal mengenali gambar.");
      toast.error("Gagal Analisis", {
        id: toastId,
        description: message,
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => healthApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["health-reports", cycleId] });
      toast.success("Laporan rekam medis dihapus");
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error, "Gagal menghapus laporan"));
    },
  });

  return {
    predictPlantHealth: predictMutation.mutateAsync,
    isPredicting: predictMutation.isPending,
    predictionData: predictMutation.data,

    healthReports: healthQuery.data,
    isLoadingReports: healthQuery.isLoading,
    refetchReports: healthQuery.refetch,

    handleDelete: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
};
