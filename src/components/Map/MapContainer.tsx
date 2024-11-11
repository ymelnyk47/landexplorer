'use client';

import { useEffect } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function Map() {
  useEffect(() => {
    // Fix for Leaflet markers
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: '/markers/marker-icon-2x.png',
      iconUrl: '/markers/marker-icon.png',
      shadowUrl: '/markers/marker-shadow.png',
    });
  }, []);

  return (
    <div className="h-full w-full">
      <MapContainer
        center={[39.8283, -98.5795]}
        zoom={4}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    </div>
  );
}