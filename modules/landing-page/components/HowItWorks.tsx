import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ClipboardCheck, Map, Search, Sprout } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      id: "01",
      title: "Daftarkan Lahan",
      desc: "Tentukan lokasi dan luas lahan Anda untuk pemantauan yang lebih akurat sesuai kondisi mikro-klimat.",
      icon: <Map className="text-orange-600" size={24} />,
      color: "bg-orange-50 dark:bg-orange-950/50",
    },
    {
      id: "02",
      title: "Atur Siklus Tanam",
      desc: "Pilih komoditas dan tentukan tanggal tanam untuk mendapatkan jadwal perawatan otomatis.",
      icon: <Sprout className="text-emerald-600" size={24} />,
      color: "bg-emerald-50 dark:bg-emerald-950/50",
    },
    {
      id: "03",
      title: "Pantau Kesehatan",
      desc: "Ambil foto tanaman secara berkala. AI kami akan menganalisis jika ada gejala penyakit.",
      icon: <Search className="text-blue-600" size={24} />,
      color: "bg-blue-50 dark:bg-blue-950/50",
    },
    {
      id: "04",
      title: "Aksi & Laporan",
      desc: "Dapatkan rekomendasi pemupukan dan pestisida berdasarkan fase pertumbuhan tanaman.",
      icon: <ClipboardCheck className="text-purple-600" size={24} />,
      color: "bg-purple-50 dark:bg-purple-950/50",
    },
  ];

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-primary tracking-[0.2em] uppercase mb-3">
            Alur Kerja Digital
          </h2>
          <h3 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
            Kelola Kebun dalam{" "}
            <span className="italic text-primary">4 Tahap.</span>
          </h3>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Dari pemetaan lahan hingga panen, semua terintegrasi dengan
            kecerdasan buatan untuk hasil maksimal.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector Line (Hanya muncul di Desktop LG) */}
          <div className="hidden lg:block absolute top-1/4 left-0 w-full h-0.5 bg-border -translate-y-1/2 z-0" />

          {steps.map((step, index) => (
            <Card
              key={index}
              className="relative z-10 group rounded-[2rem] transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 flex flex-col justify-between"
            >
              <div>
                <CardHeader className="flex flex-row justify-between items-start space-y-0 pb-4">
                  <div
                    className={`w-12 h-12 ${step.color} rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform duration-300`}
                  >
                    {step.icon}
                  </div>
                  <span className="text-3xl font-black text-muted/40 group-hover:text-primary/20 transition-colors">
                    {step.id}
                  </span>
                </CardHeader>

                <CardContent className="space-y-2">
                  <CardTitle className="text-xl font-bold tracking-tight">
                    {step.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground leading-relaxed text-sm">
                    {step.desc}
                  </CardDescription>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Button
            size="lg"
            className="rounded-full font-bold px-8 py-6 text-md shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all"
          >
            Mulai Buat Lahan Pertama
          </Button>
        </div>
      </div>
    </section>
  );
}
