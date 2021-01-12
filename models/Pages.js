const { Schema, model } = require('mongoose')

const schema = new Schema({
    pages: Array,
    lang: String
},{collection : 'pages'})

module.exports = model('Page', schema)
