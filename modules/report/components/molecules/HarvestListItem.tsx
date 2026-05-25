import { CalendarDays, ImageIcon } from "lucide-react";
import Image from "next/image";

export const HarvestListItem = ({ report, formatDate }: any) => (
  <div className="group p-4 rounded-[24px] border border-slate-100 bg-white hover:border-emerald-200 transition-all flex items-center gap-4">
    <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
      {report.image_proof_url ? (
        <Image
          fill
          src={report.image_proof_url}
          alt="Harvest"
          className="object-cover group-hover:scale-105 transition-transform"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-slate-300">
          <ImageIcon size={20} />
        </div>
      )}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-0.5">
        <h4 className="text-[13px] font-black text-slate-800 uppercase truncate">
          {report.cycle?.commodity?.name}
        </h4>

        {/* <Badge
          className={cn(
            "text-[9px] font-black h-4 px-2 border-none shadow-none",
            report.quality_grade === "PENDING_AI"
              ? "bg-slate-100 text-slate-500"
              : "bg-emerald-500 text-white",
          )}
        >
          {report.quality_grade}
        </Badge> */}
      </div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
        {report.cycle?.variety || "Varietas Standar"}
      </p>
      <p className="text-[9px] text-slate-400 mt-1 flex items-center gap-1">
        <CalendarDays size={10} /> {formatDate(report.created_at)}
      </p>
    </div>
    <div className="text-right shrink-0 bg-slate-50 px-3 py-2 rounded-xl">
      <p className="text-[9px] font-black text-slate-400 uppercase">Berat</p>
      <h4 className="text-lg font-black text-emerald-600">
        {report.total_yield_kg} <span className="text-[10px]">Kg</span>
      </h4>
    </div>
  </div>
);
