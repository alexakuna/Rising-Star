const Nomination = require('../models/Nominations')


module.exports.nomination = async (req, res) => {
    const locale = req.cookies['rs2021'] || 'ru'
    try {
        const data = await Nomination.find({$and: [{lang: locale}, {[req.body.nomination]: {$exists: true}}]})
        res.status(200).json({data})
    } catch (e) {
        console.log(e)
    }
}
