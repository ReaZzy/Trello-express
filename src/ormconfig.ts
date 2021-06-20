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
  port: config.port,
  username: config.user,
  password: config.password,
  database: config.database,
  migrationsRun: true,
  synchronize: false,
  logging: true,
  entities: [
    join(__dirname, './resources/**/*{.ts,.js}'),
  ],
  migrations: [
    join(__dirname, '../migrations/*{.ts,.js}'),
  ],
  cli: {
    migrationsDir: './migrations',
  },
};

export default connectionOptions;
