"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Calendar,
  ChevronRight,
  Sprout,
  AlertCircle,
  ActivitySquare,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDate } from "../../utils/formatDate";
import { PlantingCycle } from "../../types/cycle";

import { SpotlightCard } from "@/components/ui/spotlight-card";
import {
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

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
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredCycles = useMemo(() => {
    return cycles.filter((cycle) => {
      const matchesStatus =
        statusFilter === "ALL" || cycle.status === statusFilter;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        cycle.commodity?.name?.toLowerCase().includes(searchLower) ||
        cycle.variety?.toLowerCase().includes(searchLower);

      return matchesStatus && matchesSearch;
    });
  }, [cycles, searchQuery, statusFilter]);

  const getStatusBadge = (status: string) => {
    const baseClass =
      "text-[8px] sm:text-[9px] font-black uppercase px-1.5 sm:px-2 py-0.5 rounded-md border-none shrink-0";
    switch (status) {
      case "COMPLETED":
        return (
          <Badge className={cn(baseClass, "bg-slate-100 text-slate-600")}>
            Selesai
          </Badge>
        );
      case "HARVESTED":
        return (
          <Badge className={cn(baseClass, "bg-emerald-100 text-emerald-700")}>
            Panen
          </Badge>
        );
      case "FAILED":
        return (
          <Badge className={cn(baseClass, "bg-red-100 text-red-700")}>
            Gagal
          </Badge>
        );
      default:
        return (
          <Badge className={cn(baseClass, "bg-blue-100 text-blue-700")}>
            Aktif
          </Badge>
        );
    }
  };

  return (
    <TooltipProvider>
      <SpotlightCard
        className="rounded-[24px] sm:rounded-[32px] border border-slate-100 bg-white shadow-sm h-full flex flex-col overflow-hidden w-full"
        spotlightColor="rgba(34, 197, 94, 0.08)"
      >
        <CardHeader className="p-4 sm:p-6 pb-3 space-y-4 relative z-10 shrink-0">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5 sm:space-y-1">
              <CardTitle className="text-sm sm:text-base font-black text-slate-800 uppercase tracking-tight">
                Siklus Tanam
              </CardTitle>
              <CardDescription className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {filteredCycles.length} Entri Ditemukan
              </CardDescription>
            </div>
            <Filter size={14} className="text-slate-300 sm:w-4 sm:h-4" />
          </div>

          <div className="space-y-3">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 group-focus-within:text-green-500 transition-colors z-10" />
              <Input
                placeholder="Cari..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 sm:h-10 pl-9 bg-slate-50 border-none rounded-xl text-[11px] sm:text-xs font-bold text-slate-700 focus-visible:ring-2 focus-visible:ring-green-500/20 focus-visible:bg-white transition-all shadow-inner"
              />
            </div>

            <Tabs
              defaultValue="ALL"
              onValueChange={setStatusFilter}
              className="w-full"
            >
              <TabsList className="grid grid-cols-4 w-full h-8 sm:h-9 bg-slate-50 rounded-xl p-1 gap-0.5 sm:gap-1">
                {["ALL", "PLANTING", "HARVESTED", "FAILED"].map((val) => (
                  <TabsTrigger
                    key={val}
                    value={val}
                    className="text-[8px] sm:text-[10px] px-0 font-black uppercase rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
                  >
                    {val === "ALL"
                      ? "Semua"
                      : val === "PLANTING"
                        ? "Aktif"
                        : val === "HARVESTED"
                          ? "Panen"
                          : "Gagal"}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>

        <CardContent className="p-4 sm:p-6 pt-0 flex-1 relative z-10 overflow-hidden flex flex-col min-h-0">
          <ScrollArea className="flex-1 w-full -mr-4 pr-4">
            <div className="flex flex-col gap-2.5 sm:gap-3 pb-6">
              {filteredCycles.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-12 px-4 border-2 border-dashed border-slate-100 rounded-[20px] sm:rounded-[24px] bg-slate-50/50">
                  <AlertCircle className="text-slate-200 mb-3 h-6 w-6 sm:h-8 sm:w-8" />
                  <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Tidak ada data
                  </p>
                </div>
              ) : (
                filteredCycles.map((cycle) => {
                  const isSelected = selectedCycle?.id === cycle.id;
                  const isFailed = cycle.status === "FAILED";
                  const activityCount = cycle.daily_activities?.length || 0;

                  return (
                    <div
                      key={cycle.id}
                      onClick={() => onSelect(cycle)}
                      role="button"
                      tabIndex={0}
                      className={cn(
                        "w-full text-left p-3 sm:p-4 rounded-[20px] sm:rounded-[24px] border transition-all duration-300 flex items-center justify-between group outline-none relative cursor-pointer mb-2",
                        isSelected
                          ? "bg-emerald-50/50 border-emerald-200 shadow-sm ring-1 ring-emerald-200"
                          : "bg-white border-slate-100 hover:border-emerald-100 hover:bg-slate-50/40",
                      )}
                    >
                      <div className="flex items-center gap-3 w-full min-w-0">
                        {/* Ikon Container */}
                        <div
                          className={cn(
                            "w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 transition-colors duration-300 shadow-sm",
                            isSelected
                              ? "bg-white text-emerald-600 shadow-emerald-100"
                              : isFailed
                                ? "bg-red-50 text-red-500"
                                : "bg-slate-50 text-slate-400 group-hover:bg-white group-hover:text-emerald-500",
                          )}
                        >
                          <Sprout
                            size={isSelected ? 20 : 18}
                            className="transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>

                        {/* Content Container */}
                        <div className="flex flex-col flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h4
                              className={cn(
                                "font-black text-[11px] sm:text-sm tracking-tight truncate uppercase leading-none transition-colors",
                                isSelected
                                  ? "text-emerald-900"
                                  : "text-slate-800",
                              )}
                            >
                              {cycle.commodity?.name || "Komoditas"}
                            </h4>
                            {getStatusBadge(cycle.status)}
                          </div>

                          <p className="text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-[0.1em] truncate mb-2">
                            {cycle.variety || "Varietas Standar"}
                          </p>

                          {/* Meta Info */}
                          <div className="flex items-center gap-3 text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase tracking-tight">
                            <span className="flex items-center gap-1.5 whitespace-nowrap">
                              <Calendar
                                size={10}
                                className={cn(
                                  "transition-colors",
                                  isSelected
                                    ? "text-emerald-600"
                                    : "text-slate-300",
                                )}
                              />
                              {formatDate(cycle.start_date)}
                            </span>
                            <div className="w-1 h-1 rounded-full bg-slate-200 shrink-0" />{" "}
                            {/* Dot Separator */}
                            <span className="flex items-center gap-1.5 whitespace-nowrap">
                              <ActivitySquare
                                size={10}
                                className={cn(
                                  "transition-colors",
                                  isSelected
                                    ? "text-emerald-600"
                                    : "text-slate-300",
                                )}
                              />
                              {activityCount} Log Aktivitas
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Arrow Indicator */}
                      <div
                        className={cn(
                          "p-1.5 rounded-full transition-all shrink-0 ml-2",
                          isSelected
                            ? "bg-emerald-100 text-emerald-600 translate-x-1"
                            : "bg-transparent text-slate-200 group-hover:text-emerald-400",
                        )}
                      >
                        <ChevronRight size={16} strokeWidth={3} />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </SpotlightCard>
    </TooltipProvider>
  );
};
