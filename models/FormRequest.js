const { Schema, model } = require('mongoose')

const schema = new Schema({
    country: {
        type: String,
        required: [true, 'Нужно указать страну']
    },
    name_organisation: {
        type: String,
        required: [true, 'Нужно указать имя руководителя или название организации']
    },
    pip: {
        type: String,
        required: [true, 'Нужно указать Ф.И.О участника на английском языке']
    },
    nomination: {
        type: String,
        required: [true, 'Нужно указать имя номинации']
    },
    age: {
        type: String,
        required: [true, 'Нужно указать возрастную категорию']
    },
    name_performance: {
        type: String,
        required: [true, 'Нужно указать название номера']
    },
    tel: {
        type: String,
        required: [true, 'Нужно указать контактный номер телефона']
    },
    email: {
        type: String,
        required: [true, 'Нужно указать email'],
    },
    genre: String,
    pip_getter: {
        type: String,
        required: [true, 'Нужно указать Номер пошти, ПІП, телефон отримувача']
    },
    image: {
        type: Array,
        default: '',
        required: [true, 'Фотография участника обязательна']
    },
    video: String,
    text: String,
    invoice: {
        type: String,
        required: [true, 'Скрин чека обязателен']
    },
    artimages: {
        type: Array,
    },
    created: {
        type: Date,
        default: Date.now
    }
}, {collection: 'forms'})

module.exports = model('FormRequest', schema)
