const { v4: uuid } = require( 'uuid' );
const { setBoards, getAllBoards } = require( './boards.memory.repository' );
const { Column } = require("./column.model")


class Board {
  constructor({
                id = uuid(),
                title = this.title,
                columns = this.columns
              } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map( column => new Column( { title: column.title, order: column.order } ) );
  }

  static async createBoard (title, columns) {
    const candidate = new Board( { title, columns } );
    const boards = await getAllBoards()
    await setBoards([...boards, candidate]  );
    return candidate;
  }
}

module.exports.Board = Board;