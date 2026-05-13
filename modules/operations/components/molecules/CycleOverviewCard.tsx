import React from "react";
import { Sprout, Calendar, CheckCircle2, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PlantingCycle } from "../../types/cycle";
import { formatDate } from "../../utils/formatDate";

export const CycleOverviewCard = ({ cycle }: { cycle: PlantingCycle }) => {
  return (
    <Card className="rounded-[32px] border-slate-100 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 w-40 h-40 bg-green-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <CardContent className="p-8 relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center">
            <Sprout size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-800">
              {cycle.commodity_name}
            </h2>
            <p className="text-sm font-bold text-green-600">
              {cycle.variety || "Varietas Standar"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
              <Calendar size={12} /> Mulai Tanam
            </span>
            <p className="text-sm font-black text-slate-800 mt-1">
              {formatDate(cycle.start_date)}
            </p>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
              <CheckCircle2 size={12} /> Est. Panen
            </span>
            <p className="text-sm font-black text-slate-800 mt-1">
              {cycle.estimated_harvest
                ? formatDate(cycle.estimated_harvest)
                : "-"}
            </p>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 md:col-span-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
              <Activity size={12} /> Metode
            </span>
            <p className="text-sm font-black text-slate-800 mt-1">
              {cycle.planting_method || "Konvensional"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
