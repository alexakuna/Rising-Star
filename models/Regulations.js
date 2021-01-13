const { Schema, model } = require('mongoose')

const schema = new Schema({
    lang: String,
    titleReg: String,
    regulations: [
        {
            img: String,
            title: String,
            url: String,
            show: Boolean,
            id: {type:String, default: ''},
            textBtn: String
        }
    ]
})

module.exports = model('Regulations', schema)
