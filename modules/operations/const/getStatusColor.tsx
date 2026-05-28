import { PlantingStatus } from "../types/cycle";

export const getStatusColor = (status: PlantingStatus) => {
  switch (status) {
    case PlantingStatus.HARVESTED:
      return "bg-green-50 text-green-600 border-green-200";
    case PlantingStatus.COMPLETED:
      return "bg-blue-50 text-blue-600 border-blue-200";
    case PlantingStatus.FAILED:
      return "bg-red-50 text-red-600 border-red-200";
    default:
      return "bg-slate-50 text-slate-600 border-slate-200";
  }
};
