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
      if (!token) {
        res.status(HttpStatus.UNAUTHORIZED).send({ msg: 'Unauthorized' });
        return false;
      }
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err: Error) => {
        if (err) {
          res.status(HttpStatus.FORBIDDEN).send({ msg: 'Wrong token' });
          return false;
        }
        return true;
      });
      return true;
    } catch (e) {
      res.status(HttpStatus.FORBIDDEN).send({ msg: 'Wrong token' });
      return false;
    }
  }
}
