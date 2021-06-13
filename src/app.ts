import { Request, Response, NextFunction } from 'express';

const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const { logger } = require('./middlewares/middlewares');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/boards.router');
const tasksRouter = require('./resources/tasks/tasks.router');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/') {
    res.send('Service is dasdsa!!');
    return;
  }
  next();
});

app.use(logger.catchErrorMiddleware);
app.all('*', logger.logRequestMiddleware);

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards', tasksRouter);

module.exports = app;
