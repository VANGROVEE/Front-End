import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CreateHealthReportDto, healthApi } from "../api/health.api";
import { aiModelApi } from "../api/aiModel.api";

export const useHealth = (cycleId?: string) => {
  const queryClient = useQueryClient();

  const {
    data: healthReports,
    isLoading: isLoadingReports,
    refetch: refetchReports,
  } = useQuery({
    queryKey: ["health-reports", cycleId],
    queryFn: () => healthApi.findAll({ cycle_id: cycleId }),
    enabled: !!cycleId,
  });

  const predictMutation = useMutation({
    mutationFn: async (imageUrl: string) => {
      const toastId = toast.loading("AI sedang menganalisis foto...");
      try {
        const response = await aiModelApi.predictOnly(imageUrl);
        toast.dismiss(toastId);
        return response;
      } catch (error: any) {
        toast.dismiss(toastId);
        const msg =
          error.response?.data?.message || "AI gagal mengenali gambar.";
        toast.error("Gagal Analisis", { description: msg });
        throw error;
      }
    },
  });

  const { mutateAsync: handleDelete } = useMutation({
    mutationFn: (id: string) => healthApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["health-reports", cycleId] });
      toast.success("Laporan rekam medis dihapus");
    },
  });

  return {
    predictPlantHealth: predictMutation.mutateAsync,
    isPredicting: predictMutation.isPending,

    healthReports,
    isLoadingReports,
    refetchReports,

    handleDelete,
  };
};
