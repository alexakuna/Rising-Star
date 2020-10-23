const express = require('express');
const mongoose = require('mongoose')
const path = require('path');
const loginPage = require('./routes/login')
const homeRouter = require('./routes/home');
const requestRoute = require('./routes/request');
const aboutusRoute = require('./routes/aboutus');
const contactsRoute = require('./routes/contacts');
const feedbacksRoute = require('./routes/feedbacks');
const regulationsRoute = require('./routes/regulations');
const timetableRoute = require('./routes/timetable');
const videoRoute = require('./routes/video');
const app = express();

const uri = 'mongodb+srv://admin:15021979@rises.brol3.mongodb.net/home_page'

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MDB connected'))
    .catch(err => console.log(err))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));



app.get('*', (req, res, next) => {
    const ip = req.header('x-forwarded-for') || req.connection.remoteAddress
    ip === '159.224.186.64'
    ||
    ip === '::1'
    || ip === '91.218.99.13'
        ? app.locals.isVisible = true
        : app.locals.isVisible = false
    next()
})


    app.get('/login', (req, res) => {
        app.use(express.static('client/dist'))
        res.sendFile(
            path.resolve(
                __dirname, 'client', 'dist', 'index.html'
            )
        )
    })



app.use(loginPage)
app.use(homeRouter);
app.use(requestRoute);
app.use(contactsRoute);
app.use(feedbacksRoute);
app.use(regulationsRoute);
app.use(aboutusRoute);
app.use(timetableRoute);
app.use(videoRoute);


module.exports = app;
