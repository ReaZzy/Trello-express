import { Response, Request } from 'express';

const router = require('express').Router();
const User = require('./user.model');
const { getUserById, updateUser, deleteUser, createUser, getAll } = require('./user.service');


router.route('/').get(async (_req: Request, res: Response) => {
  const users = await getAll();
  // map user fields to exclude secret fields like "password"
  await res.json(users.map(User.toResponse));
});

router.route('/').post(async (req: Request, res: Response) => {
  const { name, login, password } = req.body;
  const candidate = await createUser(name, login, password);
  return res.status(201).json(candidate);
});

router.route(`/:id`).get(async (req: Request, res: Response) => {
  const candidate = await getUserById(req.params.id);
  if (candidate) await res.status(200).json(candidate);
  else await res.status(404).json({ msg: 'User not found' });

});
router.route(`/:id`).put(async (req: Request, res: Response) => {
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


module.exports = router;
