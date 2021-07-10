const { v4: uuid } = require('uuid');
export class Column {
    constructor({ id = uuid(), title = 'Title', order = 1, } = {}) {
        this.id = id;
        this.title = title;
        this.order = order;
    }
}
