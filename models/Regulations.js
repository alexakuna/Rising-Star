const { Schema, model } = require('mongoose')

const schema = new Schema({
    lang: String,
    regulations: [
        {
            img: String,
            title: String,
            url: String,
            show: Boolean,
            id: String
        }
    ]
})

module.exports = model('Regulations', schema)
