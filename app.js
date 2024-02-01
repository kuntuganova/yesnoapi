const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;
const URL = process.env.URL;
const API_URL = process.env.API_URL;

app.get('/healthz', async (req, res) => {
  try {
    if (!URL) {
      throw new Error('URL is not defined');
    }

    const response = await axios.head(URL);

    if (response.status === 404) {
      res.status(500).json({ error: 'Health check failed' });
    } else {
      res.sendStatus(200);
    }
  } catch (err) {
    console.error(err);

    if (axios.isAxiosError(err)) {
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
});

app.get('/random', async (req, res) => {
  try {
    const response = await axios.get(API_URL);
    const { answer, image } = response.data;

    if (answer === 'maybe') {
      res.status(500);
    }

    res.json({ answer, image });
  } catch (err) {
    console.error(err);

    if (axios.isAxiosError(err)) {
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
