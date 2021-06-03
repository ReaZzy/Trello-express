import { Request, Response, NextFunction } from 'express'

const fs = require("fs")

const writeStream = fs.createWriteStream("logs.txt", {flags:"a"})
const errorWriteStream = fs.createWriteStream("errorLogs.txt", {flags:"a"})


class HttpException extends Error {
  public status: number

  public message: string

  constructor(status: number, message: string) {
    super(message)
    this.status = status
    this.message = message
  }
}

const logRequestMiddleware = (req:Request,res:Response,next:NextFunction) => {
  res.on('finish', () => {
    writeStream.write(
      `
${new Date()}
----------------------------------------------
\n${res.statusCode}
\n${req.method} ${req.path} 
\nQuery params ${JSON.stringify(req.query)}
\nBody ${JSON.stringify(req.body)}
\n
`)
  });
  next()
}

const catchErrorMiddleware = (err:HttpException, _req:Request, res:Response, next:NextFunction) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';
  res
    .status(status)
    .json({
      status,
      message,
    })
  res.on('finish', () => {
    errorWriteStream.write(`${new Date()}\n----------------------------------------------\n${status}\n${message}\n`)
  })
  next()
}

module.exports = {
  logRequestMiddleware,
  catchErrorMiddleware
}