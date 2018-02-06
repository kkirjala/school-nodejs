const mongoose = require('mongoose')
const env = process.env.NODE_ENV || 'development';
const config = require('./dbconfig')[env];

const url = `mongodb://${config.database.username}:${config.database.password}@${config.database.host}:${config.database.port}/${config.database.db}`

const commandlineArgs = process.argv.slice(2)

mongoose.connect(url)

const Person = mongoose.model('Person', {
    name: String,
    phoneNumber: String,
})

if (commandlineArgs.length == 0) {  // display persons

    Person
        .find({})
        .then(result => {
            console.log("Puhelinluettelo")
            result.forEach(person => {
                console.log(`${person.name} ${person.phoneNumber}`)
            })
            mongoose.connection.close()
        })

} else {    // add a new person

    const person = new Person({
        name: commandlineArgs[0],
        phoneNumber: commandlineArgs[1],
    })

    person
        .save()
        .then(result => {
            console.log(`Lisätään henkilö ${person.name} numero ${person.phoneNumber} luetteloon.`)
            mongoose.connection.close()
        })

}