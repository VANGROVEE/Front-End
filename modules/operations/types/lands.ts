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
}

export interface Land {
  id: string;
  owner_id: string;
  name: string;
  total_area: number;
  location?: {
    latitude: string;
    longitude: string;
    address: string;
  } | null;
  land_certificate_url?: string | null;
  created_at: Date | string;
  owner: User;
}

export type LandDetail = Land & {
  planting_cycles: PlantingCycle[];
};
