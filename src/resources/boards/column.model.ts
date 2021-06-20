import {
  Entity, PrimaryGeneratedColumn, Column as Colum, BaseEntity, ManyToOne,
} from 'typeorm';
import { BoardType } from '../../types';
// eslint-disable-next-line import/no-cycle
import Board from './boards.model';

@Entity('Column')
export class Column extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Colum('varchar', { length: 120 })
  title: string;

  @Colum()
  order: number;

  @ManyToOne(() => Board, { onDelete: 'CASCADE' })
  board!: BoardType;
}
