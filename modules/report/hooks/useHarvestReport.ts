import { useQuery } from "@tanstack/react-query";
import { harvestReportApi } from "../api/harvest.api";

export const useHarvestDashboard = () => {
  return useQuery({
    queryKey: ["harvest-dashboard"],
    queryFn: () => harvestReportApi.getDashboardData(),
    });
};
