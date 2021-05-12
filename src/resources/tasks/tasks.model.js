const { v4: uuid } = require( 'uuid' );

class Task{
  constructor({
    id=uuid(),
    title = this.title,
    order = this.order,
    description = this.description,
    userId = this.userId,
    boardId = this.boardId,
    columnId = this.columnId,
              } = {}) {
    this.id = id
    this.title = title
    this.order = order
    this.description = description
    this.userId = userId
    this.boardId = boardId
    this.columnId = columnId
  }
}

module.exports.Task = Task