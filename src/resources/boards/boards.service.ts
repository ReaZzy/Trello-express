import { getRepository } from 'typeorm';
import {
  ArrType,
  DeleteDataType,
  UpdateBoardDataType,
} from '../../types';

import Board from './boards.model';
import { Column } from './column.model';

export type GetDataType = (arr:ArrType) => Promise<Board[]>;
export const getAllBoards:GetDataType = async () => {
  const boardRepository = getRepository(Board);
  const boards = await boardRepository.find();
  return boards;
};

export const getBoardById:(_:ArrType, id:string) => Promise<Board | undefined> = async (
  _, id,
) => {
  const boardRepository = getRepository(Board);
  const boards = await boardRepository.findOne(id);
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

export const createBoard:(title:string, columns:Column[]) => Promise<Board> = async (title, columns) => {
  const boardRepository = getRepository(Board);
  const board = boardRepository.create({
    title,
    columns,
  });
  await boardRepository.save(board);
  return board;
};

export const updateBoard:UpdateBoardDataType = async (boardUpdate, id) => {
  const boardRepository = getRepository(Board);
  const board = await boardRepository.findOne(id);
  const updatedBoard = await boardRepository.save({
    ...board,
    ...boardUpdate,
  });
  return updatedBoard;
};

export const deleteBoard:DeleteDataType = async (_, id) => {
  const boardRepository = getRepository(Board);
  const deletedUser = boardRepository.delete(id);
  return !!deletedUser;
};
