import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { BoardsService } from './boards.service';
import Board from './board.entity';
import { BoardDataDto } from './dto/board-data.dto';
import { BoardIdDto } from './dto/board-id.dto';
import { DeleteResult } from 'typeorm';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  async findAll(): Promise<Board[]> {
    return this.boardsService.findAll();
  }

  @Post()
  async create(@Body() boardData: BoardDataDto): Promise<Board> {
    return this.boardsService.create(boardData);
  }

  @Get(':id')
  async findById(@Param() boardId: BoardIdDto): Promise<Board> {
    return this.boardsService.findById(boardId);
  }

  @Put(':id')
  async update(
    @Body() boardUpdate: BoardDataDto,
    @Param() boardId: BoardIdDto,
  ): Promise<Board> {
    return this.boardsService.update(boardUpdate, boardId);
  }

  @Delete(':id')
  async delete(@Param() boardId: BoardIdDto, @Res() res: Response) {
    const board = await this.boardsService.delete(boardId);
    if (board) {
      return res
        .status(HttpStatus.NO_CONTENT)
        .json({ msg: 'The board has been deleted' });
    }
    return res.status(HttpStatus.NOT_FOUND).json({ msg: 'Board not found' });
  }
}
