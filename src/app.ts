import express from 'express';
require('dotenv').config();
import config from 'config';
import cors from 'cors';

import connect from './utils/connect';
import log from './utils/logger';
import routes from './routes';

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
routes(app);

const PORT = config.get<number>('port');

app.listen(PORT, async () => {
  log.info(`App is running on port ${PORT}`);
  await connect();
});
