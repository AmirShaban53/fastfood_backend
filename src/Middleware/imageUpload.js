import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {cb(null, './uploads/')},
    filename: (req, file, cb) => {cb(null, `${req.body.name}_${file.originalname}`)}
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpg' || file.mimetype === 'image/png')
    {
        cb(null, false);
    }
    else{
        cb(null, true);

    }
}

const imageUpload = multer({
    storage: storage,
    limits:{
         fileSize: 1024 * 1024 *5
    },
    fileFilter: fileFilter
});

export default imageUpload;