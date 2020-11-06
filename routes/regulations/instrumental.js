const {Router} = require('express')
const router = Router()

router.get('/instrumental', (req, res) => {

    res.render('regulations/instrumental', {title: 'Инструментал'})
})

module.exports = router;
