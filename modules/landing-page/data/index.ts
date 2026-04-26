import { FastForward, Award, Sprout, ShieldCheck } from "lucide-react";
import { Feature, Disease } from "../types";

export const features: Feature[] = [
  {
    icon: FastForward,
    title: "Analisis Cepat",
    desc: "Waktu diagnosis AI < 3 detik.",
  },
  {
    icon: Award,
    title: "Kualitas Premium",
    desc: "Validasi Gemini AI 95% Akurat.",
  },
  {
    icon: Sprout,
    title: "Eco-Farming",
    desc: "Rekomendasi metode berkelanjutan.",
  },
  {
    icon: ShieldCheck,
    title: "Lahan Terdata",
    desc: "Sertifikasi & Kordinat Digital.",
  },
];

export const diseaseSpotlight: Disease[] = [
  {
    img: "/daun-bercak.jpg",
    name: "Bercak Daun",
    scientific: "Cercospora spp.",
    score: 0.98,
    treatment: "Fungisida Organik",
  },
  {
    img: "/busuk-buah.jpg",
    name: "Busuk Buah",
    scientific: "Phytophthora palmivora",
    score: 0.94,
    treatment: "Pemangkasan & Sanitasi",
  },
];
