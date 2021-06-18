import { v4 as uuid } from 'uuid';
import { BoardType, ColumnType } from '../../types';
import { Column } from './column.model';

export default class Board implements BoardType {
  id: string;

  title: string;

  columns: Array<ColumnType>;

  constructor({
    id = uuid(),
    title = 'Title',
    columns = [],
  } = {} as BoardType) {
    this.id = id;
    this.title = title;
    this.columns = columns.map(
      (column:ColumnType) => new Column({ title: column.title, order: column.order }),
    );
  }
}
