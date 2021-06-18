import { v4 as uuid } from 'uuid';
export default class User {
    constructor({ id = uuid(), name = 'this.name', login = 'this.login', password = 'this.password', } = {}) {
        this.id = id;
        this.name = name;
        this.login = login;
        this.password = password;
    }
    static toResponse(user) {
        const { id, name, login } = user;
        return { id, name, login };
    }
}
