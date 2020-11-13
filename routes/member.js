const {Router} = require('express')
const controller = require('../controlers/request')
const upload = require('../middleware/upload')
const router = Router()

router.post('/', upload.single('image'), controller.request)

module.exports = router
