"use client";

import { extractErrorMessage } from "@/common/utils/error";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { dailyApi } from "../api/daily.api";
import {
  CreateDailyActivityDto,
  UpdateDailyActivityDto,
} from "../schema/actvity.schema";

export const useDaily = ({
  activityId,
  cycle_id,
}: { activityId?: string; cycle_id?: string } = {}) => {
  const queryClient = useQueryClient();

  const activitiesQuery = useQuery({
    queryKey: ["daily-activities", "list", { cycle_id }],
    queryFn: () => dailyApi.findAll({ cycle_id }),
    staleTime: 5 * 60 * 1000,
    enabled: !!cycle_id,
  });

  const activityDetailQuery = useQuery({
    queryKey: ["daily-activities", "detail", activityId],
    queryFn: () => dailyApi.findById(activityId as string),
    enabled: !!activityId,
  });

  const invalidateAllRelatedQueries = async (_id?: string) => {
    await queryClient.invalidateQueries({
      queryKey: ["daily-activities"],
      exact: false,
    });

    const otherKeys = [
      "planting-cycle",
      "land",
      "analytics",
      "health-reports",
      "harvest-reports",
    ];

    await Promise.all(
      otherKeys.map((key) =>
        queryClient.invalidateQueries({
          queryKey: [key],
          exact: false,
          refetchType: "all",
        }),
      ),
    );
  };

  const createMutation = useMutation({
    mutationFn: (values: CreateDailyActivityDto) => dailyApi.create(values),
    onSuccess: async () => {
      await invalidateAllRelatedQueries();
      toast.success("Aktivitas harian berhasil dicatat");
    },
    onError: (error) => {
      toast.error(
        extractErrorMessage(error, "Gagal mencatat aktivitas harian"),
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
    onSuccess: async (_, variables) => {
      await invalidateAllRelatedQueries(variables.id);
      toast.success("Aktivitas harian berhasil diperbarui");
    },
    onError: (error) => {
      toast.error(
        extractErrorMessage(error, "Gagal memperbarui aktivitas harian"),
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => dailyApi.delete(id),
    onSuccess: async () => {
      await invalidateAllRelatedQueries();
      toast.success("Aktivitas harian berhasil dihapus");
    },
    onError: (error) => {
      toast.error(
        extractErrorMessage(error, "Gagal menghapus aktivitas harian"),
      );
    },
  });

  return {
    activities: activitiesQuery.data,
    activityDetail: activityDetailQuery.data,
    isLoadingActivities: activitiesQuery.isLoading,
    isLoadingDetail: activityDetailQuery.isLoading,
    isRefetching: activitiesQuery.isRefetching,
    isSubmitting: createMutation.isPending || updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    handleCreate: (values: CreateDailyActivityDto) =>
      createMutation.mutateAsync(values),
    handleUpdate: (id: string, values: UpdateDailyActivityDto) =>
      updateMutation.mutateAsync({ id, values }),
    handleDelete: (id: string) => deleteMutation.mutateAsync(id),
    refresh: () => activitiesQuery.refetch(),
  };
};
