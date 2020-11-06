const express = require('express');
const mongoose = require('mongoose')
const path = require('path');
const loginPage = require('./routes/login')
const homeRouter = require('./routes/home');
const requestRoute = require('./routes/request');
const aboutUsRoute = require('./routes/aboutus');
const contactsRoute = require('./routes/contacts');
const feedbacksRoute = require('./routes/feedbacks');
const regulationsRoute = require('./routes/regulations');
const timetableRoute = require('./routes/timetable');
const videoRoute = require('./routes/video');
const regulationsVocal = require('./routes/regulations/vocal')
const regulationsInstrumental = require('./routes/regulations/instrumental')
const regulationsArt = require('./routes/regulations/art')
const regulationsCircus = require('./routes/regulations/circus')
const regulationsTeatr = require('./routes/regulations/teatr')
const regulationsDance = require('./routes/regulations/dance')
const app = express();

const uri = 'mongodb+srv://admin:15021979@rises.brol3.mongodb.net/home_page'

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MDB connected'))
    .catch(err => console.log(err))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//app.locals.isActive = true

app.get('*', async (req, res, next) => {
    app.locals.activeUrl = req.params[0]
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

app.use(loginPage)
app.use(homeRouter);
app.use(requestRoute);
app.use(contactsRoute);
app.use(feedbacksRoute);
app.use(regulationsRoute);
app.use(aboutUsRoute);
app.use(timetableRoute);
app.use(videoRoute);


// Роутеры для положений
app.use(regulationsVocal);
app.use(regulationsArt);
app.use(regulationsInstrumental);
app.use(regulationsCircus);
app.use(regulationsTeatr);
app.use(regulationsDance);

module.exports = app;
