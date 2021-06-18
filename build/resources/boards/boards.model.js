import { v4 as uuid } from 'uuid';
import { Column } from './column.model';
export default class Board {
    constructor({ id = uuid(), title = 'Title', columns = [], } = {}) {
        this.id = id;
        this.title = title;
        this.columns = columns.map((column) => new Column({ title: column.title, order: column.order }));
    }
}
