import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const port = process.env.PORT || 3001;

// Use CORS middleware
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello from InfocusApp API!');
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
