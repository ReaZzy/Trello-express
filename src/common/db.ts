import { createConnection } from 'typeorm';
import { connectionOptions, envConfig } from '../ormconfig';

export const connectToDb = async () => {
  await createConnection(connectionOptions);
  console.log(`Connected to postgres on port ${envConfig.PORT}`);
};
