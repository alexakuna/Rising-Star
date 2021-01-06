
const { Schema, model } = require('mongoose')

const schema = new Schema({
    title: String,
    description: String,
    subtitle: String,
    banner: String,
    news: Array,
    sections: [
        {
            title: String,
            images: Array,
            description: Array,
            date: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, {collection: 'homes'})

module.exports = model('Home', schema)
