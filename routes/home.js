const {Router} = require('express')
const Home = require('../models/Home')
const router = Router()

router.get('/',async (req, res) => {
    const home = await Home.find()
    res.render('home', home[0])
})

module.exports = router;
