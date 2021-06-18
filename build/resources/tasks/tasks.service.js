import Task from './tasks.model';
import { getData, getById, setData, updateData, } from '../../db';
export const getTasksByBoardId = async (_, id) => {
    const candidate = await getData('tasks');
    if (candidate)
        return candidate.filter((task) => task.boardId === id);
    return null;
};
export const getTaskByBoardId = async (_boardId, taskId) => {
    const candidate = await getById('tasks', taskId);
    return candidate;
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
 * const task = await createTask("Fix menu", 1, "qwerty", "dasd-124asd", "34asdas-fds", "dsa5125r-dsadas")
 */
export const createTask = async (title, order, description, userId, boardId, columnId) => {
    const candidate = new Task({
        title, order, description, userId, boardId, columnId,
    });
    const tasks = await getData('tasks');
    await setData('tasks', [...tasks, candidate]);
    return candidate;
};
export const deleteTask = async (_boardId, taskId) => {
    const tasks = await getData('tasks');
    const filteredTasks = tasks.filter((task) => task.id !== taskId);
    const findedTask = tasks.find((task) => task.id === taskId);
    await setData('tasks', filteredTasks);
    return !!findedTask;
};
export const updateTask = async (_boardId, taskId, object) => {
    const candidate = await updateData('tasks', { taskId, ...object });
    return candidate;
};
