import {
  ArrType, BoardType,
  CreateBoardType,
  DeleteDataType, EntityType,
  GetDataType,
  TaskType,
  UpdateBoardDataType,
} from '../../types';

import Board from './boards.model';
import {
  getData, getById, setData, deleteData, updateData,
} from '../../db';

export const getAllBoards:GetDataType = async () => {
  const boards = await getData('boards');
  return boards;
};

export const getBoardById:(_:ArrType, id:string) => Promise<EntityType | undefined> = async (
  _, id,
) => {
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

export const createBoard:CreateBoardType = async (title, columns) => {
  const candidate:BoardType = await new Board({ title, columns } as BoardType);
  await setData('boards', [...await getAllBoards('boards'), candidate]);
  return candidate;
};

export const updateBoard:UpdateBoardDataType = async (boardUpdate, id) => {
  const candidate = await updateData('boards', { ...boardUpdate, id });
  return candidate;
};

export const deleteBoard:DeleteDataType = async (_, id) => {
  const candidateDelete = await deleteData('boards', id);

  const tasks = await getData('tasks');
  const filteredTasks = tasks.filter((task:TaskType) => task.boardId !== id);
  await setData('tasks', filteredTasks);

  return !!candidateDelete;
};
