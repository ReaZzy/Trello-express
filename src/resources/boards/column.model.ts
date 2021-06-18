import { ColumnType } from '../../types';

const { v4: uuid } = require('uuid');

export class Column implements ColumnType {
  id: string;

  title: string;

  order: number;

  constructor({
    id = uuid(),
    title = 'Title',
    order = 1,
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}
