const {Router} = require('express')
const router = Router()

router.get('/dance', (req, res) => {

    res.render('regulations/dance', {title: 'Танцы'})
})

module.exports = router;
