const {Router} = require('express')
const router = Router()
const Regulation = require('../../models/Regulation')


router.get('/:id', async (req, res) => {
    localStorage.setItem('url', req.params.id)
    try {
        const content = await Regulation.findById(req.params.id)
        res.render('regulations/regulation', content)
    } catch (e) {
        console.log(e)
    }
})

module.exports = router;
