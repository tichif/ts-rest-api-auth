import mongoose from 'mongoose';
import config from 'config';

import log from '../utils/logger';

async function connect() {
  try {
    const dbUri = config.get<string>('mongoUri');

    await mongoose.connect(dbUri);
    log.info('Database is connected');
  } catch (error) {
    log.error(error);
    process.exit(1);
  }
}

export default connect;
