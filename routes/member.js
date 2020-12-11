const {Router} = require('express')
const options = require('../config/cnfg')
const controller = require('../controlers/request')
const upload = require('../middleware/upload')
const router = Router()

router.post('/', upload.fields(options.UPLOAD_OPTIONS), controller.request)

module.exports = router
