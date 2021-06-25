import { Request, Response, NextFunction } from 'express';
import { logger } from './middlewares/middlewares';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/boards.router';
import tasksRouter from './resources/tasks/tasks.router';
import loginRouter from './resources/login/login.routes';
import { authenticateToken } from './middlewares/isAuth';

const express = require('express');
const path = require('path');
const YAML = require('yamljs');
const swaggerUI = require('swagger-ui-express');

export const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/') {
    res.send('Service is starting');
    return;
  }
  next();
});

app.use(logger.catchErrorMiddleware);
app.all('*', logger.logRequestMiddleware);

app.use('/login', loginRouter);
app.use(authenticateToken);

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards', tasksRouter);
