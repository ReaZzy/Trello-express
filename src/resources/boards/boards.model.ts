import { BoardType, ColumnType } from '../../types';

const { v4: uuid } = require( 'uuid' );
const { Column } = require("./column.model")


class Board implements BoardType{
  id: string

  title: string

  columns: Array<ColumnType>

  constructor({
      id = uuid(),
      title = "Title",
      columns = []
    } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map( (column:ColumnType) => new Column( { title: column.title, order: column.order } ) );
  }
}

module.exports.Board = Board;