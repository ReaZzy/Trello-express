const router = require("express").Router()
const {createTask, getTasksByBoardId, deleteTask, getTaskByBoardId, updateTask} = require('./tasks.service')

router.route("/:id/tasks").get(async (req, res) =>{
  try {
    const task = await getTasksByBoardId(req.params.id)
    if (task) return res.status(200).json(task)
    return res.status(404).json({msg: "User not found"})
  }catch (e) {
    return  res.status(400).send()
  }
})

router.route("/:id/tasks").post(async (req, res)=>{
  try {
    const {title,order,description,userId,columnId} = req.body
    const candidate = await createTask(title,order,description,userId,req.params.id,columnId)
    return res.status(201).json(candidate)
  }catch (e) {
    return res.status(400).send()
  }
})
router.route("/:id/tasks/:taskId").get(async (req, res)=>{
  try {
    const {id, taskId} = req.params
    const candidate = await getTaskByBoardId(id, taskId)
    if (candidate) return res.status(200).json(candidate)
    return res.status(404).json({msg:"Task not found"})
  }catch (e) {
    return res.status(400).send()
  }
})

router.route("/:id/tasks/:taskId").delete(async (req,res)=>{
  try {
    const {id, taskId} = req.params
    const candidate = await deleteTask(id, taskId)
    if(candidate) return res.status(204).json({msg:"The task has been deleted"})
    return res.status(404).json({msg:"Task not found"})
  }catch (e) {
    return res.status(400).send()
  }
})

router.route("/:id/tasks/:taskId").put(async (req, res)=>{
  try {
    const {id, taskId} = req.params
    const candidate = await updateTask(id, taskId, req.body)
    if (candidate) return res.status(200).json(candidate)
    return res.status(404).json({msg:"Task not found"})
  }catch (e) {
    return res.status(400).send
  }
})

module.exports = router