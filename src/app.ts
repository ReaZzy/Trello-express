import { Request, Response, NextFunction } from 'express';

const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const {logRequestMiddleware, catchErrorMiddleware,errLogger} = require('./middlewares/middlewares');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/boards.router');
const tasksRouter = require('./resources/tasks/tasks.router');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

process.on("uncaughtException", (err:Error, origin:string)=> {
  errLogger("uncaughtException",err,origin)
  process.exit(1)
})
process.on("unhandledRejection", (err:Error,origin:string)=> {
  errLogger("unhandledRejection",err,origin)
  process.exit(1)
})


app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/', (req:Request, res:Response, next:NextFunction) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.all('*', logRequestMiddleware);



app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards', tasksRouter);
app.use(catchErrorMiddleware);

module.exports = app;
