import React, { useState } from "react";
import {
  Search,
  Calendar,
  ChevronRight,
  Sprout,
  AlertCircle,
  ActivitySquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDate } from "../../utils/formatDate";
import { PlantingCycle } from "../../types/cycle";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { CardContent } from "@/components/ui/card";

interface CycleListSidebarProps {
  cycles: PlantingCycle[] | any[];
  selectedCycle: any | null;
  onSelect: (cycle: any) => void;
}

export const CycleListSidebar: React.FC<CycleListSidebarProps> = ({
  cycles = [],
  selectedCycle,
  onSelect,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const searchedCycles = cycles.filter((cycle) => {
    const searchLower = searchQuery.toLowerCase();
    const commodityMatch = cycle.commodity_name
      ?.toLowerCase()
      .includes(searchLower);
    const varietyMatch = cycle.variety?.toLowerCase().includes(searchLower);
    const statusMatch = cycle.status?.toLowerCase().includes(searchLower);

    return commodityMatch || varietyMatch || statusMatch;
  });

  return (
    <SpotlightCard
      className="rounded-[32px] border border-slate-100 bg-white shadow-sm h-full"
      spotlightColor="rgba(34, 197, 94, 0.08)"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <CardContent className="p-6 flex flex-col gap-5 h-full relative z-10">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-800 tracking-tight">
                Siklus Tanam
              </h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                {cycles.length} Siklus Ditemukan
              </p>
            </div>
          </div>

          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-green-500 transition-colors" />
            <input
              type="text"
              placeholder="Cari komoditas atau status..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-11 pr-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-green-300 focus:ring-4 focus:ring-green-500/10 transition-all shadow-inner"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3  overflow-y-auto custom-scrollbar pr-2 pb-2">
          {searchedCycles.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-8 px-4 border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/50">
              <AlertCircle className="text-slate-300 mb-2 h-8 w-8" />
              <p className="text-xs font-bold text-slate-600">
                Tidak ada hasil
              </p>
              <p className="text-[10px] text-slate-400 mt-1">
                Coba kata kunci lain
              </p>
            </div>
          ) : (
            searchedCycles.map((cycle) => {
              const isSelected = selectedCycle?.id === cycle.id;
              const isHarvested = cycle.status === "HARVESTED";
              const activityCount = cycle.daily_activities?.length || 0;

              return (
                <button
                  key={cycle.id}
                  onClick={() => onSelect(cycle)}
                  className={cn(
                    "w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between group",
                    isSelected
                      ? "bg-green-50 border-green-200 shadow-sm"
                      : "bg-white border-slate-100 hover:border-green-100 hover:bg-slate-50 shadow-none hover:shadow-sm",
                  )}
                >
                  <div className="flex items-start gap-3 w-full">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center transition-colors shrink-0 mt-0.5",
                        isSelected
                          ? "bg-green-200 text-green-700"
                          : isHarvested
                            ? "bg-slate-100 text-slate-400"
                            : "bg-green-50 text-green-500 group-hover:bg-green-100",
                      )}
                    >
                      <Sprout size={20} />
                    </div>

                    <div className="flex flex-col flex-1 gap-1.5 pr-2">
                      <div className="flex items-start justify-between w-full">
                        <div className="flex flex-col">
                          <span
                            className={cn(
                              "font-bold text-sm tracking-tight transition-colors line-clamp-1",
                              isSelected ? "text-green-900" : "text-slate-800",
                            )}
                          >
                            {cycle.commodity.name || "Komoditas"}
                          </span>

                          {cycle.variety && (
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                              {cycle.variety}
                            </span>
                          )}
                        </div>

                        <span
                          className={cn(
                            "text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md shrink-0 ml-2",
                            isHarvested
                              ? "bg-slate-100 text-slate-500"
                              : "bg-blue-100 text-blue-700",
                          )}
                        >
                          {isHarvested ? "Panen" : "Aktif"}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-[10px] font-medium text-slate-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar
                            size={12}
                            className={
                              isSelected ? "text-green-600" : "text-slate-400"
                            }
                          />
                          {formatDate(cycle.start_date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <ActivitySquare
                            size={12}
                            className={
                              isSelected ? "text-green-600" : "text-slate-400"
                            }
                          />
                          {activityCount} Aktivitas
                        </span>
                      </div>
                    </div>
                  </div>

                  <ChevronRight
                    size={18}
                    className={cn(
                      "transition-all shrink-0",
                      isSelected
                        ? "text-green-600 translate-x-1"
                        : "text-slate-300 group-hover:translate-x-1",
                    )}
                  />
                </button>
              );
            })
          )}
        </div>
      </CardContent>
    </SpotlightCard>
  );
};
