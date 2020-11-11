const {Router} = require('express')
const router = Router()
const Dance = require('../../models/Dance')

router.get('/dance', async (req, res) => {

    try {
        const content = await Dance.find()
        res.render('regulations/dance', content[0])
    } catch (e) {
        console.log(e)
    }
})

module.exports = router;
