"use client";

import Autoplay from "embla-carousel-autoplay";
import {
  CloudRain,
  CloudSun,
  Droplets,
  Leaf,
  MapPin,
  RefreshCcw,
  ThermometerSun,
  Wind,
} from "lucide-react";
import dynamic from "next/dynamic";
import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

import { useAnalysis } from "../../hooks/useAnalyze";
import { DashboardError } from "./DashboardError";
import { DashboardSkeleton } from "./DashboardSkeleton";
import { StatCard } from "./StatCard";

const MapViewer = dynamic(() => import("./MapViewer"), {
  ssr: false,
  loading: () => <DashboardSkeleton />,
});

export const Dashboard3D = () => {
  const {
    lands = [],
    summary,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useAnalysis();

  const [activeLandId, setActiveLandId] = React.useState<string | null>(null);

  const plugin = React.useMemo(
    () =>
      Autoplay({
        delay: 4000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    [],
  );

  React.useEffect(() => {
    if (lands?.length > 0 && !activeLandId) {
      setActiveLandId(lands[0].id);
    }
  }, [lands, activeLandId]);

  if (isLoading) return <DashboardSkeleton />;
  if (isError) return <DashboardError onRetry={() => refetch()} />;

  const activeLand = lands.find((l: any) => l.id === activeLandId) || lands[0];

  const weatherConfig = ((cond: string = "") => {
    const d = cond.toLowerCase();
    if (d.includes("hujan"))
      return { icon: <CloudRain size={24} />, color: "indigo" as const };
    if (d.includes("awan") || d.includes("mendung"))
      return { icon: <CloudSun size={24} />, color: "blue" as const };
    return { icon: <ThermometerSun size={24} />, color: "orange" as const };
  })(activeLand?.weather?.condition || "");

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8 bg-[#f8fafc] min-h-screen font-sans">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-2 md:px-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge className="bg-emerald-500 hover:bg-emerald-600 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 border-none shadow-sm">
              Live Satellite Feed
            </Badge>
            {isFetching && (
              <RefreshCcw size={14} className="animate-spin text-emerald-600" />
            )}
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter italic">
            TERMINAL{" "}
            <span className="text-emerald-500 not-italic">AGRI-TECH</span>
          </h1>
        </div>
        <Button
          onClick={() => refetch()}
          disabled={isFetching}
          className="rounded-full w-full md:w-auto h-14 px-8 bg-slate-900 text-white font-bold gap-3 shadow-2xl hover:scale-105 transition-all active:scale-95"
        >
          <RefreshCcw className={cn(isFetching && "animate-spin")} size={18} />
          Sync Satellite
        </Button>
      </header>

      <Card className="relative flex flex-col md:block h-auto md:h-[80vh] w-full rounded-[2rem] md:rounded-[3rem] overflow-hidden border-none shadow-[0_32px_64px_-12px_rgba(0,0,0,0.12)] bg-slate-50 md:bg-white ring-1 ring-slate-200/50">
        <div className="relative h-[45vh] md:h-auto shrink-0 md:absolute md:inset-0 z-0">
          <MapViewer centerPosition={activeLand?.position} farmLands={lands} />
        </div>

        <div className="relative z-10 flex flex-col p-4 gap-4 md:absolute md:inset-0 md:pointer-events-none md:p-8 md:justify-between md:gap-0">
          <div className="flex flex-col md:flex-row justify-between items-start w-full gap-4">
            <div className="flex flex-col gap-3 md:gap-4 w-full md:max-w-[280px] order-2 md:order-1">
              <Card className="pointer-events-auto bg-white md:bg-white/60 backdrop-blur-none md:backdrop-blur-2xl border border-slate-100 md:border-white/50 shadow-xl md:shadow-2xl rounded-[2rem] md:rounded-[2.5rem] p-4 md:p-5">
                <div className="flex items-center gap-4 md:gap-5">
                  <div className="bg-orange-500 p-3 md:p-4 rounded-2xl md:rounded-[1.8rem] text-white shadow-xl shadow-orange-500/30">
                    <ThermometerSun
                      size={24}
                      strokeWidth={2.5}
                      className="md:w-7 md:h-7"
                    />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest mb-1 leading-none">
                      Ambient Temp
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter">
                        {activeLand?.weather?.temp?.toFixed(0) ?? "--"}°
                      </span>
                      <span className="text-lg md:text-xl font-bold text-slate-400">
                        C
                      </span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="pointer-events-auto flex flex-col bg-white md:bg-white/60 backdrop-blur-none md:backdrop-blur-2xl border border-slate-100 md:border-white/50 shadow-xl md:shadow-2xl rounded-[2rem] md:rounded-[2.5rem] p-4 md:p-5 max-h-[220px] md:max-h-[300px]">
                <div className="flex items-center justify-between mb-3 md:mb-4 px-1">
                  <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-widest flex items-center gap-2 leading-none">
                    <MapPin size={14} className="text-emerald-600" /> Aset
                    Terdaftar
                  </h3>
                  <Badge className="bg-emerald-500/10 text-emerald-600 border-none text-[9px] font-black">
                    {lands.length} UNIT
                  </Badge>
                </div>
                <ScrollArea className="flex-1 pr-2">
                  <div className="space-y-2">
                    {lands.map((land: any) => {
                      const isActive = activeLandId === land.id;
                      return (
                        <button
                          key={land.id}
                          onClick={() => setActiveLandId(land.id)}
                          className={cn(
                            "w-full p-3 rounded-2xl flex items-center justify-between transition-all group border",
                            isActive
                              ? "bg-emerald-500 border-emerald-400 shadow-lg shadow-emerald-500/20"
                              : "bg-slate-50 md:bg-white/40 border-transparent hover:bg-slate-100 md:hover:bg-white/80 md:hover:border-white",
                          )}
                        >
                          <div className="text-left overflow-hidden">
                            <p
                              className={cn(
                                "text-[11px] font-black truncate",
                                isActive ? "text-white" : "text-slate-800",
                              )}
                            >
                              {land.name}
                            </p>
                            <p
                              className={cn(
                                "text-[8px] font-bold uppercase",
                                isActive
                                  ? "text-emerald-100"
                                  : "text-slate-400",
                              )}
                            >
                              {land.address || "Area"}
                            </p>
                          </div>
                          <span
                            className={cn(
                              "text-[9px] font-black ml-2 whitespace-nowrap",
                              isActive ? "text-white" : "text-emerald-600",
                            )}
                          >
                            {land.area_ha} Ha
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </ScrollArea>
              </Card>
            </div>
          </div>

          <div className="pointer-events-auto w-full max-w-6xl mx-auto md:px-4 mb-2 mt-2 md:mt-4">
            <Carousel
              plugins={[plugin]}
              className="w-full"
              opts={{ loop: true, align: "start" }}
            >
              <CarouselContent className="-ml-3 md:-ml-6">
                <CarouselItem className="pl-3 md:pl-6 basis-[85%] md:basis-1/2 lg:basis-1/3">
                  <StatCard
                    icon={<Droplets size={24} />}
                    label="Kelembapan Tanah"
                    value={`${activeLand?.sensor_data?.soil_moisture ?? 0}%`}
                    status={
                      activeLand?.health_status === "KRITIS"
                        ? "Waspada"
                        : "Optimal"
                    }
                    color="blue"
                    isAlert={activeLand?.health_status === "KRITIS"}
                  />
                </CarouselItem>
                <CarouselItem className="pl-3 md:pl-6 basis-[85%] md:basis-1/2 lg:basis-1/3">
                  <StatCard
                    icon={weatherConfig.icon}
                    label="Cuaca Sektor"
                    value={activeLand?.weather?.condition || "Cerah"}
                    status="Live"
                    color={weatherConfig.color}
                  />
                </CarouselItem>
                <CarouselItem className="pl-3 md:pl-6 basis-[85%] md:basis-1/2 lg:basis-1/3">
                  <StatCard
                    icon={<Leaf size={24} />}
                    label="Komoditas Lahan"
                    value={
                      activeLand?.current_commodity?.split(" ").pop() ||
                      "Kosong"
                    }
                    status="Sehat"
                    color="emerald"
                  />
                </CarouselItem>
                <CarouselItem className="pl-3 md:pl-6 basis-[85%] md:basis-1/2 lg:basis-1/3">
                  <StatCard
                    icon={<Wind size={24} />}
                    label="Laju Angin"
                    value={`${activeLand?.weather?.wind_speed ?? 0} m/s`}
                    status="Normal"
                    color="blue"
                  />
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </Card>
    </div>
  );
};
