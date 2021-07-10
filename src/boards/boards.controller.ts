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
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { BoardsService } from './boards.service';
import { BoardDataDto } from './dto/board-data.dto';
import { BoardIdDto } from './dto/board-id.dto';
import { AuthGuard } from '../guards/authGuard';

@Controller('boards')
@UseGuards(AuthGuard)
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  async findAll(@Res() res: Response): Promise<Response> {
    const board = await this.boardsService.findAll();
    return res.status(HttpStatus.OK).send(board);
  }

  @Post()
  async create(
    @Res() res: Response,
    @Body() boardData: BoardDataDto,
  ): Promise<Response> {
    const board = await this.boardsService.create(boardData);
    return res.status(HttpStatus.CREATED).send(board);
  }

  @Get(':id')
  async findById(@Param() boardId: BoardIdDto, @Res() res: Response) {
    const board = await this.boardsService.findById(boardId);
    if (!board) {
      return res.status(HttpStatus.NOT_FOUND).send({ msg: 'Board not found' });
    }
    return res.status(HttpStatus.OK).send(board);
  }

  @Put(':id')
  async update(
    @Res() res: Response,
    @Body() boardUpdate: BoardDataDto,
    @Param() boardId: BoardIdDto,
  ): Promise<Response> {
    const board = await this.boardsService.update(boardUpdate, boardId);
    return res.status(HttpStatus.OK).send(board);
  }

  @Delete(':id')
  async delete(@Param('id') boardId: BoardIdDto, @Res() res: Response) {
    const board = await this.boardsService.delete(boardId);
    if (board) {
      return res
        .status(HttpStatus.NO_CONTENT)
        .send({ msg: 'The board has been deleted' });
    }
    return res.status(HttpStatus.NOT_FOUND).send({ msg: 'Board not found' });
  }
}
