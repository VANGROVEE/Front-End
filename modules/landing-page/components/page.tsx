import {
  ArrowRightCircle,
  BarChart3,
  CameraIcon,
  LeafIcon,
} from "lucide-react";
import { Activity } from "react";
import { Footer } from "./footer";

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 selection:bg-green-100">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-green-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-green-200">
              <LeafIcon size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-800 to-green-600">
              VANGROVE
            </span>
          </div>

          <div className="hidden md:flex gap-10 font-medium text-slate-600 text-sm">
            <a href="#features" className="hover:text-green-600 transition">
              Fitur
            </a>
            <a href="#tech" className="hover:text-green-600 transition">
              Teknologi
            </a>
            <a href="#about" className="hover:text-green-600 transition">
              Tentang
            </a>
          </div>

          <button className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-green-700 transition-all shadow-sm">
            Buka App
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-100 text-green-700 px-4 py-2 rounded-full text-xs font-bold mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            INTEGRASI GEMINI AI SEKARANG TERSEDIA
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8">
            Pertanian Cerdas dengan <br />
            <span className="text-green-600">Sentuhan AI.</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed">
            Vangrove membantu petani memantau kesehatan tanaman secara
            real-time, mendeteksi penyakit lewat foto, dan mengelola lahan dalam
            satu platform terpadu.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-green-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-green-700 hover:shadow-2xl hover:shadow-green-200 transition-all flex items-center justify-center gap-2">
              Mulai Sekarang <ArrowRightCircle size={20} />
            </button>
            <button className="bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all">
              Pelajari Fitur
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 bg-slate-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-green-600 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-green-100 group-hover:scale-110 transition-transform">
                <CameraIcon size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">AI Diagnosis</h3>
              <p className="text-slate-500 leading-relaxed">
                Ambil foto daun atau batang tanaman, dan Gemini AI akan
                menganalisis potensi penyakit serta memberikan solusi penanganan
                medis secara instan.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group border-t-4 border-t-green-600">
              <div className="w-14 h-14 bg-green-600 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-green-100 group-hover:scale-110 transition-transform">
                <Activity size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Planting Cycles</h3>
              <p className="text-slate-500 leading-relaxed">
                Manajemen siklus tanam yang terstruktur. Pantau estimasi panen,
                jadwal pemupukan, dan log aktivitas harian dalam satu timeline
                intuitif.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-green-600 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-green-100 group-hover:scale-110 transition-transform">
                <BarChart3 size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Market Insights</h3>
              <p className="text-slate-500 leading-relaxed">
                Dapatkan informasi harga pasar terbaru untuk komoditas Anda.
                Jual hasil panen di waktu terbaik untuk keuntungan yang
                maksimal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Siap Bertani Secara Digital?
            </h2>
            <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
              Gabung dengan komunitas Vangrove dan jadilah bagian dari revolusi
              pertanian berbasis data.
            </p>
            <button className="bg-green-500 hover:bg-green-400 text-slate-900 px-10 py-4 rounded-2xl font-extrabold text-lg transition-all">
              Hubungkan Lahan Sekarang
            </button>
          </div>
          {/* Decorative Circle */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};
