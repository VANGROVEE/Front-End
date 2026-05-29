import { cn } from "@/lib/utils";
import Image from "next/image";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center gap-2 select-none group", className)}>
      <div className="relative w-9 h-9 shrink-0 transition-transform duration-500 group-hover:rotate-[15deg]">
        <Image
          src="/img/logo.png"
          alt="Vangrove Logo"
          fill
          priority
          sizes="36px"
          className="object-contain"
        />
      </div>

      {/* Teks Branding */}
      <span className="font-black text-xl tracking-tighter text-slate-900 uppercase">
        Van<span className="text-emerald-600">grove</span>
      </span>
    </div>
  );
};
