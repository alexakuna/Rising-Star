const {Router} = require('express')
const Home = require('../models/Home')
const Pages = require('../models/Pages')

const router = Router()

router.get('/contacts',async (req, res) => {
    const locale = req.cookies['rs2021'] || 'ru'
    const pages = await Pages.find({lang: locale})
    const pag = pages[0]
    const home = await Home.find({lang: locale})
    home[0].pages = pag.pages
    res.render('contacts', home[0])
})

module.exports = router;
