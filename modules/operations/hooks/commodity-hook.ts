import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { commodityApi } from "../api/commodity.api";

export const useCommodities = () => {
  const queryClient = useQueryClient();

  const commoditiesQuery = useQuery({
    queryKey: ["commodities"],
    queryFn: commodityApi.findAll,
  });

  return {
    commodities: commoditiesQuery.data,
  };
};
