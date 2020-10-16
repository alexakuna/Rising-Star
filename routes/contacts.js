const {Router} = require('express')
const Home = require('../models/Home')
const router = Router()

router.get('/contacts',async (req, res) => {
    const home = await Home.find()
    res.render('contacts', home[0])
})

module.exports = router;
