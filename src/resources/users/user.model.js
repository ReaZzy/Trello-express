const {v4:uuid} = require('uuid');

class User {
  constructor({
    id = uuid(),
    name = this.name,
    login = this.login,
    password = this.password
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }

  static createUser(name, login, password){
    if( name && login && password){
      const candidate = new User({name, login, password})
      return User.toResponse(candidate)
    }
    return null
  }

}

module.exports = User;
