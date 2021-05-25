const { v4: uuid } = require( 'uuid' );

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

module.exports.Column = Column