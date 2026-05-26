import React from "react";
import { Upload, Search, CheckCircle, ArrowRight } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      id: "01",
      title: "Ambil Foto",
      desc: "Ambil foto daun atau bagian tanaman yang terlihat tidak sehat langsung dari kebun Anda.",
      icon: <Upload className="text-green-600" size={28} />,
      color: "bg-green-50",
    },
    {
      id: "02",
      title: "Analisis AI",
      desc: "Sistem visi komputer kami akan memindai gejala penyakit dalam hitungan detik.",
      icon: <Search className="text-blue-600" size={28} />,
      color: "bg-blue-50",
    },
    {
      id: "03",
      title: "Dapatkan Solusi",
      desc: "Terima laporan diagnosis lengkap beserta langkah penanganan yang disarankan.",
      icon: <CheckCircle className="text-emerald-600" size={28} />,
      color: "bg-emerald-50",
    },
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-green-600 tracking-[0.2em] uppercase mb-3">
            Proses Sederhana
          </h2>
          <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Mulai Pantau dalam{" "}
            <span className="italic text-green-600">3 Langkah.</span>
          </h3>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector Line (Hanya muncul di Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0" />

          {steps.map((step, index) => (
            <div key={index} className="relative z-10 group">
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 hover:border-green-200 hover:shadow-2xl hover:shadow-green-100/50 transition-all duration-500 h-full">
                {/* Icon & Number */}
                <div className="flex justify-between items-start mb-6">
                  <div
                    className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}
                  >
                    {step.icon}
                  </div>
                  <span className="text-4xl font-black text-slate-100 group-hover:text-green-100 transition-colors">
                    {step.id}
                  </span>
                </div>

                {/* Content */}
                <h4 className="text-2xl font-bold text-slate-900 mb-3">
                  {step.title}
                </h4>
                <p className="text-slate-600 leading-relaxed">{step.desc}</p>

                {/* Mobile/Tab Arrow */}
                <div className="mt-6 flex items-center gap-2 text-green-600 font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  Pelajari selengkapnya <ArrowRight size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Call to Action */}
        <div className="mt-16 text-center">
          <div className="inline-block p-1 rounded-2xl bg-slate-50 border border-slate-100">
            <p className="px-6 py-3 text-slate-500 text-sm">
              Sudah siap meningkatkan hasil panen Anda?
              <button className="ml-2 font-bold text-slate-900 underline underline-offset-4 hover:text-green-600">
                Coba Demo Sekarang
              </button>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
