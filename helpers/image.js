const uuidv4 = require('uuid-v4');
const multer = require('multer');



module.exports = (path) => {    
    const storage = multer.diskStorage({
        destination: `../image/${path}`,
        filename: function (req, file, cb){
            cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`);
        }
    });
    
    function fileFilter(req, file, cb){
        let mime = file.mimetype.split('/')[1];
        if (mime === 'png' || 'jpeg' || 'jpg' || 'gif')
            cb(null, true);
        else
            cb(new Error(`${file.originalname} is not a PNG/JPEG file!`));
    }
    return multer({storage: storage, fileFilter}).single('file');
} 