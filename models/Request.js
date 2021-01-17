const { Schema, model } = require('mongoose')

const schema = new Schema({
    lang: {type: String, default: 'ru'},
    titleRegulation: String,
    titles: {
        country: String,
        city: String,
        boss: String,
        genre: String,
        nomination: String,
        age: String,
        participant: String,
        presentation: String,
        tel: String,
        email: String,
        index: String,
        imagesParticipant: String,
        screenCheck: String,
        isCheck: String,
        video: String,
        link: String,
        note: String,
        size: String,
        agree: String,
        send: String,
        reset: String
    },
    countries: Object,
    genres: Object,
    ages: Array,
    errorsMessage: Array,
    loadInfo: Object
}, {collection: 'request'})

module.exports = model('Request', schema)
