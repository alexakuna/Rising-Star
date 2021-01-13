const {Router} = require('express')
const Home = require('../models/Home')
const Pages = require('../models/Pages')
const Regulations = require('../models/Regulations')
const Regulation = require('../models/Regulation')

function sortId(a, b) {
    if (a.itemId > b.itemId) {
        return 1;
    }
    if (a.itemId < b.itemId) {
        return -1;
    }
    return 0;
}
const router = Router()

router.get('/regulations',async (req, res) => {
    const locale = req.cookies['rs2021'] || 'ru'
    const home = await Home.find({lang: locale})
    const pages = await Pages.find({lang: locale})
    const regulations1 = await Regulations.find({lang: locale})
    const reg = await Regulation.find({lang: locale}, '_id itemId')
    reg.sort(sortId)
    regulations1[0].regulations.map((i, index) => {
        i.id = reg[index]._id
    })
    home[0].pages = pages[0].pages
    home[0].titleReg = regulations1[0].titleReg
    home[0].regulations = regulations1[0].regulations
    res.render('regulations', home[0])
})

module.exports = router;
