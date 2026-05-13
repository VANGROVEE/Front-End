import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { cycleApi } from "../api/cycle.api";
import {
  CreatePlantingCycleDto,
  UpdatePlantingCycleDto,
} from "../schema/cycle.schema";

export const useCycles = (cycleId?: string) => {
  const queryClient = useQueryClient();

  const HEATMAP_KEY = ["cycles-heatmap-calendar"];
  const CYCLES_KEY = ["cycles"];
  const LANDS_KEY = ["lands"];

  const cyclesQuery = useQuery({
    queryKey: CYCLES_KEY,
    queryFn: cycleApi.findAll,
  });

  const heatmapCalendarQuery = useQuery({
    queryKey: [HEATMAP_KEY, cycleId],
    queryFn: () => cycleApi.getHeatmapCalendar(cycleId),
    staleTime: 0,
  });

  const cycleDetailQuery = useQuery({
    queryKey: ["cycles", cycleId],
    queryFn: () => cycleApi.findById(cycleId as string),
    enabled: !!cycleId,
  });

  const refreshAllData = async (targetCycleId?: string) => {
    const promises = [
      queryClient.invalidateQueries({ queryKey: CYCLES_KEY }),
      queryClient.invalidateQueries({ queryKey: HEATMAP_KEY }),
      queryClient.invalidateQueries({ queryKey: LANDS_KEY }),
    ];

    if (targetCycleId) {
      promises.push(
        queryClient.invalidateQueries({ queryKey: ["cycles", targetCycleId] }),
      );
    }

    await Promise.all(promises);
  };

  const createMutation = useMutation({
    mutationFn: (values: CreatePlantingCycleDto) => cycleApi.create(values),
    onSuccess: async () => {
      await refreshAllData();
      toast.success("Siklus tanam berhasil ditambahkan");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Gagal menambahkan siklus tanam",
      );
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
      await refreshAllData(variables.id);
      toast.success("Siklus tanam berhasil diperbarui");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Gagal memperbarui siklus tanam",
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => cycleApi.delete(id),
    onSuccess: async () => {
      await refreshAllData();
      toast.success("Siklus tanam berhasil dihapus");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Gagal menghapus siklus tanam",
      );
    },
  });

  const handleCreate = async (values: CreatePlantingCycleDto) => {
    return await createMutation.mutateAsync(values);
  };

  const handleUpdate = async (id: string, values: UpdatePlantingCycleDto) => {
    return await updateMutation.mutateAsync({ id, values });
  };

  const handleDelete = async (id: string) => {
    return await deleteMutation.mutateAsync(id);
  };

  return {
    cycles: cyclesQuery.data,
    cycleDetail: cycleDetailQuery.data,
    heatmapCalendar: heatmapCalendarQuery.data,

    isLoadingCycles: cyclesQuery.isLoading,
    isLoadingDetail: cycleDetailQuery.isLoading,
    isLoadingHeatmap: heatmapCalendarQuery.isLoading,

    isSubmitting: createMutation.isPending || updateMutation.isPending,
    isDeleting: deleteMutation.isPending,

    handleCreate,
    handleUpdate,
    handleDelete,
  };
};
