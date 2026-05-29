import { useQuery, useQueryClient } from "@tanstack/react-query";
import { analyzeApi } from "../api/analyze.api";

export const useAnalysis = () => {
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
  });

  const commodityQuery = useQuery({
    queryKey: ["analyze", "commodity-trend"],
    queryFn: analyzeApi.getPlantingTrend,
    staleTime: 1000 * 60 * 2,
  });

  const diseaseQuery = useQuery({
    queryKey: ["analyze", "disease-trend"],
    queryFn: analyzeApi.getDiseaseTrend,
    staleTime: 1000 * 60 * 2,
  });

  const recommendationQuery = useQuery({
    queryKey: ["analyze", "latest-task"],
    queryFn: analyzeApi.getActiveRecommendations,
    staleTime: 1000 * 60 * 2,
  });

  const refetchAll = async () => {
    await Promise.all([
      spatialQuery.refetch(),
      healthQuery.refetch(),
      commodityQuery.refetch(),
      diseaseQuery.refetch(),
      recommendationQuery.refetch(),
    ]);
  };

  const invalidateAll = () => {
    queryClient.invalidateQueries({ queryKey: ["analyze"] });
  };

  return {
    isLoading:
      spatialQuery.isLoading ||
      healthQuery.isLoading ||
      commodityQuery.isLoading ||
      diseaseQuery.isLoading ||
      recommendationQuery.isLoading,
    isError:
      spatialQuery.isError ||
      healthQuery.isError ||
      commodityQuery.isError ||
      diseaseQuery.isError ||
      recommendationQuery.isError,
    isFetching:
      spatialQuery.isFetching ||
      healthQuery.isFetching ||
      commodityQuery.isFetching ||
      diseaseQuery.isFetching ||
      recommendationQuery.isFetching,

    lands: spatialQuery.data?.lands ?? [],
    summary: spatialQuery.data?.summary ?? null,
    reports: healthQuery.data ?? [],
    trends: commodityQuery.data ?? [],
    diseaseTrends: diseaseQuery.data ?? [],

    recommendation: recommendationQuery.data ?? [],

    lastSync: spatialQuery.data?.last_sync,
    refetch: refetchAll,
    invalidateAll,
  };
};
