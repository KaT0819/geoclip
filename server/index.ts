import 'dotenv/config';
import express from 'express';
import { Client } from '@googlemaps/google-maps-services-js';

const app = express();
const port = 3001;

const client = new Client({});

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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
