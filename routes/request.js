const {Router} = require('express')
const Home = require('../models/Home')
const router = Router()

router.get('/request',async (req, res) => {
    const home = await Home.find()
    res.render('request', home[0])
})

module.exports = router;
