const multer = require('multer')
const moment = require('moment')



const storage = multer.diskStorage({
    destination(req, file, cb){
        //console.log(file)
        //const catalog = file.fieldname === 'image' ? 'photos' : 'video'
        cb(null, 'public/images')
    },
    filename(req, file, cb) {
        const date = moment().format('DDMMYYYY-MMmmss_SSS')
        cb(null, `${date}-${file.originalname}`)
    }
})

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'video/quicktime' ||
        file.mimetype === 'video/mp4' ||
        file.mimetype === 'video/mpeg' ||
        file.mimetype === 'video/webm'
    ) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const limits = {
    fileSize: 1024 * 1024 * 500
}

module.exports = multer({storage, fileFilter, limits});
