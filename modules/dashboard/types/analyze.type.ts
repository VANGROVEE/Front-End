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
