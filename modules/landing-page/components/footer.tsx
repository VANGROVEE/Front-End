import { Leaf } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-slate-100">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2 opacity-50">
          <Leaf className="text-green-600" size={20} />
          <span className="font-bold text-slate-900">VANGROVE</span>
        </div>
        <p className="text-slate-400 text-sm">
          © 2026 Vangrove Agritech Ecosystem. Build with Next.js & Bun.
        </p>
        <div className="flex gap-8 text-sm font-medium text-slate-400">
          <a href="#" className="hover:text-green-600 transition">
            Twitter
          </a>
          <a href="#" className="hover:text-green-600 transition">
            Github
          </a>
          <a href="#" className="hover:text-green-600 transition">
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
};
