import {
  Entity, PrimaryGeneratedColumn, Column, BaseEntity,
} from 'typeorm';

// eslint-disable-next-line import/no-cycle
import { Column as column } from './column.model';

@Entity('Board')
export default class Board extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 120 })
  title: string;

  @Column('simple-json')
  columns: column[];
}
