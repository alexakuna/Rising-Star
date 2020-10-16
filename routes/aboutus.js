const {Router} = require('express')
const Home = require('../models/Home')
const router = Router()

router.get('/aboutus',async (req, res) => {
    const home = await Home.find()
    res.render('aboutus', home[0])
})

module.exports = router;
