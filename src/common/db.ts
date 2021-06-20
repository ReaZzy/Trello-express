import { createConnection } from 'typeorm';
import { envConfig } from './config';
import connectionOptions from '../ormconfig';

export const connectToDb = async () => {
  await createConnection(connectionOptions);
  console.log(`Connected to postgres on port ${envConfig.PORT}`);
};
