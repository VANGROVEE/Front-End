import Link from "next/link";

export const Logo = () => (
  <Link href="/">
    <div className="flex items-center gap-1.5">
      <img
        src="/img/logo.png"
        alt="Vangrove Logo"
        className="w-7 h-7 md:w-10 md:h-10 object-contain flex-shrink-0"
      />
      <span className="font-black tracking-tighter text-slate-900 uppercase text-sm md:text-base">
        Van<span className="text-green-600">grove</span>
      </span>
    </div>
  </Link>
);
