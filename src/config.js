import dotenv from 'dotenv';
dotenv.config();

const config = {
    port: process.env.PORT,
    secret: process.env.SECRET,
    expire: process.env.EXPIRE,
    mongo_url: process.env.MONGO_URL
};

export default config;