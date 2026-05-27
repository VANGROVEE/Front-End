import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Sparkles } from "lucide-react";
import { DashboardCycle } from "../../types/harvest"; // Pastikan path sesuai

interface CycleFailureContentProps {
  data: DashboardCycle;
  aiResponse: any;
}

export const CycleFailureContent = ({
  data,
  aiResponse,
}: CycleFailureContentProps) => {
  const startDate = new Date(data.start_date);
  const endDate = data.end_date ? new Date(data.end_date) : new Date();
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  const durationDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <div className="space-y-7">
      <Alert className="bg-rose-50 border-rose-100 rounded-xl py-4">
        <Sparkles className="h-4 w-4 text-rose-600" />
        <AlertTitle className="text-[10px] font-black uppercase tracking-wider text-rose-700">
          Analisis Kegagalan AI
        </AlertTitle>
        <AlertDescription className="mt-2 space-y-4">
          <p className="text-[12px] text-slate-700 leading-relaxed font-medium italic">
            &ldquo;{aiResponse?.analisis_kegagalan || "Data sedang dianalisis."}
            &rdquo;
          </p>
          {aiResponse?.rekomendasi_perbaikan_masa_depan && (
            <div className="pt-3 border-t border-rose-200">
              <p className="text-[10px] font-bold uppercase text-rose-800 mb-2">
                Evaluasi Masa Depan:
              </p>
              <ul className="grid grid-cols-1 gap-2">
                {aiResponse.rekomendasi_perbaikan_masa_depan.map(
                  (item: string, i: number) => (
                    <li
                      key={i}
                      className="text-[11px] flex items-start gap-2 text-slate-600 bg-white/50 p-2 rounded-lg border border-rose-100"
                    >
                      <span className="text-rose-500 font-bold">#</span> {item}
                    </li>
                  ),
                )}
              </ul>
            </div>
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
};
