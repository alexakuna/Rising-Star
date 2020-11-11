const {Router} = require('express')
const router = Router()
const Art = require('../../models/Art')


router.get('/art', async (req, res) => {

    try {
        const content = await Art.find()
        res.render('regulations/vocal', content[0])
    } catch (e) {
        console.log(e)
    }
})

module.exports = router;
