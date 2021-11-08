import logger from '../Middleware/logger.js';
import Sequelize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const productionConfig= process.env.DATABASE_URL;
const devConfig = `postgres://${process.env.PG_USERNAME}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DEV_DATABASE}`;
const testConfig = `postgres://${process.env.PG_USERNAME}:${process.env.PG_PASSWORD}@localhost:5432/postgres`;
    
const pool = {
    max: 5,
    min: 0,
    acquire: 3000,
    idle: 1000
}

let sequelize;

const connectDB = async() => {
    try {
        if(process.env.NODE_ENV==='test'){
            sequelize = new Sequelize(testConfig,{pool: pool});
            logger.info("connection to test database made!");
        }
        else if(process.env.NODE_ENV==='production'){
            sequelize = new Sequelize(productionConfig,{pool: pool});
            logger.info("connection to production database made!");
        }
        else{
            sequelize = new Sequelize(devConfig,{pool: pool});
            logger.info("connection to database made!");
        }
        await sequelize.authenticate();
        if(process.env.NODE_ENV !== 'test'){
            sequelize.sync();
        }
    } 
    catch (error) {
        logger.error("connection to database failed!", error);
        
    }
}
connectDB();
    
export default sequelize;


