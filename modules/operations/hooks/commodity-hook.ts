import { useQuery } from "@tanstack/react-query";
import { commodityApi } from "../api/commodity.api";

export const useCommodities = () => {

  const commoditiesQuery = useQuery({
    queryKey: ["commodities"],
    queryFn: commodityApi.findAll,
  });

  return {
    commodities: commoditiesQuery.data,
  };
};
