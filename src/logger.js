import winston from 'winston';

const logger = winston;
const MESSAGE = Symbol.for('message');

const jsonFormatter = (logEntry) => {
    const base = { timestamp: new Date() };
    const json = Object.assign(base, logEntry)
    logEntry[MESSAGE] = JSON.stringify(json);
    return logEntry;
  }

logger.add(new logger.transports.File({
    name: 'debug-file',
    filename: 'log.log',
    level: 'debug',
    format: winston.format(jsonFormatter)(),
    handleExceptions: true,
    humanReadableUnhandledException: true,
    exitOnError: true,
    json: false,
    maxsize: 104857600,
    maxFiles: 5,
}));

logger.add(new logger.transports.Console({
    name: 'error-console',
    level: 'error',
    format: winston.format(jsonFormatter)(),
    handleExceptions: true,
    humanReadableUnhandledException: true,
    exitOnError: true,
}));

export default logger;