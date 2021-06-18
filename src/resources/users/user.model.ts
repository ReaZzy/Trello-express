import { v4 as uuid } from 'uuid';
import { EntityType } from '../../types';

export default class User {
  id: string;

  name:string;

  login:string;

  password:string;

  constructor({
    id = uuid(),
    name = 'this.name',
    login = 'this.login',
    password = 'this.password',
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse = (user:EntityType) => {
    if ('name' in user && 'login' in user && 'id' in user) {
      const { id, name, login } = user;
      return { id, name, login };
    }
    return null;
  };
}
