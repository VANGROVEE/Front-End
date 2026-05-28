export interface WeatherData {
  temp: number;
  humidity: number;
  condition: string;
  rain_probability: number;
  wind_speed: number;
}

export interface SensorData {
  soil_moisture: number;
  unit: string;
  last_update: string | null;
}

export interface AnalyzedLand {
  id: string;
  name: string;
  position: [number, number];
  address: string;
  area_ha: number;
  health_status: "NORMAL" | "KRITIS" | "WARNING";
  current_commodity: string;
  sensor_data: SensorData;
  weather: WeatherData | null;
  polygon_coords: [number, number][] | null;
}

export interface DashboardSummary {
  avg_moisture: number;
  critical_lands: number;
  active_commodities: string[];
  rain_forecast_avg: number;
}

export interface SpatialAnalysisResponse {
  lands: AnalyzedLand[];
  summary: DashboardSummary;
  last_sync: string;
}

export interface GeminiInsight {
  causes: string;
  recovery: string;
  treatment: string[];
  prevention: string[];
  disease_description: string;
}

export interface HealthReport {
  id: string;
  confidence_score: number;
  gemini_insight: GeminiInsight;
  is_outbreak_trigger: boolean;
  created_at: string;
  cycle: {
    id?: string;
    commodity_name: string;
    start_date: string;
  };
  disease?: {
    name: string;
  } | null;
}

export interface LandHealthGroup {
  land_name: string;
  reports: HealthReport[];
}

export interface TrendCommidity {
  name: string;
  value: number;
}

export interface TrendDisease {
  rank: string;
  name: string;
  cases: number;
  riskLevel: string;
}

export interface AiTaskRecommendation {
  id: string;
  priority: "URGENT" | "NORMAL" | "ROUTINE";
  task: string;
  description: string;
  location: string;
  type: string;
  date: Date | string;
}

export interface AiResponseContent {
  task_title: string;
  priority: "URGENT" | "NORMAL" | "ROUTINE";
  action_steps: string;
  reasoning?: string;
}
