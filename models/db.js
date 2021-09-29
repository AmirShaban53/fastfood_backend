import logger from '../Middleware/logger.js';
import Sequelize from 'sequelize';
import 'dotenv/config.js';

const productionConfig= process.env.DATABASE_URL;

const devConfig = `postgres://${process.env.PG_USERNAME}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DEV_DATABASE}`;

const testConfig = `postgres://${process.env.PG_USERNAME}:${process.env.PG_PASSWORD}@localhost:5432/postgres`;
    
    
const pool = {
    max: 5,
    min: 0,
    acquire: 3000,
    idle: 1000
}


const sequelize = new Sequelize(process.env.NODE_ENV === 'test'? testConfig : devConfig, {pool: pool});

const connectDB = async() => {
    try {
        await sequelize.authenticate();
        if(process.env.NODE_ENV !== 'test'){
            sequelize.sync();
            logger.info("connection to database made!");
        }
        else{
            logger.info("connection to test database made!");
        }
    } 
    catch (error) {
        logger.error("connection to database failed!", error);
        
    }
}
connectDB();
    
export default sequelize;


