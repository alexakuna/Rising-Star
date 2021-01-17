const {Router} = require('express')
const Home = require('../models/Home')
const Pages = require('../models/Pages')
const Request = require('../models/Request')

const router = Router()

router.get('/request',async (req, res) => {
    const locale = req.cookies['rs2021'] || 'ru'
    const pages = await Pages.find({lang: locale})
    const request = await Request.find({lang: locale})
    const pag = pages[0]
    const home = await Home.find({lang: locale})
    home[0].pages = pag.pages
    home[0].requestPage = request[0]

    //console.log(home[0])
    home[0].done = localStorage.getItem('done') || ''
    res.render('request', home[0])
    if(localStorage.getItem('done')) {
        localStorage.removeItem('done')
    }
})

module.exports = router;
