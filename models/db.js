import logger from '../Middleware/logger.js';
import Sequelize from 'sequelize';
import 'dotenv/config.js';

const productionConfig= process.env.DATABASE_URL;

const devConfig = `postgres://${process.env.PG_USERNAME}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DEV_DATABASE}`;

const testConfig = `postgres://${process.env.PG_USERNAME}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_TEST_DATABASE}`;
    
    



const sequelize = new Sequelize(process.env.NODE_ENV === 'test '? testConfig : devConfig);

const connectDB = async() => {
    try {
        await sequelize.authenticate();
        if(process.env.NODE_ENV !== 'test '){
            await sequelize.sync();
            logger.info("connection to database made!");
        }
        else{
            logger.info("connection to test database made!");

        }
        

    } catch (error) {
        logger.error("connection to database failed!", error);
        
    }
}
connectDB();
    
export default sequelize;


