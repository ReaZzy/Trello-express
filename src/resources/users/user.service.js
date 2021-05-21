const User = require("./user.model")
const {getData, getById, setData, updateData, deleteData} = require("../../db")

const getAll = async() => getData("users")
const getUserById = async (id) =>{
  const users = await getById("users", id)
  return User.toResponse(users);
}
const updateUser = async (data) => {
  const newUsers = await updateData("users", data)
  return User.toResponse(newUsers);
};

const createUser = async (name, login, password) =>{
  const candidate = new User({ name, login, password} );
  await setData("users", [...await getAll(), candidate])
  return User.toResponse(candidate)
}

const deleteUser = async (id) => {
  const deletedUser = await deleteData("users", id)

  const tasks = await getData("tasks");
  const filteredTasks = tasks.map( task => {
    if (task.userId === id) return { ...task, userId: null };
    return task;
  } );
  await setData("tasks", filteredTasks );

  return deletedUser
};

module.exports = {
  getAll,
  getUserById,
  updateUser,
  createUser,
  deleteUser
}

