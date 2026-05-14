import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner"; 
import { CreateHealthReportDto, healthApi } from "../api/health.api";

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

  
  const { mutateAsync: handleCreate, isPending: isSubmitting } = useMutation({
    mutationFn: (payload: CreateHealthReportDto) => healthApi.create(payload),
    onSuccess: (data) => {
      
      queryClient.invalidateQueries({ queryKey: ["health-reports", cycleId] });
      queryClient.invalidateQueries({ queryKey: ["lands"] });

      
      if (data.disease_id) {
        toast.error(`Terdeteksi: ${data.disease?.name || "Penyakit"}`, {
          description: "AI menemukan masalah pada tanaman Anda. Cek saran penanganan.",
        });
      } else {
        toast.success("Analisis Selesai: Tanaman Sehat!", {
          description: "Pertahankan kondisi ini dengan perawatan rutin.",
        });
      }
    },
    onError: (error: any) => {
      const errorMsg = error.response?.data?.message || "Gagal melakukan analisis AI.";
      toast.error("Gagal Analisis", {
        description: errorMsg,
      });
    },
  });

  
  const { mutateAsync: handleDelete } = useMutation({
    mutationFn: (id: string) => healthApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["health-reports", cycleId] });
      toast.success("Laporan berhasil dihapus");
    },
  });

  return {
    healthReports,
    isLoadingReports,
    handleCreate,
    isSubmitting,
    handleDelete,
    refetchReports,
  };
};