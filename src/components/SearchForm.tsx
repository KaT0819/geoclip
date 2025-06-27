import React, { useState, useEffect, useRef } from 'react';

interface SearchFormProps {
  onSearch: (place: string) => void;
}

declare global {
  interface Window {
    google: any;
  }
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const [place, setPlace] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (window.google && inputRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ['geocode'], // 地名のみを検索対象とする
        componentRestrictions: { country: 'jp' }, // 日本国内に限定
      });

      autocomplete.addListener('place_changed', () => {
        const selectedPlace = autocomplete.getPlace();
        if (selectedPlace.formatted_address) {
          setPlace(selectedPlace.formatted_address);
          onSearch(selectedPlace.formatted_address);
        }
      });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(place);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        ref={inputRef} // refをinput要素にアタッチ
        value={place}
        onChange={(e) => setPlace(e.target.value)}
        placeholder="地名を入力"
        className="flex-grow p-2 border rounded"
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        検索
      </button>
    </form>
  );
}
