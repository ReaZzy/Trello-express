let boards = []
const getAllBoards = async () => boards
const setBoards = async (array) =>{
  boards = array
}

module.exports.boards = boards
module.exports.getAllBoards = getAllBoards
module.exports.setBoards = setBoards