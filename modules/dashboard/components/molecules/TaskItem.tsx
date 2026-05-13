export const TaskItem = ({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon: string;
}) => (
  <div className="flex items-center gap-4 group cursor-pointer border border-transparent hover:border-green-100 p-2 -mx-2 rounded-2xl transition-colors">
    <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center text-lg shadow-sm group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <div className="flex flex-col">
      <span className="text-sm font-bold text-slate-800 group-hover:text-green-700 transition-colors">
        {title}
      </span>
      <span className="text-[11px] text-slate-400 font-medium">{desc}</span>
    </div>
  </div>
);
