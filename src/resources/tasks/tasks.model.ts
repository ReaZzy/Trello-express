import {
  BaseEntity,
  Column, Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import User from '../users/user';
import { Column as Colum } from '../boards/column.model';
import Board from '../boards/boards.model';
import { TaskType } from '../../types';

@Entity('Task')
export default class Task extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 120 })
  title: string;

  @Column()
  order: number;

  @Column()
  description: string;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  user!: User;

  @Column({ nullable: true })
  userId: string | null;

  @ManyToOne(() => Board, { onDelete: 'CASCADE' })
  board!: Board;

  @Column({ nullable: true })
  boardId: string;

  @ManyToOne(() => Colum, { onDelete: 'SET NULL' })
  column!: Colum;

  @Column({ nullable: true })
  columnId: string | null;

  constructor(
    boardId: string,
    {
      id = uuid(),
      title = '',
      order = 0,
      description = '',
      columnId = null,
      userId = null,
    }: Partial<TaskType> = {},
  ) {
    super();
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.boardId = boardId;
    this.columnId = columnId;
    this.userId = userId;
  }
}
