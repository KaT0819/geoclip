# Geoclip

Geoclip は、地名やランドマークから住所・緯度・経度を検索し、結果を表示・コピー・地図表示まで一貫して行えるシンプルな Web アプリケーションです。

---

## 🎯 主な機能

- **オートコンプリート検索**: Google Places API を使った入力候補表示
- **Geocoding**: Google Geocoding API による住所→緯度・経度変換
- **結果コピー**: 住所・緯度・経度をクリップボードにコピー
- **地図表示**: Leaflet + OpenStreetMap で検索結果をマーカー表示
- **トースト通知**: 処理成功／失敗を画面端に一時表示

---

## 📁 リポジトリ構成

```
geoclip/
├─ server/                # Express による API プロキシ
│   └─ index.ts           # Autocomplete/Geocoding エンドポイント
├─ src/                   # React アプリケーション本体
│   ├─ components/        # UI コンポーネント群
│   │   ├─ SearchForm.tsx  # 検索フォーム・オートコンプリート
│   │   ├─ ResultList.tsx  # 検索結果リスト・コピー機能
│   │   ├─ MapView.tsx     # Leaflet 地図描画
│   │   └─ ToastNotification.tsx # トースト通知
│   ├─ App.tsx            # コンポーネント連携・状態管理
│   └─ index.tsx          # エントリポイント
├─ public/                # 静的ファイル (index.html など)
├─ build/                 # production ビルド成果物
├─ dist/                  # サーバー用ビルド成果物
├─ .env.sample            # 環境変数サンプル (APIキー設定)
├─ package.json           # npm スクリプト & 依存管理
└─ tsconfig*.json         # TypeScript 設定ファイル
```

---

## ⚙️ 環境構築・実行方法

### 前提
- Node.js (v14 以上推奨)
- npm または Yarn

### セットアップ
```bash
# リポジトリを clone
git clone <リポジトリURL>
cd geoclip

# 環境変数ファイル作成 (.env.sample をコピー)
cp .env.sample .env
# .env に Google Maps API キーを設定

# 依存インストール
npm install
```

### 開発モード
```bash
# サーバー＋クライアントを並行起動
npm run dev

# クライアント: http://localhost:3003
# サーバー : http://localhost:3001
```

### プロダクションビルド & 起動
```bash
# ビルド (クライアント + サーバー)
npm run build

# サーバー起動 (静的配信 + API)
npm run serve
```

---

## 🔧 スクリプト一覧 (package.json)

| コマンド          | 説明                                  |
| :--------------- | :------------------------------------- |
| `npm run dev`    | クライアント (CRA) & サーバー (Express) の同時起動 |
| `npm run build`  | クライアントの production ビルド & サーバー TypeScript コンパイル |
| `npm run serve`  | `dist/index.js` による production サーバー起動 |
| `npm test`       | テスト実行 (Jest + RTL)                |
| `npm run eject`  | CRA の設定を ejected する (注意：一方向) |

---

## 📖 技術スタック

- フロントエンド: React + TypeScript + Tailwind CSS
- バックエンド: Node.js + Express
- 地図描画: Leaflet + OpenStreetMap
- オートコンプリート/ジオコーディング: Google Maps API (Places, Geocoding)

---

## 📝 ライセンス
MIT