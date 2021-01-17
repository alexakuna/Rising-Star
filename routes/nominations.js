const {Router} = require('express')
const router = Router()

const controller = require('../controlers/nominations')

router.post('/', controller.nomination)

module.exports = router
