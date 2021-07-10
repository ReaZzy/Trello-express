import {
  Entity,
  PrimaryGeneratedColumn,
  Column as ColumnORM,
  BaseEntity,
} from 'typeorm';
import { Column } from './column.entity';

@Entity('Board')
export default class Board extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ColumnORM('varchar', { length: 120 })
  title: string;

  @ColumnORM('simple-json')
  columns: Column[];
}
