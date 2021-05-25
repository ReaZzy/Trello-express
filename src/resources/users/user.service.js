const { setUsers, getAll } = require( './user.memory.repository' );
const {getTasks, setTasks} = require("../tasks/tasks.memorry.repository")


const getById = async (users, id) => users.find( user => user.id === id );
const updateUser = async (login, password, name, id) => {
  const newUsers = await getAll().map( user => {
    if (user.id === id) {
      return { ...user, name, login, password };
    }
    return user;
  } );
  setUsers( newUsers );
  return newUsers.find( user => user.id === id );

};
const deleteUser = async (id) => {
  const candidateDelete = await getAll().find( user => user.id === id )
  const candidate = await getAll().filter( user => user.id !== id )
  setUsers(candidate)
  const tasks = await getTasks()
  const filteredTasks = tasks.map(task=> {
    if(task.userId === id) return {...task, userId: null}
    return task
  })
  await setTasks(filteredTasks)
  

  return !!candidateDelete
};

module.exports.getById = getById;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;

