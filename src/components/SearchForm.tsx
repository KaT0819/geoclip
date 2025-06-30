import React, { useState, useEffect } from 'react';

interface SearchFormProps {
  onSearch: (place: string) => void;
  onError?: (message: string) => void;
}

interface AutocompletePrediction {
  description: string;
  place_id: string;
}

/**
 * SearchForm component: renders an input for place and handles autocomplete suggestions.
 */
/**
 * SearchForm コンポーネント
 * - 入力フォームとオートコンプリート候補の表示
 * - onSearch / onError ハンドラを呼び出し
 */
export default function SearchForm({ onSearch, onError }: SearchFormProps) {
  const [place, setPlace] = useState('');
  const [suggestions, setSuggestions] = useState<AutocompletePrediction[]>([]);
  const [skipAutocompleteFetch, setSkipAutocompleteFetch] = useState(false);

  /**
   * フォーム送信ハンドラ
   * サジェストをクリアして onSearch を実行
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuggestions([]);
    onSearch(place);
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  /**
   * 入力変更時のオートコンプリート処理
   * place 変更から一定時間後に API 呼び出し
   */
  useEffect(() => {
    if (!place) {
      setSuggestions([]);
      return;
    }
    if (skipAutocompleteFetch) {
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/autocomplete?input=${encodeURIComponent(place)}`
        );
        if (!res.ok) {
          throw new Error(`Autocomplete API request failed: ${res.status}`);
        }
        const data = await res.json();
        setSuggestions(data.predictions || []);
      } catch (error) {
        console.error(error);
        onError?.('Error fetching autocomplete data.');
        setSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [place, skipAutocompleteFetch]);
  /* eslint-enable react-hooks/exhaustive-deps */

  /**
   * 候補クリック時ハンドラ
   * place を候補で置換し onSearch を実行
   */
  const handleSuggestionClick = (description: string) => {
    setSkipAutocompleteFetch(true);
    setPlace(description);
    setSuggestions([]);
    onSearch(description);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <div className="relative flex-grow">
        <input
          id="place-input"
          type="text"
          value={place}
          onChange={e => {
            setPlace(e.target.value);
            setSkipAutocompleteFetch(false);
          }}
          placeholder="地名を入力"
          autoComplete="off"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-800"
        />
        {suggestions.length > 0 && (
          <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto divide-y divide-gray-200">
            {suggestions.map(item => (
              <li
                key={item.place_id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700 text-sm"
                onMouseDown={() => handleSuggestionClick(item.description)}
              >
                {item.description}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow">
        検索
      </button>
    </form>
  );
}
