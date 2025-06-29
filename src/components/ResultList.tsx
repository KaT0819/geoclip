import React from 'react';

interface ResultListProps {
  results: {
    formatted_address: string;
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  }[];
  onCopy: (message: string) => void;
}

/**
 * ResultList コンポーネント
 * - Geocoding API の結果住所・緯度・経度を表示
 * - 各フィールド毎のコピー機能を提供
 */
export function ResultList({ results, onCopy }: ResultListProps) {
  /**
   * テキストをクリップボードにコピーして通知
   * @param text コピー対象文字列
   * @param fieldName フィールド名（通知メッセージ用）
   */
  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    onCopy(`${fieldName}をコピーしました！`);
  };

  return (
    <div className="space-y-2">
      {results.map((result, index) => (
        <div key={index} className="p-2 border rounded">
          <p className="flex items-center p-1">住所: {result.formatted_address} <button onClick={() => copyToClipboard(result.formatted_address, '住所')} className="ml-2 p-1 bg-gray-200 rounded text-sm">コピー</button></p>
          <p className="flex items-center py-2 px-1">緯度: {result.geometry.location.lat.toFixed(7)} <button onClick={() => copyToClipboard(String(result.geometry.location.lat), '緯度')} className="ml-2 p-1 bg-gray-200 rounded text-sm">コピー</button></p>
          <p className="flex items-center p-1">経度: {result.geometry.location.lng.toFixed(7)} <button onClick={() => copyToClipboard(String(result.geometry.location.lng), '経度')} className="ml-2 p-1 bg-gray-200 rounded text-sm">コピー</button></p>
        </div>
      ))}
    </div>
  );
}
