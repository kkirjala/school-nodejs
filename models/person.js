const mongoose = require('mongoose')

if ( process.env.NODE_ENV !== 'production' ) {
	require('dotenv').config()
}

const url = process.env.MONGODB_URI

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