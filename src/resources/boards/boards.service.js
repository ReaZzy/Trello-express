const { Board } = require( './boards.model' );
const { getData, getById, setData, deleteData, updateData } = require( '../../db' );

const getAllBoards = async () => {
  const boards = await getData( 'boards' );
  return boards;
};

const getBoardById = async (id) => {
  const boards = await getById( 'boards', id );
  return boards;
};

const createBoard = async (title, columns) => {
  const candidate = await new Board( { title, columns } );
  await setData( "boards",[...await getAllBoards(), candidate] );
  return candidate;
};

const updateBoard = async (boardUpdate, id) => {
  const candidate = await updateData("boards", {...boardUpdate, id})
  return candidate
};

const deleteBoard = async (id) => {
  const candidateDelete = await deleteData("boards", id)

  const tasks = await getData("tasks");
  const filteredTasks = tasks.filter( task => task.boardId !== id );
  await setData("tasks", filteredTasks );

  return !!candidateDelete;
};

module.exports = {
  getAllBoards,
  getBoardById,
  updateBoard,
  deleteBoard,
  createBoard
};