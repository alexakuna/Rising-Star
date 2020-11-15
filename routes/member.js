const {Router} = require('express')
const controller = require('../controlers/request')
const upload = require('../middleware/upload')
const router = Router()

router.post('/', upload.fields([{name: 'image', maxCount: 7}, {name: 'video', maxCount: 1}]), controller.request)

module.exports = router
