* **アプリ名**
  Geoclip

* **概要**
  地名・ランドマークから住所・緯度・経度を検索し、結果を一覧表示・クリップボードコピー＆地図表示を行うWebアプリ

* **技術選定**

  1. フロントエンド：React + TypeScript
  2. スタイリング：CSS（Tailwind等任意）
  3. 地図表示：Leaflet + OpenStreetMap（無料・サーバ不要）
  4. 住所→座標取得：Google Maps Geocoding API（既存API利用）

* **主要機能**

  1. 検索フォーム

     * テキスト入力（プレースホルダー「地名を入力」）
     * 入力補完（Places APIによるオートコンプリート候補表示）
     * 入力保持（ローカルストレージに検索キーワードを保存・復元）
     * 検索ボタン押下でGeocoding API呼び出し
  2. 結果表示エリア

     * 住所・緯度・経度をテキストフィールドで表示
     * 各行にコピーアイコン（クリックでクリップボードへコピー）
  3. 地図表示エリア

     * 検索結果の座標にマーカーを表示
     * ズーム／パン操作対応
     * 読み込み時のローディングインジケーター

* **環境構築手順**

  1. プロジェクト作成

     ```bash
     npx create-react-app geoclip --template typescript
     ```
  2. 依存パッケージインストール

     ```bash
     npm install leaflet
     ```
  3. Leaflet用CSS読み込み

     ```html
     <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
     ```

  4. Google Maps Places APIスクリプト読み込みと環境変数設定

     プロジェクトルートに `.env` ファイルを作成し、`.env.sample` を参考に Google Maps APIキーを設定します。

     ```bash
     cp .env.sample .env
     ```

     `public/index.html` の `<body>` タグ内（または `<head>` の最後）に以下を追加します。

     ```html
     <script async defer src="https://maps.googleapis.com/maps/api/js?key=%REACT_APP_GOOGLE_MAPS_API_KEY%&libraries=places"></script>
     ```

* **主要コンポーネント設計**

  1. `SearchForm`

     * 入力＆ボタン、検索イベント発火
  2. `ResultList`

     * `formatted_address`, `lat`, `lng` を受け取り表示＆コピー
  3. `MapView`

     ```tsx
     import { useEffect, useRef } from 'react';
     import L from 'leaflet';

     export function MapView({ lat, lng }: { lat: number; lng: number }) {
       const mapRef = useRef<HTMLDivElement>(null);
       useEffect(() => {
         if (!mapRef.current) return;
         const map = L.map(mapRef.current).setView([lat, lng], 13);
         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
           attribution: '&copy; OpenStreetMap contributors',
         }).addTo(map);
         L.marker([lat, lng]).addTo(map);
       }, [lat, lng]);
       return <div ref={mapRef} style={{ height: '300px', width: '100%' }} />;
     }
     ```
  4. `App.tsx`

     * 状態管理（住所・座標）＋各コンポーネント配置

* **API呼び出し例**

  ```ts
  async function geocode(place: string) {
    const res = await fetch(
      `/api/geocode?address=${encodeURIComponent(place)}`
    );
    return res.json();
  }
  ```

* **デプロイ／運用**

  1. テスト：Jest + React Testing Library
  2. 静的ホスティング：Vercel／Netlify
  3. 環境変数：APIキーは `.env` で管理

     プロジェクトルートに `.env` ファイルを作成し、`.env.sample` を参考に `REACT_APP_GOOGLE_MAPS_API_KEY` を設定します。
  4. OSM利用：タイルアクセス負荷に注意（必要に応じてキャッシュ）

* **注意事項／今後の拡張**

  * Geocoding APIの利用上限管理（現在の無料枠内運用）
  * モバイルレスポンシブ最適化
  * ローディング・エラーハンドリング強化
