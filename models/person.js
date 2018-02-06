const mongoose = require('mongoose')
const env = process.env.NODE_ENV || 'development';
const config = require('../dbconfig')[env];

const url = `mongodb://${config.database.username}:${config.database.password}@${config.database.host}:${config.database.port}/${config.database.db}`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    }
})

personSchema.statics.format = function(person) {
    return {
        name: person.name,
        phoneNumber: person.phoneNumber,
        id: person._id
      }
}

const Person = mongoose.model('Person', personSchema)

module.exports = Person