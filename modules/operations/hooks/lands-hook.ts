import { extractErrorMessage } from "@/common/utils/error";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { landApi } from "../api/lands-api";
import { CreateLandDto, UpdateLandDto } from "../schema/land-schema";

export const useLands = (landId?: string) => {
  const queryClient = useQueryClient();

  const landsQuery = useQuery({
    queryKey: ["lands"],
    queryFn: landApi.findAll,
  });

  const landsStatisticQuery = useQuery({
    queryKey: ["lands-statistic"],
    queryFn: landApi.getSats,
  });

  const landDetailQuery = useQuery({
    queryKey: ["lands", landId],
    queryFn: () => landApi.findById(landId as string),
    enabled: !!landId,
  });

  const createMutation = useMutation({
    mutationFn: (values: CreateLandDto) => landApi.create(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lands"] });
      queryClient.invalidateQueries({ queryKey: ["lands-statistic"] });
      toast.success("Lahan berhasil ditambahkan");
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error, "Gagal menambahkan lahan"));
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, values }: { id: string; values: UpdateLandDto }) =>
      landApi.update(id, values),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["lands"] });
      queryClient.invalidateQueries({ queryKey: ["lands", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["lands-statistic"] });
      toast.success("Data lahan berhasil diperbarui");
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error, "Gagal memperbarui lahan"));
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => landApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lands"] });
      queryClient.invalidateQueries({ queryKey: ["lands-statistic"] });
      toast.success("Lahan berhasil dihapus");
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error, "Gagal menghapus lahan"));
    },
  });

  const handleCreate = async (values: CreateLandDto) => {
    return await createMutation.mutateAsync(values);
  };

  const handleUpdate = async (id: string, values: UpdateLandDto) => {
    return await updateMutation.mutateAsync({ id, values });
  };

  const handleDelete = async (id: string) => {
    return await deleteMutation.mutateAsync(id);
  };

  return {
    lands: landsQuery.data,
    landDetail: landDetailQuery.data,
    statistic: landsStatisticQuery.data,

    isLoadingLands: landsQuery.isLoading,
    isLoadingDetail: landDetailQuery.isLoading,
    isLoadingStatistic: landsStatisticQuery.isLoading,

    isSubmitting: createMutation.isPending || updateMutation.isPending,
    isDeleting: deleteMutation.isPending,

    handleCreate,
    handleUpdate,
    handleDelete,
  };
};
