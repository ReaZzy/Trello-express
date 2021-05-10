let usersStorage = []

const getAll = async () => usersStorage;
const setUsers = (array)=>{
  usersStorage = array
}

module.exports.getAll = getAll;
module.exports.usersStorage = usersStorage
module.exports.setUsers = setUsers
