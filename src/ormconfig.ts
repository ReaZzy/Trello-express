import { ConnectionOptions } from 'typeorm';
import * as path from 'path';
import * as dotenv from 'dotenv';
import User from './users/user.entity';
import Task from './tasks/tasks.entity';
import Board from './boards/board.entity';
import { Column } from './boards/column.entity';

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
  migrationsRun: false,
  synchronize: false,
  logging: true,
  keepConnectionAlive: true,
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectionInterval: 1000,
  entities: [User, Task, Board, Column],
  migrations: [path.join(__dirname, './migrations/*{.ts,.js}')],
  cli: {
    migrationsDir: './migrations',
  },
} as ConnectionOptions;

export default connectionOptions;
