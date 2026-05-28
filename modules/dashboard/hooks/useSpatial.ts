import { useQuery, useQueryClient } from "@tanstack/react-query";
import { analyzeApi } from "../api/analyze.api";

export const useSpatialAnalysis = () => {
  const queryClient = useQueryClient();

  const spatialQuery = useQuery({
    queryKey: ["analyze", "spatial"],
    queryFn: analyzeApi.getSpatial,
    staleTime: 1000 * 60 * 2,
    refetchInterval: 1000 * 60 * 5,
  });

  const healthQuery = useQuery({
    queryKey: ["analyze", "health"],
    queryFn: analyzeApi.getHealth,
    staleTime: 1000 * 60 * 2,

    enabled: !!spatialQuery.data,
  });

  const refetchAll = async () => {
    await Promise.all([spatialQuery.refetch(), healthQuery.refetch()]);
  };

  const invalidateAll = () => {
    queryClient.invalidateQueries({ queryKey: ["analyze"] });
  };

  return {
    isLoading: spatialQuery.isLoading || healthQuery.isLoading,
    isError: spatialQuery.isError || healthQuery.isError,
    isFetching: spatialQuery.isFetching || healthQuery.isFetching,

    lands: spatialQuery.data?.lands ?? [],
    summary: spatialQuery.data?.summary ?? null,

    reports: healthQuery.data ?? [],

    lastSync: spatialQuery.data?.last_sync,
    refetch: refetchAll,
    invalidateAll,
  };
};
