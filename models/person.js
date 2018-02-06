const mongoose = require('mongoose')
const env = process.env.NODE_ENV || 'development';
const config = require('../dbconfig')[env];

const url = `mongodb://${config.database.username}:${config.database.password}@${config.database.host}:${config.database.port}/${config.database.db}`

mongoose.connect(url)

const Person = mongoose.model('Person', {
    name: String,
    phoneNumber: String,
})

module.exports = Person