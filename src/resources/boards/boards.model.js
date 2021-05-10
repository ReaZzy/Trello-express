const { v4: uuid } = require( 'uuid' );
const { setBoards, getAllBoards, boards } = require( './boards.memory.repository' );

class Column {
  constructor({
                id = uuid(),
                title = this.title,
                order = this.order
              } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

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

  static createBoard(title, columns) {
    const candidate = new Board( { title, columns } );
    setBoards([...getAllBoards(), candidate]  );
    return candidate;
  }

  static getById(array, id) {
    return array.find( board => board.id === id );
  }

  static updateBoard(boardUpdate, id) {
    const newBoards = getAllBoards().map( board => {
      if (board.id === id) {
        return {...board, ...boardUpdate}
      }
      return board;
    } );
    setBoards( newBoards );
    return newBoards.find( e => e.id === id );
  }

  static deleteBoard(id) {
    const candidateDelete = getAllBoards().find( board => board.id === id )
    const candidate = getAllBoards().filter( board => board.id !== id )
    setBoards(candidate)
    return !!candidateDelete
  }
}

module.exports.Board = Board;