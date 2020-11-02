const { Schema, model } = require('mongoose')

const schema = new Schema({
    pages: Array
},{collection : 'pages'})

module.exports = model('Page', schema)
