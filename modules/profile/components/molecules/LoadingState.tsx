export const LoadingState = () => (
  <div className="flex items-center justify-center min-h-[500px]">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin shadow-inner" />
      <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] animate-pulse">
        Menyelaraskan Data...
      </p>
    </div>
  </div>
);
