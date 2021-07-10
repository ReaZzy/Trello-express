import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskDataDto } from './dto/task-data.dto';
import { TaskIdDto } from './dto/task-id.dto';
import { Response } from 'express';
import { BoardIdDto } from '../boards/dto/board-id.dto';
import { AuthGuard } from '../guards/authGuard';

@Controller('boards/:boardId/tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async findAll(
    @Res() res: Response,
    @Param('boardId') boardId: BoardIdDto,
  ): Promise<Response> {
    const task = await this.tasksService.findAll(boardId);
    return res.status(HttpStatus.OK).send(task);
  }

  @Post()
  async create(
    @Res() res: Response,
    @Body() taskData: TaskDataDto,
    @Param('boardId') boardId: BoardIdDto,
  ): Promise<Response> {
    const task = await this.tasksService.create(taskData, boardId);
    return res.status(HttpStatus.CREATED).send(task);
  }

  @Get(':id')
  async findById(
    @Param('id') taskId: TaskIdDto,
    @Res() res: Response,
  ): Promise<Response> {
    const task = await this.tasksService.findById(taskId);
    if (!task) {
      return res.status(HttpStatus.NOT_FOUND).send({ msg: 'Board not found' });
    }
    return res.status(HttpStatus.OK).send({ ...task });
  }

  @Put(':id')
  async update(
    @Res() res: Response,
    @Body() taskData: TaskDataDto,
    @Param('id') taskId: TaskIdDto,
  ): Promise<Response> {
    const task = await this.tasksService.update(taskData, taskId);
    return res.status(HttpStatus.OK).send(task);
  }

  @Delete(':id')
  async delete(
    @Param('id') taskId: TaskIdDto,
    @Res() res: Response,
  ): Promise<Response> {
    const task = await this.tasksService.delete(taskId);
    if (task) {
      return res
        .status(HttpStatus.NO_CONTENT)
        .send({ msg: 'The task has been deleted' });
    }
    return res.status(HttpStatus.NOT_FOUND).send({ msg: 'Task not found' });
  }
}
