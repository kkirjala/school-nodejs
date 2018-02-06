const mongoose = require('mongoose')
const env = process.env.NODE_ENV || 'development';
const config = require('./dbconfig')[env];

const url = `mongodb://${config.database.username}:${config.database.password}@${config.database.host}:${config.database.port}/${config.database.db}`

console.log(url);

    /*
mongoose.connect(url)

const Note = mongoose.model('Note', {
  content: String,
  date: Date,
  important: Boolean
})

const note = new Note({
  content: 'HTML on helppoa',
  date: new Date(),
  important: true
})

note
  .save()
  .then(response => {
    console.log('note saved!')
    mongoose.connection.close()
  })
  */
