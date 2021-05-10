const router = require("express").Router()
const { Board } = require("./boards.model")
const {getAllBoards} = require("./boards.memory.repository")

router.route("/").get(async (req, res)=>res.status(200).json(getAllBoards()))
router.route("/").post(async (req, res)=>{
  try {
    const {title, columns} = req.body
    const candidate = Board.createBoard(title, columns)
    return res.status(201).json(candidate)
  }catch (e) {
    await res.status(400).json( { msg: "Bad request" })
    throw new Error("Bad request")
  }
})

module.exports = router