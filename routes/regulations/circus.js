const {Router} = require('express')
const router = Router()
const Circus = require('../../models/Circus')

router.get('/circus', async (req, res) => {

    try {
        const content = await Circus.find()
        res.render('regulations/circus', content[0])
    } catch (e) {
        console.log(e)
    }
})

module.exports = router;
