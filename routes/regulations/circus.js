const {Router} = require('express')
const router = Router()

router.get('/circus', (req, res) => {

    res.render('regulations/circus', {title: 'Цирк'})
})

module.exports = router;
