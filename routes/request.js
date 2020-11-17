const {Router} = require('express')
const Home = require('../models/Home')
const Pages = require('../models/Pages')

const router = Router()

router.get('/request',async (req, res) => {
    const pages = await Pages.find()
    const pag = pages[0]
    const home = await Home.find()
    home[0].pages = pag.pages
    home[0].isChecked = false
    res.render('request', home[0])
})

module.exports = router;
