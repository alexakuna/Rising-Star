const {Router} = require('express')
const router = Router()

router.get('/art', (req, res) => {

    res.render('regulations/art', {title: 'АРТ'})
})

module.exports = router;
