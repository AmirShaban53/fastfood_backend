import JWT from 'jsonwebtoken';
import logger from './Logger.js';
import 'dotenv/config.js';

const checkAuth = (req, res, next) =>{
    try {
        const token = req.headers.authorization.split(" ")[1];
        const payLoad = JWT.verify(token, process.env.JWT_KEY);
        req.userdata = payLoad;
        logger.info('JWT token found');
        next();
    } 
    catch (error) {
        logger.error('token not found', error);
        return res.status(401).json({message:"auth failed"});
    }
}
export {checkAuth};