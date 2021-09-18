import logger from "../Middleware/logger.js";
import User from "../models/user.js";
import JWT from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import 'dotenv/config.js';

export default class Auth{
    
    static signUp = async(req, res)=>{
        try {
            const {email, password} = req.body;
            const users = await User.findAll({where:{email: email}});
            if(users.length >= 1){
                logger.info('user email already exits');
                return res.status(409).json('authenication failed');
            }
            else{
                bcrypt.hash(password, 10, (error, hash)=>{
                    if(error){
                        logger.error('failed to hash user password',error);
                        return res.status(500).json({error: error.message});
                    }
                    else{
                        User.create({email: email, password: hash, role: 'user'});
                        logger.info('user successfully created');
                        return res.status(201).json('user successfully created');
                    }
                })
            }
        } 
        catch (error) {
            logger.error('user creation failed!',error);
            res.status(500).json(error);
        }
    }


    static login = async(req, res)=>{
        try {
            const {email, password} = req.body;

            const user = await User.findOne({where:{email: email}});
            if(user == null || user == undefined){
                logger.error(`user email: ${email} doesnot exist`);
                return res.status(401).json('auth failed');
            }
            else{
                bcrypt.compare(password, user.password, (error, result)=>{
                    if(error){
                        logger.error('user entered wrong password!');
                        return res.status(401).json('auth failed');
                    }
                    if(result){
                        const token = JWT.sign(
                            {
                                user_id: user.user_id,
                                email: user.email,
                                role: user.role
                            },
                            process.env.JWT_KEY,
                            {expiresIn: '1h'}
                        );
                        return res.status(200).json({message: 'authentication successful', token: token});
                    }
                    logger.error('user authentication has failed');
                    res.status(401).json('auth failed');
                })
            }
        } 
        catch (error) {
            logger.error('user login failed!',error);
            res.status(500).json({error: error.message});
        }
    }

}