// --- MOCK DATA ---

import { PlantingCycle, PlantingStatus } from "../types/cycle";
import { Land, User } from "../types/lands";

const mockOwner: User = {
  id: "USR-001",
  name: "Yudriqul Aulia",
  email: "admin@vangrove.com",
};

export const dummyLands: Land[] = [
  {
    id: "L1",
    owner_id: mockOwner.id,
    name: "Plot A - North Field",
    total_area: 2.5,
    location: {
      latitude: "-1.6115",
      longitude: "103.5784",
      address: "Kawasan Vangrove Utama",
    },
    land_certificate_url: "https://example.com/cert/L1.pdf",
    created_at: "2023-10-10T08:00:00Z",
    owner: mockOwner,
  },
  {
    id: "L2",
    owner_id: mockOwner.id,
    name: "Plot B - West Field",
    total_area: 1.2,
    location: null, // Boleh null sesuai interface
    land_certificate_url: null,
    created_at: "2023-12-05T09:30:00Z",
    owner: mockOwner,
  },
];

export const dummyCycles: PlantingCycle[] = [
  {
    id: "CYCLE-001",
    land_id: "L1",
    commodity_name: "Honeycrisp Apple",
    variety: "Malus domestica",
    planting_method: "Trellis System",
    start_date: "2024-01-15",
    estimated_harvest: "2024-08-20",
    status: PlantingStatus.HARVESTED,
    daily_activities: [
      {
        id: "ACT-101",
        cycle_id: "CYCLE-001",
        activity_date: "2024-05-12T08:00:00Z",
        activity_type: "WATERING",
        amount: 50,
        unit: "L",
        notes: "Irigasi pagi menggunakan sistem tetes otomatis.",
        weather_data: {
          temperature: 28,
          condition: "Sunny",
          humidity: 65,
          wind_speed: 12,
        },
      },
      {
        id: "ACT-102",
        cycle_id: "CYCLE-001",
        activity_date: "2024-05-11T16:30:00Z",
        activity_type: "FERTILIZING",
        amount: 5,
        unit: "Kg",
        notes: "Pemberian pupuk NPK cair pada akar.",
        weather_data: {
          temperature: 30,
          condition: "Cloudy",
          humidity: 70,
          wind_speed: 8,
        },
      },
    ],
  },
  {
    id: "CYCLE-002",
    land_id: "L2",
    commodity_name: "Summer Cherry",
    variety: "Prunus avium",
    planting_method: "Standard Plot",
    start_date: "2024-02-10",
    estimated_harvest: "2024-06-15",
    status: PlantingStatus.HARVESTED,
    daily_activities: [],
  },
  {
    id: "CYCLE-003",
    land_id: "L1",
    commodity_name: "Jeruk Mandarin",
    variety: "Citrus reticulata",
    planting_method: "Konvensional",
    start_date: "2024-03-01",
    estimated_harvest: "2024-09-10",
    status: PlantingStatus.HARVESTED,
    daily_activities: [],
  },
];
