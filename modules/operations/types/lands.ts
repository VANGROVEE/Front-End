import { PlantingCycle } from "./cycle";

export enum ROLE {
  ADMIN = "ADMIN",
  FARMER = "FARMER",
}
export interface User {
  id: string;
  name: string;
  nickname: string;
  avatar_url?: string | null;
  phone_number: string;
  bio: string;
  address_home: string;
  role: ROLE;
  created_at: Date | string;
  lands?: Land[];
  email: string;

  //   notifications Notification[]
}


export interface Land {
  id: string;
  owner_id: string;
  name: string;
  total_area: Number;
  location?: {
    latitude: string;
    longitude: string;
    address: string;
  } | null;
  land_certificate_url?: string | null;
  created_at: Date | string;
  owner: User;
}

type DailyActivity = {
  id: string;
  activity_date: string;
  activity_type: string;
  amount: number | null;
  unit: string | null;
  notes: string | null;
  weather_data: { temp: number; condition: string } | null;
};

export type LandDetail = Land & {
  planting_cycles: PlantingCycle[];
};
