import { Router } from "express";
import checkAuth from "../Middleware/checkAuth.js";
import {imageUploads, dataUri} from '../Middleware/imageUpload.js';
import menu from '../Controller/menu.js';

import { uploader } from "../config/cloudinaryConfig.js";
import logger from "../Middleware/logger.js";

const router = Router();

router.get('/', menu.getFoodList);
router.post('/', checkAuth(["admin"]), imageUploads, menu.addFood);
router.post('/test', imageUploads, async(req, res)=>{
    try {
        if(req.file) {
            const file =await dataUri(req);
            const img =await uploader.upload(file);
            logger.info('this is the stuff '+img);
            return res.status(200).json({stuff: img});
        }
        else{
            logger.info('this is the stuff ');
            return res.status(200).json({stuff: 'nothinhg going no'});
        }
        
    } catch (error) {
        logger.error('error occured,', error);
        return res.status(500).json({message: error.message});
    }

});
router.patch('/:id', checkAuth(["admin"]), imageUploads, menu.editFood);
router.delete('/:id', checkAuth(["admin"]), menu.deleteFood);

export default router;


