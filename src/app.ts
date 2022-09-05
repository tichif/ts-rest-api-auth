import express from 'express';
require('dotenv').config();
import config from 'config';
import cors from 'cors';

import connect from './utils/connect';

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes

const PORT = config.get<number>('port');

app.listen(PORT, async () => {
  console.log(`App is running on port ${PORT}`);
  await connect();
});
