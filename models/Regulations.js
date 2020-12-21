const { Schema, model } = require('mongoose')

const schema = new Schema({
    regulations: [{img: String, title: String, url: String, show: Boolean}]
})

module.exports = model('Regulations', schema)
