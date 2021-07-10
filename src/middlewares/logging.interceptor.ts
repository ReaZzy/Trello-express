import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, call$: CallHandler): Observable<any> {
    const { method, url } = ctx.switchToHttp().getRequest();
    const now = Date.now();
    return call$
      .handle()
      .pipe(
        tap(() =>
          Logger.log(
            `${method} ${url} ${Date.now() - now}ms`,
            ctx.getClass().name,
          ),
        ),
      );
  }
}
