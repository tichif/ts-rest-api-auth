import express from 'express';
import client from 'prom-client';

import log from './logger';

const app = express();

export function startMetricServer() {
  // set default metrics
  const collectDefaultMetric = client.collectDefaultMetrics;
  collectDefaultMetric();

  app.get('/metrics', async (req, res) => {
    res.setHeader('Content-Type', client.register.contentType);
    return res.send(await client.register.metrics());
  });

  app.listen(9100, () => {
    log.info('Metric server started at http://localhost:9100');
  });
}
