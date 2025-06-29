/**
 * Express サーバー: React クライアントの静的配信および
 * Google Places/Geocoding API へのプロキシを提供
 */
// 型定義ミスマッチによるビルドエラーを抑制
// @ts-nocheck
import 'dotenv/config';
import express from 'express';
import { Client } from '@googlemaps/google-maps-services-js';
import * as path from 'path';

// Express アプリケーション初期化
const app = express();
// サーバー起動ポート (環境変数 PORT を優先)
const port = process.env.PORT || 3001;

const client = new Client({});

/**
 * React アプリのビルド成果物 (build フォルダ) を静的配信
 */
app.use(express.static(path.join(__dirname, '../build')));
/**
 * GET /api/autocomplete
 * リクエストパラメータ input に基づき Google Places Autocomplete API を呼び出す
 * ブラウザの CORS 制限回避のためサーバー経由でプロキシ
 */
app.get('/api/autocomplete', async (req: express.Request, res: express.Response) => {
  const input = req.query.input as string;
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key is not set.' });
  }
  try {
    const response = await client.placeAutocomplete({
      params: { key: apiKey, input, language: 'ja' },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch autocomplete data' });
  }
});

/**
 * GET /api/geocode
 * リクエストパラメータ address に基づき Google Geocoding API を呼び出す
 */
app.get('/api/geocode', async (req: express.Request, res: express.Response) => {
  const address = req.query.address as string;
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  console.log(`Received request for address: ${address}`);

  if (!apiKey) {
    return res.status(500).json({ error: 'API key is not set.' });
  }

  try {
    const response = await client.geocode({
      params: {
        key: apiKey,
        address: address,
        language: 'ja',
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch geocoding data' });
  }
});

/**
 * SPA 対応: 上記 API 以外の全リクエストは React の index.html を返却
 * '*' だと path-to-regexp v6 でエラーになるため '/*' を使用
 */
app.get('/*', (req: express.Request, res: express.Response) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

/**
 * サーバー起動
 */
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
