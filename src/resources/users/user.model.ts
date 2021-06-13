import { UserType } from '../../types';

const {v4:uuid} = require('uuid');


class User {
  id: string

  name:string

  login:string

  password:string

  constructor({
    id = uuid(),
    name = "this.name",
    login = "this.login",
    password = "this.password"
  }= {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user:UserType) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;
