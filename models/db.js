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
// const testConfig = {
//     username: process.env.PG_USERNAME,
//     password: process.env.PG_PASSWORD,
//     host: process.env.PG_HOST,
//     port: process.env.PG_PORT,
//     database: process.env.PG_TEST_DATABASE,
//     dialect: process.env.PG_DIALECT
// }

const testConfig =  `postgres://${process.env.PG_USERNAME}:${process.env.PG_PASSWORD}@localhost:5432/postgres`;
    
    



// var sequelize = new Sequelize('mysql://user:pass@example.com:9821/dbname', {
//     // Look to the next section for possible options
//   })

    const sequelize = new Sequelize(process.env.NODE_ENV === 'test'? testConfig : devConfig);
    // const sequelize = new Sequelize(devConfig);
    
        try {
            await sequelize.authenticate();
            sequelize.sync();
            logger.info("connection to database made!");
        } catch (error) {
            logger.error("connection to database failed!", error);
            
        }
    
export default sequelize;


