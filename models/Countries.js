const { Schema, model } = require('mongoose')


const schema = new Schema({
    countries: Object
}, {collection: 'countries'})


module.exports = model('Countries', schema)
