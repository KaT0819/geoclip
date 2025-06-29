import { useEffect, useRef } from 'react';
import L from 'leaflet';

/**
 * MapView コンポーネント
 * - 指定座標(lat,lng)を中心に Leaflet 地図を描画
 */
export function MapView({ lat, lng }: { lat: number; lng: number }) {
  // 地図描画先の DOM 要素
  const mapRef = useRef<HTMLDivElement>(null);
  // Leaflet マップインスタンスを保持
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    if (!mapInstance.current) {
      // 初回マウント時: 地図インスタンスを生成
      mapInstance.current = L.map(mapRef.current).setView([lat, lng], 16);
      // タイルレイヤーに OpenStreetMap を設定
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(mapInstance.current);
    } else {
      // 2回目以降は中心座標のみ更新
      mapInstance.current.setView([lat, lng], 16);
    }

    // マーカーを追加
    L.marker([lat, lng]).addTo(mapInstance.current);
  }, [lat, lng]);

  return <div ref={mapRef} style={{ height: '400px', width: '100%' }} />;
}
