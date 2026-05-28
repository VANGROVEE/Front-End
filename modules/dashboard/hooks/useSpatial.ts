import { useQuery, useQueryClient } from "@tanstack/react-query";
import { analyzeApi } from "../api/analyze.api";

export const useSpatialAnalysis = () => {
  const queryClient = useQueryClient();

  const spatialQuery = useQuery({
    queryKey: ["analyze", "spatial"],
    queryFn: () => analyzeApi.getSpatial(),

    staleTime: 1000 * 60 * 2,
    refetchInterval: 1000 * 60 * 5,
    retry: 2,
  });

  const invalidateSpatial = () => {
    queryClient.invalidateQueries({ queryKey: ["analyze", "spatial"] });
  };

  return {
    ...spatialQuery,

    lands: spatialQuery.data?.lands ?? [],
    summary: spatialQuery.data?.summary ?? null,
    lastSync: spatialQuery.data?.last_sync,
    invalidateSpatial,
  };
};
