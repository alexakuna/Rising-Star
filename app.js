const express = require('express')

const config = require('./config/cnfg')
const controllerUCM = require('./controlers/uploadCompressingMailing')
const upload = require('./middleware/upload')
const mongoose = require('mongoose')
const path = require('path')
//const logger = require('morgan')
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
const member = require('./routes/member')
const app = express()

// Эмуляция localStorage на бэкенде
if (typeof localStorage === 'undefined' || localStorage === null) {
    const LocalStorage = require('node-localstorage').LocalStorage
    localStorage = new LocalStorage('./scratch', 6 * 1024 * 1024)
}
//Подключаемся к БД (mongodb Атлас)
mongoose.connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true})
        .then(() => console.log('MDB connected'))
        .catch(err => console.log(err))

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// app.use(logger('dev'))
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
    app.locals.isVisible = config.ALLOW_IP.some(candidate =>  ip === candidate)
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

//Роутер для отправки заявки
app.use('/submit', member)
app.use('/submit', upload.fields(config.UPLOAD_OPTIONS), controllerUCM.ucm)

//Формирование pdf документа и скачивание
app.use('/pdfFromHTMLString', (req, res) => {
    // Перед продакшеном обязатаельно поменять локальный url на url домена где будет сайт
    const url = localStorage.getItem('url')
    axios.get(`${config.BASE_URL}${url}`)
        .then(resp => {
            const str = resp.data.indexOf('main')
            const str2 = resp.data.lastIndexOf('main')
            const result = resp.data.substring(str - 1, str2 + 5)
        res.pdfFromHTML({
            filename: `${url.replace('/', '')}.pdf`,
            htmlContent: result,
            // Перед продакшеном обязатаельно поменять локальный url на url домена где будет сайт
            // https://rsfrontend.herokuapp.com
            options: config.OPTIONS_PDF
        })
    }).catch(e => console.log(e))
})
module.exports = app
