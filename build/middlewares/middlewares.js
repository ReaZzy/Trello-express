const fs = require('fs');
const writeStream = fs.createWriteStream('logs.txt', { flags: 'a' });
const errorWriteStream = fs.createWriteStream('errorLogs.txt', { flags: 'a' });
class HttpException extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
    }
}
const errLogger = (type, err, origin) => {
    fs.appendFileSync('errorLogs.txt', `
[${new Date()}] ${type} 
Caught exception: ${err}
Exception origin: ${origin}\n
    `);
};
const logRequestMiddleware = (req, res, next) => {
    res.on('finish', () => {
        writeStream.write(`
${new Date()}
----------------------------------------------
\n${res.statusCode}
\n${req.method} ${req.originalUrl} 
\nQuery params ${JSON.stringify(req.query)}
\nBody ${JSON.stringify(req.body)}
\n
`);
    });
    next();
};
const catchErrorMiddleware = (err, _req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';
    res
        .status(status)
        .json({
        status,
        message,
    });
    res.on('finish', () => {
        errorWriteStream.write(`${new Date()}\n----------------------------------------------\n${status}\n${message}\n`);
    });
    next();
};
const uncaughtException = process.on('uncaughtException', (err, origin) => {
    errLogger('uncaughtException', err, origin);
    process.exit(1);
});
const unhandledRejection = process.on('unhandledRejection', (err, origin) => {
    errLogger('unhandledRejection', err, origin);
    process.exit(1);
});
export const logger = {
    logRequestMiddleware,
    catchErrorMiddleware,
    errLogger,
    uncaughtException,
    unhandledRejection,
};
