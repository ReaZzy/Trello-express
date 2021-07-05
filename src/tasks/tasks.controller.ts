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
import Task from './tasks.entity';
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
  async findAll(@Param('boardId') boardId: BoardIdDto): Promise<Task[]> {
    return this.tasksService.findAll(boardId);
  }

  @Post()
  async create(
    @Body() taskData: TaskDataDto,
    @Param('boardId') boardId: BoardIdDto,
  ): Promise<Task> {
    return this.tasksService.create(taskData, boardId);
  }

  @Get(':id')
  async findById(@Param('id') taskId: TaskIdDto, @Res() res: Response) {
    const task = await this.tasksService.findById(taskId);
    if (!task) {
      return res.status(HttpStatus.NOT_FOUND).json({ msg: 'Board not found' });
    }
    return res.status(HttpStatus.OK).json({ ...task });
  }

  @Put(':id')
  async update(
    @Body() taskData: TaskDataDto,
    @Param('id') taskId: TaskIdDto,
  ): Promise<Task> {
    return this.tasksService.update(taskData, taskId);
  }

  @Delete(':id')
  async delete(@Param('id') taskId: TaskIdDto, @Res() res: Response) {
    const task = await this.tasksService.delete(taskId);
    if (task) {
      return res
        .status(HttpStatus.NO_CONTENT)
        .json({ msg: 'The task has been deleted' });
    }
    return res.status(HttpStatus.NOT_FOUND).json({ msg: 'Task not found' });
  }
}
