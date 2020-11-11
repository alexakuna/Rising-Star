const {Router} = require('express')
const router = Router()
const Vocal = require('../../models/Regulation')


router.get('/vocal', async(req, res) => {
    try {
        const content = await Vocal.find()
        res.render('regulations/vocal', content[0])
    } catch (e) {
        console.log(e)
    }
})

module.exports = router;
