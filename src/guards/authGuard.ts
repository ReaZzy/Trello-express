import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    ctx: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const res = ctx.switchToHttp().getResponse();
    const req = ctx.switchToHttp().getRequest();
    try {
      const token = req.headers?.authorization?.split(' ')[1];
      console.log(token);
      if (!token) {
        res.status(HttpStatus.UNAUTHORIZED).json({ msg: 'Unauthorized' });
        return false;
      }
      jwt.verify(token, process.env.JWT_SECRET_KEY!, (err: Error, user) => {
        if (err) {
          res.status(HttpStatus.FORBIDDEN).json({ msg: 'Wrong token' });
          return false;
        }
        req.user = user;
        return true;
      });
      return true;
    } catch (e) {
      res.status(HttpStatus.FORBIDDEN).json({ msg: 'Wrong token' });
      return false;
    }
  }
}
