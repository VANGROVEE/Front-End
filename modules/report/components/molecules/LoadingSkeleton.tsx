export const LoadingSkeleton = () => (
  <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
    <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest animate-pulse">
      Sinkronisasi Data Kebun...
    </p>
  </div>
);
