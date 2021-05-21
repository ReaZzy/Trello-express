const { v4: uuid } = require( 'uuid' );
const { Column } = require("./column.model")


class Board {
  constructor({
      id = uuid(),
      title = "Title",
      columns = []
    } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map( column => new Column( { title: column.title, order: column.order } ) );
  }
}

module.exports.Board = Board;