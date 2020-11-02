const {Router} = require('express')
const router = Router()

router.get('/vocal', (req, res) => {

    res.render('regulations/vocal', {title: 'Вокал'})
})

module.exports = router;
