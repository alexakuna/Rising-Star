const {Router} = require('express')
const router = Router()

router.get('/confidentiality', function (req, res) {
    if(req.cookies['rs2021'] === 'ru') {
        res.render('partials/policy-ru')
    } else if(req.cookies['rs2021'] === 'en') {
        res.render('partials/policy-en')
    } else {
        res.redirect('/')
    }
})
router.get('/contract', function (req, res) {
    if(req.cookies['rs2021'] === 'ru') {
        res.render('partials/contract-ru')
    } else if(req.cookies['rs2021'] === 'en') {
        res.render('partials/contract-en')
    } else {
        res.redirect('/')
    }
})
router.get('/questions', function (req, res) {
    res.render('partials/faq', {title: 'FAQ'})
})
router.get('/articles', function (req, res) {
    res.render('partials/articles', {title: 'Useful articles'})
})
module.exports = router;
