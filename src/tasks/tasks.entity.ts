import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from '../users/user.entity';
import Board from '../boards/board.entity';
import { Column as colum } from '../boards/column.entity';

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

  @ManyToOne(() => colum, { onDelete: 'SET NULL' })
  column!: colum;

  @Column({ nullable: true })
  columnId: string | null;
}
