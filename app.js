const express = require('express')

const config = require('./config/cnfg')
const mongoose = require('mongoose')
const path = require('path')
const pdf = require('express-pdf')
const cors = require('cors')

const homeRouter = require('./routes/home')
const requestRoute = require('./routes/request')
const aboutUsRoute = require('./routes/aboutus')
const contactsRoute = require('./routes/contacts')
const feedbacksRoute = require('./routes/feedbacks')
const regulationsRoute = require('./routes/regulations')
const timetableRoute = require('./routes/timetable')
const videoRoute = require('./routes/video')
const regulationRoute = require('./routes/regulations/regulation')
const member = require('./routes/member')
const orderPdf = require('./middleware/order-pdf')
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

app.use(pdf)
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.get('*', (req, res, next) => {
    app.locals.activeUrl = req.params[0]
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

// Роутер для положений
app.use('/regulation', regulationRoute)

//Роутер для отправки заявки
app.use('/submit', member)

//Формирование pdf документа и скачивание
app.use('/RisingStar', orderPdf)

module.exports = app
