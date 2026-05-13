"use client";

import React from "react";
import { Plus, Map, MapPinPlus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useLands } from "../../hooks/lands-hook";
import { useLandContext } from "../../context/land-context";

interface OperationsHeaderProps {
  selectedLandId: string;
  onLandChange: (landId: string) => void;
}

export const OperationsHeader = ({
  selectedLandId,
  onLandChange,
}: OperationsHeaderProps) => {
  const { lands, isLoadingLands } = useLands();

  const { openEdit, openAddCycle } = useLandContext();

  return (
    <div className="flex flex-col gap-4 border border-slate-100 bg-white p-6 shadow-sm rounded-[32px] md:flex-row md:items-center md:justify-between items-start animate-in fade-in slide-in-from-top-2 duration-500">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-800">
          Farm Operations
        </h1>
        <p className="mt-1 text-sm font-medium text-slate-400">
          Pantau siklus tanam dan aktivitas harian berdasarkan lahan Anda.
        </p>
      </div>

      <div className="flex w-full items-center gap-3 md:w-auto">
        <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 pr-1 transition-all focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-500/10">
          <Select
            value={selectedLandId}
            onValueChange={onLandChange}
            disabled={isLoadingLands || !lands || lands.length === 0}
          >
            <SelectTrigger className="h-12 w-full border-0 bg-transparent font-bold text-slate-700 shadow-none focus:ring-0 md:w-[220px]">
              <div className="flex items-center gap-2">
                {isLoadingLands ? (
                  <Loader2 size={16} className="animate-spin text-green-600" />
                ) : (
                  <Map size={16} className="text-green-600" />
                )}
                <SelectValue
                  placeholder={
                    isLoadingLands ? "Memuat Lahan..." : "Pilih Lahan"
                  }
                />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-100 shadow-xl max-h-[300px]">
              {lands?.length > 0 ? (
                lands.map((land: any) => (
                  <SelectItem
                    key={land.id}
                    value={land.id}
                    className="cursor-pointer rounded-lg font-medium focus:bg-green-50 focus:text-green-700"
                  >
                    {land.name}
                  </SelectItem>
                ))
              ) : (
                <div className="p-4 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Lahan Tidak Ditemukan
                </div>
              )}
            </SelectContent>
          </Select>

          <div className="mx-1 h-6 w-px bg-slate-200" />

          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-xl text-slate-400 transition-all hover:bg-green-50 hover:text-green-600 active:scale-90"
            onClick={() => openEdit(null)}
            title="Tambah Lahan Baru"
          >
            <MapPinPlus size={18} />
          </Button>
        </div>

        <Button
          disabled={!selectedLandId}
          onClick={() => openAddCycle(selectedLandId)}
          className="h-12 shrink-0 rounded-2xl bg-slate-950 px-6 font-bold shadow-xl shadow-slate-200 transition-all hover:bg-green-600 hover:shadow-green-200 active:scale-95 disabled:opacity-50 disabled:grayscale"
        >
          <Plus className="mr-2 h-5 w-5" />
          <span className="hidden md:inline">Siklus Baru</span>
        </Button>
      </div>
    </div>
  );
};
