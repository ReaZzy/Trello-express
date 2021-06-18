import { ConnectionOptions } from 'typeorm';

export const config = {
  type: 'postgres',
  host: process.env.HOST,
  port: process.env.PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  logging: true,
} as ConnectionOptions;
