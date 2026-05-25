import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { dailyApi } from "../api/daily.api";
import {
  CreateDailyActivityDto,
  UpdateDailyActivityDto,
} from "../schema/actvity.schema";

export const useDaily = (activityId?: string) => {
  const queryClient = useQueryClient();

  const activitiesQuery = useQuery({
    queryKey: ["daily-activities"],
    queryFn: dailyApi.findAll,
  });

  const activityDetailQuery = useQuery({
    queryKey: ["daily-activities", activityId],
    queryFn: () => dailyApi.findById(activityId as string),
    enabled: !!activityId,
  });

  const createMutation = useMutation({
    mutationFn: (values: CreateDailyActivityDto) => dailyApi.create(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["daily-activities"] });
      queryClient.invalidateQueries({ queryKey: ["cycles"] });
      queryClient.invalidateQueries({ queryKey: ["lands"] });

      toast.success("Aktivitas harian berhasil dicatat");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Gagal mencatat aktivitas harian",
      );
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      values,
    }: {
      id: string;
      values: UpdateDailyActivityDto;
    }) => dailyApi.update(id, values),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["daily-activities"] });
      queryClient.invalidateQueries({
        queryKey: ["daily-activities", variables.id],
      });

      queryClient.invalidateQueries({ queryKey: ["cycles"] });
      queryClient.invalidateQueries({ queryKey: ["lands"] });

      toast.success("Aktivitas harian berhasil diperbarui");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Gagal memperbarui aktivitas harian",
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => dailyApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["daily-activities"] });
      queryClient.invalidateQueries({ queryKey: ["cycles"] });
      queryClient.invalidateQueries({ queryKey: ["lands"] });

      toast.success("Aktivitas harian berhasil dihapus");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Gagal menghapus aktivitas harian",
      );
    },
  });

  const handleCreate = async (values: CreateDailyActivityDto) => {
    return await createMutation.mutateAsync(values);
  };

  const handleUpdate = async (id: string, values: UpdateDailyActivityDto) => {
    return await updateMutation.mutateAsync({ id, values });
  };

  const handleDelete = async (id: string) => {
    return await deleteMutation.mutateAsync(id);
  };

  return {
    activities: activitiesQuery.data,
    activityDetail: activityDetailQuery.data,

    isLoadingActivities: activitiesQuery.isLoading,
    isLoadingDetail: activityDetailQuery.isLoading,

    isSubmitting: createMutation.isPending || updateMutation.isPending,
    isDeleting: deleteMutation.isPending,

    handleCreate,
    handleUpdate,
    handleDelete,
  };
};
