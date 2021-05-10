const { usersStorage, setUsers } = require( './user.memory.repository' );


const getById = (users, id) => users.find( user => user.id === id );
const updateUser = (login, password, name, id) => {
  const newUsers = usersStorage.map( user => {
    if (user.id === id) {

      return { ...user, name, login, password };
    }
    return user;
  } );
  setUsers( newUsers );
  return newUsers.find( user => user.id === id );

};
const deleteUser = (id) => {
  const candidate = usersStorage.findIndex( user => user.id === id );
  if (candidate > -1) {
    return usersStorage.filter( user => user.id !== id );
  }
  return null;
};

module.exports.getById = getById;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;

