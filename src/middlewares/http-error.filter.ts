import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();
    const next = ctx.getNext();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = {
      status,
      timestamp: new Date().toLocaleDateString(),
      path: req.url,
      method: req.method,
      params: req.params,
      body: req.body,
      message: exception.message,
    };

    Logger.error(
      `${req.method} ${req.url}`,
      JSON.stringify(errorResponse),
      'Exception',
    );

    res.status(status).send({ errorResponse });
    next();
  }
}
