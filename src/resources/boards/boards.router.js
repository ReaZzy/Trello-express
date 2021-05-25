const router = require("express").Router()
const { Board } = require("./boards.model")
const {getById, deleteBoard, updateBoard} = require("./boards.service")
const {getAllBoards} = require("./boards.memory.repository")

router.route("/").get(async (req, res)=>{
  try {
    const boards = await getAllBoards()
    return res.status(200).json(boards)
  }catch (e) {
    throw new Error(e)
  }

} )
router.route("/").post(async (req, res)=>{
  try {
    const {title, columns} = req.body
    const candidate = await Board.createBoard(title, columns)
    return res.status(201).json(candidate)
  }catch (e) {
    await res.status(400).json( { msg: "Bad request" })
    throw new Error("Bad request")
  }
})

router.route("/:id").get(async (req, res)=>{
  try {
    const boards = await getAllBoards()
    const candidate = await getById(boards, req.params.id)
    if (candidate) return res.status(200).json(candidate)
    return res.status(404).json({ msg: "Board not found" })
  }catch (e) {
    await res.status(400).json({ msg: "Bad request" })
    throw new Error("Bad request")
  }
})

router.route("/:id").put(async (req, res)=>{
  try {
    const candidate = await updateBoard(req.body, req.params.id )
    if (candidate) return res.status(200).json(candidate)
    return res.status(400).json({ msg: "Bad request" })
  }catch (e) {
    await res.status(400).json({ msg: "Bad request" })
    throw new Error("Bad request")
  }
})

router.route("/:id").delete(async (req,res)=>{
  try {
    const candidate = await deleteBoard(req.params.id)
    if(candidate){
      return res.status(200).json({msg: "Board has been deleted"})
    }
    return res.status(404).json({msg: "Board not found"})
  }catch (e) {
    await res.status(400).json({ msg: "Bad request" })
    throw new Error("Bad request")
  }
})

module.exports = router