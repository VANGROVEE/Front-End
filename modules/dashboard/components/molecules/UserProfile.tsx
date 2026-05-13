import { Bell, UserCircle } from "lucide-react";

export const UserProfile = () => (
  <div className="flex items-center gap-4">
    <button className="relative p-2 text-slate-400 hover:text-green-600 transition-colors">
      <Bell size={20} />
      <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
    </button>
    <div className="flex items-center gap-3 bg-white p-1 pr-4 rounded-full border border-slate-100 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
      <div className="w-8 h-8 bg-green-50 rounded-full overflow-hidden flex items-center justify-center">
        <UserCircle className="w-full h-full text-green-600" />
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-[10px] text-slate-400 font-bold uppercase">
          Welcome!
        </span>
        <span className="text-xs font-black text-slate-700">Petani Modern</span>
      </div>
    </div>
  </div>
);
