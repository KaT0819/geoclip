import React from 'react';

interface ResultListProps {
  /** 検索キーワードから抽出した地名 */
  landmarkName: string;
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
 * - 検索地名（名称）を表示
 * - Geocoding API の結果住所・緯度・経度を表示
 * - 各フィールド毎のコピー機能を提供
 */
export function ResultList({ landmarkName, results, onCopy }: ResultListProps) {
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
          {landmarkName && (
            <p className="flex items-center p-1">
              <span className="pr-2 font-bold whitespace-nowrap">名称:</span><span>{landmarkName}</span>
              <button
                onClick={() => copyToClipboard(landmarkName, '名称')}
                className="ml-2 p-1 bg-gray-200 rounded text-sm whitespace-nowrap"
              >
                コピー
              </button>
            </p>
          )}
          <p className="flex items-center p-1">
            <span className="pr-2 font-bold whitespace-nowrap">住所:</span><span>{result.formatted_address}</span>
            <button onClick={() => copyToClipboard(result.formatted_address, '住所')} className="ml-2 p-1 bg-gray-200 rounded text-sm whitespace-nowrap">
              コピー
            </button>
          </p>
          <p className="flex items-center py-2 px-1">
            <span className="pr-2 font-bold whitespace-nowrap">緯度:</span><span>{result.geometry.location.lat.toFixed(7)}</span>
            <button onClick={() => copyToClipboard(String(result.geometry.location.lat), '緯度')} className="ml-2 p-1 bg-gray-200 rounded text-sm whitespace-nowrap">
              コピー
            </button>
          </p>
          <p className="flex items-center p-1">
            <span className="pr-2 font-bold whitespace-nowrap">経度:</span><span>{result.geometry.location.lng.toFixed(7)}</span>
            <button onClick={() => copyToClipboard(String(result.geometry.location.lng), '経度')} className="ml-2 p-1 bg-gray-200 rounded text-sm whitespace-nowrap">
              コピー
            </button>
          </p>
        </div>
      ))}
    </div>
  );
}
