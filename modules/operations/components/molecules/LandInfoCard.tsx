"use client";

import { AreaConverter } from "@/common/utils/unit";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Calendar,
  ChevronDown,
  Landmark,
  MapPin,
  Maximize2,
  Navigation,
  Pencil,
  Settings2,
  Trash2,
} from "lucide-react";
import { Land } from "../../types/lands";

interface LandInfoCardProps {
  land: Land;
  onEdit?: (land: Land) => void;
  onDelete?: (land: Land) => void;
}

export const LandInfoCard = ({ land, onEdit, onDelete }: LandInfoCardProps) => {
  const formattedDate = new Date(land.created_at).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Card className="w-full overflow-hidden rounded-[32px] border border-slate-100 bg-white shadow-xl shadow-green-900/5 transition-all hover:shadow-green-900/10 relative group">
      {/* Visual Accent */}
      <div className="h-2 w-full bg-gradient-to-r from-green-600 via-emerald-500 to-green-400" />

      <div className="flex flex-col lg:flex-row">
        {/* --- SISI KIRI: IDENTITAS (LEBIH RINGKAS DI DESKTOP) --- */}
        <CardHeader className="flex-1 lg:max-w-[35%] p-6 lg:p-8 space-y-4">
          <div className="flex items-center gap-4 lg:gap-5">
            <div className="bg-green-50 p-4 rounded-2xl text-green-600 shadow-inner flex-shrink-0 transition-transform group-hover:scale-105 duration-500">
              <Landmark size={28} className="stroke-[1.5]" />
            </div>

            <div className="space-y-1 min-w-0 flex-1">
              <CardTitle className="text-xl lg:text-2xl font-black tracking-tight text-slate-800 leading-none truncate">
                {land.name}
              </CardTitle>
              <div className="flex items-center text-xs font-bold text-slate-400 mt-1.5">
                <MapPin className="mr-1.5 h-3.5 w-3.5 text-green-500 shrink-0" />
                <span className="truncate opacity-80">
                  {land.location?.address || "Lokasi belum ditentukan"}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>

        {/* --- SISI KANAN: DATA & OPSI (MENGGUNAKAN GRID YANG FLEKSIBEL) --- */}
        <CardContent className="flex-[2] p-6 lg:p-8 bg-slate-50/30 lg:border-l border-slate-50 flex items-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10 w-full items-center">
            {/* Luas Area */}
            <div className="space-y-1.5">
              <div className="flex items-center text-[9px] font-black uppercase tracking-[0.2em] text-slate-300">
                <Maximize2 size={12} className="mr-2" /> Luas
              </div>
              <div className="text-xl lg:text-2xl font-black text-slate-800 flex items-baseline gap-1">
                {AreaConverter.toHectare(land.total_area)}
                <span className="text-xs font-bold text-slate-400">Ha</span>
              </div>
            </div>

            {/* Tanggal Terdaftar */}
            <div className="space-y-1.5">
              <div className="flex items-center text-[9px] font-black uppercase tracking-[0.2em] text-slate-300">
                <Calendar size={12} className="mr-2" /> Terdaftar
              </div>
              <div className="text-[11px] lg:text-xs font-black text-slate-600 leading-tight">
                {formattedDate}
              </div>
            </div>

            {/* GPS Koordinat */}
            <div className="space-y-1.5 col-span-1">
              <div className="flex items-center text-[9px] font-black uppercase tracking-[0.2em] text-slate-300">
                <Navigation size={12} className="mr-2" /> Koordinat
              </div>
              <div className="font-mono text-[9px] font-bold text-green-600 bg-green-100/30 border border-green-100 px-2 py-1 rounded-lg w-fit">
                {land.location?.latitude}, {land.location?.longitude}
              </div>
            </div>

            {/* Tombol Opsi - Selalu di akhir grid pada desktop, atau pojok bawah pada mobile */}
            <div className="flex justify-start md:justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    className="flex items-center gap-2 h-10 px-4 rounded-xl bg-white border border-slate-100 text-slate-500 hover:bg-green-50 hover:text-green-600 transition-all font-bold text-[10px] uppercase tracking-widest shadow-sm group/btn"
                  >
                    <Settings2
                      size={14}
                      className="stroke-[2.5] group-hover/btn:rotate-90 transition-transform duration-500"
                    />
                    Opsi
                    <ChevronDown size={12} className="opacity-50" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-52 rounded-2xl p-2 shadow-2xl border-slate-100 animate-in fade-in zoom-in-95 duration-200"
                >
                  <div className="px-3 py-2 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    Manajemen Lahan
                  </div>

                  <DropdownMenuItem
                    onClick={() => onEdit?.(land)}
                    className="flex items-center gap-3 p-3 rounded-xl cursor-pointer focus:bg-blue-50 focus:text-blue-600 text-slate-600 font-bold text-xs transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
                      <Pencil size={14} />
                    </div>
                    Edit Informasi
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="my-1 bg-slate-50" />

                  <DropdownMenuItem
                    onClick={() => onDelete?.(land)}
                    className="flex items-center gap-3 p-3 rounded-xl cursor-pointer focus:bg-red-50 focus:text-red-600 text-red-500 font-bold text-xs transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-500">
                      <Trash2 size={14} />
                    </div>
                    Hapus Lahan
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};
