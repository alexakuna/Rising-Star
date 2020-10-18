const {Router} = require('express')
const router = Router()

router.get('/login', (req, res) => {
    let ip = req.header('x-forwarded-for') || req.connection.remoteAddress;

    res.render('login', {title: 'Вход в админ-панель', ip: ip})
})




module.exports = router
