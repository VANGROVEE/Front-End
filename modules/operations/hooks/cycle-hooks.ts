import { extractErrorMessage } from "@/common/utils/error";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { cycleApi } from "../api/cycle.api";
import {
  CreatePlantingCycleDto,
  UpdatePlantingCycleDto,
} from "../schema/cycle.schema";

export const useCycles = (cycleId?: string, landId?: string) => {
  const queryClient = useQueryClient();

  const HEATMAP_KEY = "cycles-heatmap-calendar";
  const CYCLES_KEY = "cycles";
  const LANDS_KEY = "lands";
  const LAND_DETAIL_KEY = "land-detail";

  const cyclesQuery = useQuery({
    queryKey: [CYCLES_KEY],
    queryFn: cycleApi.findAll,
  });

  const heatmapCalendarQuery = useQuery({
    queryKey: [HEATMAP_KEY, cycleId],
    queryFn: () => cycleApi.getHeatmapCalendar(cycleId),
    enabled: true,
  });

  const cycleDetailQuery = useQuery({
    queryKey: [CYCLES_KEY, cycleId],
    queryFn: () => cycleApi.findById(cycleId as string),
    enabled: !!cycleId,
  });

  const refreshAllData = async (
    targetCycleId?: string,
    targetLandId?: string,
  ) => {
    const promises = [
      queryClient.invalidateQueries({ queryKey: [CYCLES_KEY] }),
      queryClient.invalidateQueries({ queryKey: [HEATMAP_KEY] }),
      queryClient.invalidateQueries({ queryKey: [LANDS_KEY] }),
    ];

    if (targetCycleId) {
      promises.push(
        queryClient.invalidateQueries({
          queryKey: [CYCLES_KEY, targetCycleId],
        }),
      );
    }

    if (targetLandId || landId) {
      promises.push(
        queryClient.invalidateQueries({
          queryKey: [LAND_DETAIL_KEY, targetLandId || landId],
        }),
      );
    }

    await Promise.all(promises);
  };

  const createMutation = useMutation({
    mutationFn: (values: CreatePlantingCycleDto) => cycleApi.create(values),
    onSuccess: async (_, variables) => {
      await refreshAllData(undefined, variables.land_id);
      toast.success("Siklus tanam berhasil ditambahkan");
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error, "Gagal menghapus siklus"));
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      values,
    }: {
      id: string;
      values: UpdatePlantingCycleDto;
    }) => cycleApi.update(id, values),
    onSuccess: async (_, variables) => {
      await refreshAllData(variables.id, variables.values.land_id);
      toast.success("Siklus tanam berhasil diperbarui");
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error, "Gagal memperbarui siklus tanam"));
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => cycleApi.delete(id),
    onSuccess: async () => {
      await refreshAllData();
      toast.success("Siklus tanam berhasil dihapus");
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error, "Gagal memperbarui siklus tanam"));
    },
  });

  return {
    cycles: cyclesQuery.data,
    cycleDetail: cycleDetailQuery.data,
    heatmapCalendar: heatmapCalendarQuery.data,
    isLoading: cyclesQuery.isLoading || cycleDetailQuery.isLoading,
    isSubmitting: createMutation.isPending || updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    handleCreate: (v: CreatePlantingCycleDto) => createMutation.mutateAsync(v),
    handleUpdate: (id: string, v: UpdatePlantingCycleDto) =>
      updateMutation.mutateAsync({ id, values: v }),
    handleDelete: (id: string) => deleteMutation.mutateAsync(id),
  };
};
