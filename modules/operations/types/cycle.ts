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

export interface CycleSummary {
  id: string;
  status: string;
  commodity_name: string;
  land_name: string;
  duration_days: number;
  total_activities: number;
  total_health_issues: number;
  resources: {
    water_used_liter: number;
    fertilizer_used_kg: number;
  };
  harvest: {
    id: string;
    cycle_id: string;
    total_yield_kg: number;
    ai_quality_metrics: any | null;
    quality_grade: string;
    image_proof_url: string;
    price_sold_per_kg: number | null;
    created_at: string;
  } | null;
}