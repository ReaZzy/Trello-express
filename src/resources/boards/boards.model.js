const { v4: uuid } = require( 'uuid' );
const {boards} = require("./boards.memory.repository")

class Board {
  constructor({
    id = uuid(),
    title = this.title,
    columns = this.columns
   } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static createBoard(title, columns) {
    const candidate = new Board( { title, columns});
    boards.push(candidate)
    return candidate
  }
}

module.exports.Board = Board;