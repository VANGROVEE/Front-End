import { DailyActivity } from "./activty";

export enum PlantingStatus {
  HARVESTED = "HARVESTED",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}
export interface PlantingCycle {
  id: string;
  commodity_name: string;
  variety: string | null;
  planting_method: string | null;
  start_date: string;
  estimated_harvest: string | null;
  status: PlantingStatus;
  daily_activities: DailyActivity[];
}

export interface HeatmapData {
  date: string; // Format: "YYYY-MM-DD"
  count: number;
  details: Record<string, number>;
  dominant_type: string;
}
