import mongoose from 'mongoose';
import config from '../config.js';
import { Departement, Corona, Imported } from './schemas/index.js';

const database = ({ logger }) => {
    const url = config.mongo_url;
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.connection
        .on('error', error => {
            throw error;
        })
        .once('open', () => logger.info(`MongoDB connected at ${url}`));
    return {Departement, Corona, Imported};
}

export default database;
