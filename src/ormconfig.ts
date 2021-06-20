import { join } from 'path';
import { ConnectionOptions } from 'typeorm';
import * as path from 'path';

const dotenv = require('dotenv');

dotenv.config({
  path: path.join(__dirname, '../.env'),
});

const config = {
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
};

const connectionOptions = {
  type: 'postgres',
  host: config.host,
  port: config.port,
  username: config.user,
  password: config.password,
  database: config.database,
  migrationsRun: true,
  synchronize: false,
  logging: true,
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectionInterval: 1000,
  entities: [
    join(__dirname, './resources/**/*{.ts,.js}'),
  ],
  migrations: [
    join(__dirname, '../migrations/*{.ts,.js}'),
  ],
  cli: {
    migrationsDir: './migrations',
  },
} as ConnectionOptions;

export const envConfig = {
  PORT: process.env.PORT,
};
export default connectionOptions;
