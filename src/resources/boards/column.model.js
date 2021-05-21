const { v4: uuid } = require( 'uuid' );

class Column {
  constructor({
    id = uuid(),
    title = "Title",
    order = "Order"
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

module.exports.Column = Column;