const {Router} = require('express')
const options = require('../config/cnfg')
const controller = require('../controlers/request')
const controllerUCM = require('../controlers/uploadCompressingMailing')
const upload = require('../middleware/upload')
const router = Router()

router.get('/', controller.request)
router.post('/', upload.fields(options.UPLOAD_OPTIONS), controllerUCM.ucm)

module.exports = router
