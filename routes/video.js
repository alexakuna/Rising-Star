const {Router} = require('express')
const Home = require('../models/Home')
const router = Router()

router.get('/video',async (req, res) => {
    const home = await Home.find()
    res.render('video', home[0])
})

module.exports = router;
