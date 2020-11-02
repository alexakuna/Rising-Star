const {Router} = require('express')
const Home = require('../models/Home')
const Pages = require('../models/Pages')
const Regulations = require('../models/Regulations')


const router = Router()

router.get('/regulations',async (req, res) => {
    const home = await Home.find()
    const pages = await Pages.find()
    const regulations1 = await Regulations.find()
    const pag = pages[0]
    home[0].pages = pag.pages
    home[0].regulations = regulations1[0].regulations
    //console.log(regulations1[0].regulations)
    res.render('regulations', home[0])
})

module.exports = router;
