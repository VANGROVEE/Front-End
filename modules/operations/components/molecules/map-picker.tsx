"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface MapPickerProps {
  lat: string | null;
  lng: string | null;
  onChange: (lat: string, lng: string) => void;
}

function LocationMarker({
  position,
  setPosition,
}: {
  position: L.LatLng | null;
  setPosition: (pos: L.LatLng) => void;
}) {
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  useEffect(() => {
    if (position) {
      map.flyTo(position, 15);
    }
  }, [map, position]);

  return position === null ? null : <Marker position={position} />;
}

export default function MapPicker({ lat, lng, onChange }: MapPickerProps) {
  const position = lat && lng ? new L.LatLng(parseFloat(lat), parseFloat(lng)) : null;

  const defaultCenter: [number, number] = [-1.610122, 103.61312];

  return (
    <div className="z-0 h-64 w-full overflow-hidden rounded-xl border border-slate-200 shadow-sm">
      <MapContainer
        center={position || defaultCenter}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker
          position={position}
          setPosition={(pos) => onChange(pos.lat.toString(), pos.lng.toString())}
        />
      </MapContainer>
    </div>
  );
}
