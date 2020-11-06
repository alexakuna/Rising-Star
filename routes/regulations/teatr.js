const {Router} = require('express')
const router = Router()

router.get('/teatr', (req, res) => {

    res.render('regulations/teatr', {title: 'Вокал'})
})

module.exports = router;
