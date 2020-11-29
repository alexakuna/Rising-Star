const {Router} = require('express')
const controller = require('../controlers/request')
const upload = require('../middleware/upload')
const router = Router()

router.post('/', upload.fields(
[
        {name: 'invoice', maxCount: 1},
        {name: 'image', maxCount: 3},
        {name: 'video', maxCount: 1},
        {name: 'artimages', maxCount: 8}
     ]
), controller.request)

module.exports = router
