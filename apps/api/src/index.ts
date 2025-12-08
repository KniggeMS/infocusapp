import express from 'express';

// This comment is here to force a cache reset on Railway.

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ status: 'API is running!' });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
