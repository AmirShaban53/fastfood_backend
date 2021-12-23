import multer from 'multer';
import DataURIParser from 'datauri/parser';
import { DataURI } from 'datauri/types';
import path from 'path';
import console from 'console';


// const storage = multer.diskStorage({
//     destination: (req, file, cb)=> {cb(null, './uploads')},
//     filename: (req, file, cb) => {cb(null, file.originalname)}
// });
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpg' ||file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
    {
        cb(null, true);
    }
    else{
        cb(new Error('only images allowed'), false);
    }
}

const imageUploads = multer({
    storage: storage,
    limits:{fileSize: 1024 * 1024 *3},
    fileFilter: fileFilter
}).single('image');


const parser = new DataURIParser();
const dataUri = async(req) => {
    try {
        const img = await parser.format(path.extname(req.file.originalname).toString(), req.file.buffer);
        return img.content;
        
    } catch (error) {
        
    }
}

export  {imageUploads, dataUri};