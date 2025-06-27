import React, { useState } from 'react';

interface SearchFormProps {
  onSearch: (place: string) => void;
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const [place, setPlace] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(place);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
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
