const { Task } = require("./tasks.model")
const {getData, getById, setData, updateData} = require("../../db")

const getTasksByBoardId = async (id) =>{
  const candidate = await getData("tasks")
  return candidate.filter(task=>task.boardId === id)
}

const getTaskByBoardId = async (boardId, taskId) =>{
  const candidate = await getById("tasks", taskId)
  return candidate
}

const createTask = async (title,order,description,userId,boardId,columnId)=>{
  const candidate = new Task({title,order,description,userId,boardId,columnId})
  const tasks = await getData("tasks")
  await setData("tasks", [...tasks, candidate])
  return candidate
}

const deleteTask = async (boardId, taskId) =>{
  const tasks = await getData("tasks")
  const filteredTasks = tasks.filter(task => task.id !== taskId)
  const findedTask = tasks.find(task => task.id === taskId && task.boardId === boardId)
  await setData("tasks", filteredTasks)
  return !!findedTask
}

const updateTask = async (boardId, taskId, object) =>{
  const candidate = await updateData("tasks", {boardId, taskId, ...object})
  return candidate
}

module.exports = {
  getTasksByBoardId,
  getTaskByBoardId,
  createTask,
  deleteTask,
  updateTask,
}