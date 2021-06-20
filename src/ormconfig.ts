import { join } from 'path';
import { ConnectionOptions } from 'typeorm';

const config = {
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
};

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: config.host,
  port: config.port || 5432,
  username: config.user || 'postgres',
  password: config.password || 'postgres',
  database: config.database || 'postgres',
  entities: [
    join(__dirname, './resources/**/*{.ts,.js}'),
  ],
  synchronize: false,
  dropSchema: false,
  migrationsRun: true,
  logging: true,
  migrations: [
    join(__dirname, '../migrations/*{.ts,.js}'),
  ],
  cli: {
    migrationsDir: './migrations',
  },
};

export default connectionOptions;
