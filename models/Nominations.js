const { Schema, model } = require('mongoose')

const schema = new Schema({
    lang: {type: String, default: 'ru'}
}, {collection: 'nominations'})

module.exports = model('Nominations', schema)
