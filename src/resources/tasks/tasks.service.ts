import {
  CreateTaskType,
  DeleteDataType,
  GetByIdType,
  GetTaskByBoardIdType,
  TaskType,
  UpdateTaskDataType
} from '../../types';

const { Task } = require("./tasks.model")
const {getData, getById, setData, updateData} = require("../../db")

const getTasksByBoardId:GetByIdType = async (_, id) =>{
  const candidate = await getData("tasks")
  return candidate.filter((task:TaskType)=>task.boardId === id)
}

const getTaskByBoardId:GetTaskByBoardIdType = async (_boardId, taskId) =>{
  const candidate = await getById("tasks", taskId)
  return candidate
}

/**
 * Create new task
 * @param {string} title Task title
 * @param {number} order Task title
 * @param {description} description Task description
 * @param {userId} userId Task userId
 * @param {boardId} boardId boardId boardId
 * @param {columnId} columnId Task columnId
 * @returns {Task}
 *
 * @example
 * const task = await createTask("Fix menu", 1, "qwerty", "dasd-124asd", "34asdas-fds", "dsa5125r-dsadas")
 */

const createTask:CreateTaskType = async (title,order,description,userId,boardId,columnId)=>{
  const candidate = new Task({title,order,description,userId,boardId,columnId})
  const tasks = await getData("tasks")
  await setData("tasks", [...tasks, candidate])
  return candidate
}

const deleteTask:DeleteDataType = async (_boardId, taskId) =>{
  const tasks = await getData("tasks")
  const filteredTasks = tasks.filter((task:TaskType) => task.id !== taskId)
  const findedTask = tasks.find((task:TaskType) => task.id === taskId )
  await setData("tasks", filteredTasks)
  return !!findedTask
}

const updateTask:UpdateTaskDataType = async (_boardId, taskId, object) =>{
  const candidate = await updateData("tasks", {taskId, ...object})
  return candidate
}

module.exports = {
  getTasksByBoardId,
  getTaskByBoardId,
  createTask,
  deleteTask,
  updateTask,
}