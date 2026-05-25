"use client";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import {
  MapPin,
  Sprout,
  MousePointer2,
  Layers,
  Navigation,
} from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

export default function LandMapSection() {
  const centerPosition = [-6.2, 106.816666];

  const farmLands = [
    {
      id: 1,
      name: "Lahan Mangrove A1",
      coord: [-6.21, 106.82],
      status: "Sehat",
    },
    {
      id: 2,
      name: "Area Pembibitan B2",
      coord: [-6.195, 106.81],
      status: "Butuh Air",
    },
  ];

  return (
    <section id="monitoring" className=" px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr,2.5fr] gap-16 items-start">
          <div className="lg:sticky lg:top-32">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-lg text-xs font-bold mb-6 tracking-wider">
              <Navigation size={14} />
              REAL-TIME GEOSPATIAL
            </div>

            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-slate-900 mb-6 leading-tight">
              Digitalisasi <br />
              <span className="text-green-600">Lahan Presisi.</span>
            </h2>

            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              Visualisasikan distribusi lahan dan status kesehatan tanaman
              secara geografis melalui integrasi
              <strong className="text-slate-900"> koordinat presisi.</strong>
            </p>

            <div className="grid gap-4">
              {[
                {
                  icon: <MapPin />,
                  label: "125+ Lahan Terdaftar",
                  sub: "Tersebar di 12 Wilayah",
                },
                {
                  icon: <Sprout />,
                  label: "4 Komoditas Utama",
                  sub: "Mangrove, Kelapa, dll",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="group flex gap-4 items-start p-5 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all duration-300"
                >
                  <div className="p-3 bg-white rounded-2xl text-green-600 shadow-sm group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{item.label}</p>
                    <p className="text-sm text-slate-500">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-4 bg-green-50/50 rounded-[3.5rem] -z-10 group-hover:bg-green-100/50 transition-colors duration-500" />

            <div className="aspect-[16/10] lg:aspect-[21/10] w-full rounded-[3rem] border-[10px] border-white shadow-2xl overflow-hidden relative z-10">
              <div className="absolute top-6 left-6 z-[1000] flex flex-col gap-2">
                <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white/50 flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest">
                    Sistem Koordinat Aktif
                  </span>
                </div>
              </div>

              <MapContainer
                center={centerPosition}
                zoom={13}
                scrollWheelZoom={false}
                zoomControl={false}
                className="w-full h-full z-0"
              >
                <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />

                <ZoomControl position="bottomright" />

                {farmLands.map((land) => (
                  <Marker key={land.id} position={land.coord} icon={customIcon}>
                    <Popup>
                      <div className="p-1">
                        <p className="font-bold text-slate-900">{land.name}</p>
                        <p className="text-xs text-green-600 font-semibold mb-2 italic">
                          Status: {land.status}
                        </p>
                        <button className="w-full bg-slate-900 text-white text-[10px] py-2 rounded-lg font-bold">
                          Detail Lahan
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>

              <div className="absolute bottom-6 left-6 z-[1000] bg-slate-900/90 backdrop-blur-md px-6 py-4 rounded-2xl text-white shadow-2xl flex gap-8 items-center border border-white/10">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">
                    Lat / Long
                  </p>
                  <p className="text-sm font-mono tracking-tighter">
                    6.2000° S, 106.8166° E
                  </p>
                </div>
                <div className="h-8 w-[1px] bg-white/20" />
                <div className="flex items-center gap-2">
                  <MousePointer2 size={16} className="text-green-400" />
                  <p className="text-xs font-bold">Klik Marker untuk Data AI</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
