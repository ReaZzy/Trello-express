import * as path from 'path';
import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';
import User from './users/user.entity';

dotenv.config({
  path: path.join(__dirname, '../.env'),
});

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      migrationsRun: true,
      synchronize: false,
      logging: true,
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectionInterval: 1000,
      entities: [User],
      migrations: [path.join(__dirname, '../migrations/*{.ts,.js}')],
      cli: {
        migrationsDir: './migrations',
      },
    } as ConnectionOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
