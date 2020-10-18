const {Router} = require('express')
const router = Router()

router.get('/login', (req, res) => {
    let ip = req.ip;
    console.log(ip)

    res.render('login', {title: 'Вход в админ-панель', ip: ip})
})




module.exports = router
