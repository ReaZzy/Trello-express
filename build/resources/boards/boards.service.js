import Board from './boards.model';
import { getData, getById, setData, deleteData, updateData, } from '../../db';
export const getAllBoards = async () => {
    const boards = await getData('boards');
    return boards;
};
export const getBoardById = async (_, id) => {
    const boards = await getById('boards', id);
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
export const createBoard = async (title, columns) => {
    const candidate = await new Board({ title, columns });
    await setData('boards', [...await getAllBoards('boards'), candidate]);
    return candidate;
};
export const updateBoard = async (boardUpdate, id) => {
    const candidate = await updateData('boards', { ...boardUpdate, id });
    return candidate;
};
export const deleteBoard = async (_, id) => {
    const candidateDelete = await deleteData('boards', id);
    const tasks = await getData('tasks');
    const filteredTasks = tasks.filter((task) => task.boardId !== id);
    await setData('tasks', filteredTasks);
    return !!candidateDelete;
};
