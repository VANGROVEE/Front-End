"use client";

import React from "react";
import {
  CheckCircle2,
  AlertTriangle,
  FileText,
  ShieldAlert,
  Sprout,
  Wrench,
  XCircle,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AIAnalysisResultCardProps {
  data: {
    confidence_score: number;
    is_outbreak_trigger: boolean;
    image_url?: string;
    disease?: {
      name: string;
      scientific_name?: string;
      description?: string;
      local_treatment?: string;
      preventive_action?: string;
    } | null;
    gemini_insight?: {
      disease_description?: string;
      causes?: string;
      treatment?: string[];
      prevention?: string[];
      recovery?: string;
      farmer_notes?: string | null;
    } | null;
  };
  onClose: () => void;
}

export const AIAnalysisResultCard = ({
  data,
  onClose,
}: AIAnalysisResultCardProps) => {
  const rawDesc = data.gemini_insight?.disease_description || "";

  const hasDisease =
    rawDesc.includes("Blight") || rawDesc.includes("Mildew") || !!data.disease;
  const isHealthy = !hasDisease && !data.is_outbreak_trigger;
  const confidencePercentage = Math.round(data.confidence_score * 100);

  let diseaseName = "Tanaman Sehat / Normal";
  let scientificName = "Status Terkendali";

  if (!isHealthy) {
    if (rawDesc.includes("Early Blight")) {
      diseaseName = "Tomato Early Blight (Hawar Daun)";
      scientificName = "Alternaria solani";
    } else if (rawDesc.includes("Powdery Mildew")) {
      diseaseName = "Tomato Powdery Mildew (Embun Tepung)";
      scientificName = "Oidium neolycopersici";
    } else {
      diseaseName = data.disease?.name || "Terdeteksi Masalah Patogen";
      scientificName = data.disease?.scientific_name || "Patogen Tanaman";
    }
  }

  const description =
    data.gemini_insight?.disease_description ||
    data.disease?.description ||
    "Tidak ada gejala penyakit patogen berbahaya yang terdeteksi pada sampel citra daun.";

  const causes =
    data.gemini_insight?.causes ||
    data.disease?.description ||
    "Faktor sirkulasi lingkungan udara, kecukupan air, dan nutrisi harian berada dalam kondisi optimal.";

  const treatments =
    data.gemini_insight?.treatment && data.gemini_insight.treatment.length > 0
      ? data.gemini_insight.treatment
      : data.disease?.local_treatment
        ? [data.disease.local_treatment]
        : ["Lanjutkan pemantauan berkala dan perawatan rutin harian Anda."];

  const preventions =
    data.gemini_insight?.prevention && data.gemini_insight.prevention.length > 0
      ? data.gemini_insight.prevention
      : data.disease?.preventive_action
        ? [data.disease.preventive_action]
        : [
            "Jaga sanitasi area sekitar tanaman dari tumpukan gulma atau daun rontok mati.",
          ];

  return (
    <Card className="border-none shadow-none bg-transparent w-full flex flex-col max-h-[80vh]">
      <CardHeader
        className={cn(
          "p-6 rounded-[28px] border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white shadow-sm space-y-0 shrink-0",
          isHealthy
            ? "border-emerald-100 bg-emerald-50/20 text-emerald-900"
            : "border-red-100 bg-red-50/20 text-red-900",
        )}
      >
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner shrink-0 text-white",
              isHealthy ? "bg-emerald-600" : "bg-red-600",
            )}
          >
            {isHealthy ? (
              <CheckCircle2 size={24} />
            ) : (
              <AlertTriangle size={24} />
            )}
          </div>
          <div className="space-y-0.5">
            <CardTitle className="text-base font-black tracking-tight uppercase">
              {diseaseName}
            </CardTitle>
            <CardDescription
              className={cn(
                "text-[11px] font-bold italic",
                isHealthy ? "text-emerald-600/80" : "text-red-500/80",
              )}
            >
              {scientificName}
            </CardDescription>
          </div>
        </div>

        <div className="bg-white px-3 py-1.5 rounded-xl border border-slate-100 flex flex-col items-end shrink-0 shadow-inner">
          <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">
            Akurasi AI
          </span>
          <span className="text-xs font-black text-slate-800 flex items-center gap-0.5">
            <TrendingUp size={12} className="text-blue-500" />{" "}
            {confidencePercentage}%
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-0 flex-1 min-h-0 mt-4 overflow-hidden flex flex-col">
        <ScrollArea className="flex-1 h-[450px] pr-4">
          <div className="space-y-5 pb-4 pl-1">
            {data.is_outbreak_trigger && (
              <div className="p-4 rounded-2xl bg-amber-500/10   text-amber-800 flex items-start gap-3">
                <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-[11px] font-medium leading-relaxed">
                  <strong className="font-black uppercase tracking-wide block mb-0.5">
                    Peringatan Risiko Wabah!
                  </strong>
                  AI mendeteksi potensi sebaran masif di sekitar area kluster
                  lahan Anda. Segera lakukan isolasi fisik pada area tanaman
                  ini.
                </div>
              </div>
            )}

            {data.image_url && (
              <div className="relative rounded-[28px] overflow-hidden border border-slate-100 shadow-sm aspect-square sm:aspect-video flex items-center justify-center bg-slate-900">
                <img
                  src={data.image_url}
                  alt="Diagnosis detail"
                  className="w-full h-full object-cover opacity-95"
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                  <FileText size={12} /> Rangkuman Gejala
                </h4>
                <p className="text-xs leading-relaxed text-slate-600 font-medium">
                  {description}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                  <XCircle size={12} /> Faktor Penyebab
                </h4>
                <p className="text-xs leading-relaxed text-slate-600 font-medium">
                  {causes}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl border border-slate-100 bg-white shadow-sm space-y-2">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 w-fit px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Wrench size={10} /> Tindakan Kuratif (Pengobatan)
                </h4>
                <ul className="space-y-1.5">
                  {treatments.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-slate-600 font-medium flex items-start gap-2 leading-relaxed"
                    >
                      <span className="w-4 h-4 rounded bg-slate-100 text-slate-700 font-black text-[9px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl border border-slate-100 bg-white shadow-sm space-y-2">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-700 bg-blue-50 w-fit px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Sprout size={10} /> Tindakan Preventif (Pencegahan)
                </h4>
                <ul className="space-y-1.5">
                  {preventions.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-slate-600 font-medium flex items-start gap-2.5 leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-1.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {data.gemini_insight?.recovery && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-[11px] leading-relaxed text-slate-500 font-medium">
                  <span className="font-bold text-slate-700 uppercase tracking-tight block mb-0.5">
                    Prospek Pemulihan Tanaman:
                  </span>
                  {data.gemini_insight.recovery}
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
