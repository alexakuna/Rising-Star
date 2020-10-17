const {Router} = require('express')
const router = Router()

router.get('/login', (req, res) => {
    res.render('login', {title: 'Вход в админ-панель'})
})




module.exports = router
