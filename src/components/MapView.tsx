import { useEffect, useRef } from 'react';
import L from 'leaflet';

export function MapView({ lat, lng }: { lat: number; lng: number }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView([lat, lng], 16);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(mapInstance.current);
    } else {
      mapInstance.current.setView([lat, lng], 16);
    }

    L.marker([lat, lng]).addTo(mapInstance.current);

  }, [lat, lng]);

  return <div ref={mapRef} style={{ height: '400px', width: '100%' }} />;
}
