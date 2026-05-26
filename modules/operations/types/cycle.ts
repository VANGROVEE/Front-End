import { DailyActivity } from "./activty";
import { Commodity } from "./commodity";

export enum PlantingStatus {
  PLANTING = "PLANTING",
  HARVESTED = "HARVESTED",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export interface Disease {
  id: string;
  name: string;
  scientific_name?: string;
  description?: string;
}

export interface PlantingCycle {
  id: string;
  land_id: string;
  commodity: Commodity;
  variety: string | null;
  planting_method: string | null;
  start_date: string;
  estimated_harvest: string | null;
  status: PlantingStatus;
  daily_activities: DailyActivity[];
  created_at: string;
  updated_at: string;
}

export interface HeatmapData {
  date: string;
  count: number;
  details: Record<string, number>;
  dominant_type: string;
}
