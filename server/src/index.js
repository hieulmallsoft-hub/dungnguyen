const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const homeData = require('./homeData');

const app = express();
const PORT = Number(process.env.PORT || 5050);
const clientDistPath = path.resolve(__dirname, '../../client/dist');

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'viec3mien-server' });
});

app.get('/api/home-data', (_req, res) => {
  res.json(homeData);
});

if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) {
      next();
      return;
    }
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
} else {
  app.get('/', (_req, res) => {
    res.send('Viec3mien API is running. Build client first to serve frontend from Node server.');
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
