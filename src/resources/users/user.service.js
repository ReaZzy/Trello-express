const { setUsers, getAll } = require( './user.memory.repository' );


const getById = (users, id) => users.find( user => user.id === id );
const updateUser = (login, password, name, id) => {
  const newUsers = getAll().map( user => {
    if (user.id === id) {
      return { ...user, name, login, password };
    }
    return user;
  } );
  setUsers( newUsers );
  return newUsers.find( user => user.id === id );

};
const deleteUser = (id) => {
  const candidateDelete = getAll().find( user => user.id === id )
  const candidate = getAll().filter( user => user.id !== id )
  setUsers(candidate)
  return !!candidateDelete
};

module.exports.getById = getById;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;

