const {Router} = require('express')
const router = Router()
const Theater = require('../../models/Theatr')

router.get('/teatr', async (req, res) => {

    try {
        const content = await Theater.find()
        res.render('regulations/teatr', content[0])
    } catch (e) {
        console.log(e)
    }
})

module.exports = router;
