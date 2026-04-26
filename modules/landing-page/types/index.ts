// modules/landing-page/types/index.ts
import { LucideIcon } from "lucide-react";

export interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export interface Disease {
  img: string;
  name: string;
  scientific: string;
  score: number;
  treatment: string;
}
