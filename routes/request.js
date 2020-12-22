const {Router} = require('express')
const Home = require('../models/Home')
const Pages = require('../models/Pages')
const Countries = require('../models/Countries')

const router = Router()

router.get('/request',async (req, res) => {
    const pages = await Pages.find()
    const countries = await Countries.findById('5fbc25db62f1cd0aba4f088b', 'countries')
    const pag = pages[0]
    const home = await Home.find()
    home[0].pages = pag.pages
    home[0].countries = countries.countries
    home[0].done = localStorage.getItem('done') || ''
    res.render('request', home[0])
    if(localStorage.getItem('done')) {
        localStorage.removeItem('done')
    }
})

module.exports = router;
