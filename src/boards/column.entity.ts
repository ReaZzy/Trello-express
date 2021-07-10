import {
  Entity,
  PrimaryGeneratedColumn,
  Column as Colum,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import Board from './board.entity';

@Entity('Column')
export class Column extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Colum('varchar', { length: 120 })
  title: string;

  @Colum()
  order: number;

  @ManyToOne(() => Board, { onDelete: 'CASCADE' })
  board!: Board;
}
