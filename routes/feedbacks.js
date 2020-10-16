const {Router} = require('express')
const Home = require('../models/Home')
const router = Router()

router.get('/feedbacks',async (req, res) => {
    const home = await Home.find()
    res.render('feedbacks', home[0])
})

module.exports = router;
