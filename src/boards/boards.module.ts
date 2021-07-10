import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Board from './board.entity';
import { Column } from './column.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board, Column])],
  providers: [BoardsService],
  controllers: [BoardsController],
})
export class BoardsModule {}
