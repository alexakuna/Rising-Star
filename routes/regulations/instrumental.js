const {Router} = require('express')
const router = Router()
const Instrumental = require('../../models/Instrumental')

router.get('/instrumental', async (req, res) => {

    try {
        const content = await Instrumental.find()
        res.render('regulations/instrumental', content[0])
    } catch (e) {
        console.log(e)
    }
})

module.exports = router;
