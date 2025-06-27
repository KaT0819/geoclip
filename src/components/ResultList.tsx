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
}

export function ResultList({ results }: ResultListProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-2">
      {results.map((result, index) => (
        <div key={index} className="p-2 border rounded">
          <p className="flex items-center">住所: {result.formatted_address} <button onClick={() => copyToClipboard(result.formatted_address)} className="ml-2 p-1 bg-gray-200 rounded text-sm">コピー</button></p>
          <p className="flex items-center">緯度: {result.geometry.location.lat} <button onClick={() => copyToClipboard(String(result.geometry.location.lat))} className="ml-2 p-1 bg-gray-200 rounded text-sm">コピー</button></p>
          <p className="flex items-center">経度: {result.geometry.location.lng} <button onClick={() => copyToClipboard(String(result.geometry.location.lng))} className="ml-2 p-1 bg-gray-200 rounded text-sm">コピー</button></p>
        </div>
      ))}
    </div>
  );
}
