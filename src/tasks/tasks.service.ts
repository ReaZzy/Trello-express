import { Injectable } from '@nestjs/common';
import Task from './tasks.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskDataDto } from './dto/task-data.dto';
import { TaskIdDto } from './dto/task-id.dto';
import { BoardIdDto } from '../boards/dto/board-id.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async findAll(boardId: BoardIdDto): Promise<Task[]> {
    return this.taskRepository.find({ where: { boardId } });
  }

  async create(taskData: TaskDataDto, boardId: BoardIdDto): Promise<Task> {
    const task = await this.taskRepository.create({
      ...taskData,
      boardId,
    });
    return this.taskRepository.save(task);
  }

  async findById(taskId: TaskIdDto): Promise<Task> {
    return this.taskRepository.findOne(taskId);
  }

  async update(taskData: TaskDataDto, taskId: TaskIdDto): Promise<Task> {
    const task = await this.taskRepository.findOne(taskId);
    return this.taskRepository.save({
      ...task,
      ...taskData,
    });
  }

  async delete(taskId: TaskIdDto): Promise<boolean> {
    const task = await this.taskRepository.delete(taskId);
    return !!task;
  }
}
