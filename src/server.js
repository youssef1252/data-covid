import logger from './logger.js';
import database from './db/database.js';
import createExpressApp from './createExpressApp.js';
import http from 'http';
import config from './config.js';

const db = database({logger});
const app = createExpressApp(db, logger);
const server = http.createServer();
const port = config.port;
const errors = {
    EACCES: 'requires elevated privileges',
    EADDRINUSE: 'is already in use'
}

server
    .on('request', app)
    .on('listening', function() {
        const addr = this.address();
        const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
        logger.info(`Listening on ${bind}`);
    })
    .on('error', function(error) {
        if (error.syscall !== 'listen') throw error;
        const addr = this.address() || { port };
        const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
        wichError(bind, error);
    })
    .listen(config.port);

const wichError = (bind, error) => {
    if (error.code in errors) {
        logger.error(`${bind} ${errors[error.code]}`);
        process.exit(1);
    } else {
        throw error
    }
};