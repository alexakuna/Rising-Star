const {Router} = require('express')
const router = Router()

router.get('/login', (req, res) => {
    app.use(express.static('client/dist'))
    if (process.env.NODE_ENV === 'production') {
            res.sendFile(
                path.resolve(
                    __dirname, 'client', 'dist', 'index.html'
                )
            )

    }
})

module.exports = router
