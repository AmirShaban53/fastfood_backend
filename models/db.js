import logger from '../Middleware/logger.js';
import Sequelize from 'sequelize';
import 'dotenv/config.js';

const productionConfig= process.env.DATABASE_URL;

const devConfig = {
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DEV_DATABASE,
    dialect: process.env.PG_DIALECT
}
const testConfig = {
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_TEST_DATABASE,
    dialect: process.env.PG_DIALECT
}


    const sequelize = new Sequelize(process.env.NODE_ENV === 'test'? testConfig : devConfig);
    try {
        await sequelize.authenticate();
        sequelize.sync();
        logger.info("connection to database made!");
    } catch (error) {
        logger.error("connection to database failed!", error);
        
    }

export default sequelize;


