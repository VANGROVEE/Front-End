import { Commodity } from "@/modules/operations/types/commodity";
import { PlantingStatus } from "@/modules/operations/types/cycle";

export interface Stats {
  total_yield_kg: string;
  harvest_count: string;
  success_rate: string;
}

export interface HistoryCycle {
  id: string;
  land_id: string;
  commodity_id: string;
  variety: string;
  planting_method: string;
  start_date: string;
  estimated_harvest: string | null;
  status: PlantingStatus;
  commodity: Commodity;
}

export interface HarvestHistory {
  id: string;
  cycle_id: string;
  total_yield_kg: number;
  ai_quality_metrics: Record<string, unknown> | null;
  quality_grade: string;
  image_proof_url: string;
  price_sold_per_kg: number | null;
  created_at: string;
  cycle: HistoryCycle;
}

export interface DashboardCycle {
  id: string;
  status: PlantingStatus;
  variety: string;
  start_date: string;
  end_date: string | null;
  commodity: Commodity;
  activity_count: number;
  total_yield: string;
  ai_explanation: string | null;
}

export interface DashboardData {
  stats: Stats;
  history: HarvestHistory[];
  cycles: DashboardCycle[];
}

export interface HarvestDashboardResponse {
  success: boolean;
  message: string;
  data: DashboardData;
}
