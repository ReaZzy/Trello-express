import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface RequestU extends Request {
  user: { userId:string, login:string }
}

export const authenticateToken = (req: RequestU, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  // @ts-ignore
  return jwt.verify(token, process.env.JWT_SECRET_KEY!, (err:Error, user) => {
    if (err) return res.sendStatus(403);

    req.user = user as { userId: string; login: string; };
    return next();
  });
};
