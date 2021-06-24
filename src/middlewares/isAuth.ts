import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface RequestU extends Request {
  user: { userId:string, login:string }
}
// eslint-disable-next-line consistent-return
export const authenticateToken = (req: RequestU, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);
  // @ts-ignore
  // eslint-disable-next-line consistent-return
  jwt.verify(token, process.env.JWT_SECRET_KEY!, (err:Error, user) => {
    if (err) return res.sendStatus(403);
    // @ts-ignore
    req.user = user;
    next();
  });
};
