import { getRepository } from 'typeorm';
import {
  ArrType,
  DeleteDataType,
  UpdateTaskDataType,
} from '../../types';
import Task from './tasks.model';

export const getTasksByBoardId:(_:ArrType, id:string) => Promise<Task[]> = async (
  _, id,
) => {
  const taskRepostitory = getRepository(Task);
  const task = await taskRepostitory.find({ boardId: id });
  return task;
};

export const getTaskByBoardId:(_boardId:string, taskId:string) => Promise<Task | undefined> = async (
  _boardId, taskId,
) => {
  const taskRepostitory = getRepository(Task);
  const task = await taskRepostitory.findOne(taskId);
  return task;
};

/**
 * Create new task
 * @param {string} title Task title
 * @param {number} order Task title
 * @param {description} description Task description
 * @param {userId} userId Task userId
 * @param {boardId} boardId boardId boardId
 * @param {columnId} columnId Task columnId
 * @returns {Promise<Task>}
 *
 * @example
 * const task = await createTask(
 * "Fix menu", 1, "qwerty", "dasd-124asd", "34asdas-fds", "dsa5125r-dsadas
 * ")
 */

export const createTask:(title:string, order:number, description:string, userId:string, boardId:string, columnId:string) => Promise<Task> = async (
  title, order, description, userId, boardId, columnId,
) => {
  const taskRepository = getRepository(Task);
  const task = taskRepository.create({
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  });
  await taskRepository.save(task);
  return task;
};

export const deleteTask:DeleteDataType = async (_boardId, taskId) => {
  const taskRepostitory = getRepository(Task);
  const deletedTask = await taskRepostitory.delete(taskId);
  return !!deletedTask;
};

export const updateTask:UpdateTaskDataType = async (_boardId, taskId, object) => {
  const taskRepostitory = getRepository(Task);
  const task = await taskRepostitory.findOne(taskId);
  const updatedTask = await taskRepostitory.save({
    ...task,
    ...object,
  });
  return updatedTask;
};
