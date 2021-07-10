import { Request, Response, Router } from 'express';
import {
  createTask, getTasksByBoardId, deleteTask, getTaskByBoardId, updateTask,
} from './tasks.service';

const router = Router();

router.route('/:id/tasks').get(async (req: Request, res: Response) => {
  const task = await getTasksByBoardId('tasks', req.params.id);
  if (task) return res.status(200).json(task);
  return res.status(404).json({ msg: 'User not found' });
});

router.route('/:id/tasks').post(async (req: Request, res: Response) => {
  const {
    title, order, description, userId, columnId,
  } = req.body;
  const candidate = await createTask(title, order, description, userId, req.params.id, columnId);
  return res.status(201).json(candidate);
});
router.route('/:id/tasks/:taskId').get(async (req: Request, res: Response) => {
  const { id, taskId } = req.params;
  const candidate = await getTaskByBoardId(id, taskId);
  if (candidate) return res.status(200).json(candidate);
  return res.status(404).json({ msg: 'Task not found' });
});

router.route('/:id/tasks/:taskId').delete(async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const candidate = await deleteTask('tasks', taskId);
  if (candidate) return res.status(204).json({ msg: 'The task has been deleted' });
  return res.status(404).json({ msg: 'Task not found' });
});

router.route('/:id/tasks/:taskId').put(async (req: Request, res: Response) => {
  const { id, taskId } = req.params;
  const candidate = await updateTask(id, taskId, req.body);
  if (candidate) return res.status(200).json(candidate);
  return res.status(404).json({ msg: 'Task not found' });
});

export default router;
