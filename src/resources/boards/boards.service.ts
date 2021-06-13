import {
  CreateBoardType,
  DeleteDataType,
  GetByIdType,
  GetDataType,
  TaskType,
  UpdateBoardDataType,
} from '../../types';

const { Board } = require( './boards.model' );
const { getData, getById, setData, deleteData, updateData } = require( '../../db' );

const getAllBoards:GetDataType = async () => {
  const boards = await getData( 'boards' );
  return boards;
};

const getBoardById:GetByIdType = async (_, id) => {
  const boards = await getById( 'boards', id );
  return boards;
};

/**
 * Create new board
 * @param {string} title Board title
 * @param {columns[]} columns Board columns
 * @returns {Promise<Board>}
 *
 * @example
 * const board = await createBoard("Done", [])
 */

const createBoard:CreateBoardType = async (title, columns) => {
  const candidate = await new Board( { title, columns } );
  await setData( "boards",[...await getAllBoards("boards"), candidate] );
  return candidate;
};

const updateBoard:UpdateBoardDataType = async (boardUpdate, id) => {
  const candidate = await updateData("boards", {...boardUpdate, id})
  return candidate
};

const deleteBoard:DeleteDataType = async (_, id) => {
  const candidateDelete = await deleteData("boards", id)

  const tasks = await getData("tasks");
  const filteredTasks = tasks.filter( (task:TaskType) => task.boardId !== id );
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