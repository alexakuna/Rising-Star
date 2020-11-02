const { Schema, model } = require('mongoose')

const schema = new Schema({
    regulations: [{img: String, title: String, url: String}]
})

module.exports = model('Regulations', schema)
