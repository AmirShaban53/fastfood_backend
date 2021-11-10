import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    // destination: (req, file, cb) => {cb(null, './uploads/')},
    filename: (req, file, cb) => {cb(null, `${req.body.name}_${file.originalname}`)}
});

const fileFilter = (req, file, cb) => {
    let ext = path.extname(file.originalname);
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
    limits:{
         fileSize: 1024 * 1024 *5
    },
    fileFilter: fileFilter
}).single('image');




export  {imageUploads};