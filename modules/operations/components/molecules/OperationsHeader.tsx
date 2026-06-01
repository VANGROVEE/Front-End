"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Loader2, Map, MapPinPlus, Plus, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

import { useLandContext } from "../../context/land-context";
import { useLands } from "../../hooks/lands-hook";

interface OperationsHeaderProps {
  showGuide: boolean;
  selectedLandId: string;
  onLandChange: (landId: string) => void;
}

export const OperationsHeader = ({
  showGuide,
  selectedLandId,
  onLandChange,
}: OperationsHeaderProps) => {
  const { lands, isLoadingLands } = useLands();
  const { openEdit, openAddCycle } = useLandContext();

  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (showGuide) {
      setShowHint(false);
      return;
    }

    const startTimer = setTimeout(() => {
      setShowHint(true);
    }, 800);

    const hideTimer = setTimeout(() => {
      setShowHint(false);
    }, 6000);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(hideTimer);
    };
  }, [showGuide]);

  if (!lands && !isLoadingLands) {
    return null;
  }

  const isNoLandAtAll = lands?.length === 0;

  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex flex-col gap-4 border border-slate-100 bg-white p-6 shadow-sm rounded-[32px] md:flex-row md:items-center md:justify-between items-start animate-in fade-in slide-in-from-top-2 duration-500 w-full">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-800 uppercase italic">
            Farm Operations
          </h1>
          <p className="mt-1 text-sm font-medium text-slate-400">
            Pantau siklus tanam dan aktivitas harian berdasarkan lahan Anda.
          </p>
        </div>

        <div className="flex w-full items-center gap-3 md:w-auto">
          {/* Dropdown & Add Land Group */}
          <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 pr-1 transition-all focus-within:border-green-500 w-full md:w-auto">
            <Select
              value={selectedLandId}
              onValueChange={onLandChange}
              disabled={isLoadingLands || !lands || isNoLandAtAll}
            >
              <SelectTrigger className="h-12 w-full border-0 bg-transparent font-bold text-slate-700 shadow-none focus:ring-0 md:w-[220px]">
                <div className="flex items-center gap-2">
                  {isLoadingLands ? (
                    <Loader2
                      size={16}
                      className="animate-spin text-green-600"
                    />
                  ) : (
                    <Map size={16} className="text-green-600" />
                  )}
                  <SelectValue
                    placeholder={isLoadingLands ? "Memuat..." : "Pilih Lahan"}
                  />
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-xl border-slate-100 shadow-xl max-h-[300px]">
                {lands?.map((land: any) => (
                  <SelectItem
                    key={land.id}
                    value={land.id}
                    className="cursor-pointer rounded-lg font-medium"
                  >
                    {land.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="mx-1 h-6 w-px bg-slate-200" />

            <Tooltip open={isNoLandAtAll && showHint ? true : undefined}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-10 w-10 rounded-xl transition-all relative active:scale-90
                    ${isNoLandAtAll ? "text-emerald-600 bg-emerald-50" : "text-slate-400 hover:text-green-600"}`}
                  onClick={() => openEdit(null)}
                >
                  <MapPinPlus size={18} />
                  {/* Ping hanya muncul jika lahan kosong DAN hint sedang aktif */}
                  {isNoLandAtAll && showHint && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="bg-slate-900 text-white font-bold text-[10px] uppercase"
              >
                {isNoLandAtAll
                  ? "Daftarkan lahan pertama Anda"
                  : "Tambah lahan baru"}
              </TooltipContent>
            </Tooltip>
          </div>

          {/* New Cycle Button */}
          <Tooltip open={!!selectedLandId && showHint ? true : undefined}>
            <TooltipTrigger asChild>
              <Button
                disabled={!selectedLandId}
                onClick={() => openAddCycle(selectedLandId)}
                className={`h-12 shrink-0 rounded-2xl px-6 font-bold shadow-xl transition-all active:scale-95 relative
                  ${selectedLandId ? "bg-emerald-600 text-white" : "bg-slate-950 text-white opacity-50"}`}
              >
                <Plus className="mr-2 h-5 w-5" />
                <span>Siklus Baru</span>

                {/* Ping muncul jika ada lahan terpilih DAN hint aktif */}
                {selectedLandId && showHint && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              className="bg-slate-900 text-white font-bold text-[10px] uppercase tracking-wider animate-in zoom-in duration-300"
            >
              <div className="flex items-center gap-2">
                <Sparkles size={12} className="text-yellow-400" />
                Mulai siklus tanam baru
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
};
