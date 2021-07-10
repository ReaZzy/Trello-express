import { v4 as uuid } from 'uuid';
export default class Task {
    constructor({ id = uuid(), title = 'null', order = 1, description = 'null', userId = 'null', boardId = 'null', columnId = 'null', } = {}) {
        this.id = id;
        this.title = title;
        this.order = order;
        this.description = description;
        this.userId = userId;
        this.boardId = boardId;
        this.columnId = columnId;
    }
}
