import {
  Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany,
} from 'typeorm';

import { ColumnType } from '../../types';
// eslint-disable-next-line import/no-cycle
import { Column as column } from './column.model';

@Entity('Board')
export default class Board extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 120 })
  title: string;

  @OneToMany(
    () => column,
    (colum) => colum.board,
    { onDelete: 'CASCADE', cascade: true, eager: true },
  )
  columns!: ColumnType[];
}
