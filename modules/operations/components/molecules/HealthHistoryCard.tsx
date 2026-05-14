import React from "react";
import {
  Activity,
  PlusCircle,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export interface HealthReport {
  id: string;
  created_at: string | Date;
  image_url: string;
  disease_id?: string | null;
  confidence_score: number;
  gemini_insight?: any;
  is_outbreak_trigger: boolean;
  disease?: {
    name: string;
  };
}

interface HealthHistoryCardProps {
  reports: HealthReport[];
  isAiSupported?: boolean;
  onAddReport: () => void;
}

export const HealthHistoryCard: React.FC<HealthHistoryCardProps> = ({
  reports,
  isAiSupported = true,
  onAddReport,
}) => {
  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="flex flex-col gap-4 bg-white border border-slate-100 rounded-[32px] p-6 shadow-sm relative overflow-hidden h-full">
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-green-400/10 blur-3xl rounded-full pointer-events-none" />

      <div className="flex items-center justify-between pb-4 border-b border-slate-50 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
            <Activity size={20} />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Riwayat Kesehatan AI</h3>
            <p className="text-xs text-slate-400 font-medium">
              Analisis visual tanaman
            </p>
          </div>
        </div>

        <div className="group relative">
          <Button
            onClick={onAddReport}
            disabled={!isAiSupported}
            className={`rounded-xl px-4 h-10 transition-all ${
              isAiSupported
                ? "bg-slate-950 hover:bg-blue-600 text-white shadow-md active:scale-95"
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
          >
            {isAiSupported ? (
              <Sparkles className="mr-2 h-4 w-4 text-blue-400" />
            ) : (
              <PlusCircle className="mr-2 h-4 w-4" />
            )}
            Cek AI
          </Button>

          {!isAiSupported && (
            <div className="absolute  right-0 top-full mt-2 w-48 p-2 bg-slate-800 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
              Komoditas pada lahan ini belum mendukung analisis AI.
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3 overflow-y-auto max-h-[400px] custom-scrollbar relative z-10 pr-2">
        {reports.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-12 px-4 border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/50 mt-2">
            <ImageIcon className="text-slate-300 mb-3" size={32} />
            <p className="text-sm font-bold text-slate-600">
              Belum ada foto yang dianalisis
            </p>
            <p className="text-xs text-slate-400 mt-1 max-w-[200px]">
              Unggah foto tanaman untuk mendeteksi penyakit sedini mungkin.
            </p>
          </div>
        ) : (
          reports.map((report) => {
            const isHealthy = !report.disease_id;

            const insightText =
              typeof report.gemini_insight === "string"
                ? report.gemini_insight
                : report.gemini_insight?.diagnosis || "Tidak ada catatan.";

            return (
              <div
                key={report.id}
                className="group flex items-start gap-4 p-3 rounded-2xl border border-slate-100 hover:border-blue-100 hover:bg-blue-50/30 transition-colors"
              >
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                  <img
                    src={report.image_url}
                    alt="Foto tanaman"
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute bottom-1 right-1 bg-black/70 backdrop-blur-sm text-white text-[9px] px-1.5 py-0.5 rounded-md font-mono">
                    {Math.round(report.confidence_score * 100)}%
                  </div>
                </div>

                <div className="flex flex-col flex-1 py-1">
                  <div className="flex justify-between items-start mb-1">
                    {isHealthy ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-md bg-green-100 text-green-700">
                        <CheckCircle2 size={10} /> Tanaman Sehat
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-md bg-red-100 text-red-700">
                        <AlertTriangle size={10} />{" "}
                        {report.disease?.name || "Terdeteksi Penyakit"}
                      </span>
                    )}

                    <span className="text-[10px] text-slate-400 font-medium">
                      {formatDate(report.created_at)}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mt-1">
                    {insightText}
                  </p>

                  {report.is_outbreak_trigger && (
                    <span className="text-[10px] text-orange-600 font-bold mt-2 inline-flex items-center gap-1">
                      ⚠️ Risiko Penularan Tinggi
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
