import  jwt  from "jsonwebtoken";
import logger from "./logger.js";
import dotenv from 'dotenv';
dotenv.config();

const checkAuth= (role) => {
    return (req, res, next) => {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const payload = jwt.verify(token, process.env.JWT_KEY);
            req.userData = payload;
            if(role.includes(payload.role)){
                logger.info(`the role: ${payload.role} was found!`);
                next(); 
            }
            else{ 
                logger.error('role not found!');
                return res.status(401).json({message:"auth failed"});
            }
        } 
        catch (error) {
            logger.error('token not found!', error);
            return res.status(401).json({message:"auth failed"});
        }
    }
}

export default checkAuth;