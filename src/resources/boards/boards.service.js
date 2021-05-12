const { getTasks, setTasks } = require( '../tasks/tasks.memorry.repository' );
const { setBoards, getAllBoards } = require( './boards.memory.repository' );

const getById = async (array, id) => array.find( board => board.id === id );

const updateBoard = async (boardUpdate, id) => {
  const boards = await getAllBoards();
  const newBoards = boards.map( board => {
    if (board.id === id) {
      return { ...board, ...boardUpdate };
    }
    return board;
  } );
  await setBoards( newBoards );
  return newBoards.find( e => e.id === id );
};

const deleteBoard = async (id) => {
  const boards = await getAllBoards();
  const candidateDelete = boards.find( board => board.id === id );
  const candidate = boards.filter( board => board.id !== id );
  await setBoards( candidate );

  const tasks = await getTasks();
  const filteredTasks = tasks.filter( task => task.boardId !== id );
  await setTasks( filteredTasks );

  return !!candidateDelete;
};

module.exports.getById = getById;
module.exports.updateBoard = updateBoard;
module.exports.deleteBoard = deleteBoard;