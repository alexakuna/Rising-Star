const {Router} = require('express')
const Home = require('../models/Home')
const router = Router()

router.get('/timetable',async (req, res) => {
    const home = await Home.find()
    res.render('timetable', home[0])
})

module.exports = router;
