import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import Board from './board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardDataDto } from './dto/board-data.dto';
import { BoardIdDto } from './dto/board-id.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardsRepository: Repository<Board>,
  ) {}

  async findAll(): Promise<Board[]> {
    return this.boardsRepository.find();
  }

  async create(boardData: BoardDataDto): Promise<Board> {
    const board = this.boardsRepository.create(boardData);
    await this.boardsRepository.save(board);
    return board;
  }

  async findById(boardId: BoardIdDto): Promise<Board> {
    return this.boardsRepository.findOne(boardId);
  }

  async update(boardUpdate: BoardDataDto, boardId: BoardIdDto): Promise<Board> {
    const board = await this.boardsRepository.findOne(boardId);
    return this.boardsRepository.save({
      ...board,
      ...boardUpdate,
    });
  }

  async delete(boardId: BoardIdDto): Promise<boolean> {
    const board = await this.boardsRepository.delete(boardId);
    return !!board;
  }
}
