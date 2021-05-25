const { Task } = require("./tasks.model")
const {setTasks, getTasks} = require("./tasks.memorry.repository")

const getTasksByBoardId = async (id) =>{
  const tasks = await getTasks()
  return tasks.filter(task=>task.boardId === id)
}

const getTaskByBoardId = async (boardId, taskId) =>{
  const tasks = await getTasks()
  return tasks.find(task=> task.id === taskId && task.boardId === boardId)
}

const createTask = async (title,order,description,userId,boardId,columnId)=>{
  const candidate = new Task({title,order,description,userId,boardId,columnId})
  const tasks = await getTasks()
  await setTasks([...tasks, candidate])
  return candidate
}

const deleteTask = async (boardId, taskId) =>{
  const tasks = await getTasks()
  const filteredTasks = tasks.filter(task => task.id !== taskId)
  const findedTask = tasks.find(task => task.id === taskId && task.boardId === boardId)
  await setTasks(filteredTasks)
  return !!findedTask
}

const updateTask = async (boardId, taskId, object) =>{
  const tasks = await getTasks()
  const updatedTasks = tasks.map(task=>{
    if(task.id === taskId && task.boardId === boardId) {
      return {...task, ...object}
    }
    return task
  })
  await setTasks(updatedTasks)
  return tasks.find(task=>task.id === taskId && task.boardId === boardId)
}

module.exports.createTask = createTask
module.exports.getTasksByBoardId = getTasksByBoardId
module.exports.getTaskByBoardId = getTaskByBoardId
module.exports.deleteTask = deleteTask
module.exports.updateTask = updateTask