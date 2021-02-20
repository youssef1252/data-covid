import express from 'express';
import bodyParser from 'body-parser';
import expressWinston from 'express-winston';
import cors from 'cors';
import routes from './routes/index.js';

const createExpressApp = (database, logger) => express()
    .use(expressWinston.logger({
        winstonInstance: logger,
        msg: '{{res.statusCode}} {{req.method}} {{req.url}} {{res.responseTime}}ms',
        meta: false,
    }))
    .use(cors())
    .use(bodyParser.urlencoded({extended: true}))
    .use(bodyParser.json())
    .use((req, res, next) => {
        req.base = `${req.protocol}://${req.get('host')}`;
        req.logger = logger;
        req.db = database;
        return next();
    })
    .use(express.static('./public'))
    .use('/api', routes)
    .use((error, req, res, next) => {
        logger.error(error, error);
        res.status(error.status || 500).json({error});
    });

export default createExpressApp;