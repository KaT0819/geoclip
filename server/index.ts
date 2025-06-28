import 'dotenv/config';
import express from 'express';
import { Client } from '@googlemaps/google-maps-services-js';
import path from 'path';

const app = express();
const port = process.env.PORT || 3001; // 環境変数PORTがあればそれを使用、なければ3001

const client = new Client({});

// フロントエンドのビルド済みファイルを配信
app.use(express.static(path.join(__dirname, '../build')));

app.get('/api/geocode', async (req, res) => {
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

// その他のリクエストはReactアプリにルーティング
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
