import { Router } from "express";
import checkAuth from "../Middleware/checkAuth.js";
import {imageUploads} from '../Middleware/imageUpload.js';
import menu from '../Controller/menu.js';

import { uploader } from "../config/cloudinaryConfig.js";

const router = Router();

router.get('/', menu.getFoodList);
router.post('/', checkAuth(["admin"]), imageUploads, menu.addFood);
router.post('/trail',imageUploads, async(req, res)=>{
    try {
        if(req.file){
            const image = await uploader.upload(req.file.path);
            return res.status(200).json({
                message: 'you image has been uploaded to cloudinary',
                data: image,
                all: req.file
            })
        }
    } 
    catch (error) {
        res.status(400).json({
            message: "shit went down!",
            data: error.message
        })
    }
    
});
router.patch('/:id', checkAuth(["admin"]), imageUploads, menu.editFood);
router.delete('/:id', checkAuth(["admin"]), menu.deleteFood);

export default router;


