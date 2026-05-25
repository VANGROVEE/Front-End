import Image from "next/image";
import {
  Loader2,
  Zap,
  XCircle,
  RotateCcw,
  RefreshCcw,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MediaPreviewProps {
  preview: string;
  status: "idle" | "uploading" | "analyzing" | "ready" | "error";
  onReset: () => void;
  onRetry: () => void;
}

export const MediaPreview = ({
  preview,
  status,
  onReset,
  onRetry,
}: MediaPreviewProps) => {
  if (!preview && status === "idle") return null;

  return (
    <div className="relative rounded-[32px] overflow-hidden border-2 border-slate-100 bg-slate-950 aspect-video flex items-center justify-center group shadow-2xl">
      <Image
        fill
        src={preview}
        alt="Preview"
        className={cn(
          "object-cover transition-all duration-700",
          status !== "ready" ? "opacity-30 blur-sm" : "opacity-90",
        )}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white gap-3 p-6 text-center">
        {status === "uploading" && (
          <div className="animate-in fade-in">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-400 mx-auto mb-2" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em]">
              Uploading...
            </p>
          </div>
        )}
        {status === "analyzing" && (
          <div className="animate-in fade-in">
            <Zap className="h-8 w-8 animate-pulse text-amber-400 fill-amber-400 mx-auto mb-2" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em]">
              AI Consulting...
            </p>
          </div>
        )}
        {status === "error" && (
          <div className="bg-slate-900/90 p-6 rounded-[28px] backdrop-blur-md border border-red-500/50 shadow-2xl animate-in zoom-in-95">
            <XCircle className="h-8 w-8 text-red-500 mb-3 mx-auto" />
            <p className="text-[10px] font-black uppercase tracking-tight mb-4 text-red-200">
              Gagal Menganalisis Objek
            </p>
            <div className="flex gap-2 justify-center">
              <Button
                type="button"
                onClick={onRetry}
                size="sm"
                className="bg-white text-slate-950 rounded-xl font-bold text-[10px]"
              >
                <RefreshCcw size={14} className="mr-2" /> SCAN ULANG
              </Button>
              <Button
                type="button"
                onClick={onReset}
                variant="destructive"
                size="sm"
                className="rounded-xl font-bold text-[10px]"
              >
                <Trash2 size={14} className="mr-2" /> HAPUS
              </Button>
            </div>
          </div>
        )}
      </div>

      {status === "ready" && (
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-[2px]">
          <Button
            type="button"
            onClick={onReset}
            className="rounded-full bg-white text-red-600 px-8 h-12 font-black text-[11px] shadow-2xl hover:scale-105 active:scale-95 transition-all"
          >
            <RotateCcw size={16} className="mr-2" /> GANTI GAMBAR
          </Button>
        </div>
      )}
    </div>
  );
};
