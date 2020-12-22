const { Schema, model } = require('mongoose')

const schema = new Schema({
    title: String,
    description: String,
    banner: String,
    news: Array
})

module.exports = model('Home', schema)
