import { GetByIdType, UpdateDataType, DeleteDataType, UserType, CreateUserType, TaskType } from '../../types';

const User = require("./user.model")
const {getData, getById, setData, updateData, deleteData} =  require("./../../db")

const getAll = async():Promise<UserType[]> => getData("users")

const getUserById:GetByIdType = async (id) =>{
  const users = await getById("users", id);
  if(users)  return User.toResponse(users)
  return null
}
const updateUser:UpdateDataType = async (data) => {
  const newUsers = await updateData("users", data)
  if(newUsers)  return User.toResponse(newUsers)
  return null
};

/**
 * Create new user
 * @param {string} name User name
 * @param {string} login User login
 * @param {string} password User password
 * @returns {Promise<User>}
 *
 * @example
 * const task = await createTask("Fix menu", 1, "qwerty", "dasd-124asd", "34asdas-fds", "dsa5125r-dsadas")
 */

const createUser:CreateUserType = async (name, login, password) =>{
  const candidate = new User({ name, login, password} );
  const users = await getAll()
  await setData("users", [...users, candidate])
  if(candidate)  return User.toResponse(candidate)
  return null
}

const deleteUser:DeleteDataType = async (_, id) => {
  const deletedUser = await deleteData("users", id)
  const tasks = await getData("tasks");
  const filteredTasks = tasks.map( (task:TaskType) => {
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

