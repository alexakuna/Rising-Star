const express = require('express')
const app = express()

const mongoose = require('mongoose')
const path = require('path')
const pdf = require('express-pdf')
const axios = require('axios')
const cors = require('cors')

const homeRouter = require('./routes/home')
const requestRoute = require('./routes/request')
const aboutUsRoute = require('./routes/aboutus')
const contactsRoute = require('./routes/contacts')
const feedbacksRoute = require('./routes/feedbacks')
const regulationsRoute = require('./routes/regulations')
const timetableRoute = require('./routes/timetable')
const videoRoute = require('./routes/video')
const regulationsVocal = require('./routes/regulations/vocal')
const regulationsInstrumental = require('./routes/regulations/instrumental')
const regulationsArt = require('./routes/regulations/art')
const regulationsCircus = require('./routes/regulations/circus')
const regulationsTheatre = require('./routes/regulations/teatr')
const regulationsDance = require('./routes/regulations/dance')

if (typeof localStorage === "undefined" || localStorage === null) {
    let LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

const uri = 'mongodb+srv://admin:15021979@rises.brol3.mongodb.net/home_page'

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MDB connected'))
    .catch(err => console.log(err))

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(pdf)
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.get('*', async (req, res, next) => {
    app.locals.activeUrl = req.params[0]
    if(req.params[0] !== '/pdfFromHTMLString') {
        localStorage.setItem('url', req.params[0])
    }
    const ip = req.header('x-forwarded-for') || req.connection.remoteAddress
    ip === '159.224.186.64'
    ||
    ip === '::1'
    ||
    ip === '91.218.99.13'
    ||
    ip === '128.124.196.231'
        ? app.locals.isVisible = true
        : app.locals.isVisible = false
    next()
})

// Роутеры навигации
app.use(homeRouter)
app.use(requestRoute)
app.use(contactsRoute)
app.use(feedbacksRoute)
app.use(regulationsRoute)
app.use(aboutUsRoute)
app.use(timetableRoute)
app.use(videoRoute)

// Роутеры для положений
app.use(regulationsVocal)
app.use(regulationsArt)
app.use(regulationsInstrumental)
app.use(regulationsCircus)
app.use(regulationsTheatre)
app.use(regulationsDance)

app.use('/pdfFromHTMLString', function(req, res){
    // Перед продакшеном обязатаельно поменять локальный url на url домена где будет сайт
    const url = localStorage.getItem('url')
    axios.get(`https://rsfrontend.herokuapp.com${url}`)
        .then(resp => {
            const str = resp.data.indexOf('main')
            const str2 = resp.data.lastIndexOf('main')
            const result = resp.data.substring(str - 1, str2 + 5)
        res.pdfFromHTML({
            filename: `${url.slice(0, 0)}.pdf`,
            htmlContent: result,
            // Перед продакшеном обязатаельно поменять локальный url на url домена где будет сайт / https://rsfrontend.herokuapp.com
            options: {
                "base": "https://rsfrontend.herokuapp.com/stylesheets/materialize.min.css",
                "border": {
                    "top": "1in",
                    "right": "1in",
                    "bottom": "1in",
                    "left": "1in"
                }
            }
        })
    }).catch(e => console.warn(e))
})

module.exports = app
