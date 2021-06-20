import { Response, Request, Router } from 'express';
import User from './user';
import {
  getUserById, updateUser, deleteUser, createUser, getAll,
} from './user.service';

const router = Router();

router.route('/').get(async (_req: Request, res: Response) => {
  const users = await getAll();
  await res.json(users.map((user) => User.toResponse(user)));
});

router.route('/').post(async (req: Request, res: Response) => {
  const { name, login, password } = req.body;
  const candidate = await createUser(name, login, password);
  return res.status(201).json(candidate);
});

router.route('/:id').get(async (req: Request, res: Response) => {
  const candidate = await getUserById('users', req.params.id);
  if (candidate) await res.status(200).json(candidate);
  else await res.status(404).json({ msg: 'User not found' });
});
router.route('/:id').put(async (req: Request, res: Response) => {
  const candidate = await updateUser({ ...req.body, id: req.params.id });
  if (candidate) return res.status(200).json(candidate);
  return res.status(400).json({ msg: 'Bad request' });
});

router.route('/:id').delete(async (req: Request, res: Response) => {
  const candidate = await deleteUser('users', req.params.id);
  if (candidate) {
    return res.status(200).json({ msg: 'The user has been deleted' });
  }
  return res.status(404).json({ msg: 'User not found' });
});

export default router;
