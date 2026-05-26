import { Commodity } from "./commodity";
import { PlantingCycle } from "./cycle";

export interface DailyActivity {
  id: string;
  cycle_id: string;
  activity_date: string;
  activity_type: string;
  amount?: number;
  weather_data: {
    temperature: number;
    condition: string;
    humidity: number;
    wind_speed: number;
  } | null;
  unit?: string;
  notes?: string;
  commodity: Commodity;
  cycle: PlantingCycle;
}
