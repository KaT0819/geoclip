import React, { useState, useCallback } from 'react';
import SearchForm from './components/SearchForm';
import { ResultList } from './components/ResultList';
import { MapView } from './components/MapView';
import { ToastNotification } from './components/ToastNotification';

// Geocoding APIのレスポンスの型を定義
interface GeocodeResult {
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

/**
 * アプリケーションのメインコンポーネント
 * - 検索キーワードを SearchForm から受け取り Geocoding API を呼出し結果を管理
 * - ResultList, MapView, ToastNotification を連携して表示
 */
function App() {
  // Geocoding API の結果リスト
  const [results, setResults] = useState<GeocodeResult[]>([]);
  const [landmarkName, setLandmarkName] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  /**
   * 検索イベントハンドラ
   * @param place - 検索キーワード（地名）
   */
  const handleSearch = useCallback(async (place: string) => {
    try {
      const landmarkName = place.trim().split(' ').filter(Boolean).pop() ?? '';
      setLandmarkName(landmarkName);

      const res = await fetch(`/api/geocode?address=${encodeURIComponent(place)}`);
      if (!res.ok) {
        throw new Error('Geocoding API request failed');
      }
      const data = await res.json();
      setResults(data.results);
      if (data.results.length > 0) {
        setSelectedLocation(data.results[0].geometry.location);
      }
    } catch (error) {
      console.error(error);
      // Handle error appropriately in a real app
    }
  }, []);

  /**
   * コピー成功時のトースト表示ハンドラ
   * @param message - 表示メッセージ
   */
  const handleCopy = useCallback((message: string) => {
    setToastMessage(message);
    setShowToast(true);
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Geoclip</h1>
      {/* 検索フォーム: オートコンプリート＋検索イベント */}
      <SearchForm
        onSearch={handleSearch}
        onError={(msg: string) => {
          setToastMessage(msg);
          setShowToast(true);
        }}
      />
      <div className="mt-4">
        <ResultList landmarkName={landmarkName} results={results} onCopy={handleCopy} />
      </div>
      <div className="mt-4">
        {/* 検索結果の座標に基づき地図表示 */}
        {selectedLocation ? (
          <MapView lat={selectedLocation.lat} lng={selectedLocation.lng} />
        ) : (
          <div className="h-64 bg-gray-200 flex items-center justify-center">
            <p>地図をここに表示します</p>
          </div>
        )}
      </div>
      <ToastNotification message={toastMessage} show={showToast} onClose={() => setShowToast(false)} />
    </div>
  );
}

export default App;
