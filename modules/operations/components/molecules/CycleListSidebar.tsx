"use client";

import React from "react";
import { Sprout, LayoutList, RefreshCcw, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { useLands } from "../../hooks/lands-hook";
import { getStatusColor } from "../../const/getStatusColor";
import { PlantingCycle } from "../../types/cycle";

interface Props {
  selectedLandId: string;
  selectedCycle: PlantingCycle | null;
  onSelect: (cycle: PlantingCycle) => void;
}

export const CycleListSidebar = ({
  selectedLandId,
  selectedCycle,
  onSelect,
}: Props) => {
  const { landDetail, isLoadingDetail, isLoadingLands, handleDelete } =
    useLands(selectedLandId);

  const cycles: PlantingCycle[] = landDetail?.planting_cycles || [];

  const isLoading = isLoadingLands || isLoadingDetail;

  return (
    <div className="flex flex-col gap-4">
      {/* HEADER SECTION */}
      <div className="flex items-center justify-between px-2">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.15em]">
          Siklus Tanam
        </h3>
        {!isLoading && cycles.length > 0 && (
          <Badge
            variant="secondary"
            className="rounded-lg bg-slate-100 text-[10px] font-bold text-slate-500 border-none"
          >
            {cycles.length} Total
          </Badge>
        )}
      </div>

      <div className="space-y-3">
        {/* 1. LOADING STATE (Skeleton) */}
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="p-5 rounded-[28px] border border-slate-100 bg-white space-y-4 animate-pulse"
            >
              <div className="h-5 w-20 bg-slate-100 rounded-lg" />
              <div className="space-y-2">
                <div className="h-6 w-3/4 bg-slate-100 rounded-md" />
                <div className="h-4 w-1/2 bg-slate-50 rounded-md" />
              </div>
            </div>
          ))
        ) : cycles.length > 0 ? (
          /* 2. SUCCESS STATE */
          cycles.map((cycle) => {
            const isActive = selectedCycle?.id === cycle.id;

            return (
              <div
                key={cycle.id}
                onClick={() => onSelect(cycle)}
                className={cn(
                  "group relative p-5 rounded-[28px] cursor-pointer transition-all duration-300 border animate-in fade-in slide-in-from-left-2",
                  isActive
                    ? "bg-green-600 text-white border-green-600 shadow-xl shadow-green-900/10"
                    : "bg-white text-slate-800 border-slate-100 hover:border-green-300 hover:shadow-lg hover:shadow-slate-200/50",
                )}
              >
                <div className="flex justify-between items-start mb-4">
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[10px] font-black px-2.5 py-0.5 rounded-xl uppercase tracking-wider border-0 shadow-none",
                      isActive
                        ? "bg-white/20 text-white"
                        : getStatusColor(cycle.status),
                    )}
                  >
                    {cycle.status}
                  </Badge>
                </div>

                <h4 className="text-lg font-black leading-tight mb-1 group-hover:translate-x-1 transition-transform duration-300 text-balance">
                  {cycle.commodity_name}
                </h4>

                <p
                  className={cn(
                    "text-xs font-bold flex items-center gap-1.5 transition-colors",
                    isActive ? "text-green-100" : "text-slate-400",
                  )}
                >
                  <Sprout
                    size={14}
                    className={isActive ? "text-white" : "text-green-500"}
                  />
                  {cycle.variety || "Varietas Standar"}
                </p>
              </div>
            );
          })
        ) : (
          /* 3. EMPTY STATE */
          <div className="flex flex-col items-center justify-center py-12 px-6 rounded-[32px] border border-dashed border-slate-200 bg-slate-50/50 text-center animate-in zoom-in-95 duration-500">
            <div className="p-3 bg-white rounded-2xl shadow-sm mb-3">
              <LayoutList size={24} className="text-slate-300" />
            </div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
              Tidak ada riwayat
              <br />
              siklus tanam
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
