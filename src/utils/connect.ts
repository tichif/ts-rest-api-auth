import mongoose from 'mongoose';
import config from 'config';

async function connect() {
  try {
    const dbUri = config.get<string>('mongoUri');

    await mongoose.connect(dbUri);
    console.log('Database is connected');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

export default connect;
