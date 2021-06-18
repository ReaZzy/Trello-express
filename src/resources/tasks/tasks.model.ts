import { v4 as uuid } from 'uuid';
import { TaskType } from '../../types';

export default class Task implements TaskType {
  id: string;

  title: string;

  order: number;

  description: string;

  userId: string | null;

  boardId: string;

  columnId: string;

  constructor({
    id = uuid(),
    title = 'null',
    order = 1,
    description = 'null',
    userId = 'null',
    boardId = 'null',
    columnId = 'null',
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}
