const {Router} = require('express')
const router = Router()

router.get('/confidentiality', function (req, res) {
    res.render('partials/policy', {title: 'Privacy policy'})
})
router.get('/contract', function (req, res) {
    res.render('partials/contract', {title: 'Public contract'})
})
router.get('/questions', function (req, res) {
    res.render('partials/faq', {title: 'FAQ'})
})
router.get('/articles', function (req, res) {
    res.render('partials/articles', {title: 'Useful articles'})
})
module.exports = router;
