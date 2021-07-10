import { Router, Request, Response } from 'express';
import { userLogin } from './login.repository';

const router = Router();

router.post('/', async (req:Request, res:Response) => {
  const { login, password } = req.body;
  const candidate = await userLogin(login, password);
  if (candidate) {
    return res.status(200).json({ token: candidate });
  }
  return res.status(403).send();
});

export default router;
