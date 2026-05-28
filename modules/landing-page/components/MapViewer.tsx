"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl,
} from "react-leaflet";

const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

export default function MapViewer({ centerPosition, farmLands }: any) {
  return (
    <MapContainer
      center={centerPosition}
      zoom={13}
      scrollWheelZoom={false}
      zoomControl={false}
      className="w-full h-full z-0"
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
      <ZoomControl position="bottomright" />

      {farmLands.map((land: any) => (
        <Marker key={land.id} position={land.coord} icon={customIcon}>
          <Popup>
            <div className="p-1 min-w-[150px]">
              <p className="font-bold text-slate-900">{land.name}</p>
              <p className="text-xs text-green-600 font-semibold mb-2 italic">
                Status: {land.status}
              </p>
              <button className="w-full bg-slate-900 text-white text-[10px] py-2 rounded-lg font-bold hover:bg-slate-800 transition-colors">
                Detail Lahan
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
